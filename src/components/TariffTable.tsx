"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface TariffItem {
    codigo: string;
    servicio: string;
    monto_crc: number;
}

interface TariffSection {
    [key: string]: TariffItem[];
}

interface TariffData {
    tarifas_odontologicas_costa_rica_2025: TariffSection;
}

interface Props {
    data: TariffData;
}

export default function TariffTable({ data }: Props) {
    const [newPrices, setNewPrices] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const formatNumber = (value: string) => {
        if (!value) return "";
        const numericValue = value.replace(/\D/g, "");
        return new Intl.NumberFormat("es-CR").format(parseInt(numericValue));
    };

    const handlePriceChange = (codigo: string, value: string) => {
        const numericValue = value.replace(/\D/g, "");
        setNewPrices((prev) => ({
            ...prev,
            [codigo]: numericValue,
        }));
    };

    const handleSubmit = async () => {
        const allItems = Object.values(data.tarifas_odontologicas_costa_rica_2025).flat();

        const updates = Object.entries(newPrices)
            .filter(([_, value]) => value !== "")
            .map(([codigo, monto]) => {
                const item = allItems.find(i => i.codigo === codigo);
                return {
                    codigo,
                    servicio: item?.servicio || "Desconocido",
                    monto_nuevo: parseFloat(monto),
                };
            });

        if (updates.length === 0) {
            setStatus({ type: 'error', message: "No hay cambios para enviar." });
            return;
        }

        setIsSubmitting(true);
        setStatus(null);

        try {
            await addDoc(collection(db, "actualizaciones_precios"), {
                updates,
                timestamp: serverTimestamp(),
            });

            setNewPrices({});
            setStatus({ type: 'success', message: "¡Precios enviados correctamente!" });

            // Clear success message after 5 seconds
            setTimeout(() => setStatus(null), 5000);
        } catch (error) {
            console.error("Error submitting prices:", error);
            setStatus({ type: 'error', message: "Error al enviar los precios. Inténtalo de nuevo." });
        } finally {
            setIsSubmitting(false);
        }
    };

    const sections = data.tarifas_odontologicas_costa_rica_2025;
    const hasChanges = Object.values(newPrices).some(val => val !== "");

    return (
        <div className="mx-auto max-w-7xl px-6 py-12">
            <div className="mb-12 text-center">
                <h2 className="font-heading text-3xl font-bold text-secondary sm:text-4xl">
                    Listado de <span className="text-gradient">Tarifas 2025</span>
                </h2>
                <p className="mt-4 text-secondary/60">
                    Consulta y ajusta los precios de los servicios odontológicos.
                </p>
            </div>

            <div className="space-y-16">
                {Object.entries(sections).map(([sectionKey, items]) => (
                    <div key={sectionKey} className="overflow-hidden rounded-3xl bg-card shadow-premium border border-border">
                        <div className="bg-primary/5 px-8 py-4 border-b border-border">
                            <h3 className="text-lg font-bold text-primary capitalize">
                                {sectionKey.replace(/_/g, " ").replace(/^\d+ /, "")}
                            </h3>
                        </div>
                        {/* Desktop Table */}
                        <div className="hidden overflow-x-auto md:block">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-border bg-slate-50/50">
                                        <th className="px-8 py-4 text-sm font-semibold text-secondary/70">Código</th>
                                        <th className="px-8 py-4 text-sm font-semibold text-secondary/70">Servicio</th>
                                        <th className="px-8 py-4 text-sm font-semibold text-secondary/70">Precio Base (CRC)</th>
                                        <th className="px-8 py-4 text-sm font-semibold text-secondary/70">Nuevo Precio</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {items.map((item) => (
                                        <tr key={item.codigo} className="transition-colors hover:bg-slate-50/30">
                                            <td className="px-8 py-4 text-sm font-mono text-secondary/50">{item.codigo}</td>
                                            <td className="px-8 py-4 text-sm font-medium text-secondary">{item.servicio}</td>
                                            <td className="px-8 py-4 text-sm text-secondary">
                                                ₡{item.monto_crc.toLocaleString()}
                                            </td>
                                            <td className="px-8 py-4">
                                                <div className="relative max-w-[150px]">
                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/40 text-sm">₡</span>
                                                    <input
                                                        type="text"
                                                        placeholder="Nuevo monto"
                                                        value={formatNumber(newPrices[item.codigo] || "")}
                                                        onChange={(e) => handlePriceChange(item.codigo, e.target.value)}
                                                        className="w-full rounded-xl border border-border bg-white py-2 pl-7 pr-3 text-sm text-secondary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="grid divide-y divide-border md:hidden">
                            {items.map((item) => (
                                <div key={item.codigo} className="p-6">
                                    <div className="mb-4 flex items-start justify-between gap-4">
                                        <div>
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-secondary/40">{item.codigo}</span>
                                            <h4 className="font-bold text-secondary">{item.servicio}</h4>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-secondary/40">Base</span>
                                            <p className="font-semibold text-secondary/70 text-sm">₡{item.monto_crc.toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <div className="relative w-full">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/40 text-sm font-semibold">Nuevo: ₡</span>
                                        <input
                                            type="text"
                                            placeholder="Ingresa el nuevo monto"
                                            value={formatNumber(newPrices[item.codigo] || "")}
                                            onChange={(e) => handlePriceChange(item.codigo, e.target.value)}
                                            className="w-full rounded-2xl border border-border bg-slate-50 py-4 pl-20 pr-4 text-lg font-bold text-primary focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Actions Bar */}
            <div className="sticky bottom-8 mt-12 flex justify-center">
                <div className="flex flex-col items-center gap-4">
                    {status && (
                        <div className={`rounded-full px-6 py-2 text-sm font-medium shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-300 ${status.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                            }`}>
                            {status.message}
                        </div>
                    )}

                    <button
                        onClick={handleSubmit}
                        disabled={!hasChanges || isSubmitting}
                        className={`flex items-center gap-2 rounded-2xl px-12 py-4 text-lg font-bold text-white shadow-premium transition-all duration-300 ${!hasChanges || isSubmitting
                            ? "bg-slate-300 cursor-not-allowed"
                            : "bg-primary hover:shadow-2xl hover:-translate-y-1 active:scale-95"
                            }`}
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="h-5 w-5 animate-spin text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Enviando...
                            </>
                        ) : (
                            "Enviar Actualizaciones"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
