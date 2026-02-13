'use client';

import { useRef, useState, useLayoutEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function FloatingItem({ position, color, label, speed = 1, offset = 0 }) {
    const ref = useRef();
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        // Bobbing motion
        if (ref.current) {
            ref.current.position.y = position[1] + Math.sin(time * speed + offset) * 0.2;
            ref.current.rotation.x = Math.sin(time * 0.5 + offset) * 0.1;
            ref.current.rotation.z = Math.cos(time * 0.3 + offset) * 0.1;

            // Mouse parallax (simplified)
            const mouseX = state.mouse.x * 0.5;
            const mouseY = state.mouse.y * 0.5;
            ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, position[0] + mouseX, 0.1);
        }
    });

    return (
        <group ref={ref} position={position}>
            <mesh
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                scale={hovered ? 1.1 : 1}
            >
                <planeGeometry args={[3, 3]} />
                <meshBasicMaterial color={color} transparent opacity={0.6} side={THREE.DoubleSide} />
            </mesh>
        </group>
    );
}

function SceneContent() {
    const groupRef = useRef();

    useLayoutEffect(() => {
        if (!groupRef.current) return;

        // Animate the group based on scroll
        // Phase 1: Magazine (0-100vh) - Scene hidden or static
        // Phase 2: Transition (100-200vh) - Scene fades in/Explodes

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
            }
        });

        const children = groupRef.current.children;

        // Initial state: Clustered together
        children[0].position.set(0, 0, 0);
        children[1].position.set(0, 0, -0.5);
        children[2].position.set(0, 0, -1);
        children[3].position.set(0, 0, -1.5);

        // Animation Timeline synced to scroll
        tl.to(groupRef.current.position, { z: 2, duration: 2 }, 0) // Move camera closer
            .to(children[0].position, { x: -4, y: 1, z: 1, duration: 5 }, 1) // Spread out
            .to(children[1].position, { x: 4, y: -1, z: 0.5, duration: 5 }, 1)
            .to(children[2].position, { x: -2, y: -2, z: -1, duration: 5 }, 1)
            .to(children[3].position, { x: 3, y: 2, z: -2, duration: 5 }, 1)
            .to(groupRef.current.rotation, { y: Math.PI * 0.5, duration: 10 }, 0); // Rotate group

    }, []);

    return (
        <group ref={groupRef}>
            <FloatingItem position={[0, 0, 0]} color="#2A6592" label="SHOE" speed={1.2} offset={0} /> {/* Cerulean */}
            <FloatingItem position={[0, 0, 0]} color="#1a405f" label="BAG" speed={0.8} offset={2} /> {/* Darker Blue */}
            <FloatingItem position={[0, 0, 0]} color="#5d8aa8" label="PERFUME" speed={1.5} offset={4} /> {/* Lighter Blue */}
            <FloatingItem position={[0, 0, 0]} color="#000000" label="LIPSTICK" speed={0.5} offset={1} /> {/* Black */}
        </group>
    );
}

export default function AntigravityScene() {
    return (
        <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none opacity-0" id="antigravity-container">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <SceneContent />
            </Canvas>
        </div>
    );
}
