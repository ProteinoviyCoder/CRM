import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/shared/store/store";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material";
import { Auth } from "@/features/auth/ui/auth";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f50b5",
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Auth>
          <Component {...pageProps} />
        </Auth>
      </ThemeProvider>
    </Provider>
  );
}
