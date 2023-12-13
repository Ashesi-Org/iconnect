import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const AnimateSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer, particles;

    // Create scene
    scene = new THREE.Scene();

    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); 
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    containerRef.current.appendChild(renderer.domElement);

    // Create particles
    const particleCount = 1000;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 2;

      particlePositions[i] = radius * Math.sin(theta) * Math.cos(phi);
      particlePositions[i + 1] = radius * Math.sin(theta) * Math.sin(phi);
      particlePositions[i + 2] = radius * Math.cos(theta);
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particlesMaterial = new THREE.PointsMaterial({ color: '#2E86AB', size: 0.2, transparent: true });
    particlesMaterial.alphaTest = 0.5; 

    particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      particles.rotation.x += 0.001;
      particles.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth / 2, innerHeight / 2);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      // Clean up Three.js resources
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} />;
};

export default AnimateSection;









