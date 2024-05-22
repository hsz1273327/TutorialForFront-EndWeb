// declare const DSJSONSchema: any
// declare const DSJSONSchemaSpecification: any
export class JSONSchemaValidator {
  // private schema: any
  private schema: DSJSONSchema
  constructor(schemaString: string) {
    const content = NSString.stringWithString(schemaString)
    console.log("content#1: " + content)
    const nsData: NSData = content.dataUsingEncoding(NSUTF8StringEncoding)
    const schemaJSON = NSJSONSerialization.JSONObjectWithDataOptionsError(nsData, null)
    this.schema = DSJSONSchema.schemaWithObjectBaseURIReferenceStorageSpecificationOptionsError(schemaJSON, null, null, DSJSONSchemaSpecification.draft7(), null)
  }

  validateJson(x: string): boolean {
    try {
      const content: NSString = NSString.stringWithString(x)
      const nsData: NSData = content.dataUsingEncoding(NSUTF8StringEncoding)
      const res = this.schema.validateObjectWithDataError(nsData)
      console.log("validateJson res: " + res)
      return true
    } catch (error) {
      console.log(`validator get error ${error}`)
      return false
    }
  }
}