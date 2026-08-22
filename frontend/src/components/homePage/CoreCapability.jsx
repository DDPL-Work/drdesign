import React, { useEffect, useRef, useState } from "react";
import { GiFlowerEmblem } from "react-icons/gi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "@google/model-viewer";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   ROPE + KNOT + CLOTH — single unified Three.js system
   - Rope: static tapered tube from drone anchor to knot
   - Knot: radiating pleat fan (Three.js meshes, real lighting)
   - Cloth: Verlet cloth sim, pinned ONLY at the two knot points
   ========================================================= */
function RopeBannerCloth({
  bannerWidth,
  ropeHeight,
  bannerHeight,
  text = "Core Capabilities",
  colorA = "#f4ba29",
  colorB = "#081023",
}) {
  const mountRef = useRef(null);

  useEffect(() => {
    const MARGIN = 70; // extra canvas room for knot fans + rope
    const width = bannerWidth + MARGIN * 2;
    const height = ropeHeight + bannerHeight + MARGIN;
    const mount = mountRef.current;
    if (!mount) return;

    // ---------- Scene / Camera / Renderer ----------
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      -width / 2,
      width / 2,
      height / 2,
      -height / 2,
      0.1,
      2000,
    );
    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // ---------- Lighting (drives ALL fold + pleat shading) ----------
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
    dirLight.position.set(-150, 220, 260);
    scene.add(dirLight);
    const rimLight = new THREE.DirectionalLight(0xfff2cc, 0.35);
    rimLight.position.set(150, -100, 150);
    scene.add(rimLight);

    // ---------- Coordinate anchors ----------
    const top = height / 2 - 6; // canvas top edge (where drones sit)
    const knotY = top - ropeHeight; // y where rope ends / cloth top corners are
    const halfSpan = bannerWidth / 2;
    const leftX = -halfSpan;
    const rightX = halfSpan;

    // ---------- Rope color/texture (twisted fiber look) ----------
    const ropeCanvas = document.createElement("canvas");
    ropeCanvas.width = 32;
    ropeCanvas.height = 128;
    const rctx = ropeCanvas.getContext("2d");
    rctx.fillStyle = "#080808";
    rctx.fillRect(0, 0, 32, 128);
    for (let y = 0; y < 128; y += 4) {
      rctx.strokeStyle = y % 8 === 0 ? "#111111" : "#040404";
      rctx.lineWidth = 2;
      rctx.beginPath();
      rctx.moveTo(-4, y);
      rctx.lineTo(36, y + 8);
      rctx.stroke();
    }
    const ropeTexture = new THREE.CanvasTexture(ropeCanvas);
    ropeTexture.wrapS = ropeTexture.wrapT = THREE.RepeatWrapping;
    ropeTexture.repeat.set(1, 3);

    function makeRope(x) {
      const radius = 3;
      const totalHeight = top - (knotY - 4);
      const geo = new THREE.CapsuleGeometry(
        radius,
        totalHeight - radius * 2,
        4,
        8,
      );
      const mat = new THREE.MeshPhongMaterial({
        map: ropeTexture,
        shininess: 8,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, (top + knotY - 4) / 2, 4);
      return mesh;
    }
    const leftRope = makeRope(leftX);
    const rightRope = makeRope(rightX);
    scene.add(leftRope, rightRope);

    // ---------- Cloth texture (blended flat color + text, no gradient) ----------
    const texCanvas = document.createElement("canvas");
    texCanvas.width = 1024;
    texCanvas.height = Math.round(1024 * (bannerHeight / bannerWidth));
    const ctx = texCanvas.getContext("2d");

    const mixHex = (a, b) => {
      const ah = a.replace("#", ""),
        bh = b.replace("#", "");
      const ar = parseInt(ah.slice(0, 2), 16),
        ag = parseInt(ah.slice(2, 4), 16),
        ab = parseInt(ah.slice(4, 6), 16);
      const br = parseInt(bh.slice(0, 2), 16),
        bg = parseInt(bh.slice(2, 4), 16),
        bb = parseInt(bh.slice(4, 6), 16);
      return `rgb(${Math.round((ar + br) / 2)}, ${Math.round((ag + bg) / 2)}, ${Math.round((ab + bb) / 2)})`;
    };
    ctx.fillStyle = mixHex(colorA, colorB);
    ctx.fillRect(0, 0, texCanvas.width, texCanvas.height);

    // fine woven-fiber grain
    const grain = ctx.createImageData(texCanvas.width, texCanvas.height);
    for (let i = 0; i < grain.data.length; i += 4) {
      const n = 245 + Math.random() * 10;
      grain.data[i] = n;
      grain.data[i + 1] = n;
      grain.data[i + 2] = n;
      grain.data[i + 3] = Math.random() * 10;
    }
    const grainCanvas = document.createElement("canvas");
    grainCanvas.width = texCanvas.width;
    grainCanvas.height = texCanvas.height;
    grainCanvas.getContext("2d").putImageData(grain, 0, 0);
    ctx.drawImage(grainCanvas, 0, 0);

    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    let fontSize = Math.round(texCanvas.height * 0.42);
    ctx.font = `bold ${fontSize}px 'JetBrains Mono', monospace`;
    let tw = ctx.measureText(text).width;
    if (tw > texCanvas.width * 0.88) {
      fontSize = Math.floor(fontSize * ((texCanvas.width * 0.88) / tw));
      ctx.font = `bold ${fontSize}px 'JetBrains Mono', monospace`;
    }
    ctx.fillText(text, texCanvas.width / 2, texCanvas.height / 2);

    // pennant cutout
    ctx.globalCompositeOperation = "destination-in";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(texCanvas.width, 0);
    ctx.lineTo(texCanvas.width, texCanvas.height * 0.85);
    ctx.lineTo(texCanvas.width / 2, texCanvas.height);
    ctx.lineTo(0, texCanvas.height * 0.85);
    ctx.closePath();
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";

    const texture = new THREE.CanvasTexture(texCanvas);
    texture.needsUpdate = true;

    // ---------- Cloth grid (Verlet particles), PINNED ONLY AT THE TWO KNOTS ----------
    const cols = 40,
      rows = 12;
    const spacingX = bannerWidth / cols,
      spacingY = bannerHeight / rows;
    const particles = [];
    for (let y = 0; y <= rows; y++) {
      for (let x = 0; x <= cols; x++) {
        const px = leftX + x * spacingX;
        const py = knotY - y * spacingY;
        const pinned = y === 0 && (x === 0 || x === cols); // ONLY the two top corners
        particles.push({
          x: px,
          y: py,
          z: 0,
          oldx: px,
          oldy: py,
          oldz: 0,
          pinned,
        });
      }
    }
    const idx = (x, y) => y * (cols + 1) + x;

    const constraints = [];
    for (let y = 0; y <= rows; y++) {
      for (let x = 0; x <= cols; x++) {
        if (x < cols) constraints.push([idx(x, y), idx(x + 1, y), "h"]);
        if (y < rows) constraints.push([idx(x, y), idx(x, y + 1), "v"]);
        if (x < cols && y < rows)
          constraints.push([idx(x, y), idx(x + 1, y + 1), "d"]); // shear/diagonal
      }
    }
    // TIGHTNESS FIX: pre-tension horizontal constraints only (pull sideways taut)
    // while leaving vertical/diagonal rest lengths untouched so folds still form.
    const HORIZONTAL_TENSION = 0.94; // <1 = tighter pull side-to-side
    constraints.forEach((c) => {
      const a = particles[c[0]],
        b = particles[c[1]];
      const natural = Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
      c.restLength = c[2] === "h" ? natural * HORIZONTAL_TENSION : natural;
    });

    const geometry = new THREE.PlaneGeometry(
      bannerWidth,
      bannerHeight,
      cols,
      rows,
    );
    const material = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide,
      shininess: 12,
      specular: 0x222222,
      transparent: true,
      alphaTest: 0.1,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = knotY - bannerHeight / 2;
    scene.add(mesh);
    const posAttr = geometry.attributes.position;

    // ---------- Physics — TIGHTNESS FIX: much lower gravity, more solver iterations ----------
    const gravity = -0.08; // was -0.22 — far less droop
    let t = 0,
      frameId;

    function verletStep() {
      particles.forEach((p) => {
        if (p.pinned) return;
        const vx = (p.x - p.oldx) * 0.985;
        const vy = (p.y - p.oldy) * 0.985;
        const vz = (p.z - p.oldz) * 0.985;
        p.oldx = p.x;
        p.oldy = p.y;
        p.oldz = p.z;
        p.x += vx;
        p.y += vy + gravity;
        p.z += vz;
      });

      t += 0.016;
      particles.forEach((p, i) => {
        if (p.pinned) return;
        const colFactor = (i % (cols + 1)) / cols;
        const wind =
          Math.sin(t * 1.2 + colFactor * 4) * 1.1 +
          Math.sin(t * 0.55 + colFactor * 7) * 0.4;
        p.z += wind * 0.12;
      });

      for (let iter = 0; iter < 8; iter++) {
        // was 5 — stiffer convergence keeps it taut
        constraints.forEach((c) => {
          const a = particles[c[0]],
            b = particles[c[1]];
          const dx = b.x - a.x,
            dy = b.y - a.y,
            dz = b.z - a.z;
          const dist = Math.hypot(dx, dy, dz) || 0.0001;
          const diff = ((dist - c.restLength) / dist) * 0.5;
          const ox = dx * diff,
            oy = dy * diff,
            oz = dz * diff;
          if (!a.pinned) {
            a.x += ox;
            a.y += oy;
            a.z += oz;
          }
          if (!b.pinned) {
            b.x -= ox;
            b.y -= oy;
            b.z -= oz;
          }
        });
      }
    }

    function syncGeometry() {
      const meshY = mesh.position.y;
      for (let i = 0; i < particles.length; i++) {
        posAttr.setXYZ(
          i,
          particles[i].x - mesh.position.x,
          particles[i].y - meshY,
          particles[i].z,
        );
      }
      posAttr.needsUpdate = true;
      geometry.computeVertexNormals();
    }
    mesh.position.x = 0;

    function animate() {
      verletStep();
      syncGeometry();
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      ropeTexture.dispose();
      leftRope.geometry.dispose();
      leftRope.material.dispose();
      rightRope.geometry.dispose();
      rightRope.material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, [bannerWidth, ropeHeight, bannerHeight, text, colorA, colorB]);

  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        overflow: "visible",
      }}
    />
  );
}

/* ================= rest of your page (unchanged) ================= */

const bandStyles = `
@keyframes slide-left {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.band-left {
  display: flex;
  width: max-content;
  animation: slide-left 65s linear infinite;
  will-change: transform;
}
@media (max-width: 767px) {
  .band-dark { transform: rotate(-14deg); }
  .band-orange { transform: rotate(14deg); }
}
@media (min-width: 768px) {
  .band-dark { transform: rotate(-6deg); }
  .band-orange { transform: rotate(6deg); }
}
`;

const orangeItems = [
  "Cybersecurity & Network Solutions",
  "API Development & System Integration",
  "Database Design & Management",
  "Web Development",
  "Mobile Development",
  "ERP Development",
  "General IT Consultation",
  "IT Support & Maintenance",
];

const blueItems = [
  "Drone Mapping & Photogrammetry",
  "3D GIS & Spatial Visualization",
  "GIS Mapping & Cartography",
  "Surveying & Topographic Mapping",
];

const BandItem = ({ label, isBlack }) => (
  <span
    className={`font-inter text-[20px] md:text-[32px] font-bold whitespace-nowrap flex items-center ${isBlack ? "text-black" : "text-white"}`}
  >
    <span className="mx-6 md:mx-10">{label}</span>
    <span
      className={`text-[12px] md:text-[20px] mr-2 ${isBlack ? "text-black/50" : "text-white/50"}`}
    >
      <GiFlowerEmblem />
    </span>
  </span>
);

const CoreCapability = () => {
  const doubledOrange = [...orangeItems, ...orangeItems];
  const doubledBlue = [...blueItems, ...blueItems, ...blueItems, ...blueItems];

  const sectionRef = useRef(null);
  const orangeBandRef = useRef(null);
  const blueBandRef = useRef(null);

  const bannerContainerRef = useRef(null);
  const droneLeftPivotRef = useRef(null);
  const droneLeftRef = useRef(null);
  const droneRightPivotRef = useRef(null);
  const droneRightRef = useRef(null);
  const headingRef = useRef(null);

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false,
  );

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    const ctx = gsap.context(() => {
      const mobile = window.innerWidth < 768;
      const triggerPercent = mobile ? 0.4 : 0.65;
      const topOffset = mobile ? 30 : 60;

      const clientsHeight =
        mobile && sectionRef.current.previousElementSibling
          ? sectionRef.current.previousElementSibling.offsetHeight
          : 0;

      // Start well past the screen edges so they don't clip into the viewport
      const startX = window.innerWidth / 2 + 300;
      const distanceToScreenTop =
        window.innerHeight * triggerPercent + clientsHeight + topOffset;
      const startY = distanceToScreenTop * 2.5;

      gsap.set(droneLeftRef.current, {
        xPercent: -50,
        yPercent: -50,
        x: -startX,
        y: -startY,
        scale: 1,
        rotation: 0,
        opacity: 0,
      });
      gsap.set(droneLeftPivotRef.current, { rotation: 0 });

      gsap.set(droneRightRef.current, {
        xPercent: -50,
        yPercent: -50,
        x: startX,
        y: -startY,
        scale: 1,
        rotation: 0,
        opacity: 0,
      });
      gsap.set(droneRightPivotRef.current, { rotation: 0 });

      gsap.set(headingRef.current, {
        clipPath: "inset(0% 0% 100% 0%)",
        scaleY: 0.3,
        rotationX: -60,
        opacity: 0,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger:
            mobile && sectionRef.current.previousElementSibling
              ? sectionRef.current.previousElementSibling
              : sectionRef.current,
          start: mobile ? "top 40%" : "top 65%",
        },
        onComplete: () => {
          gsap.to(bannerContainerRef.current, {
            y: -20,
            duration: 3.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        },
      });

      tl.from(
        orangeBandRef.current,
        { x: -200, opacity: 0, duration: 2.5, ease: "power3.out" },
        0,
      ).from(
        blueBandRef.current,
        { x: 200, opacity: 0, duration: 2.5, ease: "power3.out" },
        0,
      );

      const finalX = mobile ? 120 : 250;
      const flightDuration = 3.5;

      // Changed from expo.out to power2.out so the diagonal flight is visible and not instantly fast
      // Added opacity: 1 so they fade in as they enter the screen
      tl.to(
        droneLeftRef.current,
        {
          x: -finalX,
          y: 0,
          scale: 1,
          opacity: 1,
          duration: flightDuration,
          ease: "power2.out",
        },
        0,
      );

      tl.to(
        droneRightRef.current,
        {
          x: finalX,
          y: 0,
          scale: 1,
          opacity: 1,
          duration: flightDuration,
          ease: "power2.out",
        },
        0,
      );

      tl.to(
        headingRef.current,
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scaleY: 1,
          rotationX: 0,
          opacity: 1,
          duration: 3.0,
          ease: "power4.out",
        },
        flightDuration - 1.5,
      );
    }, sectionRef);

    // On first visit, the main content is at y: 100vh during the loading screen.
    // GSAP measures scroll positions while the content is off-screen, causing broken animations.
    // We listen for 'ddpl:layout-ready' — dispatched by App.jsx after the loading transition
    // completes — to refresh all ScrollTrigger calculations at the right moment.
    const onLayoutReady = () => ScrollTrigger.refresh();
    window.addEventListener("ddpl:layout-ready", onLayoutReady);

    return () => {
      window.removeEventListener("ddpl:layout-ready", onLayoutReady);
      ctx.revert();
    };
  }, []);

  const bannerWidth = isMobile ? 240 : 500;
  const ropeHeight = isMobile ? 40 : 80;
  const bannerHeight = isMobile ? 70 : 120;

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white pt-[144px] pb-0 relative z-20"
    >
      <style>{bandStyles}</style>

      <div
        ref={bannerContainerRef}
        className="absolute left-1/2 top-[114px] md:top-[124px] w-0 h-0 z-999 pointer-events-none"
        style={{ transform: "scaleY(0.4)" }}
      >
        {/* Left Drone */}
        <div
          ref={droneLeftPivotRef}
          className="w-0 h-0 absolute left-0 top-0 z-20 overflow-visible"
        >
          <div
            ref={droneLeftRef}
            className="absolute left-0 top-0 pointer-events-auto overflow-visible"
          >
            <div
              style={{ transform: "scaleY(2.5)" }}
              className="relative flex justify-center overflow-visible"
            >
              <div className="transform scale-[0.9] md:scale-100 origin-center transition-transform duration-300">
                <model-viewer
                  src="/scene.gltf"
                  autoplay
                  camera-controls={false}
                  scale="0.5 0.5 0.5"
                  disable-zoom
                  loading="eager"
                  camera-orbit="0deg  130%"
                  tabindex="-1"
                  interaction-prompt="none"
                  className="w-40 h-40 md:w-80 md:h-80 z-9999999 outline-none"
                  style={{ pointerEvents: "auto" }}
                >
                  <div slot="progress-bar" className="hidden"></div>
                </model-viewer>
              </div>
            </div>
          </div>
        </div>

        {/* Right Drone */}
        <div
          ref={droneRightPivotRef}
          className="w-0 h-0 absolute left-0 top-0 z-20 overflow-visible"
        >
          <div
            ref={droneRightRef}
            className="absolute left-0 top-0 pointer-events-auto overflow-visible"
          >
            <div
              style={{ transform: "scaleY(2.5)" }}
              className="relative flex justify-center overflow-visible"
            >
              <div className="transform scale-[0.9] md:scale-100 origin-center transition-transform duration-300">
                <model-viewer
                  src="/scene.gltf"
                  autoplay
                  camera-controls={false}
                  scale="0.5 0.5 0.5"
                  disable-zoom
                  loading="lazy"
                  camera-orbit="0deg  130%"
                  tabindex="-1"
                  interaction-prompt="none"
                  className="w-40 h-40 md:w-80 md:h-80 z-9999 outline-none "
                  style={{ pointerEvents: "auto" }}
                >
                  <div slot="progress-bar" className="hidden"></div>
                </model-viewer>
              </div>
            </div>
          </div>
        </div>

        {/* Unified Rope + Knot + Cloth system */}
        <div
          style={{ transform: "scaleY(2.5)", perspective: "1200px" }}
          className="absolute left-0 top-0 w-0 h-0 flex justify-center pointer-events-none z-0"
        >
          <div
            ref={headingRef}
            style={{
              position: "absolute",
              left: `${-(bannerWidth + 140) / 2}px`,
              top: 0,
              width: `${bannerWidth + 140}px`,
              height: `${ropeHeight + bannerHeight + 70}px`,
              transformOrigin: "top center",
              transformStyle: "preserve-3d",
            }}
          >
            <RopeBannerCloth
              bannerWidth={bannerWidth}
              ropeHeight={ropeHeight}
              bannerHeight={bannerHeight}
              colorA="#080808"
              colorB="#080808"
            />
          </div>
        </div>
      </div>

      <div className="text-center md:mb-12 mb-7 px-6 relative z-0 opacity-0 pointer-events-none">
        <h2 className="font-jetbrains text-[22px] md:text-[60px] font-normal leading-[1.2]">
          Core Capabilities
        </h2>
      </div>

      <div className="w-full overflow-hidden">
        <div className="md:pt-[37px] md:pb-[35px] pt-10 relative">
          <div className="relative h-[140px] md:h-[224px]">
            <div
              ref={orangeBandRef}
              className="absolute w-[250vw] h-[45px] md:h-[72px] -left-[75vw] top-[25%] bg-[#111625] py-[6px] md:py-[10px] z-20 band-dark"
            >
              <div className="band-left">
                {doubledOrange.map((label, i) => (
                  <BandItem key={i} label={label} />
                ))}
              </div>
            </div>

            <div
              ref={blueBandRef}
              className="absolute w-[250vw] h-[45px] md:h-[72px] -left-[75vw] top-[25%] bg-[#f4ba29] py-[6px] md:py-[10px] z-10 band-orange"
            >
              <div className="band-left">
                {doubledBlue.map((label, i) => (
                  <BandItem key={i} label={label} isBlack={true} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreCapability;
