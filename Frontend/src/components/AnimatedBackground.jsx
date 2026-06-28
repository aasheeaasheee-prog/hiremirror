import React, { useEffect, useRef } from 'react';

export const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    const particleCount = 45;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const colors = ['rgba(168, 85, 247, ', 'rgba(59, 130, 246, ', 'rgba(255, 255, 255, '];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 1.8 + 0.6,
        colorBase: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.4 + 0.15,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        pulseVal: Math.random() * Math.PI
      });
    }

    const handleMouseMove = (e) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Animation Loop
    const render = () => {
      // Clear canvas with a very slight trail to make movement organic
      ctx.fillStyle = '#030014';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Smooth mouse interpolation
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Draw background noise lines / abstract grid faintly
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 1;
      const gridSize = 120;
      
      // Vertical grid lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      // Horizontal grid lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw particles
      particles.forEach((p) => {
        // Natural movement
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Interaction with mouse
        if (mouse.x > -500) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const forceRadius = 150;

          if (dist < forceRadius) {
            const force = (forceRadius - dist) / forceRadius;
            // Push gently away
            const angle = Math.atan2(dy, dx);
            p.x += Math.cos(angle) * force * 1.2;
            p.y += Math.sin(angle) * force * 1.2;
          }
        }

        // Pulse the opacity of particles
        p.pulseVal += p.pulseSpeed;
        const currentAlpha = p.alpha + Math.sin(p.pulseVal) * 0.1;

        // Draw particle glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = `${p.colorBase}${currentAlpha * 0.35})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.colorBase}${currentAlpha})`;
        ctx.fill();
      });

      // Draw elegant lens reflections / glass lines
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.007)';
      ctx.lineWidth = 2;
      ctx.moveTo(-100, -100);
      ctx.lineTo(canvas.width + 100, canvas.height + 100);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Background canvas */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Floating Ambient Glowing Orb 1 (Purple) */}
      <div 
        className="absolute top-1/4 left-1/4 w-[45vw] h-[45vw] rounded-full mix-blend-screen filter blur-[120px] pointer-events-none opacity-25 animate-pulse-slow bg-gradient-to-tr from-purple-800 to-transparent"
        style={{ transform: 'translate(-50%, -50%)' }}
      />

      {/* Floating Ambient Glowing Orb 2 (Blue) */}
      <div 
        className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] rounded-full mix-blend-screen filter blur-[140px] pointer-events-none opacity-20 animate-pulse-slow bg-gradient-to-bl from-blue-900 via-transparent to-transparent"
        style={{ transform: 'translate(30%, 30%)', animationDelay: '3s' }}
      />

      {/* Grid Overlay / Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030014]/50 via-transparent to-[#030014]/90 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#030014_95%)] pointer-events-none" />
    </div>
  );
};
