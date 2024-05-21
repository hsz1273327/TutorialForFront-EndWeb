export class JSONSchemaValidator {
    constructor(schemaString) {
        this.schemaStore = new net.jimblackler.jsonschemafriend.SchemaStore();
        this.schema = this.schemaStore.loadSchemaJson(schemaString);
        this.validator = new net.jimblackler.jsonschemafriend.Validator();
    }
    validateJson(x) {
        try {
            this.validator.validateJson(this.schema, x);
            return true;
        }
        catch (error) {
            console.log(`validator get error ${error}`);
            return false;
        }
    }
}
//# sourceMappingURL=index.android.js.map