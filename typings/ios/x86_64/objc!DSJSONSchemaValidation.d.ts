
declare class DSJSONBooleanSchema extends DSJSONSchema {

	static alloc(): DSJSONBooleanSchema; // inherited from NSObject

	static new(): DSJSONBooleanSchema; // inherited from NSObject

	static schemaWithDataBaseURIReferenceStorageSpecificationOptionsError(schemaData: NSData, baseURI: NSURL, referenceStorage: DSJSONSchemaStorage, specification: DSJSONSchemaSpecification, options: DSJSONSchemaValidationOptions): DSJSONBooleanSchema; // inherited from DSJSONSchema

	static schemaWithNumberBaseURISpecificationOptionsError(schemaNumber: number, baseURI: NSURL, specification: DSJSONSchemaSpecification, options: DSJSONSchemaValidationOptions): DSJSONBooleanSchema;

	static schemaWithObjectBaseURIReferenceStorageSpecificationOptionsError(foundationObject: any, baseURI: NSURL, referenceStorage: DSJSONSchemaStorage, specification: DSJSONSchemaSpecification, options: DSJSONSchemaValidationOptions): DSJSONBooleanSchema; // inherited from DSJSONSchema

	constructor(o: { scopeURI: NSURL; schemaValue: boolean; specification: DSJSONSchemaSpecification; options: DSJSONSchemaValidationOptions; });

	initWithScopeURISchemaValueSpecificationOptions(uri: NSURL, schemaValue: boolean, specification: DSJSONSchemaSpecification, options: DSJSONSchemaValidationOptions): this;
}

declare class DSJSONDictionarySchema extends DSJSONSchema {

	static alloc(): DSJSONDictionarySchema; // inherited from NSObject

	static new(): DSJSONDictionarySchema; // inherited from NSObject

	static schemaWithDataBaseURIReferenceStorageSpecificationOptionsError(schemaData: NSData, baseURI: NSURL, referenceStorage: DSJSONSchemaStorage, specification: DSJSONSchemaSpecification, options: DSJSONSchemaValidationOptions): DSJSONDictionarySchema; // inherited from DSJSONSchema

	static schemaWithDictionaryBaseURIReferenceStorageSpecificationOptionsError(schemaDictionary: NSDictionary<string, any>, baseURI: NSURL, referenceStorage: DSJSONSchemaStorage, specification: DSJSONSchemaSpecification, options: DSJSONSchemaValidationOptions): DSJSONDictionarySchema;

	static schemaWithObjectBaseURIReferenceStorageSpecificationOptionsError(foundationObject: any, baseURI: NSURL, referenceStorage: DSJSONSchemaStorage, specification: DSJSONSchemaSpecification, options: DSJSONSchemaValidationOptions): DSJSONDictionarySchema; // inherited from DSJSONSchema
}

declare class DSJSONSchema extends NSObject {

	static alloc(): DSJSONSchema; // inherited from NSObject

	static new(): DSJSONSchema; // inherited from NSObject

	static registerValidatorClassForMetaschemaURISpecificationWithError(validatorClass: typeof NSObject, metaschemaURI: NSURL, specification: DSJSONSchemaSpecification): boolean;

	static schemaWithDataBaseURIReferenceStorageSpecificationOptionsError(schemaData: NSData, baseURI: NSURL, referenceStorage: DSJSONSchemaStorage, specification: DSJSONSchemaSpecification, options: DSJSONSchemaValidationOptions): DSJSONSchema;

	static schemaWithObjectBaseURIReferenceStorageSpecificationOptionsError(foundationObject: any, baseURI: NSURL, referenceStorage: DSJSONSchemaStorage, specification: DSJSONSchemaSpecification, options: DSJSONSchemaValidationOptions): DSJSONSchema;

	static validatorsMappingForMetaschemaURISpecification(metaschemaURI: NSURL, specification: DSJSONSchemaSpecification): NSDictionary<string, typeof NSObject>;

	readonly options: DSJSONSchemaValidationOptions;

	readonly schemaDescription: string;

	readonly specification: DSJSONSchemaSpecification;

	readonly subschemas: NSArray<DSJSONSchema>;

	readonly title: string;

	readonly uri: NSURL;

	readonly validators: NSArray<DSJSONSchemaValidator>;

	constructor(o: { scopeURI: NSURL; title: string; description: string; validators: NSArray<DSJSONSchemaValidator> | DSJSONSchemaValidator[]; subschemas: NSArray<DSJSONSchema> | DSJSONSchema[]; specification: DSJSONSchemaSpecification; options: DSJSONSchemaValidationOptions; });

	detectReferenceCyclesWithError(): boolean;

	initWithScopeURITitleDescriptionValidatorsSubschemasSpecificationOptions(uri: NSURL, title: string, description: string, validators: NSArray<DSJSONSchemaValidator> | DSJSONSchemaValidator[], subschemas: NSArray<DSJSONSchema> | DSJSONSchema[], specification: DSJSONSchemaSpecification, options: DSJSONSchemaValidationOptions): this;

	resolveReferencesWithSchemaStorageError(schemaStorage: DSJSONSchemaStorage): boolean;

	validateObjectInContextError(object: any, context: DSJSONSchemaValidationContext): boolean;

	validateObjectWithDataError(data: NSData): boolean;

	validateObjectWithError(object: any): boolean;

	visitUsingBlock(block: (p1: DSJSONSchema, p2: interop.Pointer | interop.Reference<boolean>) => void): boolean;
}

declare class DSJSONSchemaArrayItemsValidator extends NSObject implements DSJSONSchemaValidator {

	static alloc(): DSJSONSchemaArrayItemsValidator; // inherited from NSObject

	static assignedKeywords(): NSSet<string>;

	static new(): DSJSONSchemaArrayItemsValidator; // inherited from NSObject

	static validatorWithDictionarySchemaFactoryError(schemaDictionary: NSDictionary<string, any>, schemaFactory: DSJSONSchemaFactory): DSJSONSchemaArrayItemsValidator;

	readonly additionalItemsAllowed: boolean;

	readonly additionalItemsSchema: DSJSONSchema;

	readonly itemSchemas: NSArray<DSJSONSchema>;

	readonly itemsSchema: DSJSONSchema;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	subschemas(): NSArray<DSJSONSchema>;

	validateInstanceInContextError(instance: any, context: DSJSONSchemaValidationContext): boolean;
}

declare class DSJSONSchemaArrayValidator extends NSObject implements DSJSONSchemaValidator {

	static alloc(): DSJSONSchemaArrayValidator; // inherited from NSObject

	static assignedKeywords(): NSSet<string>;

	static new(): DSJSONSchemaArrayValidator; // inherited from NSObject

	static validatorWithDictionarySchemaFactoryError(schemaDictionary: NSDictionary<string, any>, schemaFactory: DSJSONSchemaFactory): DSJSONSchemaArrayValidator;

	readonly maximumItems: number;

	readonly minimumItems: number;

	readonly uniqueItems: boolean;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	subschemas(): NSArray<DSJSONSchema>;

	validateInstanceInContextError(instance: any, context: DSJSONSchemaValidationContext): boolean;
}

declare class DSJSONSchemaCombiningValidator extends NSObject implements DSJSONSchemaValidator {

	static alloc(): DSJSONSchemaCombiningValidator; // inherited from NSObject

	static assignedKeywords(): NSSet<string>;

	static new(): DSJSONSchemaCombiningValidator; // inherited from NSObject

	static validatorWithDictionarySchemaFactoryError(schemaDictionary: NSDictionary<string, any>, schemaFactory: DSJSONSchemaFactory): DSJSONSchemaCombiningValidator;

	readonly allOfSchemas: NSArray<DSJSONSchema>;

	readonly anyOfSchemas: NSArray<DSJSONSchema>;

	readonly notSchema: DSJSONSchema;

	readonly oneOfSchemas: NSArray<DSJSONSchema>;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	subschemas(): NSArray<DSJSONSchema>;

	validateInstanceInContextError(instance: any, context: DSJSONSchemaValidationContext): boolean;
}

declare class DSJSONSchemaConditionalValidator extends NSObject implements DSJSONSchemaValidator {

	static alloc(): DSJSONSchemaConditionalValidator; // inherited from NSObject

	static assignedKeywords(): NSSet<string>;

	static new(): DSJSONSchemaConditionalValidator; // inherited from NSObject

	static validatorWithDictionarySchemaFactoryError(schemaDictionary: NSDictionary<string, any>, schemaFactory: DSJSONSchemaFactory): DSJSONSchemaConditionalValidator;

	readonly elseSchema: DSJSONSchema;

	readonly ifSchema: DSJSONSchema;

	readonly thenSchema: DSJSONSchema;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	subschemas(): NSArray<DSJSONSchema>;

	validateInstanceInContextError(instance: any, context: DSJSONSchemaValidationContext): boolean;
}

declare class DSJSONSchemaConstValidator extends NSObject implements DSJSONSchemaValidator {

	static alloc(): DSJSONSchemaConstValidator; // inherited from NSObject

	static assignedKeywords(): NSSet<string>;

	static new(): DSJSONSchemaConstValidator; // inherited from NSObject

	static validatorWithDictionarySchemaFactoryError(schemaDictionary: NSDictionary<string, any>, schemaFactory: DSJSONSchemaFactory): DSJSONSchemaConstValidator;

	readonly value: any;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	subschemas(): NSArray<DSJSONSchema>;

	validateInstanceInContextError(instance: any, context: DSJSONSchemaValidationContext): boolean;
}

declare class DSJSONSchemaContainsValidator extends NSObject implements DSJSONSchemaValidator {

	static alloc(): DSJSONSchemaContainsValidator; // inherited from NSObject

	static assignedKeywords(): NSSet<string>;

	static new(): DSJSONSchemaContainsValidator; // inherited from NSObject

	static validatorWithDictionarySchemaFactoryError(schemaDictionary: NSDictionary<string, any>, schemaFactory: DSJSONSchemaFactory): DSJSONSchemaContainsValidator;

	readonly schema: DSJSONSchema;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	subschemas(): NSArray<DSJSONSchema>;

	validateInstanceInContextError(instance: any, context: DSJSONSchemaValidationContext): boolean;
}

declare class DSJSONSchemaContentValidator extends NSObject implements DSJSONSchemaValidator {

	static alloc(): DSJSONSchemaContentValidator; // inherited from NSObject

	static assignedKeywords(): NSSet<string>;

	static new(): DSJSONSchemaContentValidator; // inherited from NSObject

	static registerEncodingWithBlockError(encoding: string, block: (p1: any, p2: DSJSONSchemaContentValidator, p3: DSJSONSchemaValidationContext, p4: interop.Pointer | interop.Reference<NSError>) => any): boolean;

	static registerMediaTypeWithBlockError(mediaType: string, block: (p1: any, p2: DSJSONSchemaContentValidator, p3: DSJSONSchemaValidationContext, p4: interop.Pointer | interop.Reference<NSError>) => boolean): boolean;

	static validatorWithDictionarySchemaFactoryError(schemaDictionary: NSDictionary<string, any>, schemaFactory: DSJSONSchemaFactory): DSJSONSchemaContentValidator;

	readonly encoding: string;

	readonly mediaType: string;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	subschemas(): NSArray<DSJSONSchema>;

	validateInstanceInContextError(instance: any, context: DSJSONSchemaValidationContext): boolean;
}

declare class DSJSONSchemaDefinitions extends NSObject implements DSJSONSchemaValidator {

	static alloc(): DSJSONSchemaDefinitions; // inherited from NSObject

	static assignedKeywords(): NSSet<string>;

	static new(): DSJSONSchemaDefinitions; // inherited from NSObject

	static validatorWithDictionarySchemaFactoryError(schemaDictionary: NSDictionary<string, any>, schemaFactory: DSJSONSchemaFactory): DSJSONSchemaDefinitions;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	subschemas(): NSArray<DSJSONSchema>;

	validateInstanceInContextError(instance: any, context: DSJSONSchemaValidationContext): boolean;
}

declare class DSJSONSchemaDependenciesValidator extends NSObject implements DSJSONSchemaValidator {

	static alloc(): DSJSONSchemaDependenciesValidator; // inherited from NSObject

	static assignedKeywords(): NSSet<string>;

	static new(): DSJSONSchemaDependenciesValidator; // inherited from NSObject

	static validatorWithDictionarySchemaFactoryError(schemaDictionary: NSDictionary<string, any>, schemaFactory: DSJSONSchemaFactory): DSJSONSchemaDependenciesValidator;

	readonly propertyDependencies: NSDictionary<string, NSSet<string>>;

	readonly schemaDependencies: NSDictionary<string, DSJSONSchema>;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	subschemas(): NSArray<DSJSONSchema>;

	validateInstanceInContextError(instance: any, context: DSJSONSchemaValidationContext): boolean;
}

declare class DSJSONSchemaEnumValidator extends NSObject implements DSJSONSchemaValidator {

	static alloc(): DSJSONSchemaEnumValidator; // inherited from NSObject

	static assignedKeywords(): NSSet<string>;

	static new(): DSJSONSchemaEnumValidator; // inherited from NSObject

	static validatorWithDictionarySchemaFactoryError(schemaDictionary: NSDictionary<string, any>, schemaFactory: DSJSONSchemaFactory): DSJSONSchemaEnumValidator;

	readonly valueOptions: NSArray<any>;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	subschemas(): NSArray<DSJSONSchema>;

	validateInstanceInContextError(instance: any, context: DSJSONSchemaValidationContext): boolean;
}

declare const enum DSJSONSchemaErrorCode {

	IncompatibleMetaschema = 100,

	InvalidSchemaFormat = 101,

	InvalidResolutionScope = 102,

	DuplicateResolutionScope = 103,

	InvalidSchemaReference = 104,

	UnresolvableSchemaReference = 105,

	ReferenceCycle = 106,

	InvalidRegularExpression = 107,

	NoValidatorKeywordsDefined = 200,

	ValidatorKeywordAlreadyDefined = 201,

	FormatNameAlreadyDefined = 202,

	ContentDecoderAlreadyDefined = 203,

	ContentMediaTypeValidatorAlreadyDefined = 204,

	ValidationFailed = 300,

	ValidationInfiniteLoop = 301
}

declare var DSJSONSchemaErrorDomain: string;

declare var DSJSONSchemaErrorFailingObjectKey: string;

declare var DSJSONSchemaErrorFailingObjectPathKey: string;

declare var DSJSONSchemaErrorFailingValidatorKey: string;

declare class DSJSONSchemaFactory extends NSObject {

	static alloc(): DSJSONSchemaFactory; // inherited from NSObject

	static factoryWithScopeURIKeywordsMappingSpecificationOptions(scopeURI: NSURL, keywordsMapping: NSDictionary<string, typeof NSObject>, specification: DSJSONSchemaSpecification, options: DSJSONSchemaValidationOptions): DSJSONSchemaFactory;

	static new(): DSJSONSchemaFactory; // inherited from NSObject

	readonly keywordsMapping: NSDictionary<string, typeof NSObject>;

	readonly options: DSJSONSchemaValidationOptions;

	readonly scopeURI: NSURL;

	readonly specification: DSJSONSchemaSpecification;

	factoryByAppendingScopeComponent(scopeComponent: string): this;

	factoryByAppendingScopeComponentsFromArray(scopeComponentsArray: NSArray<string> | string[]): this;

	factoryByReplacingScopeURI(scopeURI: NSURL): this;

	schemaWithObjectError(foundationObject: any): DSJSONSchema;
}

declare class DSJSONSchemaFormatValidator extends NSObject implements DSJSONSchemaValidator {

	static alloc(): DSJSONSchemaFormatValidator; // inherited from NSObject

	static assignedKeywords(): NSSet<string>;

	static new(): DSJSONSchemaFormatValidator; // inherited from NSObject

	static registerFormatWithBlockError(format: string, block: (p1: any) => boolean): boolean;

	static registerFormatWithRegularExpressionError(format: string, regularExpression: NSRegularExpression): boolean;

	static validatorWithDictionarySchemaFactoryError(schemaDictionary: NSDictionary<string, any>, schemaFactory: DSJSONSchemaFactory): DSJSONSchemaFormatValidator;

	readonly formatName: string;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	subschemas(): NSArray<DSJSONSchema>;

	validateInstanceInContextError(instance: any, context: DSJSONSchemaValidationContext): boolean;
}

declare const enum DSJSONSchemaInstanceTypes {

	None = 0,

	Object = 1,

	Array = 2,

	String = 4,

	Integer = 8,

	Number = 16,

	Boolean = 32,

	Null = 64
}

declare class DSJSONSchemaNumericValidator extends NSObject implements DSJSONSchemaValidator {

	static alloc(): DSJSONSchemaNumericValidator; // inherited from NSObject

	static assignedKeywords(): NSSet<string>;

	static new(): DSJSONSchemaNumericValidator; // inherited from NSObject

	static validatorWithDictionarySchemaFactoryError(schemaDictionary: NSDictionary<string, any>, schemaFactory: DSJSONSchemaFactory): DSJSONSchemaNumericValidator;

	readonly exclusiveMaximum: boolean;

	readonly exclusiveMinimum: boolean;

	readonly maximum: number;

	readonly minimum: number;

	readonly multipleOf: NSDecimalNumber;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	subschemas(): NSArray<DSJSONSchema>;

	validateInstanceInContextError(instance: any, context: DSJSONSchemaValidationContext): boolean;
}

declare class DSJSONSchemaObjectPropertiesValidator extends NSObject implements DSJSONSchemaValidator {

	static alloc(): DSJSONSchemaObjectPropertiesValidator; // inherited from NSObject

	static assignedKeywords(): NSSet<string>;

	static new(): DSJSONSchemaObjectPropertiesValidator; // inherited from NSObject

	static validatorWithDictionarySchemaFactoryError(schemaDictionary: NSDictionary<string, any>, schemaFactory: DSJSONSchemaFactory): DSJSONSchemaObjectPropertiesValidator;

	readonly additionalPropertiesAllowed: boolean;

	readonly additionalPropertiesSchema: DSJSONSchema;

	readonly patternBasedPropertySchemas: NSDictionary<NSRegularExpression, DSJSONSchema>;

	readonly propertySchemas: NSDictionary<string, DSJSONSchema>;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	subschemas(): NSArray<DSJSONSchema>;

	validateInstanceInContextError(instance: any, context: DSJSONSchemaValidationContext): boolean;
}

declare class DSJSONSchemaObjectValidator extends NSObject implements DSJSONSchemaValidator {

	static alloc(): DSJSONSchemaObjectValidator; // inherited from NSObject

	static assignedKeywords(): NSSet<string>;

	static new(): DSJSONSchemaObjectValidator; // inherited from NSObject

	static validatorWithDictionarySchemaFactoryError(schemaDictionary: NSDictionary<string, any>, schemaFactory: DSJSONSchemaFactory): DSJSONSchemaObjectValidator;

	readonly maximumProperties: number;

	readonly minimumProperties: number;

	readonly requiredProperties: NSSet<string>;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	subschemas(): NSArray<DSJSONSchema>;

	validateInstanceInContextError(instance: any, context: DSJSONSchemaValidationContext): boolean;
}

declare class DSJSONSchemaPropertyNamesValidator extends NSObject implements DSJSONSchemaValidator {

	static alloc(): DSJSONSchemaPropertyNamesValidator; // inherited from NSObject

	static assignedKeywords(): NSSet<string>;

	static new(): DSJSONSchemaPropertyNamesValidator; // inherited from NSObject

	static validatorWithDictionarySchemaFactoryError(schemaDictionary: NSDictionary<string, any>, schemaFactory: DSJSONSchemaFactory): DSJSONSchemaPropertyNamesValidator;

	readonly schema: DSJSONSchema;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	subschemas(): NSArray<DSJSONSchema>;

	validateInstanceInContextError(instance: any, context: DSJSONSchemaValidationContext): boolean;
}

declare class DSJSONSchemaReference extends DSJSONSchema {

	static alloc(): DSJSONSchemaReference; // inherited from NSObject

	static new(): DSJSONSchemaReference; // inherited from NSObject

	static schemaWithDataBaseURIReferenceStorageSpecificationOptionsError(schemaData: NSData, baseURI: NSURL, referenceStorage: DSJSONSchemaStorage, specification: DSJSONSchemaSpecification, options: DSJSONSchemaValidationOptions): DSJSONSchemaReference; // inherited from DSJSONSchema

	static schemaWithObjectBaseURIReferenceStorageSpecificationOptionsError(foundationObject: any, baseURI: NSURL, referenceStorage: DSJSONSchemaStorage, specification: DSJSONSchemaSpecification, options: DSJSONSchemaValidationOptions): DSJSONSchemaReference; // inherited from DSJSONSchema

	readonly referenceURI: NSURL;

	readonly referencedSchema: DSJSONSchema;

	constructor(o: { scopeURI: NSURL; referenceURI: NSURL; subschemas: NSArray<DSJSONSchema> | DSJSONSchema[]; specification: DSJSONSchemaSpecification; options: DSJSONSchemaValidationOptions; });

	initWithScopeURIReferenceURISubschemasSpecificationOptions(uri: NSURL, referenceURI: NSURL, subschemas: NSArray<DSJSONSchema> | DSJSONSchema[], specification: DSJSONSchemaSpecification, options: DSJSONSchemaValidationOptions): this;

	resolveReferenceWithSchema(schema: DSJSONSchema): void;
}

declare class DSJSONSchemaSpecification extends NSObject {

	static alloc(): DSJSONSchemaSpecification; // inherited from NSObject

	static draft4(): DSJSONSchemaSpecification;

	static draft6(): DSJSONSchemaSpecification;

	static draft7(): DSJSONSchemaSpecification;

	static new(): DSJSONSchemaSpecification; // inherited from NSObject

	readonly defaultMetaschemaURI: NSURL;

	readonly idKeyword: string;

	readonly keywords: NSSet<string>;

	readonly supportedMetaschemaURIs: NSSet<NSURL>;

	readonly unsupportedMetaschemaURIs: NSSet<NSURL>;

	readonly version: DSJSONSchemaSpecificationVersion;
}

declare const enum DSJSONSchemaSpecificationVersion {

	Draft4 = 0,

	Draft6 = 1,

	Draft7 = 2
}

declare class DSJSONSchemaStorage extends NSObject implements NSCopying, NSMutableCopying {

	static alloc(): DSJSONSchemaStorage; // inherited from NSObject

	static new(): DSJSONSchemaStorage; // inherited from NSObject

	static storage(): DSJSONSchemaStorage;

	static storageWithSchema(schema: DSJSONSchema): DSJSONSchemaStorage;

	static storageWithSchemasArray(schemas: NSArray<DSJSONSchema> | DSJSONSchema[]): DSJSONSchemaStorage;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	mutableCopyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	schemaForURI(schemaURI: NSURL): DSJSONSchema;

	storageByAddingSchema(schema: DSJSONSchema): this;
}

declare class DSJSONSchemaStringValidator extends NSObject implements DSJSONSchemaValidator {

	static alloc(): DSJSONSchemaStringValidator; // inherited from NSObject

	static assignedKeywords(): NSSet<string>;

	static new(): DSJSONSchemaStringValidator; // inherited from NSObject

	static validatorWithDictionarySchemaFactoryError(schemaDictionary: NSDictionary<string, any>, schemaFactory: DSJSONSchemaFactory): DSJSONSchemaStringValidator;

	readonly maximumLength: number;

	readonly minimumLength: number;

	readonly regularExpression: NSRegularExpression;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	subschemas(): NSArray<DSJSONSchema>;

	validateInstanceInContextError(instance: any, context: DSJSONSchemaValidationContext): boolean;
}

declare class DSJSONSchemaTypeValidator extends NSObject implements DSJSONSchemaValidator {

	static alloc(): DSJSONSchemaTypeValidator; // inherited from NSObject

	static assignedKeywords(): NSSet<string>;

	static new(): DSJSONSchemaTypeValidator; // inherited from NSObject

	static validatorWithDictionarySchemaFactoryError(schemaDictionary: NSDictionary<string, any>, schemaFactory: DSJSONSchemaFactory): DSJSONSchemaTypeValidator;

	readonly types: DSJSONSchemaInstanceTypes;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	subschemas(): NSArray<DSJSONSchema>;

	validateInstanceInContextError(instance: any, context: DSJSONSchemaValidationContext): boolean;
}

declare class DSJSONSchemaValidationContext extends NSObject {

	static alloc(): DSJSONSchemaValidationContext; // inherited from NSObject

	static new(): DSJSONSchemaValidationContext; // inherited from NSObject

	readonly validatedObject: any;

	readonly validatedSchema: DSJSONSchema;

	readonly validationPath: string;

	popValidatedSchemaAndObject(): void;

	popValidationPathComponent(): void;

	pushValidatedSchemaObjectWithError(validatedSchema: DSJSONSchema, validatedObject: any): boolean;

	pushValidationPathComponent(pathComponent: string): void;
}

declare class DSJSONSchemaValidationOptions extends NSObject {

	static alloc(): DSJSONSchemaValidationOptions; // inherited from NSObject

	static new(): DSJSONSchemaValidationOptions; // inherited from NSObject

	removeAdditional: DSJSONSchemaValidationOptionsRemoveAdditional;
}

declare const enum DSJSONSchemaValidationOptionsRemoveAdditional {

	None = 0,

	Yes = 1
}

declare var DSJSONSchemaValidationVersionNumber: number;

declare var DSJSONSchemaValidationVersionString: interop.Reference<number>;

interface DSJSONSchemaValidator extends NSObjectProtocol {

	subschemas(): NSArray<DSJSONSchema>;

	validateInstanceInContextError(instance: any, context: DSJSONSchemaValidationContext): boolean;
}
declare var DSJSONSchemaValidator: {

	prototype: DSJSONSchemaValidator;

	assignedKeywords(): NSSet<string>;

	validatorWithDictionarySchemaFactoryError(schemaDictionary: NSDictionary<string, any>, schemaFactory: DSJSONSchemaFactory): DSJSONSchemaValidator;
};

declare class DSMutableJSONSchemaStorage extends DSJSONSchemaStorage {

	static alloc(): DSMutableJSONSchemaStorage; // inherited from NSObject

	static new(): DSMutableJSONSchemaStorage; // inherited from NSObject

	static storage(): DSMutableJSONSchemaStorage; // inherited from DSJSONSchemaStorage

	static storageWithSchema(schema: DSJSONSchema): DSMutableJSONSchemaStorage; // inherited from DSJSONSchemaStorage

	static storageWithSchemasArray(schemas: NSArray<DSJSONSchema> | DSJSONSchema[]): DSMutableJSONSchemaStorage; // inherited from DSJSONSchemaStorage

	addSchema(schema: DSJSONSchema): boolean;
}
