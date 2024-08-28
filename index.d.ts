interface MyvuepluginOptions {
    withComponents?: boolean;
}
export interface ComponentCustomProperties {
    $myvuepluginfunc: () => string;
}
export declare const MyVuePlugin: {
    install: (app: any, options: MyvuepluginOptions) => void;
};
export {};
