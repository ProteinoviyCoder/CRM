import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/shared/store/store";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material";
import { Auth } from "@/features/auth/ui/auth";
import { Layout } from "@/widgets/layout/ui/layout";

const theme = createTheme({
  palette: {
    primary: {
      light: "#87CEEB", // светло-голубой, напоминающий ясное небо
      main: "#4682B4", // насыщенный морской синий (основной акцент)
      dark: "#2B547E", // глубокий темно-синий, как океанские глубины
    },
    secondary: {
      light: "#FFD700", // теплый золотистый (акцентные элементы)
      main: "#FFA500", // яркий оранжевый (для кнопок и выделений)
      dark: "#FF8C00", // насыщенный янтарный (hover и активные элементы)
    },
    background: {
      default: "#E0F7FA", // светло-бирюзовый фон, создающий ощущение свежести
      paper: "#FFFFFF", // белый фон для карточек и компонентов
    },
    text: {
      primary: "#2C3E50", // глубокий темно-синий текст (хорошо читается на светлом фоне)
      secondary: "#566573", // приглушенный серый с синим оттенком (для второстепенного текста)
      disabled: "#B0C4DE", // светло-голубой для неактивного текста
    },
    error: {
      light: "#FF6F61", // теплый коралловый (выделение ошибок)
      main: "#E53935", // насыщенный красный (основной цвет ошибок)
      dark: "#B71C1C", // темно-красный (для фонов ошибок)
    },
    success: {
      main: "#388E3C", // сочный зеленый, символизирующий успех
    },
    warning: {
      main: "#FFB300", // яркий желто-оранжевый для предупреждений
    },
    info: {
      main: "#1E88E5", // яркий синий для информационных сообщений
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Auth>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Auth>
      </ThemeProvider>
    </Provider>
  );
}
