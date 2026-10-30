import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Container, Counter, MagneticButton } from '../components/ui';
import { ScrollCue, OpulButton } from '../opul';
import { openInquiry } from '../lib/site';

/* ------------------------- Particle wave canvas (plain three.js) ------------------------- */

function ParticleWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.set(0, 1.5, 8);
    camera.lookAt(0, 0, 0);

    const cols = 140;
    const rows = 70;
    const count = cols * rows;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const viol = new THREE.Color('#8b5cf6');
    const lime = new THREE.Color('#c6ff3d');

    let i = 0;
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        const px = (x / (cols - 1) - 0.5) * 16;
        const py = (y / (rows - 1) - 0.5) * 9;
        positions[i * 3] = px;
        positions[i * 3 + 1] = py;
        positions[i * 3 + 2] = 0;
        const t = Math.min(Math.max(Math.hypot(px, py) / 10 - 0.2, 0) * 0.9, 1);
        const c = viol.clone().lerp(lime, t);
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
        i++;
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });
    const points = new THREE.Points(geo, mat);
    points.rotation.x = -0.45;
    scene.add(points);

    const mouse = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!reduced) window.addEventListener('mousemove', onMove);

    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize);

    const posAttr = geo.getAttribute('position') as THREE.BufferAttribute;
    const base = positions.slice();
    let raf = 0;
    let t = 0;

    const renderFrame = () => {
      t += 0.012;
      const arr = posAttr.array as Float32Array;
      for (let k = 0; k < count; k++) {
        const x = base[k * 3];
        const y = base[k * 3 + 1];
        arr[k * 3 + 2] = Math.sin(x * 0.6 + t) * 0.5 + Math.cos(y * 0.8 + t * 1.3) * 0.5;
      }
      posAttr.needsUpdate = true;
      if (!reduced) {
        // Subtle mouse parallax on the camera
        camera.position.x += (mouse.x * 1.2 - camera.position.x) * 0.05;
        camera.position.y += (1.5 - mouse.y * 0.8 - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);
      }
      renderer.render(scene, camera);
      if (!reduced) raf = requestAnimationFrame(renderFrame);
    };
    renderFrame(); // single static frame when reduced motion is preferred

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />;
}

/* ------------------------------------- Hero ------------------------------------- */

export default function Hero() {
  return (
    <header className="relative min-h-screen flex flex-col overflow-hidden pt-24">
      <ParticleWave />
      {/* legibility gradient over the canvas */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, transparent 30%, rgba(10,10,16,0.55) 100%)',
        }}
      />

      <Container>
        <div className="relative z-10 flex-1 flex flex-col justify-center py-16">
          {/* Availability pill */}
          <div className="inline-flex items-center gap-2.5 glass rounded-full px-4 py-2 mb-8 w-fit">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
            </span>
            <span className="text-sm text-white/80 font-medium">Available for new projects</span>
          </div>

          <p className="text-lime text-sm font-semibold tracking-[0.3em] uppercase mb-5">
            Web Developer
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-extrabold leading-[1.05] max-w-4xl mb-6">
            Your Business Deserves More Than Just a{' '}
            <span className="text-gradient">Website.</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mb-10">
            I design and develop stunning, responsive websites that help businesses build
            trust, attract customers, and grow online.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-14">
            <MagneticButton
              onClick={() => openInquiry({})}
              className="bg-lime text-black font-bold px-8 py-4 rounded-full hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              Get a Website for Your Business
            </MagneticButton>
            <OpulButton href="#work">Explore My Work</OpulButton>
          </div>

          {/* Counters */}
          <dl className="grid grid-cols-3 gap-6 max-w-xl">
            <div>
              <dt className="sr-only">Websites built</dt>
              <dd className="font-display text-3xl md:text-4xl font-extrabold text-lime">
                <Counter to={30} suffix="+" />
              </dd>
              <dd className="text-white/60 text-sm mt-1">Websites Built</dd>
            </div>
            <div>
              <dt className="sr-only">Services offered</dt>
              <dd className="font-display text-3xl md:text-4xl font-extrabold text-lime">
                <Counter to={8} />
              </dd>
              <dd className="text-white/60 text-sm mt-1">Services Offered</dd>
            </div>
            <div>
              <dt className="sr-only">Responsive builds</dt>
              <dd className="font-display text-3xl md:text-4xl font-extrabold text-lime">
                <Counter to={100} suffix="%" />
              </dd>
              <dd className="text-white/60 text-sm mt-1">Responsive Builds</dd>
            </div>
          </dl>
        </div>
      </Container>

      {/* Scroll cue */}
      <div className="relative z-10 pb-8 flex justify-center">
        <ScrollCue />
      </div>
    </header>
  );
}
