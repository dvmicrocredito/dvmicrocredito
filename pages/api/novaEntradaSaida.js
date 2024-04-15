import mongooseConnect from "../../lib/mongodb";
import NovaEntradaSaida from "../../models/novaEntradaSaida";

const POST = async (req, res) => {
  try {
    await mongooseConnect();
    const newEvento = new NovaEntradaSaida(req.body);

    await newEvento.save();
    return new Response(JSON.stringify(newEvento), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a new servico", { status: 500 });
  }
};
export default POST;
