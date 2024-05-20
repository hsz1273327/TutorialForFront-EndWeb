// declare const JSONSchema: any




// @NativeClass()
// class JSObject extends NSObject implements NSCoding {
//   public encodeWithCoder(aCoder) {
//     /* ... */
//   }

//   public initWithCoder(aDecoder) {
//     /* ... */
//   }

//   public 'selectorWithX:andY:'(x, y) {
//     /* ... */
//   }

//   // An array of protocols to be implemented by the native class
//   public static ObjCProtocols = [NSCoding]

//   // A selector will be exposed so it can be called from native.
//   public static ObjCExposedMethods = {
//     'selectorWithX:andY:': {
//       returns: interop.types.void,
//       params: [interop.types.id, interop.types.id],
//     },
//   }
// }

export class JSONSchemaValidator {
  private schema: DSJSONSchema
  constructor(schemaString: string) {
    const content: NSString = NSString.stringWithString(schemaString)
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