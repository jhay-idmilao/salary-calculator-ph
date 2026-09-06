import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff9f3',
          100: '#d7f0e1',
          200: '#b1e0c4',
          300: '#80c9a1',
          400: '#4fac7c',
          500: '#2f8f60',
          600: '#21734c',
          700: '#1c5c3f',
          800: '#194a34',
          900: '#153d2c',
          950: '#0a2219'
        }
      }
    }
  }
}
