import connectMongo from "../../../../utils/connectMongo";
import Strategy from "../../../../models/strategy";
import StrategyFolders from "../../../../models/strategyFolder";

export default async function handler(req, res) {
  const { method, query } = req;
  const { id } = query;

  switch (method) {
    case "GET":
      try {
        await connectMongo();
        const idNumber = Number(id);
        const folders = await StrategyFolders.find({
          "user.id": idNumber,
        }).populate("strategiesList");
        let folderStrategyIds = [];
        for (let folder of folders) {
          folderStrategyIds = folderStrategyIds.concat(
            folder.strategiesList.map((strategy) => strategy._id)
          );
        }
        console.log(folderStrategyIds);

        // Find all strategies that are not in the list of strategies that are part of a folder
        const standaloneStrategies = await Strategy.find({
          _id: { $nin: folderStrategyIds },
          "user.id": idNumber,
        });

        // Now you have all the strategies that are not part of any folder
        res.status(200).json(standaloneStrategies);
      } catch (error) {
        console.log(error);
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
