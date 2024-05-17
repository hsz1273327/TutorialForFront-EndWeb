// declare const JSONSchema: any

export class JSONSchemaValidator {
    private schema: DSJSONSchema
    constructor(schemaString: string) {
        NSJSONSerialization.JSONObjectWithStreamOptionsError
        this.schema = DSJSONSchema.schemaWithObjectBaseURIReferenceStorageSpecificationOptionsError()
    }

    validateJson(x: string): boolean {
        try {
            this.validator.validateJson(this.schema, x)
            return true
        } catch (error) {
            console.log(`validator get error ${error}`)
            return false
        }

    }
}
