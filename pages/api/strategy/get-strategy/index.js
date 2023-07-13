import connectMongo from "../../../../utils/connectMongo";
import Strategy from "../../../../models/strategy";

export default async function handler(req, res) {
  const { method, query } = req;
  const { id } = query;

  switch (method) {
    case "GET":
      try {
        console.log("api-state", id);
        await connectMongo();
        const idNumber = Number(id);
        const strategy = await Strategy.find({ "user.id": idNumber });
        console.log(strategy);
        res.status(200).json({ status: 200, body: strategy });
      } catch (error) {
        res.status(500).json({
          status: 500,
          message: "Internal server",
        });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
