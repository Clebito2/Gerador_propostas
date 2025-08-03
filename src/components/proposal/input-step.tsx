"use client";

import { useState } from 'react';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

interface InputStepProps {
  onExtract: (text: string) => void;
}

export function InputStep({ onExtract }: InputStepProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onExtract(text);
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Vamos começar.</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Cole abaixo o diagnóstico do seu cliente. Nossa IA, AgeQuodAgis, irá extrair os dados, aplicar o framework M.A.P.C.A. e gerar uma proposta profissional completa.
        </p>
      </div>
      <div className="max-w-4xl mx-auto mt-12">
        <form onSubmit={handleSubmit}>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Cole aqui o texto do diagnóstico, transcrição da reunião, ou qualquer informação relevante sobre a empresa..."
            className="text-base min-h-[200px]"
          />
          <div className="mt-6 text-center">
            <Button type="submit" size="lg" disabled={!text.trim()} className="text-lg py-7 px-10">
              Gerar Proposta
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
