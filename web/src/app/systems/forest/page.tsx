"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Trees, Sprout, Clock, TrendingUp, Calendar, ArrowRight, Bird } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ForestSystemPage() {
    const [year, setYear] = useState(1);
    const [area, setArea] = useState(5); // hectares

    // Simulation Data (Growth & Revenue Curve)
    const getPhaseData = (y: number) => {
        if (y <= 1) return {
            phase: "Implantação & Placenta I",
            species: "Horta, Feijão-Guandu, Milho, Mandioca",
            revenue: area * 2000, // Short cycle revenue
            height: "0 - 1m",
            carbon: area * 2
        };
        if (y <= 3) return {
            phase: "Placenta II & Secundárias I",
            species: "Banana, Mamão, Café (jovem), Ingá",
            revenue: area * 15000,
            height: "2 - 4m",
            carbon: area * 10
        };
        if (y <= 10) return {
            phase: "Secundárias II & Clímax (Jovem)",
            species: "Café (pico), Cacau, Jussara, Frutíferas Nativas",
            revenue: area * 45000,
            height: "5 - 12m",
            carbon: area * 50
        };
        return {
            phase: "Clímax & Extração Madeireira",
            species: "Mogno Africano, Cedro, Castanheiras",
            revenue: area * 120000, // Wood value kick-in
            height: "20m+",
            carbon: area * 150
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
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="financial">Viabilidade Econômica</TabsTrigger>
                                <TabsTrigger value="ecological">Serviços Ambientais</TabsTrigger>
                            </TabsList>

                            <TabsContent value="financial">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Receita Bruta Estimada</CardTitle>
                                        <CardDescription>Produtos "In Natura" + Processados</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-5xl font-extrabold text-green-600 tracking-tight">{formatCurrency(data.revenue)}</span>
                                            <span className="text-muted-foreground">/ ano neste estágio</span>
                                        </div>

                                        <div className="p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground">
                                            <h4 className="font-bold mb-2 flex items-center gap-2">
                                                <TrendingUp className="w-4 h-4" />
                                                Drivers de Receita:
                                            </h4>
                                            {year <= 2 ? (
                                                <p>Foco intenso em <strong>Hortaliças e Tubérculos</strong> para fluxo de caixa rápido enquanto as árvores crescem. Alta mão de obra.</p>
                                            ) : year <= 5 ? (
                                                <p>Entrada do <strong>Café e Frutas de ciclo curto</strong> (Banana/Mamão). O "Bosque" começa a fechar, reduzindo capina.</p>
                                            ) : year < 15 ? (
                                                <p>Pico produtivo de <strong>Cacau, Açaí/Jussara e Frutas Nobres</strong>. Sistema estável e resiliente.</p>
                                            ) : (
                                                <p>Colheita seletiva de <strong>Madeira Nobre (Mogno/Cedro)</strong>. O maior valor agregado do projeto.</p>
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
                                            <p className="text-xs text-muted-foreground">Biomassa aérea e raízes</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label label="Biodiversidade" />
                                            <div className="text-3xl font-bold text-amber-600">{Math.min(year * 5 + 10, 80)}+</div>
                                            <p className="text-xs text-muted-foreground">Espécies interagindo</p>
                                        </div>

                                        <div className="md:col-span-2 pt-4 border-t mt-2">
                                            <h4 className="text-sm font-medium mb-3 flex items-center gap-2 text-muted-foreground">
                                                <Bird className="w-4 h-4 text-amber-600" /> Integração Animal
                                            </h4>
                                            <Link href="/systems/chicken">
                                                <div className="p-3 rounded-lg border border-dashed hover:bg-muted/50 transition-colors cursor-pointer flex items-center gap-3">
                                                    <div className="p-2 bg-amber-100 dark:bg-amber-900 rounded-full text-amber-600 dark:text-amber-400">
                                                        <Bird className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-sm">Avicultura Integrada</div>
                                                        <p className="text-xs text-muted-foreground">Galinhas controlam insetos e adubam as linhas de plantio.</p>
                                                    </div>
                                                    <ArrowRight className="w-4 h-4 ml-auto opacity-50" />
                                                </div>
                                            </Link>
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
