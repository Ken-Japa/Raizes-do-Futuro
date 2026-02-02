"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Home,
    Sprout,
    Fish,
    Droplets,
    Bird,
    Trees,
    BookOpen,
    Map,
    Settings,
    Menu,
    X,
    Heart,
    Activity,
    DollarSign,
    ArrowRight
} from "lucide-react";
import { useState } from "react";

const menuItems = [
    {
        title: "Navegação",
        items: [
            { name: "Início", href: "/", icon: Home },
            { name: "Manifesto", href: "/about", icon: Heart },
            { name: "Painel de Controle", href: "/dashboard", icon: LayoutDashboard },
            { name: "Planejamento (Gantt)", href: "/planning", icon: Activity },
            { name: "Relatório Financeiro", href: "/financials", icon: DollarSign },
        ],
    },
    {
        title: "Fundamentos",
        items: [
            { name: "O Terreno", href: "/land", icon: Map },
            { name: "Sustentabilidade", href: "/sustainability", icon: BookOpen },
        ],
    },
    {
        title: "Ecossistema",
        items: [
            { name: "Integração de Sistemas", href: "/integration", icon: ArrowRight },
            { name: "Agrofloresta", href: "/systems/forest", icon: Trees },
            { name: "Piscicultura", href: "/systems/fish", icon: Fish },
            { name: "Aquaponia", href: "/systems/aquaponics", icon: Droplets },
            { name: "Fábrica de Ração", href: "/systems/feed", icon: Sprout },
            { name: "Avicultura", href: "/systems/chicken", icon: Bird },
        ],
    },
];

export function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Trigger */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 left-4 z-50 p-2 rounded-full bg-primary text-primary-foreground md:hidden shadow-lg"
            >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Sidebar Container */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-40 w-64 transform bg-card/95 backdrop-blur-xl border-r border-border transition-transform duration-300 ease-in-out md:translate-x-0 font-sans",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex h-full flex-col">
                    {/* Logo Area */}
                    <div className="flex h-20 items-center justify-center border-b border-border/50">
                        <h1 className="text-xl font-heading font-bold text-primary tracking-tight">
                            Raízes do Futuro
                        </h1>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
                        {menuItems.map((group) => (
                            <div key={group.title}>
                                <h3 className="mb-3 px-2 text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
                                    {group.title}
                                </h3>
                                <div className="space-y-1">
                                    {group.items.map((item) => {
                                        const isActive = pathname === item.href;
                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={() => setIsOpen(false)}
                                                className={cn(
                                                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                                                    isActive
                                                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/10"
                                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                                )}
                                            >
                                                <item.icon size={18} className={cn(isActive ? "text-primary-foreground" : "text-muted-foreground opacity-70")} />
                                                {item.name}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </nav>

                    {/* Footer */}
                    <div className="border-t border-border/50 p-4 bg-muted/30">
                        <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-background transition-colors cursor-pointer group">
                            <div className="h-9 w-9 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-heading font-bold ring-2 ring-transparent group-hover:ring-secondary/20 transition-all">
                                K
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="truncate text-sm font-medium text-foreground">Ken</p>
                                <p className="truncate text-xs text-muted-foreground">Gestor do Projeto</p>
                            </div>
                            <Settings size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
