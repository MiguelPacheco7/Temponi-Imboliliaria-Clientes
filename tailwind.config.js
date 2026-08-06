/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Suas paletas originais mantidas
        brand: { 50: '#FAF8EF', /* ... */ },
        ink: { 50: '#F5F5F4', /* ... */ 600: '#4A4845', /* ... */ 900: '#171615', },
        sand: { DEFAULT: '#F1EEE8', warm: '#EDE9E0', cool: '#F4F3EE', },
        navy: { 50: '#EEF1F7', /* ... */ 700: '#1E2B48', /* ... */ },
        
        // ADICIONADO: Paleta Temponi exigida pelo seu index.html
        temponi: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        script: ['"Great Vibes"', '"Dancing Script"', 'cursive'],
      },
      // ... mantenha as suas animations e keyframes aqui
    },
  },
  plugins: [],
}