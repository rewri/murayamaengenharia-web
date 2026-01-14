/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Paleta de cores para engenharia
        primary: {
          DEFAULT: "#0B2E4E",
          50: "#F2F6F7",
          100: "#E4EAED",
          200: "#BECDD4",
          300: "#9AADB8",
          400: "#5F7382",
          500: "#2F3E4D",
          600: "#263545",
          700: "#1A2738",
          800: "#111D2E",
          900: "#091221",
          950: "#040A17",
        },
        secondary: {
          DEFAULT: "#2F3E4D",
          50: "#F2F6F7",
          100: "#E4EAED",
          200: "#BECDD4",
          300: "#9AADB8",
          400: "#5F7382",
          500: "#2F3E4D",
          600: "#263545",
          700: "#1A2738",
          800: "#111D2E",
          900: "#091221",
          950: "#040A17",
        },
        accent: {
          DEFAULT: "#06B6D4",
          50: "#F0FBFC",
          100: "#E1F8FA",
          200: "#BAEFF5",
          300: "#91E4ED",
          400: "#48CCE0",
          500: "#06B6D4",
          600: "#069ABF",
          700: "#03779E",
          800: "#035880",
          900: "#013B5E",
          950: "#01223D",
        },
        // primary: {
        //   DEFAULT: "#0A2B42", // Azul Marinho Escuro
        //   50: "#f0f4f8",
        //   100: "#d9e5f0",
        //   200: "#b3cce1",
        //   300: "#8db3d2",
        //   400: "#6799c3",
        //   500: "#4180b4",
        //   600: "#2f5f8a",
        //   700: "#1d3f60",
        //   800: "#0a2b42",
        //   900: "#081d2c",
        // },
        // secondary: {
        //   DEFAULT: "#1E6C8F", // Azul Ciano/Petróleo
        //   50: "#f0f7fa",
        //   100: "#d4ebf3",
        //   200: "#a9d7e7",
        //   300: "#7ec3db",
        //   400: "#53afcf",
        //   500: "#289bc3",
        //   600: "#1e6c8f",
        //   700: "#174f6b",
        //   800: "#0f3247",
        //   900: "#081523",
        // },
        // accent: {
        //   DEFAULT: "#3BAADB", // Azul Claro/Ciano
        //   50: "#EBF8FD",
        //   100: "#D7F1FB",
        //   200: "#AFE3F7",
        //   300: "#87D5F3",
        //   400: "#5FC2EF",
        //   500: "#3BAADB",
        //   600: "#2F88AF",
        //   700: "#236683",
        //   800: "#184458",
        //   900: "#0C222C",
        // },
        neutral: {
          warm: "#F4F4F4", // Cinza Claro
          dark: "#333333", // Cinza Carvão
        },
        "background-light": "#F4F4F4",
        "background-dark": "#0A2B42",
      },
      fontFamily: {
        headings: ["Montserrat", "sans-serif"], // Para títulos
        body: ["Open Sans", "sans-serif"], // Para corpo de texto
        display: ["Montserrat", "sans-serif"], // Alias para compatibilidade
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
