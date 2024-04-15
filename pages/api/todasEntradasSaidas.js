import mongooseConnect from "../../lib/mongodb";
import NovaEntradaSaida from "../../models/novaEntradaSaida";

const GET = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    await mongooseConnect();
    await NovaEntradaSaida.find()
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Cache-Control", "max-age=180000");
        res.end(JSON.stringify(response));
        resolve();
      })
      .catch((error) => {
        res.json(error);
        res.status(405).end();
        resolve(); // in case something goes wrong in the catch block (as vijay commented)
      });
  });
};
export default GET;
