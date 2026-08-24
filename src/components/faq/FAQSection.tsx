"use client";

import * as React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { HelpCircle, MessageSquare } from "lucide-react";
import faqDataRaw from "@/data/faq.json";
import { FAQItem } from "@/types";
import { getGeneralWAUrl } from "@/lib/whatsapp";
import { SectionHeader } from "@/components/ui/SectionHeader";

const faqData = faqDataRaw as FAQItem[];

export function FAQSection() {
  return (
    <section
      id="faq"
      aria-label="Pertanyaan yang Sering Diajukan"
      className="py-16 md:py-24 bg-[#09090b] relative"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          badgeText="Pertanyaan Umum (FAQ)"
          badgeIcon={<HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />}
          title="Informasi Pemesanan & Operasional"
          subtitle="Temukan jawaban langsung seputar syarat pemesanan, pilihan bahan, waktu pengerjaan, dan pengiriman."
        />

        {/* Accordion Component */}
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id} className="border-zinc-800">
              <AccordionTrigger className="text-white text-base hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-zinc-400 text-sm leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Additional Help CTA */}
        <div className="mt-10 text-center p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-3">
          <h3 className="text-base font-semibold text-white">
            Ada pertanyaan lain yang belum terjawab?
          </h3>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Tim Admin Nap's Vendor siap memberikan konsultasi gratis mengenai bahan, estimasi budget, dan panduan ukuran.
          </p>
          <div className="pt-2">
            <a
              href={getGeneralWAUrl(
                "Halo Admin Nap's Vendor, saya ada pertanyaan seputar pemesanan konveksi custom."
              )}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Tanyakan pertanyaan langsung ke WhatsApp Admin"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-zinc-950 font-bold text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <MessageSquare className="w-4 h-4 fill-current" aria-hidden="true" />
              Tanyakan Langsung ke WA Admin
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
