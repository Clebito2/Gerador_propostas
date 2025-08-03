import { ProposalGenerator } from '@/components/proposal/proposal-generator';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <main className="container mx-auto px-4 py-12 md:py-24">
        <div className="text-center">
          <Image
            src="/logo.png"
            alt="Logo Live Liderança & Vendas"
            width={120}
            height={120}
            className="mx-auto mb-6"
          />
          <h1 className="text-4xl md:text-5xl font-bold text-brand-green">
            AgeQuodAgis
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            Diagnóstico inicial
          </p>
        </div>
        <ProposalGenerator />
      </main>
      <footer className="text-center py-8 text-gray-500">
        <Image
            src="/logo-live.svg"
            alt="Logo Live"
            width={100}
            height={40}
            className="mx-auto mb-4"
          />
        <p>Live Liderança & Vendas</p>
        <p className="text-sm">Alta performance começa com atitude.</p>
        <p className="text-sm mt-2">(62) 98400-2840 | luizportal@live.com.br</p>
        <p className="text-xs mt-6">Desenvolvido por Cléber Donato</p>
      </footer>
    </>
  );
}
