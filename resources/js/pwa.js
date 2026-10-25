let installPrompt = null;
const installPromptListeners = new Set();

function notifyInstallPromptListeners() {
    installPromptListeners.forEach((listener) => listener(installPrompt));
}

if (typeof window !== 'undefined') {
    window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault();
        installPrompt = event;
        notifyInstallPromptListeners();
    });

    window.addEventListener('appinstalled', () => {
        installPrompt = null;
        notifyInstallPromptListeners();
    });
}

export function getPwaInstallPrompt() {
    return installPrompt;
}

export function subscribeToPwaInstallPrompt(listener) {
    installPromptListeners.add(listener);
    return () => {
        installPromptListeners.delete(listener);
    };
}

export function clearPwaInstallPrompt() {
    installPrompt = null;
    notifyInstallPromptListeners();
}
