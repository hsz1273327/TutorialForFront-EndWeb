declare const net: any

export class JSONSchemaValidator {
    private schemaStore: any
    private schema: any
    private validator: any
    constructor(schemaString:string) {
        this.schemaStore = new net.jimblackler.jsonschemafriend.SchemaStore()
        this.schema = this.schemaStore.loadSchemaJson(schemaString)
        this.validator = new net.jimblackler.jsonschemafriend.Validator()
    }

    validateJson(x: string):boolean {
        try {
            this.validator.validateJson(this.schema,x)
            return true
        } catch (error) {
            console.log(`validator get error ${error}`)
            return false
        }
        
    }
}
