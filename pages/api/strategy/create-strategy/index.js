import connectMongo from "../../../../utils/connectMongo";
import Strategy from "../../../../models/strategy";
import StrategyFolders from "../../../../models/strategyFolder";
import Users from "../../../../models/users";
import * as bcrypt from "bcrypt";
import { Spot } from "@binance/connector";
export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        await connectMongo();
        // const strategies = await Promise.all(
        //   req.body.map((item) =>
        //     item._id
        //       ? Strategy.findOneAndUpdate({ _id: item._id }, item, {
        //           new: true,
        //           upsert: true,
        //           setDefaultsOnInsert: true,
        //         }).exec()
        //       : Strategy.create(item)
        //   )
        // );

        const strategies = await Promise.all(
          req.body.map(async (item) => {
            let strategy;
            if (item._id) {
              strategy = await Strategy.findOneAndUpdate(
                { _id: item._id },
                item,
                {
                  new: true,
                  upsert: true,
                  setDefaultsOnInsert: true,
                }
              ).exec();
            } else {
              strategy = await Strategy.create(item);

              // After creating a new strategy, if strategyFolder is not an empty string,
              // add the newly created strategy._id to the strategiesList of the corresponding StrategyFolders document.
              if (
                item.generalSettings.strategyFolder &&
                item.generalSettings.strategyFolder.trim() !== ""
              ) {
                await StrategyFolders.updateOne(
                  { folderName: item.generalSettings.strategyFolder },
                  { $push: { strategiesList: strategy._id } }
                );
              }
            }
            return strategy;
          })
        );

        res.status(200).json({ status: 200, body: strategies });
      } catch (error) {
        console.log(error);
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
