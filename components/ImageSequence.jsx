'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ImageSequence() {
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const frameCount = 200;
  const imagesPath = '/images/devil/ezgif-frame-';

  useEffect(() => {
    // Preload images
    const loadImages = async () => {
      const loadedImages = [];
      const promises = [];

      for (let i = 1; i <= frameCount; i++) {
        const promise = new Promise((resolve, reject) => {
          const img = new Image();
          const frameNumber = i.toString().padStart(3, '0');
          img.src = `${imagesPath}${frameNumber}.jpg`;
          img.onload = () => {
            loadedImages[i - 1] = img;
            resolve();
          };
          img.onerror = (e) => {
            console.error(`Failed to load image ${i}`, e);
            // Resolve anyway to avoid blocking
            resolve();
          };
        });
        promises.push(promise);
      }

      await Promise.all(promises);
      setImages(loadedImages);
      setIsLoaded(true);
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (!isLoaded || !canvasRef.current || images.length === 0) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Feature: renderFrame
    const renderFrame = (index) => {
      const img = images[Math.round(index)];
      if (img) {
        // Calculate cover logic
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);

        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          centerShift_x,
          centerShift_y,
          img.width * ratio,
          img.height * ratio
        );
      }
    };

    // Set canvas dimensions to match window or image aspect ratio
    const updateDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(0); // Render initial frame
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    const frame = { index: 0 };
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body", // Use body as trigger for global scroll
        start: "top top",
        end: "bottom bottom",
        scrub: 0, // Smooth scrubbing
      }
    });

    tl.to(frame, {
      index: frameCount - 1,
      ease: "none",
      onUpdate: () => {
        renderFrame(frame.index);
      }
    });

    return () => {
      window.removeEventListener('resize', updateDimensions);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isLoaded, images]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full object-cover z-0 pointer-events-none"
    />
  );
}
