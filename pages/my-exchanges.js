import WalletConnect from "../components/cards/wallet-connect/WalletConnect";
import PrivateHeader from "../components/layout/PrivateHeader";
export default function MyExchanges() {
  return (
    <PrivateHeader title="My Exchanges" Component={WalletConnect} current="1" />
  );
}
