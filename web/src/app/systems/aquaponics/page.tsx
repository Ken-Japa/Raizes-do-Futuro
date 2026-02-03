"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Droplets, Sprout, RefreshCcw, Leaf, Calendar, ArrowRight, Wind, Thermometer, ClipboardList, Target } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default function AquaponicsSystemPage() {
    // Aquaponics State
    const [fishBiomass, setFishBiomass] = useState(2000); // kg of fish
    const [feedRate, setFeedRate] = useState(1.5); // % body weight per day

    // Nitrogen Calculation (Simplified)
    // 1kg feed -> ~0.03kg Total Ammonia Nitrogen (TAN) potentially
    // Plants need X amount of Nitrate.
    // Rule of thumb: 1kg fish supports ~0.5-1 sq meter of grow bed depending on crop

    const dailyFeed = fishBiomass * (feedRate / 100);
    const growBedArea = fishBiomass * 0.8; // conservative estimate m2
    const lettuceHeadsPerMonth = growBedArea * 4; // 4 heads per m2 per month (intensive)
    const revenuePerHead = 3.50; // Organic lettuce price
    const monthlyRevenue = lettuceHeadsPerMonth * revenuePerHead;

    const waterSavings = 90; // % compared to soil farming

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
                    <div className="p-3 bg-cyan-500/10 rounded-xl">
                        <Droplets className="w-8 h-8 text-cyan-500" />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">Aquaponia Integrada</h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Transformando "resíduo" em lucro. A água rica em nutrientes dos peixes fertiliza a horta sem custo químico.
                </p>

                {/* Planning Status Context */}
                <div className="mt-6 p-4 rounded-lg bg-cyan-50 border border-cyan-100 dark:bg-cyan-950/20 dark:border-cyan-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-cyan-500 mt-1" />
                        <div>
                            <h3 className="font-semibold text-cyan-900 dark:text-cyan-300">Status de Planejamento: Fase 3 (Cíclico)</h3>
                            <p className="text-sm text-cyan-700 dark:text-cyan-400">Integração dos efluentes da piscicultura com a produção de hortaliças.</p>
                        </div>
                    </div>
                    <Link href="/planning">
                        <Button variant="outline" size="sm" className="border-cyan-200 hover:bg-cyan-100 text-cyan-700">
                            Ver Cronograma <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </div>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">

                {/* Controls */}
                <Card className="lg:col-span-1 border-cyan-500/20 bg-card/50">
                    <CardHeader>
                        <CardTitle>Balanço de Nutrientes</CardTitle>
                        <CardDescription>Sincronize a carga animal com vegetal</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">

                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <label className="text-sm font-medium">Biomassa de Peixes (Kg)</label>
                                <span className="text-sm font-bold text-blue-500">{fishBiomass} kg</span>
                            </div>
                            <Slider
                                value={[fishBiomass]}
                                min={500} max={10000} step={500}
                                onValueChange={(v) => setFishBiomass(v[0])}
                                className="py-2"
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <label className="text-sm font-medium">Taxa de Alimentação (%)</label>
                                <span className="text-sm font-bold text-amber-500">{feedRate}% dia</span>
                            </div>
                            <Slider
                                value={[feedRate]}
                                min={0.5} max={3.0} step={0.1}
                                onValueChange={(v) => setFeedRate(v[0])}
                            />
                            <p className="text-xs text-muted-foreground">
                                Ração Diária: <span className="font-bold">{dailyFeed.toFixed(1)} kg</span> (Fonte de Nitrogênio)
                            </p>
                        </div>

                        <div className="p-4 rounded-[2rem] bg-cyan-500/5 border border-cyan-500/10 text-sm">
                            <div className="flex items-start gap-3">
                                <RefreshCcw className="w-5 h-5 text-cyan-500 mt-1" />
                                <div>
                                    <span className="font-black block mb-1">Ciclo de Nitrogênio</span>
                                    <p className="text-muted-foreground text-xs leading-relaxed">
                                        A amônia dos peixes é convertida em nitrato por bactérias no filtro biológico, servindo de adubo "premium" para as plantas. Água limpa volta aos peixes.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </CardContent>
                </Card>

                {/* Output & Tabs */}
                <div className="lg:col-span-2 space-y-6">
                    <Tabs defaultValue="viability" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="viability">Viabilidade</TabsTrigger>
                            <TabsTrigger value="ecology">Ecologia</TabsTrigger>
                            <TabsTrigger value="technical">Ficha Técnica</TabsTrigger>
                            <TabsTrigger value="infrastructure">Estrutura</TabsTrigger>
                        </TabsList>

                        <TabsContent value="viability" className="mt-4 space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium text-muted-foreground">Área Cultivável Estimada</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-3xl font-bold text-green-600 dark:text-green-400">{growBedArea.toFixed(0)}</span>
                                            <span className="text-sm font-medium text-muted-foreground">m² de Canteiros</span>
                                        </div>
                                        <p className="text-xs opacity-70 mt-1">Baseado na carga de nitratos disponível</p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium text-muted-foreground">Economia de Água</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-3xl font-bold text-cyan-500">{waterSavings}%</span>
                                            <span className="text-sm font-medium text-muted-foreground">vs Solo</span>
                                        </div>
                                        <p className="text-xs opacity-70 mt-1">Recirculação contínua e fechada</p>
                                    </CardContent>
                                </Card>
                            </div>

                            <Card className="bg-green-500/5 border-green-500/20">
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        <Leaf className="w-5 h-5 text-green-600" />
                                        <CardTitle className="text-green-700 dark:text-green-400">Potencial Produtivo (Hortaliças)</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div>
                                            <h4 className="text-sm font-medium mb-1 text-muted-foreground">Produção Mensal</h4>
                                            <div className="text-2xl font-bold">{lettuceHeadsPerMonth.toFixed(0)} <span className="text-sm font-normal text-muted-foreground font-light tracking-tight">unidades/mês</span></div>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium mb-1 text-muted-foreground">Receita Bruta Adicional</h4>
                                            <div className="text-2xl font-bold text-green-600">{formatCurrency(monthlyRevenue)} <span className="text-sm font-normal text-muted-foreground font-light tracking-tight">estimada</span></div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="technical" className="mt-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Ficha Técnica: Sistema Dual</CardTitle>
                                    <CardDescription>Parâmetros críticos para manutenção do equilíbrio biológico</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="p-4 rounded-xl border bg-card text-center">
                                            <div className="text-[10px] uppercase font-black text-muted-foreground mb-1">Taxa de Renovação</div>
                                            <div className="text-sm font-bold">2.0x / hora</div>
                                            <div className="text-[10px] text-muted-foreground mt-1 text-center">Volume total filtrado</div>
                                        </div>
                                        <div className="p-4 rounded-xl border bg-card text-center">
                                            <div className="text-[10px] uppercase font-black text-muted-foreground mb-1">Amônia (NH3)</div>
                                            <div className="text-sm font-bold">&lt; 0.5 ppm</div>
                                            <div className="text-[10px] text-muted-foreground mt-1">Nível de toxicidade</div>
                                        </div>
                                        <div className="p-4 rounded-xl border bg-card text-center">
                                            <div className="text-[10px] uppercase font-black text-muted-foreground mb-1">pH Alvo</div>
                                            <div className="text-sm font-bold">6.8 - 7.2</div>
                                            <div className="text-[10px] text-muted-foreground mt-1 italic tracking-tight underline border-none shadow-none">Compromisso Peixe/Planta</div>
                                        </div>
                                        <div className="p-4 rounded-xl border bg-card text-center">
                                            <div className="text-[10px] uppercase font-black text-muted-foreground mb-1">DO (Oxigênio)</div>
                                            <div className="text-sm font-bold">&gt; 6.0 mg/L</div>
                                            <div className="text-[10px] text-muted-foreground mt-1">Saturação necessária</div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <h4 className="text-sm font-black flex items-center gap-2">Protocolos de Manejo</h4>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Atividade</TableHead>
                                                    <TableHead>Frequência</TableHead>
                                                    <TableHead>Instrumento</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell className="font-medium text-xs">Teste de Nitrito/Nitrato</TableCell>
                                                    <TableCell className="text-xs">Semanal</TableCell>
                                                    <TableCell className="text-xs">Kit Colorimétrico</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-medium text-xs">Limpeza do Decantador</TableCell>
                                                    <TableCell className="text-xs">Quinzenal</TableCell>
                                                    <TableCell className="text-xs">Descarga de Fundo</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-medium text-xs">Poda de Raízes (NFT)</TableCell>
                                                    <TableCell className="text-xs">Colheita</TableCell>
                                                    <TableCell className="text-xs">Inspeção Manual</TableCell>
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
                                    <CardTitle>Infraestrutura e Componentes</CardTitle>
                                    <CardDescription>Ativos físicos do sistema de integração</CardDescription>
                                </CardHeader>
                                <CardContent className="grid md:grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl border bg-card space-y-2">
                                        <h4 className="font-bold text-sm flex items-center gap-2">
                                            <Droplets className="w-4 h-4 text-cyan-500" /> Módulo de Filtração
                                        </h4>
                                        <ul className="text-xs text-muted-foreground space-y-1 ml-6 list-disc">
                                            <li>Decantador de Sólidos (Cônico)</li>
                                            <li>Filtro Biológico de Mídias Móveis (MBBR)</li>
                                            <li>Mineralizador de Lodo Aeróbico</li>
                                        </ul>
                                    </div>
                                    <div className="p-4 rounded-xl border bg-card space-y-2">
                                        <h4 className="font-bold text-sm flex items-center gap-2">
                                            <Sprout className="w-4 h-4 text-green-500" /> Módulo Vegetal
                                        </h4>
                                        <ul className="text-xs text-muted-foreground space-y-1 ml-6 list-disc">
                                            <li>Bancadas NFT (Nutrient Film Technique)</li>
                                            <li>Camas de Cultivo (Mídia de Argila Expandida)</li>
                                            <li>Sifão Automático (Drenagem e Inundação)</li>
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    <div className="p-6 rounded-[2.5rem] bg-muted/20 border border-dashed text-xs text-center text-muted-foreground opacity-60">
                        *O sucesso da aquaponia reside no equilíbrio entre as três comunidades biológicas: os peixes (gera amônia), as bactérias (converte amônia) e as plantas (consome o nitrato).
                    </div>
                </div>
            </div>
        </div >
    );
}
