import { configureStore } from "@reduxjs/toolkit";
import exchangeReducer from "./slices/exchange-slice";
import assetReducer from "./slices/asset-slice";

export const store = configureStore({
  reducer: {
    exchanges: exchangeReducer,
    asset: assetReducer,
  },
});
