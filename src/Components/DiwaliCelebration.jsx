import { useEffect, useRef, useState } from "react";

const COLORS = [
  "#FF6B35", "#FFD700", "#FF4500", "#00CED1", "#FF69B4",
  "#7CFC00", "#FF1493", "#00BFFF", "#FFA500", "#ADFF2F",
];

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    const angle = Math.random() * Math.PI * 2;
    const speed = randomBetween(1.5, 6);
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.alpha = 1;
    this.decay = randomBetween(0.012, 0.025);
    this.radius = randomBetween(2, 4);
    this.gravity = 0.08;
    // sparkle tail
    this.trail = [];
  }
  update() {
    this.trail.push({ x: this.x, y: this.y, alpha: this.alpha });
    if (this.trail.length > 6) this.trail.shift();
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.vx *= 0.98;
    this.alpha -= this.decay;
  }
  draw(ctx) {
    this.trail.forEach((t, i) => {
      ctx.beginPath();
      ctx.arc(t.x, t.y, this.radius * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = this.color + Math.floor((t.alpha * (i / this.trail.length)) * 99).toString(16).padStart(2, "0");
      ctx.fill();
    });
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color + Math.floor(this.alpha * 255).toString(16).padStart(2, "0");
    ctx.fill();
  }
}

class Rocket {
  constructor(canvasW, canvasH) {
    this.x = randomBetween(canvasW * 0.1, canvasW * 0.9);
    this.y = canvasH;
    this.targetY = randomBetween(canvasH * 0.1, canvasH * 0.45);
    this.speed = randomBetween(6, 12);
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.exploded = false;
    this.particles = [];
    this.trail = [];
  }
  update(ctx) {
    if (!this.exploded) {
      this.trail.push({ x: this.x, y: this.y });
      if (this.trail.length > 10) this.trail.shift();
      this.y -= this.speed;
      if (this.y <= this.targetY) {
        this.exploded = true;
        const count = Math.floor(randomBetween(60, 120));
        for (let i = 0; i < count; i++) {
          this.particles.push(new Particle(this.x, this.y, this.color));
        }
      }
    } else {
      this.particles = this.particles.filter(p => p.alpha > 0);
      this.particles.forEach(p => p.update());
    }
  }
  draw(ctx) {
    if (!this.exploded) {
      this.trail.forEach((t, i) => {
        ctx.beginPath();
        ctx.arc(t.x, t.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,220,100,${i / this.trail.length * 0.8})`;
        ctx.fill();
      });
      ctx.beginPath();
      ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.fill();
    } else {
      this.particles.forEach(p => p.draw(ctx));
    }
  }
  isDone() {
    return this.exploded && this.particles.length === 0;
  }
}

export default function DiwaliCelebration() {
  const canvasRef = useRef(null);
  const [visible, setVisible] = useState(true);
  const rocketsRef = useRef([]);
  const rafRef = useRef(null);
  const launchTimerRef = useRef(null);
  const endTimerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const launchRocket = () => {
      rocketsRef.current.push(new Rocket(canvas.width, canvas.height));
    };

    // Initial burst
    for (let i = 0; i < 5; i++) {
      setTimeout(launchRocket, i * 300);
    }
    // Continuous launches every 600ms
    launchTimerRef.current = setInterval(launchRocket, 600);

    const animate = () => {
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      rocketsRef.current = rocketsRef.current.filter(r => !r.isDone());
      rocketsRef.current.forEach(r => { r.update(ctx); r.draw(ctx); });
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Stop launching after 2s, fade out overlay after 4s
    endTimerRef.current = setTimeout(() => {
      clearInterval(launchTimerRef.current);
      setTimeout(() => setVisible(false), 2000);
    }, 2000);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
      clearInterval(launchTimerRef.current);
      clearTimeout(endTimerRef.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        pointerEvents: "none",
        animation: visible ? undefined : "fadeOut 1s forwards",
      }}
    >
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />

      {/* Diwali message */}
      <div
        style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          pointerEvents: "auto",
          animation: "dipFloat 2s ease-in-out infinite",
          width: "90vw",
          maxWidth: "520px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <div style={{ marginBottom: "0.5rem" }}>
          <img
            src="/logos/aifabetalogo.svg"
            alt="AIFA"
            style={{ height: "clamp(32px, 8vw, 60px)", filter: "drop-shadow(0 0 12px rgba(255,215,0,0.7))" }}
          />
        </div>
        {/* Diyas row */}
        <div style={{ fontSize: "clamp(1.4rem, 5vw, 2.8rem)", marginBottom: "0.2rem", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
          🪔🪔🪔🪔🪔
        </div>
        <div
          style={{
            fontSize: "clamp(2rem, 9vw, 4.5rem)",
            fontWeight: 900,
            fontFamily: "Georgia, serif",
            background: "linear-gradient(135deg, #FFD700 0%, #FF6B35 40%, #FF1493 70%, #FFD700 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "none",
            lineHeight: 1.1,
            whiteSpace: "nowrap",
          }}
        >
          Happy Diwali!
        </div>
        <div
          style={{
            fontSize: "clamp(0.85rem, 3.5vw, 1.4rem)",
            color: "#FFD700",
            marginTop: "0.3rem",
            fontWeight: 500,
            textShadow: "0 0 12px rgba(255,215,0,0.9)",
            whiteSpace: "nowrap",
          }}
        >
          From the AIFA Team ✨
        </div>
        <div style={{ fontSize: "clamp(1.4rem, 5vw, 2.5rem)", marginTop: "0.4rem", whiteSpace: "nowrap" }}>
          🪔🪔🪔🪔🪔
        </div>

        {/* Close button */}
        <button
          onClick={() => setVisible(false)}
          style={{
            marginTop: "1.2rem",
            padding: "0.45rem 1.6rem",
            background: "linear-gradient(135deg, #FF6B35, #FFD700)",
            border: "none",
            borderRadius: "999px",
            color: "#000",
            fontWeight: 700,
            fontSize: "clamp(0.8rem, 3vw, 1rem)",
            cursor: "pointer",
            pointerEvents: "auto",
            boxShadow: "0 0 20px rgba(255,215,0,0.6)",
          }}
        >
          🎆 Celebrate!
        </button>
      </div>

      <style>{`
        @keyframes dipFloat {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -52%) scale(1.03); }
        }
      `}</style>
    </div>
  );
}
