"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRightLeft, Droplets, Fish, Sprout, Bird, Recycle, ArrowRight, Zap, Info } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function IntegrationPage() {
    const [activeSystem, setActiveSystem] = useState<string | null>(null);

    const systems = [
        {
            id: "fish",
            title: "Piscicultura",
            icon: Fish,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20",
            inputs: ["Ração Balanceada", "Água Limpa"],
            outputs: ["Peixe (Proteína)", "Biofertilizante"],
            desc: "O motor de nutrientes do sistema. A água dos tanques é o 'ouro líquido' para a agrofloresta."
        },
        {
            id: "forest",
            title: "Agrofloresta",
            icon: Sprout,
            color: "text-green-600",
            bg: "bg-green-600/10",
            border: "border-green-600/20",
            inputs: ["Biofertilizante", "Esterco Compostado"],
            outputs: ["Frutas e Grãos", "Madeira Nobre", "Solo Vivo"],
            desc: "O pulmão e o estoque de carbono. Transforma nutrientes em biomassa e alimentos diversos."
        },
        {
            id: "factory",
            title: "Fábrica de Ração",
            icon: Recycle,
            color: "text-amber-500",
            bg: "bg-amber-500/10",
            border: "border-amber-500/20",
            inputs: ["Grãos da Fazenda", "Subprodutos de Peixe"],
            outputs: ["Ração Premium", "Suplementos"],
            desc: "A inteligência do ciclo. Transforma subprodutos em nutrição de alta performance."
        },
        {
            id: "birds",
            title: "Avicultura Móvel",
            icon: Bird,
            color: "text-amber-700",
            bg: "bg-amber-700/10",
            border: "border-amber-700/20",
            inputs: ["Pasto", "Ração Local"],
            outputs: ["Ovos e Carne", "Adubo Natural"],
            desc: "Os tratores vivos. Limpam o solo, controlam pragas e fertilizam o pasto em movimento."
        }
    ];

    return (
        <div className="space-y-16 p-6 md:p-12 max-w-7xl mx-auto pb-32">
            <header className="space-y-4 max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3"
                >
                    <div className="p-3 bg-primary/10 rounded-2xl">
                        <Recycle className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-primary/60">Simbiose Industrial</span>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">O Ecossistema Vivo</h1>
                    </div>
                </motion.div>
                <p className="text-muted-foreground text-xl font-light">
                    No Kanobia, o desperdício é apenas um recurso fora de lugar. Explore como nossos sistemas respiram juntos.
                </p>
            </header>

            {/* Interactive Flow Visualizer */}
            <div className="grid lg:grid-cols-5 gap-12 items-center">

                {/* System Selection List */}
                <div className="lg:col-span-2 space-y-4">
                    {systems.map((sys) => (
                        <motion.button
                            key={sys.id}
                            onClick={() => setActiveSystem(activeSystem === sys.id ? null : sys.id)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full text-left p-6 rounded-3xl border transition-all duration-300 flex items-center justify-between group ${activeSystem === sys.id
                                    ? `${sys.bg} ${sys.border} shadow-lg ring-2 ring-primary/20`
                                    : "bg-card hover:bg-muted/50 border-border/50"
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-2xl bg-white dark:bg-card border shadow-sm ${sys.color}`}>
                                    <sys.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{sys.title}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-1">{sys.desc}</p>
                                </div>
                            </div>
                            <ArrowRight className={`w-5 h-5 transition-transform ${activeSystem === sys.id ? "rotate-90" : "group-hover:translate-x-1"}`} />
                        </motion.button>
                    ))}
                </div>

                {/* Central Diagram Area */}
                <div className="lg:col-span-3 aspect-square lg:aspect-auto min-h-[500px] relative rounded-[3rem] bg-muted/30 border border-dashed border-border/50 flex items-center justify-center p-8 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.05)_0%,transparent_70%)]" />

                    {/* The Circular Core */}
                    <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-2 border-primary/10 flex items-center justify-center">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-2 border-t-2 border-primary/20 rounded-full"
                        />

                        <AnimatePresence mode="wait">
                            {!activeSystem ? (
                                <motion.div
                                    key="idle"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.2 }}
                                    className="text-center space-y-4 p-8"
                                >
                                    <Recycle className="w-16 h-16 mx-auto text-primary/40 animate-pulse" />
                                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Selecione um sistema para explorar os fluxos</p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key={activeSystem}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.2 }}
                                    className="text-center space-y-6"
                                >
                                    {(() => {
                                        const sys = systems.find(s => s.id === activeSystem)!;
                                        return (
                                            <div className="space-y-4">
                                                <div className={`w-20 h-20 mx-auto rounded-3xl ${sys.bg} flex items-center justify-center ${sys.color} border ${sys.border}`}>
                                                    <sys.icon className="w-10 h-10" />
                                                </div>
                                                <h3 className="text-2xl font-bold">{sys.title}</h3>
                                                <div className="grid grid-cols-2 gap-4 text-left">
                                                    <div className="space-y-2">
                                                        <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Insumos</span>
                                                        <ul className="text-xs space-y-1">
                                                            {sys.inputs.map((inp, i) => (
                                                                <li key={i} className="flex items-center gap-1"><Zap className="w-2 h-2 text-amber-500" /> {inp}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div className="space-y-2 border-l border-border pl-4">
                                                        <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Saídas</span>
                                                        <ul className="text-xs space-y-1">
                                                            {sys.outputs.map((out, i) => (
                                                                <li key={i} className="flex items-center gap-1"><Droplets className="w-2 h-2 text-blue-500" /> {out}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })()}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Flow Particles (Visual only) */}
                    {activeSystem && (
                        <div className="absolute inset-0 pointer-events-none">
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 0, y: 0 }}
                                    animate={{
                                        opacity: [0, 1, 0],
                                        x: (i % 2 === 0 ? 1 : -1) * (150 + Math.random() * 50),
                                        y: (i < 3 ? 1 : -1) * (150 + Math.random() * 50),
                                    }}
                                    transition={{
                                        duration: 2 + Math.random(),
                                        repeat: Infinity,
                                        delay: i * 0.4
                                    }}
                                    className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full bg-primary/20 blur-[1px]"
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Strategic Value Section */}
            <div className="grid md:grid-cols-3 gap-8 pt-12">
                <ValueCard
                    icon={ArrowRightLeft}
                    title="Eficiência de Insumos"
                    desc="Reduzimos a dependência externa em até 70% através do reaproveitamento de nutrientes."
                />
                <ValueCard
                    icon={ShieldCheck}
                    title="Segurança Climática"
                    desc="Sistemas integrados são mais resilientes a choques climáticos e flutuações de mercado."
                />
                <ValueCard
                    icon={Info}
                    title="Modelo de Dados"
                    desc="Tudo é monitorado para otimização constante dos fluxos entre produtores e consumidores."
                />
            </div>
        </div>
    );
}

function ValueCard({ icon: Icon, title, desc }: any) {
    return (
        <Card className="rounded-[2.5rem] p-8 border-none bg-primary/5 hover:bg-primary/10 transition-colors">
            <CardHeader className="p-0 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-background border flex items-center justify-center text-primary shadow-sm mb-4">
                    <Icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl font-bold">{title}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <p className="text-muted-foreground leading-relaxed">{desc}</p>
            </CardContent>
        </Card>
    );
}

function ShieldCheck(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    );
}
