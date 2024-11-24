export type MyTheme = {
  light: {
    primary: {
      light: string;
      main: string;
      dark: string;
    };
    secondary: {
      light: string;
      main: string;
      dark: string;
    };
    background: {
      default: string;
      paper: string;
    };
    text: {
      primary: string;
      secondary: string;
      disabled: string;
    };
    error: {
      light: string;
      main: string;
      dark: string;
    };
    success: {
      main: string;
    };
    warning: {
      main: string;
    };
    info: {
      main: string;
    };
  };
  dark: {
    primary: {
      light: string;
      main: string;
      dark: string;
    };
    secondary: {
      light: string;
      main: string;
      dark: string;
    };
    background: {
      default: string;
      paper: string;
    };
    text: {
      primary: string;
      secondary: string;
      disabled: string;
    };
    error: {
      light: string;
      main: string;
      dark: string;
    };
    success: {
      main: string;
    };
    warning: {
      main: string;
    };
    info: {
      main: string;
    };
  };
};

type MyThemes = {
  [key: string]: {
    palettes: MyTheme;
  };
};

export const themes: MyThemes = {
  standart: {
    palettes: {
      light: {
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
      dark: {
        primary: {
          light: "#5FA8D3", // светлый небесно-голубой (для hover и акцентов)
          main: "#3A78A4", // насыщенный морской синий (основной акцент)
          dark: "#2A5676", // глубокий темно-синий (для активных элементов)
        },
        secondary: {
          light: "#FFCC5C", // теплый светло-золотистый (для акцентов и выделений)
          main: "#FFB347", // яркий янтарный (основной акцент)
          dark: "#FF9100", // насыщенный темно-оранжевый (для hover состояний)
        },
        background: {
          default: "#121212", // темно-серый фон для общего контекста
          paper: "#1E1E1E", // чуть светлее фон для карточек и компонентов
        },
        text: {
          primary: "#E0F2F1", // светлый бирюзовый текст (основной текст)
          secondary: "#A7C4C9", // приглушенный серо-голубой текст (для второстепенных элементов)
          disabled: "#607D8B", // приглушенный серо-голубой (для неактивных элементов)
        },
        error: {
          light: "#E57373", // мягкий коралловый (для ошибок и hover)
          main: "#D32F2F", // насыщенный красный (основной цвет ошибок)
          dark: "#B71C1C", // темный красный (для фона или активных состояний)
        },
        success: {
          main: "#4CAF50", // яркий зеленый (для успешных операций)
        },
        warning: {
          main: "#FFB300", // насыщенный желто-оранжевый (для предупреждений)
        },
        info: {
          main: "#2196F3", // насыщенный синий (для информационных сообщений)
        },
      },
    },
  },
  green: {
    palettes: {
      light: {
        primary: {
          light: "#4CAF50", // яркий зеленый (контраст с фоном)
          main: "#388E3C", // более темный зеленый (для кнопок, активных элементов)
          dark: "#1B5E20", // темный зеленый (для фона и выделений)
        },
        secondary: {
          light: "#FF9800", // яркий оранжевый (для акцентов)
          main: "#FF5722", // насыщенный оранжевый (для кнопок и ссылок)
          dark: "#E64A19", // более темный оранжевый (для hover, активных элементов)
        },
        background: {
          default: "#e2ffe6", // светлый зеленый фон
          paper: "#FFFFFF", // белый фон для карточек и компонентов
        },
        text: {
          primary: "#333333", // темный текст (для контраста на фоне)
          secondary: "#666666", // светло-серый текст (для неважных элементов)
          disabled: "#A8A8A8", // для неактивных текстов
        },
        error: {
          light: "#FF5252", // яркий красный (для выделения ошибок)
          main: "#F44336", // насыщенный красный (для кнопок, предупреждений)
          dark: "#D32F2F", // темный красный (для фона ошибок и состояний)
        },
        success: {
          main: "#4caf50", // зеленый для успешных операций
        },
        warning: {
          main: "#FF9800", // оранжевый для предупреждений
        },
        info: {
          main: "#2196f3", // синий для информационных сообщений
        },
      },
      dark: {
        primary: {
          light: "#66BB6A", // светло-зеленый (для кнопок hover или выделений)
          main: "#43A047", // насыщенный зеленый (основной акцент)
          dark: "#2E7D32", // темно-зеленый (для активных элементов)
        },
        secondary: {
          light: "#FFB74D", // светло-оранжевый (для акцентов и выделений)
          main: "#FF9800", // насыщенный оранжевый (основной акцент)
          dark: "#F57C00", // темный оранжевый (для hover и активных элементов)
        },
        background: {
          default: "#1B1B1B", // темно-серый фон (основной фон приложения)
          paper: "#212121", // чуть светлее для карточек и компонентов
        },
        text: {
          primary: "#E8F5E9", // светло-зеленый текст (основной текст на темном фоне)
          secondary: "#A5D6A7", // приглушенный зеленый текст (для второстепенных элементов)
          disabled: "#757575", // серый текст для неактивных элементов
        },
        error: {
          light: "#E57373", // мягкий красный (для ошибок, hover состояний)
          main: "#EF5350", // насыщенный красный (основной для ошибок)
          dark: "#C62828", // темный красный (фон ошибок или выделений)
        },
        success: {
          main: "#4CAF50", // зеленый для успешных действий
        },
        warning: {
          main: "#FFB300", // оранжевый для предупреждений
        },
        info: {
          main: "#1E88E5", // синий для информационных сообщений
        },
      },
    },
  },
  pink: {
    palettes: {
      light: {
        primary: {
          light: "#F8BBD0", // светлый розовый (для акцентов)
          main: "#F48FB1", // нежный розовый (основной цвет)
          dark: "#AD1457", // темный малиновый (для выделений)
        },
        secondary: {
          light: "#FFCCBC", // светло-коралловый (дополнительный акцент)
          main: "#FFAB91", // коралловый (для кнопок и ссылок)
          dark: "#D84315", // насыщенный коралловый (для hover, активных элементов)
        },
        background: {
          default: "#FFF0F5", // светлый лавандовый фон
          paper: "#FFFFFF", // белый фон для карточек и компонентов
        },
        text: {
          primary: "#4A4A4A", // темно-серый текст (для контраста)
          secondary: "#757575", // светло-серый текст (для менее важных элементов)
          disabled: "#BDBDBD", // светлый серый текст (для неактивных элементов)
        },
        error: {
          light: "#FFCDD2", // светло-розовый красный (для предупреждений)
          main: "#E57373", // мягкий красный (для кнопок и предупреждений)
          dark: "#C62828", // насыщенный красный (для фоновых выделений ошибок)
        },
        success: {
          main: "#81C784", // мягкий зеленый (для успешных операций)
        },
        warning: {
          main: "#FFB74D", // нежный оранжевый (для предупреждений)
        },
        info: {
          main: "#64B5F6", // нежный голубой (для информационных сообщений)
        },
      },
      dark: {
        primary: {
          light: "#F48FB1", // нежный розовый (для акцентов)
          main: "#AD1457", // темный малиновый (основной цвет)
          dark: "#880E4F", // глубокий малиновый (для выделений)
        },
        secondary: {
          light: "#FFAB91", // коралловый (для дополнительных акцентов)
          main: "#D84315", // насыщенный коралловый (основной цвет)
          dark: "#BF360C", // глубокий коралловый (для выделений)
        },
        background: {
          default: "#2A2A2A", // темно-серый фон
          paper: "#383838", // чуть светлее для карточек
        },
        text: {
          primary: "#E0E0E0", // светло-серый текст (для контраста)
          secondary: "#BDBDBD", // средне-серый текст (для второстепенных элементов)
          disabled: "#757575", // приглушенный серый для неактивных элементов
        },
        error: {
          light: "#E57373", // мягкий красный (для предупреждений)
          main: "#C62828", // насыщенный красный (для кнопок, предупреждений)
          dark: "#8E0000", // темный красный (для выделений ошибок)
        },
        success: {
          main: "#388E3C", // насыщенный зеленый (для успешных операций)
        },
        warning: {
          main: "#FFB74D", // мягкий оранжевый (для предупреждений)
        },
        info: {
          main: "#64B5F6", // нежный голубой (для информационных сообщений)
        },
      },
    },
  },
  peach: {
    palettes: {
      light: {
        primary: {
          light: "#F8D8D1", // светлый пудрово-розовый с легким персиковым оттенком
          main: "#E8B8B3", // насыщенный пудрово-розовый (основной акцент)
          dark: "#D39C96", // глубокий пудрово-розовый, слегка приглушенный
        },
        secondary: {
          light: "#FBE9E6", // очень светлый персиково-розовый для фоновых элементов
          main: "#F3CFCB", // мягкий пудровый розовый
          dark: "#CFA8A2", // слегка пепельный пудровый для акцентов
        },
        background: {
          default: "#FDF5F4", // нежный розово-персиковый фон
          paper: "#FFFFFF", // белый для карточек и компонентов
        },
        text: {
          primary: "#5E4A48", // насыщенный пепельно-розовый текст
          secondary: "#7D6664", // мягкий пепельно-розовый для второстепенного текста
          disabled: "#BFA6A3", // светлый приглушенный пудровый розовый для неактивного текста
        },
        error: {
          light: "#F8A5A1", // теплый пудрово-красный для ошибок
          main: "#E57373", // насыщенный пудрово-красный
          dark: "#C34444", // темный, слегка приглушенный
        },
        success: {
          main: "#D9B5A8", // нежный пудрово-персиковый для успеха
        },
        warning: {
          main: "#F0A590", // теплый пудрово-оранжевый для предупреждений
        },
        info: {
          main: "#E6C2C0", // светлый пудрово-розовый для информационных сообщений
        },
      },
      dark: {
        primary: {
          light: "#D4A9A6", // светлый приглушённый пудрово-розовый
          main: "#C2847D", // насыщенный пудрово-розовый для акцентов
          dark: "#9B5E58", // глубокий тёплый пепельно-розовый
        },
        secondary: {
          light: "#D4B6B3", // мягкий светло-пудровый
          main: "#C08E8B", // пудрово-розовый для второстепенных акцентов
          dark: "#8F6865", // тёмный пудровый с нотками персикового
        },
        background: {
          default: "#2E2A29", // глубокий тёплый темно-коричневый с серым подтоном
          paper: "#3A3635", // тёмный фон для карточек и элементов
        },
        text: {
          primary: "#F0D8D7", // светлый пудрово-розовый для основного текста
          secondary: "#CBA9A6", // мягкий розовый для второстепенного текста
          disabled: "#8F6E6C", // слегка приглушённый для неактивных элементов
        },
        error: {
          light: "#D77876", // светлый тёплый пудрово-красный
          main: "#BA4A48", // насыщенный красный акцент для ошибок
          dark: "#892E2C", // глубокий приглушённый красный
        },
        success: {
          main: "#A67D75", // мягкий тёплый пудрово-персиковый
        },
        warning: {
          main: "#E09E89", // яркий пудрово-персиковый для предупреждений
        },
        info: {
          main: "#B99391", // нежный пудрово-розовый для информационных сообщений
        },
      },
    },
  },
};