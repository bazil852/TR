import connectMongo from "../../../../utils/connectMongo";
import Bot from "../../../../models/bot";

export default async function handler(req, res) {
  const { method, query } = req;
  const { id } = query;

  switch (method) {
    case "GET":
      try {
        console.log("api-state", id);
        await connectMongo();
        const idNumber = Number(id);
        let bots = await Bot.find({ "user.id": idNumber }).populate(
          "strategyId"
        );
        const botPromises = bots.map(async (item) => {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}exchanges/single/${item?.exchange}`,
            {
              method: "GET",
            }
          );
          const data = await response.json();
          console.log(data);
          let itemObj = item.toObject();
          itemObj.exchange = data;
          return itemObj;
        });
        bots = await Promise.all(botPromises);

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
