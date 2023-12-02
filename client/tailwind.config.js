/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "app-green": "#6CD6DE6B",
        "app-brown":"#A82F2F",
        "app-hover-green": "#6B3333A2C4",
        "app-yellow": "#fae4ad",
        "app-gray": "rgba(255, 255, 255, 0.65)",
        "app-blue": "#215B90",
        "app-orange": "#f49867",
        "app-background-1": "#FFFF",
        "app-background-2": "#F5F5F5",
        "app-background-3": "rgba(0, 0, 0, 0.6)",
        "input-bg-color":"rgba(217, 217, 217, 0.05)",
        "app-card-bg-2":"rgba(217, 217, 217, 0.03)",
        "app-white": "#121720A9",
        "app-hover": "#AEA4A425",
        "tag-bg":"#424549"
      },
      boxShadow: {
        app_shadow:
          "inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.075), 0 0 0 1px hsla(0, 0%, 0%, 0.05),0 0.3px 0.4px hsla(0, 0%, 0%, 0.02),0 0.9px 1.5px hsla(0, 0%, 0%, 0.045),0 3.5px 6px hsla(0, 0%, 0%, 0.09)",
        grid_shadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        card_shadow: "0px 1px 1px 1px rgba(0, 0, 0, 0.05)",
        card_2_shadow: "5px 6px 10.1px 0px rgba(0, 0, 0, 0.25)",

      },
      fontFamily: {
        body: ["Poppins", "Quicksand", "GoogleSans", "sans-serif"],
      },

      width: {
        w_40: '40rem', 
        w_50: '50rem', 
        '80': '80px',   
      },
      height: {
        h_25: '25rem', 
        '48': '48px',  
      },
      mixBlendMode: {
        mixBlendMode_luminosity: "luminosity"
      }
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: false, // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "light", // name of one of the included themes for dark mode
    // base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  },
};
