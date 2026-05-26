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

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time*0.05;
        float lineWidth = 0.002;

        vec3 color = vec3(0.0);
        for(int j = 0; j < 3; j++){
          for(int i=0; i < 5; i++){
            color[j] += lineWidth*float(i*i) / abs(fract(t - 0.01*float(j)+float(i)*0.01)*5.0 - length(uv) + mod(uv.x+uv.y, 0.2));
          }
        }

        gl_FragColor = vec4(color[0],color[1],color[2],1.0);
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
