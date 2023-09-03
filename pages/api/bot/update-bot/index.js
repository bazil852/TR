import connectMongo from "../../../../utils/connectMongo";
import Bot from "../../../../models/bot";
import Users from "../../../../models/users";
import * as bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { method, query, body } = req;
  const { id } = query;

  switch (method) {
    case "PUT":
      try {
        await connectMongo();
        const updatedBot = await Bot.findOneAndUpdate(
          { _id: id },
          { $set: body },
          { new: true }
        ).populate("strategyId");
        console.log(updatedBot, id, body);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}exchanges/single/${updatedBot?.exchange}`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        console.log(data);
        let updatedBotObj = updatedBot.toObject();
        updatedBotObj.exchange = data;

        res.status(200).json({ status: 200, body: updatedBotObj });
        // res.status(200).json({ status: 200, body: updatedBot });
      } catch (error) {
        res.status(500).json({
          status: 500,
          message: "Internal server",
        });
      }
      break;
    default:
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
