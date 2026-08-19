"use client";

import * as React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { HelpCircle, MessageSquare } from "lucide-react";
import faqData from "@/data/faq.json";
import { getGeneralWAUrl } from "@/lib/whatsapp";

export function FAQSection() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-[#09090b] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
            <HelpCircle className="w-3.5 h-3.5" />
            Pertanyaan Umum (FAQ)
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Informasi Pemesanan & Operasional
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Temukan jawaban langsung seputar syarat pemesanan, pilihan bahan, waktu pengerjaan, dan pengiriman.
          </p>
        </div>

        {/* Accordion Component */}
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger className="text-white text-base">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Additional Help CTA */}
        <div className="mt-10 text-center p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-3">
          <h3 className="text-base font-semibold text-white">Ada pertanyaan lain yang belum terjawab?</h3>
          <p className="text-xs text-muted-foreground">
            Tim Admin Nap's Vendor siap memberikan konsultasi gratis mengenai bahan, estimasi budget, dan panduan ukuran.
          </p>
          <div className="pt-2">
            <a
              href={getGeneralWAUrl("Halo Admin Nap's Vendor, saya ada pertanyaan seputar pemesanan konveksi custom.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-zinc-950 font-bold text-xs transition-colors"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              Tanyakan Langsung ke WA Admin
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
