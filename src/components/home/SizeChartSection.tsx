"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Ruler, Info } from "lucide-react";
import sizeChartsDataRaw from "@/data/sizeCharts.json";
import { SizeChartsData } from "@/types";
import { SectionHeader } from "@/components/ui/SectionHeader";

const sizeChartsData = sizeChartsDataRaw as SizeChartsData;

export function SizeChartSection() {
  const [activeCategory, setActiveCategory] = React.useState<string>("Kemeja");
  const categories = Object.keys(sizeChartsData);

  return (
    <section
      id="size-chart"
      aria-label="Panduan Ukuran Standar Konveksi"
      className="py-16 md:py-24 bg-slate-50 border-t border-slate-200/60 relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Reusable Header */}
        <SectionHeader
          badgeText="Panduan Ukuran Standar"
          badgeIcon={<Ruler className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />}
          title="Size Chart Konveksi Nap's"
          subtitle="Pastikan ukuran pakaian sesuai kebutuhan tim atau organisasi Anda. Pilih jenis produk di bawah ini untuk melihat dimensi detailnya."
        />

        {/* Tabs for Categories */}
        <Tabs
          defaultValue="Kemeja"
          value={activeCategory}
          onValueChange={setActiveCategory}
          className="w-full"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="bg-slate-100 border border-slate-200/80 p-1 rounded-xl flex-wrap h-auto shadow-xs">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  className="px-5 py-2 text-xs sm:text-sm font-medium rounded-lg text-slate-600 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-amber-500"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((cat) => {
            const chart = sizeChartsData[cat];
            return (
              <TabsContent key={cat} value={cat} className="mt-0">
                <div className="rounded-2xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm">
                  <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                    <div>
                      <h3 className="font-heading text-lg font-bold text-slate-900">{chart.title}</h3>
                      <p className="font-sans text-xs sm:text-sm text-slate-500 font-medium">
                        {chart.description}
                      </p>
                    </div>
                    <div className="text-xs font-semibold text-amber-900 bg-amber-100 border border-amber-200/60 px-3 py-1 rounded-full self-start sm:self-auto shadow-xs">
                      Toleransi ± 1 - 2 cm
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <caption className="sr-only">Tabel ukuran untuk kategori {chart.title}</caption>
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50 text-slate-900 font-semibold">
                          {chart.headers.map((h, i) => (
                            <th key={i} scope="col" className="px-4 py-3">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-600 font-medium">
                        {chart.rows.map((row, i) => (
                          <tr
                            key={i}
                            className="hover:bg-slate-50 transition-colors"
                          >
                            <td className="px-4 py-3 font-bold text-slate-900 bg-slate-50/50">
                              {row.size}
                            </td>
                            <td className="px-4 py-3">{row.chest}</td>
                            <td className="px-4 py-3">{row.length}</td>
                            {row.sleeve !== undefined && (
                              <td className="px-4 py-3">{row.sleeve}</td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-5 flex items-center gap-2.5 text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                    <Info className="w-4 h-4 text-amber-600 shrink-0" aria-hidden="true" />
                    <span>
                      Perlu ukuran kustom di luar tabel standar (misal 3XL, 4XL, 5XL)? Diskusikan langsung dengan admin via WhatsApp.
                    </span>
                  </div>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
}
