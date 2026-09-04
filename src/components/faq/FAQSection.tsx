"use client";

import * as React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import faqDataRaw from "@/data/faq.json";
import { FAQItem } from "@/types";
import { getGeneralWAUrl } from "@/lib/whatsapp";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WhatsAppIcon } from "@/components/catalog/ProductCard";

const faqData = faqDataRaw as FAQItem[];

export function FAQSection() {
  return (
    <section
      id="faq"
      aria-label="Pertanyaan yang Sering Diajukan"
      className="py-16 md:py-24 bg-slate-50 border-t border-slate-200/60 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          badgeText="Pertanyaan Umum (FAQ)"
          badgeIcon={<HelpCircle className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />}
          title="Informasi Pemesanan & Operasional"
          subtitle="Temukan jawaban langsung seputar syarat pemesanan, pilihan bahan, waktu pengerjaan, dan pengiriman."
        />

        {/* Accordion Component with Elevated White Cards */}
        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqData.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="border border-slate-200/80 bg-white rounded-2xl px-6 shadow-xs overflow-hidden"
            >
              <AccordionTrigger className="text-slate-900 font-heading text-base font-semibold hover:text-amber-600 hover:no-underline py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="font-sans text-slate-500 text-sm font-medium leading-relaxed pb-4 pt-1">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Additional Help CTA */}
        <div className="mt-12 text-center p-6 sm:p-8 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-3">
          <h3 className="font-heading text-base sm:text-lg font-bold text-slate-900">
            Ada pertanyaan lain yang belum terjawab?
          </h3>
          <p className="font-sans text-xs sm:text-sm text-slate-500 font-medium max-w-md mx-auto">
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
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-sm transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
            >
              <WhatsAppIcon className="w-5 h-5 shrink-0" />
              <span>Tanyakan Langsung ke WA Admin</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
