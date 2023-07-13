import mongoose, { Schema, model, models } from "mongoose";
import { STRING_LITERAL_DROP_BUNDLE } from "next/dist/shared/lib/constants";

const strategySchema = new Schema({
  generalSettings: {
    strategyName: String,
    strategyFolder: String,
    BotLink: String,
    strategyDescription: String,
    notes: String,
  },
  orders: {
    firstOrderSize: Number,
    extraOrderSize: Number,
    orderType: String,
    pairs: String,
  },
  parameters: Object,
  dca: {
    DCAType: String,
    volumeMultiplier: String,
    maxExtraOrders: String,
    minDistBetweenOrders: String,
    startExtraOrder: String,
    stopMultiplier: String,
  },
  takeProfit: {
    takeProfit: String,
    minTakeProfit: String,
  },
  stopLoss: {
    stopLoss: String,
  },

  // botName: String,
  // exchange: mongoose.Schema.Types.ObjectId,
  // botType: String,
  // strategyType: String,
  // strategyPair: String,

  // orderSize: String,
  // availablePercentage: String,
  // safetyOrderSize: Number,
  // candleSizeAndVol: String,
  // orderType: String,
  // profitCurrency: String,

  // indicators: [Object],

  // emaResistance: String,
  // trendIdentification: String,
  // buyOnCondition: String,
  // avgPrice: String,
  // avgPricePercent: Number,
  // ignoreCondition: String,
  // maxOrders: String,
  // maxVol: String,
  // stopLoss: String,
  // stopLossPercent: Number,
  // takeProfit: String,
  // takeProfitPercent: Number,

  user: Object,
  logs: String,
  state: String,
  dealTime: [Object],
});

const Strategy = models.Strategy || model("Strategy", strategySchema);

export default Strategy;
