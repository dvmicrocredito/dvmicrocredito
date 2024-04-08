import mongooseConnect from "../../../lib/mongodb";
import EmprestimosSolicitados from "../../../models/solicitarEmprestimo";

const PATCH = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    await mongooseConnect();
    EmprestimosSolicitados.findById(req.body.idVerify)
      .then(async (response) => {
        const existingPrompt = await EmprestimosSolicitados.findById(
          req.body.idVerify
        );
        if (!existingPrompt) return new Response("Not found", { status: 404 });
        existingPrompt.nomeCompleto = req.body.nomeCompleto;
        existingPrompt.nomeCompletoAvalista = req.body.nomeCompletoAvalista;
        existingPrompt.bI = req.body.bI;
        existingPrompt.bIAvalista = req.body.bIAvalista;
        existingPrompt.contacto = req.body.contacto;
        existingPrompt.contactoAvalista = req.body.contactoAvalista;
        existingPrompt.saldo = req.body.saldo;
        existingPrompt.endereco = req.body.endereco;
        existingPrompt.enderecoAvalista = req.body.enderecoAvalista;
        existingPrompt.numeroQuarteirao = req.body.numeroQuarteirao;
        existingPrompt.numeroQuarteiraoAvalista =
          req.body.numeroQuarteiraoAvalista;
        existingPrompt.numeroCasa = req.body.numeroCasa;
        existingPrompt.numeroCasaAvalista = req.body.numeroCasaAvalista;
        existingPrompt.bairro = req.body.bairro;
        existingPrompt.bairroAvalista = req.body.bairroAvalista;
        existingPrompt.distrito = req.body.distrito;
        existingPrompt.distritoAvalista = req.body.distritoAvalista;
        existingPrompt.fonteRendimento = req.body.fonteRendimento;
        existingPrompt.garantias = req.body.garantias;
        existingPrompt.genero2 = req.body.genero2;
        existingPrompt.genero2Avalista = req.body.genero2Avalista;
        existingPrompt.nUIT = req.body.nUIT;
        existingPrompt.nUITAvalista = req.body.nUITAvalista;
        existingPrompt.dataNascimento = req.body.dataNascimento;
        existingPrompt.dataNascimentoAvalista = req.body.dataNascimentoAvalista;
        existingPrompt.nacionalidade = req.body.nacionalidade;
        existingPrompt.nacionalidadeAvalista = req.body.nacionalidadeAvalista;
        existingPrompt.estadoCivil = req.body.estadoCivil;
        existingPrompt.estadoCivilAvalista = req.body.estadoCivilAvalista;
        existingPrompt.userId = req.body.userId;
        existingPrompt.status = req.body.status;
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Cache-Control", "max-age=180000");
        res.end(JSON.stringify(response));

        await existingPrompt.save();

        resolve();
      })
      .catch((error) => {
        res.json(error);
        res.status(405).end();
        resolve();
      });
  });
};
export default PATCH;
