// export declare class MyHello {
//     private helloSwift;
//     constructor();
//     get hello(): any;
//     add(x: number, y: number): any;
// }
export declare class JSONSchemaValidator {
    private schema;
    constructor(schemaString: string);
    validateJson(x: string): boolean;
}