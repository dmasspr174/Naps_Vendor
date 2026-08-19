"use client";

import * as React from "react";
import { MessageSquareText, FileCheck2, Hammer, Truck, ArrowRight } from "lucide-react";
import { getGeneralWAUrl } from "@/lib/whatsapp";

export function OrderTimelineSection() {
  const steps = [
    {
      id: "01",
      title: "1. Konsultasi Desain & Bahan",
      description: "Hubungi Admin via WhatsApp. Diskusikan konsep seragam (PDH, Vest, Kaos, Jaket), pilihan bahan (Nagata Drill, Canvas, dll.), kuantitas, dan estimasi biaya.",
      icon: MessageSquareText,
    },
    {
      id: "02",
      title: "2. DP & Fixasi Desain",
      description: "Pembayaran DP 50% untuk konfirmasi slot produksi. Tim kreatif kami akan menyiapkan mockup 2D digital gratis hingga persetujuan final dari Anda.",
      icon: FileCheck2,
    },
    {
      id: "03",
      title: "3. Proses Produksi",
      description: "Pemotongan kain, pembordiran komputer presisi tinggi, dan penjahitan profesional oleh spesialis konveksi berpengalaman (10 - 14 hari kerja).",
      icon: Hammer,
    },
    {
      id: "04",
      title: "4. Pelunasan & Pengiriman",
      description: "Pengecekan Quality Control, pelunasan sisa tagihan 50%, dan paket dikirim aman ke alamat Anda via kurir atau diambil di workshop Jember.",
      icon: Truck,
    },
  ];

  const timelineRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const [scrollProgress, setScrollProgress] = React.useState<number>(25); // initial default height %
  const [activeStepIndices, setActiveStepIndices] = React.useState<boolean[]>([true, false, false, false]);

  React.useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate relative position of timeline container in viewport
      const startY = rect.top;
      const totalHeight = rect.height;

      // Calculate scroll progress ratio inside the section
      // 0% when top of timeline reaches lower half of screen, 100% when bottom is reached
      const currentScroll = windowHeight * 0.7 - startY;
      let ratio = currentScroll / totalHeight;
      if (ratio < 0) ratio = 0;
      if (ratio > 1) ratio = 1;

      const progressPercent = ratio * 100;
      setScrollProgress(progressPercent);

      // Determine active steps based on card positions
      const newActiveState = cardRefs.current.map((card) => {
        if (!card) return false;
        const cardRect = card.getBoundingClientRect();
        // Step is active if its top has passed the 75% point of the viewport
        return cardRect.top <= windowHeight * 0.75;
      });

      // Ensure step 1 is always active at minimum once scrolled into view
      if (!newActiveState.some(Boolean) && startY <= windowHeight * 0.85) {
        newActiveState[0] = true;
      }

      setActiveStepIndices(newActiveState);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="alur-pemesanan" className="py-20 md:py-28 bg-[#09090b] relative overflow-hidden border-t border-border/60">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Sticky Header Section */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            
            {/* Section Tag */}
            <div className="flex items-center gap-2">
              <span className="h-[2px] w-6 bg-primary"></span>
              <span className="text-xs font-extrabold uppercase tracking-widest text-primary">
                CARA PEMESANAN
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.2]">
              Langkah untuk memesan seragam.
            </h2>

            {/* Subtitle / Intro */}
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md">
              Proses konveksi custom transparan, cepat, dan terhubung langsung ke WhatsApp Admin tanpa sistem pembayaran yang rumit.
            </p>

            {/* Pill Action Button */}
            <div className="pt-2">
              <a
                href={getGeneralWAUrl("Halo Admin Nap's Vendor, saya ingin bertanya tentang alur pemesanan seragam custom.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full border border-zinc-700 bg-zinc-950 text-sm font-semibold text-white hover:border-primary transition-all group shadow-xl"
              >
                <span>Hubungi Kami Sekarang</span>
                <div className="w-9 h-9 rounded-full bg-primary text-zinc-950 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </a>
            </div>

          </div>

          {/* Right Vertical Timeline Section */}
          <div className="lg:col-span-7 relative" ref={timelineRef}>
            
            {/* Vertical Connector Line Container */}
            <div className="relative pl-6 sm:pl-10 space-y-6 sm:space-y-8">
              
              {/* Background Track Line (Inactive Zinc Gray) */}
              <div className="absolute left-[9px] sm:left-[17px] top-6 bottom-8 w-[2px] bg-zinc-800">
                
                {/* Dynamic Active Yellow Line (Grows smoothly on Scroll) */}
                <div 
                  className="w-full bg-gradient-to-b from-primary via-primary to-yellow-400 rounded-full transition-all duration-150 ease-out shadow-[0_0_8px_rgba(250,204,21,0.5)]"
                  style={{ height: `${Math.max(10, Math.min(100, scrollProgress))}%` }}
                ></div>

              </div>

              {steps.map((step, idx) => {
                const IconComp = step.icon;
                const isActive = activeStepIndices[idx];

                return (
                  <div
                    key={step.id}
                    ref={(el) => { cardRefs.current[idx] = el; }}
                    className="relative group"
                  >
                    
                    {/* Glowing Circle Node Marker on the Line */}
                    <div className="absolute -left-[24px] sm:-left-[32px] top-6 flex items-center justify-center z-10">
                      <div className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ${
                        isActive 
                          ? "bg-primary border-primary shadow-[0_0_14px_rgba(250,204,21,0.9)] scale-125" 
                          : "bg-zinc-950 border-zinc-600 scale-100"
                      }`}></div>
                    </div>

                    {/* Step Content Card */}
                    <div className={`rounded-2xl border bg-[#121215] p-6 sm:p-7 shadow-lg transition-all duration-500 ${
                      isActive 
                        ? "border-primary/60 bg-[#15151a] shadow-yellow-500/5 -translate-y-0.5" 
                        : "border-zinc-800/80 hover:border-zinc-700"
                    }`}>
                      
                      {/* Top Yellow Icon */}
                      <div className="mb-4">
                        <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-300 ${
                          isActive 
                            ? "bg-primary text-zinc-950 border-primary shadow-md" 
                            : "bg-zinc-900 text-primary border-zinc-800"
                        }`}>
                          <IconComp className="w-5 h-5 stroke-[2]" />
                        </div>
                      </div>

                      {/* Card Title */}
                      <h3 className={`text-lg sm:text-xl font-bold mb-2 transition-colors duration-300 ${
                        isActive ? "text-primary" : "text-white"
                      }`}>
                        {step.title}
                      </h3>

                      {/* Card Description */}
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                        {step.description}
                      </p>

                    </div>

                  </div>
                );
              })}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
