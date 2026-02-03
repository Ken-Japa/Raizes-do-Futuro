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

export interface TechnicalSpec {
    label: string;
    value: string;
    unit?: string;
}

export interface OperatingPhase {
    label: string;
    duration: string;
    description: string;
}

export interface ActivityDetail {
    id: string;
    label: string;
    description: string;
    technicalSpecs?: TechnicalSpec[];
    operatingPhases?: OperatingPhase[];
    capex: {
        construction: { label: string; value: number }[];
        equipment: { label: string; value: number }[];
        labor: number;
    };
    opex: {
        maintenance: { label: string; value: number }[];
    };
}

export const ACTIVITY_DETAILS: Record<string, ActivityDetail> = {
    tilapia: {
        id: "tilapia",
        label: "Criação de Tilápias",
        description: "Sistema semi-intensivo tecnificado com tanques escavados e integração agroecológica.",
        technicalSpecs: [
            { label: "Oxigênio Dissolvido", value: "> 5.0", unit: "mg/L" },
            { label: "pH Ideal", value: "6.5 - 8.5" },
            { label: "Temperatura", value: "26 - 32", unit: "°C" },
            { label: "Amônia (NH3)", value: "< 0.05", unit: "mg/L" },
            { label: "Vazão de Água", value: "50 - 100", unit: "m³/h" },
            { label: "Densidade Berçário", value: "125", unit: "peixes/m³" },
        ],
        operatingPhases: [
            { label: "Fase 1: Preparação", duration: "1.5 mês", description: "Desenho das áreas, limpeza, nivelamento e compra de materiais." },
            { label: "Fase 2: Tanques", duration: "3 meses", description: "Escavação, drenagem, impermeabilização e instalação hidráulica." },
            { label: "Fase 3: Berçário", duration: "1 mês", description: "Estrutura física, sistemas de aquecimento e aeração." },
            { label: "Fase 4: Abate", duration: "1 mês", description: "Construção civil do local de processamento e equipamentos." },
            { label: "Fase 5: Automação", duration: "1 mês", description: "Montagem do laboratório de análise e sistemas hidropônicos." },
        ],
        capex: {
            construction: [
                { label: "Berçário (Taipa + Cobertura)", value: 25500 },
                { label: "Tanques de Engorda (Escavação + Hidráulica)", value: 15000 },
                { label: "Local de Abate (Bioconstrução)", value: 12000 },
                { label: "Laboratório e Escritório Integrado", value: 14000 },
                { label: "Hidroponia Integrada", value: 10000 },
                { label: "Estruturas de Apoio (Casa de bombas/Cisterna)", value: 5000 },
            ],
            equipment: [
                { label: "Refrigerador (Armazenagem)", value: 3500 },
                { label: "Embaladora a vácuo", value: 1800 },
                { label: "Redes de Proteção", value: 3000 },
                { label: "Bombas d'água & Blowers", value: 7500 },
                { label: "Filtro Biológico & Tubulação Extra", value: 5500 },
                { label: "Compostagem para Resíduos", value: 800 },
            ],
            labor: 19290,
        },
        opex: {
            maintenance: [
                { label: "Manutenção de bombas/blowers/filtros", value: 3700 }, // Agregado
                { label: "Energia (Bombas e Oxigenação)", value: 2500 },
                { label: "Análise de água e sanitização", value: 1200 },
                { label: "Limpeza e Manejo de Resíduos", value: 1600 }, // Agregado
            ]
        }
    },
    chickens: {
        id: "chickens",
        label: "Criação de Galinhas (Australorp)",
        description: "Produção de ovos e carne em sistema caipira melhorado com raça de duplo propósito.",
        technicalSpecs: [
            { label: "Produção Ovos", value: "250 - 300", unit: "un/ano/ave" },
            { label: "Peso Abate", value: "2.5 - 3.5", unit: "kg" },
            { label: "Início Postura", value: "5 - 6", unit: "meses" },
            { label: "Área Galinheiro", value: "0.3", unit: "m²/ave" },
            { label: "Consumo Ração", value: "110", unit: "g/dia/ave" },
        ],
        operatingPhases: [
            { label: "Fase 1: Berçário", duration: "1 mês", description: "Crescimento inicial em ambiente controlado com aquecimento." },
            { label: "Fase 2: Recria", duration: "4-5 meses", description: "Desenvolvimento físico e introdução ao pastejo." },
            { label: "Fase 3: Postura", duration: "24 meses", description: "Produção principal de ovos coloniais." },
            { label: "Fase 4: Processamento", duration: "1 semana", description: "Abate e comercialização como galinha caipira ao final do ciclo." },
        ],
        capex: {
            construction: [
                { label: "Galinheiro (40m²)", value: 8000 },
                { label: "Berçário (10m²)", value: 6000 },
                { label: "Local p/ Ovos e Ração", value: 4000 },
                { label: "Adaptação Local Abate", value: 3000 },
                { label: "Cercamentos e Piquetes", value: 7000 },
            ],
            equipment: [
                { label: "Chocadeira Profissional", value: 1500 },
                { label: "Aquecedores e Lâmpadas", value: 1000 },
                { label: "Comedouros e Bebedouros", value: 800 },
                { label: "Ninhos e Poleiros", value: 600 },
            ],
            labor: 12000,
        },
        opex: {
            maintenance: [
                { label: "Reparos e Conservação", value: 1300 },
                { label: "Insumos Veterinários", value: 1150 },
                { label: "Energia (Calor/Luz)", value: 550 },
            ]
        }
    },
    feed_factory: {
        id: "feed_factory",
        label: "Fábrica de Ração",
        description: "Unidade de processamento para autossuficiência nutritiva das criações.",
        capex: {
            construction: [
                { label: "Área de Secagem (Estufas)", value: 9000 },
                { label: "Moagem & Filtragem", value: 5000 },
                { label: "Mistura & Peletização", value: 5000 },
                { label: "Túneis de Armazenamento (100t+)", value: 45500 },
            ],
            equipment: [
                { label: "Moinho de Pedra (3 CV)", value: 4000 },
                { label: "Triturador (5 CV)", value: 2000 },
                { label: "Misturador Horizontal", value: 4000 },
                { label: "Pelletizadora (200-400kg/h)", value: 8000 },
                { label: "Estufa Solar", value: 1000 },
            ],
            labor: 6500,
        },
        opex: {
            maintenance: [
                { label: "Manutenção Estrutural", value: 3200 },
                { label: "Peças & Revisão Maquinário", value: 2000 },
            ]
        }
    },
    baskets: {
        id: "baskets",
        label: "Cestas Agroecológicas",
        description: "Venda direta via assinaturas (CSA) de produtos integrados da fazenda.",
        capex: {
            construction: [
                { label: "Centro de Montagem (Adequação)", value: 2000 },
            ],
            equipment: [
                { label: "Carreta Refrigerada Acoplável", value: 30000 },
                { label: "Balança & Seladora", value: 1500 },
                { label: "Caixas Retornáveis", value: 1500 },
            ],
            labor: 0,
        },
        opex: {
            maintenance: [
                { label: "Logística & Embalagens (Estimado)", value: 5000 },
                { label: "Manutenção Carreta", value: 1200 },
            ]
        }
    },
    agroforestry: {
        id: "agroforestry",
        label: "Agrofloresta (Sintropia)",
        description: "Sistema regenerativo com consórcio de madeiras nobres, frutíferas e animais.",
        capex: {
            construction: [
                { label: "Sementeira (Estrutura/Mudas)", value: 5000 },
                { label: "Armazenamento de Sementes", value: 3000 },
                { label: "Casa de Ferramentas", value: 5000 },
            ],
            equipment: [
                { label: "Trator & Carreta", value: 80000 },
                { label: "Implementos (Arado/Roçadeira)", value: 20000 },
                { label: "Ferramentas de Poda/Manejo", value: 3200 },
                { label: "Equipamentos Agrícolas Manuais", value: 2700 },
                { label: "Ferramentas de Oficina", value: 6400 },
                { label: "Covadeira Mecânica", value: 1500 },
            ],
            labor: 0,
        },
        opex: {
            maintenance: [
                { label: "Manutenção de Estruturas (Anual)", value: 1000 },
                { label: "Manutenção de Máquinas (Anual)", value: 1500 },
            ]
        }
    },
    rural_hosting: {
        id: "rural_hosting",
        label: "Hospedagem Rural",
        description: "Experiência autêntica de vivência no campo em chalés de bioconstrução.",
        capex: {
            construction: [
                { label: "2 Chalés Bioconstrução", value: 35000 },
                { label: "Banheiros", value: 10000 },
            ],
            equipment: [
                { label: "Mobília e Utensílios", value: 8000 },
            ],
            labor: 0,
        },
        opex: {
            maintenance: [
                { label: "Manutenção Hídrica", value: 1000 },
                { label: "Limpeza/Lavanderia", value: 4000 },
                { label: "Alimentação (Hóspedes)", value: 6000 },
                { label: "Manutenção Estrutural", value: 2000 },
                { label: "Marketing & Divulgação", value: 1000 },
            ]
        }
    },
    workshops: {
        id: "workshops",
        label: "Cursos e Workshops",
        description: "Centro de difusão de conhecimento em agroecologia e bioconstrução.",
        capex: {
            construction: [
                { label: "Sala Multiuso + Dormitório", value: 35000 },
                { label: "Cozinha Comunitária", value: 10000 },
                { label: "Banheiros Secos", value: 5000 },
            ],
            equipment: [
                { label: "Mobília Básica", value: 10000 },
            ],
            labor: 0,
        },
        opex: {
            maintenance: [
                { label: "Energia (Geral)", value: 2500 },
                { label: "Água & Filtros", value: 1000 },
                { label: "Limpeza & Manutenção", value: 4000 },
                { label: "Insumos (Alimentação)", value: 6000 },
                { label: "Materiais Didáticos", value: 2000 },
                { label: "Marketing & Divulgação", value: 2000 },
                { label: "Manutenção Estrutural", value: 2500 },
            ]
        }
    }
};

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
