import connectMongo from "../../../../utils/connectMongo";
import Bot from "../../../../models/bot";

export default async function handler(req, res) {
  const { method, query } = req;

  switch (method) {
    case "GET":
      try {
        await connectMongo();
        const bots = await Bot.find();
        console.log(bots);
        res.status(200).json({ status: 200, body: bots });
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
