"use client";

import { useMemo, useState } from "react";
import {
    CAPEX_DATA,
    INITIAL_ANIMALS,
    RECURRING_OPEX,
    YEARLY_REVENUE_BASE,
    ACTIVITY_DETAILS
} from "../data/project-finances";

export interface SimulationSettings {
    isFinancingEnabled: boolean;
    financingAmount: number;
    interestRate: number; // Annually
    financingPeriod: number; // Years
    opexBuffer: number; // Percentage (eg. 0.1 for 10%)
}

// Annotation data for the first 12 years
const YEAR_ANNOTATIONS: Record<number, string> = {
    1: "Implantação e Obras",
    2: "Maturação Proteína",
    3: "Início Vendas Ovos/Carne",
    4: "Escala Piscicultura",
    5: "Início Frutas SAF",
    6: "Expansão Comercial",
    7: "Pico Produtivo SAF",
    8: "Estabilização Operacional",
    9: "Manejamento Madeireira",
    10: "Ponto de Payback",
    11: "Escala Comercial Alta",
    12: "Autossuficiência Plena",
};

export const useFinancialSimulator = () => {
    const [settings, setSettings] = useState<SimulationSettings>({
        isFinancingEnabled: false,
        financingAmount: 850000,
        interestRate: 0.03, // 3% a.a. (PRONAF)
        financingPeriod: 10,
        opexBuffer: 0,
    });

    const baseCapex = useMemo(() => {
        const main = CAPEX_DATA.reduce((sum, item) => sum + item.value, 0);
        const animals = INITIAL_ANIMALS.reduce((sum, item) => sum + item.value, 0);
        return main + animals;
    }, []);

    const baseOpex = useMemo(() => {
        return RECURRING_OPEX.reduce((sum, item) => sum + item.yearlyValue, 0);
    }, []);

    const data = useMemo(() => {
        const years = Array.from({ length: 25 }, (_, i) => i + 1);

        // Total investment is roughly Year 0/1 combined
        const initialOutlay = baseCapex;
        const actualFinancing = settings.isFinancingEnabled ? settings.financingAmount : 0;

        let baselineCumulative = -initialOutlay;
        let customCumulative = -(initialOutlay - actualFinancing);

        const projections = years.map((year) => {
            // Get base revenue
            let baseRevenue = 0;
            const baseRevData = YEARLY_REVENUE_BASE.find((d: { year: number; revenue: number }) => d.year === year);

            if (baseRevData) {
                baseRevenue = baseRevData.revenue;
            } else {
                const lastRev = YEARLY_REVENUE_BASE[YEARLY_REVENUE_BASE.length - 1].revenue;
                baseRevenue = lastRev + (year - 14) * 100000;
            }

            // Base Opex
            const yearOpex = year > 10 ? baseOpex * (1 + (year - 10) * 0.05) : baseOpex;
            const customOpex = yearOpex * (1 + settings.opexBuffer);

            // Financing Payments
            let financingPayment = 0;
            if (settings.isFinancingEnabled) {
                if (year >= 4 && year < 4 + settings.financingPeriod) {
                    const principal = settings.financingAmount / settings.financingPeriod;
                    financingPayment = principal * (1 + settings.interestRate);
                } else if (year >= 1 && year < 4) {
                    financingPayment = settings.financingAmount * settings.interestRate;
                }
            }

            // Net revenue (Receita Líquida = Revenue - Opex)
            const netRevenue = baseRevenue - customOpex;

            // Investment (Only year 1 typically for this model, or financing principal if we want to show it as "cost")
            const yearInvestment = year === 1 ? (initialOutlay - actualFinancing) : 0;

            const baselineResult = baseRevenue - yearOpex;
            const customResult = baseRevenue - customOpex - financingPayment;

            baselineCumulative += baselineResult;
            customCumulative += customResult;

            return {
                year,
                annotation: YEAR_ANNOTATIONS[year] || "",
                baseRevenue,
                baseOpex: yearOpex,
                customOpex,
                netRevenue,
                investment: yearInvestment,
                financingPayment,
                baselineResult,
                customResult,
                baselineCumulative,
                customCumulative
            };
        });

        // Calculate Key Indicators
        const pbBaseIdx = projections.findIndex(p => p.baselineCumulative > 0);
        const paybackBase = pbBaseIdx === -1 ? "> 25" : (pbBaseIdx + 1).toString();

        const pbCustomIdx = projections.findIndex(p => p.customCumulative > 0);
        const paybackCustom = pbCustomIdx === -1 ? "> 25" : (pbCustomIdx + 1).toString();

        const roi10yBase = projections[9].baselineCumulative / initialOutlay;
        const roi10yCustom = projections[9].customCumulative / (initialOutlay - actualFinancing);

        return {
            projections,
            indicators: {
                paybackBase,
                paybackCustom,
                roi10yBase,
                roi10yCustom,
                totalCapex: baseCapex,
            },
            activityDetails: ACTIVITY_DETAILS,
            settings,
            setSettings
        };
    }, [baseCapex, baseOpex, settings]);

    return data;
};
