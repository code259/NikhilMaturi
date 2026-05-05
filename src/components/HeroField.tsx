"use client";

import { useEffect, useRef } from "react";

export function HeroField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let animation = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const scale = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(rect.width * scale));
      canvas.height = Math.max(1, Math.floor(rect.height * scale));
      context.setTransform(scale, 0, 0, scale, 0, 0);
    };

    const render = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      frame += 0.008;
      context.clearRect(0, 0, width, height);

      const gradient = context.createRadialGradient(
        width * 0.5,
        height * 0.45,
        0,
        width * 0.5,
        height * 0.45,
        width * 0.7
      );
      gradient.addColorStop(0, "rgba(241, 240, 234, 0.08)");
      gradient.addColorStop(0.45, "rgba(141, 146, 150, 0.06)");
      gradient.addColorStop(1, "rgba(4, 8, 12, 0)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);

      for (let ring = 0; ring < 7; ring += 1) {
        const radius = 44 + ring * 34;
        const tilt = 0.22 + ring * 0.045;
        context.beginPath();
        for (let point = 0; point <= 220; point += 1) {
          const theta = (point / 220) * Math.PI * 2 + frame * (ring % 2 ? -1 : 1);
          const wave = Math.sin(theta * 3 + frame * 8 + ring) * 7;
          const x = width * 0.53 + Math.cos(theta) * (radius + wave);
          const y = height * 0.47 + Math.sin(theta) * (radius * tilt + wave * 0.3);
          if (point === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.strokeStyle = `rgba(${ring % 2 ? "174, 180, 184" : "241, 240, 234"}, ${0.14 - ring * 0.01})`;
        context.lineWidth = 1;
        context.stroke();
      }

      context.save();
      context.translate(width * 0.64, height * 0.43);
      context.rotate(-0.22);
      context.lineWidth = 1;

      const strandPoints: Array<[number, number, number, number]> = [];
      for (let point = 0; point <= 88; point += 1) {
        const progress = point / 88;
        const x = (progress - 0.5) * Math.min(width * 0.54, 680);
        const wave = Math.sin(progress * Math.PI * 6 + frame * 3.5);
        const yA = wave * 28;
        const yB = -wave * 28;
        strandPoints.push([x, yA, x, yB]);

        if (point === 0) context.beginPath();
        if (point === 0) context.moveTo(x, yA);
        else context.lineTo(x, yA);
      }
      context.strokeStyle = "rgba(241, 240, 234, 0.18)";
      context.stroke();

      context.beginPath();
      strandPoints.forEach(([x, , , yB], index) => {
        if (index === 0) context.moveTo(x, yB);
        else context.lineTo(x, yB);
      });
      context.strokeStyle = "rgba(159, 183, 200, 0.16)";
      context.stroke();

      strandPoints.forEach(([xA, yA, xB, yB], index) => {
        if (index % 7 !== 0) return;
        context.beginPath();
        context.moveTo(xA, yA);
        context.lineTo(xB, yB);
        context.strokeStyle = "rgba(241, 240, 234, 0.12)";
        context.stroke();
      });
      context.restore();

      for (let membrane = 0; membrane < 5; membrane += 1) {
        const seed = membrane * 18.71;
        const x = width * (0.58 + Math.sin(seed) * 0.18);
        const y = height * (0.46 + Math.cos(seed * 1.4) * 0.18);
        const pulse = Math.sin(frame * 3 + membrane) * 3;
        context.beginPath();
        context.ellipse(
          x,
          y,
          22 + membrane * 8 + pulse,
          12 + membrane * 5,
          seed * 0.04 + frame * 0.2,
          0,
          Math.PI * 2
        );
        context.strokeStyle = `rgba(241, 240, 234, ${0.055 + membrane * 0.012})`;
        context.stroke();
      }

      for (let i = 0; i < 95; i += 1) {
        const seed = i * 39.19;
        const x = (Math.sin(seed) * 0.5 + 0.5) * width;
        const y = (Math.cos(seed * 1.7) * 0.5 + 0.5) * height;
        const flicker = Math.sin(frame * 22 + i) * 0.5 + 0.5;
        context.fillStyle = `rgba(241,240,234,${0.12 + flicker * 0.28})`;
        context.fillRect(x, y, 1.2, 1.2);
      }

      animation = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    animation = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animation);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas className="hero-field" ref={canvasRef} aria-hidden="true" />;
}
