"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Recycle, Zap, Users, Home, Shovel, Sun, Droplets, Leaf } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function SustainabilityPage() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-20 pb-24 px-6 md:px-12">
            <header className="space-y-8 py-16 text-center relative">
                <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent -z-10 blur-3xl" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <Link href="/">
                        <Button variant="ghost" className="rounded-full mb-8 hover:bg-primary/5 text-muted-foreground transition-all">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para o Início
                        </Button>
                    </Link>
                </motion.div>

                <div className="space-y-4">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="uppercase tracking-[0.3em] text-xs font-bold text-green-600 block"
                    >
                        Pilar 02: Regeneração
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-heading text-5xl md:text-7xl font-bold tracking-tight text-foreground"
                    >
                        Sustentabilidade <br />
                        <span className="text-muted-foreground font-light">& Ciclos Vivos</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        Projetamos para a abundância, transformando passivos em ativos e resíduos em vida.
                    </motion.p>
                </div>
            </header>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid md:grid-cols-2 gap-8"
            >
                <SustainabilityCard
                    icon={Shovel}
                    title="Cestas Agroecológicas"
                    desc="Comercialização direta via CSA, garantindo soberania alimentar e conexão real entre terra e mesa."
                    points={["Assinatura Mensal", "Resíduo Zero", "Sazonalidade"]}
                    color="text-green-600"
                    bg="bg-green-500/5"
                    variants={item}
                />

                <SustainabilityCard
                    icon={Sun}
                    title="Matriz de Energia Limpa"
                    desc="Autonomia energética via solar e biogás, reduzindo drasticamente a pegada de carbono operacional."
                    points={["Fotovoltaica Híbrida", "Biodigestores", "Micro-Hidro"]}
                    color="text-amber-600"
                    bg="bg-amber-500/5"
                    variants={item}
                />

                <SustainabilityCard
                    icon={Home}
                    title="Design Bioclimático"
                    desc="Arquitetura que dialoga com o clima, utilizando terra, bambu e ventilação cruzada passiva."
                    points={["Baixa Entalpia", "Materiais Locais", "Conforto Térmico"]}
                    color="text-orange-600"
                    bg="bg-orange-500/5"
                    variants={item}
                />

                <SustainabilityCard
                    icon={Users}
                    title="Impacto Social Regenerativo"
                    desc="Fortalecimento da economia da floresta e capacitação da comunidade local no entorno do projeto."
                    points={["Troca de Saberes", "Rede de Apoio", "Economia Local"]}
                    color="text-blue-600"
                    bg="bg-blue-500/5"
                    variants={item}
                />
            </motion.div>

            {/* Circular Economy Visual Highlight */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative bg-foreground text-background rounded-[3rem] p-12 md:p-20 overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                    <Recycle className="w-64 h-64 animate-spin-slow" />
                </div>

                <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <h2 className="font-heading text-4xl md:text-5xl font-bold">A Economia Circular <br />na Prática</h2>
                        <p className="text-xl text-background/80 leading-relaxed font-light">
                            "Nada se perde, tudo se transforma." No Kanobia, cada 'saída' é uma 'entrada' em potencial.
                            O resíduo da piscicultura nutre a floresta. A poda da floresta vira biomassa. A biomassa aquece a vida.
                        </p>
                        <div className="flex gap-4">
                            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex-1">
                                <Droplets className="w-6 h-6 mb-2 text-blue-400" />
                                <div className="text-xs uppercase tracking-widest font-bold opacity-60 mb-1">Passivo</div>
                                <div className="text-sm font-bold">Efluente Líquido</div>
                            </div>
                            <div className="flex items-center text-green-400">
                                <ArrowLeft className="rotate-180 w-6 h-6" />
                            </div>
                            <div className="p-4 rounded-2xl bg-green-500/20 backdrop-blur-md border border-green-500/20 flex-1">
                                <Leaf className="w-6 h-6 mb-2 text-green-400" />
                                <div className="text-xs uppercase tracking-widest font-bold opacity-60 mb-1">Ativo</div>
                                <div className="text-sm font-bold">Biofertilizante</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-dashed border-white/20 flex items-center justify-center relative">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-4 rounded-full border border-white/10"
                            />
                            <div className="text-center space-y-2">
                                <Recycle className="w-16 h-16 mx-auto mb-4 text-green-400" />
                                <span className="block text-2xl font-bold">Resíduo Zero</span>
                                <span className="text-sm text-white/50 uppercase tracking-[0.2em]">Fluxo Perpétuo</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

function SustainabilityCard({ icon: Icon, title, desc, points, color, bg, variants }: any) {
    return (
        <motion.div variants={variants}>
            <Card className="h-full border-none shadow-none bg-transparent group">
                <div className={`p-10 h-full rounded-[2.5rem] border border-border/50 bg-card transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/5 group-hover:-translate-y-2 flex flex-col justify-between space-y-8`}>
                    <div className="space-y-6">
                        <div className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center ${color}`}>
                            <Icon className="w-8 h-8" />
                        </div>
                        <div className="space-y-3">
                            <h3 className="font-heading text-2xl font-bold tracking-tight">{title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {desc}
                            </p>
                        </div>
                    </div>
                    <ul className="flex flex-wrap gap-2">
                        {points.map((p: string, i: number) => (
                            <li key={i} className="px-4 py-1.5 rounded-full bg-secondary text-xs font-semibold text-secondary-foreground opacity-80 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                {p}
                            </li>
                        ))}
                    </ul>
                </div>
            </Card>
        </motion.div>
    )
}
