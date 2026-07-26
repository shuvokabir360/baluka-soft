import React, { useEffect, useRef } from 'react';

const BIRD_PALETTE = [
  { id: 'g1', body: '#00e676', wing: '#00c853', belly: '#b9f6ca', glow: '#00e676' },
  { id: 'c1', body: '#00b0ff', wing: '#0091ea', belly: '#80d8ff', glow: '#00b0ff' },
  { id: 'p1', body: '#ff2a85', wing: '#c2185b', belly: '#ff80ab', glow: '#ff2a85' },
  { id: 'y1', body: '#fbbf24', wing: '#d97706', belly: '#fef08a', glow: '#fbbf24' },
  { id: 'v1', body: '#a855f7', wing: '#7e22ce', belly: '#e9d5ff', glow: '#a855f7' },
  { id: 'r1', body: '#ff5252', wing: '#d50000', belly: '#ff8a80', glow: '#ff5252' },
  { id: 't1', body: '#14b8a6', wing: '#0f766e', belly: '#99f6e4', glow: '#14b8a6' },
  { id: 'o1', body: '#ff7700', wing: '#c65100', belly: '#ffcc80', glow: '#ff7700' },
  { id: 'w1', body: '#e2e8f0', wing: '#94a3b8', belly: '#ffffff', glow: '#ffffff' },
  { id: 'b1', body: '#38bdf8', wing: '#0284c7', belly: '#bae6fd', glow: '#38bdf8' },
  { id: 'g2', body: '#10b981', wing: '#047857', belly: '#a7f3d0', glow: '#10b981' },
  { id: 'p2', body: '#ec4899', wing: '#be185d', belly: '#fbcfe8', glow: '#ec4899' },
  { id: 'y2', body: '#f59e0b', wing: '#b45309', belly: '#fde68a', glow: '#f59e0b' },
  { id: 'v2', body: '#8b5cf6', wing: '#6d28d9', belly: '#ddd6fe', glow: '#8b5cf6' },
  { id: 'c2', body: '#06b6d4', wing: '#0e7490', belly: '#a5f3fc', glow: '#06b6d4' },
  { id: 'r2', body: '#f43f5e', wing: '#be123c', belly: '#fecdd3', glow: '#f43f5e' }
];

export default function InteractiveBirds() {
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

    const mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Initialize 16 Birds as plain JS objects (Zero React State Re-renders!)
    const birds = BIRD_PALETTE.map((theme, index) => ({
      id: index,
      x: Math.random() * (width - 140) + 70,
      y: Math.random() * (height - 200) + 80,
      targetX: Math.random() * (width - 140) + 70,
      targetY: Math.random() * (height - 200) + 80,
      theme: theme,
      scale: 0.8 + Math.random() * 0.3,
      isPerched: false,
      perchTimer: 0,
      wingFlap: Math.floor(Math.random() * 20),
      flip: Math.random() > 0.5,
      rotation: 0,
      perchHop: 0
    }));

    const animate = () => {
      try {
        if (!ctx) return;
        ctx.clearRect(0, 0, width, height);

        birds.forEach((bird) => {
          const mouseDist = Math.hypot(mouse.x - bird.x, mouse.y - bird.y);

          // 1. Mouse Startle: Take off if mouse cursor gets near
          if (bird.isPerched && mouseDist < 70) {
            bird.isPerched = false;
            bird.perchTimer = 0;
            bird.targetX = Math.random() * (width - 140) + 70;
            bird.targetY = Math.max(50, Math.random() * (height / 2));
          }

          // 2. Perched timer check
          if (bird.isPerched) {
            bird.perchTimer -= 1;
            bird.perchHop = (bird.perchHop + 0.08) % (Math.PI * 2);
            bird.rotation = 0;

            if (bird.perchTimer <= 0) {
              bird.isPerched = false;
              bird.targetX = Math.random() * (width - 140) + 70;
              bird.targetY = Math.max(50, Math.random() * (height / 2));
            }
          } 
          // 3. Flying towards target
          else {
            const dx = bird.targetX - bird.x;
            const dy = bird.targetY - bird.y;
            const dist = Math.hypot(dx, dy);

            if (dist < 14) {
              // Target reached -> Try landing on a visible element or pick new sky target
              const allElems = document.querySelectorAll(
                'h1, h2, h3, h4, .play-title-main, .play-header-logo, .app-card-icon, .app-card-title, .founder-avatar, .cat-pill, .hero-play-btn, .modal-app-icon, .play-footer-logo, .play-footer-title, .btn-primary, .btn-secondary, .badge'
              );

              const visibleElems = Array.from(allElems).filter((elem) => {
                const r = elem.getBoundingClientRect();
                return (
                  r.top >= 40 &&
                  r.bottom <= height - 40 &&
                  r.left >= 30 &&
                  r.right <= width - 30
                );
              });

              if (visibleElems.length > 0 && Math.random() < 0.75) {
                const selectedElem = visibleElems[Math.floor(Math.random() * visibleElems.length)];
                const rect = selectedElem.getBoundingClientRect();

                bird.targetX = Math.max(30, Math.min(width - 50, rect.left + rect.width / 2 + (Math.random() - 0.5) * (rect.width * 0.4)));
                bird.targetY = Math.max(40, Math.min(height - 50, rect.top - 10));
                bird.x = bird.targetX;
                bird.y = bird.targetY;
                bird.isPerched = true;
                bird.perchTimer = Math.floor(Math.random() * 180) + 200; // Rest ~4-6s
              } else {
                bird.targetX = Math.random() * (width - 140) + 70;
                bird.targetY = Math.random() * (height - 200) + 80;
              }
            } else {
              const speed = 3.6;
              bird.x += (dx / dist) * speed;
              bird.y += (dy / dist) * speed;

              bird.flip = dx < 0;
              bird.rotation = Math.max(-25, Math.min(25, (dy / dist) * 20));
              bird.wingFlap = (bird.wingFlap + 1) % 20;
            }
          }

          // Screen Viewport Clamping
          bird.x = Math.max(30, Math.min(width - 40, bird.x));
          bird.y = Math.max(40, Math.min(height - 40, bird.y));

          // Draw Bird on Canvas
          ctx.save();
          const hopY = bird.isPerched ? Math.sin(bird.perchHop) * 2 : 0;
          ctx.translate(bird.x, bird.y + hopY);
          ctx.scale(bird.scale * (bird.flip ? -1 : 1), bird.scale);
          ctx.rotate((bird.rotation * Math.PI) / 180);

          // Glow effect
          ctx.shadowColor = bird.theme.glow;
          ctx.shadowBlur = 10;

          // Tail
          ctx.fillStyle = bird.theme.wing;
          ctx.beginPath();
          ctx.moveTo(-14, 2);
          ctx.lineTo(-24, -4);
          ctx.lineTo(-26, 4);
          ctx.lineTo(-20, 6);
          ctx.fill();

          // Body
          ctx.fillStyle = bird.theme.body;
          ctx.beginPath();
          ctx.ellipse(0, 0, 14, 8, 0, 0, Math.PI * 2);
          ctx.fill();

          // Belly
          ctx.fillStyle = bird.theme.belly;
          ctx.beginPath();
          ctx.ellipse(-2, 3, 10, 5, 0, 0, Math.PI * 2);
          ctx.fill();

          // Head
          ctx.fillStyle = bird.theme.body;
          ctx.beginPath();
          ctx.arc(10, -4, 7, 0, Math.PI * 2);
          ctx.fill();

          // Beak
          ctx.fillStyle = '#f59e0b';
          ctx.beginPath();
          ctx.moveTo(16, -6);
          ctx.lineTo(24, -3);
          ctx.lineTo(16, 0);
          ctx.fill();

          // Eye
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(11, -6, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#000000';
          ctx.beginPath();
          ctx.arc(11.5, -6, 1, 0, Math.PI * 2);
          ctx.fill();

          // Wing (Flapping Animation)
          const wingOffset = bird.isPerched ? 0 : Math.sin((bird.wingFlap / 20) * Math.PI * 2) * 12;
          ctx.fillStyle = bird.theme.wing;
          ctx.beginPath();
          ctx.moveTo(-4, -2);
          ctx.quadraticCurveTo(2, -14 + wingOffset, 12, -6 + wingOffset * 0.5);
          ctx.quadraticCurveTo(2, 2 + wingOffset * 0.3, -4, -2);
          ctx.fill();

          // Feet (when perched)
          if (bird.isPerched) {
            ctx.strokeStyle = '#d97706';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(-2, 7);
            ctx.lineTo(-4, 12);
            ctx.moveTo(2, 7);
            ctx.lineTo(3, 12);
            ctx.stroke();
          }

          ctx.restore();
        });
      } catch (err) {
        console.error('InteractiveBirds canvas draw error:', err);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="interactive-birds-canvas" />;
}
