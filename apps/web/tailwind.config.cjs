const shared = require("@repo/tailwind-config");

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...shared,
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
};
