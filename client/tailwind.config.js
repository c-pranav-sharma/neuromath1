/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'calm-cream': '#FDFCF0',
                'soft-charcoal': '#2D3436',
                'air-force-blue': '#5D8AA8',
                'muted-green': '#88B04B',
                'soft-amber': '#E09F3E',
                'focus-ring': '#A2D2FF',
                'sensory-dark': '#1e293b',
            },
            fontFamily: {
                sans: ['Verdana', 'sans-serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'breathe': 'breathe 4s ease-in-out infinite',
                'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
                'pop': 'pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                breathe: {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.02)' },
                },
                shake: {
                    '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
                    '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
                    '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
                    '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
                },
                pop: {
                    '0%': { transform: 'scale(0)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                }
            }
        },
    },
    plugins: [],
}
