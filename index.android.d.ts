export declare class JSONSchemaValidator {
    private schemaStore;
    private schema;
    private validator;
    constructor(schemaString: string);
    validateJson(x: string): boolean;
}
