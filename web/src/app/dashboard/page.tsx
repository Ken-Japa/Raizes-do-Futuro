"use client";

import { motion } from "framer-motion";
import {
    Activity,
    TrendingUp,
    DollarSign,
    Droplets,
    Trees,
    Bird,
    Fish,
    Leaf,
    AlertCircle,
    ArrowRight,
    Sprout,
    CalendarClock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
    // Mock aggregated data (would come from state/context in a real app)
    const stats = {
        monthlyRevenue: 42500, // Fish + Eggs + Forest
        monthlyCost: 18200,    // Feed + Labor + Energy
        netProfit: 24300,
        sustainabilityScore: 92, // 0-100
        activeSystems: 5,
    };

    const systems = [
        { name: "Piscicultura", status: "Planejado", trend: "Fase 2", icon: Fish, color: "text-blue-500", link: "/systems/fish" },
        { name: "Fábrica de Ração", status: "Planejado", trend: "Fase 1", icon: Sprout, color: "text-amber-500", link: "/systems/feed" },
        { name: "Agrofloresta", status: "Em Implantação", trend: "Ano 1", icon: Trees, color: "text-green-600", link: "/systems/forest" },
        { name: "Avicultura", status: "Planejado", trend: "Fase 3", icon: Bird, color: "text-amber-600", link: "/systems/chicken" },
        { name: "Aquaponia", status: "Conceito", trend: "Futuro", icon: Droplets, color: "text-cyan-500", link: "/systems/aquaponics" },
    ];

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

    return (
        <div className="space-y-8 p-8 max-w-7xl mx-auto">

            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h1 className="text-3xl font-bold tracking-tight">Visão Geral do Planejamento</h1>
                    <p className="text-muted-foreground">Bem-vindo ao centro de comando do Projeto Raízes do Futuro (Simulação de Cenário).</p>
                </motion.div>

                <Link href="/financials">
                    <Button variant="outline" className="gap-2">
                        Ver Relatório Financeiro <ArrowRight className="w-4 h-4" />
                    </Button>
                </Link>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <KPICard
                    title="Receita Mensal Projetada"
                    value={formatCurrency(stats.monthlyRevenue)}
                    icon={DollarSign}
                    trend="+5.2% vs mês anterior"
                    trendColor="text-green-500"
                    delay={0.1}
                />
                <KPICard
                    title="Lucro Líquido Projetado"
                    value={formatCurrency(stats.netProfit)}
                    icon={TrendingUp}
                    trend="Margem: 57%"
                    trendColor="text-blue-500"
                    delay={0.2}
                />
                <KPICard
                    title="Score Sustentabilidade"
                    value={stats.sustainabilityScore.toString()}
                    icon={Leaf}
                    trend="Excelência Regenerativa"
                    trendColor="text-green-600"
                    delay={0.3}
                />
                <KPICard
                    title="Sistemas Integrados"
                    value={stats.activeSystems.toString()}
                    icon={Activity}
                    trend="Meta do Projeto"
                    trendColor="text-blue-500"
                    delay={0.4}
                />
            </div>

            {/* Systems Grid */}
            <div className="grid lg:grid-cols-3 gap-8">

                {/* Active Systems List */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Planejamento de Sistemas</CardTitle>
                        <CardDescription>Status das unidades produtivas no Masterplan</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            {systems.map((sys, idx) => (
                                <Link key={idx} href={sys.link}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * idx }}
                                        className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`p-2 rounded-full bg-background border ${sys.color}`}>
                                                <sys.icon className={`w-5 h-5 ${sys.color}`} />
                                            </div>
                                            <div>
                                                <p className="font-medium group-hover:text-primary transition-colors">{sys.name}</p>
                                                <p className="text-xs text-muted-foreground">Status: <span className="text-green-600 font-medium">{sys.status}</span></p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold">{sys.trend}</p>
                                            <p className="text-xs text-muted-foreground">Cronograma</p>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Alerts / Notifications */}
                <Card className="lg:col-span-1 border-amber-200 bg-amber-50/50 dark:bg-amber-950/10">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-amber-800 dark:text-amber-500">
                            <AlertCircle className="w-5 h-5" />
                            Alertas Operacionais
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <AlertItem
                            title="Encomenda de Alevinos"
                            desc="Necessário confirmar lote para o Ciclo 2 até sexta-feira."
                            urgent
                        />
                        <AlertItem
                            title="Manutenção Preventiva"
                            desc="Verificar bombas do sistema de Aquaponia (Bomba 2)."
                        />
                        <AlertItem
                            title="Colheita Prevista"
                            desc="Lote de alface (bancada 4) pronto em 3 dias."
                        />
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}

function KPICard({ title, value, icon: Icon, trend, trendColor, delay }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.3 }}
        >
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{value}</div>
                    <p className={`text-xs ${trendColor} font-medium mt-1`}>{trend}</p>
                </CardContent>
            </Card>
        </motion.div>
    )
}

function AlertItem({ title, desc, urgent }: { title: string, desc: string, urgent?: boolean }) {
    return (
        <div className="flex gap-3 items-start p-3 rounded-md bg-white dark:bg-card border shadow-sm">
            <div className={`w-2 h-2 mt-2 rounded-full ${urgent ? 'bg-red-500 animate-pulse' : 'bg-amber-400'}`} />
            <div>
                <p className="text-sm font-medium text-foreground">{title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </div>
        </div>
    )
}
