"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Sprout, Factory, ArrowRight, TrendingDown, Calendar, RefreshCcw, Fish, Bird, ClipboardList, ShieldCheck, Settings, Package, Leaf } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

                {/* Comparison & Tabs */}
                <div className="lg:col-span-2 space-y-6">
                    <Tabs defaultValue="viability" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="viability">Viabilidade</TabsTrigger>
                            <TabsTrigger value="ecology">Ecologia</TabsTrigger>
                            <TabsTrigger value="technical">Ficha Técnica</TabsTrigger>
                            <TabsTrigger value="infrastructure">Estrutura</TabsTrigger>
                        </TabsList>

                        <TabsContent value="viability" className="mt-4 space-y-6">
                            <Card className="overflow-hidden border-amber-500/10">
                                <CardContent className="p-0">
                                    <div className="grid md:grid-cols-3 divide-x divide-border/50">
                                        <div className="p-8 text-center space-y-2 opacity-70 bg-muted/10">
                                            <h3 className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Ração Comercial</h3>
                                            <div className="text-2xl font-bold line-through decoration-red-500/50">{formatCurrency(commercialCost)}/kg</div>
                                        </div>

                                        <div className="p-8 flex flex-col items-center justify-center bg-amber-500/5">
                                            <div className="text-xs font-black uppercase tracking-widest text-amber-600 mb-1">Economia</div>
                                            <div className="text-3xl font-black text-amber-500 tracking-tighter">{((1 - homemadeCost / commercialCost) * 100).toFixed(0)}%</div>
                                        </div>

                                        <div className="p-8 text-center space-y-2 bg-green-500/5">
                                            <h3 className="text-[10px] uppercase font-black text-green-700 tracking-widest">Produção Própria</h3>
                                            <div className="text-3xl font-black text-green-600 dark:text-green-400">{formatCurrency(homemadeCost)}/kg</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <Card className="bg-green-500/5 border-green-500/10">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-bold text-green-700 dark:text-green-400">Margem Mensal Retida</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-3xl font-black text-green-600 dark:text-green-400">{formatCurrency(monthlySavings)}</div>
                                        <p className="text-[10px] opacity-70 mt-1 uppercase font-bold tracking-wider">Livre de impostos de intermediação</p>
                                    </CardContent>
                                </Card>

                                <Card className="bg-amber-500/5 border-amber-500/10">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-bold text-amber-700 dark:text-amber-500">ROI Projetado</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-3xl font-black text-amber-600 dark:text-amber-400">{formatCurrency(annualSavings)}</div>
                                        <p className="text-[10px] opacity-70 mt-1 uppercase font-bold tracking-wider text-muted-foreground">Economia anual estimada</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="ecology" className="mt-4">
                            <Card className="border-green-500/20 bg-green-500/5">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                                        <Leaf className="w-5 h-5" />
                                        Ciclo Nutritivo Fechado
                                    </CardTitle>
                                    <CardDescription>Como a fabricação local reduz o impacto ambiental</CardDescription>
                                </CardHeader>
                                <CardContent className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="p-4 rounded-xl border bg-card/50">
                                            <h4 className="text-sm font-bold flex items-center gap-2 mb-1">
                                                <RefreshCcw className="w-4 h-4 text-green-500" /> KM Zero
                                            </h4>
                                            <p className="text-xs text-muted-foreground leading-relaxed">
                                                Eliminamos o transporte de longa distância, reduzindo drásticamente a emissão de CO2 associada à logística de rações industriais.
                                            </p>
                                        </div>
                                        <div className="p-4 rounded-xl border bg-card/50">
                                            <h4 className="text-sm font-bold flex items-center gap-2 mb-1">
                                                <Sprout className="w-4 h-4 text-green-500" /> Integração com SAF
                                            </h4>
                                            <p className="text-xs text-muted-foreground leading-relaxed">
                                                Possibilidade de incluir excedentes de milho e leguminosas produzidos na própria agrofloresta como ingredientes base.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center p-6 rounded-2xl bg-white/50 dark:bg-black/20 border border-green-500/10 text-center space-y-2">
                                        <div className="text-4xl font-black text-green-600">3.5t</div>
                                        <div className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">CO2 Evitado / Ano</div>
                                        <div className="text-[10px] text-green-700 dark:text-green-400 font-medium">Estimativa baseada em logística local vs industrial</div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="technical" className="mt-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <ClipboardList className="w-5 h-5 text-amber-600" />
                                        Protocolo de Fabricação
                                    </CardTitle>
                                    <CardDescription>Parâmetros para ração farelada de alto desempenho</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="p-3 rounded-xl border bg-card text-center">
                                            <div className="text-[10px] uppercase font-black text-muted-foreground">Granulometria</div>
                                            <div className="text-sm font-bold">0.5 - 1.2 mm</div>
                                        </div>
                                        <div className="p-3 rounded-xl border bg-card text-center">
                                            <div className="text-[10px] uppercase font-black text-muted-foreground">Proteína Alvo</div>
                                            <div className="text-sm font-bold">18% - 32% PB</div>
                                        </div>
                                        <div className="p-3 rounded-xl border bg-card text-center">
                                            <div className="text-[10px] uppercase font-black text-muted-foreground">Homogeneidade</div>
                                            <div className="text-sm font-bold">&gt; 95% CV</div>
                                        </div>
                                        <div className="p-3 rounded-xl border bg-card text-center">
                                            <div className="text-[10px] uppercase font-black text-muted-foreground">Umidade Máx.</div>
                                            <div className="text-sm font-bold">12%</div>
                                        </div>
                                    </div>

                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Fase de Preparo</TableHead>
                                                <TableHead>Procedimento</TableHead>
                                                <TableHead>Observação</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="font-medium text-xs">Moagem</TableCell>
                                                <TableCell className="text-xs">Trituração fina do milho/soja</TableCell>
                                                <TableCell className="text-xs">Evitar aquecimento excessivo</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-medium text-xs">Pesagem</TableCell>
                                                <TableCell className="text-xs">Inclusão rigorosa de núcleos</TableCell>
                                                <TableCell className="text-xs">Balança de precisão (gramas)</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-medium text-xs">Mistura</TableCell>
                                                <TableCell className="text-xs">15 minutos por lote (batch)</TableCell>
                                                <TableCell className="text-xs">Garantir dispersão de micronutrientes</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="infrastructure" className="mt-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Equipamentos e Área</CardTitle>
                                    <CardDescription>Infraestrutura mínima para 2.000kg/mês</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="flex items-start gap-3 p-4 border rounded-xl bg-card">
                                            <Settings className="w-5 h-5 text-amber-600 mt-1" />
                                            <div>
                                                <div className="text-sm font-bold">Processamento</div>
                                                <p className="text-[10px] text-muted-foreground">Moinho de martelo (5cv) + Misturador Vertical (500kg).</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 p-4 border rounded-xl bg-card">
                                            <Package className="w-5 h-5 text-amber-600 mt-1" />
                                            <div>
                                                <div className="text-sm font-bold">Armazenagem</div>
                                                <p className="text-[10px] text-muted-foreground">Silo para grãos e paletes para ração ensacada.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 p-4 border rounded-xl bg-card">
                                            <ShieldCheck className="w-5 h-5 text-amber-600 mt-1" />
                                            <div>
                                                <div className="text-sm font-bold">Biosseguridade</div>
                                                <p className="text-[10px] text-muted-foreground">Controle de roedores e umidade (higroscopia).</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    {/* Integrated Distribution */}
                    <Card className="bg-muted/30 border-dashed border-border/50">
                        <CardHeader className="pb-3 text-center">
                            <CardTitle className="text-sm font-black flex items-center justify-center gap-2">
                                <RefreshCcw className="w-4 h-4 text-blue-500" />
                                FLUXO DE CONSUMO INTERNO
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid sm:grid-cols-2 gap-4">
                            <Link href="/systems/fish" className="group block select-none">
                                <div className="p-4 rounded-[2rem] border bg-card hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all h-full flex items-center gap-3">
                                    <div className="p-2 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                                        <Fish className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-sm group-hover:text-blue-700 dark:group-hover:text-blue-300">Piscicultura</h4>
                                        <p className="text-[10px] text-muted-foreground">70% do Fluxo • Ração 32% PB</p>
                                    </div>
                                    <ArrowRight className="w-4 h-4 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-500" />
                                </div>
                            </Link>

                            <Link href="/systems/chicken" className="group block select-none">
                                <div className="p-4 rounded-[2rem] border bg-card hover:border-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all h-full flex items-center gap-3">
                                    <div className="p-2 rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300">
                                        <Bird className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-sm group-hover:text-amber-700 dark:group-hover:text-amber-300">Avicultura</h4>
                                        <p className="text-[10px] text-muted-foreground">30% do Fluxo • Ração 18% PB</p>
                                    </div>
                                    <ArrowRight className="w-4 h-4 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-amber-500" />
                                </div>
                            </Link>
                        </CardContent>
                    </Card>

                    <p className="text-[10px] text-center text-muted-foreground italic font-medium">
                        *O custo "Produção Própria" inclui R$ 0,20/kg referente a OPEX (Energia + Manutenção).
                    </p>

                </div>
            </div>
        </div>
    );
}
