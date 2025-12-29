import { useEffect, useRef } from 'react';

const AnimatedGlobe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let rotation = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    resize();
    window.addEventListener('resize', resize);

    // Generate dots for the globe
    const generateGlobePoints = () => {
      const points: { lat: number; lng: number; size: number; pulse: number }[] = [];
      const latStep = 12;
      const lngStep = 12;

      for (let lat = -90; lat <= 90; lat += latStep) {
        for (let lng = -180; lng < 180; lng += lngStep) {
          if (Math.random() > 0.25) {
            points.push({ 
              lat, 
              lng, 
              size: 1.5 + Math.random() * 2,
              pulse: Math.random() * Math.PI * 2
            });
          }
        }
      }
      return points;
    };

    const points = generateGlobePoints();

    // Generate connections
    const generateConnections = () => {
      const connections: { from: number; to: number }[] = [];
      for (let i = 0; i < 50; i++) {
        const from = Math.floor(Math.random() * points.length);
        const to = Math.floor(Math.random() * points.length);
        if (from !== to) {
          connections.push({ from, to });
        }
      }
      return connections;
    };

    const connections = generateConnections();

    // Particle system for extra flair
    const particles: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number }[] = [];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) * 0.75;
      const time = Date.now() / 1000;

      // Draw outer glow with multiple layers
      for (let i = 3; i >= 0; i--) {
        const glowRadius = radius * (1 + i * 0.15);
        const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.3, centerX, centerY, glowRadius);
        gradient.addColorStop(0, 'rgba(56, 189, 248, 0)');
        gradient.addColorStop(0.5, `rgba(56, 189, 248, ${0.03 - i * 0.005})`);
        gradient.addColorStop(0.8, `rgba(36, 54, 101, ${0.05 - i * 0.01})`);
        gradient.addColorStop(1, 'rgba(56, 189, 248, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Draw connections with glow
      connections.forEach(({ from, to }) => {
        const p1 = points[from];
        const p2 = points[to];

        const x1 = Math.cos((p1.lat * Math.PI) / 180) * Math.cos(((p1.lng + rotation) * Math.PI) / 180);
        const y1 = Math.sin((p1.lat * Math.PI) / 180);
        const z1 = Math.cos((p1.lat * Math.PI) / 180) * Math.sin(((p1.lng + rotation) * Math.PI) / 180);

        const x2 = Math.cos((p2.lat * Math.PI) / 180) * Math.cos(((p2.lng + rotation) * Math.PI) / 180);
        const y2 = Math.sin((p2.lat * Math.PI) / 180);
        const z2 = Math.cos((p2.lat * Math.PI) / 180) * Math.sin(((p2.lng + rotation) * Math.PI) / 180);

        if (z1 > -0.2 && z2 > -0.2) {
          const screenX1 = centerX + x1 * radius;
          const screenY1 = centerY - y1 * radius;
          const screenX2 = centerX + x2 * radius;
          const screenY2 = centerY - y2 * radius;

          const alpha = Math.min(z1 + 0.3, z2 + 0.3) * 0.4;
          
          // Glowing line
          ctx.beginPath();
          ctx.moveTo(screenX1, screenY1);
          ctx.lineTo(screenX2, screenY2);
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha * 0.8})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          
          // Subtle glow effect
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha * 0.3})`;
          ctx.lineWidth = 3;
          ctx.stroke();
        }
      });

      // Draw dots with pulsing glow
      points.forEach(({ lat, lng, size, pulse }) => {
        const x = Math.cos((lat * Math.PI) / 180) * Math.cos(((lng + rotation) * Math.PI) / 180);
        const y = Math.sin((lat * Math.PI) / 180);
        const z = Math.cos((lat * Math.PI) / 180) * Math.sin(((lng + rotation) * Math.PI) / 180);

        if (z > -0.1) {
          const screenX = centerX + x * radius;
          const screenY = centerY - y * radius;

          const pulseValue = 0.6 + Math.sin(time * 2 + pulse) * 0.4;
          const dotSize = size * (0.8 + z * 0.5) * pulseValue;
          const alpha = (0.4 + z * 0.6) * pulseValue;

          // Outer glow
          const glowGradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, dotSize * 4);
          glowGradient.addColorStop(0, `rgba(56, 189, 248, ${alpha * 0.6})`);
          glowGradient.addColorStop(0.4, `rgba(56, 189, 248, ${alpha * 0.2})`);
          glowGradient.addColorStop(1, 'rgba(56, 189, 248, 0)');
          
          ctx.beginPath();
          ctx.arc(screenX, screenY, dotSize * 4, 0, Math.PI * 2);
          ctx.fillStyle = glowGradient;
          ctx.fill();

          // Core dot
          ctx.beginPath();
          ctx.arc(screenX, screenY, dotSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(99, 179, 237, ${alpha + 0.3})`;
          ctx.fill();

          // Spawn particles occasionally
          if (Math.random() < 0.002 && z > 0.5) {
            particles.push({
              x: screenX,
              y: screenY,
              vx: (Math.random() - 0.5) * 2,
              vy: (Math.random() - 0.5) * 2,
              life: 60,
              maxLife: 60
            });
          }
        }
      });

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life--;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const alpha = (p.life / p.maxLife) * 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${alpha})`;
        ctx.fill();
      }

      // Draw orbital rings with gradient
      const ringGradient = ctx.createLinearGradient(centerX - radius, centerY, centerX + radius, centerY);
      ringGradient.addColorStop(0, 'rgba(56, 189, 248, 0.05)');
      ringGradient.addColorStop(0.5, 'rgba(56, 189, 248, 0.15)');
      ringGradient.addColorStop(1, 'rgba(56, 189, 248, 0.05)');

      ctx.beginPath();
      ctx.ellipse(centerX, centerY, radius * 1.1, radius * 0.35, 0, 0, Math.PI * 2);
      ctx.strokeStyle = ringGradient;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(centerX, centerY, radius * 0.9, radius * 0.55, Math.PI / 5, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(36, 54, 101, 0.12)';
      ctx.lineWidth = 1;
      ctx.stroke();

      rotation += 0.2;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[400px]">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default AnimatedGlobe;