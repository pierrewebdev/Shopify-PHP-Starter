import { BrowserRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NavigationMenu } from "@shopify/app-bridge-react";
import { AppBridgeProvider } from "./Components/Providers/AppBridgeProvider";
import { PolarisProvider } from "./Components/Providers/PolarisProvider";
import '@shopify/polaris-styles';

import Routes from "./Routes";

import CardDefault from "./Components/Polaris/card";

export default function App() {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");
  const { t } = useTranslation();

  const handleClick = async () => {
    const response = await fetch("https://workable-vertically-rattler.ngrok-free.app/check-install")

    const data = await response.json()
    console.log("Data from DB Sessions", data)
  }

  return (
    <PolarisProvider>
      <BrowserRouter>
        <AppBridgeProvider>
            <NavigationMenu
              navigationLinks={[
                {
                  label: t("Settings"),
                  destination: "/settings",
                },
              ]}
            />
            <Routes pages={pages} />
        </AppBridgeProvider>
      </BrowserRouter>
    </PolarisProvider>
  );
}

