import type {Config} from "tailwindcss";
import forms from "@tailwindcss/forms";
import aspectRatio from "@tailwindcss/aspect-ratio";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
        },
    },
    plugins: [
        forms,
        aspectRatio,
    ],
} as Config;

export default config;
