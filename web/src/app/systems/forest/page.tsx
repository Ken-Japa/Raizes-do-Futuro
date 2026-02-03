"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Trees, Sprout, Clock, TrendingUp, Calendar, ArrowRight, Bird } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Moon, Sun, Info, Map, Layers, ClipboardList } from "lucide-react";

export default function ForestSystemPage() {
    const [year, setYear] = useState(1);
    const [area, setArea] = useState(5); // hectares

    // Simulation Data (Growth & Revenue Curve) - Based on Projeto Raízes do Futuro
    const getPhaseData = (y: number) => {
        if (y <= 1) return {
            phase: "Implantação & Placenta I",
            species: "Horta, Milho, Mandioca, Amendoim Forrageiro, Tagetes, Calêndula",
            revenue: area * 3500, // Annuals + medicinal flowers
            height: "0 - 1.5m",
            carbon: area * 5,
            details: "Foco em plantas rasteiras e herbáceas para cobertura de solo e fluxo de caixa imediato."
        };
        if (y <= 3) return {
            phase: "Placenta II & Secundárias I",
            species: "Banana, Mamão, Moringa, Aloe Vera, Café (jovem), Inga",
            revenue: area * 18000,
            height: "2 - 6m",
            carbon: area * 15,
            details: "Entrada das frutíferas de ciclo curto e super-alimentos (Moringa). Ocupação do estrato médio."
        };
        if (y <= 10) return {
            phase: "Secundárias II & Clímax (Jovem)",
            species: "Cacau, Abacate, Jabuticaba, Pitanga, Graviola, Guaraná, Cupuaçu, Café (pico)",
            revenue: area * 58000, // Processed product valorization (jams, pulps, oils)
            height: "8 - 15m",
            carbon: area * 65,
            details: "Consolidação de estratos. Início do processamento agroindustrial (agregação de valor de ~300%)."
        };
        return {
            phase: "Clímax & Economia da Madeira",
            species: "Mogno Africano, Ipê, Jurema-preta, Neem, Castanheiras",
            revenue: area * 145000, // Timber accumulation + perennial peak
            height: "25m+",
            carbon: area * 180,
            details: "Maturidade do sistema. Valorização massiva através da madeira nobre e serviços ecossistêmicos."
        };
    };

    const data = getPhaseData(year);

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
                    <div className="p-3 bg-green-700/10 rounded-xl">
                        <Trees className="w-8 h-8 text-green-700" />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">Agrofloresta Sucessional</h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Planejamento de longo prazo. Visualize a evolução dos estratos e a curva de receita de uma floresta produtiva.
                </p>

                {/* Planning Status Context */}
                <div className="mt-6 p-4 rounded-lg bg-green-50 border border-green-100 dark:bg-green-950/20 dark:border-green-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-green-700 mt-1" />
                        <div>
                            <h3 className="font-semibold text-green-900 dark:text-green-300">Status de Planejamento: Em Implantação (Ano 1)</h3>
                            <p className="text-sm text-green-800 dark:text-green-400">Preparação de solo e plantio do estrato de horta/placenta.</p>
                        </div>
                    </div>
                    <Link href="/planning">
                        <Button variant="outline" size="sm" className="border-green-200 hover:bg-green-100 text-green-800">
                            Ver Cronograma <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </div>
            </motion.div>

            <div className="space-y-8">

                {/* Timeline Control */}
                <Card className="border-green-700/20 bg-card/50">
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            <span>Linha do Tempo</span>
                            <span className="text-2xl font-bold text-green-700">Ano {year}</span>
                        </CardTitle>
                        <CardDescription>Arraste para ver a evolução do sistema</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Slider
                            value={[year]}
                            min={1} max={25} step={1}
                            onValueChange={(v) => setYear(v[0])}
                            className="py-6"
                        />

                        <div className="flex justify-between text-xs text-muted-foreground/50 uppercase font-bold tracking-widest mt-2 px-1">
                            <span>Início</span>
                            <span>Consolidação (5y)</span>
                            <span>Maturidade (10y)</span>
                            <span>Legado (25y)</span>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* System Status */}
                    <Card className="lg:col-span-1 h-full">
                        <CardHeader>
                            <CardTitle>Estado do Sistema</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <Label label="Fase Sucessional" />
                                <div className="text-lg font-bold text-green-800 dark:text-green-400">{data.phase}</div>
                            </div>
                            <div>
                                <Label label="Espécies Dominantes" />
                                <div className="text-md text-muted-foreground">{data.species}</div>
                            </div>
                            <div>
                                <Label label="Altura Média do Dossel" />
                                <div className="text-lg font-bold">{data.height}</div>
                            </div>
                            <div className="pt-4 border-t">
                                <Label label="Área Total (Hectares)" />
                                <div className="flex items-center gap-4 mt-2">
                                    <Slider value={[area]} min={1} max={50} step={1} onValueChange={(v) => setArea(v[0])} className="flex-1" />
                                    <span className="font-bold w-12 text-center">{area} ha</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Financial & Eco Projections */}
                    <div className="lg:col-span-2 space-y-6">
                        <Tabs defaultValue="financial" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="financial">Viabilidade</TabsTrigger>
                                <TabsTrigger value="ecological">Ecologia</TabsTrigger>
                                <TabsTrigger value="technical">Ficha Técnica</TabsTrigger>
                                <TabsTrigger value="infrastructure">Estrutura</TabsTrigger>
                            </TabsList>

                            <TabsContent value="financial">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Receita Bruta Estimada</CardTitle>
                                        <CardDescription>Produtos "In Natura" + Processados (Agregação de Valor)</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-5xl font-extrabold text-green-600 tracking-tight">{formatCurrency(data.revenue)}</span>
                                            <span className="text-muted-foreground">/ ano neste estágio</span>
                                        </div>

                                        <div className="p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground">
                                            <h4 className="font-bold mb-2 flex items-center gap-2">
                                                <TrendingUp className="w-4 h-4" />
                                                Estratégia de Receita:
                                            </h4>
                                            {year <= 2 ? (
                                                <p>Foco intenso em <strong>Hortaliças, Milho e Mandioca</strong>. O Amendoim Forrageiro e Tagetes garantem saúde do solo e comercialização de sementes/mudas.</p>
                                            ) : year <= 5 ? (
                                                <p>Entrada do <strong>Café, Banana e Mamão</strong>. A Moringa e Aloe Vera começam a ser processadas (pós/extratos), saltando a margem de lucro.</p>
                                            ) : year < 15 ? (
                                                <p>Pico produtivo de <strong>Cacau, Jabuticaba e Frutas Nobres</strong>. A agroindústria local (polpas e geléias) é o principal driver de valor.</p>
                                            ) : (
                                                <p>Reserva de valor em <strong>Madeira Nobre (Mogno/Ipê)</strong> paraYear 25. O sistema gera receita passiva via colheita seletiva e serviços ecossistêmicos.</p>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="ecological">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Impacto Regenerativo</CardTitle>
                                    </CardHeader>
                                    <CardContent className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label label="Carbono Sequestrado (Est.)" />
                                            <div className="text-3xl font-bold text-sky-600">{data.carbon.toFixed(0)} tCO2e</div>
                                            <p className="text-xs text-muted-foreground">Biomassa aérea e raízes acumuladas</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label label="Biodiversidade" />
                                            <div className="text-3xl font-bold text-amber-600">{Math.min(year * 8 + 15, 120)}+</div>
                                            <p className="text-xs text-muted-foreground">Espécies de flora e microfauna do solo</p>
                                        </div>

                                        <div className="md:col-span-2 pt-4 border-t mt-2">
                                            <h4 className="text-sm font-medium mb-3 flex items-center gap-2 text-muted-foreground">
                                                <Bird className="w-4 h-4 text-amber-600" /> Integração Animal
                                            </h4>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                <Link href="/systems/chicken">
                                                    <div className="p-3 rounded-lg border border-dashed hover:bg-muted/50 transition-colors cursor-pointer flex items-center gap-3">
                                                        <Bird className="w-4 h-4 text-amber-600" />
                                                        <div className="text-xs font-semibold">Galinhas Poedeiras</div>
                                                    </div>
                                                </Link>
                                                <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex items-center gap-3">
                                                    <TrendingUp className="w-4 h-4 text-blue-500" />
                                                    <div className="text-xs font-semibold">Suínos Duroc (Preparação)</div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="technical">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <ClipboardList className="w-5 h-5 text-green-700" />
                                            Ficha Técnica de Produção
                                        </CardTitle>
                                        <CardDescription>Parâmetros técnicos extraídos do Projeto Raízes do Futuro</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        {/* Spacing Table */}
                                        <div className="space-y-3">
                                            <h4 className="text-sm font-bold flex items-center gap-2">
                                                <Map className="w-4 h-4 text-green-600" /> Arranjo e Espaçamento
                                            </h4>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Classe / Espécie</TableHead>
                                                        <TableHead>Arranjo</TableHead>
                                                        <TableHead>Função</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell className="font-medium">Mogno Africano / Ipê</TableCell>
                                                        <TableCell>7m x 7m</TableCell>
                                                        <TableCell><Badge variant="outline">Emergente / Madeira</Badge></TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell className="font-medium">Estrato Médio (Cacau/Café)</TableCell>
                                                        <TableCell>4m entre linhas</TableCell>
                                                        <TableCell><Badge variant="outline">Produção Perene</Badge></TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell className="font-medium">Banana / Mamão</TableCell>
                                                        <TableCell>1.5m intercalado</TableCell>
                                                        <TableCell><Badge variant="outline">Biomassa / Placenta</Badge></TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </div>

                                        {/* Lunar Calendar */}
                                        <div className="p-4 rounded-xl bg-sky-500/5 border border-sky-500/10 space-y-3">
                                            <h4 className="text-sm font-bold flex items-center gap-2 text-sky-700 dark:text-sky-400">
                                                <Moon className="w-4 h-4" /> Manejo Lunar Estacionário
                                            </h4>
                                            <div className="grid md:grid-cols-2 gap-4 text-xs">
                                                <div className="space-y-1">
                                                    <span className="font-bold uppercase text-sky-800 dark:text-sky-300">Lua Minguante</span>
                                                    <p className="text-muted-foreground italic">"Limpeza e Madeira" - Seiva nas raízes. Ideal para podas de limpeza e corte de madeira (maior durabilidade).</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <span className="font-bold uppercase text-sky-800 dark:text-sky-300">Lua Crescente</span>
                                                    <p className="text-muted-foreground italic">"Crescimento e Stimulus" - Estímulo ao rebrote vigoroso e plantio de condimentos/folhosas.</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Productivity Subclasses */}
                                        <div className="space-y-3 pt-2">
                                            <h4 className="text-sm font-bold flex items-center gap-2">
                                                <Layers className="w-4 h-4 text-green-600" /> Subclasses de Produtividade
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                                {[
                                                    { label: "Subclasse 1", species: "Cacau / Abacate", yield: "Pico: Ano 8+" },
                                                    { label: "Subclasse 2", species: "Graviola / Guaraná", yield: "Pico: Ano 6-8" },
                                                    { label: "Subclasse 3", species: "Banana / Cupuaçu", yield: "Pico: Ano 2-4" }
                                                ].map((s, i) => (
                                                    <div key={i} className="p-3 rounded-lg border bg-card text-center">
                                                        <div className="text-[10px] uppercase font-bold text-muted-foreground mb-1">{s.label}</div>
                                                        <div className="text-sm font-bold">{s.species}</div>
                                                        <div className="text-[10px] text-green-600">{s.yield}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="infrastructure">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Investimento em Infraestrutura</CardTitle>
                                        <CardDescription>Estruturas necessárias para manutenção e escala</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="p-4 rounded-lg bg-muted/50 border">
                                                <div className="text-xs font-bold text-muted-foreground uppercase mb-1">Sementeira (Nursery)</div>
                                                <div className="text-xl font-bold">R$ 5.000,00</div>
                                                <p className="text-[10px] text-muted-foreground mt-1">Capacidade: 3.500 mudas. Estrutura de madeira e sombrite.</p>
                                            </div>
                                            <div className="p-4 rounded-lg bg-muted/50 border">
                                                <div className="text-xs font-bold text-muted-foreground uppercase mb-1">Casa de Ferramentas</div>
                                                <div className="text-xl font-bold">R$ 5.000,00</div>
                                                <p className="text-[10px] text-muted-foreground mt-1">Armazenamento seguro e manutenção de maquinário.</p>
                                            </div>
                                            <div className="p-4 rounded-lg bg-muted/50 border">
                                                <div className="text-xs font-bold text-muted-foreground uppercase mb-1">Casa de Sementes</div>
                                                <div className="text-xl font-bold">R$ 3.000,00</div>
                                                <p className="text-[10px] text-muted-foreground mt-1">Ambiente seco para preservação de genética crioula.</p>
                                            </div>
                                        </div>
                                        <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/10 text-xs text-green-800 dark:text-green-400">
                                            <strong>Dica:</strong> A produção própria de mudas reduz o custo de implantação em até 60% comparado à compra externa.
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>

                </div>
            </div>
        </div>
    );
}

function Label({ label }: { label: string }) {
    return <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">{label}</h4>;
}
