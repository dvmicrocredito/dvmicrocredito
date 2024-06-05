import pdfMake from "pdfmake/build/pdfmake";
import getBase64ImageFromURL from "./imageConverter";
import pdfFonts from "pdfmake/build/vfs_fonts";

async function PDFContrato({
  nomeCompleto,
  nomeCompletoAvalista,
  bI,
  bIAvalista,
  contacto,
  contactoAvalista,
  saldo,
  endereco,
  enderecoAvalista,
  numeroQuarteirao,
  numeroQuarteiraoAvalista,
  numeroCasa,
  numeroCasaAvalista,
  bairro,
  bairroAvalista,
  distrito,
  distritoAvalista,
  fonteRendimento,
  garantias,
  genero2,
  genero2Avalista,
  nUIT,
  nUITAvalista,
  dataNascimento,
  dataNascimentoAvalista,
  nacionalidade,
  nacionalidadeAvalista,
  estadoCivil,
  estadoCivilAvalista,
  juro,
}) {
  const mesesList = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  var currentdate = new Date();
  var datetime =
    currentdate.getDate() +
    " de " +
    mesesList[currentdate.getMonth()] +
    " de " +
    currentdate.getFullYear();
  const imagemVarivel = await getBase64ImageFromURL("/assets/images/dv.png");
  const imagemVarivel2 = await getBase64ImageFromURL(
    "/assets/images/CarrimboeAssinatura.png"
  );
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  pdfMake.fonts = {
    Roboto: {
      normal: "Roboto-Regular.ttf",
      bold: "Roboto-Medium.ttf",
      italics: "Roboto-Italic.ttf",
      bolditalics: "Roboto-Italic.ttf",
    },
  };

  const reportTitle = [];
  const details = [
    {
      image: imagemVarivel,
      width: 60,
      height: 50,
      alignment: "center",
    },
    {
      text: "DV Microcrédito",
      style: "header",
      alignment: "center",
    },
    {
      text: "CONTRATO DE MÙTUO FINANCEIRO INDIVIDUAL",
      style: "subheader",
      alignment: "center",
    },
    {
      width: 5,
      text: "\n",
    },
    // {
    //   width: 5,
    //   text: "\n",
    // },
    // {
    //   text: [
    //     {
    //       text: "MUTUANTE: DV Microcrédito",
    //       fontSize: 12,
    //       bold: true,
    //     },
    //     ", com domícilio na rua Engenheiro Carlos Morgado, Nr. 2500 R/C, Bairro Aeroporto A",
    //   ],
    //   style: "bodyDoc",
    //   alignment: "justify",
    // },
    // {
    //   width: 5,
    //   text: "\n",
    // },
    // {
    //   text: ["E"],
    //   style: "bodyDoc",
    //   alignment: "justify",
    // },
    {
      width: 5,
      text: "\n",
    },
    {
      text: [
        { text: `MUTUÁRIO: ${nomeCompleto},`, fontSize: 12, bold: true },
        ` de nacionalidade moçambicana, ${estadoCivil}, com o Bilhete de Identidade número ${bI}, com o NUIT número ${nUIT}, `,
        `residente em ${endereco} , distrito urbano de ${distrito}, Bairro ${bairro}, Quarteirão número ${numeroQuarteirao}, Casa número ${numeroCasa}, `,
        `tendo como fonte de rendimento ${fonteRendimento}, contactável pelo(s) número(s) ${contacto}, `,
      ],
      style: "bodyDoc",
      alignment: "justify",
    },
    // {
    //   width: 5,
    //   text: "\n",
    // },
    // {
    //   text: [
    //     "As partes acima identificadas têm, entre si, um contrato de mútuo financeiro individual, o qual é regulado pelas seguintes cláusulas:",
    //   ],
    //   style: "bodyDoc",
    //   alignment: "justify",
    // },
    {
      width: 5,
      text: "\n\n",
    },
    {
      text: [{ text: "(CLÁUSULA PRIMEIRA)", fontSize: 12, bold: true }],
      style: "bodyDoc",
      alignment: "center",
    },
    {
      width: 5,
      text: "\n",
    },
    {
      text: [{ text: "DO OBJECTO", fontSize: 12, bold: true }],
      style: "bodyDoc",
      alignment: "center",
    },
    {
      width: 5,
      text: "\n",
    },
    {
      text: [
        {
          text: `Este contrato tem como objecto o empréstimo de ${Intl.NumberFormat(
            "en-US",
            { style: "currency", currency: "MZN" }
          ).format(saldo)} pelo `,
        },
        { text: "MUTUANTE ", fontSize: 12, bold: true },
        { text: "ao " },
        { text: "MUTUÁRIO.", fontSize: 12, bold: true },
      ],
      style: "bodyDoc",
      alignment: "justify",
    },
    {
      width: 5,
      text: "\n\n",
    },
    {
      text: [{ text: "(CLÁUSULA SEGUNDA)", fontSize: 12, bold: true }],
      style: "bodyDoc",
      alignment: "center",
    },
    {
      width: 5,
      text: "\n",
    },
    {
      text: [{ text: "DO AVALISTA", fontSize: 12, bold: true }],
      style: "bodyDoc",
      alignment: "center",
    },
    {
      width: 5,
      text: "\n",
    },
    {
      text: [
        { text: "MUTUÁRIO ", fontSize: 12, bold: true },
        {
          text: `tem como avalista do presente contrato o(a) Sr(a) ${nomeCompletoAvalista} de nacionalidade moçambicana, ${estadoCivilAvalista}, com o `,
        },
        {
          text: `Bilhete de Identidade número ${bIAvalista}, NUIT ${nUITAvalista}, residente na ${enderecoAvalista}, distrito urbano ${distritoAvalista}, Bairro ${bairroAvalista}, Quarteirão número ${numeroQuarteiraoAvalista}, `,
        },
        {
          text: ` Casa número ${numeroCasaAvalista}, contactável pelos números ${contactoAvalista}.`,
        },
      ],
      style: "bodyDoc",
      alignment: "justify",
    },
    {
      width: 5,
      text: "\n",
    },
    {
      text: [
        { text: "PARAGRAFO ÚNICO: ", fontSize: 12, bold: true },
        {
          text: "O Avalista é responsável por dar credibilidade e segurança ao MUTUANTE, no presente contrato; este se torna, ",
        },
        {
          text: "automaticamente devedor do empréstimo solicitado pelo MUTUÁRIO no caso de não pagamento deste.__________________________________________(assinatura)",
        },
      ],
      style: "bodyDoc",
      alignment: "justify",
    },
    {
      width: 5,
      text: "\n\n",
    },
    {
      text: [{ text: "(CLÁUSULA TERCEIRA)", fontSize: 12, bold: true }],
      style: "bodyDoc",
      alignment: "center",
    },
    {
      width: 5,
      text: "\n",
    },
    {
      text: [{ text: "DOS PRAZOS E PARCELAS", fontSize: 12, bold: true }],
      style: "bodyDoc",
      alignment: "center",
    },
    {
      width: 5,
      text: "\n",
    },
    {
      text: [
        { text: "1. O empréstimo solicitado pelo " },
        { text: "MUTUÁRIO ", fontSize: 12, bold: true },
        { text: "será pago em uma parcela num período de trinta dias." },
      ],
      style: "bodyDoc",
      alignment: "justify",
    },
    {
      width: 5,
      text: "\n",
    },
    {
      text: [
        { text: "2. O " },
        { text: "MUTUÁRIO ", fontSize: 12, bold: true },
        {
          text: "obriga-se a pagar o empréstimo solicitado dentro de 30 dias uteis, contados a partir do dia seguinte à da data da assinatura do presente contrato.",
        },
      ],
      style: "bodyDoc",
      alignment: "justify",
    },
    {
      width: 5,
      text: "\n\n",
    },
    {
      text: [{ text: "(CLÁUSULA QUARTA)", fontSize: 12, bold: true }],
      style: "bodyDoc",
      alignment: "center",
    },
    {
      width: 5,
      text: "\n",
    },
    {
      text: [
        { text: "DOS JUROS E MORA DO MUTUÁRIO", fontSize: 12, bold: true },
      ],
      style: "bodyDoc",
      alignment: "center",
    },
    {
      width: 5,
      text: "\n",
    },
    {
      text: [
        { text: `1. O juro aplicado ao crédito é de ${juro}% do valor cedido` },
      ],
      style: "bodyDoc",
      alignment: "justify",
    },
    {
      width: 5,
      text: "\n",
    },
    {
      text: [
        {
          text: "2. O pagamento deverá ocorrer dentro do período estabelecido na Cláusula Quarta deste contrato, sob pena de:",
        },
      ],
      style: "bodyDoc",
      alignment: "justify",
    },
    {
      width: 5,
      text: "\n",
    },
    {
      text: [{ text: "a) Não renovação deste contrato." }],
      style: "bodyDoc",
      alignment: "justify",
    },
    {
      width: 5,
      text: "\n",
    },
    {
      text: [
        {
          text: "b) Renovação mediante o pagamento da taxa de 30% do saldo do próximo contrato solicitado pelo ",
        },
        { text: "MUTUÁRIO ", fontSize: 12, bold: true },
      ],
      style: "bodyDoc",
      alignment: "justify",
    },
    {
      width: 5,
      text: "\n",
    },
    {
      text: [
        { text: "3. Serão aplicadas multas ao " },
        { text: "MUTUÁRIO ", fontSize: 12, bold: true },
        {
          text: "sempre que não se cumprir com o formato de pagamento estabelecido na Cláusula Terceira do Paragrafo 2 (Dois) deste contrato.",
        },
      ],
      style: "bodyDoc",
      alignment: "justify",
    },
    {
      width: 5,
      text: "\n",
    },
    {
      text: [
        { text: "PARAGRAFO ÚNICO: ", fontSize: 12, bold: true },
        {
          text: "Para casos de negociação da taxa de juros, a multa será acrescentada na base da nova taxa acordada.",
        },
        {
          text: "automaticamente devedor do empréstimo solicitado pelo MUTUÁRIO no caso de não pagamento deste.",
        },
      ],
      style: "bodyDoc",
      alignment: "justify",
    },
    {
      width: 5,
      text: "\n\n",
    },
    {
      text: [{ text: "(CLÁUSULA QUINTA)", fontSize: 12, bold: true }],
      style: "bodyDoc",
      alignment: "center",
    },
    {
      width: 5,
      text: "\n",
    },
    {
      text: [{ text: "DAS AMORTIZAÇÕES", fontSize: 12, bold: true }],
      style: "bodyDoc",
      alignment: "center",
    },
    {
      width: 5,
      text: "\n",
    },
    {
      text: [
        { text: "1. O " },
        { text: "MUTUÁRIO ", fontSize: 12, bold: true },
        {
          text: "deverá efectuar o pagamento, nas datas acordadas, de forma directa ao Agente de Cobranças, devidamente identificado, designado pelo ",
        },
        { text: "MUTUANTE.", fontSize: 12, bold: true },
      ],
      style: "bodyDoc",
      alignment: "justify",
    },
    {
      width: 5,
      text: "\n",
    },
    {
      text: [
        {
          text: "O pagamento referido no paragrafo, supra, desta Cláusula será efectuado por meio de transferência para as contas Bancarias ou Móvel do",
        },
        { text: "MUTUANTE ", fontSize: 12, bold: true },
        { text: "e/ou em Numerário." },
      ],
      style: "bodyDoc",
      alignment: "justify",
    },
    {
      width: 5,
      text: "\n\n",
    },
    {
      text: [{ text: "(CLÁUSULA SEXTA)", fontSize: 12, bold: true }],
      style: "bodyDoc",
      alignment: "center",
    },
    {
      width: 5,
      text: "\n",
    },
    {
      text: [{ text: "DAS GARANTIAS", fontSize: 12, bold: true }],
      style: "bodyDoc",
      alignment: "center",
    },
    {
      width: 5,
      text: "\n",
    },
    {
      text: [
        { text: "1. O " },
        { text: "MUTUÁRIO ", fontSize: 12, bold: true },
        {
          text: "deverá colocar como garantia Bens e/ou Propriedades com valores equivalentes ao empréstimo solicitado.",
        },
      ],
      style: "bodyDoc",
      alignment: "justify",
    },
    {
      width: 5,
      text: "\n",
    },
    {
      text: [
        { text: "2. Em casos de Propriedades dadas como garantia, o " },
        { text: "MUTUÁRIO ", fontSize: 12, bold: true },
        { text: "deverá centregar ao " },
        { text: "MUTUANTE, ", fontSize: 12, bold: true },
        {
          text: "os documentos que comprovam que as Propriedades referidas pertencem ao ",
        },
        { text: "MUTUÁRIO.", fontSize: 12, bold: true },
      ],
      style: "bodyDoc",
      alignment: "justify",
    },
    {
      width: 5,
      text: "\n",
    },
    {
      text: [
        { text: "3. Em casos de incumprimento de pagamento do empréstimo o " },
        { text: "MUTUANTE ", fontSize: 12, bold: true },
        {
          text: "tomara para si todos os Bens e/ou Propriedades dadas como garantias pelo ",
        },
        { text: "MUTUÁRIO.", fontSize: 12, bold: true },
      ],
      style: "bodyDoc",
      alignment: "justify",
    },
    {
      width: 5,
      text: "\n",
    },
    {
      text: [
        { text: "4. O " },
        { text: "MUTUÁRIO ", fontSize: 12, bold: true },
        {
          text: "obriga-se ainda a indicar um Avalista devidamente identificado com um dos seguintes documentos validos: B.I., NUIT, Cartão de Eleitor, Carta de Condução ou Passaporte.",
        },
      ],
      style: "bodyDoc",
      alignment: "justify",
    },
    {
      width: 5,
      text: "\n",
    },
    {
      text: [
        {
          text: "5. O Avalista deverá colocar como garantia Bens e/ou Propriedades com valores equivalentes ao empréstimo solicitado.",
        },
      ],
      style: "bodyDoc",
      alignment: "justify",
    },
    {
      width: 5,
      text: "\n",
    },
    {
      text: [
        {
          text: "6. Em casos de Propriedades dadas como garantia, o Avalista deverá entregar ao ",
        },
        { text: "MUTUANTE ", fontSize: 12, bold: true },
        {
          text: "os documentos que comprovam que as Propriedades referidas pertencem ao Avalista.",
        },
      ],
      style: "bodyDoc",
      alignment: "justify",
    },
    {
      width: 5,
      text: "\n",
    },
    {
      text: [
        { text: "7. Em casos de incumprimento de pagamento do empréstimo o " },
        { text: "MUTUANTE ", fontSize: 12, bold: true },
        {
          text: "tomara para si todos os Bens e/ou Propriedades dadas como garantias pelo Avalista.",
        },
      ],
      style: "bodyDoc",
      alignment: "justify",
    },
    {
      width: 5,
      text: "\n",
    },
    {
      text: [
        {
          text: "8. Os Bens dados como garantias deverão ser listados em um documento e anexado a este contrato. O documento produzido deverá ter a assinatura do:",
        },
        { text: "MUTUANTE, MUTUÁRIO ", fontSize: 12, bold: true },
        { text: "e do Avalista." },
      ],
      style: "bodyDoc",
      alignment: "justify",
    },
    {
      width: 5,
      text: "\n\n",
    },
    {
      style: "tableExample",
      table: {
        widths: [100, "*", 200, "*"],
        body: [
          ["Bens", "Ano de Compra", "Descrição", "Avaliação"],
          ["1.", { text: "" }, { text: "" }, { text: "" }],
          ["2.", { text: "" }, { text: "" }, { text: "" }],
          ["3.", { text: "" }, { text: "" }, { text: "" }],
          ["4.", { text: "" }, { text: "" }, { text: "" }],
          ["5.", { text: "" }, { text: "" }, { text: "" }],
          ["6.", { text: "" }, { text: "" }, { text: "" }],
          ["7.", { text: "" }, { text: "" }, { text: "" }],
          ["8.", { text: "" }, { text: "" }, { text: "" }],
        ],
      },
    },
    {
      width: 5,
      text: "\n\n",
    },
    {
      text: [{ text: "(CLÁUSULA SÉTIMA)", fontSize: 12, bold: true }],
      style: "bodyDoc",
      alignment: "center",
    },
    {
      width: 5,
      text: "\n",
    },
    {
      text: [{ text: "DAS COBRANÇAS", fontSize: 12, bold: true }],
      style: "bodyDoc",
      alignment: "center",
    },
    {
      width: 5,
      text: "\n",
    },
    {
      text: [
        {
          text: "1. Para pagamentos em numerário o Agente de Cobranças deverá se deslocar até ao endereço do ",
        },
        { text: "MUTUÁRIO ", fontSize: 12, bold: true },
        { text: "para obter o valor do pagamento." },
      ],
      style: "bodyDoc",
      alignment: "justify",
    },
    {
      width: 5,
      text: "\n\n",
    },
    {
      text: [{ text: "(CLÁUSULA NONA)", fontSize: 12, bold: true }],
      style: "bodyDoc",
      alignment: "center",
    },
    {
      width: 5,
      text: "\n",
    },
    {
      text: [{ text: "DA VALIDADE", fontSize: 12, bold: true }],
      style: "bodyDoc",
      alignment: "center",
    },
    {
      width: 5,
      text: "\n",
    },
    {
      text: [
        {
          text: "1. O presente contrato passa a vigorar a partir da data da assinatura do mesmo e vigorará até a data da quitação da última parcela do empréstimo solicitado pelo ",
        },
        {
          text: "MUTUÁRIO._____________________________________(assinatura)",
          fontSize: 12,
          bold: true,
        },
      ],
      style: "bodyDoc",
      alignment: "justify",
    },
    {
      width: 5,
      text: "\n\n",
    },
    {
      text: [{ text: "(CLÁUSULA DÉCIMA)", fontSize: 12, bold: true }],
      style: "bodyDoc",
      alignment: "center",
    },
    {
      width: 5,
      text: "\n",
    },
    {
      text: [{ text: "DA RESOLUÇÃO DE CONFLITOS", fontSize: 12, bold: true }],
      style: "bodyDoc",
      alignment: "center",
    },
    {
      width: 5,
      text: "\n",
    },
    {
      text: [
        {
          text: "1. Em casos de incumprimento de uma das Cláusulas deste contrato o ",
        },
        { text: "MUTUANTE ", fontSize: 12, bold: true },
        {
          text: "reserva-se o direito de resolução do conflito segundo as Normas de Resolução de Conflitos vigentes na ",
        },
        {
          text: "DV Microcrédito._____________________________________(assinatura)",
          fontSize: 12,
          bold: true,
        },
      ],
      style: "bodyDoc",
      alignment: "justify",
    },
    {
      width: 5,
      text: "\n",
    },
    {
      text: [
        {
          text: "2. Em casos de ineficiência dos meios referidos no paragrafo 1 (um), supra desta Cláusula, o",
        },
        { text: "MUTUANTE ", fontSize: 12, bold: true },
        { text: "pode de forma ponderada mover um processo crime contra o " },
        { text: "MUTUÁRIO ", fontSize: 12, bold: true },
        {
          text: "no Tribunal Judicial do Distrito em causa._____________________________________(assinatura)",
        },
      ],
      style: "bodyDoc",
      alignment: "justify",
    },
    {
      width: 5,
      text: "\n",
    },
    {
      text: [
        {
          text: "Por estarem cientes do teor do presente contrato, as partes firmam o presente instrumento contratual em duas vias de igual teor.",
        },
      ],
      style: "bodyDoc",
      alignment: "justify",
    },
    {
      width: 5,
      text: "\n\n\n\n\n\n\n",
    },

    {
      alignment: "justify",
      columns: [
        {
          image: imagemVarivel2,
          width: 150,
          height: 100,
          alignment: "center",
        },
        {
          width: "*",
          alignment: "center",
          text: [
            { text: "O MUTUÁRIO\n\n", fontSize: 12, bold: true },
            { text: "______________________________" },
          ],
        },
      ],
    },
    {
      width: 5,
      text: "\n\n",
    },
    {
      text: [{ text: "Maputo, aos" }],
      style: "bodyDoc",
      alignment: "center",
    },
    {
      width: 5,
      text: "\n",
    },
    {
      text: [{ text: `${datetime}` }],
      style: "bodyDoc",
      alignment: "center",
    },
  ];
  const rodape = [];
  function Rodape(currentPage, pageCount) {
    return [
      {
        text: currentPage + " / " + pageCount,
        alignment: "right",
        fontSize: 9,
        margin: [0, 10, 20, 0],
      },
    ];
  }
  function Rodape2() {
    return [
      {
        style: "tableExample",
        table: {
          headerRows: 1,
          widths: [90, 90, "*", 150, "*"],
          body: [
            [
              { text: "Nome do Banco", style: "tableHeaderBancario" },
              { text: "Número da Conta", style: "tableHeaderBancario" },
              { text: "NIB da Conta", style: "tableHeaderBancario" },
              { text: "IBAN", style: "tableHeaderBancario" },
              { text: "SWIFT", style: "tableHeaderBancario" },
            ],
            [
              { text: "Moza Banco", style: "tableHeaderBancario" },
              { text: "3787497010001", style: "tableHeaderBancario" },
              { text: "003400003787497010180", style: "tableHeaderBancario" },
              {
                text: "MZ59003400003787497010180",
                style: "tableHeaderBancario",
              },
              { text: "MOZAMZMA", style: "tableHeaderBancario" },
            ],
          ],
        },
        layout: "noBorders",
      },
    ];
  }

  const docDefinitions = {
    pageSize: "A4",
    pageMargins: [25, 50, 20, 40],
    header: Rodape,
    content: [details],
    background: [
      {
        image: imagemVarivel,
        width: 1000,
        opacity: 0.1,
      },
    ],
    footer: Rodape2,
    styles: {
      header: {
        fontSize: 15,
        bold: true,
      },
      subheader: {
        fontSize: 12,
        bold: true,
      },
      tableExample: {
        margin: [0, 5, 0, 15],
        alignment: "center",
      },
      bodyDoc: {
        fontSize: 12,
      },
      tableHeaderBancario: {
        bold: true,
        fontSize: 7,
        color: "black",
      },
    },
  };

  pdfMake
    .createPdf(docDefinitions)
    .download(`Contracto de Solicitação de Emprestimo (${nomeCompleto}).pdf`);
}

export default PDFContrato;
