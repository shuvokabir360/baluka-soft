import React, { useEffect, useRef } from 'react';

export default function NightSeaBeachBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return; // Null guard to prevent React unmount crash

    let animationFrameId;

    let width = (canvas.width = window.innerWidth || 1200);
    let height = (canvas.height = window.innerHeight || 800);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth || 1200;
      height = canvas.height = window.innerHeight || 800;
    };

    window.addEventListener('resize', handleResize);

    // Wave parameters for realistic ocean tides (জলের তুফান ও ঢেউ)
    let step = 0;
    const horizonY = Math.max(100, height * 0.45); // Ocean horizon line

    // Bioluminescent foam particles on the beach
    const foamParticles = Array.from({ length: 60 }, () => ({
      x: Math.random() * width,
      y: horizonY + Math.random() * Math.max(50, height - horizonY),
      size: Math.random() * 2.5 + 1.2,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.5 + 0.2
    }));

    const animate = () => {
      try {
        if (!ctx) return;
        ctx.clearRect(0, 0, width, height);
        step += 0.02;

        // 1. Midnight Sky Gradient (Vibrant Deep Blue & Teal)
        const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY);
        skyGrad.addColorStop(0, '#061325');
        skyGrad.addColorStop(0.6, '#0f294a');
        skyGrad.addColorStop(1, '#1e3a8a');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, width, horizonY);

        // 2. Glowing Moon
        const moonX = width * 0.82;
        const moonY = Math.max(40, height * 0.14);
        const moonRadius = 38;

        ctx.save();
        ctx.beginPath();
        ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#f8fafc';
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 35;
        ctx.fill();
        ctx.restore();

        // Moonlight Beams Reflection on Ocean (Safely Guarded)
        try {
          const moonGlow = ctx.createRadialGradient(moonX, moonY, 5, moonX, Math.min(height, moonY + 300), 350);
          moonGlow.addColorStop(0, 'rgba(0, 240, 255, 0.35)');
          moonGlow.addColorStop(0.5, 'rgba(0, 230, 118, 0.15)');
          moonGlow.addColorStop(1, 'transparent');
          ctx.fillStyle = moonGlow;
          ctx.fillRect(0, horizonY, width, height - horizonY);
        } catch (err) {
          ctx.fillStyle = 'rgba(0, 240, 255, 0.1)';
          ctx.fillRect(0, horizonY, width, height - horizonY);
        }

        // 3. Sandy Beach Base Gradient (Lighter Navy Blue)
        const sandGrad = ctx.createLinearGradient(0, horizonY, 0, height);
        sandGrad.addColorStop(0, '#112240');
        sandGrad.addColorStop(0.5, '#0a192f');
        sandGrad.addColorStop(1, '#020c1b');
        ctx.fillStyle = sandGrad;
        ctx.fillRect(0, horizonY, width, height - horizonY);

        // 4. Rolling Ocean Waves Function (জলের তুফান ও বিশাল ঢেউ)
        const drawWave = (offsetY, amplitude, frequency, speedMult, color, foamColor) => {
          ctx.beginPath();
          ctx.moveTo(0, height);

          for (let x = 0; x <= width + 10; x += 10) {
            const y =
              horizonY +
              offsetY +
              Math.sin(x * frequency + step * speedMult) * amplitude +
              Math.cos(x * 0.005 + step * 0.8) * (amplitude * 0.5);

            ctx.lineTo(x, y);
          }

          ctx.lineTo(width, height);
          ctx.fillStyle = color;
          ctx.fill();

          // Wave Crest Bioluminescent Foam Line
          ctx.beginPath();
          for (let x = 0; x <= width + 10; x += 15) {
            const y =
              horizonY +
              offsetY +
              Math.sin(x * frequency + step * speedMult) * amplitude +
              Math.cos(x * 0.005 + step * 0.8) * (amplitude * 0.5);

            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = foamColor;
          ctx.lineWidth = 2.5;
          ctx.shadowColor = foamColor;
          ctx.shadowBlur = 12;
          ctx.stroke();
          ctx.shadowBlur = 0;
        };

        // Draw 4 Layers of Ocean Waves & Rolling Tides
        drawWave(30, 16, 0.008, 1.2, 'rgba(15, 45, 85, 0.85)', 'rgba(0, 240, 255, 0.45)');
        drawWave(75, 24, 0.006, 1.6, 'rgba(12, 36, 68, 0.9)', 'rgba(0, 230, 118, 0.55)');
        drawWave(130, 32, 0.005, 2.0, 'rgba(9, 28, 52, 0.95)', 'rgba(0, 240, 255, 0.65)');
        drawWave(190, 40, 0.004, 2.4, 'rgba(6, 18, 35, 0.98)', 'rgba(0, 230, 118, 0.75)');

        // 5. Bioluminescent Shore Foam Particles
        foamParticles.forEach((p) => {
          p.x += Math.sin(step + p.y) * 0.5;
          p.y += p.speed;
          if (p.y > height) {
            p.y = horizonY + Math.random() * 80;
            p.x = Math.random() * width;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 240, 255, ${p.alpha * 0.8})`;
          ctx.shadowColor = '#00e676';
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      } catch (e) {
        console.error('NightSea animation frame error:', e);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="night-sea-canvas" />;
}
