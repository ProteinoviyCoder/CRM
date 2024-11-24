import "@/shared/styles/globalCSS.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/shared/store/store";
import CssBaseline from "@mui/material/CssBaseline";
import { Auth } from "@/features/auth/ui/auth";
import { Layout } from "@/widgets/layout/ui/layout";
import Head from "next/head";

import { ThemeWrapper } from "@/features/themeWrapper/ui/themeWrapper";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Auth>
        <ThemeWrapper>
          <CssBaseline />
          <Layout>
            <Head>
              <title>NiKi CRM</title>
              <meta
                name="description"
                content="Лучший CRM для вашего бизнеса"
              />
              <link rel="shortcut icon" href="./logo.png" type="image/x-icon" />
            </Head>
            <Component {...pageProps} />
          </Layout>
        </ThemeWrapper>
      </Auth>
    </Provider>
  );
}
