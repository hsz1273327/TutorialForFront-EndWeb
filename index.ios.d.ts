export declare class JSONSchemaValidator {
    private schema;
    constructor(schemaString: string);
    validateJson(x: string): boolean;
}
