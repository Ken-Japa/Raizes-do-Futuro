import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Leaf, Droplets, Fish, Sprout } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 md:gap-32 pb-20">

      {/* 1. HERO SECTION: Immersive, Emotional, Visionary */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden rounded-[2rem] bg-gradient-to-b from-primary/10 to-transparent border border-primary/5">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        {/* Abstract organic shapes (CSS) could go here */}

        <div className="relative z-10 max-w-4xl space-y-8 animate-in fade-in zoom-in duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm">
            <Sprout className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide">PROJETO RAÍZES DO FUTURO</span>
          </div>

          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] text-primary-foreground drop-shadow-sm md:text-primary">
            Cultivando hoje,<br />
            <span className="italic text-secondary">enraizando o amanhã.</span>
          </h1>

          <p className="text-lg md:text-2xl text-muted-foreground/90 max-w-2xl mx-auto leading-relaxed font-light">
            Um ecossistema vivo que integra regeneração ecológica, autonomia alimentar e a filosofia da Ecologia Profunda.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all hover:scale-105" asChild>
              <Link href="/about">
                Conhecer o projeto
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-primary/20 hover:bg-primary/5 text-foreground/80 backdrop-blur-sm" asChild>
              <Link href="/land">
                Ver o terreno
              </Link>
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-primary/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* 2. VISION SECTION: Text-heavy, Editorial, Serif */}
      <section className="container max-w-5xl mx-auto px-4 space-y-12 text-center md:text-left">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary">
              Não somos donos da terra,<br />somos parte dela.
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                O projeto <strong>Raízes do Futuro</strong> nasce de um propósito profundo:
                viver de forma coerente com valores de regeneração e respeito à vida.
              </p>
              <p>
                Fundamentado na <strong>Ecologia Profunda</strong>, buscamos mais do que sustento;
                buscamos a cura do solo, o retorno das águas e a integração entre o ser humano e a natureza.
              </p>
            </div>
            <Link href="/about" className="inline-flex items-center text-primary font-medium hover:underline underline-offset-4 group">
              Ler o manifesto completo <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden bg-muted/50 border border-border/50">
            {/* Placeholder for evocative image */}
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20">
              <Leaf className="w-32 h-32 opacity-20" />
              <span className="sr-only">Imagem Conceitual de Natureza</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SYSTEMS OVERVIEW: The "Meat" of the project presented elegantly */}
      <section className="container max-w-6xl mx-auto px-4 space-y-16">
        <div className="text-center space-y-4">
          <span className="uppercase tracking-widest text-sm font-semibold text-muted-foreground">Sistemas Integrados</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">Ciclos de Vida</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* CARD 1: AGROFOREST */}
          <Link href="/systems/forest" className="group">
            <Card className="h-full overflow-hidden border-none shadow-lg bg-[#2F5233] text-white hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <div className="p-8 h-full flex flex-col justify-between space-y-8 bg-gradient-to-br from-white/10 to-transparent">
                <Leaf className="w-12 h-12 text-accent" />
                <div className="space-y-2">
                  <h3 className="font-heading text-3xl font-bold">Agrofloresta</h3>
                  <p className="text-white/80 leading-relaxed">
                    Sucessão ecológica, produção de madeira nobre e recuperação da biodiversidade nativa.
                  </p>
                </div>
                <div className="flex items-center text-sm font-medium text-accent">
                  Explorar Sistema <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Card>
          </Link>

          {/* CARD 2: FISH */}
          <Link href="/systems/fish" className="group">
            <Card className="h-full overflow-hidden border-none shadow-lg bg-[#1e3a8a] text-white hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <div className="p-8 h-full flex flex-col justify-between space-y-8 bg-gradient-to-br from-white/10 to-transparent">
                <Fish className="w-12 h-12 text-blue-200" />
                <div className="space-y-2">
                  <h3 className="font-heading text-3xl font-bold">Piscicultura</h3>
                  <p className="text-white/80 leading-relaxed">
                    Produção sustentável de Tilápias em tanques escavados com monitoramento de qualidade.
                  </p>
                </div>
                <div className="flex items-center text-sm font-medium text-blue-200">
                  Ver Projeto <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Card>
          </Link>

          {/* CARD 3: AQUAPONICS */}
          <Link href="/systems/aquaponics" className="group">
            <Card className="h-full overflow-hidden border-none shadow-lg bg-[#0ea5e9] text-white hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <div className="p-8 h-full flex flex-col justify-between space-y-8 bg-gradient-to-br from-white/10 to-transparent">
                <Droplets className="w-12 h-12 text-cyan-100" />
                <div className="space-y-2">
                  <h3 className="font-heading text-3xl font-bold">Aquaponia</h3>
                  <p className="text-white/80 leading-relaxed">
                    O ciclo da água fechado. Nutrientes dos peixes alimentando hortaliças orgânicas.
                  </p>
                </div>
                <div className="flex items-center text-sm font-medium text-cyan-100">
                  Entender o Ciclo <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </section>

      {/* 4. CALL TO ACTION / TERRAIN */}
      <section className="container max-w-4xl mx-auto px-4 py-12">
        <div className="relative rounded-3xl overflow-hidden bg-secondary text-secondary-foreground p-12 text-center space-y-8 shadow-2xl">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none" />
          <div className="relative z-10 space-y-6">
            <h2 className="font-heading text-4xl font-bold">Onde tudo começa</h2>
            <p className="text-xl max-w-2xl mx-auto text-secondary-foreground/90">
              A escolha do terreno é o primeiro passo para o enraizamento. Conheça os critérios, a localização e o potencial da terra.
            </p>
            <Link href="/land">
              <Button variant="secondary" size="lg" className="bg-white text-secondary hover:bg-white/90 rounded-full px-8 mt-4">
                Verificar Terreno
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
