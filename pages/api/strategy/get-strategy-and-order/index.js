import connectMongo from "../../../../utils/connectMongo";
import Strategy from "../../../../models/strategy";
import Order from "../../../../models/order";
import { Spot } from "@binance/connector";

export default async function handler(req, res) {
  const { method, query } = req;
  const { id } = query;

  switch (method) {
    case "GET":
      try {
        console.log("api-state", req.body);
        await connectMongo();
        const strategy = await Strategy.find({ userId: id });
        let newStrategyResponse = await Promise.all(
          strategy.map(async (item) => {
            const order = await Order.find({ strategyId: item._id });
            return {
              strategy: item.toObject(),
              order: order.map((o) => o.toObject()),
            };
          })
        );
        res.status(200).json({ status: 200, body: newStrategyResponse });
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
