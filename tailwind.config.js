/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#15202B", // Twitter dark background color
        lightDark: "#1C2938", // Slightly lighter dark shade
        blue: "#1DA1F2", // Twitter blue color
        lightBlue: "#AAB8C2", // Light blue color for text and icons
        darkBlue: "#1B95E0", // Darker shade of Twitter blue
      },
    
    },
  },
  plugins: [],
};
