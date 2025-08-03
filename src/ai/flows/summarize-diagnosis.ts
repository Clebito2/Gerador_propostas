'use server';
/**
 * @fileOverview Summarizes a business diagnosis, highlighting key problems and opportunities.
 * @module summarize-diagnosis
 * @description Defines a Genkit flow for summarizing business diagnostic text.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

/**
 * The input schema for the diagnosis summarization flow.
 * @property {string} diagnosis - The detailed diagnosis of the business.
 */
export const SummarizeDiagnosisInputSchema = z.object({
  diagnosis: z.string().describe('The detailed diagnosis of the business.'),
});
export type SummarizeDiagnosisInput = z.infer<typeof SummarizeDiagnosisInputSchema>;

/**
 * The output schema for the diagnosis summarization flow.
 * @property {string} summary - A concise and insightful summary of the business diagnosis.
 */
export const SummarizeDiagnosisOutputSchema = z.object({
  summary: z.string().describe('A concise and insightful summary of the business diagnosis.'),
});
export type SummarizeDiagnosisOutput = z.infer<typeof SummarizeDiagnosisOutputSchema>;

/**
 * A Genkit prompt that defines the AI's task for summarizing the diagnosis.
 */
const prompt = ai.definePrompt({
  name: 'summarizeDiagnosisPrompt',
  input: { schema: SummarizeDiagnosisInputSchema },
  output: { schema: SummarizeDiagnosisOutputSchema },
  prompt: `You are an expert business consultant. Summarize the following business diagnosis, highlighting key problems and opportunities in a concise and insightful way.

Diagnosis: {{{diagnosis}}}`,
});

/**
 * The main Genkit flow for summarizing a business diagnosis.
 * @param {SummarizeDiagnosisInput} input - The input data for the flow.
 * @returns {Promise<SummarizeDiagnosisOutput>} The summarized diagnosis.
 */
export const summarizeDiagnosis = ai.defineFlow(
  {
    name: 'summarizeDiagnosisFlow',
    inputSchema: SummarizeDiagnosisInputSchema,
    outputSchema: SummarizeDiagnosisOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
