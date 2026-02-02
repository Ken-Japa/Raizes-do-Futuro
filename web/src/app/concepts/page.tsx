"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sprout, RefreshCw, Layers, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ConceptsPage() {
    return (
        <div className="space-y-12 p-8 max-w-7xl mx-auto">

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-3xl mx-auto space-y-4"
            >
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                    <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                    Os Pilares do Projeto
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    Entenda as tecnologias e filosofias que tornam o Raízes do Futuro um modelo regenerativo e lucrativo.
                </p>
            </motion.div>

            {/* Main Pillars Grid */}
            <div className="grid md:grid-cols-3 gap-8">

                {/* Syntropy */}
                <ConceptCard
                    title="Sintropia"
                    subtitle="Agricultura de Processos"
                    icon={Sprout}
                    color="text-green-600"
                    delay={0.1}
                    content="Diferente da agricultura convencional que luta contra a natureza (entropia), a Agricultura Sintrópica acelera os processos naturais de sucessão ecológica. Plantamos florestas que produzem comida. O foco não é apenas o produto, mas a melhoria constante do solo e do ecossistema."
                />

                {/* Bioflocs */}
                <ConceptCard
                    title="Bioflocos (BFT)"
                    subtitle="Biotecnologia Aquática"
                    icon={Layers}
                    color="text-blue-500"
                    delay={0.2}
                    content="Sistema super-intensivo de criação de peixes onde bactérias benéficas reciclam os resíduos (fezes/amônia) em proteína microbial. Isso permite criar até 80x mais peixes por m³ que tanques convencionais, com troca quase zero de água e maior biossegurança."
                />

                {/* Circular Economy */}
                <ConceptCard
                    title="Economia Circular"
                    subtitle="Nada se Perde"
                    icon={RefreshCw}
                    color="text-amber-500"
                    delay={0.3}
                    content="Nenhum resíduo sai da fazenda. A água rica em nutrientes dos peixes irriga a horta (Aquaponia). As sobras da horta alimentam as galinhas. O esterco das galinhas aduba a floresta. A madeira da floresta vira cogumelo ou energia. Fechamos todos os ciclos."
                />
            </div>

            {/* Deep Dive Section */}
            <div className="space-y-8">
                <div className="border-t pt-8">
                    <h2 className="text-2xl font-bold mb-6">Aprofundamento Técnico</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <DeepDiveCard
                            title="Sucessão Ecológica"
                            desc="Como planejamos o plantio para ter colheitas aos 3 meses (hortaliças), 6 meses (mandioca/melancia), 2 anos (frutas) até 30 anos (madeira nobre)."
                        />
                        <DeepDiveCard
                            title="Estratos Florestais"
                            desc="O uso inteligente da luz. Plantas de 'emergente', 'alto', 'médio' e 'baixo' convivem no mesmo espaço, multiplicando a produtividade por área."
                        />
                        <DeepDiveCard
                            title="Relação C:N (Carbono/Nitrogênio)"
                            desc="O segredo da compostagem e do Bioflocos. Equilibrar a 'energia' (Carbono) com a 'proteína' (Nitrogênio) para alimentar os microorganismos trabalhadores."
                        />
                        <DeepDiveCard
                            title="Bem-estar Animal"
                            desc="Nossos animais expressam comportamentos naturais. Galinhas ciscam no pasto, porcos fuçam na terra. Isso resulta em produtos de qualidade superior e menos doenças."
                        />
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="flex justify-center pt-8">
                <Link href="/dashboard">
                    <Button size="lg" className="gap-2">
                        Voltar para o Dashboard <ArrowRight className="w-4 h-4" />
                    </Button>
                </Link>
            </div>

        </div>
    );
}

function ConceptCard({ title, subtitle, icon: Icon, color, content, delay }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
        >
            <Card className="h-full hover:shadow-lg transition-shadow border-t-4 data-[color=green]:border-t-green-600" style={{ borderTopColor: color === 'text-green-600' ? '#16a34a' : color === 'text-blue-500' ? '#3b82f6' : '#f59e0b' }}>
                <CardHeader>
                    <div className={`p-3 rounded-xl bg-accent/50 w-fit mb-4 ${color}`}>
                        <Icon className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-2xl">{title}</CardTitle>
                    <CardDescription className="text-base font-medium">{subtitle}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                        {content}
                    </p>
                </CardContent>
            </Card>
        </motion.div>
    )
}

function DeepDiveCard({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="p-6 rounded-lg border bg-card hover:bg-accent/30 transition-colors">
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                {title}
            </h3>
            <p className="text-muted-foreground">
                {desc}
            </p>
        </div>
    )
}
