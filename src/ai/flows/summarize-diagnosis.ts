'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const SummarizeDiagnosisInputSchema = z.object({
  diagnosis: z.string().describe('The detailed diagnosis of the business.'),
});

const SummarizeDiagnosisOutputSchema = z.object({
  summary: z.string().describe('A concise and insightful summary of the business diagnosis.'),
});

export type SummarizeDiagnosisInput = z.infer<typeof SummarizeDiagnosisInputSchema>;
export type SummarizeDiagnosisOutput = z.infer<typeof SummarizeDiagnosisOutputSchema>;

export async function summarizeDiagnosis(
  input: SummarizeDiagnosisInput
): Promise<SummarizeDiagnosisOutput> {
  const prompt = ai.definePrompt({
    name: 'summarizeDiagnosisPrompt',
    input: { schema: SummarizeDiagnosisInputSchema },
    output: { schema: SummarizeDiagnosisOutputSchema },
    prompt: `You are an expert business consultant. Summarize the following business diagnosis, highlighting key problems and opportunities in a concise and insightful way.
Diagnosis: {{{diagnosis}}}`,
  });

  const { output } = await prompt(input);

  if (!output) {
    throw new Error('Falha ao sumarizar o diagnóstico.');
  }
  return output;
}