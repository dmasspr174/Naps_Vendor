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
      <DialogContent className="max-w-xl bg-white border-slate-100 text-slate-900 rounded-2xl shadow-xl p-6">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl font-bold flex items-center gap-2 text-slate-900">
            <Ruler className="w-5 h-5 text-amber-500" aria-hidden="true" />
            {activeChart.title}
          </DialogTitle>
          <DialogDescription className="font-sans text-slate-500 text-xs sm:text-sm font-medium">
            {activeChart.description}
          </DialogDescription>
        </DialogHeader>

        {/* Tabular Size Data */}
        <div className="overflow-x-auto my-3 rounded-xl border border-slate-200/80 bg-slate-50 p-1">
          <table className="w-full text-left text-xs sm:text-sm">
            <caption className="sr-only">Tabel ukuran untuk {activeChart.title}</caption>
            <thead>
              <tr className="border-b border-slate-200 bg-slate-100 text-slate-900 font-semibold">
                {activeChart.headers.map((header, idx) => (
                  <th key={idx} scope="col" className="px-3.5 py-2.5">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60 text-slate-600 font-medium">
              {activeChart.rows.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-white transition-colors"
                >
                  <td className="px-3.5 py-2.5 font-bold text-slate-900 bg-slate-100/50">
                    {row.size}
                  </td>
                  <td className="px-3.5 py-2.5">{row.chest}</td>
                  <td className="px-3.5 py-2.5">{row.length}</td>
                  {row.sleeve !== undefined && (
                    <td className="px-3.5 py-2.5">{row.sleeve}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tolerance Notice */}
        <div className="flex items-center gap-2 rounded-xl bg-amber-50 p-3 text-xs text-amber-900 border border-amber-200/60">
          <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600" aria-hidden="true" />
          <span>
            Toleransi ukuran penjahitan ± 1 - 2 cm adalah standar wajar produksi konveksi.
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
