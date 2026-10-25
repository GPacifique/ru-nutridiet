import { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';
import {
    clearPwaInstallPrompt,
    getPwaInstallPrompt,
    subscribeToPwaInstallPrompt,
} from '../pwa';

function isStandalone() {
    return window.matchMedia('(display-mode: standalone)').matches
        || window.matchMedia('(display-mode: fullscreen)').matches
        || window.navigator.standalone === true;
}

function isAppleMobileDevice() {
    return /iPhone|iPad|iPod/i.test(window.navigator.userAgent)
        || (window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1);
}

export default function PwaInstallPrompt() {
    const [installPrompt, setInstallPrompt] = useState(getPwaInstallPrompt);
    const [installed, setInstalled] = useState(false);
    const [showGuide, setShowGuide] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const unsubscribe = subscribeToPwaInstallPrompt(setInstallPrompt);
        const handleAppInstalled = () => {
            setInstalled(true);
            setShowGuide(false);
            setMessage('RUNUTRIDIET has been installed.');
        };

        window.addEventListener('appinstalled', handleAppInstalled);
        setInstalled(isStandalone());

        return () => {
            unsubscribe();
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, []);

    const install = async () => {
        if (!installPrompt) {
            setShowGuide(true);
            setMessage('');
            return;
        }

        try {
            await installPrompt.prompt();
            const { outcome } = await installPrompt.userChoice;
            clearPwaInstallPrompt();
            setInstallPrompt(null);
            setMessage(outcome === 'accepted' ? 'Installing RUNUTRIDIET...' : 'Installation was canceled.');
        } catch (error) {
            console.error('PWA installation prompt failed:', error);
            clearPwaInstallPrompt();
            setInstallPrompt(null);
            setMessage('Could not open the installation prompt. Use your browser menu to install the app.');
            setShowGuide(true);
        }
    };

    if (installed) return null;

    const appleDevice = isAppleMobileDevice();

    return (
        <div className="fixed bottom-5 right-5 z-40 flex max-w-[min(22rem,calc(100vw-2.5rem))] flex-col items-end gap-2">
            {message && (
                <p role="status" className="rounded-lg bg-white px-4 py-2 text-sm text-slate-700 shadow-lg">
                    {message}
                </p>
            )}

            {showGuide && (
                <section
                    aria-labelledby="pwa-install-title"
                    className="w-full rounded-xl border border-slate-200 bg-white p-4 shadow-xl"
                >
                    <div className="flex items-start justify-between gap-3">
                        <h2 id="pwa-install-title" className="font-semibold text-slate-900">
                            Install RUNUTRIDIET
                        </h2>
                        <button
                            type="button"
                            onClick={() => setShowGuide(false)}
                            aria-label="Close installation instructions"
                            className="rounded p-1 text-slate-500 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700"
                        >
                            <X className="h-4 w-4" aria-hidden="true" />
                        </button>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">
                        {appleDevice
                            ? 'In Safari, tap Share, then choose “Add to Home Screen”.'
                            : 'Open your browser menu and choose “Install app” or “Add to Home screen”.'}
                    </p>
                </section>
            )}

            <button
                type="button"
                onClick={install}
                aria-expanded={showGuide}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-3 font-semibold text-white shadow-lg transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            >
                <Download className="h-4 w-4" aria-hidden="true" />
                {installPrompt ? 'Install app' : 'Add to home screen'}
            </button>
        </div>
    );
}
