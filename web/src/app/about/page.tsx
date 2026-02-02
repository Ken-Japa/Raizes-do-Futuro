import { Button } from "@/components/ui/button";
import { Leaf, Heart, Globe, ArrowRight, ArrowLeft, Sprout } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-12 pb-20">
            {/* Header */}
            <header className="space-y-6 text-center py-10 md:py-16">
                <Link href="/">
                    <Button variant="ghost" className="rounded-full mb-8 hover:bg-primary/5 text-muted-foreground">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Voltar ao Início
                    </Button>
                </Link>
                <div className="space-y-4">
                    <span className="uppercase tracking-widest text-sm font-semibold text-primary">Manifesto</span>
                    <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary">
                        Importância Pessoal &<br />Ecologia Profunda
                    </h1>
                </div>
            </header>

            {/* Main Content */}
            <article className="prose prose-lg prose-stone dark:prose-invert mx-auto">
                <p className="lead text-xl md:text-2xl leading-relaxed text-muted-foreground font-light">
                    O projeto “Raízes do Futuro” nasce não apenas como um empreendimento agrícola, mas como a concretização de um propósito profundo: viver de forma coerente com meus valores e transformar a minha relação com o mundo natural.
                </p>

                <div className="my-12 p-8 bg-muted/30 rounded-2xl border border-border/50 not-prose">
                    <h3 className="font-heading text-2xl font-bold mb-4 flex items-center gap-2">
                        <Heart className="text-secondary w-6 h-6" />
                        Um Salto de Consciência
                    </h3>
                    <p className="text-muted-foreground">
                        Migrar do urbano acelerado para o campo não é apenas uma decisão prática, mas uma escolha espiritual e ética. Busca-se um modo de viver onde o tempo é ritmado pelos ciclos e integração com a natureza.
                    </p>
                </div>

                <h2 className="font-heading text-3xl font-bold text-primary mt-12">A Ética da Ecologia Profunda</h2>
                <p>
                    Este projeto está fundamentado na ética da <strong>Ecologia Profunda</strong>, proposta por Arne Naess. Essa visão propõe uma mudança radical: não mais nos vemos como dominadores da natureza, mas como coabitantes conscientes de um sistema interdependente.
                </p>
                <p>
                    Incorporar essa ética significa ir além da mitigação de impactos. Trata-se de <strong>regenerar</strong>: restaurar matas ciliares, revitalizar solos, cultivar biodiversidade e promover o bem-estar de todos os seres envolvidos.
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-12 not-prose">
                    <div className="p-6 bg-primary/5 rounded-xl border border-primary/10">
                        <Sprout className="w-8 h-8 text-primary mb-4" />
                        <h4 className="font-bold text-lg mb-2">Regeneração</h4>
                        <p className="text-sm text-muted-foreground">Restaurar o que foi degradado, devolvendo saúde ao solo e às águas.</p>
                    </div>
                    <div className="p-6 bg-secondary/5 rounded-xl border border-secondary/10">
                        <Globe className="w-8 h-8 text-secondary mb-4" />
                        <h4 className="font-bold text-lg mb-2">Interdependência</h4>
                        <p className="text-sm text-muted-foreground">Reconhecer que cada ação afeta a teia da vida como um todo.</p>
                    </div>
                </div>

                <h2 className="font-heading text-3xl font-bold text-primary">Valores Orientadores</h2>
                <ul className="space-y-2">
                    <li><strong>Respeito à biodiversidade</strong> e regeneração ecológica.</li>
                    <li><strong>Autonomia alimentar</strong> e fortalecimento da agricultura local.</li>
                    <li><strong>Educação ambiental</strong> e partilha de saberes.</li>
                    <li><strong>Economia circular</strong> e uso consciente dos recursos.</li>
                    <li><strong>Saúde integral</strong>: física, emocional, comunitária e ambiental.</li>
                </ul>

            </article>

            <div className="flex justify-center pt-12">
                <Link href="/land">
                    <Button size="lg" className="rounded-full px-8">
                        Conhecer o Terreno <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </div>
        </div>
    );
}
