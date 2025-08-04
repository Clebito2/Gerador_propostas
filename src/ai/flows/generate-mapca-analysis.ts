'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

// Schema para cada item do Plano de Ação
const ActionPlanItemSchema = z.object({
  etapa: z.string().describe('O número da etapa. Ex: "1"'),
  titulo: z.string().describe('O título da fase do projeto.'),
  descricao: z.string().describe('A descrição detalhada da fase.'),
  duracao: z.string().describe('A duração estimada da fase. Ex: "1 semana"'),
});

// Schema para cada item do Gráfico de Gantt
const GanttChartItemSchema = z.object({
  etapa: z.string().describe('O número da etapa a qual este entregável pertence.'),
  entregavel: z.string().describe('O nome do entregável específico.'),
  responsavel: z.string().describe('O responsável pela entrega.'),
  prazo: z.string().describe('O prazo para a conclusão do entregável. Ex: "5 dias"'),
  preco: z.number().describe('O preço do entregável como um número, sem formatação de moeda.'),
});

// Schema principal de input (não muda)
const GenerateMAPCAAnalysisInputSchema = z.object({
  companyName: z.string().describe('The name of the company being analyzed.'),
  cnpj: z.string().describe('The CNPJ of the company.'),
  diagnostics: z.string().describe('The diagnostic data extracted from the company.'),
});

// Schema principal de output (AGORA MAIS INTELIGENTE)
const GenerateMAPCAAnalysisOutputSchema = z.object({
  mapcaAnalysis: z.string().describe('The M.A.P.C.A analysis result.'),
  actionPlan: z.array(ActionPlanItemSchema).describe('Um array de objetos representando o plano de ação.'),
  ganttChart: z.array(GanttChartItemSchema).describe('Um array de objetos representando o cronograma detalhado.'),
});


export type GenerateMAPCAAnalysisInput = z.infer<typeof GenerateMAPCAAnalysisInputSchema>;
export type GenerateMAPCAAnalysisOutput = z.infer<typeof GenerateMAPCAAnalysisOutputSchema>;

export async function generateMAPCAAnalysis(
  input: GenerateMAPCAAnalysisInput
): Promise<GenerateMAPCAAnalysisOutput> {
  const prompt = ai.definePrompt({
    name: 'generateMAPCAAnalysisPrompt',
    input: { schema: GenerateMAPCAAnalysisInputSchema },
    output: { schema: GenerateMAPCAAnalysisOutputSchema }, // Usando o novo schema
    prompt: `Você é o AgeQuodAgis, um consultor de negócios especialista que usa o framework M.A.P.C.A. para analisar diagnósticos e gerar uma proposta comercial completa.
DIAGNÓSTICO RECEBIDO:
Empresa: {{companyName}} (CNPJ: {{cnpj}}) Resumo do Diagnóstico: {{diagnostics}} FRAMEWORK M.A.P.C.A:
ETAPA 1: M (MAPEAMENTO E ANÁLISE)
Analise o diagnóstico e classifique as oportunidades em uma matriz de priorização (Impacto vs. Esforço). Categorias: Quick Wins (Alto impacto, baixo esforço), Projetos Estruturais (Alto impacto, alto esforço), Melhorias Incrementais (Baixo impacto, baixo esforço). Sua resposta para o campo 'mapcaAnalysis' DEVE ser um parágrafo estratégico em português, conectando os pontos de melhoria e justificando o foco inicial. Ex: "Com base no diagnóstico, identifiquei 3 Quick Wins (e.g., controle de estoque), 2 Projetos Estruturais (e.g., automação de processos)... O foco inicial será nos Quick Wins para gerar resultados imediatos." ETAPA 2: A (ARQUITETURA DO PLANO)
Estruture um plano de ação MACRO e sequencial para o campo 'actionPlan'. Ele deve ser um array de objetos.
ETAPA 3: P (PRECIFICAÇÃO E ESCOPO)
Detalhe os ENTREGÁVEIS específicos de cada etapa do plano macro para o campo 'ganttChart'. Use a tabela de referência de preços.
O campo 'preco' DEVE ser um NÚMERO (ex: 5000), não um texto.
O responsável padrão é 'Consultor Líder'.
Tabela de Referência de Preços Live (use como base):
Diagnóstico Organizacional: 3.000 - 8.000
Mapeamento de Processos: 2.500 - 6.000
Implementação de Controles: 5.000 - 15.000
Treinamento de Equipes: 1.500 - 4.000
Consultoria Estratégica: 8.000 - 25.000
Automação de Processos: 10.000 - 30.000
INSTRUÇÕES FINAIS:
O idioma de toda a análise e dos campos de texto deve ser português do Brasil.
Gere a resposta estritamente de acordo com o schema de output.`,
  });

  const { output } = await prompt(input);
  
  if (!output) {
    throw new Error('Falha ao gerar a análise M.A.P.C.A.');
  }
  return output;
}