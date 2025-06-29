const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "prose-gray-900": "#1a202c",
        "prose-gray-700": "#4a5568",
        "prose-blue-600": "#3182ce",
        "prose-gray-500": "#a0aec0",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.prose-gray-900"),
            a: {
              color: theme("colors.prose-blue-600"),
              textDecoration: "underline",
              "&:hover": {
                color: theme("colors.prose-blue-600"),
              },
            },
            h1: { color: theme("colors.prose-gray-900") },
            h2: { color: theme("colors.prose-gray-900") },
            h3: { color: theme("colors.prose-gray-900") },
            strong: { color: theme("colors.prose-gray-900") },
            p: { color: theme("colors.prose-gray-700") },
            blockquote: {
              color: theme("colors.prose-gray-700"),
              borderLeftColor: theme("colors.prose-gray-500"),
            },
            code: { color: theme("colors.prose-gray-900") },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
