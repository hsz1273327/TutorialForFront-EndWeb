
declare function MLAllComputeDevices(): NSArray<MLComputeDeviceProtocol>;

declare class MLArrayBatchProvider extends NSObject implements MLBatchProvider {

	static alloc(): MLArrayBatchProvider; // inherited from NSObject

	static new(): MLArrayBatchProvider; // inherited from NSObject

	readonly array: NSArray<MLFeatureProvider>;

	readonly count: number; // inherited from MLBatchProvider

	constructor(o: { dictionary: NSDictionary<string, NSArray<any>>; });

	constructor(o: { featureProviderArray: NSArray<MLFeatureProvider> | MLFeatureProvider[]; });

	featuresAtIndex(index: number): MLFeatureProvider;

	initWithDictionaryError(dictionary: NSDictionary<string, NSArray<any>>): this;

	initWithFeatureProviderArray(array: NSArray<MLFeatureProvider> | MLFeatureProvider[]): this;
}

interface MLBatchProvider {

	count: number;

	featuresAtIndex(index: number): MLFeatureProvider;
}
declare var MLBatchProvider: {

	prototype: MLBatchProvider;
};

declare class MLCPUComputeDevice extends NSObject implements MLComputeDeviceProtocol {

	static alloc(): MLCPUComputeDevice; // inherited from NSObject

	static new(): MLCPUComputeDevice; // inherited from NSObject

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
}

interface MLComputeDeviceProtocol extends NSObjectProtocol {
}
declare var MLComputeDeviceProtocol: {

	prototype: MLComputeDeviceProtocol;
};

declare class MLComputePlan extends NSObject {

	static alloc(): MLComputePlan; // inherited from NSObject

	static loadContentsOfURLConfigurationCompletionHandler(url: NSURL, configuration: MLModelConfiguration, handler: (p1: MLComputePlan, p2: NSError) => void): void;

	static loadModelAssetConfigurationCompletionHandler(asset: MLModelAsset, configuration: MLModelConfiguration, handler: (p1: MLComputePlan, p2: NSError) => void): void;

	static new(): MLComputePlan; // inherited from NSObject

	readonly modelStructure: MLModelStructure;

	computeDeviceUsageForMLProgramOperation(operation: MLModelStructureProgramOperation): MLComputePlanDeviceUsage;

	computeDeviceUsageForNeuralNetworkLayer(layer: MLModelStructureNeuralNetworkLayer): MLComputePlanDeviceUsage;

	estimatedCostOfMLProgramOperation(operation: MLModelStructureProgramOperation): MLComputePlanCost;
}

declare class MLComputePlanCost extends NSObject {

	static alloc(): MLComputePlanCost; // inherited from NSObject

	static new(): MLComputePlanCost; // inherited from NSObject

	readonly weight: number;
}

declare class MLComputePlanDeviceUsage extends NSObject {

	static alloc(): MLComputePlanDeviceUsage; // inherited from NSObject

	static new(): MLComputePlanDeviceUsage; // inherited from NSObject

	readonly preferredComputeDevice: MLComputeDeviceProtocol;

	readonly supportedComputeDevices: NSArray<MLComputeDeviceProtocol>;
}

declare const enum MLComputeUnits {

	CPUOnly = 0,

	CPUAndGPU = 1,

	All = 2,

	CPUAndNeuralEngine = 3
}

interface MLCustomLayer {

	encodeToCommandBufferInputsOutputsError?(commandBuffer: MTLCommandBuffer, inputs: NSArray<MTLTexture> | MTLTexture[], outputs: NSArray<MTLTexture> | MTLTexture[]): boolean;

	evaluateOnCPUWithInputsOutputsError(inputs: NSArray<MLMultiArray> | MLMultiArray[], outputs: NSArray<MLMultiArray> | MLMultiArray[]): boolean;

	initWithParameterDictionaryError?(parameters: NSDictionary<string, any>): MLCustomLayer;

	outputShapesForInputShapesError(inputShapes: NSArray<NSArray<number>> | NSArray<number>[]): NSArray<NSArray<number>>;

	setWeightDataError(weights: NSArray<NSData> | NSData[]): boolean;
}
declare var MLCustomLayer: {

	prototype: MLCustomLayer;
};

interface MLCustomModel {

	initWithModelDescriptionParameterDictionaryError?(modelDescription: MLModelDescription, parameters: NSDictionary<string, any>): MLCustomModel;

	predictionFromFeaturesOptionsError(input: MLFeatureProvider, options: MLPredictionOptions): MLFeatureProvider;

	predictionsFromBatchOptionsError?(inputBatch: MLBatchProvider, options: MLPredictionOptions): MLBatchProvider;
}
declare var MLCustomModel: {

	prototype: MLCustomModel;
};

declare class MLDictionaryConstraint extends NSObject implements NSSecureCoding {

	static alloc(): MLDictionaryConstraint; // inherited from NSObject

	static new(): MLDictionaryConstraint; // inherited from NSObject

	readonly keyType: MLFeatureType;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare class MLDictionaryFeatureProvider extends NSObject implements MLFeatureProvider, NSFastEnumeration, NSSecureCoding {

	static alloc(): MLDictionaryFeatureProvider; // inherited from NSObject

	static new(): MLDictionaryFeatureProvider; // inherited from NSObject

	readonly dictionary: NSDictionary<string, MLFeatureValue>;

	readonly featureNames: NSSet<string>; // inherited from MLFeatureProvider

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding
	[Symbol.iterator](): Iterator<any>;

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	constructor(o: { dictionary: NSDictionary<string, any>; });

	encodeWithCoder(coder: NSCoder): void;

	featureValueForName(featureName: string): MLFeatureValue;

	initWithCoder(coder: NSCoder): this;

	initWithDictionaryError(dictionary: NSDictionary<string, any>): this;

	objectForKeyedSubscript(featureName: string): MLFeatureValue;
}

declare class MLFeatureDescription extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): MLFeatureDescription; // inherited from NSObject

	static new(): MLFeatureDescription; // inherited from NSObject

	readonly dictionaryConstraint: MLDictionaryConstraint;

	readonly imageConstraint: MLImageConstraint;

	readonly multiArrayConstraint: MLMultiArrayConstraint;

	readonly name: string;

	readonly optional: boolean;

	readonly sequenceConstraint: MLSequenceConstraint;

	readonly type: MLFeatureType;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;

	isAllowedValue(value: MLFeatureValue): boolean;
}

interface MLFeatureProvider {

	featureNames: NSSet<string>;

	featureValueForName(featureName: string): MLFeatureValue;
}
declare var MLFeatureProvider: {

	prototype: MLFeatureProvider;
};

declare const enum MLFeatureType {

	Invalid = 0,

	Int64 = 1,

	Double = 2,

	String = 3,

	Image = 4,

	MultiArray = 5,

	Dictionary = 6,

	Sequence = 7
}

declare class MLFeatureValue extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): MLFeatureValue; // inherited from NSObject

	static featureValueWithCGImageConstraintOptionsError(cgImage: any, constraint: MLImageConstraint, options: NSDictionary<string, any>): MLFeatureValue;

	static featureValueWithCGImageOrientationConstraintOptionsError(cgImage: any, orientation: CGImagePropertyOrientation, constraint: MLImageConstraint, options: NSDictionary<string, any>): MLFeatureValue;

	static featureValueWithCGImageOrientationPixelsWidePixelsHighPixelFormatTypeOptionsError(cgImage: any, orientation: CGImagePropertyOrientation, pixelsWide: number, pixelsHigh: number, pixelFormatType: number, options: NSDictionary<string, any>): MLFeatureValue;

	static featureValueWithCGImagePixelsWidePixelsHighPixelFormatTypeOptionsError(cgImage: any, pixelsWide: number, pixelsHigh: number, pixelFormatType: number, options: NSDictionary<string, any>): MLFeatureValue;

	static featureValueWithDictionaryError(value: NSDictionary<any, number>): MLFeatureValue;

	static featureValueWithDouble(value: number): MLFeatureValue;

	static featureValueWithImageAtURLConstraintOptionsError(url: NSURL, constraint: MLImageConstraint, options: NSDictionary<string, any>): MLFeatureValue;

	static featureValueWithImageAtURLOrientationConstraintOptionsError(url: NSURL, orientation: CGImagePropertyOrientation, constraint: MLImageConstraint, options: NSDictionary<string, any>): MLFeatureValue;

	static featureValueWithImageAtURLOrientationPixelsWidePixelsHighPixelFormatTypeOptionsError(url: NSURL, orientation: CGImagePropertyOrientation, pixelsWide: number, pixelsHigh: number, pixelFormatType: number, options: NSDictionary<string, any>): MLFeatureValue;

	static featureValueWithImageAtURLPixelsWidePixelsHighPixelFormatTypeOptionsError(url: NSURL, pixelsWide: number, pixelsHigh: number, pixelFormatType: number, options: NSDictionary<string, any>): MLFeatureValue;

	static featureValueWithInt64(value: number): MLFeatureValue;

	static featureValueWithMultiArray(value: MLMultiArray): MLFeatureValue;

	static featureValueWithPixelBuffer(value: any): MLFeatureValue;

	static featureValueWithSequence(sequence: MLSequence): MLFeatureValue;

	static featureValueWithString(value: string): MLFeatureValue;

	static new(): MLFeatureValue; // inherited from NSObject

	static undefinedFeatureValueWithType(type: MLFeatureType): MLFeatureValue;

	readonly dictionaryValue: NSDictionary<any, number>;

	readonly doubleValue: number;

	readonly imageBufferValue: any;

	readonly int64Value: number;

	readonly multiArrayValue: MLMultiArray;

	readonly sequenceValue: MLSequence;

	readonly stringValue: string;

	readonly type: MLFeatureType;

	readonly undefined: boolean;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;

	isEqualToFeatureValue(value: MLFeatureValue): boolean;
}

declare var MLFeatureValueImageOptionCropAndScale: string;

declare var MLFeatureValueImageOptionCropRect: string;

declare class MLGPUComputeDevice extends NSObject implements MLComputeDeviceProtocol {

	static alloc(): MLGPUComputeDevice; // inherited from NSObject

	static new(): MLGPUComputeDevice; // inherited from NSObject

	readonly metalDevice: MTLDevice;

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
}

declare class MLImageConstraint extends NSObject implements NSSecureCoding {

	static alloc(): MLImageConstraint; // inherited from NSObject

	static new(): MLImageConstraint; // inherited from NSObject

	readonly pixelFormatType: number;

	readonly pixelsHigh: number;

	readonly pixelsWide: number;

	readonly sizeConstraint: MLImageSizeConstraint;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare class MLImageSize extends NSObject implements NSSecureCoding {

	static alloc(): MLImageSize; // inherited from NSObject

	static new(): MLImageSize; // inherited from NSObject

	readonly pixelsHigh: number;

	readonly pixelsWide: number;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare class MLImageSizeConstraint extends NSObject implements NSSecureCoding {

	static alloc(): MLImageSizeConstraint; // inherited from NSObject

	static new(): MLImageSizeConstraint; // inherited from NSObject

	readonly enumeratedImageSizes: NSArray<MLImageSize>;

	readonly pixelsHighRange: NSRange;

	readonly pixelsWideRange: NSRange;

	readonly type: MLImageSizeConstraintType;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare const enum MLImageSizeConstraintType {

	Unspecified = 0,

	Enumerated = 2,

	Range = 3
}

declare class MLKey extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): MLKey; // inherited from NSObject

	static new(): MLKey; // inherited from NSObject

	readonly name: string;

	readonly scope: string;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare class MLMetricKey extends MLKey {

	static alloc(): MLMetricKey; // inherited from NSObject

	static new(): MLMetricKey; // inherited from NSObject

	static readonly epochIndex: MLMetricKey;

	static readonly lossValue: MLMetricKey;

	static readonly miniBatchIndex: MLMetricKey;
}

declare class MLModel extends NSObject {

	static alloc(): MLModel; // inherited from NSObject

	static compileModelAtURLCompletionHandler(modelURL: NSURL, handler: (p1: NSURL, p2: NSError) => void): void;

	static compileModelAtURLError(modelURL: NSURL): NSURL;

	static loadContentsOfURLConfigurationCompletionHandler(url: NSURL, configuration: MLModelConfiguration, handler: (p1: MLModel, p2: NSError) => void): void;

	static loadModelAssetConfigurationCompletionHandler(asset: MLModelAsset, configuration: MLModelConfiguration, handler: (p1: MLModel, p2: NSError) => void): void;

	static modelWithContentsOfURLConfigurationError(url: NSURL, configuration: MLModelConfiguration): MLModel;

	static modelWithContentsOfURLError(url: NSURL): MLModel;

	static new(): MLModel; // inherited from NSObject

	readonly configuration: MLModelConfiguration;

	readonly modelDescription: MLModelDescription;

	static readonly availableComputeDevices: NSArray<MLComputeDeviceProtocol>;

	parameterValueForKeyError(key: MLParameterKey): any;

	predictionFromFeaturesCompletionHandler(input: MLFeatureProvider, completionHandler: (p1: MLFeatureProvider, p2: NSError) => void): void;

	predictionFromFeaturesError(input: MLFeatureProvider): MLFeatureProvider;

	predictionFromFeaturesOptionsCompletionHandler(input: MLFeatureProvider, options: MLPredictionOptions, completionHandler: (p1: MLFeatureProvider, p2: NSError) => void): void;

	predictionFromFeaturesOptionsError(input: MLFeatureProvider, options: MLPredictionOptions): MLFeatureProvider;

	predictionsFromBatchError(inputBatch: MLBatchProvider): MLBatchProvider;

	predictionsFromBatchOptionsError(inputBatch: MLBatchProvider, options: MLPredictionOptions): MLBatchProvider;
}

declare class MLModelAsset extends NSObject {

	static alloc(): MLModelAsset; // inherited from NSObject

	static modelAssetWithSpecificationDataError(specificationData: NSData): MLModelAsset;

	static new(): MLModelAsset; // inherited from NSObject
}

declare var MLModelAuthorKey: string;

declare class MLModelCollection extends NSObject {

	static alloc(): MLModelCollection; // inherited from NSObject

	static beginAccessingModelCollectionWithIdentifierCompletionHandler(identifier: string, completionHandler: (p1: MLModelCollection, p2: NSError) => void): NSProgress;

	static endAccessingModelCollectionWithIdentifierCompletionHandler(identifier: string, completionHandler: (p1: boolean, p2: NSError) => void): void;

	static new(): MLModelCollection; // inherited from NSObject

	readonly deploymentID: string;

	readonly entries: NSDictionary<string, MLModelCollectionEntry>;

	readonly identifier: string;
}

declare var MLModelCollectionDidChangeNotification: string;

declare class MLModelCollectionEntry extends NSObject {

	static alloc(): MLModelCollectionEntry; // inherited from NSObject

	static new(): MLModelCollectionEntry; // inherited from NSObject

	readonly modelIdentifier: string;

	readonly modelURL: NSURL;

	isEqualToModelCollectionEntry(entry: MLModelCollectionEntry): boolean;
}

declare class MLModelConfiguration extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): MLModelConfiguration; // inherited from NSObject

	static new(): MLModelConfiguration; // inherited from NSObject

	allowLowPrecisionAccumulationOnGPU: boolean;

	computeUnits: MLComputeUnits;

	modelDisplayName: string;

	optimizationHints: MLOptimizationHints;

	parameters: NSDictionary<MLParameterKey, any>;

	preferredMetalDevice: MTLDevice;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare var MLModelCreatorDefinedKey: string;

declare class MLModelDescription extends NSObject implements NSSecureCoding {

	static alloc(): MLModelDescription; // inherited from NSObject

	static new(): MLModelDescription; // inherited from NSObject

	readonly classLabels: NSArray<any>;

	readonly inputDescriptionsByName: NSDictionary<string, MLFeatureDescription>;

	readonly isUpdatable: boolean;

	readonly metadata: NSDictionary<string, any>;

	readonly outputDescriptionsByName: NSDictionary<string, MLFeatureDescription>;

	readonly parameterDescriptionsByKey: NSDictionary<MLParameterKey, MLParameterDescription>;

	readonly predictedFeatureName: string;

	readonly predictedProbabilitiesName: string;

	readonly trainingInputDescriptionsByName: NSDictionary<string, MLFeatureDescription>;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare var MLModelDescriptionKey: string;

declare const enum MLModelError {

	Generic = 0,

	FeatureType = 1,

	IO = 3,

	CustomLayer = 4,

	CustomModel = 5,

	Update = 6,

	Parameters = 7,

	ModelDecryptionKeyFetch = 8,

	ModelDecryption = 9,

	ModelCollection = 10,

	PredictionCancelled = 11
}

declare var MLModelErrorDomain: string;

declare var MLModelLicenseKey: string;

declare class MLModelStructure extends NSObject {

	static alloc(): MLModelStructure; // inherited from NSObject

	static loadContentsOfURLCompletionHandler(url: NSURL, handler: (p1: MLModelStructure, p2: NSError) => void): void;

	static loadModelAssetCompletionHandler(asset: MLModelAsset, handler: (p1: MLModelStructure, p2: NSError) => void): void;

	static new(): MLModelStructure; // inherited from NSObject

	readonly neuralNetwork: MLModelStructureNeuralNetwork;

	readonly pipeline: MLModelStructurePipeline;

	readonly program: MLModelStructureProgram;
}

declare class MLModelStructureNeuralNetwork extends NSObject {

	static alloc(): MLModelStructureNeuralNetwork; // inherited from NSObject

	static new(): MLModelStructureNeuralNetwork; // inherited from NSObject

	readonly layers: NSArray<MLModelStructureNeuralNetworkLayer>;
}

declare class MLModelStructureNeuralNetworkLayer extends NSObject {

	static alloc(): MLModelStructureNeuralNetworkLayer; // inherited from NSObject

	static new(): MLModelStructureNeuralNetworkLayer; // inherited from NSObject

	readonly inputNames: NSArray<string>;

	readonly name: string;

	readonly outputNames: NSArray<string>;

	readonly type: string;
}

declare class MLModelStructurePipeline extends NSObject {

	static alloc(): MLModelStructurePipeline; // inherited from NSObject

	static new(): MLModelStructurePipeline; // inherited from NSObject

	readonly subModelNames: NSArray<string>;

	readonly subModels: NSArray<MLModelStructure>;
}

declare class MLModelStructureProgram extends NSObject {

	static alloc(): MLModelStructureProgram; // inherited from NSObject

	static new(): MLModelStructureProgram; // inherited from NSObject

	readonly functions: NSDictionary<string, MLModelStructureProgramFunction>;
}

declare class MLModelStructureProgramArgument extends NSObject {

	static alloc(): MLModelStructureProgramArgument; // inherited from NSObject

	static new(): MLModelStructureProgramArgument; // inherited from NSObject

	readonly bindings: NSArray<MLModelStructureProgramBinding>;
}

declare class MLModelStructureProgramBinding extends NSObject {

	static alloc(): MLModelStructureProgramBinding; // inherited from NSObject

	static new(): MLModelStructureProgramBinding; // inherited from NSObject

	readonly name: string;

	readonly value: MLModelStructureProgramValue;
}

declare class MLModelStructureProgramBlock extends NSObject {

	static alloc(): MLModelStructureProgramBlock; // inherited from NSObject

	static new(): MLModelStructureProgramBlock; // inherited from NSObject

	readonly inputs: NSArray<MLModelStructureProgramNamedValueType>;

	readonly operations: NSArray<MLModelStructureProgramOperation>;

	readonly outputNames: NSArray<string>;
}

declare class MLModelStructureProgramFunction extends NSObject {

	static alloc(): MLModelStructureProgramFunction; // inherited from NSObject

	static new(): MLModelStructureProgramFunction; // inherited from NSObject

	readonly block: MLModelStructureProgramBlock;

	readonly inputs: NSArray<MLModelStructureProgramNamedValueType>;
}

declare class MLModelStructureProgramNamedValueType extends NSObject {

	static alloc(): MLModelStructureProgramNamedValueType; // inherited from NSObject

	static new(): MLModelStructureProgramNamedValueType; // inherited from NSObject

	readonly name: string;

	readonly type: MLModelStructureProgramValueType;
}

declare class MLModelStructureProgramOperation extends NSObject {

	static alloc(): MLModelStructureProgramOperation; // inherited from NSObject

	static new(): MLModelStructureProgramOperation; // inherited from NSObject

	readonly blocks: NSArray<MLModelStructureProgramBlock>;

	readonly inputs: NSDictionary<string, MLModelStructureProgramArgument>;

	readonly operatorName: string;

	readonly outputs: NSArray<MLModelStructureProgramNamedValueType>;
}

declare class MLModelStructureProgramValue extends NSObject {

	static alloc(): MLModelStructureProgramValue; // inherited from NSObject

	static new(): MLModelStructureProgramValue; // inherited from NSObject
}

declare class MLModelStructureProgramValueType extends NSObject {

	static alloc(): MLModelStructureProgramValueType; // inherited from NSObject

	static new(): MLModelStructureProgramValueType; // inherited from NSObject
}

declare var MLModelVersionStringKey: string;

declare class MLMultiArray extends NSObject implements NSSecureCoding {

	static alloc(): MLMultiArray; // inherited from NSObject

	static multiArrayByConcatenatingMultiArraysAlongAxisDataType(multiArrays: NSArray<MLMultiArray> | MLMultiArray[], axis: number, dataType: MLMultiArrayDataType): MLMultiArray;

	static new(): MLMultiArray; // inherited from NSObject

	readonly count: number;

	readonly dataPointer: interop.Pointer | interop.Reference<any>;

	readonly dataType: MLMultiArrayDataType;

	readonly pixelBuffer: any;

	readonly shape: NSArray<number>;

	readonly strides: NSArray<number>;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding
	[index: number]: number;

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	constructor(o: { dataPointer: interop.Pointer | interop.Reference<any>; shape: NSArray<number> | number[]; dataType: MLMultiArrayDataType; strides: NSArray<number> | number[]; deallocator: (p1: interop.Pointer | interop.Reference<any>) => void; });

	constructor(o: { pixelBuffer: any; shape: NSArray<number> | number[]; });

	constructor(o: { shape: NSArray<number> | number[]; dataType: MLMultiArrayDataType; });

	encodeWithCoder(coder: NSCoder): void;

	getBytesWithHandler(handler: (p1: interop.Pointer | interop.Reference<any>, p2: number) => void): void;

	getMutableBytesWithHandler(handler: (p1: interop.Pointer | interop.Reference<any>, p2: number, p3: NSArray<number>) => void): void;

	initWithCoder(coder: NSCoder): this;

	initWithDataPointerShapeDataTypeStridesDeallocatorError(dataPointer: interop.Pointer | interop.Reference<any>, shape: NSArray<number> | number[], dataType: MLMultiArrayDataType, strides: NSArray<number> | number[], deallocator: (p1: interop.Pointer | interop.Reference<any>) => void): this;

	initWithPixelBufferShape(pixelBuffer: any, shape: NSArray<number> | number[]): this;

	initWithShapeDataTypeError(shape: NSArray<number> | number[], dataType: MLMultiArrayDataType): this;

	objectAtIndexedSubscript(idx: number): number;

	objectForKeyedSubscript(key: NSArray<number> | number[]): number;

	setObjectAtIndexedSubscript(obj: number, idx: number): void;

	setObjectForKeyedSubscript(obj: number, key: NSArray<number> | number[]): void;
}

declare class MLMultiArrayConstraint extends NSObject implements NSSecureCoding {

	static alloc(): MLMultiArrayConstraint; // inherited from NSObject

	static new(): MLMultiArrayConstraint; // inherited from NSObject

	readonly dataType: MLMultiArrayDataType;

	readonly shape: NSArray<number>;

	readonly shapeConstraint: MLMultiArrayShapeConstraint;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare const enum MLMultiArrayDataType {

	Double = 65600,

	Float64 = 65600,

	Float32 = 65568,

	Float16 = 65552,

	Float = 65568,

	Int32 = 131104
}

declare class MLMultiArrayShapeConstraint extends NSObject implements NSSecureCoding {

	static alloc(): MLMultiArrayShapeConstraint; // inherited from NSObject

	static new(): MLMultiArrayShapeConstraint; // inherited from NSObject

	readonly enumeratedShapes: NSArray<NSArray<number>>;

	readonly sizeRangeForDimension: NSArray<NSValue>;

	readonly type: MLMultiArrayShapeConstraintType;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare const enum MLMultiArrayShapeConstraintType {

	Unspecified = 1,

	Enumerated = 2,

	Range = 3
}

declare class MLNeuralEngineComputeDevice extends NSObject implements MLComputeDeviceProtocol {

	static alloc(): MLNeuralEngineComputeDevice; // inherited from NSObject

	static new(): MLNeuralEngineComputeDevice; // inherited from NSObject

	readonly totalCoreCount: number;

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
}

declare class MLNumericConstraint extends NSObject implements NSSecureCoding {

	static alloc(): MLNumericConstraint; // inherited from NSObject

	static new(): MLNumericConstraint; // inherited from NSObject

	readonly enumeratedNumbers: NSSet<number>;

	readonly maxNumber: number;

	readonly minNumber: number;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare class MLOptimizationHints extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): MLOptimizationHints; // inherited from NSObject

	static new(): MLOptimizationHints; // inherited from NSObject

	reshapeFrequency: MLReshapeFrequencyHint;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare class MLParameterDescription extends NSObject implements NSSecureCoding {

	static alloc(): MLParameterDescription; // inherited from NSObject

	static new(): MLParameterDescription; // inherited from NSObject

	readonly defaultValue: any;

	readonly key: MLParameterKey;

	readonly numericConstraint: MLNumericConstraint;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare class MLParameterKey extends MLKey {

	static alloc(): MLParameterKey; // inherited from NSObject

	static new(): MLParameterKey; // inherited from NSObject

	static readonly beta1: MLParameterKey;

	static readonly beta2: MLParameterKey;

	static readonly biases: MLParameterKey;

	static readonly epochs: MLParameterKey;

	static readonly eps: MLParameterKey;

	static readonly learningRate: MLParameterKey;

	static readonly linkedModelFileName: MLParameterKey;

	static readonly linkedModelSearchPath: MLParameterKey;

	static readonly miniBatchSize: MLParameterKey;

	static readonly momentum: MLParameterKey;

	static readonly numberOfNeighbors: MLParameterKey;

	static readonly seed: MLParameterKey;

	static readonly shuffle: MLParameterKey;

	static readonly weights: MLParameterKey;

	scopedTo(scope: string): MLParameterKey;
}

declare class MLPredictionOptions extends NSObject {

	static alloc(): MLPredictionOptions; // inherited from NSObject

	static new(): MLPredictionOptions; // inherited from NSObject

	outputBackings: NSDictionary<string, any>;

	usesCPUOnly: boolean;
}

declare const enum MLReshapeFrequencyHint {

	Frequent = 0,

	Infrequent = 1
}

declare class MLSequence extends NSObject implements NSSecureCoding {

	static alloc(): MLSequence; // inherited from NSObject

	static emptySequenceWithType(type: MLFeatureType): MLSequence;

	static new(): MLSequence; // inherited from NSObject

	static sequenceWithInt64Array(int64Values: NSArray<number> | number[]): MLSequence;

	static sequenceWithStringArray(stringValues: NSArray<string> | string[]): MLSequence;

	readonly int64Values: NSArray<number>;

	readonly stringValues: NSArray<string>;

	readonly type: MLFeatureType;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare class MLSequenceConstraint extends NSObject implements NSSecureCoding {

	static alloc(): MLSequenceConstraint; // inherited from NSObject

	static new(): MLSequenceConstraint; // inherited from NSObject

	readonly countRange: NSRange;

	readonly valueDescription: MLFeatureDescription;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare class MLTask extends NSObject {

	static alloc(): MLTask; // inherited from NSObject

	static new(): MLTask; // inherited from NSObject

	readonly error: NSError;

	readonly state: MLTaskState;

	readonly taskIdentifier: string;

	cancel(): void;

	resume(): void;
}

declare const enum MLTaskState {

	Suspended = 1,

	Running = 2,

	Cancelling = 3,

	Completed = 4,

	Failed = 5
}

declare class MLUpdateContext extends NSObject {

	static alloc(): MLUpdateContext; // inherited from NSObject

	static new(): MLUpdateContext; // inherited from NSObject

	readonly event: MLUpdateProgressEvent;

	readonly metrics: NSDictionary<MLMetricKey, any>;

	readonly model: MLModel;

	readonly parameters: NSDictionary<MLParameterKey, any>;

	readonly task: MLUpdateTask;
}

declare const enum MLUpdateProgressEvent {

	TrainingBegin = 1,

	EpochEnd = 2,

	MiniBatchEnd = 4
}

declare class MLUpdateProgressHandlers extends NSObject {

	static alloc(): MLUpdateProgressHandlers; // inherited from NSObject

	static new(): MLUpdateProgressHandlers; // inherited from NSObject

	constructor(o: { forEvents: MLUpdateProgressEvent; progressHandler: (p1: MLUpdateContext) => void; completionHandler: (p1: MLUpdateContext) => void; });

	initForEventsProgressHandlerCompletionHandler(interestedEvents: MLUpdateProgressEvent, progressHandler: (p1: MLUpdateContext) => void, completionHandler: (p1: MLUpdateContext) => void): this;
}

declare class MLUpdateTask extends MLTask {

	static alloc(): MLUpdateTask; // inherited from NSObject

	static new(): MLUpdateTask; // inherited from NSObject

	static updateTaskForModelAtURLTrainingDataCompletionHandlerError(modelURL: NSURL, trainingData: MLBatchProvider, completionHandler: (p1: MLUpdateContext) => void): MLUpdateTask;

	static updateTaskForModelAtURLTrainingDataConfigurationCompletionHandlerError(modelURL: NSURL, trainingData: MLBatchProvider, configuration: MLModelConfiguration, completionHandler: (p1: MLUpdateContext) => void): MLUpdateTask;

	static updateTaskForModelAtURLTrainingDataConfigurationProgressHandlersError(modelURL: NSURL, trainingData: MLBatchProvider, configuration: MLModelConfiguration, progressHandlers: MLUpdateProgressHandlers): MLUpdateTask;

	static updateTaskForModelAtURLTrainingDataProgressHandlersError(modelURL: NSURL, trainingData: MLBatchProvider, progressHandlers: MLUpdateProgressHandlers): MLUpdateTask;

	resumeWithParameters(updateParameters: NSDictionary<MLParameterKey, any>): void;
}

interface MLWritable extends NSObjectProtocol {

	writeToURLError(url: NSURL): boolean;
}
declare var MLWritable: {

	prototype: MLWritable;
};
