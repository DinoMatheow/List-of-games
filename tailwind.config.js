module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mydracula: {
          primary: "#7f5af0",
          secondary: "#2cb67d",
          accent: "#ef4565",
          neutral: "#1e1e2f",
          "base-100": "#2b2d42",
          "base-200": "#202030",
          "base-300": "#1a1b26",
          info: "#3ABFF8",
          success: "#00ffad",
          warning: "#facc15",
          error: "#ff3860",

          // Dracula-like extras
          "--rounded-box": "1rem",
          "--rounded-btn": "0.5rem",
          "--animation-btn": "0.25s",
          "--btn-focus-scale": "0.95",
          "--border-btn": "1px",
          "--tab-radius": "0.5rem",
        },
      },
    ],
  },
}
