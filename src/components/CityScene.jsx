import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Interactive 3D Smart City Scene using Three.js
 * Contains: skyscrapers, glowing roads, moving vehicles, wind turbines with spinning blades,
 * patrol drones with pulse lights, green parks, and day/night atmospheric glow.
 */
export const CityScene = ({ isLightMode = false, interactive = true }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(isLightMode ? 0xdcfce7 : 0x02170e, 0.015);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 32, 60);
    camera.lookAt(0, 5, 0);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.shadowMap.enabled = false;
      container.appendChild(renderer.domElement);
    } catch (err) {
      console.warn('WebGL initialization skipped, using atmospheric fallback:', err);
      return;
    }

    // 3. Lighting - Cyber Emerald Bio-City Palette
    const ambientLight = new THREE.AmbientLight(
      isLightMode ? 0xffffff : 0x064e3b,
      isLightMode ? 1.2 : 0.95
    );
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(
      isLightMode ? 0x059669 : 0x10b981,
      isLightMode ? 1.4 : 1.3
    );
    dirLight.position.set(30, 50, 40);
    scene.add(dirLight);

    const accentLight = new THREE.PointLight(0x34d399, 2.8, 95);
    accentLight.position.set(-20, 15, 10);
    scene.add(accentLight);

    const mintLight = new THREE.PointLight(0x6ee7b7, 2.2, 85);
    mintLight.position.set(25, 20, -15);
    scene.add(mintLight);

    // 4. Ground Grid / Holographic Grid
    const groundGeo = new THREE.PlaneGeometry(160, 160, 32, 32);
    const groundMat = new THREE.MeshBasicMaterial({
      color: isLightMode ? 0xecfdf5 : 0x02130b,
      wireframe: false
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    scene.add(ground);

    const gridHelper = new THREE.GridHelper(
      160,
      40,
      isLightMode ? 0x059669 : 0x10b981,
      isLightMode ? 0xa7f3d0 : 0x064e3b
    );
    gridHelper.position.y = 0.05;
    scene.add(gridHelper);

    // 5. Buildings (Skyscrapers)
    const buildingGroup = new THREE.Group();
    const buildingGeometries = [
      new THREE.BoxGeometry(3.5, 1, 3.5),
      new THREE.BoxGeometry(4.5, 1, 4.5),
      new THREE.CylinderGeometry(2, 2.5, 1, 8),
      new THREE.BoxGeometry(3, 1, 5)
    ];

    const buildingMaterials = [
      new THREE.MeshStandardMaterial({
        color: isLightMode ? 0xd1fae5 : 0x052e1b,
        metalness: 0.8,
        roughness: 0.2
      }),
      new THREE.MeshStandardMaterial({
        color: isLightMode ? 0xa7f3d0 : 0x032013,
        metalness: 0.85,
        roughness: 0.15
      }),
      new THREE.MeshStandardMaterial({
        color: isLightMode ? 0xbbf7d0 : 0x083c24,
        metalness: 0.7,
        roughness: 0.3
      })
    ];

    const beaconGeo = new THREE.SphereGeometry(0.35, 8, 8);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0x34d399 });
    const mintBeaconMat = new THREE.MeshBasicMaterial({ color: 0x6ee7b7 });

    const buildingPositions = [];
    // Generate grid of skyscrapers around city center with open road corridors
    for (let x = -45; x <= 45; x += 9) {
      for (let z = -45; z <= 45; z += 9) {
        // Leave main avenues open
        if (Math.abs(x) < 4 || Math.abs(z) < 4) continue;
        if (Math.random() < 0.25) continue; // Green park gaps

        const heightVal = 6 + Math.random() * 26 + (30 - Math.min(30, Math.hypot(x, z) * 0.4));
        const geoIndex = Math.floor(Math.random() * buildingGeometries.length);
        const matIndex = Math.floor(Math.random() * buildingMaterials.length);

        const building = new THREE.Mesh(buildingGeometries[geoIndex], buildingMaterials[matIndex]);
        building.scale.set(1, heightVal, 1);
        building.position.set(
          x + (Math.random() - 0.5) * 1.5,
          heightVal / 2,
          z + (Math.random() - 0.5) * 1.5
        );
        buildingGroup.add(building);

        // Add rooftop beacon
        if (heightVal > 15) {
          const beacon = new THREE.Mesh(beaconGeo, Math.random() > 0.5 ? beaconMat : mintBeaconMat);
          beacon.position.set(building.position.x, heightVal + 0.5, building.position.z);
          buildingGroup.add(beacon);
        }

        buildingPositions.push({ x: building.position.x, z: building.position.z });
      }
    }
    scene.add(buildingGroup);

    // 6. Glowing Road Corridors - Emerald Cyber Arteries
    const roadMat = new THREE.MeshBasicMaterial({
      color: isLightMode ? 0x059669 : 0x10b981,
      transparent: true,
      opacity: 0.55
    });
    
    // Central North-South Avenue
    const roadNS = new THREE.Mesh(new THREE.PlaneGeometry(3.5, 120), roadMat);
    roadNS.rotation.x = -Math.PI / 2;
    roadNS.position.set(0, 0.1, 0);
    scene.add(roadNS);

    // Central East-West Avenue
    const roadEW = new THREE.Mesh(new THREE.PlaneGeometry(120, 3.5), roadMat);
    roadEW.rotation.x = -Math.PI / 2;
    roadEW.position.set(0, 0.1, 0);
    scene.add(roadEW);

    // 7. Moving Autonomous Vehicles (Light Trails)
    const vehicleCount = 36;
    const vehicleGroup = new THREE.Group();
    const vehicleGeo = new THREE.BoxGeometry(0.7, 0.35, 1.4);
    const vehicleMatCyan = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const vehicleMatEmerald = new THREE.MeshBasicMaterial({ color: 0x34d399 });
    const vehicleMatAmber = new THREE.MeshBasicMaterial({ color: 0xf59e0b });

    const vehicles = [];
    for (let i = 0; i < vehicleCount; i++) {
      const isNS = Math.random() > 0.5;
      const mat = i % 3 === 0 ? vehicleMatAmber : (i % 2 === 0 ? vehicleMatCyan : vehicleMatEmerald);
      const mesh = new THREE.Mesh(vehicleGeo, mat);
      
      const speed = 0.18 + Math.random() * 0.22;
      const direction = Math.random() > 0.5 ? 1 : -1;
      
      let x = isNS ? (direction > 0 ? 0.9 : -0.9) : (Math.random() - 0.5) * 100;
      let z = !isNS ? (direction > 0 ? 0.9 : -0.9) : (Math.random() - 0.5) * 100;
      
      mesh.position.set(x, 0.3, z);
      if (!isNS) mesh.rotation.y = Math.PI / 2;
      
      vehicleGroup.add(mesh);
      vehicles.push({ mesh, isNS, speed, direction });
    }
    scene.add(vehicleGroup);

    // 8. Wind Turbines (Renewable Eco-city)
    const turbineGroup = new THREE.Group();
    const turbineBlades = [];
    const poleGeo = new THREE.CylinderGeometry(0.2, 0.35, 12, 8);
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8 });
    const hubGeo = new THREE.SphereGeometry(0.5, 8, 8);
    const bladeGeo = new THREE.BoxGeometry(0.25, 4.5, 0.1);
    const bladeMat = new THREE.MeshStandardMaterial({ color: 0x10b981 });

    const turbineCoords = [
      { x: -50, z: -35 },
      { x: -52, z: -20 },
      { x: -48, z: -5 },
      { x: 50, z: 35 },
      { x: 52, z: 20 }
    ];

    turbineCoords.forEach(({ x, z }) => {
      const pole = new THREE.Mesh(poleGeo, poleMat);
      pole.position.set(x, 6, z);
      turbineGroup.add(pole);

      const hub = new THREE.Mesh(hubGeo, poleMat);
      hub.position.set(x, 12, z);
      turbineGroup.add(hub);

      const bladesHolder = new THREE.Group();
      bladesHolder.position.set(x, 12, z + 0.4);

      for (let b = 0; b < 3; b++) {
        const blade = new THREE.Mesh(bladeGeo, bladeMat);
        blade.position.y = 2.2;
        const bladeWrapper = new THREE.Group();
        bladeWrapper.rotation.z = (b * Math.PI * 2) / 3;
        bladeWrapper.add(blade);
        bladesHolder.add(bladeWrapper);
      }
      turbineGroup.add(bladesHolder);
      turbineBlades.push(bladesHolder);
    });
    scene.add(turbineGroup);

    // 9. Autonomous Patrol Drones with Searchlights
    const droneGroup = new THREE.Group();
    const droneGeo = new THREE.OctahedronGeometry(0.8, 0);
    const droneMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee, wireframe: true });
    const droneLightMat = new THREE.MeshBasicMaterial({ color: 0x34d399 });

    const drones = [];
    for (let d = 0; d < 4; d++) {
      const droneMesh = new THREE.Mesh(droneGeo, droneMat);
      const droneCore = new THREE.Mesh(new THREE.SphereGeometry(0.3, 8, 8), droneLightMat);
      droneMesh.add(droneCore);

      const angle = (d * Math.PI * 2) / 4;
      const radius = 25 + d * 5;
      const altitude = 16 + d * 4;

      droneMesh.position.set(Math.cos(angle) * radius, altitude, Math.sin(angle) * radius);
      droneGroup.add(droneMesh);
      drones.push({ mesh: droneMesh, radius, altitude, angle, speed: 0.008 + d * 0.003 });
    }
    scene.add(droneGroup);

    // 10. Ambient Floating Cyber Particles
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let p = 0; p < particleCount * 3; p += 3) {
      particlePositions[p] = (Math.random() - 0.5) * 120;
      particlePositions[p + 1] = 2 + Math.random() * 40;
      particlePositions[p + 2] = (Math.random() - 0.5) * 120;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.8,
      color: 0x34d399,
      transparent: true,
      opacity: 0.6
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Mouse Parallax Interaction
    let targetCameraX = 0;
    let targetCameraY = 32;

    const handleMouseMove = (e) => {
      if (!interactive) return;
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetCameraX = mouseX * 18;
      targetCameraY = 32 + mouseY * 8;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // 11. Animation Loop
    let animationFrameId;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = (performance.now() - startTime) * 0.001;

      // Smooth camera interpolation
      camera.position.x += (targetCameraX - camera.position.x) * 0.03;
      camera.position.y += (targetCameraY - camera.position.y) * 0.03;
      camera.lookAt(0, 5, 0);

      // Rotate Wind Turbines
      turbineBlades.forEach(blade => {
        blade.rotation.z += 0.03;
      });

      // Animate Vehicles
      vehicles.forEach(v => {
        if (v.isNS) {
          v.mesh.position.z += v.speed * v.direction;
          if (v.mesh.position.z > 60) v.mesh.position.z = -60;
          if (v.mesh.position.z < -60) v.mesh.position.z = 60;
        } else {
          v.mesh.position.x += v.speed * v.direction;
          if (v.mesh.position.x > 60) v.mesh.position.x = -60;
          if (v.mesh.position.x < -60) v.mesh.position.x = 60;
        }
      });

      // Animate Drones in orbits
      drones.forEach(d => {
        d.angle += d.speed;
        d.mesh.position.x = Math.cos(d.angle) * d.radius;
        d.mesh.position.z = Math.sin(d.angle) * d.radius;
        d.mesh.position.y = d.altitude + Math.sin(time * 2 + d.radius) * 1.2;
        d.mesh.rotation.y += 0.02;
      });

      // Floating particles slow drift
      particleSystem.rotation.y = time * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isLightMode, interactive]);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 w-full h-full pointer-events-auto overflow-hidden" 
      style={{ zIndex: 0 }}
    />
  );
};

export default CityScene;
