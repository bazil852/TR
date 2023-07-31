import mongoose, { Schema, model, models } from "mongoose";

const botSchema = new Schema({
  botName: String,
  botType: String,
  description: String,
  exchange: String,
  strategyId: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Strategy",
  },
  timeFrame: String,

  user: Object,
  logs: String,
  state: String,
});

const Bot = models.Bot || model("Bot", botSchema);

export default Bot;
