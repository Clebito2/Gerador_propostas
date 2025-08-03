export interface ActionPlanItem {
  etapa: string;
  titulo: string;
  descricao: string;
  duracao: string;
}

export interface GanttChartItem {
  etapa: string;
  entregavel: string;
  responsavel: string;
  prazo: string;
  preco: number;
}

export interface ExtractedData {
  companyName: string;
  cnpj: string;
  consultantName: string;
  consultantEmail: string;
  diagnosticSummary: string;
  companyAddress: string;
  companyCity: string;
  representativeName: string;
  representativeCpf: string;
}

export interface ProposalData {
  cliente: {
    nomeCompleto: string;
    cnpj: string;
    endereco: string;
    cidade: string;
    representanteNome: string;
    representanteCpf: string;
  };
  proposta: {
    consultorNome: string;
    consultorEmail: string;
    dataApresentacao: string;
  };
  diagnostico: string;
  mapcaAnalysis: string;
  planoDeAcao: ActionPlanItem[];
  ganttChart: GanttChartItem[];
  escopoDetalhado: {
    titulo: string;
    detalhes: string;
  }[];
  investimento: {
    valorTotalNumerico: number;
    valorTotalExtenso: string;
    formaPagamento: string;
    items: {
      name: string;
      value: number;
    }[];
  };
}
