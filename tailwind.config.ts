import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        default: {
          colorBg: "#252525",
          colorBg2: "#212121",
          colorBg3: "#181818",
          colorBg4: "#1A1A1A",
          colorButton: "#3A3B3C",
          colorDanger: "#fe6854",
          colorFontPrimary: "#e5e7eb",
          colorTextSecondary: "#B0B3B8",
          colorTextPrimary: "#FFFFFF",
          colorTextLight: "#f8f8f8",
          colorbackground: "#FBFBFD",
          colorGradient: "linear-gradient(110.42deg, #CF57A3 29.2%, #4731B6 63.56%)",
          colorGreenDark: "#27AE60",
          colorGreenLight: "#dbe1e8",
          activeNavLink: "rgba(249,249,249, 0.08)",
          activeNavLinkHover: "rgba(249,249,249, 0.03)",
          colorPrimary: "#7263F3",
          colorPrimary2: "#705DF2",
          colorGreyDark: "#131313",
          colorGrey0: "#f8f8f8",
          colorGrey1: "#dbe1e8",
          colorGrey2: "#b2becd",
          colorGrey3: "#6c7983",
          colorGrey4: "#454e56",
          colorGrey5: "#2a2e35",
          colorGrey6: "#12181b",
          colorWhite: "#fff",
          colorPrimaryGreen: "#6FCF97",
          borderColor: "rgba(249,249,249, 0.08)",
          borderColor2: "rgba(249,249,249, 0.08)",
        }
      }
    },
  },
  plugins: [],
};
export default config;
