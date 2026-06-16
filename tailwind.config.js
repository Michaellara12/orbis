/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // COLOR SYSTEM
        space: '#010828', // deep dark navy blue (page background)
        cream: '#EFF4FF', // off-white, used for all text
        neon: '#6FFF00', // bright green, accent cursive + underline bars
      },
      fontFamily: {
        // Anton — all headings & navigation
        grotesk: ['Anton', 'sans-serif'],
        // Condiment — cursive script accent / overlay text
        condiment: ['Condiment', 'cursive'],
        // Orbitron — futuristic gaming UI / body text
        gaming: ['Orbitron', 'sans-serif'],
        // System monospace — body / description paragraphs
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
      },
    },
  },
  plugins: [],
}
