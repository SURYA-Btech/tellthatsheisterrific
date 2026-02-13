/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                serif: ['"Bodoni Moda"', 'serif'],
                sans: ['"Inter"', 'sans-serif'],
            },
            colors: {
                cerulean: {
                    500: '#007BA7',
                }
            }
        },
    },
    plugins: [],
};
