/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      primary: "#4F46E5", //กำหนดสี
      secondary: "#9333EA",
      danger: "#EF4444",
    },
    borderRadius: {
      xl: "1rem", //กำหนดค่า border riadius ใหม่
    },
    fontSize: {
      "10xl": "136px", //กำหนดขนาดอักษร
    },
  },
  plugins: [],
}

