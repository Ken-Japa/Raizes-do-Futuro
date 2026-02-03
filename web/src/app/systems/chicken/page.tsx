"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Bird, Egg, DollarSign, AlertTriangle, Calendar, ArrowRight, Factory, Trees, ClipboardList, Thermometer, Target, Home, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function ChickenSystemPage() {
    const [birds, setBirds] = useState(300); // Initial flock size
    const [layRate, setLayRate] = useState(85); // % laying rate
    const [eggPrice, setEggPrice] = useState(1.00); // Price per egg (Organic/Caipira)

    // Costs
    const feedPerBirdDay = 0.120; // 120g
    const feedCostKg = 3.00; // Homemade feed cost

    // Calc
    const dailyEggs = birds * (layRate / 100);
    const dailyRevenue = dailyEggs * eggPrice;
    const monthlyRevenue = dailyRevenue * 30;

    const dailyFeedCost = birds * feedPerBirdDay * feedCostKg;
    const monthlyFeedCost = dailyFeedCost * 30;

    const monthlyProfit = monthlyRevenue - monthlyFeedCost;

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
                    <div className="p-3 bg-amber-900/10 rounded-xl">
                        <Bird className="w-8 h-8 text-amber-900" />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">Avicultura Integrada</h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Galinhas poedeiras (Australorp) em sistema de pastoreio rotacionado. Controle de pragas e adubação para o SAF.
                </p>

                {/* Planning Status Context */}
                <div className="mt-6 p-4 rounded-lg bg-amber-50 border border-amber-100 dark:bg-amber-950/20 dark:border-amber-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-amber-700 mt-1" />
                        <div>
                            <h3 className="font-semibold text-amber-900 dark:text-amber-300">Status de Planejamento: Fase 3 (Ano 2)</h3>
                            <p className="text-sm text-amber-800 dark:text-amber-400">Implementação prevista após consolidação da agrofloresta.</p>
                        </div>
                    </div>
                    <Link href="/planning">
                        <Button variant="outline" size="sm" className="border-amber-200 hover:bg-amber-100 text-amber-900">
                            Ver Cronograma <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </div>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">

                {/* Controls */}
                <Card className="lg:col-span-1 border-amber-900/20 bg-card/50">
                    <CardHeader>
                        <CardTitle>Manejo do Plantel</CardTitle>
                        <CardDescription>Ajuste para simular cenários</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">

                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <label className="text-sm font-medium">Qtd. de Galinhas</label>
                                <span className="text-sm font-bold text-amber-700">{birds} un</span>
                            </div>
                            <Slider
                                value={[birds]}
                                min={50} max={1000} step={50}
                                onValueChange={(v) => setBirds(v[0])}
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <label className="text-sm font-medium">Taxa de Postura (%)</label>
                                <span className="text-sm font-bold text-green-600">{layRate}%</span>
                            </div>
                            <Slider
                                value={[layRate]}
                                min={50} max={95} step={5}
                                onValueChange={(v) => setLayRate(v[0])}
                            />
                            <p className="text-xs text-muted-foreground">
                                Média da raça Australorp Black: 80-90%
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <label className="text-sm font-medium">Preço do Ovo (Un)</label>
                                <span className="text-sm font-bold text-green-600">{formatCurrency(eggPrice)}</span>
                            </div>
                            <Slider
                                value={[eggPrice]}
                                min={0.50} max={2.00} step={0.10}
                                onValueChange={(v) => setEggPrice(v[0])}
                            />
                        </div>

                    </CardContent>
                </Card>

                {/* Financials */}
                <div className="lg:col-span-2 space-y-6">

                    <div className="grid sm:grid-cols-3 gap-4">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Ovos / Mês</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold flex items-center gap-2">
                                    <Egg className="w-5 h-5 opacity-50" />
                                    {(dailyEggs * 30).toFixed(0)}
                                </div>
                                <p className="text-xs opacity-70 mt-1">{(dailyEggs * 30 / 12).toFixed(0)} dúzias</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Custo Ração / Mês</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-red-400">{formatCurrency(monthlyFeedCost)}</div>
                                <p className="text-xs opacity-70 mt-1">{(birds * feedPerBirdDay * 30).toFixed(0)}kg de ração</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-amber-500/10 border-amber-500/20">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-amber-700 dark:text-amber-500">Lucro Líquido / Mês</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-amber-700 dark:text-amber-500">{formatCurrency(monthlyProfit)}</div>
                                <p className="text-xs opacity-70 mt-1">Margem: {((monthlyProfit / monthlyRevenue) * 100).toFixed(0)}%</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Technical Specifications */}
                    <Card className="border-amber-200">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <ClipboardList className="w-5 h-5 text-amber-700" />
                                <CardTitle>Especificações Técnicas (Target)</CardTitle>
                            </div>
                            <CardDescription>Parâmetros para a raça Australorp em pastoreio</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center group hover:border-amber-200 transition-all">
                                    <Home className="w-6 h-6 text-amber-700 mb-2" />
                                    <span className="text-[10px] uppercase font-black text-slate-400 tracking-tighter">Área Piquete</span>
                                    <span className="text-sm font-black text-slate-900">5 <span className="text-[10px] font-bold text-slate-500">m²/ave</span></span>
                                </div>
                                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center group hover:border-amber-200 transition-all">
                                    <Thermometer className="w-6 h-6 text-amber-700 mb-2" />
                                    <span className="text-[10px] uppercase font-black text-slate-400 tracking-tighter">Consumo Ração</span>
                                    <span className="text-sm font-black text-slate-900">120 <span className="text-[10px] font-bold text-slate-500">g/dia</span></span>
                                </div>
                                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center group hover:border-amber-200 transition-all">
                                    <ShieldCheck className="w-6 h-6 text-amber-700 mb-2" />
                                    <span className="text-[10px] uppercase font-black text-slate-400 tracking-tighter">Ninhos</span>
                                    <span className="text-sm font-black text-slate-900">1 / 5 <span className="text-[10px] font-bold text-slate-500">aves</span></span>
                                </div>
                                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center group hover:border-amber-200 transition-all">
                                    <Target className="w-6 h-6 text-amber-700 mb-2" />
                                    <span className="text-[10px] uppercase font-black text-slate-400 tracking-tighter">Prod. Anual</span>
                                    <span className="text-sm font-black text-slate-900">250-300 <span className="text-[10px] font-bold text-slate-500">ovos</span></span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Operational Narrative */}
                    <Card className="border-slate-200 shadow-sm">
                        <CardHeader className="border-b bg-slate-50/50">
                            <CardTitle className="text-xl font-black text-slate-900">Caderno Operacional: Avicultura Australorp</CardTitle>
                        </CardHeader>
                        <CardContent className="prose lg:prose-lg max-w-none text-slate-700 py-8 px-6">
                            <p className="leading-relaxed text-lg">
                                A escolha da raça <strong>Australorp Black</strong> deve-se à sua excepcional docilidade e taxa de postura constante, mesmo em climas variáveis. No Raízes do Futuro, elas atuam como "tratores biológicos".
                            </p>
                            <div className="grid md:grid-cols-2 gap-10 mt-8">
                                <section className="p-6 rounded-2xl bg-amber-50/30 border border-amber-100">
                                    <h4 className="font-black text-amber-900 text-lg mb-3 flex items-center gap-3">
                                        <div className="w-2 h-6 rounded-full bg-amber-500" />
                                        Manejo de Pastoreio
                                    </h4>
                                    <p className="text-slate-600 leading-relaxed">
                                        As aves são rotacionadas entre piquetes da Agrofloresta (SAF). Isso permite que o solo descanse, as galinhas controlem larvas de insetos e adubem as linhas de árvores frutíferas naturalmente.
                                    </p>
                                </section>
                                <section className="p-6 rounded-2xl bg-orange-50/30 border border-orange-100">
                                    <h4 className="font-black text-orange-900 text-lg mb-3 flex items-center gap-3">
                                        <div className="w-2 h-6 rounded-full bg-orange-500" />
                                        Suplementação Local
                                    </h4>
                                    <p className="text-slate-600 leading-relaxed">
                                        A ração produzida na fazenda é complementada com folhas de amoreira e moringa (proteína verde) e resíduos da aquaponia, garantindo ovos com gema de cor intensa e alto valor nutricional.
                                    </p>
                                </section>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Integrated Flows */}
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
                                    <p className="text-xs text-muted-foreground mt-1">Milho e Soja processados localmente.</p>
                                </CardContent>
                            </Card>
                        </Link>
                        <Link href="/systems/forest">
                            <Card className="hover:bg-muted/50 transition-colors cursor-pointer border-dashed h-full">
                                <CardHeader className="p-4 pb-2">
                                    <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                        <Trees className="w-3 h-3" /> Serviço Prestado
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                    <div className="font-semibold text-green-700 dark:text-green-400">Agrofloresta</div>
                                    <p className="text-xs text-muted-foreground mt-1">Controle biológico e adubação das linhas.</p>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>

                    {/* Analysis */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-amber-500" />
                                Ponto de Atenção
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground space-y-2">
                            <p>
                                A viabilidade da avicultura depende drasticamente do <strong>custo da ração</strong>. Com ração comercial (R$ 3,80/kg), sua margem cai para menos de 20%.
                            </p>
                            <p>
                                Este simulador assume que você está usando a <strong>Fábrica de Ração Própria</strong> (R$ {feedCostKg.toFixed(2)}/kg).
                            </p>
                            <div className="p-3 bg-muted rounded-md mt-4 font-medium text-foreground">
                                Dica: As galinhas também consomem resíduos da horta (Aquaponia) e insetos do pasto, o que pode reduzir o custo de alimentação em até 15%.
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div >
    );
}
