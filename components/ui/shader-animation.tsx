"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type ShaderAnimationProps = {
  className?: string;
};

/**
 * Shader de líneas diagonales recoloreado al gradiente firma 1bite
 * (cyan -> azul -> morado -> magenta -> coral). Incluye guards de perf:
 * pausa el rAF fuera del viewport y con la pestaña oculta, dpr capado.
 */
export function ShaderAnimation({ className = "" }: ShaderAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const vertexShader = `
      void main() {
        gl_Position = vec4( position, 1.0 );
      }
    `;

    const fragmentShader = `
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359

      precision highp float;
      uniform vec2 resolution;
      uniform float time;

      // Gradiente firma 1bite
      vec3 gradFirma(float t) {
        vec3 cyan   = vec3(0.031, 0.882, 0.957); // #08E1F4
        vec3 blue   = vec3(0.031, 0.420, 0.988); // #086BFC
        vec3 purple = vec3(0.675, 0.192, 0.984); // #AC31FB
        vec3 pink   = vec3(0.929, 0.180, 0.592); // #ED2E97
        vec3 coral  = vec3(0.992, 0.400, 0.282); // #FD6648
        t = fract(t);
        float s = t * 4.0;
        if (s < 1.0) return mix(cyan, blue, s);
        else if (s < 2.0) return mix(blue, purple, s - 1.0);
        else if (s < 3.0) return mix(purple, pink, s - 2.0);
        else return mix(pink, coral, s - 3.0);
      }

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time * 0.05;
        float lineWidth = 0.002;

        // Intensidad escalar de las líneas (sin separar por canal RGB)
        float intensity = 0.0;
        for (int i = 0; i < 5; i++) {
          intensity += lineWidth * float(i * i) /
            abs(fract(t + float(i) * 0.01) * 5.0 - length(uv) + mod(uv.x + uv.y, 0.2));
        }

        // Color del degradado 1bite según posición + tiempo
        vec3 grad = gradFirma(length(uv) * 0.5 + t * 0.6 + (uv.x + uv.y) * 0.15);
        gl_FragColor = vec4(grad * intensity, 1.0);
      }
    `;

    const camera = new THREE.Camera();
    camera.position.z = 1;

    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(2, 2);

    const uniforms = {
      time: { value: 1.0 },
      resolution: { value: new THREE.Vector2() },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    // dpr capado a 1.5 — el shader es caro por-pixel y va de fondo
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    container.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      uniforms.resolution.value.x = renderer.domElement.width;
      uniforms.resolution.value.y = renderer.domElement.height;
    };
    onResize();
    window.addEventListener("resize", onResize);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let frameId = 0;
    let running = false;

    const renderFrame = () => {
      uniforms.time.value += 0.05;
      renderer.render(scene, camera);
    };
    const animate = () => {
      renderFrame();
      frameId = requestAnimationFrame(animate);
    };
    const start = () => {
      if (running || reduceMotion) return;
      running = true;
      frameId = requestAnimationFrame(animate);
    };
    const stop = () => {
      running = false;
      if (frameId) cancelAnimationFrame(frameId);
      frameId = 0;
    };

    let inView = false;
    const io = new IntersectionObserver(
      ([e]) => {
        inView = e.isIntersecting;
        if (inView && !document.hidden) start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(container);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (inView) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    if (reduceMotion) renderFrame();

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ background: "#000", overflow: "hidden" }}
    />
  );
}
