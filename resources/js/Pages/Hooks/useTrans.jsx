import { usePage } from '@inertiajs/react';
import en from '../Lang/en.json';
import rw from '../Lang/rw.json';
import sw from '../Lang/sw.json';

const languages = { en, rw, sw };

export function useTrans() {
    const { locale } = usePage().props;

    const __ = (key) => {
        return languages[locale]?.[key] || languages['en']?.[key] || key;
    };

    return { __, locale };
}