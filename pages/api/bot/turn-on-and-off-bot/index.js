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
        const updatedBot = await Bot.findByIdAndUpdate(id, {
          state: req?.body,
        });
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}exchanges/single/${updatedBot?.exchange}`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        console.log(data);
        let botWithExchange = updatedBot.toObject();
        botWithExchange.exchange = data;
        // return itemObj;
        res.status(200).json({ status: 200, body: botWithExchange });
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
