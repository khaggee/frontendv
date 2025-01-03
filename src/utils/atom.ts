'use client'

import { useEffect, useState } from "react";

type Listener<T> = (newValue: T) => void;

class Atom<T> {

    private value: T;
    private listeners: Set<Listener<T>> = new Set([])

    constructor(initialValue: T) {
        this.value = initialValue;
    }

    get() {
        return this.value;
    }

    set(newValue: T): void {
        if (this.value !== newValue) {
            this.value = newValue;
            this.listeners.forEach(listener => listener(newValue))
        }
    }

    subscribe(newListener: Listener<T>): () => void {
        this.listeners.add(newListener)
        return () => this.listeners.delete(newListener)
    }
}

export type PersistConfig<T> = {
    key: string;
    storage: Storage;
    defaultValue?: T;
};

export function atom<T>(initialValue: T, config?: PersistConfig<T>): Atom<T> {
    const persistedValue = config
        ? config.storage.getItem(config.key)
        : null;

    const value = persistedValue !== null
        ? JSON.parse(persistedValue)
        : initialValue;

    const atomInstance = new Atom(value);

    if (config) {
        atomInstance.subscribe((newValue) => {
            config.storage.setItem(config.key, JSON.stringify(newValue));
        });
    }

    return atomInstance;
}
export function useAtom<T>(atom: Atom<T>): [T, (newValue: T) => void] {
    const [state, setState] = useState(atom.get())

    useEffect(() => {
        const unsub = atom.subscribe(setState)
        return unsub
    }, [atom])

    return [state, atom.set.bind(atom)]
}

export const countAtom = atom({
    value: 0
}, {
    key: 'EASY',
    storage: localStorage
})
