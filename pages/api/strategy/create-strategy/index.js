import connectMongo from "../../../../utils/connectMongo";
import Strategy from "../../../../models/strategy";
import Users from "../../../../models/users";
import * as bcrypt from "bcrypt";
import { Spot } from "@binance/connector";

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      connectMongo()
        .then(() => {
          let strategyPromise;

          if (req.body._id) {
            strategyPromise = Strategy.findOneAndUpdate(
              { _id: req.body._id },
              req.body,
              { new: true, upsert: true, setDefaultsOnInsert: true }
            ).exec();
          } else {
            strategyPromise = Strategy.create(req.body);
          }

          return strategyPromise;
        })
        .then((strategy) => {
          res.status(200).json({ status: 200, body: strategy });
        })
        .catch((error) => {
          res.status(500).json({
            status: 500,
            message: "Internal server error",
          });
        });
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
