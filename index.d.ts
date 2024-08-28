interface MyvuepluginOptions {
    withComponents?: boolean;
}
declare module 'vue' {
    interface ComponentCustomProperties {
        $myvuepluginfunc: () => string;
    }
}
declare const _default: {
    install: (app: any, options: MyvuepluginOptions) => void;
};
export default _default;
