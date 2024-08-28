interface MyvuepluginOptions {
    withAllComponents?: boolean;
    [k: string]: any;
}
export interface ComponentCustomProperties {
    $myvuepluginfunc: () => string;
}
export declare const MyVuePlugin: {
    install: (app: any, options: MyvuepluginOptions) => void;
};
export {};
