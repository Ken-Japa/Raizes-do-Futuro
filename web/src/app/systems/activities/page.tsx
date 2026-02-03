"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Tent,
    GraduationCap,
    Home,
    Users,
    Trees,
    DollarSign,
    Calendar,
    MapPin,
    Heart,
    Star,
    ClipboardList,
    Hammer,
    Zap,
    Info,
    ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function ActivitiesPage() {
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
                    <div className="p-3 bg-indigo-900/10 rounded-xl">
                        <Zap className="w-8 h-8 text-indigo-900" />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">Atividades & Experiências</h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Integramos produção agrícola com serviços de valor agregado, gerando educação, turismo sustentável e resiliência financeira.
                </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <Tabs defaultValue="hosting" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
                            <TabsTrigger value="hosting">Hospedagem</TabsTrigger>
                            <TabsTrigger value="workshops">Workshops</TabsTrigger>
                            <TabsTrigger value="technical">Ficha Técnica</TabsTrigger>
                            <TabsTrigger value="impact">Impacto</TabsTrigger>
                        </TabsList>

                        <TabsContent value="hosting" className="mt-4 space-y-4">
                            <Card className="border-indigo-100 shadow-sm overflow-hidden">
                                <div className="h-48 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center border-b">
                                    <Home className="w-16 h-16 text-indigo-600/40" />
                                </div>
                                <CardHeader>
                                    <CardTitle className="text-2xl">Hospedagem Rural (Eco-Chalés)</CardTitle>
                                    <CardDescription>Experiência imersiva no ecossistema Raízes do Futuro</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-muted-foreground leading-relaxed">
                                        Nossa hospedagem não é apenas um quarto, é uma extensão da agrofloresta. Os chalés são construídos com técnicas de <strong>bioconstrução</strong> (taipa de pilão, bambu e tetos verdes), integrando conforto térmico natural e baixa pegada de carbono.
                                    </p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100 italic text-sm">
                                            "Os hóspedes colhem sua própria alimentação na agrofloresta e participam do manejo matinal com as aves."
                                        </div>
                                        <div className="p-4 rounded-xl bg-purple-50 border border-purple-100 italic text-sm text-right">
                                            "Retorno financeiro por metro quadrado construído 8x superior à agricultura tradicional."
                                        </div>
                                    </div>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Indicador</TableHead>
                                                <TableHead>Valor</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="font-medium">Diária Média</TableCell>
                                                <TableCell className="text-green-600 font-bold">{formatCurrency(350)}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-medium">Capacidade</TableCell>
                                                <TableCell>4 chalés (12 pessoas)</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-medium">Ocupação Alvo</TableCell>
                                                <TableCell>40% anual</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="workshops" className="mt-4 space-y-4">
                            <Card className="border-orange-100 shadow-sm overflow-hidden">
                                <div className="h-48 bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center border-b">
                                    <GraduationCap className="w-16 h-16 text-orange-600/40" />
                                </div>
                                <CardHeader>
                                    <CardTitle className="text-2xl">Workshops & Educação</CardTitle>
                                    <CardDescription>Transferência de tecnologia e imersão técnica</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-muted-foreground leading-relaxed">
                                        O projeto funciona como uma escola aberta. Oferecemos cursos intensivos de <strong>Agrofloresta Sintrópica</strong>, <strong>Bioconstrução</strong> e <strong>Sistemas Integrados de Produção</strong>.
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Card className="bg-orange-50/50 border-orange-100">
                                            <CardHeader className="py-3">
                                                <CardTitle className="text-sm font-bold text-orange-900">Curriculo Agrofloresta</CardTitle>
                                            </CardHeader>
                                            <CardContent className="text-xs space-y-1">
                                                <p>• Sucessão e Estratificação</p>
                                                <p>• Manejo de Podas e Biomassa</p>
                                                <p>• Logística de Colheita</p>
                                            </CardContent>
                                        </Card>
                                        <Card className="bg-amber-50/50 border-amber-100">
                                            <CardHeader className="py-3">
                                                <CardTitle className="text-sm font-bold text-amber-900">Curriculo Bio-SI</CardTitle>
                                            </CardHeader>
                                            <CardContent className="text-xs space-y-1">
                                                <p>• Aquaponia de Baixo Custo</p>
                                                <p>• Automação com Arduino/ESP</p>
                                                <p>• Produção de Ração Própria</p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Indicador</TableHead>
                                                <TableHead>Valor</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="font-medium">Ticket por Pessoa</TableCell>
                                                <TableCell className="text-green-600 font-bold">{formatCurrency(800)}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-medium">Frequência</TableCell>
                                                <TableCell>2 eventos / semestre</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="font-medium">Público Alvo</TableCell>
                                                <TableCell>Estudantes, Produtores e Entusiastas</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="technical" className="mt-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <ClipboardList className="w-5 h-5 text-indigo-700" />
                                        Ficha Técnica Operacional
                                    </CardTitle>
                                    <CardDescription>Parâmetros de infraestrutura bioconstruída</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-bold">Infraestrutura Hospedagem</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="p-4 rounded-xl bg-muted/50 border flex flex-col items-center text-center">
                                                <Hammer className="w-6 h-6 text-indigo-600 mb-2" />
                                                <span className="text-[10px] uppercase font-bold text-muted-foreground">Sistema</span>
                                                <span className="text-xs font-bold font-mono">Taipa de Pilão</span>
                                            </div>
                                            <div className="p-4 rounded-xl bg-muted/50 border flex flex-col items-center text-center">
                                                <Trees className="w-6 h-6 text-green-600 mb-2" />
                                                <span className="text-[10px] uppercase font-bold text-muted-foreground">Isolamento</span>
                                                <span className="text-xs font-bold font-mono">Teto Verde</span>
                                            </div>
                                            <div className="p-4 rounded-xl bg-muted/50 border flex flex-col items-center text-center">
                                                <Zap className="w-6 h-6 text-amber-600 mb-2" />
                                                <span className="text-[10px] uppercase font-bold text-muted-foreground">Energia</span>
                                                <span className="text-xs font-bold font-mono">Solar Off-grid</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="text-sm font-bold flex items-center gap-2">
                                            <Info className="w-4 h-4 text-indigo-600" /> Notas de Implementação
                                        </h4>
                                        <ul className="text-xs text-muted-foreground space-y-2 list-disc pl-4">
                                            <li>Os chalés devem estar localizados no <strong>Estrato de Borda</strong> do SAF, permitindo vista panorâmica sem remover árvores produtivas.</li>
                                            <li>O saneamento deve ser via <strong>Bacia de Evapotranspiração (BET)</strong>, tratando 100% das águas cinzas e negras no local.</li>
                                            <li>Workshops agendados preferencialmente em meses de <strong>poda intensa</strong> (Junho/Julho) para prover material prático.</li>
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="impact" className="mt-4">
                            <Card className="bg-indigo-900 text-white border-indigo-800">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Star className="w-5 h-5 text-amber-400" />
                                        Impacto Regenerativo & Financeiro
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <h4 className="text-indigo-200 text-sm font-bold">Social & Educativo</h4>
                                            <p className="text-sm opacity-80">
                                                Mais de 200 pessoas capacitadas por ano. Fomento à economia local através da compra de insumos de produtores vizinhos para a cozinha da hospedagem.
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="text-indigo-200 text-sm font-bold">Financeiro</h4>
                                            <p className="text-sm opacity-80">
                                                Responsável por transformar a receita sazonal da agricultura em um fluxo de caixa mensal previsível, permitindo reinvestimento contínuo.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Users className="w-5 h-5 text-indigo-300" />
                                            <span className="text-sm">Comunidade Global</span>
                                        </div>
                                        <Badge className="bg-indigo-500">Net Zero</Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Sidebar Summary */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm font-bold flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-green-600" />
                                Perfil de Receita (Estimado)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span>Hospedagem / Mês</span>
                                    <span className="font-bold">{formatCurrency(16800)}</span>
                                </div>
                                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-500 w-[70%]" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span>Workshops / Mês (Méd.)</span>
                                    <span className="font-bold">{formatCurrency(5333)}</span>
                                </div>
                                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-orange-500 w-[25%]" />
                                </div>
                            </div>
                            <div className="space-y-2 pt-4 border-t">
                                <div className="flex justify-between text-sm font-bold">
                                    <span>Total Serviços / Mês</span>
                                    <span className="text-indigo-700">{formatCurrency(22133)}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-indigo-50/50 border-indigo-100">
                        <CardHeader>
                            <CardTitle className="text-sm font-bold flex items-center gap-2">
                                <Heart className="w-4 h-4 text-red-500" />
                                Por que integrar?
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-xs text-muted-foreground space-y-3">
                            <p>
                                <strong>Resiliência:</strong> Quando a safra falha ou o preço da commodity cai, os serviços mantêm o projeto vivo.
                            </p>
                            <p>
                                <strong>Propósito:</strong> O Raízes do Futuro não é um segredo comercial, é um laboratório social para escalonamento da regeneração.
                            </p>
                            <div className="pt-2">
                                <Link href="/financials">
                                    <Button variant="link" className="p-0 h-auto text-indigo-700 font-bold text-xs">
                                        Ver Projeção Financeira Completa <ArrowRight className="w-3 h-3 ml-1" />
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
