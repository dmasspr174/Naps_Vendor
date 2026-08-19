"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Ruler, Info } from "lucide-react";
import sizeChartsData from "@/data/sizeCharts.json";

export function SizeChartSection() {
  const [activeCategory, setActiveCategory] = React.useState<string>("Kemeja");

  const categories = Object.keys(sizeChartsData) as (keyof typeof sizeChartsData)[];

  return (
    <section id="size-chart" className="py-16 md:py-24 bg-[#050507] border-t border-border/60 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
            <Ruler className="w-3.5 h-3.5" />
            Panduan Ukuran Standar
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Size Chart Konveksi Nap's
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Pastikan ukuran pakaian sesuai kebutuhan tim atau organisasi Anda. Pilih jenis produk di bawah ini untuk melihat dimensi detailnya.
          </p>
        </div>

        {/* Tabs for Categories */}
        <Tabs defaultValue="Kemeja" value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-zinc-900 border border-zinc-800 p-1">
              {categories.map((cat) => (
                <TabsTrigger key={cat} value={cat} className="px-5 py-2 text-xs sm:text-sm font-medium">
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((cat) => {
            const chart = sizeChartsData[cat];
            return (
              <TabsContent key={cat} value={cat} className="mt-0">
                <div className="rounded-xl border border-border bg-[#121215] p-6 shadow-xl">
                  <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">{chart.title}</h3>
                      <p className="text-xs text-muted-foreground">{chart.description}</p>
                    </div>
                    <div className="text-[11px] font-semibold text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 px-2.5 py-1 rounded-md self-start sm:self-auto">
                      Toleransi ± 1 - 2 cm
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b border-border bg-zinc-900/80 text-primary font-semibold">
                          {chart.headers.map((h, i) => (
                            <th key={i} className="px-4 py-3">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/40 text-zinc-300">
                        {chart.rows.map((row, i) => (
                          <tr key={i} className="hover:bg-zinc-900/40 transition-colors">
                            <td className="px-4 py-2.5 font-bold text-white bg-zinc-900/30">{row.size}</td>
                            <td className="px-4 py-2.5">{row.chest}</td>
                            <td className="px-4 py-2.5">{row.length}</td>
                            {"sleeve" in row && <td className="px-4 py-2.5">{(row as any).sleeve}</td>}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-xs text-zinc-400 bg-zinc-900/50 p-3 rounded-lg border border-zinc-800">
                    <Info className="w-4 h-4 text-primary shrink-0" />
                    <span>Perlu ukuran kustom di luar tabel standar (misal 4XL, 5XL)? Diskusikan langsung dengan admin.</span>
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
