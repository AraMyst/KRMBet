// tailwind.config.js
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        fortino: {
          darkGreen: '#0D1B12',   // main background
          goldSoft: '#C7A86B',    // highlights, buttons
          darkRed: '#8B1E1E',     // action buttons (“Bet Now”)
          softWhite: '#F5F5F5',   // primary text
          darkBrown: '#3E2A1C',   // icon outlines, details
          oliveGreen: '#6B8E23',  // “LIVE” badge
        },
      },
    },
  },
  plugins: [],
};
