'use server';

/**
 * @fileOverview Implements a Genkit flow to analyze business diagnostic data using the M.A.P.C.A framework.
 * @module generate-mapca-analysis
 * @description This flow takes business diagnostics and generates a structured action plan, Gantt chart, and strategic analysis.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

/**
 * The input schema for the M.A.P.C.A. analysis flow.
 * @property {string} companyName - The name of the company being analyzed.
 * @property {string} cnpj - The CNPJ of the company.
 * @property {string} diagnostics - The diagnostic data extracted from the company.
 */
export const GenerateMAPCAAnalysisInputSchema = z.object({
  companyName: z.string().describe('The name of the company being analyzed.'),
  cnpj: z.string().describe('The CNPJ of the company.'),
  diagnostics: z.string().describe('The diagnostic data extracted from the company.'),
});
export type GenerateMAPCAAnalysisInput = z.infer<typeof GenerateMAPCAAnalysisInputSchema>;

/**
 * The output schema for the M.A.P.C.A. analysis flow.
 * @property {string} mapcaAnalysis - The M.A.P.C.A analysis result.
 * @property {string} actionPlan - A JSON array representing the high-level action plan.
 * @property {string} ganttChart - A detailed Gantt chart schedule as a JSON array.
 */
export const GenerateMAPCAAnalysisOutputSchema = z.object({
  mapcaAnalysis: z.string().describe('The M.A.P.C.A analysis result.'),
  actionPlan: z
    .string()
    .describe(
      'A JSON array representing the high-level action plan. Each object must have "etapa", "titulo", "descricao", and "duracao".'
    ),
  ganttChart: z
    .string()
    .describe(
      'A detailed Gantt chart schedule as a JSON array. Each object should represent a specific deliverable with "etapa", "entregavel", "responsavel", "prazo", and "preco".'
    ),
});
export type GenerateMAPCAAnalysisOutput = z.infer<typeof GenerateMAPCAAnalysisOutputSchema>;

/**
 * A Genkit prompt that defines the AI's task for generating the M.A.P.C.A. analysis.
 */
const prompt = ai.definePrompt({
  name: 'generateMAPCAAnalysisPrompt',
  input: { schema: GenerateMAPCAAnalysisInputSchema },
  output: { schema: GenerateMAPCAAnalysisOutputSchema },
  prompt: `Você é o AgeQuodAgis, um consultor de negócios especialista que usa o framework M.A.P.C.A. para analisar diagnósticos e gerar uma proposta comercial completa.

**DIAGNÓSTICO RECEBIDO:**
- **Empresa:** {{companyName}} (CNPJ: {{cnpj}})
- **Resumo do Diagnóstico:** {{diagnostics}}

**FRAMEWORK M.A.P.C.A:**

**ETAPA 1: M (MAPEAMENTO E ANÁLISE)**
- Analise o diagnóstico e classifique as oportunidades em uma matriz de priorização (Impacto vs. Esforço).
- Categorias: Quick Wins (Alto impacto, baixo esforço), Projetos Estruturais (Alto impacto, alto esforço), Melhorias Incrementais (Baixo impacto, baixo esforço).
- Sua resposta para o campo 'mapcaAnalysis' DEVE ser um parágrafo estratégico em português, conectando os pontos de melhoria e justificando o foco inicial. Ex: "Com base no diagnóstico, identifiquei 3 Quick Wins (e.g., controle de estoque), 2 Projetos Estruturais (e.g., automação de processos)... O foco inicial será nos Quick Wins para gerar resultados imediatos."

**ETAPA 2: A (ARQUITETURA DO PLANO)**
- Estruture um plano de ação MACRO e sequencial. Este plano deve conter apenas as grandes fases do projeto.
- Sua resposta para o campo 'actionPlan' DEVE ser um JSON array com objetos contendo "etapa", "titulo", "descricao" e "duracao".
- **Exemplo de 'actionPlan':**
  \`\`\`json
  [
    { "etapa": "1", "titulo": "Discovery e Diagnóstico", "descricao": "Análise detalhada dos processos e gargalos atuais.", "duracao": "1 semana" },
    { "etapa": "2", "titulo": "Implementação de Controles", "descricao": "Estruturação de ferramentas financeiras e de gestão.", "duracao": "3 semanas" }
  ]
  \`\`\`

**ETAPA 3: P (PRECIFICAÇÃO E ESCOPO)**
- Detalhe os ENTREGÁVEIS específicos de cada etapa do plano macro.
- Use a tabela de referência abaixo para estimar o preço de cada entregável.
- Sua resposta para o campo 'ganttChart' DEVE ser um JSON array representando o cronograma de ENTREGÁVEIS. Cada objeto deve ter "etapa" (vinculada ao plano macro), "entregavel", "responsavel", "prazo" e "preco".
- **Responsável padrão:** 'Consultor Líder'
- **Prazos padrão:** Quick Wins (até 7 dias), Mapeamento (3-5 dias), Projetos (15-90 dias).
- **Tabela de Referência de Preços Live (use como base):**
  - Diagnóstico Organizacional: R$ 3.000 - R$ 8.000
  - Mapeamento de Processos: R$ 2.500 - R$ 6.000
  - Implementação de Controles: R$ 5.000 - R$ 15.000
  - Treinamento de Equipes: R$ 1.500 - R$ 4.000
  - Consultoria Estratégica: R$ 8.000 - R$ 25.000
  - Automação de Processos: R$ 10.000 - R$ 30.000
- **Exemplo de 'ganttChart':**
  \`\`\`json
  [
    { "etapa": "1", "entregavel": "Relatório de Diagnóstico de Processos", "responsavel": "Consultor Líder", "prazo": "5 dias", "preco": 5000 },
    { "etapa": "1", "entregavel": "Workshop de Validação com a Diretoria", "responsavel": "Consultor Líder", "prazo": "1 dia", "preco": 2500 },
    { "etapa": "2", "entregavel": "Configuração da Ferramenta de Fluxo de Caixa", "responsavel": "Especialista Financeiro", "prazo": "10 dias", "preco": 8000 }
  ]
  \`\`\`

**INSTRUÇÕES FINAIS:**
- O idioma de toda a análise e dos campos de texto deve ser português do Brasil.
- Certifique-se de que ambos os campos JSON ('actionPlan' e 'ganttChart') sejam válidos e sigam estritamente os formatos descritos.
- Os valores de 'preco' devem ser números, sem formatação de moeda.`,
});

/**
 * The main Genkit flow for generating the M.A.P.C.A. analysis.
 * @param {GenerateMAPCAAnalysisInput} input - The input data for the flow.
 * @returns {Promise<GenerateMAPCAAnalysisOutput>} The generated analysis, action plan, and Gantt chart.
 */
export const generateMAPCAAnalysis = ai.defineFlow(
  {
    name: 'generateMAPCAAnalysisFlow',
    inputSchema: GenerateMAPCAAnalysisInputSchema,
    outputSchema: GenerateMAPCAAnalysisOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
