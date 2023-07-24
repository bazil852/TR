import mongoose, { Schema, model, models } from "mongoose";

const strategyFoldersSchema = new Schema({
  folderName: String,
  folderDescription: String,
  strategiesList: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Strategy",
  },
  user: Object,
});

const StrategyFolders =
  models.StrategyFolders || model("StrategyFolders", strategyFoldersSchema);

export default StrategyFolders;
