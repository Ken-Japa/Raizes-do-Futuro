"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Bird, Egg, DollarSign, AlertTriangle, Calendar, ArrowRight, Factory, Trees, ClipboardList, Thermometer, Target, Home, ShieldCheck, Scale, Info, Layers } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
                        <Button variant="outline" size="sm" className="border-amber-200 dark:border-amber-900 hover:bg-amber-100 dark:hover:bg-amber-900/40 text-amber-900 dark:text-amber-200">
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

                    <Tabs defaultValue="financial" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="financial">Viabilidade</TabsTrigger>
                            <TabsTrigger value="ecological">Ecologia</TabsTrigger>
                            <TabsTrigger value="technical">Ficha Técnica</TabsTrigger>
                            <TabsTrigger value="infrastructure">Estrutura</TabsTrigger>
                        </TabsList>

                        <TabsContent value="financial" className="mt-4">
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

                            {/* Analysis */}
                            <Card className="mt-4">
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
                                    <div className="p-3 bg-amber-500/5 rounded-md mt-4 font-medium text-amber-900 border border-amber-500/10">
                                        Dica: As galinhas também consomem resíduos da horta (Aquaponia) e insetos do pasto, o que pode reduzir o custo de alimentação em até 15%.
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="technical" className="mt-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <ClipboardList className="w-5 h-5 text-amber-700" />
                                        Ficha Técnica de Manejo
                                    </CardTitle>
                                    <CardDescription>Parâmetros exatos extraídos do projeto</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {/* Function Roles */}
                                    <div className="space-y-3">
                                        <h4 className="text-sm font-bold flex items-center gap-2">
                                            <Layers className="w-4 h-4 text-amber-600" /> Papéis Funcionais no Ecossistema
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="p-4 rounded-xl border bg-card">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Badge className="bg-amber-600">Galinhas Poedeiras</Badge>
                                                    <span className="text-xs font-bold font-mono">Australorp</span>
                                                </div>
                                                <p className="text-xs text-muted-foreground leading-relaxed">
                                                    "Tratores Biológicos". Responsáveis pelo revolvimento do solo em piquetes SAF, controle de formigas e adubação nitrogenada direta.
                                                </p>
                                            </div>
                                            <div className="p-4 rounded-xl border bg-card">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Badge className="bg-cyan-600">Patos</Badge>
                                                    <span className="text-xs font-bold font-mono">Pequim/Caipira</span>
                                                </div>
                                                <p className="text-xs text-muted-foreground leading-relaxed">
                                                    "Controle Seletivo". Atuam em áreas úmidas e SAFs para controle de caramujos, lesmas e pragas que galinhas evitam. Não destroem hortaliças.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tech Matrix */}
                                    <div className="space-y-3">
                                        <h4 className="text-sm font-bold flex items-center gap-2">
                                            <Info className="w-4 h-4 text-amber-600" /> Matriz de Desempenho
                                        </h4>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Indicador</TableHead>
                                                    <TableHead>Meta Raízes</TableHead>
                                                    <TableHead>Observação</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell className="font-medium text-xs">Área de Piquete</TableCell>
                                                    <TableCell className="text-xs font-bold">5 m²/ave</TableCell>
                                                    <TableCell className="text-xs">Sistema rotacionado</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-medium text-xs">Consumo Ração</TableCell>
                                                    <TableCell className="text-xs font-bold">120 g/dia</TableCell>
                                                    <TableCell className="text-xs">Média anual</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-medium text-xs">Postura Esperada</TableCell>
                                                    <TableCell className="text-xs font-bold">80-90%</TableCell>
                                                    <TableCell className="text-xs">Australorp Black</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                </div>
            </div>
        </div>
    );
}
