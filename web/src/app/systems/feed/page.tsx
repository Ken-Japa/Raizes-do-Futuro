"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Sprout, Factory, ArrowRight, TrendingDown, Calendar, RefreshCcw, Fish, Bird } from "lucide-react";
import Link from "next/link";

export default function FeedSystemPage() {
    // Feed Formulation State (Base Ration)
    const [cornPrice, setCornPrice] = useState(60.00); // R$ per 60kg bag
    const [soyPrice, setSoyPrice] = useState(140.00); // R$ per 60kg bag
    const [supplementPrice, setSupplementPrice] = useState(12.00); // R$ per kg
    const [productionVolume, setProductionVolume] = useState(2000); // kg per month

    // Prices per KG
    const cornKg = cornPrice / 60;
    const soyKg = soyPrice / 60;

    // Typical Mix: 70% Corn, 25% Soy, 5% Nucleus (Simplified)
    const homemadeCost = (cornKg * 0.70) + (soyKg * 0.25) + (supplementPrice * 0.05) + 0.20; // +0.20 energy/labor
    const commercialCost = 3.80; // Avg market price for 32% protein

    const monthlySavings = (commercialCost - homemadeCost) * productionVolume;
    const annualSavings = monthlySavings * 12;

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
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-amber-500/10 rounded-xl">
                        <Factory className="w-8 h-8 text-amber-600" />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">Fábrica de Ração</h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Simulador de viabilidade para produção própria de ração. Compare o custo "On the Farm" vs Ração Comercial.
                </p>

                {/* Planning Status Context */}
                <div className="mt-6 p-4 rounded-lg bg-amber-50 border border-amber-100 dark:bg-amber-950/20 dark:border-amber-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-amber-600 mt-1" />
                        <div>
                            <h3 className="font-semibold text-amber-900 dark:text-amber-300">Status de Planejamento: Fase 1 (Infraestrutura)</h3>
                            <p className="text-sm text-amber-800 dark:text-amber-400">Implementação prioritária para redução de custos operacionais.</p>
                        </div>
                    </div>
                    <Link href="/planning">
                        <Button variant="outline" size="sm" className="border-amber-200 hover:bg-amber-100 text-amber-800">
                            Ver Cronograma <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </div>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">

                {/* Ingredients Control */}
                <Card className="lg:col-span-1 border-amber-500/20 bg-card/50">
                    <CardHeader>
                        <CardTitle>Custo dos Insumos</CardTitle>
                        <CardDescription>Preço da saca (60kg) na região</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">

                        <div className="space-y-3">
                            <label className="text-sm font-medium">Milho (Saca 60kg)</label>
                            <div className="flex items-center gap-2">
                                <span className="text-muted-foreground">R$</span>
                                <Input
                                    type="number"
                                    value={cornPrice}
                                    onChange={(e) => setCornPrice(Number(e.target.value))}
                                    className="font-bold"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-medium">Farelo de Soja (Saca 60kg)</label>
                            <div className="flex items-center gap-2">
                                <span className="text-muted-foreground">R$</span>
                                <Input
                                    type="number"
                                    value={soyPrice}
                                    onChange={(e) => setSoyPrice(Number(e.target.value))}
                                    className="font-bold"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-medium">Volume de Produção (Kg/Mês)</label>
                            <Slider
                                value={[productionVolume]}
                                min={500} max={10000} step={100}
                                onValueChange={(v) => setProductionVolume(v[0])}
                                className="py-4"
                            />
                            <div className="text-center font-bold text-lg">{productionVolume} kg</div>
                        </div>

                    </CardContent>
                </Card>

                {/* Comparison Board */}
                <div className="lg:col-span-2 space-y-6">

                    <Card>
                        <CardContent className="p-8">
                            <div className="grid md:grid-cols-3 gap-8 items-center">
                                <div className="text-center space-y-2 opacity-70">
                                    <h3 className="text-sm font-medium text-muted-foreground">Ração Comercial</h3>
                                    <div className="text-3xl font-bold line-through decoration-red-500/50">{formatCurrency(commercialCost)}/kg</div>
                                </div>

                                <div className="flex flex-col items-center justify-center text-amber-500">
                                    <ArrowRight className="w-8 h-8 hidden md:block" />
                                    <span className="text-xs font-bold uppercase tracking-widest mt-2">Economia de {((1 - homemadeCost / commercialCost) * 100).toFixed(0)}%</span>
                                </div>

                                <div className="text-center space-y-2">
                                    <h3 className="text-sm font-medium text-amber-600">Produção Própria</h3>
                                    <div className="text-4xl font-extrabold text-green-600 dark:text-green-400">{formatCurrency(homemadeCost)}/kg</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Impact Analysis */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <Card className="bg-green-500/10 border-green-500/20">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-green-700 dark:text-green-400">Economia Mensal</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-green-700 dark:text-green-400">{formatCurrency(monthlySavings)}</div>
                                <p className="text-xs opacity-70 mt-1">Dinheiro estancado no caixa</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-primary/5 border-primary/10">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-primary">Impacto Anual</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-primary">{formatCurrency(annualSavings)}</div>
                                <div className="flex items-center gap-2 mt-2 text-xs opacity-80">
                                    <TrendingDown className="w-3 h-3" />
                                    <span>Baseado na produção atual</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Integrated Distribution */}
                    <Card className="bg-muted/30 border-dashed">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium flex items-center gap-2">
                                <RefreshCcw className="w-4 h-4 text-blue-500" />
                                Destino da Produção (Integração)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid sm:grid-cols-2 gap-4">
                            <Link href="/systems/fish" className="group block select-none">
                                <div className="p-4 rounded-lg border bg-card hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all h-full flex items-center gap-3">
                                    <div className="p-2 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                                        <Fish className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-sm group-hover:text-blue-700 dark:group-hover:text-blue-300">Piscicultura</h4>
                                        <p className="text-xs text-muted-foreground">70% da demanda projetada</p>
                                    </div>
                                    <ArrowRight className="w-4 h-4 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-500" />
                                </div>
                            </Link>

                            <Link href="/systems/chicken" className="group block select-none">
                                <div className="p-4 rounded-lg border bg-card hover:border-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all h-full flex items-center gap-3">
                                    <div className="p-2 rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300">
                                        <Bird className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-sm group-hover:text-amber-700 dark:group-hover:text-amber-300">Avicultura</h4>
                                        <p className="text-xs text-muted-foreground">30% da demanda projetada</p>
                                    </div>
                                    <ArrowRight className="w-4 h-4 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-amber-500" />
                                </div>
                            </Link>
                        </CardContent>
                    </Card>

                    <p className="text-sm text-center text-muted-foreground">
                        *O custo "Produção Própria" já inclui R$ 0,20/kg referente a energia elétrica e depreciação do misturador/triturador.
                    </p>

                </div>
            </div>
        </div>
    );
}
