import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";

const appName = import.meta.env.VITE_APP_NAME || "RUNUTRIDIET";

const pages = import.meta.glob("./Pages/**/*.jsx");

createInertiaApp({
    title: (title) => `${title} - ${appName}`,

    resolve: (name) => {
        return resolvePageComponent(
            `./Pages/${name}.jsx`,
            pages
        );
    },

    setup({ el, App, props }) {
        if (!el) {
            throw new Error("Inertia root element was not found.");
        }

        createRoot(el).render(<App {...props} />);
    },

    progress: {
        color: "#059669",
    },
});