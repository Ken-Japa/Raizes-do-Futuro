"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRightLeft, Droplets, Fish, Sprout, Bird, Recycle } from "lucide-react";

export default function IntegrationPage() {
    return (
        <div className="space-y-8 p-8 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
            >
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-teal-500/10 rounded-xl">
                        <Recycle className="w-8 h-8 text-teal-500" />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">Ecossistema Integrado</h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Entenda como os sistemas se conectam criando um ciclo de desperdício zero (Zero Waste).
                </p>
            </motion.div>

            {/* Main Interactive Diagram / Explanation */}
            <div className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Center - The Core Loop */}
                <div className="lg:col-start-2 lg:row-start-1 lg:row-end-3 flex flex-col justify-center space-y-4">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-green-500/10 border border-blue-500/20 text-center space-y-4"
                    >
                        <div className="mx-auto w-16 h-16 rounded-full bg-background flex items-center justify-center shadow-sm">
                            <Droplets className="w-8 h-8 text-blue-500" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">O Ciclo da Água</h3>
                            <p className="text-sm text-muted-foreground mt-2">
                                A água rica em nutrientes dos peixes irriga a agrofloresta e alimenta a aquaponia, retornando limpa ou sendo absorvida pelo solo.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Sub-systems Inputs/Outputs */}
                <IntegrationCard
                    title="Piscicultura"
                    icon={Fish}
                    color="text-blue-500"
                    inputs={["Ração Balanceada", "Água Limpa"]}
                    outputs={["Proteína (Peixe)", "Efluente Rico em Nitrogênio (Biofertilizante)"]}
                    delay={0.3}
                />

                <IntegrationCard
                    title="Agrofloresta"
                    icon={Sprout}
                    color="text-green-600"
                    inputs={["Biofertilizante (Água dos Peixes)", "Esterco (Aves)"]}
                    outputs={["Frutas/Vegetais", "Madeira", "Matéria Orgânica (Solo)"]}
                    delay={0.4}
                />

                <IntegrationCard
                    title="Fábrica de Ração"
                    icon={Recycle}
                    color="text-amber-500"
                    inputs={["Resíduos de Processamento", "Grãos (Milho/Soja)", "Subprodutos"]}
                    outputs={["Ração para Peixes", "Ração para Aves"]}
                    delay={0.5}
                />

                <IntegrationCard
                    title="Avicultura Móvel"
                    icon={Bird}
                    color="text-amber-700"
                    inputs={["Ração", "Pasto (Controle de Pragas)"]}
                    outputs={["Ovos/Carne", "Esterco (Adubo)", "Controle de Insetos"]}
                    delay={0.6}
                />

            </div>

            {/* Value Proposition */}
            <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                    <CardTitle>Por que Integrar?</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <h4 className="font-bold flex items-center gap-2">
                            <ArrowRightLeft className="w-4 h-4" /> Redução de Custos
                        </h4>
                        <p className="text-sm text-muted-foreground">O subproduto de um sistema vira insumo gratuito para o outro (ex: esterco vira adubo).</p>
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-bold flex items-center gap-2">
                            <ArrowRightLeft className="w-4 h-4" /> Resiliência
                        </h4>
                        <p className="text-sm text-muted-foreground">Diversificação de receitas. Se o mercado de peixe cai, a venda de frutas sustenta o caixa.</p>
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-bold flex items-center gap-2">
                            <ArrowRightLeft className="w-4 h-4" /> Impacto Ambiental
                        </h4>
                        <p className="text-sm text-muted-foreground">Ciclo fechado significa menos poluição e regeneração ativa do solo.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function IntegrationCard({ title, icon: Icon, color, inputs, outputs, delay }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
        >
            <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center gap-3 pb-2">
                    <div className={`p-2 rounded-lg bg-background border shadow-sm`}>
                        <Icon className={`w-5 h-5 ${color}`} />
                    </div>
                    <CardTitle className="text-base">{title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <span className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Entradas (Inputs)</span>
                        <ul className="mt-1 space-y-1">
                            {inputs.map((item: string, i: number) => (
                                <li key={i} className="text-sm flex items-center gap-2">
                                    <div className="w-1 h-1 rounded-full bg-green-500/50" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <span className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Saídas (Outputs)</span>
                        <ul className="mt-1 space-y-1">
                            {outputs.map((item: string, i: number) => (
                                <li key={i} className="text-sm flex items-center gap-2">
                                    <div className="w-1 h-1 rounded-full bg-blue-500/50" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
