'use server';

/**
 * @fileOverview Extracts business data from various document types based on the AgeQuodAgis agent's rules.
 * @module extract-business-data
 * @description Defines the Genkit flow for extracting structured business data from unstructured text.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

/**
 * The input schema for the business data extraction flow.
 * @property {string} documentContent - The content of the document to analyze.
 */
export const ExtractBusinessDataInputSchema = z.object({
  documentContent: z.string().describe('The content of the document to analyze.'),
});
export type ExtractBusinessDataInput = z.infer<typeof ExtractBusinessDataInputSchema>;

/**
 * The output schema for the business data extraction flow.
 * @property {string} companyName - The name of the company.
 * @property {string} cnpj - The CNPJ of the company.
 * @property {string} consultantName - The name of the consultant.
 * @property {string} consultantEmail - The email of the consultant.
 * @property {string} diagnosticSummary - A summary of the business diagnostic.
 * @property {string} companyAddress - The full address of the company.
 * @property {string} companyCity - The city and state of the company.
 * @property {string} representativeName - The company's legal representative's full name.
 * @property {string} representativeCpf - The company's legal representative's CPF.
 */
export const ExtractBusinessDataOutputSchema = z.object({
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
export type ExtractBusinessDataOutput = z.infer<typeof ExtractBusinessDataOutputSchema>;

/**
 * A Genkit prompt that defines the AI's task for extracting business data.
 */
const extractBusinessDataPrompt = ai.definePrompt({
  name: 'extractBusinessDataPrompt',
  input: { schema: ExtractBusinessDataInputSchema },
  output: { schema: ExtractBusinessDataOutputSchema },
  prompt: `Você é o AgeQuodAgis, um agente especialista em extrair dados de negócios. Sua missão é analisar o conteúdo fornecido e extrair as seguintes informações com precisão.

REGRAS DE EXTRAÇÃO:

- **Nome da Empresa:** Busque por padrões como "empresa", "razão social", "nome fantasia", "companhia". Contexto: "A empresa [NOME]", "[NOME] Ltda", "[NOME] S/A". Validação: Mínimo de 2 palavras.
- **CNPJ:** Formato esperado: XX.XXX.XXX/0001-XX. Busque por variações como XXXXXXXXX0001XX ou com espaços. Validação: Deve ter exatamente 14 dígitos numéricos.
- **Endereço da Empresa (companyAddress):** Componentes: Logradouro, número, bairro, cidade, estado, CEP. Busque por padrões como "endereço", "localizada em", "situada em", "sede". Validação: Deve ser o endereço completo.
- **Cidade/UF da Empresa (companyCity):** Extraia apenas a Cidade e o Estado do endereço completo. Ex: "Goiânia/GO".
- **Nome do Representante Legal (representativeName):** Busque por padrões como "representante", "responsável", "diretor", "sócio", "proprietário". Contexto: "Sr(a).", "Dr(a).". Validação: Deve ser um nome completo (mínimo de 2 palavras).
- **CPF do Representante Legal (representativeCpf):** Formato esperado: XXX.XXX.XXX-XX. Busque por variações com 11 dígitos numéricos. Validação: Deve ter exatamente 11 dígitos numéricos.
- **Nome do Consultor (consultantName):** O nome do consultor é Luiz Portal. Defina este valor fixo.
- **Email do Consultor (consultantEmail):** O email do consultor é luizportal@live.com.br. Defina este valor fixo.
- **Resumo do Diagnóstico (diagnosticSummary):** Sintetize os problemas, dificuldades, desafios e oportunidades mencionados no texto. Este resumo DEVE ser gerado em português do Brasil.

INSTRUÇÕES DE EXECUÇÃO:

1.  Analise o conteúdo do documento a seguir.
2.  Se uma informação não estiver presente, retorne uma string vazia para o campo correspondente.
3.  Formate o CPF para XXX.XXX.XXX-XX e o CNPJ para XX.XXX.XXX/0001-XX.
4.  Document Content: {{{documentContent}}}
5.  Retorne as informações em formato JSON. Certifique-se de que o JSON é válido.`,
});

/**
 * The main Genkit flow for extracting business data.
 * @param {ExtractBusinessDataInput} input - The input data for the flow.
 * @returns {Promise<ExtractBusinessDataOutput>} The extracted business data.
 */
export const extractBusinessData = ai.defineFlow(
  {
    name: 'extractBusinessDataFlow',
    inputSchema: ExtractBusinessDataInputSchema,
    outputSchema: ExtractBusinessDataOutputSchema,
  },
  async input => {
    const { output } = await extractBusinessDataPrompt(input);
    return output!;
  }
);
