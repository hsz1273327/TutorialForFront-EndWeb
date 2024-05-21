export class JSONSchemaValidator {
    constructor(schemaString) {
        const content = NSString.stringWithString(schemaString);
        console.log("content#1: " + content);
        const nsData = content.dataUsingEncoding(NSUTF8StringEncoding);
        const schemaJSON = NSJSONSerialization.JSONObjectWithDataOptionsError(nsData, null);
        this.schema = DSJSONSchema.schemaWithObjectBaseURIReferenceStorageSpecificationOptionsError(schemaJSON, null, null, DSJSONSchemaSpecification.draft7(), null);
    }
    validateJson(x) {
        try {
            const content = NSString.stringWithString(x);
            const nsData = content.dataUsingEncoding(NSUTF8StringEncoding);
            const res = this.schema.validateObjectWithDataError(nsData);
            console.log("validateJson res: " + res);
            return true;
        }
        catch (error) {
            console.log(`validator get error ${error}`);
            return false;
        }
    }
}
//# sourceMappingURL=index.ios.js.map