import connectMongo from "../../../../utils/connectMongo";
import Strategy from "../../../../models/strategy";
import Users from "../../../../models/users";
import * as bcrypt from "bcrypt";
import { Spot } from "@binance/connector";
export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        await connectMongo();
        const strategies = await Promise.all(
          req.body.map((item) =>
            item._id
              ? Strategy.findOneAndUpdate({ _id: item._id }, item, {
                  new: true,
                  upsert: true,
                  setDefaultsOnInsert: true,
                }).exec()
              : Strategy.create(item)
          )
        );

        res.status(200).json({ status: 200, body: strategies });
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
