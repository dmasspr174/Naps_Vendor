"use client";

import * as React from "react";
import { MessageSquareText, FileCheck2, Hammer, Truck, ArrowRight } from "lucide-react";
import { getGeneralWAUrl } from "@/lib/whatsapp";

export function OrderTimelineSection() {
  const steps = [
    {
      id: "01",
      title: "1. Konsultasi Desain & Bahan",
      description:
        "Hubungi Admin via WhatsApp. Diskusikan konsep seragam (PDH, Vest, Kaos, Jaket), pilihan bahan (Nagata Drill, American Drill, dll.), kuantitas, dan estimasi biaya transparan.",
      icon: MessageSquareText,
    },
    {
      id: "02",
      title: "2. DP & Fixasi Desain",
      description:
        "Pembayaran DP 50% untuk konfirmasi slot produksi antrean. Tim kreatif kami menyiapkan mockup 2D digital gratis hingga persetujuan final dari Anda.",
      icon: FileCheck2,
    },
    {
      id: "03",
      title: "3. Proses Produksi",
      description:
        "Pemotongan kain presisi, pembordiran komputer digital rapat, dan penjahitan standar garmen oleh spesialis konveksi berpengalaman (10 - 14 hari kerja).",
      icon: Hammer,
    },
    {
      id: "04",
      title: "4. Pelunasan & Pengiriman",
      description:
        "Pengecekan Quality Control ganda, pelunasan sisa tagihan 50%, dan paket siap dikirim aman ke alamat Anda via kurir atau diambil langsung di workshop Jember.",
      icon: Truck,
    },
  ];

  const timelineRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const [scrollProgress, setScrollProgress] = React.useState<number>(25);
  const [activeStepIndices, setActiveStepIndices] = React.useState<boolean[]>([
    true,
    false,
    false,
    false,
  ]);

  React.useEffect(() => {
    let ticking = false;

    const updateTimeline = () => {
      if (!timelineRef.current) {
        ticking = false;
        return;
      }

      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const startY = rect.top;
      const totalHeight = rect.height;

      const currentScroll = windowHeight * 0.7 - startY;
      let ratio = currentScroll / totalHeight;

      if (ratio < 0.15) ratio = 0.15;
      if (ratio > 1) ratio = 1;

      setScrollProgress(ratio * 100);

      // Check card intersections
      const newActiveStates = cardRefs.current.map((card) => {
        if (!card) return false;
        const cardRect = card.getBoundingClientRect();
        return cardRect.top < windowHeight * 0.75;
      });

      if (!newActiveStates.some(Boolean)) {
        newActiveStates[0] = true;
      }

      setActiveStepIndices(newActiveStates);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateTimeline);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateTimeline();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="alur-pemesanan"
      aria-label="Alur dan Cara Pemesanan Konveksi"
      className="py-20 md:py-28 bg-slate-50 relative overflow-hidden border-t border-slate-200/60"
    >
      {/* Background Soft Glow */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-amber-400/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Sticky Header Section */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="flex items-center gap-2">
              <span className="h-[2px] w-6 bg-amber-500" aria-hidden="true"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                CARA PEMESANAN
              </span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.2]">
              4 Langkah mudah untuk memesan seragam.
            </h2>

            <p className="font-sans text-sm sm:text-base text-slate-500 font-medium leading-relaxed max-w-md">
              Proses konveksi custom transparan, rapi, dan terhubung langsung ke WhatsApp Admin tanpa sistem pemesanan yang rumit.
            </p>

            <div className="pt-2">
              <a
                href={getGeneralWAUrl("Halo Admin Nap's Vendor, saya ingin bertanya tentang alur pemesanan seragam custom.")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Hubungi Admin untuk konsultasi alur pemesanan"
                className="inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-900 hover:border-amber-400 hover:shadow-md transition-all group shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                <span>Hubungi Kami Sekarang</span>
                <div className="w-9 h-9 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
                </div>
              </a>
            </div>
          </div>

          {/* Right Vertical Timeline Section */}
          <div className="lg:col-span-7 relative" ref={timelineRef}>
            <div className="relative pl-6 sm:pl-10 space-y-6 sm:space-y-8">
              {/* Background Track Line */}
              <div className="absolute left-[9px] sm:left-[17px] top-6 bottom-8 w-[2px] bg-slate-200" aria-hidden="true">
                <div
                  className="w-full bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 rounded-full transition-all duration-150 ease-out shadow-xs"
                  style={{ height: `${Math.max(10, Math.min(100, scrollProgress))}%` }}
                ></div>
              </div>

              {steps.map((step, idx) => {
                const IconComp = step.icon;
                const isActive = activeStepIndices[idx];

                return (
                  <div
                    key={step.id}
                    ref={(el) => {
                      cardRefs.current[idx] = el;
                    }}
                    className="relative group"
                  >
                    {/* Circle Node Marker on the Line */}
                    <div className="absolute -left-[24px] sm:-left-[32px] top-6 flex items-center justify-center z-10" aria-hidden="true">
                      <div
                        className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                          isActive
                            ? "bg-amber-400 border-amber-500 shadow-sm scale-125"
                            : "bg-white border-slate-300 scale-100"
                        }`}
                      ></div>
                    </div>

                    {/* Step Content Card */}
                    <article
                      className={`rounded-2xl border bg-white p-6 sm:p-7 shadow-sm transition-all duration-300 ${
                        isActive
                          ? "border-amber-300/80 shadow-md -translate-y-0.5"
                          : "border-slate-100 hover:shadow-md"
                      }`}
                    >
                      <div className="mb-4">
                        <div
                          className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-300 ${
                            isActive
                              ? "bg-amber-400 text-slate-900 border-amber-400 shadow-xs"
                              : "bg-slate-100 text-slate-700 border-slate-200/80"
                          }`}
                        >
                          <IconComp className="w-5 h-5 stroke-[2]" aria-hidden="true" />
                        </div>
                      </div>

                      <h3
                        className={`font-heading text-lg sm:text-xl font-bold mb-2 transition-colors duration-300 ${
                          isActive ? "text-amber-600" : "text-slate-900"
                        }`}
                      >
                        {step.title}
                      </h3>

                      <p className="font-sans text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                        {step.description}
                      </p>
                    </article>
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
