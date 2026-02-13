'use client';

import { ReactLenis } from 'lenis/react';
import dynamic from 'next/dynamic';
import { Suspense, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ImageSequence = dynamic(() => import('@/components/ImageSequence'), { ssr: false });
const AntigravityScene = dynamic(() => import('@/components/AntigravityScene'), { ssr: false });

export default function Home() {
    const containerRef = useRef(null);

    useEffect(() => {
        // Animation for the Antigravity transition
        gsap.to("#antigravity-container", {
            opacity: 1,
            zIndex: 10,
            duration: 1,
            scrollTrigger: {
                trigger: "#stage-1-trigger",
                start: "top center",
                end: "bottom center",
                scrub: true,
            }
        });

        // Subtle parallax for editorial images
        gsap.utils.toArray('.reveal-image').forEach((img: any) => {
            gsap.from(img, {
                y: 50,
                opacity: 0,
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: img,
                    start: "top 90%",
                }
            });
        });
    }, []);

    return (
        <ReactLenis root>
            <main ref={containerRef} className="relative bg-white text-black selection:bg-black selection:text-white font-sans overflow-x-hidden">
                
                {/* 3D BACKGROUND LAYER */}
                <div className="fixed inset-0 pointer-events-none">
                    <Suspense fallback={<div className="flex items-center justify-center h-full">Loading Experience...</div>}>
                        <ImageSequence />
                        <AntigravityScene />
                    </Suspense>
                </div>

                {/* 1. NAVIGATION */}
                <nav className="fixed top-0 left-0 w-full z-[100] flex justify-between items-center px-6 md:px-12 py-8 mix-blend-difference text-white pointer-events-auto">
                    <div className="text-2xl font-serif font-black tracking-tighter uppercase">TRD</div>
                    <div className="hidden md:flex gap-12 text-[10px] font-bold tracking-[0.3em] uppercase">
                        <span className="cursor-pointer hover:line-through transition-all">Collections</span>
                        <span className="cursor-pointer hover:line-through transition-all">Editorial</span>
                        <span className="cursor-pointer hover:line-through transition-all">Archive</span>
                    </div>
                    <div className="text-[10px] font-bold tracking-[0.3em] uppercase">
                        Bag (0)
                    </div>
                </nav>

                {/* 2. HERO SECTION */}
                <section className="relative h-screen flex flex-col items-center justify-center z-20 mix-blend-difference text-white pointer-events-none">
                    <div className="text-center">
                        <span className="text-[10px] tracking-[0.8em] uppercase mb-4 block opacity-60">Volume No. 12</span>
                        <h1 className="text-[15vw] leading-[0.8] font-serif font-light tracking-[-0.04em] uppercase">
                            The <br />Issue
                        </h1>
                        <div className="mt-12 flex flex-col items-center">
                            <div className="w-[1px] h-24 bg-white/30 mb-4 animate-bounce"></div>
                            <p className="text-[10px] tracking-[0.5em] uppercase">Scroll to Enter</p>
                        </div>
                    </div>
                </section>

                {/* 3. SCROLLYTELLING OVERLAYS (Transparent Backgrounds) */}
                <div className="relative z-30 pointer-events-none">
                    
                    {/* Stage 1 */}
                    <section id="stage-1-trigger" className="h-[150vh] flex items-center justify-center">
                        <div className="max-w-xl text-center px-6">
                            <h3 className="text-6xl md:text-8xl font-serif italic mb-6">Levitation</h3>
                            <p className="text-xs font-bold tracking-[0.2em] uppercase leading-relaxed max-w-sm mx-auto">
                                We don't just dress bodies. We defy the expected weight of tradition.
                            </p>
                        </div>
                    </section>

                    {/* Stage 2 */}
                    <section className="h-[150vh] flex items-center justify-start px-8 md:px-32">
                        <div className="max-w-md">
                            <h3 className="text-5xl md:text-7xl font-serif uppercase mb-4 text-[#2A6592]">Cerulean</h3>
                            <div className="h-[1px] w-full bg-black/20 mb-6"></div>
                            <p className="text-xs font-medium tracking-widest uppercase leading-loose">
                                A color that represents a collective subconscious. Not a choice, but a requirement.
                            </p>
                        </div>
                    </section>
                </div>

                {/* 4. THE EDITORIAL GRID (Solid White Content) */}
                <section className="relative z-40 bg-white pt-32 pb-12 px-6 md:px-12 pointer-events-auto">
                    <div className="max-w-screen-2xl mx-auto">
                        
                        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                            <h2 className="text-7xl md:text-9xl font-serif tracking-tighter uppercase leading-[0.8]">
                                Selected <br /><span className="italic ml-[0.5em]">Works</span>
                            </h2>
                            <p className="max-w-xs text-xs font-medium tracking-widest uppercase leading-relaxed opacity-60">
                                Curated silhouettes for the modern iconoclast. Hand-stitched in Milan. Designed in a fever dream.
                            </p>
                        </div>

                        {/* Asymmetric Product Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-4 items-start">
                            
                            {/* Item 1 */}
                            <div className="md:col-span-7 group">
                                <div className="reveal-image aspect-[16/10] bg-gray-50 overflow-hidden relative mb-6">
                                    <div className="absolute inset-0 flex items-center justify-center text-[10px] tracking-widest uppercase text-gray-400">Campaign Image 01</div>
                                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700"></div>
                                </div>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="text-2xl font-serif italic">The Obsidian Blazer</h4>
                                        <p className="text-[10px] tracking-[0.2em] uppercase opacity-50 mt-1">Structure / 001</p>
                                    </div>
                                    <button className="text-[10px] font-black border-b-2 border-black pb-1 uppercase tracking-tighter">View Details</button>
                                </div>
                            </div>

                            {/* Item 2 */}
                            <div className="md:col-span-4 md:col-start-9 mt-0 md:mt-32 group">
                                <div className="reveal-image aspect-[3/4] bg-gray-50 overflow-hidden relative mb-6">
                                     <div className="absolute inset-0 flex items-center justify-center text-[10px] tracking-widest uppercase text-gray-400">Campaign Image 02</div>
                                </div>
                                <h4 className="text-2xl font-serif italic">The Slip in "Void"</h4>
                                <p className="text-[10px] tracking-[0.2em] uppercase opacity-50 mt-1">Evening / 042</p>
                            </div>

                        </div>
                    </div>
                </section>

                {/* 5. FULL-WIDTH STATEMENT */}
                <section className="relative z-40 bg-white py-40 px-6 overflow-hidden">
                    <div className="max-w-7xl mx-auto border-y border-black/10 py-24 text-center">
                        <h2 className="text-[8vw] font-serif leading-none uppercase tracking-tighter mb-12">
                            A Million Girls <br /> <span className="text-[#2A6592]">Would Kill</span>
                        </h2>
                        <p className="text-[10px] tracking-[0.6em] uppercase font-bold max-w-md mx-auto leading-loose">
                            To be the one who walks through that door. We provide the key.
                        </p>
                    </div>
                </section>

                {/* 6. FOOTER */}
                <footer className="relative z-40 bg-white pt-24 pb-12 px-8 md:px-12 border-t border-black/5">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
                        <div className="md:col-span-2">
                            <h3 className="text-3xl font-serif uppercase tracking-tighter mb-8">Newsletter</h3>
                            <div className="flex gap-4 border-b border-black py-4 max-w-md">
                                <input type="email" placeholder="YOUR@EMAIL.COM" className="bg-transparent text-xs w-full outline-none tracking-widest" />
                                <button className="text-[10px] font-black uppercase tracking-widest">Join</button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 text-[10px] font-bold tracking-widest uppercase">
                            <span className="opacity-30">Socials</span>
                            <a href="#" className="hover:line-through">Instagram</a>
                            <a href="#" className="hover:line-through">TikTok</a>
                            <a href="#" className="hover:line-through">Showroom</a>
                        </div>
                        <div className="flex flex-col gap-4 text-[10px] font-bold tracking-widest uppercase">
                            <span className="opacity-30">Legal</span>
                            <a href="#" className="hover:line-through">Privacy</a>
                            <a href="#" className="hover:line-through">Terms</a>
                            <a href="#" className="hover:line-through">Sustainability</a>
                        </div>
                    </div>
                    <div className="flex justify-between items-center border-t border-black/5 pt-8">
                        <span className="text-[9px] tracking-widest uppercase opacity-40">© 2026 The Runway Devil Studio</span>
                        <span className="text-[9px] tracking-widest uppercase opacity-40 italic font-serif">A Nigel Tufnel Creative Agency</span>
                    </div>
                </footer>

            </main>
        </ReactLenis>
    );
}
