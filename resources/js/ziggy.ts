import { Ziggy as ZiggyJs } from 'ziggy-js';

declare global {
    interface Window {
        route: (name: string, params?: Record<string, any>, absolute?: boolean) => string;
    }
}

// Si vous avez des routes Laravel, vous devez les définir ici manuellement.
const Ziggy = {
    // Exemple de routes
    home: '/home',
    products: {
        index: '/products',
        show: (id: number) => `/products/${id}`,
    },
};

window.Ziggy = Ziggy; // Rendre Ziggy accessible globalement
window.route = (name: string, params?: Record<string, any>, absolute?: boolean) => {
    return ZiggyJs[name](params, absolute);
};