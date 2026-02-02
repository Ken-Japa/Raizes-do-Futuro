"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Fish, TrendingUp, AlertCircle, DollarSign, Scale, ArrowRight, Calendar, Factory, Sprout } from "lucide-react";
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
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Receita Bruta (Ciclo)</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-green-500">{formatCurrency(grossRevenue)}</div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {tanks * 8} toneladas totais
                                </p>
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

                    {/* Smart Insights */}
                    <Card className="border-primary/20">
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

                </div>
            </div>
        </div>
    );
}
