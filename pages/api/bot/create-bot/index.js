import connectMongo from "../../../../utils/connectMongo";
import Bot from "../../../../models/bot";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        await connectMongo();
        console.log("api", req.body);
        const botData = await Bot.create(req.body);
        const populatedBotData = await Bot.findOne({
          _id: botData._id,
        }).populate("strategyId");
        res.status(200).json({ status: 200, body: populatedBotData });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          status: 500,
          message: "Internal server",
        });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
