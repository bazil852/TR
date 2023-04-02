import connectMongo from "../../../../utils/connectMongo";
import Users from "../../../../models/users";
import * as bcrypt from "bcrypt";
import { Spot } from "@binance/connector";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      res.status(200).json({ data: "nothing" });
      break;
    case "POST":
      try {
        await connectMongo();
        let exchanges = [
          {
            name: req.body.name,
            apiKey: req.body.apiKey,
            apiSecret: req.body.apiSecret,
          },
        ];
        let newResp = await Users.findOneAndUpdate(
          { _id: req.body.userId },
          { exchanges: exchanges }
        );

        res.status(200).json({ status: 200, body: newResp });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          status: 500,
          message: "Internal server",
        });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
