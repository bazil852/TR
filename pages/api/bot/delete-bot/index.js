import connectMongo from "../../../../utils/connectMongo";
import Bot from "../../../../models/bot";

export default async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case "DELETE":
      try {
        console.log("api-state", req.body);
        await connectMongo();

        // Assuming that req.body is an array of IDs:
        const idsToDelete = body;

        const response = await Bot.deleteMany({ _id: { $in: idsToDelete } });
        res.status(200).json({ status: 200, body: response });
      } catch (error) {
        res.status(500).json({
          status: 500,
          message: "Internal server error",
        });
      }
      break;
    default:
      res.setHeader("Allow", ["DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
