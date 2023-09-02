import connectMongo from "../../../../utils/connectMongo";
import StrategyFolders from "../../../../models/strategyFolder";
import { Spot } from "@binance/connector";

export default async function handler(req, res) {
  const { method, query } = req;
  const { id } = query;

  switch (method) {
    case "GET":
      try {
        await connectMongo();

        const idNumber = Number(id);
        const strategyFolders = await StrategyFolders.find({
          "user.id": idNumber,
        });

        res.status(200).json({
          status: 200,
          body: strategyFolders.map((item) => {
            return {
              value: item.folderName,
              label: item.folderName,
            };
          }),
        });
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
