import pdfMake from "pdfmake/build/pdfmake";
import getBase64ImageFromURL from "./imageConverter";
import pdfFonts from "pdfmake/build/vfs_fonts";

async function ExtractoPDF({
  emprestimoLista,
  totalInvestido,
  totalRecPrincipal,
  totalRecJuros,
  totalProvJuros,
  totalAtraso,
  totalAReceber,
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

  const items = emprestimoLista.map((item) => {
    return [
      { text: item.createdAt.substring(0, 10), style: "tablebode" },
      { text: item.nomeCompleto, style: "tablebode" },
      {
        text:
          parseFloat(item.totalEmprestimo).toLocaleString("en-US", {
            minimumFractionDigits: 2,
          }) + "Mt",
        style: "tablebode",
      },
      { text: item.jurosEmprestimo + "%", style: "tablebode" },
      {
        text:
          (
            (parseFloat(item.jurosEmprestimo) / 100) *
            parseFloat(item.totalEmprestimo)
          ).toLocaleString("en-US", {
            minimumFractionDigits: 2,
          }) + "Mt",
        style: "tablebode",
      },
      {
        text:
          (
            parseFloat(item.totalEmprestimo) +
            (parseFloat(item.jurosEmprestimo) / 100) *
              parseFloat(item.totalEmprestimo)
          ).toLocaleString("en-US", {
            minimumFractionDigits: 2,
          }) + "Mt",
        style: "tablebode",
      },
      { text: item.multaDia + "%", style: "tablebode" },
      {
        text:
          (
            (parseFloat(item.multaDia) / 100) *
            parseFloat(item.totalEmprestimo)
          ).toLocaleString("en-US", {
            minimumFractionDigits: 2,
          }) + "Mt",
        style: "tablebode",
      },
      { text: item.totalParcelas, style: "tablebode" },
      { text: item.totalParcelas2, style: "tablebode" },
      {
        text:
          (
            ((parseFloat(item.totalEmprestimo) +
              (parseFloat(item.jurosEmprestimo) / 100) *
                parseFloat(item.totalEmprestimo)) /
              parseFloat(item.totalParcelas)) *
            parseFloat(item.totalParcelas2)
          ).toLocaleString("en-US", {
            minimumFractionDigits: 2,
          }) + "Mt",
        style: "tablebode",
      },
      {
        text:
          (
            (parseFloat(item.totalEmprestimo) /
              parseFloat(item.totalParcelas)) *
            parseFloat(item.totalParcelas2)
          ).toLocaleString("en-US", {
            minimumFractionDigits: 2,
          }) + "Mt",
        style: "tablebode",
      },
      {
        text:
          (
            (((parseFloat(item.jurosEmprestimo) / 100) *
              parseFloat(item.totalEmprestimo)) /
              parseFloat(item.totalParcelas)) *
            parseFloat(item.totalParcelas2)
          ).toLocaleString("en-US", {
            minimumFractionDigits: 2,
          }) + "Mt",
        style: "tablebode",
      },
      { text: item.atrasoV, style: "tablebode" },
      {
        text:
          parseFloat(item.atraso).toLocaleString("en-US", {
            minimumFractionDigits: 2,
          }) + "Mt",
        style: "tablebode",
      },
      {
        text:
          (
            parseFloat(item.totalEmprestimo) +
            (parseFloat(item.jurosEmprestimo) / 100) *
              parseFloat(item.totalEmprestimo) -
            ((parseFloat(item.totalEmprestimo) +
              (parseFloat(item.jurosEmprestimo) / 100) *
                parseFloat(item.totalEmprestimo)) /
              parseFloat(item.totalParcelas)) *
              parseFloat(item.totalParcelas2) +
            parseFloat(item.atraso)
          ).toLocaleString("en-US", {
            minimumFractionDigits: 2,
          }) + "Mt",
        style: "tablebode",
      },
    ];
  });
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
      text: "EXTRACTO DE PAGAMENTOS",
      style: "subheader",
      alignment: "center",
    },
    {
      width: 5,
      text: "\n",
    },
    {
      columns: [
        {
          text: [
            { text: "Total Investido: ", style: "subheader" },
            {
              text: `${parseFloat(totalInvestido).toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })} Mt\n`,
              style: "titleTTT",
            },
            { text: "Rec. Principal: ", style: "subheader" },
            {
              text: `${parseFloat(totalRecPrincipal).toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })} Mt\n`,
              style: "titleTTT",
            },
          ],
        },
        {
          alignment: "center",
          text: [
            { text: "Rec. Juros: ", style: "subheader" },
            {
              text: `${parseFloat(totalRecJuros).toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })} Mt\n`,
              style: "titleTTT",
            },
            { text: "Prov. Juros: ", style: "subheader" },
            {
              text: `${parseFloat(totalProvJuros).toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })} Mt\n`,
              style: "titleTTT",
            },
          ],
        },
        {
          alignment: "right",
          text: [
            { text: "Total Atraso: ", style: "subheader" },
            {
              text: `${parseFloat(totalAtraso).toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })} Mt\n`,
              style: "titleTTT",
            },
            { text: "Total a Receber: ", style: "subheader" },
            {
              text: `${parseFloat(totalAReceber).toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })} Mt\n`,
              style: "titleTTT",
            },
          ],
        },
      ],
    },
    {
      width: 5,
      text: "\n",
    },
    {
      style: "tableExample",
      table: {
        headerRows: 1,
        widths: [
          "*",
          250,
          "*",
          "*",
          "*",
          "*",
          "*",
          "*",
          "*",
          "*",
          "*",
          "*",
          "*",
          "*",
          "*",
          "*",
        ],
        body: [
          [
            { text: "Data", style: "tablebode" },
            { text: "Nome do Cliente", style: "tablebode" },
            { text: "Empréstimo", style: "tablebode" },
            { text: "Juros(%)", style: "tablebode" },
            { text: "Juros(Mt)", style: "tablebode" },
            { text: "Divida Total", style: "tablebode" },
            { text: "Multa % Dia", style: "tablebode" },
            { text: "Multa (Mt) Dia", style: "tablebode" },
            { text: "Parcelas", style: "tablebode" },
            { text: "P. Quitadas", style: "tablebode" },
            { text: "Quitadas (Mt)", style: "tablebode" },
            { text: "Rec. Amort", style: "tablebode" },
            { text: "Rec. Juros", style: "tablebode" },
            { text: "T. Atraso", style: "tablebode" },
            { text: "T. Atraso (Mt)", style: "tablebode" },
            { text: "Divida Total", style: "tablebode" },
          ],
          ...items,
        ],
      },
      layout: "lightHorizontalLines",
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
    return [];
  }

  const docDefinitions = {
    pageSize: "A2",
    pageOrientation: "landscape",
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
      tablebode: {
        alignment: "left",
        fontSize: 11,
        color: "black",
      },
    },
  };

  pdfMake.createPdf(docDefinitions).download(`Extrato.pdf`);
}

export default ExtractoPDF;
