import React from "react";
import AppRouter from "./routes";

const AppInner: React.FC = () => {
  // No ringtone or socket logic here anymore — handled in SupportRequestsProvider
  return <AppRouter />;
};

export default AppInner;
