"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Fish, TrendingUp, AlertCircle, DollarSign, Scale, ArrowRight, Calendar, Factory, Sprout, Thermometer, Droplets, Wind, Zap, ClipboardList, Target, Layers, Info } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default function FishSystemPage() {
    // Simulation State
    const [tanks, setTanks] = useState(4); // 4 tanks initially
    const [biomass, setBiomass] = useState(8000); // kg per tank/cycle 
    const [price, setPrice] = useState(8.00); // R$ per kg
    const [feedCost, setFeedCost] = useState(3.50); // R$ per kg of feed
    const [conversion, setConversion] = useState(1.5); // 1.5kg feed -> 1kg fish

    // Calculations
    const totalFishKg = tanks * biomass;
    const grossRevenue = totalFishKg * price;
    const totalFeedKg = totalFishKg * conversion;
    const totalFeedCost = totalFeedKg * feedCost;
    const operationalCost = totalFeedCost * 1.25; // +25% for energy/labor/meds
    const profit = grossRevenue - operationalCost;
    const margin = (profit / grossRevenue) * 100;

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

    return (
        <div className="space-y-8 p-8 max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
            >
                <div className="flex justify-between items-end">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-blue-500/10 rounded-xl">
                                <Fish className="w-8 h-8 text-blue-500" />
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight">Piscicultura de Alta Densidade</h1>
                        </div>
                        <p className="text-muted-foreground text-lg max-w-2xl mt-2">
                            Simulador financeiro para produção de Tilápia Gift em tanques escavados com aeração intensiva.
                        </p>
                    </div>
                </div>

                {/* Planning Status Context */}
                <div className="mt-6 p-4 rounded-lg bg-blue-50 border border-blue-100 dark:bg-blue-950/20 dark:border-blue-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-blue-600 mt-1" />
                        <div>
                            <h3 className="font-semibold text-blue-900 dark:text-blue-300">Status de Planejamento: Fase 2 (Piloto)</h3>
                            <p className="text-sm text-blue-700 dark:text-blue-400">Escavação de 4 tanques iniciais e validação operacional.</p>
                        </div>
                    </div>
                    <Link href="/planning">
                        <Button variant="outline" size="sm" className="border-blue-200 hover:bg-blue-100 text-blue-700">
                            Ver Cronograma <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </div>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">

                {/* Controls Panel */}
                <Card className="lg:col-span-1 border-blue-500/20 bg-card/50 backdrop-blur">
                    <CardHeader>
                        <CardTitle>Parâmetros de Produção</CardTitle>
                        <CardDescription>Ajuste as variáveis do ciclo</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">

                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <label className="text-sm font-medium">Nº de Tanques Ativos</label>
                                <span className="text-sm font-bold text-blue-500">{tanks} un</span>
                            </div>
                            <Slider
                                value={[tanks]}
                                min={1} max={12} step={1}
                                onValueChange={(v) => setTanks(v[0])}
                                className="py-2"
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <label className="text-sm font-medium">Preço de Venda (Kg)</label>
                                <span className="text-sm font-bold text-green-500">{formatCurrency(price)}</span>
                            </div>
                            <Slider
                                value={[price]}
                                min={6.00} max={12.00} step={0.50}
                                onValueChange={(v) => setPrice(v[0])}
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <label className="text-sm font-medium">Custo Ração (Kg)</label>
                                <span className="text-sm font-bold text-red-400">{formatCurrency(feedCost)}</span>
                            </div>
                            <Slider
                                value={[feedCost]}
                                min={2.50} max={5.50} step={0.10}
                                onValueChange={(v) => setFeedCost(v[0])}
                            />
                            <p className="text-xs text-muted-foreground">
                                *Produção própria reduz custo para ~R$ 3,00
                            </p>
                        </div>

                        <div className="pt-4 p-4 rounded-lg bg-blue-500/5 border border-blue-500/10 text-sm space-y-2">
                            <div className="flex justify-between">
                                <span>Conversão Alimentar (CAA)</span>
                                <span className="font-mono">1.{String(conversion * 10).split('.')[0]}:1</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Biomassa / Tanque</span>
                                <span className="font-mono">8.000 kg</span>
                            </div>
                        </div>

                    </CardContent>
                </Card>

                {/* Results Panel */}
                <div className="lg:col-span-2 space-y-6">

                    {/* KPI Cards */}
                    <Tabs defaultValue="financial" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="financial">Viabilidade</TabsTrigger>
                            <TabsTrigger value="ecological">Ecologia</TabsTrigger>
                            <TabsTrigger value="technical">Ficha Técnica</TabsTrigger>
                            <TabsTrigger value="infrastructure">Estrutura</TabsTrigger>
                        </TabsList>

                        <TabsContent value="financial" className="mt-4">
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium text-muted-foreground">Receita Bruta (Ciclo)</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-5xl font-extrabold text-blue-600 tracking-tight">{formatCurrency(grossRevenue)}</span>
                                            <span className="text-muted-foreground">/ ciclo</span>
                                        </div>

                                        <div className="p-4 bg-blue-500/5 rounded-lg text-sm text-blue-700 mt-4">
                                            <h4 className="font-bold mb-2 flex items-center gap-2">
                                                <TrendingUp className="w-4 h-4" />
                                                Escalabilidade:
                                            </h4>
                                            <p>Com a implantação da <strong>Fábrica de Ração</strong> (Yr 2), o custo por quilo de Tilápia reduz de R$ 5,25 para **R$ 4,10**, aumentando a margem líquida para {((grossRevenue - (totalFishKg * 4.10 * 1.25)) / grossRevenue * 100).toFixed(1)}%.</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium text-muted-foreground">Custo Operacional</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold text-red-400">{formatCurrency(operationalCost)}</div>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Ração + Energia + Mão de Obra
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card className={margin > 20 ? "border-green-500/50 bg-green-500/5" : "border-yellow-500/50 bg-yellow-500/5"}>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium">Lucro Líquido</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{formatCurrency(profit)}</div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <TrendingUp className="w-3 h-3" />
                                            <span className="text-xs font-bold">{margin.toFixed(1)}% Margem</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Smart Insights */}
                            <Card className="border-primary/20 mt-4">
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        <Scale className="w-5 h-5 text-primary" />
                                        <CardTitle>Análise de Viabilidade</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {margin < 15 ? (
                                        <div className="flex items-start gap-3 p-4 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400">
                                            <AlertCircle className="w-5 h-5 mt-0.5" />
                                            <div>
                                                <h4 className="font-bold">Risco Financeiro Alto</h4>
                                                <p className="text-sm">Sua margem está pressionada. Considere produzir ração própria ou aumentar o preço de venda (processamento/filé).</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-start gap-3 p-4 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400">
                                            <DollarSign className="w-5 h-5 mt-0.5" />
                                            <div>
                                                <h4 className="font-bold">Operação Saudável</h4>
                                                <p className="text-sm">A margem está dentro do esperado para piscicultura de alta tecnologia (15-25%).</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="text-sm text-muted-foreground leading-relaxed">
                                        <strong>Nota Técnica:</strong> O cálculo considera 8 meses por ciclo (engorda). O custo operacional inclui um acréscimo de 25% sobre o custo da ração para cobrir energia (aeradores), probióticos e mão de obra dedicada, conforme auditado no <em>Relatório de Verificação</em>.
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="technical" className="mt-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <ClipboardList className="w-5 h-5 text-blue-600" />
                                        Ficha Técnica Operacional
                                    </CardTitle>
                                    <CardDescription>Parâmetros exatos extraídos do projeto para Tilápia GIFT</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-8">
                                    {/* System Specs Mapping */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="p-4 rounded-xl bg-muted/30 border border-border/50 flex flex-col items-center text-center group hover:border-blue-200 transition-all">
                                            <Thermometer className="w-6 h-6 text-blue-500 mb-2" />
                                            <span className="text-[10px] uppercase font-black text-muted-foreground tracking-tighter">Temperatura</span>
                                            <span className="text-sm font-black text-foreground">26-30 <span className="text-[10px] font-bold text-muted-foreground">°C</span></span>
                                        </div>
                                        <div className="p-4 rounded-xl bg-muted/30 border border-border/50 flex flex-col items-center text-center group hover:border-blue-200 transition-all">
                                            <Wind className="w-6 h-6 text-blue-500 mb-2" />
                                            <span className="text-[10px] uppercase font-black text-muted-foreground tracking-tighter">O2 Dissolvido</span>
                                            <span className="text-sm font-black text-foreground">&gt; 5.0 <span className="text-[10px] font-bold text-muted-foreground">mg/L</span></span>
                                        </div>
                                        <div className="p-4 rounded-xl bg-muted/30 border border-border/50 flex flex-col items-center text-center group hover:border-blue-200 transition-all">
                                            <Droplets className="w-6 h-6 text-blue-500 mb-2" />
                                            <span className="text-[10px] uppercase font-black text-muted-foreground tracking-tighter">pH Ideal</span>
                                            <span className="text-sm font-black text-foreground">6.8 - 7.5</span>
                                        </div>
                                        <div className="p-4 rounded-xl bg-muted/30 border border-border/50 flex flex-col items-center text-center group hover:border-blue-200 transition-all">
                                            <Target className="w-6 h-6 text-blue-500 mb-2" />
                                            <span className="text-[10px] uppercase font-black text-muted-foreground tracking-tighter">Densidade</span>
                                            <span className="text-sm font-black text-foreground">60 <span className="text-[10px] font-bold text-muted-foreground">kg/m³</span></span>
                                        </div>
                                    </div>

                                    {/* Ration Formula */}
                                    <div className="space-y-3">
                                        <h4 className="text-sm font-bold flex items-center gap-2">
                                            <Factory className="w-4 h-4 text-amber-600" /> Fórmula da Ração (RA - Raízes)
                                        </h4>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                            {[
                                                { label: "Milho Gram.", val: "28%" },
                                                { label: "Guandu", val: "14%" },
                                                { label: "Farelo Arroz", val: "10%" },
                                                { label: "BSF/Insetos", val: "5%" }
                                            ].map((i, idx) => (
                                                <div key={idx} className="p-2 border rounded-lg text-center bg-muted/20">
                                                    <div className="text-[10px] uppercase font-bold text-muted-foreground">{i.label}</div>
                                                    <div className="text-lg font-black text-blue-700">{i.val}</div>
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-[10px] text-muted-foreground italic text-center">Complemento com Moringa (5%) e Soro de Leite conforme disponibilidade.</p>
                                    </div>

                                    {/* Logistics */}
                                    <div className="space-y-3">
                                        <h4 className="text-sm font-bold flex items-center gap-2">
                                            <Target className="w-4 h-4 text-blue-600" /> Metas de Manejo
                                        </h4>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Parâmetro</TableHead>
                                                    <TableHead>Valor</TableHead>
                                                    <TableHead>Frequência</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell className="font-medium text-xs">Arraçoamento</TableCell>
                                                    <TableCell className="text-xs">Variável (Fases)</TableCell>
                                                    <TableCell className="text-xs font-bold text-blue-600">4x / dia</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-medium text-xs">Densidade Final</TableCell>
                                                    <TableCell className="text-xs">60 kg/m³</TableCell>
                                                    <TableCell className="text-xs">2 Ciclos/Ano</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-medium text-xs">Abatimento</TableCell>
                                                    <TableCell className="text-xs">800g - 1kg</TableCell>
                                                    <TableCell className="text-xs">8 meses</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="infrastructure" className="mt-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Infraestrutura Exigida</CardTitle>
                                    <CardDescription>Ativos necessários para operação em alta densidade</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid md:grid-cols-3 gap-4">
                                        {[
                                            { title: "Tanque Escavado", val: "R$ 15.000", desc: "1.000m² com revestimento." },
                                            { title: "Aeradores (2cv)", val: "R$ 4.500", desc: "2 un por tanque. Oxigenação constante." },
                                            { title: "Monitoramento", val: "R$ 3.200", desc: "Sensores de O2, pH e Temp (IoT)." }
                                        ].map((item, i) => (
                                            <div key={i} className="p-4 rounded-xl border bg-muted/50">
                                                <div className="text-[10px] uppercase font-bold text-muted-foreground mb-1">{item.title}</div>
                                                <div className="text-xl font-black">{item.val}</div>
                                                <p className="text-[10px] opacity-70 mt-1">{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/10 text-xs text-orange-800 dark:text-orange-400">
                                        <strong>Crítico:</strong> A redundância de energia (Gerador ou Bateria) é mandatória para evitar perdas totais em quedas de luz superiores a 40 minutos.
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    {/* Integration Links */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <Link href="/systems/feed">
                            <Card className="hover:bg-muted/50 transition-colors cursor-pointer border-dashed h-full">
                                <CardHeader className="p-4 pb-2">
                                    <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                        <Factory className="w-3 h-3" /> Origem do Insumo
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                    <div className="font-semibold text-amber-700 dark:text-amber-400">Fábrica de Ração</div>
                                    <p className="text-xs text-muted-foreground mt-1">Redução de custo estimada em 30% com produção própria.</p>
                                </CardContent>
                            </Card>
                        </Link>
                        <Link href="/systems/aquaponics">
                            <Card className="hover:bg-muted/50 transition-colors cursor-pointer border-dashed h-full">
                                <CardHeader className="p-4 pb-2">
                                    <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                        <Sprout className="w-3 h-3" /> Destino do Efluente
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                    <div className="font-semibold text-cyan-700 dark:text-cyan-400">Aquaponia</div>
                                    <p className="text-xs text-muted-foreground mt-1">Transformação de resíduos em biofertilizante de alto valor.</p>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>

                    {/* Operational Narrative */}
                    <Card className="border-border/60 shadow- premium">
                        <CardHeader className="border-b bg-muted/30">
                            <CardTitle className="text-xl font-black text-foreground">Caderno Operacional: Ciclo de Engorda</CardTitle>
                        </CardHeader>
                        <CardContent className="prose lg:prose-lg max-w-none text-foreground py-8 px-6 dark:prose-invert">
                            <p className="leading-relaxed text-lg font-light">
                                O sistema de piscicultura do Projeto Raízes do Futuro utiliza a tecnologia de <strong>bioflocos adaptada</strong> ou recirculação assistida, focando na Tilápia GIFT por sua alta conversão alimentar e rusticidade.
                            </p>

                            <div className="grid md:grid-cols-2 gap-8 mt-6">
                                <section className="p-6 rounded-2xl bg-blue-50/30 border border-blue-100 dark:bg-blue-900/10 dark:border-blue-900/30">
                                    <h4 className="font-black text-blue-900 dark:text-blue-300 text-lg mb-3 flex items-center gap-3">
                                        <div className="w-2 h-6 rounded-full bg-blue-500" />
                                        Manejo Nutricional
                                    </h4>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        A alimentação é dividida em 4 fases, fornecida <strong>4 vezes ao dia</strong>, com ração produzida localmente. Utilizamos farelo de soja, milho e farinha de insetos (BSF) para reduzir custos e aumentar a sustentabilidade.
                                    </p>
                                </section>

                                <section className="p-6 rounded-2xl bg-green-50/30 border border-green-100 dark:bg-green-900/10 dark:border-green-900/30">
                                    <h4 className="font-black text-green-900 dark:text-green-300 text-lg mb-3 flex items-center gap-3">
                                        <div className="w-2 h-6 rounded-full bg-green-500" />
                                        Sanidade e Água
                                    </h4>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        O controle de amônia e nitrito é feito via probióticos e aeração constante. A água rica em nutrientes é decantada e enviada para o sistema de hortaliças, fechando o ciclo de nitrogênio.
                                    </p>
                                </section>
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    );
}
