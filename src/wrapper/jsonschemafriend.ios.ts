// declare const JSONSchema: any




@NativeClass()
class JSObject extends NSObject implements NSCoding {
  public encodeWithCoder(aCoder) {
    /* ... */
  }

  public initWithCoder(aDecoder) {
    /* ... */
  }

  public 'selectorWithX:andY:'(x, y) {
    /* ... */
  }

  // An array of protocols to be implemented by the native class
  public static ObjCProtocols = [NSCoding]

  // A selector will be exposed so it can be called from native.
  public static ObjCExposedMethods = {
    'selectorWithX:andY:': {
      returns: interop.types.void,
      params: [interop.types.id, interop.types.id],
    },
  }
}

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