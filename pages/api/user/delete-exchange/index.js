import connectMongo from "../../../../utils/connectMongo";
import Strategy from "../../../../models/strategy";
import Users from "../../../../models/users";
import * as bcrypt from "bcrypt";
import { Spot } from "@binance/connector";

export default async function handler(req, res) {
  const { method, body, query } = req;
  const { id } = query;
  const { exchangeId } = body;

  switch (method) {
    case "DELETE":
      try {
        await connectMongo();

        // Find the user by id
        const user = await Users.findById(id);

        if (!user) {
          return res
            .status(404)
            .json({ status: 404, message: "User not found" });
        }

        // Remove the exchange with the provided id
        user.exchanges = user.exchanges.filter(
          (e) => e._id.toString() !== exchangeId
        );

        // Save the updated user
        const updatedUser = await user.save();

        res.status(200).json({ status: 200, body: updatedUser });
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
