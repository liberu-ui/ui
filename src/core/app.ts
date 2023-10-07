import Resources from './services/resources';

interface NavbarItem {
    key: string;
    component: any;
    order: number;
    permission: string | null;
}

interface SettingsItem {
    key: string;
    component: any;
    order: number;
    permission: string | null;
}

class App {
    instance: any;
    store: any;
    router: any;
    navbarItems: NavbarItem[];
    settingsItems: SettingsItem[];

    constructor() {
        this.instance = null;
        this.store = null;
        this.router = null;
        this.navbarItems = [];
        this.settingsItems = [];
    }

    boot(app: any, store: any, router: any) {
        this.instance = app;
        this.store = store;
        this.router = router;
        Resources.boot();
    }

    registerNavbarItem(key: string, component: any, order: number, permission: string | null = null) {
        const item: NavbarItem = { key, component, order, permission };
        this.navbarItems.push(item);
    }

    registerSettingsItem(key: string, component: any, order: number, permission: string | null = null) {
        const item: SettingsItem = { key, component, order, permission };
        this.settingsItems.push(item);
    }
}

export default new App();
