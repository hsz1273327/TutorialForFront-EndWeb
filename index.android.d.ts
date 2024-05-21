export declare class MyHello {
    private helloKotlin;
    constructor();
    get hello(): any;
    add(x: number, y: number): any;
}
export declare class JSONSchemaValidator {
    private schemaStore;
    private schema;
    private validator;
    constructor(schemaString: string);
    validateJson(x: string): boolean;
}
