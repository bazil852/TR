import mongoose, { Schema, model, models } from "mongoose";

const strategySchema = new Schema({
  botName: String,
  exchange: String,
  botType: String,
  strategyType: String,
  strategyPair: String,

  orderSize: String,
  availablePercentage: String,
  safetyOrderSize: Number,
  candleSizeAndVol: String,
  orderType: String,
  profitCurrency: String,

  indicators: [Object],

  emaResistance: String,
  trendIdentification: String,
  buyOnCondition: String,
  avgPrice: String,
  avgPricePercent: Number,
  ignoreCondition: String,
  maxOrders: String,
  maxVol: String,
  stopLoss: String,
  takeProfit: String,
  takeProfitPercent: Number,

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

const Strategy = models.Strategy || model("Strategy", strategySchema);

export default Strategy;
