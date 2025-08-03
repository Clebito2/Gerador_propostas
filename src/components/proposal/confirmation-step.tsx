"use client";

import { useState, useEffect } from 'react';
import type { ExtractedData } from '@/lib/types';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface ConfirmationStepProps {
  data: ExtractedData;
  onConfirm: (data: ExtractedData) => void;
  onBack: () => void;
}

export function ConfirmationStep({ data, onConfirm, onBack }: ConfirmationStepProps) {
  const [formData, setFormData] = useState<ExtractedData>(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(formData);
  }

  return (
    <div className="animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Confirme os Dados Extraídos</h2>
        <p className="text-muted-foreground mt-2">Revise as informações extraídas pela IA. Corrija o que for necessário para garantir a precisão da proposta.</p>
      </div>

      <Card className="max-w-4xl mx-auto mt-12 bg-card/50">
        <CardHeader>
            <CardTitle>✅ Dados Extraídos</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label htmlFor="companyName">🏢 Nome da Empresa</Label>
                <Input id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input id="cnpj" name="cnpj" value={formData.cnpj} onChange={handleChange} />
              </div>
               <div className="space-y-2">
                <Label htmlFor="consultantName">👨‍💼 Nome do Consultor</Label>
                <Input id="consultantName" name="consultantName" value={formData.consultantName} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="consultantEmail">Email do Consultor</Label>
                <Input id="consultantEmail" name="consultantEmail" type="email" value={formData.consultantEmail} onChange={handleChange} />
              </div>
               <div className="space-y-2">
                <Label htmlFor="companyAddress">📍 Endereço da Empresa</Label>
                <Input id="companyAddress" name="companyAddress" value={formData.companyAddress || ''} onChange={handleChange} />
              </div>
               <div className="space-y-2">
                <Label htmlFor="companyCity">📍 Cidade/UF</Label>
                <Input id="companyCity" name="companyCity" value={formData.companyCity || ''} onChange={handleChange} />
              </div>
               <div className="space-y-2">
                <Label htmlFor="representativeName">👤 Nome do Representante Legal</Label>
                <Input id="representativeName" name="representativeName" value={formData.representativeName || ''} onChange={handleChange} />
              </div>
               <div className="space-y-2">
                <Label htmlFor="representativeCpf">CPF do Representante Legal</Label>
                <Input id="representativeCpf" name="representativeCpf" value={formData.representativeCpf || ''} onChange={handleChange} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="diagnosticSummary">📋 Resumo do Diagnóstico</Label>
                <Textarea id="diagnosticSummary" name="diagnosticSummary" value={formData.diagnosticSummary} onChange={handleChange} rows={5} />
              </div>
            </div>

            <div className="flex justify-between items-center mt-8">
              <Button type="button" variant="outline" onClick={onBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
              <Button type="submit" size="lg">
                Confirmar e Gerar Proposta
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
