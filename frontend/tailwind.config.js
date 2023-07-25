import formsPlugin from '@tailwindcss/forms';

const config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [formsPlugin],
};

export default config;
