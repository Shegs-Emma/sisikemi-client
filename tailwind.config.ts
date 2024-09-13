import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "custom-shadow": "8px 8px 1px 0px rgba(29,29,27,1)",
        "custom-shadow-sm": "4px 4px 1px 0px rgba(29,29,27,1)",
        "custom-shadow-like": "3px 3px 1px 0px rgba(0,0,0,1)",
        "custom-shadow-component": "1.5px 1.5px 1px 0px rgba(0,0,0,1)",
        "custom-shadow-over": "1px 1px 1px 1px rgba(0,0,0,1)",
      },
      colors: {
        profile: "#F0B8C8",
        ash: "#9B978B",
        red: "#EB5656",
        pink: "#E688A3",
        yellowbtn: "#efd378",
        base1: "#6AB5D2",
        base2: "#E688A3",
        base3: "#a5b4fc",
        overlay: "#000000B3",
        purple: "#6A64E3",
        armyGreen: "#94AF59",
        gray: "#9E9E9E",
        placeholderText: "#F3F3F3",
        placeholderText2: "#C1C1C1",
        crispy: "#6ab5d229",
        lightgray: "#ECECEC",
        tertiary: "#EFD378",
        tertiaryHover: "#E1C35E",
        text: "#6C6D71",
        textGray: "#5B5B5B",
        textGray2: "#535353",
        "rgba-6ab5d2-16": "rgba(255, 255, 255, 0.16)",
        line: "rgba(255, 255, 255, 0.4)",
        buttonbg: "rgba(255, 255, 255, 0.16)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "#6AB5D2",
        darkGray: "#44464A",
        borderGray: "#BFBEB9",
        borderWhite: "#F7F6F3",

        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        "custom-yellow": "hsl(46, 79%, 70%)",
        "custom-yellow2": "hsl(46, 63%, 47%)",
        "custom-red": "hsl(0, 79%, 63%)",
        "custom-pink": "hsl(343, 65%, 72%)",
      },
      borderRadius: {
        "32px": "32px",
        40: "40px",
        28: "28px",
        20: "20px",
      },
      backgroundImage: {
        "custom-radial":
          "radial-gradient(111.36% 111.36% at -0.59% -1.7%, #e2aa50 0%, #a86728 100%)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      spacing: {
        "48px": "48px",
        "20.5px": "20.5px",
        "13.5px": "13.5px",
        "12.5px": "12.5px",
        "120px": "120px",
        "160px": "160px",
        "35px": "35px",
      },
      fontSize: {
        "32px": "32px",
        "64px": "64px",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
export default config;
