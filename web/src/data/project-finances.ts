/**
 * PROJECT RAÍZES DO FUTURO - FINANCIAL DATA CONSTANTS
 * All values in BRL (R$)
 * Extracted from Chapter 8 of the Master Plan.
 */

export interface CapexItem {
    id: string;
    label: string;
    value: number;
    category: "Land" | "Equipment" | "Structure" | "Other";
}

export interface OpexItem {
    id: string;
    label: string;
    yearlyValue: number;
    category: "Inputs" | "Labor" | "Living" | "Ops";
}

export const CAPEX_DATA: CapexItem[] = [
    { id: "land", label: "Terreno", value: 400000, category: "Land" },
    { id: "car", label: "Carro Utilitário", value: 50000, category: "Equipment" },
    { id: "excavator", label: "Mini-Escavadeira", value: 60000, category: "Equipment" },
    { id: "atv", label: "Quadriciclo", value: 11000, category: "Equipment" },
    { id: "fish_system", label: "Piscicultura, Lab & Hidroponia", value: 123000, category: "Structure" },
    { id: "chicken_coop", label: "Galinheiro", value: 28000, category: "Structure" },
    { id: "feed_factory", label: "Fábrica de Ração & Armazém", value: 90000, category: "Structure" },
    { id: "agroforest_structure", label: "Sementeira & Estrutura SAF", value: 127000, category: "Structure" },
    { id: "water_system", label: "Sistema Hídrico (Captação/Swales)", value: 10000, category: "Structure" },
    { id: "generator", label: "Gerador a Combustível", value: 10000, category: "Equipment" },
    { id: "drone", label: "Drone (Monitoramento)", value: 3000, category: "Equipment" },
    { id: "initial_works", label: "Reformas & Obras Iniciais", value: 50000, category: "Other" },
    { id: "legal", label: "Licenças & Profissionais", value: 25000, category: "Other" },
];

export const INITIAL_ANIMALS: CapexItem[] = [
    { id: "horses", label: "Casal de Cavalos", value: 8000, category: "Other" },
    { id: "calves", label: "Casal de Bezerros", value: 6000, category: "Other" },
    { id: "dogs", label: "3 Cachorros", value: 2200, category: "Other" },
    { id: "chickens", label: "21 Galinhas", value: 800, category: "Other" },
    { id: "pigs", label: "Casal de Porcos Duroc", value: 4000, category: "Other" },
];

export const RECURRING_OPEX: OpexItem[] = [
    { id: "inputs_fish", label: "Alevinos (12k/ano)", yearlyValue: 6000, category: "Inputs" },
    { id: "inputs_saf", label: "Sementes & Mudas SAF", yearlyValue: 2000, category: "Inputs" },
    { id: "inputs_feed_crops", label: "Sementes para Cultivo Ração", yearlyValue: 4000, category: "Inputs" },
    { id: "inputs_feed_supplements", label: "Suplementos de Ração", yearlyValue: 8000, category: "Inputs" },
    { id: "labor_couple", label: "Salário Casal Caseiros (anual)", yearlyValue: 35000, category: "Labor" },
    { id: "living_food", label: "Custo de Vida - Alimentação", yearlyValue: 12000, category: "Living" },
    { id: "living_energy", label: "Energia + Gás", yearlyValue: 3000, category: "Living" },
    { id: "living_comms", label: "Internet + Celular", yearlyValue: 3000, category: "Living" },
    { id: "ops_fuel_personal", label: "Combustível Pessoal", yearlyValue: 6000, category: "Ops" },
    { id: "ops_fuel_project", label: "Combustível Projeto/Gerador", yearlyValue: 15000, category: "Ops" },
    { id: "admin_fees", label: "Contabilidade & Taxas (Simples/MEI)", yearlyValue: 4000, category: "Ops" },
];

export const YEARLY_REVENUE_BASE = [
    { year: 1, revenue: 0 },
    { year: 2, revenue: 0 },
    { year: 3, revenue: 59500 },
    { year: 4, revenue: 104500 },
    { year: 5, revenue: 160500 },
    { year: 6, revenue: 261500 },
    { year: 7, revenue: 413000 },
    { year: 8, revenue: 465000 },
    { year: 9, revenue: 540000 },
    { year: 10, revenue: 801000 },
    { year: 11, revenue: 942000 },
    { year: 12, revenue: 1105000 },
    { year: 13, revenue: 1223000 },
    { year: 14, revenue: 1312000 },
];

// Reference milestones for verification
export const MILESTONES = {
    totalInvestment: 1380000,
    paybackYear: 10,
    roi10Years: 1.12, // 112%
};
