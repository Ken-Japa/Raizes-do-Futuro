"use client";

import { useMemo, useState } from "react";
import {
    CAPEX_DATA,
    INITIAL_ANIMALS,
    RECURRING_OPEX,
    YEARLY_REVENUE_BASE
} from "../data/project-finances";

export interface SimulationSettings {
    isFinancingEnabled: boolean;
    financingAmount: number;
    interestRate: number; // Annually
    financingPeriod: number; // Years
    opexBuffer: number; // Percentage (eg. 0.1 for 10%)
}

export const useFinancialSimulator = () => {
    const [settings, setSettings] = useState<SimulationSettings>({
        isFinancingEnabled: true,
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
            // Get base revenue (fallback to growth for years > 14)
            let baseRevenue = 0;
            const baseRevData = YEARLY_REVENUE_BASE.find(d => d.year === year);

            if (baseRevData) {
                baseRevenue = baseRevData.revenue;
            } else {
                // Growth estimation post Year 14 (~10% linear growth based on trend)
                const lastRev = YEARLY_REVENUE_BASE[YEARLY_REVENUE_BASE.length - 1].revenue;
                baseRevenue = lastRev + (year - 14) * 100000;
            }

            // Base Opex (increases slowly after year 10)
            const yearOpex = year > 10 ? baseOpex * (1 + (year - 10) * 0.05) : baseOpex;

            // Financing Payments
            let financingPayment = 0;
            if (settings.isFinancingEnabled) {
                if (year >= 4 && year < 4 + settings.financingPeriod) {
                    // Simple amortization + interest on remainder
                    const principal = settings.financingAmount / settings.financingPeriod;
                    financingPayment = principal * (1 + settings.interestRate);
                } else if (year >= 1 && year < 4) {
                    // Interest only during grace period
                    financingPayment = settings.financingAmount * settings.interestRate;
                }
            }

            const customOpex = yearOpex * (1 + settings.opexBuffer);

            // Calculate results
            const baselineResult = baseRevenue - yearOpex;
            const customResult = baseRevenue - customOpex - financingPayment;

            baselineCumulative += baselineResult;
            customCumulative += customResult;

            return {
                year,
                baseRevenue,
                baseOpex: yearOpex,
                customOpex,
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
            settings,
            setSettings
        };
    }, [baseCapex, baseOpex, settings]);

    return data;
};
