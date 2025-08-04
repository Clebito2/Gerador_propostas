'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ExtractBusinessDataInputSchema = z.object({
  documentContent: z.string().describe('The content of the document to analyze.'),
});

const ExtractBusinessDataOutputSchema = z.object({
  companyName: z.string().describe('The name of the company.'),
  cnpj: z.string().describe('The CNPJ of the company.'),
  consultantName: z.string().describe('The name of the consultant.'),
  consultantEmail: z.string().describe('The email of the consultant.'),
  diagnosticSummary: z.string().describe('A summary of the business diagnostic.'),
  companyAddress: z.string().describe('The full address of the company (street, number, city, state, zip code).'),
  companyCity: z.string().describe('The city and state of the company (e.g., "Goiânia/GO").'),
  representativeName: z.string().describe("The company's legal representative's full name."),
  representativeCpf: z.string().describe("The company's legal representative's CPF."),
});

export type ExtractBusinessDataInput = z.infer<typeof ExtractBusinessDataInputSchema>;
export type ExtractBusinessDataOutput = z.infer<typeof ExtractBusinessDataOutputSchema>;

export async function extractBusinessData(
  input: ExtractBusinessDataInput
): Promise<ExtractBusinessDataOutput> {
  const extractBusinessDataPrompt = ai.definePrompt({
    name: 'extractBusinessDataPrompt',
    input: { schema: ExtractBusinessDataInputSchema },
    output: { schema: ExtractBusinessDataOutputSchema },
    prompt: `Você é o AgeQuodAgis, um agente especialista em extrair dados de negócios. Sua missão é analisar o conteúdo fornecido e extrair as seguintes informações com precisão.
REGRAS DE EXTRAÇÃO:
Nome da Empresa:
Busque por padrões como "empresa", "razão social", "nome fantasia", "companhia". Contexto: "A empresa [NOME]", "[NOME] Ltda", "[NOME] S/A". Validação: Mínimo de 2 palavras. CNPJ:
Formato esperado: XX.XXX.XXX/0001-XX. Busque por variações como XXXXXXXXX0001XX ou com espaços. Validação: Deve ter exatamente 14 dígitos numéricos. Endereço da Empresa (companyAddress):
Componentes: Logradouro, número, bairro, cidade, estado, CEP. Busque por padrões como "endereço", "localizada em", "situada em", "sede". Validação: Deve ser o endereço completo. Cidade/UF da Empresa (companyCity):
Extraia apenas a Cidade e o Estado do endereço completo. Ex: "Goiânia/GO". Nome do Representante Legal (representativeName):
Busque por padrões como "representante", "responsável", "diretor", "sócio", "proprietário". Contexto: "Sr(a).", "Dr(a).". Validação: Deve ser um nome completo (mínimo de 2 palavras). CPF do Representante Legal (representativeCpf):
Formato esperado: XXX.XXX.XXX-XX. Busque por variações com 11 dígitos numéricos. Validação: Deve ter exatamente 11 dígitos numéricos. Nome do Consultor (consultantName):
O nome do consultor é Luiz Portal. Defina este valor fixo. Email do Consultor (consultantEmail):
O email do consultor é luizportal@live.com.br. Defina este valor fixo. Resumo do Diagnóstico (diagnosticSummary):
Sintetize os problemas, dificuldades, desafios e oportunidades mencionados no texto. Este resumo DEVE ser gerado em português do Brasil. INSTRUÇÕES DE EXECUÇÃO:
Analise o conteúdo do documento a seguir. Se uma informação não estiver presente, retorne uma string vazia para o campo correspondente. Formate o CPF para XXX.XXX.XXX-XX e o CNPJ para XX.XXX.XXX/0001-XX. Document Content: {{{documentContent}}}
Retorne as informações em formato JSON. Certifique-se de que o JSON é válido.`,
  });

  const { output } = await extractBusinessDataPrompt(input);

  if (!output) {
    throw new Error('Falha ao extrair os dados. O modelo de IA não retornou uma resposta.');
  }

  return output;
}