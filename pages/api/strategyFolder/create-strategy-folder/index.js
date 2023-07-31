import connectMongo from "../../../../utils/connectMongo";
import StrategyFolders from "../../../../models/strategyFolder";
import Users from "../../../../models/users";
import * as bcrypt from "bcrypt";
export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        await connectMongo();
        const strategyFolder = await StrategyFolders.create(req.body);

        res.status(200).json({ status: 200, body: strategyFolder });
      } catch (error) {
        res.status(500).json({
          status: 500,
          message: "Internal server error",
        });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
