import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, MapPin, Ruler, Droplets, Mountain } from "lucide-react";
import Link from "next/link";

export default function LandPage() {
    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-20 px-4">
            {/* Header */}
            <header className="space-y-6 py-10">
                <Link href="/">
                    <Button variant="ghost" className="rounded-full mb-8 hover:bg-primary/5 text-muted-foreground">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
                    </Button>
                </Link>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-border pb-8">
                    <div className="space-y-2">
                        <span className="uppercase tracking-widest text-sm font-semibold text-secondary">A Fundação</span>
                        <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground">
                            O Terreno
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl">
                            O alicerce físico e simbólico do projeto. A escolha estratégica para regeneração e produção.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 bg-secondary/10 px-4 py-2 rounded-full text-secondary font-medium">
                        <MapPin className="w-5 h-5" /> Sul da Bahia
                    </div>
                </div>
            </header>

            {/* Main Grid */}
            <div className="grid lg:grid-cols-3 gap-12">
                {/* Left Column: Details */}
                <div className="lg:col-span-1 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Ruler className="w-5 h-5 text-primary" /> Dimensões
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm text-muted-foreground uppercase font-bold">Área Total</p>
                                <p className="text-2xl font-bold text-foreground">120 - 140 ha</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground uppercase font-bold">Investimento Estimado</p>
                                <p className="text-2xl font-bold text-foreground">R$ 400.000</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Droplets className="w-5 h-5 text-blue-500" /> Hidrologia
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Presença de fonte permanente de água limpa (nascente, riacho ou poço) é um <strong>critério inegociável</strong>.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Mountain className="w-5 h-5 text-green-700" /> Topografia
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Predominantemente plana ou levemente ondulada para facilitar manejo e tanques escavados.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Narrative & Map Placeholder */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="prose prose-stone dark:prose-invert max-w-none">
                        <p className="text-lg">
                            A região sul da Bahia foi escolhida por reunir atributos estratégicos: terras acessíveis, clima quente e úmido ideal para agrofloresta e aquicultura, e proximidade de polos turísticos.
                        </p>

                        <h3>Distribuição de Uso da Terra</h3>
                        <div className="not-prose mt-6 mb-12">
                            <div className="w-full bg-muted rounded-full h-8 overflow-hidden flex">
                                <div className="bg-green-700 h-full flex items-center justify-center text-xs text-white font-bold" style={{ width: '40%' }}>Agrofloresta (40%)</div>
                                <div className="bg-yellow-600 h-full flex items-center justify-center text-xs text-white font-bold" style={{ width: '20%' }}>Insumos (20%)</div>
                                <div className="bg-green-900 h-full flex items-center justify-center text-xs text-white font-bold" style={{ width: '20%' }}>Reserva (20%)</div>
                                <div className="bg-blue-600 h-full flex items-center justify-center text-xs text-white font-bold" style={{ width: '5%' }}>Água</div>
                                <div className="bg-gray-400 h-full flex items-center justify-center text-xs text-white font-bold" style={{ width: '15%' }}>Outros</div>
                            </div>
                            <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1"><div className="w-3 h-3 bg-green-700 rounded-full" /> Agrofloresta (50 ha)</span>
                                <span className="flex items-center gap-1"><div className="w-3 h-3 bg-yellow-600 rounded-full" /> Cultivo Insumos (23 ha)</span>
                                <span className="flex items-center gap-1"><div className="w-3 h-3 bg-green-900 rounded-full" /> Reserva Legal (20%)</span>
                            </div>
                        </div>
                    </div>

                    {/* Map Placeholder */}
                    <div className="relative aspect-video bg-muted rounded-2xl border border-border overflow-hidden flex items-center justify-center group">
                        <div className="absolute inset-0 bg-[url('/map-placeholder.png')] bg-cover opacity-50 group-hover:scale-105 transition-transform duration-700" />
                        <div className="relative z-10 bg-background/80 backdrop-blur-md p-6 rounded-xl border border-border text-center">
                            <MapPin className="w-8 h-8 text-destructive mx-auto mb-2" />
                            <h3 className="font-bold text-lg">Região Alvo: Sul da Bahia</h3>
                            <p className="text-sm text-muted-foreground">Raio de 2 horas de cidades médias</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
