"use client";

import type { ProposalData } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "../ui/button";
import { CheckCircle, Briefcase, DollarSign, ArrowLeft, FileText, GanttChartSquare, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ProposalViewProps {
  data: ProposalData;
  onReset: () => void;
}

export function ProposalView({ data, onReset }: ProposalViewProps) {

const handleOpenContract = () => {
    try {
        localStorage.setItem('proposalData', JSON.stringify(data));
        window.open('/contract', '_blank');
    } catch (error) {
        console.error("Falha ao salvar dados da proposta no localStorage", error);
        alert("Não foi possível abrir o contrato. Por favor, tente novamente.");
    }
};

const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);


return (
    <div className="animate-in fade-in duration-500">
        <section className="relative py-24 text-center text-white bg-gradient-to-br from-background to-secondary">
             <div className="absolute inset-0 bg-background/80"></div>
             <div className="relative container mx-auto px-4">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                    Plano de Ação e Proposta <br className="hidden md:block" /> para <span id="proposal-client-name" className="text-brand-green">{data.cliente.nomeCompleto}</span>
                </h1>
                <p className="mt-4 text-lg md:text-xl text-gray-300">Apresentado em: <span id="proposal-date">{data.proposta.dataApresentacao}</span></p>
                <div className="flex justify-center gap-4 mt-8">
                     <Button onClick={onReset} variant="outline" className="bg-transparent">
                        <ArrowLeft className="mr-2 h-4 w-4"/>
                        Gerar Nova Proposta
                    </Button>
                    <Button onClick={handleOpenContract}>
                        <FileText className="mr-2 h-4 w-4"/>
                        Visualizar Contrato
                    </Button>
                </div>
            </div>
        </section>

        <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 md:px-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Diagnóstico Estratégico</h2>
                    <p className="mt-2 text-gray-400">Um resumo claro dos desafios e oportunidades que identificamos.</p>
                </div>
                <div className="max-w-3xl mx-auto bg-card p-8 rounded-lg shadow-lg text-lg text-gray-300 leading-relaxed font-brand-secondary italic border-l-4 border-primary">
                    <p>"{data.diagnostico}"</p>
                </div>
            </div>
        </section>

        <section className="py-16 md:py-24" style={{backgroundColor: "#0a1e32", backgroundImage: "radial-gradient(rgba(200, 200, 200, 0.05) 1px, transparent 1px)", backgroundSize: "15px 15px"}}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold">Nosso Plano de Ação (Macro)</h2>
                    <p className="mt-2 text-gray-400">As grandes etapas para impulsionar seus resultados.</p>
                </div>
                 <div className="flex flex-wrap items-stretch justify-center gap-8">
                    {data.planoDeAcao.map((passo, index) => (
                         <div key={index} className="relative flex-shrink-0 w-full md:w-72 py-8">
                            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-primary/30 hidden md:block" style={{ transform: "translateY(-50%)", zIndex: 0 }}></div>
                            <div className="relative flex flex-col items-center h-full">
                                <div className="z-10 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg ring-8 ring-background">{passo.etapa}</div>
                                <Card className="mt-4 p-4 text-center bg-card flex-grow w-full flex flex-col">
                                    <CardHeader className="p-2">
                                        <CardTitle className="text-lg">{passo.titulo}</CardTitle>
                                        <time className="text-sm text-gray-400 font-medium">{passo.duracao}</time>
                                    </CardHeader>
                                    <CardContent className="p-2 text-sm text-gray-300 flex-grow">
                                        <p>{passo.descricao}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

         <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold">Cronograma de Entregáveis</h2>
                    <p className="mt-2 text-gray-400">Previsão de tempo e responsáveis para cada fase do projeto.</p>
                </div>
                 <Card className="max-w-4xl mx-auto bg-card/50">
                    <CardContent className="p-6">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Etapa</TableHead>
                                    <TableHead>Entregável</TableHead>
                                    <TableHead>Responsável</TableHead>
                                    <TableHead className="text-right">Prazo</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.ganttChart.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{item.etapa}</TableCell>
                                        <TableCell>{item.entregavel}</TableCell>
                                        <TableCell>{item.responsavel}</TableCell>
                                        <TableCell className="text-right">{item.prazo}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </section>

        <section id="proposal" className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 md:px-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Detalhes da Parceria</h2>
                    <p className="mt-2 text-gray-400">Consulte o escopo e o investimento.</p>
                </div>

                <Tabs defaultValue="investment" className="max-w-5xl mx-auto">
                    <TabsList className="grid w-full grid-cols-2 bg-secondary/50">
                        <TabsTrigger value="scope"><Briefcase className="mr-2 h-4 w-4"/>Escopo Detalhado</TabsTrigger>
                        <TabsTrigger value="investment"><DollarSign className="mr-2 h-4 w-4"/>Investimento</TabsTrigger>
                    </TabsList>
                    <TabsContent value="scope" className="mt-8">
                         <Card className="bg-card/50">
                            <CardContent className="p-6">
                                <ul className="space-y-4">
                                {data.escopoDetalhado.map((item, index) => (
                                    <li key={index} className="flex items-start">
                                         <CheckCircle className="mr-3 h-6 w-6 mt-1 text-primary flex-shrink-0"/>
                                         <div>
                                             <h4 className="font-semibold text-lg">{item.titulo}</h4>
                                             <p className="text-gray-400">{item.detalhes}</p>
                                         </div>
                                    </li>
                                ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="investment" className="mt-8">
                        <Card className="bg-card/50">
                            <CardHeader>
                                <CardTitle className="text-2xl">Estrutura de Investimento</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Entregável</TableHead>
                                            <TableHead className="text-right">Valor</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {data.investimento.items.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{item.name}</TableCell>
                                                <TableCell className="text-right">{formatCurrency(item.value)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>

                                 <div className="text-center py-8 bg-background/50 rounded-lg mt-6">
                                    <p className="text-gray-400 text-lg">Valor Total do Projeto</p>
                                    <p className="text-5xl font-bold text-brand-green mt-2">
                                        {formatCurrency(data.investimento.valorTotalNumerico)}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg mb-2">Condições de Pagamento:</h4>
                                    <p className="text-gray-300">{data.investimento.formaPagamento}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    </div>
);
}
