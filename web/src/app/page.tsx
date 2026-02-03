"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Leaf, Droplets, Fish, Sprout, AlertTriangle, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col gap-24 md:gap-40 pb-32 overflow-x-hidden">

      {/* 1. HERO SECTION: Immersive & Visionary */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden rounded-b-[3rem] md:rounded-b-[5rem]">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ backgroundImage: "url('/hero-vision.png')" }}
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/40 to-background" />

        <div className="relative z-20 max-w-5xl space-y-8 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white border border-white/20 backdrop-blur-md"
          >
            <Sprout className="w-4 h-4 text-green-400" />
            <span className="text-sm font-semibold tracking-widest uppercase">Kanobia: Raízes do Futuro</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold leading-[1] text-white tracking-tighter"
          >
            Onde a Terra <br />
            <span className="text-green-400 italic">respira.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-3xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light"
          >
            Um santuário de regeneração onde a tecnologia encontra a sabedoria da floresta para criar autonomia total.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12"
          >
            <Button size="lg" className="h-16 px-10 text-xl rounded-full bg-green-600 hover:bg-green-500 text-white shadow-2xl shadow-green-900/20 transition-all hover:scale-105 active:scale-95" asChild>
              <Link href="/planning">
                Conhecer o Masterplan
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-16 px-10 text-xl rounded-full border-white/20 hover:bg-white/10 text-white backdrop-blur-md transition-all" asChild>
              <Link href="/financials">
                Ver Viabilidade
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-60"
        >
          <div className="w-7 h-12 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1.5 h-3 bg-white rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* 2. THE CHALLENGE: High contrast, Narrative shock */}
      <section className="container max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 text-amber-600 font-bold tracking-widest uppercase text-sm">
              <AlertTriangle className="w-4 h-4" />
              O Desafio da Nossa Era
            </div>
            <h2 className="font-heading text-5xl md:text-6xl font-bold leading-tight">
              A escassez não é o destino.<br />
              <span className="text-muted-foreground font-light">É a ausência de design.</span>
            </h2>
            <div className="space-y-6 text-xl text-muted-foreground leading-relaxed">
              <p>
                Vivemos em um sistema de produção linear que esgota recursos e nos torna vulneráveis. Solo pobre, água escassa e alimentos ultraprocessados são os sintomas.
              </p>
              <p className="font-medium text-foreground">
                O Kanobia inverte essa lógica. Em vez de extrair, nós regeneramos. Em vez de isolar, nós integramos.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 pt-6">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">120ha</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Área Total</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">Zero</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Desperdício</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-amber-500/20 to-green-500/20 border border-border/50 p-8 flex flex-col justify-center gap-8 shadow-inner">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Insegurança Energética</h4>
                  <p className="text-sm text-muted-foreground">Dependência de redes externas e instáveis.</p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                  <Droplets className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Escassez Hídrica</h4>
                  <p className="text-sm text-muted-foreground">Falta de gestão inteligente dos recursos hídricos.</p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600">
                  <Sprout className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Erosão Nutricional</h4>
                  <p className="text-sm text-muted-foreground">Solo morto produzindo alimento sem vida.</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 p-6 bg-background border rounded-2xl shadow-xl max-w-[200px]">
                <p className="text-sm font-bold leading-tight">"Precisamos de uma nova relação com a abundância."</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. THE SOLUTION: Integrated Systems */}
      <section className="bg-primary/5 py-32 md:py-48 rounded-[3rem] md:rounded-[5rem]">
        <div className="container max-w-7xl mx-auto px-6 space-y-24">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="max-w-2xl space-y-6">
              <span className="uppercase tracking-widest text-sm font-bold text-green-600">A Solução Kanobia</span>
              <h2 className="font-heading text-5xl md:text-6xl font-bold">Ecossistemas que pensam.</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Integramos quatro sistemas fundamentais que trocam matéria e energia em um ciclo contínuo de produção e vida.
              </p>
            </div>
            <Link href="/integration">
              <Button variant="outline" className="rounded-full h-14 px-8 gap-2 border-primary/20 hover:bg-primary/10">
                Ver Diagrama de Fluxos <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <HomeSystemCard
              href="/systems/forest"
              title="Agrofloresta"
              desc="Recuperação do solo e produção de frutas, madeira e Biodiversidade."
              icon={Leaf}
              color="bg-[#2F5233]"
              accent="text-green-300"
            />
            <HomeSystemCard
              href="/systems/fish"
              title="Piscicultura"
              desc="Proteína de alta qualidade e água fertilizada para irrigação."
              icon={Fish}
              color="bg-[#1e3a8a]"
              accent="text-blue-300"
            />
            <HomeSystemCard
              href="/systems/aquaponics"
              title="Aquaponia"
              desc="Otimização extrema de espaço e água para hortaliças premium."
              icon={Droplets}
              color="bg-[#0ea5e9]"
              accent="text-cyan-200"
            />
            <HomeSystemCard
              href="/systems/chicken"
              title="Avicultura"
              desc="Adubação móvel e controle biológico em pastoreio rotacionado."
              icon={Sprout}
              color="bg-amber-800"
              accent="text-amber-200"
            />
          </div>
        </div>
      </section>

      {/* 4. MAP SECTION: Territorial Context */}
      <section className="container max-w-6xl mx-auto px-6 py-12">
        <div className="bg-card border rounded-[3rem] p-12 lg:p-20 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <ShieldCheck className="w-64 h-64" />
          </div>
          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="space-y-8">
              <h2 className="font-heading text-4xl md:text-5xl font-bold">Contexto Territorial</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Localizado em uma região estratégica, o projeto abrange 120 hectares de topografia diversa, permitindo a implementação de microclimas e zonas de proteção hídrica permanentes.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="px-4 py-2 bg-secondary rounded-lg text-sm font-medium">1.200.000 m²</div>
                <div className="px-4 py-2 bg-secondary rounded-lg text-sm font-medium">Altitude Média: 650m</div>
                <div className="px-4 py-2 bg-secondary rounded-lg text-sm font-medium">Reservatórios Próprios</div>
              </div>
              <Button variant="link" className="p-0 h-auto text-primary text-lg font-bold gap-2" asChild>
                <Link href="/land"> Explorar Topografia & Localização <ArrowRight className="w-5 h-5" /></Link>
              </Button>
            </div>
            <div className="aspect-[16/10] rounded-2xl bg-muted border-2 border-dashed border-muted-foreground/20 flex flex-col items-center justify-center text-center p-8 space-y-4">
              <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center">
                <Leaf className="w-10 h-10 text-primary opacity-30" />
              </div>
              <div>
                <h4 className="font-bold">Mapa do Masterplan</h4>
                <p className="text-sm text-muted-foreground max-w-[200px]">Em breve: Visualização interativa da distribuição dos sistemas no terreno.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FINISHED: The Invitation */}
      <section className="container max-w-4xl mx-auto px-6">
        <div className="text-center space-y-12 py-20">
          <h2 className="font-heading text-5xl md:text-7xl font-bold tracking-tight">Estamos construindo o novo normal.</h2>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-light">
            Não é sobre sobreviver à crise, é sobre prosperar em harmonia com os ciclos naturais. Junte-se à jornada.
          </p>
          <div className="flex flex-col items-center gap-6">
            <Button size="lg" className="h-16 px-12 text-xl rounded-full bg-foreground text-background hover:opacity-90 transition-all font-bold" asChild>
              <Link href="/about">Explorar o Manifesto</Link>
            </Button>
            <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">projeto raízes do futuro</p>
          </div>
        </div>
      </section>

    </div>
  );
}

function HomeSystemCard({ href, title, desc, icon: Icon, color, accent }: any) {
  return (
    <Link href={href} className="group h-full">
      <motion.div
        whileHover={{ y: -10 }}
        className={`h-full overflow-hidden rounded-3xl p-8 flex flex-col justify-between space-y-12 shadow-xl transition-all duration-500 ${color} text-white`}
      >
        <div className={`w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/10 ${accent}`}>
          <Icon className="w-8 h-8" />
        </div>
        <div className="space-y-4">
          <h3 className="font-heading text-3xl font-bold leading-tight">{title}</h3>
          <p className="text-white/70 leading-relaxed text-lg">
            {desc}
          </p>
        </div>
        <div className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest ${accent}`}>
          Explorar <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
        </div>
      </motion.div>
    </Link>
  );
}
