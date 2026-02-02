import { Button } from "@/components/ui/button";
import { ArrowLeft, Recycle, Zap, Users, Home } from "lucide-react";
import Link from "next/link";

export default function SustainabilityPage() {
    return (
        <div className="max-w-5xl mx-auto space-y-12 pb-20 px-4">
            <header className="space-y-6 py-10 text-center">
                <Link href="/">
                    <Button variant="ghost" className="rounded-full mb-8 hover:bg-primary/5 text-muted-foreground">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
                    </Button>
                </Link>
                <div className="space-y-4">
                    <span className="uppercase tracking-widest text-sm font-semibold text-green-600">Vida Rural</span>
                    <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground">
                        Sustentabilidade & Ciclos
                    </h1>
                </div>
            </header>

            <div className="grid md:grid-cols-2 gap-8">

                {/* Card 1: Cestas */}
                <div className="group rounded-2xl border border-border/50 bg-card p-8 transition-all hover:shadow-lg hover:border-primary/20">
                    <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center mb-6 text-2xl">
                        🥬
                    </div>
                    <h3 className="font-heading text-2xl font-bold mb-3">Cestas Agroecológicas</h3>
                    <p className="text-muted-foreground mb-4">
                        Comercialização direta de alimentos frescos (CSA), fortalecendo a economia local e garantindo soberania alimentar.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground/80 list-disc list-inside">
                        <li>Assinatura Mensal</li>
                        <li>Produtos da Estação</li>
                        <li>Conexão Produtor-Consumidor</li>
                    </ul>
                </div>

                {/* Card 2: Energia */}
                <div className="group rounded-2xl border border-border/50 bg-card p-8 transition-all hover:shadow-lg hover:border-yellow-500/20">
                    <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 flex items-center justify-center mb-6">
                        <Zap className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold mb-3">Energia Renovável</h3>
                    <p className="text-muted-foreground mb-4">
                        Autonomia energética através de sistemas híbridos, reduzindo custos e impacto ambiental.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground/80 list-disc list-inside">
                        <li>Solar Fotovoltaica</li>
                        <li>Biodigestores (Biogás)</li>
                        <li>Energia Hidráulica (Micro)</li>
                    </ul>
                </div>

                {/* Card 3: Bioconstrução */}
                <div className="group rounded-2xl border border-border/50 bg-card p-8 transition-all hover:shadow-lg hover:border-orange-500/20">
                    <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 flex items-center justify-center mb-6">
                        <Home className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold mb-3">Bioconstrução</h3>
                    <p className="text-muted-foreground mb-4">
                        Edificações vivas, utilizando materiais locais (terra, bambu, madeira) e técnicas vernaculares.
                    </p>
                </div>

                {/* Card 4: Comunidade */}
                <div className="group rounded-2xl border border-border/50 bg-card p-8 transition-all hover:shadow-lg hover:border-blue-500/20">
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center mb-6">
                        <Users className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold mb-3">Comunidade Local</h3>
                    <p className="text-muted-foreground mb-4">
                        Integração com vizinhos, troca de saberes e criação de redes de apoio mútuo. A sustentabilidade é social.
                    </p>
                </div>

            </div>

            <div className="bg-primary/5 rounded-3xl p-12 text-center space-y-6">
                <h2 className="font-heading text-3xl font-bold text-primary">Economia Circular na Prática</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    "Nada se perde." Os resíduos dos animais alimentam os biodigestores e a compostagem. O biofertilizante nutre a lavoura. A lavoura alimenta os animais. O ciclo se fecha.
                </p>
                <Recycle className="w-16 h-16 text-primary mx-auto animate-spin-slow opacity-50" />
            </div>
        </div>
    );
}
