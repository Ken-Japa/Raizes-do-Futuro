"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import {
    DollarSign,
    TrendingUp,
    PieChart,
    Settings2,
    ChevronDown,
    ChevronUp,
    Info,
    Banknote,
    AlertCircle,
    CheckCircle2,
    Fish,
    Egg,
    Factory,
    ShoppingBasket,
    Trees,
    Home,
    BookOpen,
    Maximize2,
    Minimize2,
    Plus,
    Minus,
    Thermometer,
    Droplets,
    Wind,
    Zap,
    Clock,
    Target,
    Boxes,
    ClipboardList,
    LayoutGrid,
    ArrowRight,
    Search
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useFinancialSimulator } from "@/hooks/use-financial-simulator";
import {
    CAPEX_DATA,
    INITIAL_ANIMALS,
    RECURRING_OPEX
} from "@/data/project-finances";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
    ResponsiveContainer,
    BarChart,
    XAxis,
    YAxis,
    Tooltip,
    Bar,
    Cell
} from "recharts";

export default function FinancialsPage() {
    const { projections, indicators, activityDetails, settings, setSettings } = useFinancialSimulator();
    const [expandedSection, setExpandedSection] = useState<string | null>("capex");
    const [chartZoom, setChartZoom] = useState(false);

    const displayData = useMemo(() => {
        return projections.slice(0, chartZoom ? 12 : 25).map(p => ({
            year: p.year,
            accumulatedCustom: p.customCumulative,
            accumulatedBase: p.baselineCumulative
        }));
    }, [projections, chartZoom]);

    const capexTotal = indicators.totalCapex;

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

    return (
        <div className="min-h-screen bg-transparent p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-end justify-between gap-6"
            >
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 text-primary font-bold text-[10px] tracking-[0.2em] uppercase">
                        <PieChart className="w-4 h-4" />
                        Engenharia Econômica
                    </div>
                    <h1 className="text-5xl md:text-6xl font-serif font-black tracking-tight text-foreground">
                        Simulador <span className="text-primary/80">Financeiro</span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl font-medium leading-relaxed">
                        Projeções detalhadas e simulação de cenários para o Projeto Raízes do Futuro.
                    </p>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* SIDE BAR / CONTROLS (4 Columns) */}
                <aside className="lg:col-span-4 space-y-6">
                    <Card className="bg-white/70 shadow-premium border-premium backdrop-blur-sm">
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-2">
                                <Settings2 className="w-5 h-5 text-primary" />
                                <CardTitle className="text-xl font-serif font-bold text-foreground">Parâmetros de Simulação</CardTitle>
                            </div>
                            <CardDescription className="text-muted-foreground font-medium">Ajuste os valores para ver o impacto no ROI.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">

                            {/* Financing Toggle */}
                            <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/10">
                                <div className="space-y-0.5">
                                    <label className="text-sm font-bold flex items-center gap-2">
                                        <Banknote className="w-4 h-4 text-primary" />
                                        Ativar Financiamento
                                    </label>
                                    <p className="text-[10px] text-muted-foreground">Utilizar crédito subsidiado (PRONAF)</p>
                                </div>
                                <button
                                    onClick={() => setSettings({ ...settings, isFinancingEnabled: !settings.isFinancingEnabled })}
                                    className={cn(
                                        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none",
                                        settings.isFinancingEnabled ? "bg-primary" : "bg-muted"
                                    )}
                                >
                                    <span className={cn(
                                        "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                                        settings.isFinancingEnabled ? "translate-x-6" : "translate-x-1"
                                    )} />
                                </button>
                            </div>

                            <div className={cn("space-y-8 transition-opacity duration-300", !settings.isFinancingEnabled && "opacity-40 pointer-events-none")}>
                                {/* Financing Slider */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <label className="text-sm font-medium">Financiamento (R$)</label>
                                        <span className="text-primary font-bold">{formatCurrency(settings.financingAmount)}</span>
                                    </div>
                                    <Slider
                                        value={[settings.financingAmount]}
                                        onValueChange={([val]) => setSettings({ ...settings, financingAmount: val })}
                                        max={1200000}
                                        step={10000}
                                    />
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                                        <Info className="w-3 h-3" /> Sugestão: Baseado em PRONAF
                                    </p>
                                </div>

                                {/* Interest Rate Slider */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <label className="text-sm font-medium">Juros Anuais (%)</label>
                                        <span className="text-primary font-bold">{(settings.interestRate * 100).toFixed(1)}%</span>
                                    </div>
                                    <Slider
                                        value={[settings.interestRate * 100]}
                                        onValueChange={([val]) => setSettings({ ...settings, interestRate: val / 100 })}
                                        max={15}
                                        step={0.5}
                                    />
                                </div>
                            </div>

                            {/* Opex Buffer Slider */}
                            <div className="space-y-4 border-t pt-6">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-medium">Margem de Erro (Opex)</label>
                                    <span className="text-amber-600 font-bold">+{(settings.opexBuffer * 100).toFixed(0)}%</span>
                                </div>
                                <Slider
                                    value={[settings.opexBuffer * 100]}
                                    onValueChange={([val]) => setSettings({ ...settings, opexBuffer: val / 100 })}
                                    max={50}
                                    step={5}
                                />
                            </div>

                            {/* Reset to Default */}
                            <button
                                onClick={() => setSettings({ isFinancingEnabled: true, financingAmount: 850000, interestRate: 0.03, financingPeriod: 10, opexBuffer: 0 })}
                                className="w-full py-2 text-xs font-semibold text-muted-foreground border border-dashed rounded-lg hover:border-primary hover:text-primary transition-colors"
                            >
                                Resetar para Valores do Projeto
                            </button>
                        </CardContent>
                    </Card>

                    <Card className="bg-primary/5 border-primary/20">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Status do Cenário</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <RowItem
                                label="Capex Próprio"
                                value={indicators.totalCapex - (settings.isFinancingEnabled ? settings.financingAmount : 0)}
                            />
                            {settings.isFinancingEnabled && (
                                <RowItem
                                    label="Parcela Estimada (Med)"
                                    value={`${formatCurrency((settings.financingAmount / 10) * (1 + settings.interestRate))} / ano`}
                                />
                            )}
                        </CardContent>
                    </Card>
                </aside>

                {/* MAIN CONTENT AREA (8 Columns) */}
                <main className="lg:col-span-8 space-y-8">

                    {/* Top Indicator Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="relative overflow-hidden group shadow-premium border-premium bg-card">
                            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:scale-110 transition-transform text-foreground group-hover:opacity-5">
                                <TrendingUp className="w-32 h-32" />
                            </div>
                            <CardHeader className="pb-2">
                                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/70">Retorno (ROI 10a)</span>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-baseline gap-2">
                                    <div className="text-5xl font-serif font-black text-primary">{(indicators.roi10yCustom * 100).toFixed(1)}%</div>
                                    <div className="text-sm text-muted-foreground/40 font-medium line-through">{(indicators.roi10yBase * 100).toFixed(1)}%</div>
                                </div>
                                <p className="text-xs text-muted-foreground font-medium mt-3 leading-relaxed">No cenário de 10 anos considerando capital próprio alavancado.</p>
                            </CardContent>
                        </Card>

                        <Card className="relative overflow-hidden group shadow-premium border-premium bg-card">
                            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:scale-110 transition-transform text-foreground group-hover:opacity-5">
                                <Banknote className="w-32 h-32" />
                            </div>
                            <CardHeader className="pb-2">
                                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/70">Payback Estimado</span>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-baseline gap-2">
                                    <div className="text-5xl font-serif font-black text-foreground">
                                        {indicators.paybackCustom.includes('>') ? indicators.paybackCustom : `Ano ${indicators.paybackCustom}`}
                                    </div>
                                    <div className="text-sm text-muted-foreground/40 font-medium">
                                        Ref: {indicators.paybackBase.includes('>') ? indicators.paybackBase : `Ano ${indicators.paybackBase}`}
                                    </div>
                                </div>
                                <p className="text-xs text-muted-foreground font-medium mt-3 leading-relaxed">Momento em que o caixa acumulado volta a ser positivo.</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Tabs defaultValue="projections" className="w-full">
                        <div className="flex items-center justify-between mb-6">
                            <TabsList className="bg-slate-100/80 p-1.5 border border-slate-200/60 shadow-inner rounded-xl">
                                <TabsTrigger value="projections" className="text-[11px] uppercase tracking-wider font-bold px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all rounded-lg">
                                    <TrendingUp className="w-3.5 h-3.5 mr-2" /> Fluxo Anual
                                </TabsTrigger>
                                <TabsTrigger value="breakdown" className="text-[11px] uppercase tracking-wider font-bold px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all rounded-lg">
                                    <DollarSign className="w-3.5 h-3.5 mr-2" /> Resumo de Custos
                                </TabsTrigger>
                                <TabsTrigger value="activities" className="text-[11px] uppercase tracking-wider font-bold px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all rounded-lg">
                                    <LayoutGrid className="w-3.5 h-3.5 mr-2" /> Atividades
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="projections" className="mt-0 space-y-6">
                            <Card className="bg-white/70 shadow-premium border-premium backdrop-blur-sm overflow-hidden">
                                <CardHeader className="pb-6 border-b border-border/50 flex flex-row items-center justify-between space-y-0 bg-muted/20">
                                    <div>
                                        <CardTitle className="text-xl font-serif font-black text-foreground tracking-tight">Evolução de Saldo Acumulado</CardTitle>
                                        <CardDescription className="text-muted-foreground font-medium">Projeção considerando investimentos iniciais e reinvestimentos de lucro.</CardDescription>
                                    </div>
                                    <div className="flex items-center gap-2 bg-slate-200/50 p-1.5 rounded-xl border border-slate-300/30 shadow-inner">
                                        <button
                                            onClick={() => setChartZoom(false)}
                                            className={cn(
                                                "px-4 py-2 text-[10px] font-bold rounded-lg transition-all uppercase tracking-wider",
                                                !chartZoom ? "bg-white shadow-sm text-primary border border-slate-200" : "text-slate-400 hover:text-slate-600"
                                            )}
                                        >
                                            Total (25a)
                                        </button>
                                        <button
                                            onClick={() => setChartZoom(true)}
                                            className={cn(
                                                "px-4 py-2 text-[10px] font-bold rounded-lg transition-all uppercase tracking-wider",
                                                chartZoom ? "bg-white shadow-sm text-primary border border-slate-200" : "text-slate-400 hover:text-slate-600"
                                            )}
                                        >
                                            Foco (12a)
                                        </button>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-8">
                                    <div className="h-[450px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={displayData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                                <XAxis
                                                    dataKey="year"
                                                    stroke="#94a3b8"
                                                    fontSize={10}
                                                    tickLine={false}
                                                    axisLine={false}
                                                    tickFormatter={(val: number) => `Ano ${val}`}
                                                />
                                                <YAxis
                                                    stroke="#94a3b8"
                                                    fontSize={10}
                                                    tickLine={false}
                                                    axisLine={false}
                                                    tickFormatter={(val: number) => `R$ ${val / 1000000}M`}
                                                />
                                                <Tooltip
                                                    content={({ active, payload }: { active?: boolean; payload?: readonly any[] }) => {
                                                        if (active && payload && payload.length) {
                                                            const data = payload[0].payload;
                                                            const isProfit = data.accumulatedCustom >= 0;
                                                            return (
                                                                <div className="bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-slate-200/60 min-w-[220px] animate-in fade-in zoom-in duration-200">
                                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 border-b pb-2">Projeção: Ano {data.year}</p>
                                                                    <div className="space-y-3">
                                                                        <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg">
                                                                            <span className="text-[10px] font-bold text-slate-500 uppercase">Cenário Ref.</span>
                                                                            <span className="text-xs font-bold text-slate-400">{formatCurrency(data.baselineCumulative)}</span>
                                                                        </div>
                                                                        <div className={cn(
                                                                            "flex justify-between items-center p-2 rounded-lg border",
                                                                            isProfit ? "bg-primary/5 border-primary/20" : "bg-rose-50 border-rose-100"
                                                                        )}>
                                                                            <span className={cn("text-[10px] font-bold uppercase", isProfit ? "text-primary" : "text-rose-600")}>Cenário Atual</span>
                                                                            <span className={cn("text-sm font-black", isProfit ? "text-primary" : "text-rose-600")}>
                                                                                {formatCurrency(data.accumulatedCustom)}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                        return null;
                                                    }}
                                                />
                                                <Bar dataKey="accumulatedBase" fill="#e2e8f0" radius={[4, 4, 0, 0]} opacity={0.5} />
                                                <Bar dataKey="accumulatedCustom" radius={[4, 4, 0, 0]}>
                                                    {displayData.map((entry, index) => (
                                                        <Cell
                                                            key={`cell-${index}`}
                                                            fill={entry.accumulatedCustom >= 0 ? "#113c2d" : "#e11d48"}
                                                            fillOpacity={entry.accumulatedCustom >= 0 ? (entry.accumulatedCustom > 5000000 ? 1 : 0.8) : 0.9}
                                                        />
                                                    ))}
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="flex justify-center gap-8 mt-4 pt-4 border-t border-slate-100">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-primary border border-primary/20 shadow-sm" />
                                            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Cenário (ROI Alavancado)</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-slate-300 border border-slate-400/20 shadow-sm" />
                                            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Base (Referência)</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="breakdown" className="mt-0">
                            <Card className="bg-card/70 shadow-premium border-premium backdrop-blur-sm overflow-hidden">
                                <CardHeader className="pb-6 border-b border-border/50 bg-muted/20">
                                    <CardTitle className="text-xl font-serif font-black text-foreground tracking-tight">Detalhamento Financeiro</CardTitle>
                                    <CardDescription className="text-muted-foreground font-medium">Divisão analítica de Capex, Opex e Projeções de Receita.</CardDescription>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="divide-y divide-slate-100">
                                        <CollapsibleSection
                                            title="Investimento Inicial (Capex)"
                                            id="capex"
                                            activeSection={expandedSection}
                                            onToggle={setExpandedSection}
                                            icon={<DollarSign className="w-5 h-5" />}
                                        >
                                            <div className="divide-y divide-slate-50 bg-slate-900/[0.01]">
                                                <RowItem label="Total Capex" value={capexTotal} />
                                                <RowItem label="Estruturas e Tanques" value={capexTotal * 0.45} />
                                                <RowItem label="Sistemas e Automação" value={capexTotal * 0.25} />
                                                <RowItem label="Equipamentos Gerais" value={capexTotal * 0.3} />
                                            </div>
                                        </CollapsibleSection>

                                        {/* Insumos & Animais Section */}
                                        <CollapsibleSection
                                            title="Plantel Inicial & Insumos"
                                            id="animals"
                                            activeSection={expandedSection}
                                            onToggle={setExpandedSection}
                                        >
                                            <div className="space-y-2">
                                                {INITIAL_ANIMALS.map(item => (
                                                    <RowItem key={item.id} label={item.label} value={item.value} />
                                                ))}
                                            </div>
                                        </CollapsibleSection>

                                        {/* Gastos Recorrentes Section */}
                                        <CollapsibleSection
                                            title="Despesas Operacionais (Anuais)"
                                            id="opex"
                                            activeSection={expandedSection}
                                            onToggle={setExpandedSection}
                                        >
                                            <div className="space-y-2">
                                                {RECURRING_OPEX.map(item => (
                                                    <RowItem key={item.id} label={item.label} value={item.yearlyValue} />
                                                ))}
                                                <div className="bg-amber-500/10 p-4 rounded-lg flex items-start gap-3 mt-4">
                                                    <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5" />
                                                    <div className="space-y-1">
                                                        <p className="text-xs font-bold text-amber-900">Nota sobre Autodependência</p>
                                                        <p className="text-[10px] text-amber-800 leading-relaxed">
                                                            A partir do 4º ano, espera-se redução de até 50% no custo com alimentação devido à autossuficiência do SAF.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </CollapsibleSection>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="activities" className="mt-0">
                            <div className="space-y-4">
                                <div className="bg-secondary/10 border border-secondary/20 p-6 rounded-2xl mb-6">
                                    <h3 className="text-lg font-bold text-foreground flex items-center gap-2 mb-2">
                                        <Boxes className="w-5 h-5 text-secondary" />
                                        Detalhamento por Atividade
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        Explore as especificações técnicas, fases de implantação e custos específicos de cada micro-sistema integrado do Projeto Raízes do Futuro.
                                    </p>
                                </div>

                                {/* Activity Details Section moved here */}
                                {Object.values(activityDetails).map(activity => {
                                    const Icon =
                                        activity.id === 'tilapia' ? Fish :
                                            activity.id === 'chickens' ? Egg :
                                                activity.id === 'feed_factory' ? Factory :
                                                    activity.id === 'baskets' ? ShoppingBasket :
                                                        activity.id === 'agroforestry' ? Trees :
                                                            activity.id === 'rural_hosting' ? Home :
                                                                activity.id === 'workshops' ? BookOpen :
                                                                    Fish;
                                    return (
                                        <CollapsibleSection
                                            key={activity.id}
                                            title={`Sistema: ${activity.label}`}
                                            id={activity.id}
                                            activeSection={expandedSection}
                                            onToggle={setExpandedSection}
                                            icon={<Icon className="w-4 h-4 text-primary" />}
                                        >
                                            <div className="space-y-6">
                                                <div className="px-4 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50 py-3 rounded-lg border border-slate-100">
                                                    <p className="text-sm text-slate-700 italic flex-1">
                                                        {activity.description}
                                                    </p>
                                                    <Link href={`/systems/${activity.id === 'chickens' ? 'chicken' : activity.id === 'tilapia' ? 'fish' : activity.id === 'feed_factory' ? 'feed' : activity.id === 'baskets' ? 'aquaponics' : activity.id === 'agroforestry' ? 'forest' : activity.id}`}>
                                                        <Button variant="outline" size="sm" className="bg-white border-primary/20 hover:bg-primary/5 text-primary font-black text-[10px] h-8 px-4 uppercase tracking-widest whitespace-nowrap">
                                                            Página do Sistema <ArrowRight className="w-3 h-3 ml-2" />
                                                        </Button>
                                                    </Link>
                                                </div>

                                                <Tabs defaultValue="finance" className="w-full">
                                                    <TabsList className="mx-4 bg-slate-100/80 p-1 mb-4 border border-slate-200/60 shadow-inner rounded-xl">
                                                        <TabsTrigger value="finance" className="text-[10px] uppercase font-bold py-1.5 px-4 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all rounded-lg">
                                                            <DollarSign className="w-3.5 h-3.5 mr-1.5" /> Financeiro
                                                        </TabsTrigger>
                                                        {activity.technicalSpecs && (
                                                            <TabsTrigger value="technical" className="text-[10px] uppercase font-bold py-1.5 px-4 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all rounded-lg">
                                                                <Settings2 className="w-3.5 h-3.5 mr-1.5" /> Técnico
                                                            </TabsTrigger>
                                                        )}
                                                        {activity.operatingPhases && (
                                                            <TabsTrigger value="phases" className="text-[10px] uppercase font-bold py-1.5 px-4 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all rounded-lg">
                                                                <Clock className="w-3.5 h-3.5 mr-1.5" /> Cronograma
                                                            </TabsTrigger>
                                                        )}
                                                    </TabsList>

                                                    <TabsContent value="finance" className="space-y-6 mt-0">
                                                        <div className="space-y-2">
                                                            <h4 className="text-[10px] uppercase font-black text-primary px-4 tracking-widest">Construção & Estruturas</h4>
                                                            {activity.capex.construction.map((item, idx) => (
                                                                <RowItem key={idx} label={item.label} value={item.value} />
                                                            ))}
                                                        </div>

                                                        <div className="space-y-2">
                                                            <h4 className="text-[10px] uppercase font-black text-primary px-4 tracking-widest">Equipamentos & Sistemas</h4>
                                                            {activity.capex.equipment.map((item, idx) => (
                                                                <RowItem key={idx} label={item.label} value={item.value} />
                                                            ))}
                                                        </div>

                                                        <div className="space-y-2">
                                                            <h4 className="text-[10px] uppercase font-black text-primary px-4 tracking-widest">Mão de Obra de Implantação</h4>
                                                            <RowItem label="Profissionais & Ajudantes" value={activity.capex.labor} />
                                                        </div>

                                                        <div className="pt-2 mt-4 border-t px-4 flex justify-between font-black text-slate-900 bg-slate-50 py-3 rounded-b-xl border-x border-b">
                                                            <span>Investimento Total {activity.label}</span>
                                                            <span className="text-primary">{formatCurrency(
                                                                activity.capex.construction.reduce((s, i) => s + i.value, 0) +
                                                                activity.capex.equipment.reduce((s, i) => s + i.value, 0) +
                                                                activity.capex.labor
                                                            )}</span>
                                                        </div>

                                                        <div className="space-y-2 pt-4 mt-2 border-t-2 border-dashed border-amber-200">
                                                            <h4 className="text-[10px] uppercase font-black text-amber-700 px-4 tracking-widest">Manutenção Anual Estimada</h4>
                                                            {activity.opex.maintenance.map((item, idx) => (
                                                                <RowItem key={idx} label={item.label} value={item.value} />
                                                            ))}
                                                        </div>
                                                    </TabsContent>

                                                    {activity.technicalSpecs && (
                                                        <TabsContent value="technical" className="space-y-4 mt-0 px-4 pb-4">
                                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                                {activity.technicalSpecs.map((spec, idx) => {
                                                                    const SpecIcon =
                                                                        spec.label.toLowerCase().includes("temp") ? Thermometer :
                                                                            spec.label.toLowerCase().includes("oxig") ? Wind :
                                                                                spec.label.toLowerCase().includes("ph") ? Droplets :
                                                                                    (spec.label.toLowerCase().includes("am") || spec.label.toLowerCase().includes("nh3")) ? AlertCircle :
                                                                                        spec.label.toLowerCase().includes("vaz") ? Zap :
                                                                                            Target;

                                                                    return (
                                                                        <div key={idx} className="bg-white/50 border border-slate-200 shadow-sm rounded-xl p-3 flex flex-col items-center text-center gap-2 group hover:border-primary/40 transition-all hover:shadow-md">
                                                                            <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary border border-primary/10">
                                                                                <SpecIcon className="w-4 h-4" />
                                                                            </div>
                                                                            <div>
                                                                                <p className="text-[9px] uppercase font-bold text-slate-400 tracking-widest mb-1">{spec.label}</p>
                                                                                <p className="text-sm font-black text-slate-900">{spec.value} <span className="text-[9px] font-bold text-slate-500">{spec.unit}</span></p>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </TabsContent>
                                                    )}

                                                    {activity.operatingPhases && (
                                                        <TabsContent value="phases" className="space-y-4 mt-0 px-4 pb-4">
                                                            <div className="relative space-y-4 before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-200">
                                                                {activity.operatingPhases.map((phase, idx) => (
                                                                    <div key={idx} className="relative pl-10 group">
                                                                        <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center z-10 group-hover:border-primary/50 transition-all shadow-premium">
                                                                            <span className="text-[10px] font-bold text-slate-400 group-hover:text-primary">{idx + 1}</span>
                                                                        </div>
                                                                        <div className="bg-white shadow-premium border-premium rounded-xl p-5 group-hover:translate-x-1 transition-all">
                                                                            <div className="flex justify-between items-start mb-2">
                                                                                <h5 className="text-sm font-bold text-slate-900">{phase.label}</h5>
                                                                                <span className="text-[9px] font-bold tracking-widest uppercase px-3 py-1 bg-primary/5 text-primary rounded-full border border-primary/10">{phase.duration}</span>
                                                                            </div>
                                                                            <p className="text-xs text-slate-500 leading-relaxed font-medium">{phase.description}</p>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </TabsContent>
                                                    )}
                                                </Tabs>
                                            </div>
                                        </CollapsibleSection>
                                    );
                                })}
                            </div>
                        </TabsContent>
                    </Tabs>

                </main>
            </div>
        </div>
    );
}

function CollapsibleSection({ title, icon, children, id, activeSection, onToggle, defaultOpen }: {
    title: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    id: string;
    activeSection: string | null;
    onToggle: (id: string | null) => void;
    defaultOpen?: boolean;
}) {
    const isOpen = activeSection === id || (activeSection === null && defaultOpen);

    return (
        <div className="border-b border-slate-100 last:border-0">
            <button
                onClick={() => onToggle(isOpen ? "" : id)}
                className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-all text-left group"
            >
                <div className="flex items-center gap-3">
                    <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                        isOpen ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                    )}>
                        {icon || <ChevronDown className="w-5 h-5" />}
                    </div>
                    <div>
                        <h4 className="font-serif font-bold text-foreground text-base">{title}</h4>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-0.5">Clique para expandir</p>
                    </div>
                </div>
                <div className={cn("transition-transform duration-300", isOpen && "rotate-180")}>
                    <ChevronDown className={cn("w-5 h-5", isOpen ? "text-primary" : "text-slate-300")} />
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="pb-6">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function RowItem({ label, value }: { label: string; value: number | string }) {
    const formatCurrencyLocal = (val: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

    return (
        <div className="flex justify-between items-center py-3 px-5 hover:bg-muted/30 transition-colors border-b border-border/40 last:border-0 group odd:bg-foreground/[0.02]">
            <span className="text-[10.5px] font-semibold text-muted-foreground uppercase tracking-[0.12em]">{label}</span>
            <span className="font-sans font-bold text-foreground text-[14px]">
                {typeof value === 'number' ? formatCurrencyLocal(value) : value}
            </span>
        </div>
    );
}
