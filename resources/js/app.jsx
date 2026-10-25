import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import PwaInstallPrompt from "./Components/PwaInstallPrompt";
import "./pwa";

const appName = import.meta.env.VITE_APP_NAME || "runutridiet";

if ("serviceWorker" in navigator && import.meta.env.PROD) {
    navigator.serviceWorker.register("/sw.js", {
        scope: "/",
        updateViaCache: "none",
    }).catch((error) => {
        console.error("PWA service worker registration failed:", error);
    });
}

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

        createRoot(el).render(
            <>
                <App {...props} />
                <PwaInstallPrompt />
            </>
        );
    },

    progress: {
        color: "#059669",
    },
});