import connectMongo from "../../../../utils/connectMongo";
import Bot from "../../../../models/bot";

export default async function handler(req, res) {
  const { method, query } = req;
  const { id } = query;

  switch (method) {
    case "PATCH":
      try {
        console.log("api-state", req.body);
        await connectMongo();
        const strategy = await Bot.findByIdAndUpdate(id, {
          state: req?.body,
        });
        res.status(200).json({ status: 200, body: strategy });
      } catch (error) {
        res.status(500).json({
          status: 500,
          message: "Internal server",
        });
      }
      break;
    default:
      res.setHeader("Allow", ["PATCH"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
