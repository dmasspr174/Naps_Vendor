"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Ruler, ShieldAlert } from "lucide-react";
import sizeChartsDataRaw from "@/data/sizeCharts.json";
import { SizeChartsData } from "@/types";

const sizeChartsData = sizeChartsDataRaw as SizeChartsData;

interface SizeChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
}

export function SizeChartModal({
  isOpen,
  onClose,
  category = "Kemeja",
}: SizeChartModalProps) {
  // Normalize category key
  const chartKey =
    category in sizeChartsData
      ? (category as keyof typeof sizeChartsData)
      : "Kemeja";
  const activeChart = sizeChartsData[chartKey] || sizeChartsData["Kemeja"];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl bg-zinc-950 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <Ruler className="w-5 h-5 text-primary" aria-hidden="true" />
            {activeChart.title}
          </DialogTitle>
          <DialogDescription className="text-zinc-400 text-xs">
            {activeChart.description}
          </DialogDescription>
        </DialogHeader>

        {/* Tabular Size Data */}
        <div className="overflow-x-auto my-2 rounded-lg border border-border/80 bg-zinc-950/60 p-1">
          <table className="w-full text-left text-xs sm:text-sm">
            <caption className="sr-only">Tabel ukuran untuk {activeChart.title}</caption>
            <thead>
              <tr className="border-b border-border bg-zinc-900/80 text-primary font-semibold">
                {activeChart.headers.map((header, idx) => (
                  <th key={idx} scope="col" className="px-3 py-2.5">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 text-zinc-300">
              {activeChart.rows.map((row, idx) => (
                <tr key={idx} className="hover:bg-zinc-900/50 transition-colors">
                  <td className="px-3 py-2 font-bold text-white bg-zinc-900/30">
                    {row.size}
                  </td>
                  <td className="px-3 py-2">{row.chest}</td>
                  <td className="px-3 py-2">{row.length}</td>
                  {row.sleeve !== undefined && (
                    <td className="px-3 py-2">{row.sleeve}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Measuring Tip */}
        <div className="flex items-start gap-2.5 p-3 rounded-md bg-yellow-500/10 border border-yellow-500/20 text-xs text-yellow-200/90">
          <ShieldAlert className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" aria-hidden="true" />
          <span>
            <strong>Tips Pengukuran:</strong> Ukur lebar dada dari ketiak kiri ke ketiak kanan baju yang nyaman dipakai saat dibentangkan mendatar (toleransi ± 1 - 2 cm).
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
