export const CONTRACT_TEMPLATE = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contrato de Prestação de Serviços</title>
    <style>
        body {
            font-family: 'Times New Roman', Times, serif;
            line-height: 1.6;
            margin: 0;
            padding: 40px;
            background-color: #f9f9f9;
            color: #333;
        }
        .container {
            max-width: 800px;
            margin: auto;
            background: white;
            padding: 40px;
            border: 1px solid #ddd;
            box-shadow: 0 0 10px rgba(0,0,0,0.05);
        }
        h1, h2 {
            text-align: center;
            font-weight: bold;
            text-transform: uppercase;
        }
        h1 {
            font-size: 16pt;
        }
        h2 {
            font-size: 14pt;
            margin-top: 30px;
            margin-bottom: 20px;
            border-bottom: 1px solid #ccc;
            padding-bottom: 10px;
        }
        p {
            text-align: justify;
            margin-bottom: 12px;
        }
        .clausula {
            margin-bottom: 20px;
        }
        .clausula-titulo {
            font-weight: bold;
            display: block;
            margin-bottom: 5px;
        }
        .party-block {
            margin-bottom: 20px;
            padding: 15px;
            border: 1px solid #eee;
            background-color: #fcfcfc;
        }
        .party-title {
            font-weight: bold;
            font-size: 13pt;
        }
        .signatures {
            margin-top: 80px;
            display: flex;
            justify-content: space-around;
        }
        .signature-block {
            text-align: center;
            width: 45%;
        }
        .signature-line {
            border-bottom: 1px solid #333;
            margin-top: 60px;
            margin-bottom: 10px;
        }
        .scope-item {
            padding: 10px;
            border-bottom: 1px solid #eee;
        }
        .scope-item-title {
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>CONTRATO DE PRESTAÇÃO DE SERVIÇOS DE CONSULTORIA EMPRESARIAL</h1>

        <div class="party-block">
            <p class="party-title">CONTRATANTE:</p>
            <p><strong>Razão Social:</strong> [CONTRATANTE_RAZAO_SOCIAL]</p>
            <p><strong>CNPJ:</strong> [CONTRATANTE_CNPJ]</p>
            <p><strong>Endereço:</strong> [CONTRATANTE_ENDERECO]</p>
            <p>Neste ato representada por seu representante legal:</p>
            <p><strong>Nome:</strong> [CONTRATANTE_REPRESENTANTE_NOME]</p>
            <p><strong>CPF:</strong> [CONTRATANTE_REPRESENTANTE_CPF]</p>
        </div>

        <div class="party-block">
            <p class="party-title">CONTRATADA:</p>
            <p><strong>Consultor:</strong> [CONTRATADA_CONSULTOR_NOME]</p>
            <p><strong>Email:</strong> [CONTRATADA_CONSULTOR_EMAIL]</p>
        </div>

        <p>As partes acima identificadas têm, entre si, justo e acertado o presente Contrato de Prestação de Serviços de Consultoria, que se regerá pelas cláusulas seguintes e pelas condições descritas no presente.</p>

        <h2>CLÁUSULA 1ª - DO OBJETO DO CONTRATO</h2>
        <div class="clausula">
            <p>O presente contrato tem como objeto a prestação de serviços de consultoria empresarial pela CONTRATADA à CONTRATANTE, com foco na análise, planejamento e implementação de melhorias nos processos de gestão, conforme detalhado no escopo do projeto.</p>
        </div>

        <h2>CLÁUSULA 2ª - DO ESCOPO DOS SERVIÇOS</h2>
        <div class="clausula">
            <p>Os serviços a serem prestados consistem nos seguintes entregáveis:</p>
            <div id="projeto-escopo">
                [PROJETO_ESCOPO_DETALHADO_ITEMS]
            </div>
        </div>

        <h2>CLÁUSULA 3ª - DO PRAZO</h2>
        <div class="clausula">
            <p>O prazo estimado para a conclusão de todos os serviços descritos na Cláusula 2ª é de <strong>[PROJETO_PRAZO_TOTAL]</strong>, a contar da data de assinatura deste contrato, podendo ser prorrogado mediante acordo entre as partes.</p>
        </div>

        <h2>CLÁUSULA 4ª - DO VALOR E DA FORMA DE PAGAMENTO</h2>
        <div class="clausula">
            <p>Pelos serviços prestados, a CONTRATANTE pagará à CONTRATADA o valor total de <strong>R$ [PROJETO_VALOR_TOTAL_NUMERICO] ([PROJETO_VALOR_TOTAL_EXTENSO])</strong>.</p>
            <p>O pagamento será efetuado da seguinte forma: <strong>[PROJETO_FORMA_PAGAMENTO]</strong>.</p>
        </div>

        <h2>CLÁUSULA 5ª - DAS OBRIGAÇÕES</h2>
        <div class="clausula">
            <p><strong>Da CONTRATANTE:</strong> Fornecer todas as informações e documentos necessários para a execução dos serviços, bem como garantir o acesso às suas instalações e pessoal relevante.</p>
            <p><strong>Da CONTRATADA:</strong> Prestar os serviços com zelo, diligência e competência técnica, mantendo sigilo sobre todas as informações da CONTRATANTE.</p>
        </div>

        <h2>CLÁUSULA 6ª - DO FORO</h2>
        <div class="clausula">
            <p>Para dirimir quaisquer controvérsias oriundas do CONTRATO, as partes elegem o foro da comarca de [LOCAL_DATA].</p>
        </div>

        <p>E, por estarem assim justos e contratados, firmam o presente instrumento, em duas vias de igual teor, na presença de duas testemunhas.</p>

        <p style="text-align: center; margin-top: 40px;">[LOCAL_DATA]</p>

        <div class="signatures">
            <div class="signature-block">
                <div class="signature-line"></div>
                <p>[CONTRATANTE_RAZAO_SOCIAL]</p>
                <p>[CONTRATANTE_REPRESENTANTE_NOME]</p>
            </div>
            <div class="signature-block">
                <div class="signature-line"></div>
                <p>[CONTRATADA_CONSULTOR_NOME]</p>
            </div>
        </div>
    </div>
</body>
</html>
`;
