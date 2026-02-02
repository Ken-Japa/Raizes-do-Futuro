"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar, CheckCircle2, Circle, Clock, ArrowRight } from "lucide-react";

export default function PlanningPage() {
    const phases = [
        {
            title: "Fase 1: Infraestrutura & Ração",
            period: "Mês 1 - 6",
            status: "complete",
            items: [
                "Terraplanagem e definição de acessos",
                "Construção da Fábrica de Ração (Galpão)",
                "Aquisição de maquinário inicial (misturador, peletizadora)",
                "Instalação de rede elétrica e hidráulica base"
            ]
        },
        {
            title: "Fase 2: Piscicultura Piloto",
            period: "Mês 7 - 12",
            status: "current",
            items: [
                "Escavação de 4 tanques de 1000m³",
                "Instalação de aeradores e bombas",
                "Povoamento do Ciclo 1 (Tilápia)",
                "Validação da ração própria"
            ]
        },
        {
            title: "Fase 3: Expansão & Integração",
            period: "Ano 2",
            status: "upcoming",
            items: [
                "Implementação do sistema de Aquaponia",
                "Plantio de frutíferas (Agrofloresta - Estrato Baixo)",
                "Construção dos galinheiros móveis (Avicultura)",
                "Início da comercialização local"
            ]
        },
        {
            title: "Fase 4: Maturação do Ecossistema",
            period: "Ano 3+",
            status: "upcoming",
            items: [
                "Colheita plena da Agrofloresta",
                "Autossuficiência energética (Solar)",
                "Certificação Orgânica/Sustentável",
                "Abertura para Ecoturismo/Visitas"
            ]
        }
    ];

    return (
        <div className="space-y-8 p-8 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
            >
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-500/10 rounded-xl">
                        <Calendar className="w-8 h-8 text-purple-500" />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">Planejamento Estratégico</h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Cronograma de implementação e evolução do ecossistema integrado.
                </p>
            </motion.div>

            <div className="relative border-l-2 border-muted ml-4 md:ml-12 space-y-12 py-4">
                {phases.map((phase, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.2 }}
                        className="relative pl-8 md:pl-16"
                    >
                        {/* Timeline Connector */}
                        <div className={`absolute -left-[9px] top-0 p-1 rounded-full bg-background border-2 ${phase.status === 'complete' ? 'border-green-500' :
                                phase.status === 'current' ? 'border-blue-500' : 'border-muted-foreground'
                            }`}>
                            {phase.status === 'complete' ? <CheckCircle2 className="w-4 h-4 text-green-500" /> :
                                phase.status === 'current' ? <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse" /> :
                                    <Circle className="w-4 h-4 text-muted-foreground" />}
                        </div>

                        <Card className={`${phase.status === 'current' ? 'border-blue-500/50 shadow-lg shadow-blue-500/5' : ''}`}>
                            <CardHeader>
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                    <div>
                                        <CardTitle className="text-xl">{phase.title}</CardTitle>
                                        <CardDescription className="flex items-center gap-2 mt-1">
                                            <Clock className="w-4 h-4" />
                                            {phase.period}
                                            {phase.status === 'current' && (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                                    Em Progresso
                                                </span>
                                            )}
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {phase.items.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                                            <ArrowRight className="w-4 h-4 mt-0.5 text-muted-foreground" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
