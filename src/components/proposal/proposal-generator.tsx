"use client";

import { useState } from 'react';
import type { ExtractedData, ProposalData, GanttChartItem, ActionPlanItem } from '@/lib/types';
import { extractBusinessData } from '@/ai/flows/extract-business-data';
import { generateMAPCAAnalysis } from '@/ai/flows/generate-mapca-analysis';

import { InputStep } from './input-step';
import { ConfirmationStep } from './confirmation-step';
import { ProposalView } from './proposal-view';
import { Loader } from '../ui/loader';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from 'lucide-react';

type Step = 'input' | 'confirming' | 'generating' | 'viewing' | 'error';

export function ProposalGenerator() {
  const [step, setStep] = useState<Step>('input');
  const [inputText, setInputText] = useState<string>('');
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [proposalData, setProposalData] = useState<ProposalData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleExtract = async (text: string) => {
    setInputText(text);
    setStep('generating');
    setError(null);

    try {
      const result = await extractBusinessData({ documentContent: text });
      if (result) {
        setExtractedData(result);
        setStep('confirming');
        toast({
            title: "Dados Extraídos com Sucesso!",
            description: "Por favor, revise e confirme as informações.",
        });
      } else {
        throw new Error("A extração de dados falhou em retornar um resultado.");
      }
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : "Ocorreu um erro desconhecido.";
      setError(`Falha na extração de dados: ${errorMessage}`);
      setStep('error');
    }
  };

  const handleConfirm = async (confirmedData: ExtractedData) => {
    setExtractedData(confirmedData);
    setStep('generating');
    setError(null);

    try {
      const analysisResult = await generateMAPCAAnalysis({
        companyName: confirmedData.companyName,
        cnpj: confirmedData.cnpj,
        diagnostics: confirmedData.diagnosticSummary,
      });

      // **INÍCIO DA CORREÇÃO**
      // 1. Extrai os arrays de 'actionPlan' e 'ganttChart' de dentro do resultado da IA.
      const { actionPlan, ganttChart } = analysisResult;

      // 2. Com o 'ganttChart' agora preenchido, calcula o custo total.
      const totalCost = ganttChart.reduce((acc, item) => acc + item.preco, 0);
      // **FIM DA CORREÇÃO**

      const fullProposalData: ProposalData = {
        cliente: {
          nomeCompleto: confirmedData.companyName,
          cnpj: confirmedData.cnpj,
          endereco: confirmedData.companyAddress,
          cidade: confirmedData.companyCity,
          representanteNome: confirmedData.representativeName,
          representanteCpf: confirmedData.representativeCpf
        },
        proposta: {
          consultorNome: confirmedData.consultantName,
          consultorEmail: confirmedData.consultantEmail,
          dataApresentacao: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }),
        },
        diagnostico: confirmedData.diagnosticSummary,
        mapcaAnalysis: analysisResult.mapcaAnalysis,
        planoDeAcao: actionPlan, // Variável corrigida
        ganttChart: ganttChart,   // Variável corrigida
        escopoDetalhado: ganttChart.map((item: GanttChartItem) => ({
            titulo: item.entregavel,
            detalhes: `Responsável: ${item.responsavel} | Prazo: ${item.prazo}`
        })),
        investimento: {
          valorTotalNumerico: totalCost, // Variável corrigida
          valorTotalExtenso: "A ser preenchido",
          formaPagamento: "50% na assinatura do contrato e 50% na entrega final.",
          items: ganttChart.map((item: GanttChartItem) => ({ name: item.entregavel, value: item.preco }))
        },
      };

      setProposalData(fullProposalData);
      setStep('viewing');
        toast({
            title: "Proposta Gerada com Sucesso!",
            description: "Sua proposta profissional está pronta.",
        });

    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : "Ocorreu um erro desconhecido.";
      setError(`Falha na geração da análise: ${errorMessage}`);
      setStep('error');
    }
  };

  const handleBack = () => {
    setError(null);
    setStep('input');
  }

  const handleReset = () => {
    setStep('input');
    setInputText('');
    setExtractedData(null);
    setProposalData(null);
    setError(null);
  };

  const renderStep = () => {
    switch (step) {
      case 'input':
        return <InputStep onExtract={handleExtract} />;
      case 'confirming':
        return extractedData && <ConfirmationStep data={extractedData} onConfirm={handleConfirm} onBack={handleBack} />;
      case 'generating':
        return <Loader text="Analisando e gerando proposta... Por favor, aguarde." />;
      case 'viewing':
        return proposalData && <ProposalView data={proposalData} onReset={handleReset} />;
      case 'error':
        return (
            <Alert variant="destructive" className="max-w-2xl mx-auto">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Ocorreu um Erro</AlertTitle>
                <AlertDescription>
                    {error}
                </AlertDescription>
            </Alert>
        )
      default:
        return null;
    }
  };

  return (
    <div className="mt-8">
      {renderStep()}
    </div>
  );
}