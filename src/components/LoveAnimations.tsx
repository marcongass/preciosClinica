"use client";

import { motion } from "framer-motion";

export default function LoveAnimations() {
    const cards = [
        {
            title: "Para la mejor Mamá",
            desc: "Gracias por todo tu esfuerzo y dedicación.",
            icon: "❤️",
            color: "bg-rose-50",
            iconColor: "text-rose-500",
            animation: {
                scale: [1, 1.1, 1],
            },
            transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        },
        {
            title: "Te amo",
            desc: "Tu luz ilumina cada rincón de nuestra familia. Eres increíble.",
            icon: "🌸",
            color: "bg-pink-50",
            iconColor: "text-pink-500",
            animation: {
                rotate: [0, 10, -10, 0],
            },
            transition: { duration: 4, repeat: Infinity, ease: "linear" }
        },
        {
            title: "Un Regalo del Cielo",
            desc: "Tenerte como madre es la mayor bendición de nuestras vidas.",
            icon: "✨",
            color: "bg-amber-50",
            iconColor: "text-amber-500",
            animation: {
                opacity: [0.5, 1, 0.5],
            },
            transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }
    ];

    return (
        <div className="grid gap-8 md:grid-cols-3">
            {cards.map((card, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    viewport={{ once: true }}
                    className={`group relative overflow-hidden rounded-3xl ${card.color} p-8 shadow-premium transition-all hover:shadow-2xl hover:-translate-y-1 border border-transparent hover:border-white`}
                >
                    {/* Decorative background circle */}
                    <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/40 blur-2xl transition-all group-hover:scale-150" />

                    <motion.div
                        animate={card.animation as any}
                        transition={card.transition as any}
                        className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-4xl shadow-sm ${card.iconColor}`}
                    >
                        {card.icon}
                    </motion.div>

                    <h3 className="mb-3 text-xl font-bold text-secondary">{card.title}</h3>
                    <p className="text-secondary/60 leading-relaxed">{card.desc}</p>

                    <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary">
                        Con todo nuestro amor
                        <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        >
                            →
                        </motion.span>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
