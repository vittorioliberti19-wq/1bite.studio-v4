"use client";
import React, { useEffect, useRef } from "react";

const SHADER_SRC = `#version 300 es
precision highp float;

out vec4 fragColor;
in vec2 v_uv;

uniform vec3  iResolution;   // (width, height, dpr)
uniform float iTime;         // seconds
uniform int   iFrame;        // frame counter

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2  r  = iResolution.xy;
    float t  = iTime;
    vec3  FC = vec3(fragCoord, t);
    vec4  o  = vec4(0.0);

    vec2 p = FC.xy - r * 0.5;

    for (float i, a; i++ < 9.0; )
    {
        a = (i * i) / 80.0 - length(p) / r.y;
        float denom = max(a, -a * 3.0) + 2.0 / r.y;

        a = cos(i - t);
        float edge0 = a;
        float edge1 = 2.0;
        a = atan(p.y, p.x) + a + i * i;
        float sm = smoothstep(edge0, edge1, cos(a));

        o += 0.03 / denom * sm * (1.2 + sin(a + i + vec4(0.0, 2.0, 4.0, 0.0)));
    }

    o = tanh(o);
    fragColor = vec4(o.rgb, 1.0);
}

void main(){
  mainImage(fragColor, gl_FragCoord.xy);
}
`;

const VERT_SRC = `#version 300 es
precision highp float;
layout(location=0) in vec2 a_pos;
out vec2 v_uv;
void main(){
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

function safeCompile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  const ok = gl.getShaderParameter(sh, gl.COMPILE_STATUS);
  const log = gl.getShaderInfoLog(sh) || "";
  return { shader: ok ? sh : null, log };
}
function safeLink(
  gl: WebGL2RenderingContext,
  vs: WebGLShader,
  fs: WebGLShader,
) {
  const prog = gl.createProgram()!;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  const ok = gl.getProgramParameter(prog, gl.LINK_STATUS);
  const log = gl.getProgramInfoLog(prog) || "";
  return { program: ok ? prog : null, log };
}

type RadialShaderProps = {
  className?: string;
};

// Regla perf del proyecto: pausa fuera de viewport + tab oculto + dpr cap.
export function RadialShader({ className = "" }: RadialShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", { premultipliedAlpha: false });
    if (!gl) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let disposed = false;
    let rafId: number | null = null;
    let inView = true;
    let tabVisible = !document.hidden;
    let frame = 0;
    const start = performance.now();

    const vao = gl.createVertexArray()!;
    gl.bindVertexArray(vao);
    const vbo = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const { shader: vs } = safeCompile(gl, gl.VERTEX_SHADER, VERT_SRC);
    const { shader: fs } = safeCompile(gl, gl.FRAGMENT_SHADER, SHADER_SRC);
    if (!vs || !fs) return;
    const { program } = safeLink(gl, vs, fs);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    if (!program) return;

    const uResolution = gl.getUniformLocation(program, "iResolution");
    const uTime = gl.getUniformLocation(program, "iTime");
    const uFrame = gl.getUniformLocation(program, "iFrame");

    const getDpr = () =>
      Math.max(1, Math.min(1.5, window.devicePixelRatio || 1));

    const applySize = () => {
      if (disposed) return;
      const dpr = getDpr();
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    const ro = new ResizeObserver(applySize);
    ro.observe(canvas);
    applySize();

    const tick = (now: number) => {
      if (disposed) return;
      if (gl.isContextLost()) {
        rafId = requestAnimationFrame(tick);
        return;
      }
      frame += 1;
      gl.useProgram(program);
      if (uResolution)
        gl.uniform3f(uResolution, canvas.width, canvas.height, getDpr());
      if (uTime) gl.uniform1f(uTime, (now - start) / 1000);
      if (uFrame) gl.uniform1i(uFrame, frame);
      gl.bindVertexArray(vao);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      rafId = requestAnimationFrame(tick);
    };

    const syncLoop = () => {
      const shouldRun = inView && tabVisible && !prefersReduced;
      if (shouldRun && rafId === null) {
        rafId = requestAnimationFrame(tick);
      } else if (!shouldRun && rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        syncLoop();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const handleVisibility = () => {
      tabVisible = !document.hidden;
      syncLoop();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // Frame estático inicial (aunque reduced-motion pause el loop)
    tick(performance.now());
    if (prefersReduced && rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    syncLoop();

    return () => {
      disposed = true;
      if (rafId !== null) cancelAnimationFrame(rafId);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      try {
        gl.deleteBuffer(vbo);
        gl.deleteVertexArray(vao);
        gl.deleteProgram(program);
      } catch {}
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 block h-full w-full ${className}`}
    />
  );
}
