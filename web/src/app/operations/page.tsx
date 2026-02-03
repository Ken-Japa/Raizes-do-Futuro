"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import {
    ClipboardCheck,
    Calendar,
    AlertOctagon,
    Fish,
    Droplets,
    Bird,
    Trees
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function OperationsPage() {
    const [progress, setProgress] = useState(0);

    // Mock task state management would go here
    const handleCheck = (checked: boolean) => {
        // Simple mock progress logic
        setProgress(prev => checked ? Math.min(prev + 10, 100) : Math.max(prev - 10, 0));
    };

    return (
        <div className="space-y-8 p-8 max-w-7xl mx-auto">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                            <ClipboardCheck className="w-8 h-8 text-primary" />
                            Manual de Operações (SOPs)
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Procedimentos Operacionais Padrão para a rotina da fazenda.
                        </p>
                    </div>
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-medium mb-2">Progresso Diário</p>
                        <div className="flex items-center gap-3">
                            <Progress value={progress} className="w-[200px]" />
                            <span className="font-bold text-primary">{progress}%</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            <Tabs defaultValue="daily" className="w-full">
                <TabsList className="grid w-full grid-cols-4 max-w-[600px] mb-8">
                    <TabsTrigger value="daily">Diário</TabsTrigger>
                    <TabsTrigger value="weekly">Semanal</TabsTrigger>
                    <TabsTrigger value="monthly">Mensal</TabsTrigger>
                    <TabsTrigger value="emergency" className="text-red-500 data-[state=active]:text-red-600">Emergência</TabsTrigger>
                </TabsList>

                {/* DAILY TASKS */}
                <TabsContent value="daily" className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">

                        {/* Fish System */}
                        <TaskCard
                            title="Piscicultura (Bioflocos)"
                            icon={Fish}
                            color="text-blue-500"
                            tasks={[
                                "07:00 - Medir Oxigênio Dissolvido (Meta: > 5mg/L)",
                                "07:30 - Primeira Alimentação (30% da ração diária)",
                                "12:00 - Segunda Alimentação (30%) + Observar comportamento",
                                "17:00 - Terceira Alimentação (40%)",
                                "17:30 - Checar funcionamento dos aeradores noturnos"
                            ]}
                            onCheck={handleCheck}
                        />

                        {/* Aquaponics */}
                        <TaskCard
                            title="Aquaponia"
                            icon={Droplets}
                            color="text-cyan-500"
                            tasks={[
                                "08:00 - Verificar fluxo de água nas bancadas (NFT/Cama)",
                                "08:15 - Inspeção visual de pragas nas hortaliças",
                                "16:00 - Checar e limpar pré-filtro mecânico (se necessário)",
                                "16:30 - Colheita de folhas prontas para entrega"
                            ]}
                            onCheck={handleCheck}
                        />

                        {/* Chicken */}
                        <TaskCard
                            title="Avicultura (Galinhas)"
                            icon={Bird}
                            color="text-amber-600"
                            tasks={[
                                "06:30 - Abrir galinheiro para pastejo",
                                "09:00 - Coleta de Ovos (Manhã)",
                                "09:30 - Limpeza e reabastecimento de bebedouros",
                                "15:00 - Coleta de Ovos (Tarde)",
                                "17:30 - Fechar galinheiro e contagem das aves"
                            ]}
                            onCheck={handleCheck}
                        />

                        {/* Forest */}
                        <TaskCard
                            title="Agrofloresta (SAF)"
                            icon={Trees}
                            color="text-green-600"
                            tasks={[
                                "06:00 - Irrigação (se não houve chuva > 10mm)",
                                "10:00 - Manejo de 'ervas espontâneas' (capina seletiva na coroa)",
                            ]}
                            onCheck={handleCheck}
                        />
                    </div>
                </TabsContent>

                {/* WEEKLY TASKS */}
                <TabsContent value="weekly" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-purple-500" />
                                Rotinas de Manutenção
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-muted-foreground mb-4">Ações preventivas para garantir a longevidade dos sistemas.</p>
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>Bioflocos: Medição Completa de Parâmetros</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>Amônia Total (TAN) e Nitrito.</li>
                                            <li>Alcalinidade (Manter {">"} 120mg/L).</li>
                                            <li>Sólidos Suspensos (Imhoff).</li>
                                            <li>Aplicação de Calcário/Bicarbonato conforme necessidade.</li>
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>Agrofloresta: Adubação e Poda</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>Aplicação de chorume/biofertilizante da Aquaponia.</li>
                                            <li>Poda de estratificação (abrir luz para linhas de baixo).</li>
                                            <li>Trituração de material podado para cobertura de solo (mulch).</li>
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger>Infraestrutura Geral</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>Checar cercas do pastoreio rotacionado.</li>
                                            <li>Lubrificação do trator e implementos.</li>
                                            <li>Limpeza profunda da fábrica de ração (evitar fungos).</li>
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* EMERGENCY PROTOCOLS */}
                <TabsContent value="emergency">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <EmergencyCard
                            title="Queda de Energia > 2h"
                            trigger="Sem eletricidade nos aeradores."
                            action="Ligar Gerador Diesel Imediatamente. Reduzir alimentação a 0%."
                        />
                        <EmergencyCard
                            title="Pico de Amônia (> 1.5mg/L)"
                            trigger="Peixes ofegantes na superfície."
                            action="Adicionar melaço de cana (aumentar relação C:N). Suspender alimentação por 24h."
                        />
                        <EmergencyCard
                            title="Fuga de Galinhas"
                            trigger="Cerca rompida ou predador."
                            action="Recolher plantel para galpão fechado. Identificar ponto de ruptura. Verificar rastros."
                        />
                        <EmergencyCard
                            title="Bomba Queimada (Aquaponia)"
                            trigger="Nível de água baixando no tanque."
                            action="Acionar Bomba Reserva (Bypass). Oxigenação de emergência no tanque de peixes."
                        />
                    </div>
                </TabsContent>

            </Tabs>
        </div>
    );
}

function TaskCard({ title, tasks, icon: Icon, color, onCheck }: any) {
    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                    <div className={`p-2 rounded-lg bg-accent/50 ${color}`}>
                        <Icon className="w-5 h-5" />
                    </div>
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {tasks.map((task: string, i: number) => (
                        <div key={i} className="flex items-start gap-3">
                            <Checkbox id={`${title}-${i}`} onCheckedChange={onCheck} />
                            <label
                                htmlFor={`${title}-${i}`}
                                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-medium text-muted-foreground peer-data-[state=checked]:text-foreground peer-data-[state=checked]:line-through transition-all"
                            >
                                {task}
                            </label>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

function EmergencyCard({ title, trigger, action }: any) {
    return (
        <Card className="border-red-500/30 bg-red-50/50 dark:bg-red-950/10">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                    <AlertOctagon className="w-5 h-5" />
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <div>
                    <span className="text-xs font-bold uppercase text-red-400">Gatilho</span>
                    <p className="text-sm font-medium">{trigger}</p>
                </div>
                <div>
                    <span className="text-xs font-bold uppercase text-red-500">Ação Imediata</span>
                    <p className="text-sm text-foreground">{action}</p>
                </div>
            </CardContent>
        </Card>
    )
}
