"use client";

import { useEffect, useState } from 'react';
import type { ProposalData } from '@/lib/types';
import { CONTRACT_TEMPLATE } from '@/lib/contract-template';
import { Loader } from '@/components/ui/loader';

export default function ContractPage() {
  const [htmlContent, setHtmlContent] = useState<string | null>(null);

  useEffect(() => {
    try {
      const dataString = localStorage.getItem('proposalData');
      if (dataString) {
        const data: ProposalData = JSON.parse(dataString);

        const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
        const formatDate = (date: Date) => date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });

        let filledTemplate = CONTRACT_TEMPLATE;

        const replacements: Record<string, string> = {
            '\\[CONTRATANTE_RAZAO_SOCIAL\\]': data.cliente.nomeCompleto,
            '\\[CONTRATANTE_CNPJ\\]': data.cliente.cnpj,
            '\\[CONTRATANTE_ENDERECO\\]': data.cliente.endereco,
            '\\[CONTRATANTE_REPRESENTANTE_NOME\\]': data.cliente.representanteNome,
            '\\[CONTRATANTE_REPRESENTANTE_CPF\\]': data.cliente.representanteCpf,
            '\\[CONTRATADA_CONSULTOR_NOME\\]': data.proposta.consultorNome,
            '\\[CONTRATADA_CONSULTOR_EMAIL\\]': data.proposta.consultorEmail,
            '\\[PROJETO_VALOR_TOTAL_NUMERICO\\]': new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2 }).format(data.investimento.valorTotalNumerico),
            '\\[PROJETO_VALOR_TOTAL_EXTENSO\\]': data.investimento.valorTotalExtenso,
            '\\[PROJETO_FORMA_PAGAMENTO\\]': data.investimento.formaPagamento,
            '\\[PROJETO_PRAZO_TOTAL\\]': `${data.planoDeAcao.reduce((acc, item) => acc + parseInt(item.duracao.replace(/[^0-9]/g, '')), 0)} semanas (estimado)`,
            '\\[LOCAL_DATA\\]': `${data.cliente.cidade}, ${formatDate(new Date())}`,
        };

        for (const placeholder in replacements) {
            filledTemplate = filledTemplate.replace(new RegExp(placeholder, 'g'), replacements[placeholder]);
        }

        const escopoHtml = data.ganttChart.map(item =>
          `<div class="scope-item"><div class="scope-item-title">${item.entregavel}</div><div>Responsável: ${item.responsavel} | Prazo: ${item.prazo}</div></div>`
        ).join('');

        filledTemplate = filledTemplate.replace('\\[PROJETO_ESCOPO_DETALHADO_ITEMS\\]', escopoHtml);

        setHtmlContent(filledTemplate);
      }
    } catch (error) {
        console.error("Falha ao carregar ou analisar os dados do contrato:", error);
        setHtmlContent("<body><h1>Erro ao carregar o contrato.</h1><p>Os dados da proposta não foram encontrados ou estão corrompidos. Por favor, tente gerar a proposta novamente.</p></body>");
    }
  }, []);

  if (!htmlContent) {
    return <div className="flex items-center justify-center h-screen bg-background text-foreground"><Loader text="Carregando contrato..." /></div>;
  }

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}
