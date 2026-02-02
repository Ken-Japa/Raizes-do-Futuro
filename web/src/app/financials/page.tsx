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
    CheckCircle2
} from "lucide-react";
import { useFinancialSimulator } from "@/hooks/use-financial-simulator";
import {
    CAPEX_DATA,
    INITIAL_ANIMALS,
    RECURRING_OPEX
} from "@/data/project-finances";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function FinancialsPage() {
    const { projections, indicators, settings, setSettings } = useFinancialSimulator();
    const [expandedSection, setExpandedSection] = useState<string | null>("capex");

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
                    <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm tracking-widest uppercase">
                        <PieChart className="w-4 h-4" />
                        Engenharia Econômica
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Simulador Financeiro</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl">
                        Projeções detalhadas e simulação de cenários para o Projeto Raízes do Futuro.
                    </p>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* SIDE BAR / CONTROLS (4 Columns) */}
                <aside className="lg:col-span-4 space-y-6">
                    <Card className="glass shadow-xl border-primary/10">
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-2">
                                <Settings2 className="w-5 h-5 text-primary" />
                                <CardTitle className="text-lg">Parâmetros de Simulação</CardTitle>
                            </div>
                            <CardDescription>Ajuste os valores para ver o impacto no ROI.</CardDescription>
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
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Capex Próprio:</span>
                                <span className="font-bold">{formatCurrency(indicators.totalCapex - (settings.isFinancingEnabled ? settings.financingAmount : 0))}</span>
                            </div>
                            {settings.isFinancingEnabled && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Parcela Estimada (Med):</span>
                                    <span className="font-bold text-red-500">
                                        {formatCurrency((settings.financingAmount / 10) * (1 + settings.interestRate))} / ano
                                    </span>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </aside>

                {/* MAIN CONTENT AREA (8 Columns) */}
                <main className="lg:col-span-8 space-y-8">

                    {/* Top Indicator Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                                <TrendingUp className="w-24 h-24" />
                            </div>
                            <CardHeader className="pb-2">
                                <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Retorno (ROI 10a)</span>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-baseline gap-2">
                                    <div className="text-4xl font-bold text-primary">{(indicators.roi10yCustom * 100).toFixed(1)}%</div>
                                    <div className="text-xs text-muted-foreground line-through">{(indicators.roi10yBase * 100).toFixed(1)}%</div>
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">No cenário de 10 anos considerando capital próprio alavancado.</p>
                            </CardContent>
                        </Card>

                        <Card className="relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                                <Banknote className="w-24 h-24" />
                            </div>
                            <CardHeader className="pb-2">
                                <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Payback Estimado</span>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-baseline gap-2">
                                    <div className="text-4xl font-bold">
                                        {indicators.paybackCustom.includes('>') ? indicators.paybackCustom : `Ano ${indicators.paybackCustom}`}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        Ref: {indicators.paybackBase.includes('>') ? indicators.paybackBase : `Ano ${indicators.paybackBase}`}
                                    </div>
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">Momento em que o caixa acumulado volta a ser positivo.</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Tabs defaultValue="projections" className="w-full">
                        <div className="flex items-center justify-between mb-4">
                            <TabsList className="bg-muted/50 p-1">
                                <TabsTrigger value="projections" className="text-xs">Fluxo Anual</TabsTrigger>
                                <TabsTrigger value="breakdown" className="text-xs">Detalhamento de Custos</TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="projections" className="mt-0 space-y-4">
                            <Card>
                                <CardHeader className="pb-0">
                                    <CardTitle className="text-base uppercase tracking-wider text-muted-foreground font-bold">Projeção de Caixa Acumulado (25 Anos)</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <div className="relative h-[350px] w-full flex items-center justify-between gap-[2px] px-2 py-10">
                                        {/* Zero Axis */}
                                        <div className="absolute left-0 right-0 h-[1px] bg-muted-foreground/30 z-0 top-1/2 -translate-y-1/2" />

                                        {/* Bars for ALL 25 years */}
                                        {projections.map((p) => {
                                            const maxRange = 30000000; // 30M scale
                                            const val = p.customCumulative;

                                            // Normalize height based on 150px (half of 300px)
                                            const heightPercent = (Math.abs(val) / maxRange) * 150;
                                            const height = Math.min(heightPercent, 150);

                                            // Coloring
                                            const isPositive = val >= 0;
                                            const color = isPositive
                                                ? (val > 10000000 ? "bg-emerald-500" : "bg-green-400")
                                                : (val < -1000000 ? "bg-red-500" : "bg-orange-400");

                                            return (
                                                <div key={p.year} className="flex-1 flex flex-col items-center group relative h-full">
                                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 z-10 w-full flex flex-col items-center">
                                                        <div
                                                            className={cn(
                                                                "w-full rounded-sm transition-all group-hover:opacity-80",
                                                                color,
                                                                isPositive ? "mb-auto" : "mt-auto order-last"
                                                            )}
                                                            style={{
                                                                height: `${height}px`,
                                                                transform: isPositive ? 'translateY(-100%)' : 'translateY(0%)'
                                                            }}
                                                        />
                                                    </div>

                                                    {/* Year Label */}
                                                    <span className="absolute bottom-0 text-[8px] text-muted-foreground opacity-50 font-mono">
                                                        {p.year}
                                                    </span>

                                                    {/* Tooltip */}
                                                    <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-background border p-2 rounded text-[10px] whitespace-nowrap z-50 shadow-lg pointer-events-none">
                                                        Ano {p.year}: <span className={isPositive ? "text-green-600" : "text-red-600"}>{formatCurrency(val)}</span>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="flex justify-center gap-6 mt-12">
                                        <div className="flex items-center gap-2 text-xs font-medium">
                                            <div className="w-3 h-3 bg-green-400 rounded" /> Positivo
                                        </div>
                                        <div className="flex items-center gap-2 text-xs font-medium">
                                            <div className="w-3 h-3 bg-red-400 rounded" /> Negativo
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Data Table */}
                            <div className="rounded-xl border overflow-hidden">
                                <div className="max-h-[600px] overflow-y-auto">
                                    <table className="w-full text-xs text-left">
                                        <thead className="bg-muted/50 uppercase tracking-tighter font-bold sticky top-0 z-10">
                                            <tr>
                                                <th className="p-4">Ano</th>
                                                <th className="p-4">Receita</th>
                                                <th className="p-4">Custo Opex</th>
                                                <th className="p-4">Parcela Fin.</th>
                                                <th className="p-4 text-right">Saldo Acumulado</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                            {projections.map((p) => (
                                                <tr key={p.year} className={cn(
                                                    "hover:bg-muted/30 transition-colors",
                                                    p.year.toString() === indicators.paybackCustom && "bg-primary/10 border-l-4 border-primary"
                                                )}>
                                                    <td className="p-4">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-bold">Ano {p.year}</span>
                                                            {p.year.toString() === indicators.paybackCustom && (
                                                                <span className="bg-primary text-white px-2 py-0.5 rounded text-[8px] font-bold">PAYBACK</span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="p-4 text-green-600 font-medium">{formatCurrency(p.baseRevenue)}</td>
                                                    <td className="p-4 text-red-400">{formatCurrency(p.customOpex)}</td>
                                                    <td className="p-4 text-orange-400">{formatCurrency(p.financingPayment)}</td>
                                                    <td className={cn(
                                                        "p-4 text-right font-mono font-bold",
                                                        p.customCumulative >= 0 ? "text-primary" : "text-red-500"
                                                    )}>
                                                        {formatCurrency(p.customCumulative)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="breakdown" className="mt-0">
                            <div className="space-y-4">

                                {/* Investimentos Section */}
                                <CollapsibleSection
                                    title="Investimento Inicial (CAPEX)"
                                    id="capex"
                                    activeSection={expandedSection}
                                    onToggle={setExpandedSection}
                                >
                                    <div className="space-y-2">
                                        <div className="grid grid-cols-12 gap-2 text-[10px] uppercase font-bold text-muted-foreground px-4 mb-2">
                                            <div className="col-span-8">Item</div>
                                            <div className="col-span-4 text-right">Valor</div>
                                        </div>
                                        {CAPEX_DATA.map(item => (
                                            <RowItem key={item.id} label={item.label} value={item.value} />
                                        ))}
                                        <div className="pt-2 mt-4 border-t px-4 flex justify-between font-bold text-primary">
                                            <span>Total Ben Duráveis</span>
                                            <span>{formatCurrency(indicators.totalCapex - 21000)}</span>
                                        </div>
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
                        </TabsContent>
                    </Tabs>

                </main>
            </div>
        </div>
    );
}

function CollapsibleSection({ title, id, activeSection, onToggle, children }: any) {
    const isOpen = activeSection === id;
    return (
        <div className="border rounded-xl overflow-hidden shadow-sm bg-background">
            <button
                onClick={() => onToggle(isOpen ? null : id)}
                className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
                <div className="flex items-center gap-2">
                    {isOpen ? <CheckCircle2 className="w-4 h-4 text-primary" /> : <div className="w-4 h-4 border rounded-full" />}
                    <span className="font-bold text-sm tracking-tight">{title}</span>
                </div>
                {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t"
                    >
                        <div className="p-4 bg-muted/20">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

function RowItem({ label, value }: { label: string; value: number }) {
    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

    return (
        <div className="grid grid-cols-12 gap-2 px-4 py-2 hover:bg-background/80 rounded-lg transition-colors group">
            <div className="col-span-8 text-sm text-neutral-600 group-hover:text-black transition-colors">{label}</div>
            <div className="col-span-4 text-right text-sm font-mono font-medium">{formatCurrency(value)}</div>
        </div>
    )
}
