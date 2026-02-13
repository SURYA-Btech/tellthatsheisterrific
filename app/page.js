'use client';

import { ReactLenis } from 'lenis/react';
import dynamic from 'next/dynamic';
import { Suspense, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ImageSequence = dynamic(() => import('@/components/ImageSequence'), { ssr: false });
const AntigravityScene = dynamic(() => import('@/components/AntigravityScene'), { ssr: false });

export default function Home() {

    useEffect(() => {
        // Fade in Antigravity Scene after the Hero section
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
    }, []);

    return (
        <ReactLenis root>
            <main className="relative min-h-[850vh] bg-white text-black selection:bg-black selection:text-white font-sans">
                <Suspense fallback={<div>Loading Experience...</div>}>
                    <ImageSequence />
                    <AntigravityScene />
                </Suspense>

                {/* 1. NAVIGATION (Sticky Header) */}
                <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-6 text-white pointer-events-auto mix-blend-difference">
                    <div className="text-xl font-serif font-bold tracking-tight uppercase">THE RUNWAY DEVIL</div>
                    <div className="flex gap-8 font-sans text-[10px] font-bold tracking-widest uppercase">
                        <span className="cursor-pointer hover:opacity-50 transition-opacity">Collections</span>
                        <span className="cursor-pointer hover:opacity-50 transition-opacity">Editorial</span>
                        <span className="cursor-pointer hover:opacity-50 transition-opacity">Account</span>
                        <span className="cursor-pointer hover:opacity-50 transition-opacity">Bag (0)</span>
                    </div>
                </nav>

                <div className="relative z-20 pointer-events-none mix-blend-difference text-white">

                    {/* 2. HERO SECTION (The Magazine Flip) */}
                    <section className="h-screen flex flex-col items-center justify-center relative">
                        <h1 className="text-[12vw] leading-[0.9] font-serif font-regular tracking-[-0.05em] text-center uppercase">
                            The September<br />Issue
                        </h1>
                        <p className="mt-8 font-sans text-sm md:text-base font-medium tracking-[0.5em] uppercase opacity-90">
                            Definitive. Disruptive. Dangerous.
                        </p>
                        <div className="absolute bottom-12 right-12 font-serif italic text-xl md:text-2xl max-w-xs text-right opacity-90">
                            "Florals? For spring? Groundbreaking."
                        </div>
                    </section>

                </div>

                {/* 3. SCROLLYTELLING SECTION (The Antigravity Experience) */}
                {/* Text blocks appear over fixed 3D Scene */}
                <div className="relative z-30 pointer-events-none text-black">

                    {/* Stage 1: The Lift-Off */}
                    <section id="stage-1-trigger" className="h-[150vh] flex items-center justify-center px-12">
                        <div className="text-center max-w-2xl bg-white/0 p-8">
                            <h3 className="text-5xl md:text-7xl font-serif uppercase tracking-tight mb-4">
                                The Gravity of Style
                            </h3>
                            <p className="font-sans text-xs font-bold tracking-widest uppercase leading-loose opacity-80">
                                Fashion is not about utility. It is about physics. <br />
                                It pulls. It pushes. It demands attention.
                            </p>
                        </div>
                    </section>

                    {/* Stage 2: The Color Reveal */}
                    <section className="h-[150vh] flex items-center justify-start px-12 md:px-24">
                        <div className="max-w-xl">
                            <h3 className="text-5xl md:text-7xl font-serif uppercase tracking-tight mb-4 text-[#2A6592]">
                                Not Just Blue
                            </h3>
                            <p className="font-sans text-xs font-bold tracking-widest uppercase leading-loose border-t border-black pt-4">
                                It’s not turquoise. It’s not lapis. It’s actually Cerulean. <br />
                                <span className="opacity-60 font-normal">Representing millions of dollars and countless jobs.</span>
                            </p>
                        </div>
                    </section>

                    {/* Stage 3: The Chaos */}
                    <section className="h-[150vh] flex items-center justify-end px-12 md:px-24">
                        <div className="text-right max-w-lg">
                            <h3 className="text-5xl md:text-7xl font-serif uppercase tracking-tight mb-4">
                                The Untouchables
                            </h3>
                            <p className="font-sans text-xs font-bold tracking-widest uppercase leading-loose border-b border-black pb-4 mb-4">
                                Constructed from Italian calf leather and the panic of a thousand assistants.
                            </p>
                            <p className="font-sans text-[10px] tracking-[0.3em] uppercase opacity-60">
                                Perfection is not optional. It is the baseline.
                            </p>
                        </div>
                    </section>

                    {/* Stage 4: The Climax */}
                    <section className="h-[100vh] flex flex-col items-center justify-center text-center">
                        <h3 className="text-6xl md:text-9xl font-serif uppercase tracking-tighter leading-none mb-4">
                            A Million Girls
                        </h3>
                        <p className="font-serif italic text-2xl md:text-4xl mb-8">
                            Would kill for this job.
                        </p>
                        <p className="font-sans text-xs font-bold tracking-widest uppercase opacity-60">
                            But you? You just dress the part.
                        </p>
                    </section>

                    {/* 4. THE COLLECTION (Product Grid - Static) */}
                    <section className="bg-white text-black py-24 px-8 md:px-12 pointer-events-auto relative z-40">
                        <header className="text-center mb-16">
                            <h2 className="text-4xl font-serif uppercase tracking-tight mb-2">The Editor's Desk</h2>
                            <p className="font-sans text-[10px] tracking-widest uppercase opacity-60">Curated for those who survive the climb.</p>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
                            {/* Product 01 */}
                            <div className="flex flex-col items-center text-center group">
                                <div className="w-full aspect-[3/4] bg-gray-100 mb-6 flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <span className="font-serif italic text-gray-400">Image Asset</span>
                                </div>
                                <h4 className="font-serif text-xl mb-1">The Power Blazer</h4>
                                <p className="font-sans text-[10px] tracking-widest uppercase opacity-50 mb-4">"The Boardroom Armour"</p>
                                <p className="font-sans text-xs leading-relaxed opacity-80 mb-6 max-w-xs">
                                    Sharp shoulders. Pin-tucked waist. Unforgiving silhouette. Worn when you need to fire someone without saying a word.
                                </p>
                                <button className="border-b border-black pb-1 hover:text-[#2A6592] hover:border-[#2A6592] transition-colors text-[10px] uppercase tracking-widest font-bold">
                                    Shop Blazers
                                </button>
                            </div>

                            {/* Product 02 */}
                            <div className="flex flex-col items-center text-center group">
                                <div className="w-full aspect-[3/4] bg-gray-100 mb-6 flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <span className="font-serif italic text-gray-400">Image Asset</span>
                                </div>
                                <h4 className="font-serif text-xl mb-1">The Midnight Dress</h4>
                                <p className="font-sans text-[10px] tracking-widest uppercase opacity-50 mb-4">"The Gala Standard"</p>
                                <p className="font-sans text-xs leading-relaxed opacity-80 mb-6 max-w-xs">
                                    Silk that moves like liquid. Backless. Dangerous. For nights that end at sunrise.
                                </p>
                                <button className="border-b border-black pb-1 hover:text-[#2A6592] hover:border-[#2A6592] transition-colors text-[10px] uppercase tracking-widest font-bold">
                                    Shop Dresses
                                </button>
                            </div>

                            {/* Product 03 */}
                            <div className="flex flex-col items-center text-center group">
                                <div className="w-full aspect-[3/4] bg-gray-100 mb-6 flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <span className="font-serif italic text-gray-400">Image Asset</span>
                                </div>
                                <h4 className="font-serif text-xl mb-1">The Stiletto</h4>
                                <p className="font-sans text-[10px] tracking-widest uppercase opacity-50 mb-4">"The Clacker"</p>
                                <p className="font-sans text-xs leading-relaxed opacity-80 mb-6 max-w-xs">
                                    4-inch steel heel. Red patent finish. The sound alone commands silence.
                                </p>
                                <button className="border-b border-black pb-1 hover:text-[#2A6592] hover:border-[#2A6592] transition-colors text-[10px] uppercase tracking-widest font-bold">
                                    Shop Heels
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* 5. BRAND PHILOSOPHY */}
                    <section className="bg-black text-white py-24 px-8 text-center pointer-events-auto relative z-40">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-4xl md:text-5xl font-serif uppercase tracking-tight mb-8">Fashion Is Not Clothing.</h2>
                            <p className="font-sans text-sm md:text-base leading-loose font-light opacity-90 mb-12">
                                It is identity stitched into fabric. At The Runway Devil, we do not follow trends. We dictate them.
                                We design for the women who lead conversations, break expectations, and turn sidewalks into catwalks.
                            </p>
                            <div className="flex flex-col md:flex-row justify-center gap-8 text-[10px] md:text-xs font-sans font-bold tracking-widest uppercase">
                                <div className="flex items-center justify-center gap-2"><span className="text-[#2A6592]">✔</span> Immaculate Tailoring</div>
                                <div className="flex items-center justify-center gap-2"><span className="text-[#2A6592]">✔</span> Limited Drops</div>
                                <div className="flex items-center justify-center gap-2"><span className="text-[#2A6592]">✔</span> Runway Grade</div>
                            </div>
                        </div>
                    </section>

                    {/* 6. SOCIAL PROOF */}
                    <section className="bg-white py-24 px-8 pointer-events-auto relative z-40">
                        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
                            <div className="text-center">
                                <blockquote className="font-serif italic text-2xl mb-4">"I didn’t just wear it. I felt unstoppable."</blockquote>
                                <cite className="font-sans text-[10px] tracking-widest uppercase not-italic opacity-50">— Fashion Editor, Vogue NY</cite>
                            </div>
                            <div className="text-center">
                                <blockquote className="font-serif italic text-2xl mb-4">"The fit. The structure. The power. Unreal."</blockquote>
                                <cite className="font-sans text-[10px] tracking-widest uppercase not-italic opacity-50">— Creative Director, Paris</cite>
                            </div>
                        </div>
                    </section>

                    {/* 7. FOOTER */}
                    <footer className="bg-white border-t border-black/10 py-16 px-8 text-center pointer-events-auto relative z-40">
                        <div className="mb-16">
                            <h2 className="text-3xl font-serif uppercase tracking-tight mb-4">Join The Inner Circle</h2>
                            <p className="font-sans text-[10px] tracking-widest uppercase opacity-60 mb-8">Be the first to access the "Civilian" collection.</p>
                            <div className="flex justify-center gap-4 max-w-sm mx-auto">
                                <input type="email" placeholder="ENTER EMAIL" className="border-b border-black py-2 bg-transparent text-xs w-full focus:outline-none placeholder:text-black/30" />
                                <button className="font-sans text-[10px] font-bold tracking-widest uppercase hover:opacity-50">Subscribe</button>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] font-sans font-bold tracking-widest uppercase opacity-60">
                            <div>© 2025 Elias-Clarke Publications.</div>
                            <div className="flex gap-6 mt-4 md:mt-0">
                                <a href="#" className="hover:opacity-100">Imprint</a>
                                <a href="#" className="hover:opacity-100">Privacy</a>
                                <a href="#" className="hover:opacity-100">Careers (0 Openings)</a>
                            </div>
                        </div>
                    </footer>

                </div>
            </main>
        </ReactLenis>
    );
}
