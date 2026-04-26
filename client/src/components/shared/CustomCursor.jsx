// src/components/shared/CustomCursor.jsx
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Only on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    let mouse = { x: 0, y: 0 };
    let ringPos = { x: 0, y: 0 };
    let rafId;

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      ringPos.x = lerp(ringPos.x, mouse.x, 0.12);
      ringPos.y = lerp(ringPos.y, mouse.y, 0.12);
      ring.style.transform = `translate(${ringPos.x - 18}px, ${ringPos.y - 18}px)`;
      rafId = requestAnimationFrame(animate);
    };

    const onEnterLink = () => {
      dot.style.opacity = '0';
      ring.style.width = '50px';
      ring.style.height = '50px';
      ring.style.borderColor = '#7c3aed';
      ring.style.background = 'rgba(124,58,237,0.08)';
    };

    const onLeaveLink = () => {
      dot.style.opacity = '1';
      ring.style.width = '36px';
      ring.style.height = '36px';
      ring.style.borderColor = 'rgba(124,58,237,0.5)';
      ring.style.background = 'transparent';
    };

    document.addEventListener('mousemove', onMove);
    document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
      el.addEventListener('mouseenter', onEnterLink);
      el.addEventListener('mouseleave', onLeaveLink);
    });

    animate();
    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <style>{`
        @media (pointer: coarse) { .cursor-dot, .cursor-ring { display: none; } }
        * { cursor: none !important; }
        a, button { cursor: none !important; }
      `}</style>
      <div ref={dotRef} className="cursor-dot" style={{
        position: 'fixed', top: 0, left: 0, width: 8, height: 8,
        background: '#06b6d4', borderRadius: '50%', pointerEvents: 'none',
        zIndex: 99999, transition: 'opacity 0.2s',
        willChange: 'transform',
      }} />
      <div ref={ringRef} className="cursor-ring" style={{
        position: 'fixed', top: 0, left: 0, width: 36, height: 36,
        border: '1.5px solid rgba(124,58,237,0.5)', borderRadius: '50%',
        pointerEvents: 'none', zIndex: 99998,
        transition: 'width 0.3s, height 0.3s, background 0.3s, border-color 0.3s',
        willChange: 'transform',
      }} />
    </>
  );
}
