
interface MTLAccelerationStructure extends MTLResource {

	gpuResourceID: MTLResourceID;

	size: number;
}
declare var MTLAccelerationStructure: {

	prototype: MTLAccelerationStructure;
};

declare class MTLAccelerationStructureBoundingBoxGeometryDescriptor extends MTLAccelerationStructureGeometryDescriptor {

	static alloc(): MTLAccelerationStructureBoundingBoxGeometryDescriptor; // inherited from NSObject

	static descriptor(): MTLAccelerationStructureBoundingBoxGeometryDescriptor;

	static new(): MTLAccelerationStructureBoundingBoxGeometryDescriptor; // inherited from NSObject

	boundingBoxBuffer: MTLBuffer;

	boundingBoxBufferOffset: number;

	boundingBoxCount: number;

	boundingBoxStride: number;
}

interface MTLAccelerationStructureCommandEncoder extends MTLCommandEncoder {

	buildAccelerationStructureDescriptorScratchBufferScratchBufferOffset(accelerationStructure: MTLAccelerationStructure, descriptor: MTLAccelerationStructureDescriptor, scratchBuffer: MTLBuffer, scratchBufferOffset: number): void;

	copyAccelerationStructureToAccelerationStructure(sourceAccelerationStructure: MTLAccelerationStructure, destinationAccelerationStructure: MTLAccelerationStructure): void;

	copyAndCompactAccelerationStructureToAccelerationStructure(sourceAccelerationStructure: MTLAccelerationStructure, destinationAccelerationStructure: MTLAccelerationStructure): void;

	refitAccelerationStructureDescriptorDestinationScratchBufferScratchBufferOffset(sourceAccelerationStructure: MTLAccelerationStructure, descriptor: MTLAccelerationStructureDescriptor, destinationAccelerationStructure: MTLAccelerationStructure, scratchBuffer: MTLBuffer, scratchBufferOffset: number): void;

	refitAccelerationStructureDescriptorDestinationScratchBufferScratchBufferOffsetOptions(sourceAccelerationStructure: MTLAccelerationStructure, descriptor: MTLAccelerationStructureDescriptor, destinationAccelerationStructure: MTLAccelerationStructure, scratchBuffer: MTLBuffer, scratchBufferOffset: number, options: MTLAccelerationStructureRefitOptions): void;

	sampleCountersInBufferAtSampleIndexWithBarrier(sampleBuffer: MTLCounterSampleBuffer, sampleIndex: number, barrier: boolean): void;

	updateFence(fence: MTLFence): void;

	useHeap(heap: MTLHeap): void;

	useHeapsCount(heaps: interop.Reference<MTLHeap>, count: number): void;

	useResourceUsage(resource: MTLResource, usage: MTLResourceUsage): void;

	useResourcesCountUsage(resources: interop.Reference<MTLResource>, count: number, usage: MTLResourceUsage): void;

	waitForFence(fence: MTLFence): void;

	writeCompactedAccelerationStructureSizeToBufferOffset(accelerationStructure: MTLAccelerationStructure, buffer: MTLBuffer, offset: number): void;

	writeCompactedAccelerationStructureSizeToBufferOffsetSizeDataType(accelerationStructure: MTLAccelerationStructure, buffer: MTLBuffer, offset: number, sizeDataType: MTLDataType): void;
}
declare var MTLAccelerationStructureCommandEncoder: {

	prototype: MTLAccelerationStructureCommandEncoder;
};

declare class MTLAccelerationStructureCurveGeometryDescriptor extends MTLAccelerationStructureGeometryDescriptor {

	static alloc(): MTLAccelerationStructureCurveGeometryDescriptor; // inherited from NSObject

	static descriptor(): MTLAccelerationStructureCurveGeometryDescriptor;

	static new(): MTLAccelerationStructureCurveGeometryDescriptor; // inherited from NSObject

	controlPointBuffer: MTLBuffer;

	controlPointBufferOffset: number;

	controlPointCount: number;

	controlPointFormat: MTLAttributeFormat;

	controlPointStride: number;

	curveBasis: MTLCurveBasis;

	curveEndCaps: MTLCurveEndCaps;

	curveType: MTLCurveType;

	indexBuffer: MTLBuffer;

	indexBufferOffset: number;

	indexType: MTLIndexType;

	radiusBuffer: MTLBuffer;

	radiusBufferOffset: number;

	radiusFormat: MTLAttributeFormat;

	radiusStride: number;

	segmentControlPointCount: number;

	segmentCount: number;
}

declare class MTLAccelerationStructureDescriptor extends NSObject implements NSCopying {

	static alloc(): MTLAccelerationStructureDescriptor; // inherited from NSObject

	static new(): MTLAccelerationStructureDescriptor; // inherited from NSObject

	usage: MTLAccelerationStructureUsage;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare class MTLAccelerationStructureGeometryDescriptor extends NSObject implements NSCopying {

	static alloc(): MTLAccelerationStructureGeometryDescriptor; // inherited from NSObject

	static new(): MTLAccelerationStructureGeometryDescriptor; // inherited from NSObject

	allowDuplicateIntersectionFunctionInvocation: boolean;

	intersectionFunctionTableOffset: number;

	label: string;

	opaque: boolean;

	primitiveDataBuffer: MTLBuffer;

	primitiveDataBufferOffset: number;

	primitiveDataElementSize: number;

	primitiveDataStride: number;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare const enum MTLAccelerationStructureInstanceDescriptorType {

	Default = 0,

	UserID = 1,

	Motion = 2,

	Indirect = 3,

	IndirectMotion = 4
}

declare const enum MTLAccelerationStructureInstanceOptions {

	None = 0,

	DisableTriangleCulling = 1,

	TriangleFrontFacingWindingCounterClockwise = 2,

	Opaque = 4,

	NonOpaque = 8
}

declare class MTLAccelerationStructureMotionBoundingBoxGeometryDescriptor extends MTLAccelerationStructureGeometryDescriptor {

	static alloc(): MTLAccelerationStructureMotionBoundingBoxGeometryDescriptor; // inherited from NSObject

	static descriptor(): MTLAccelerationStructureMotionBoundingBoxGeometryDescriptor;

	static new(): MTLAccelerationStructureMotionBoundingBoxGeometryDescriptor; // inherited from NSObject

	boundingBoxBuffers: NSArray<MTLMotionKeyframeData>;

	boundingBoxCount: number;

	boundingBoxStride: number;
}

declare class MTLAccelerationStructureMotionCurveGeometryDescriptor extends MTLAccelerationStructureGeometryDescriptor {

	static alloc(): MTLAccelerationStructureMotionCurveGeometryDescriptor; // inherited from NSObject

	static descriptor(): MTLAccelerationStructureMotionCurveGeometryDescriptor;

	static new(): MTLAccelerationStructureMotionCurveGeometryDescriptor; // inherited from NSObject

	controlPointBuffers: NSArray<MTLMotionKeyframeData>;

	controlPointCount: number;

	controlPointFormat: MTLAttributeFormat;

	controlPointStride: number;

	curveBasis: MTLCurveBasis;

	curveEndCaps: MTLCurveEndCaps;

	curveType: MTLCurveType;

	indexBuffer: MTLBuffer;

	indexBufferOffset: number;

	indexType: MTLIndexType;

	radiusBuffers: NSArray<MTLMotionKeyframeData>;

	radiusFormat: MTLAttributeFormat;

	radiusStride: number;

	segmentControlPointCount: number;

	segmentCount: number;
}

interface MTLAccelerationStructureMotionInstanceDescriptor {
	options: MTLAccelerationStructureInstanceOptions;
	mask: number;
	intersectionFunctionTableOffset: number;
	accelerationStructureIndex: number;
	userID: number;
	motionTransformsStartIndex: number;
	motionTransformsCount: number;
	motionStartBorderMode: MTLMotionBorderMode;
	motionEndBorderMode: MTLMotionBorderMode;
	motionStartTime: number;
	motionEndTime: number;
}
declare var MTLAccelerationStructureMotionInstanceDescriptor: interop.StructType<MTLAccelerationStructureMotionInstanceDescriptor>;

declare class MTLAccelerationStructureMotionTriangleGeometryDescriptor extends MTLAccelerationStructureGeometryDescriptor {

	static alloc(): MTLAccelerationStructureMotionTriangleGeometryDescriptor; // inherited from NSObject

	static descriptor(): MTLAccelerationStructureMotionTriangleGeometryDescriptor;

	static new(): MTLAccelerationStructureMotionTriangleGeometryDescriptor; // inherited from NSObject

	indexBuffer: MTLBuffer;

	indexBufferOffset: number;

	indexType: MTLIndexType;

	transformationMatrixBuffer: MTLBuffer;

	transformationMatrixBufferOffset: number;

	triangleCount: number;

	vertexBuffers: NSArray<MTLMotionKeyframeData>;

	vertexFormat: MTLAttributeFormat;

	vertexStride: number;
}

declare class MTLAccelerationStructurePassDescriptor extends NSObject implements NSCopying {

	static accelerationStructurePassDescriptor(): MTLAccelerationStructurePassDescriptor;

	static alloc(): MTLAccelerationStructurePassDescriptor; // inherited from NSObject

	static new(): MTLAccelerationStructurePassDescriptor; // inherited from NSObject

	readonly sampleBufferAttachments: MTLAccelerationStructurePassSampleBufferAttachmentDescriptorArray;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare class MTLAccelerationStructurePassSampleBufferAttachmentDescriptor extends NSObject implements NSCopying {

	static alloc(): MTLAccelerationStructurePassSampleBufferAttachmentDescriptor; // inherited from NSObject

	static new(): MTLAccelerationStructurePassSampleBufferAttachmentDescriptor; // inherited from NSObject

	endOfEncoderSampleIndex: number;

	sampleBuffer: MTLCounterSampleBuffer;

	startOfEncoderSampleIndex: number;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare class MTLAccelerationStructurePassSampleBufferAttachmentDescriptorArray extends NSObject {

	static alloc(): MTLAccelerationStructurePassSampleBufferAttachmentDescriptorArray; // inherited from NSObject

	static new(): MTLAccelerationStructurePassSampleBufferAttachmentDescriptorArray; // inherited from NSObject
	[index: number]: MTLAccelerationStructurePassSampleBufferAttachmentDescriptor;

	objectAtIndexedSubscript(attachmentIndex: number): MTLAccelerationStructurePassSampleBufferAttachmentDescriptor;

	setObjectAtIndexedSubscript(attachment: MTLAccelerationStructurePassSampleBufferAttachmentDescriptor, attachmentIndex: number): void;
}

declare const enum MTLAccelerationStructureRefitOptions {

	VertexData = 1,

	PerPrimitiveData = 2
}

interface MTLAccelerationStructureSizes {
	accelerationStructureSize: number;
	buildScratchBufferSize: number;
	refitScratchBufferSize: number;
}
declare var MTLAccelerationStructureSizes: interop.StructType<MTLAccelerationStructureSizes>;

declare class MTLAccelerationStructureTriangleGeometryDescriptor extends MTLAccelerationStructureGeometryDescriptor {

	static alloc(): MTLAccelerationStructureTriangleGeometryDescriptor; // inherited from NSObject

	static descriptor(): MTLAccelerationStructureTriangleGeometryDescriptor;

	static new(): MTLAccelerationStructureTriangleGeometryDescriptor; // inherited from NSObject

	indexBuffer: MTLBuffer;

	indexBufferOffset: number;

	indexType: MTLIndexType;

	transformationMatrixBuffer: MTLBuffer;

	transformationMatrixBufferOffset: number;

	triangleCount: number;

	vertexBuffer: MTLBuffer;

	vertexBufferOffset: number;

	vertexFormat: MTLAttributeFormat;

	vertexStride: number;
}

declare const enum MTLAccelerationStructureUsage {

	None = 0,

	Refit = 1,

	PreferFastBuild = 2,

	ExtendedLimits = 4
}

declare class MTLArchitecture extends NSObject implements NSCopying {

	static alloc(): MTLArchitecture; // inherited from NSObject

	static new(): MTLArchitecture; // inherited from NSObject

	readonly name: string;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare class MTLArgument extends NSObject {

	static alloc(): MTLArgument; // inherited from NSObject

	static new(): MTLArgument; // inherited from NSObject

	readonly access: MTLBindingAccess;

	readonly active: boolean;

	readonly arrayLength: number;

	readonly bufferAlignment: number;

	readonly bufferDataSize: number;

	readonly bufferDataType: MTLDataType;

	readonly bufferPointerType: MTLPointerType;

	readonly bufferStructType: MTLStructType;

	readonly index: number;

	readonly isDepthTexture: boolean;

	readonly name: string;

	readonly textureDataType: MTLDataType;

	readonly textureType: MTLTextureType;

	readonly threadgroupMemoryAlignment: number;

	readonly threadgroupMemoryDataSize: number;

	readonly type: MTLArgumentType;
}

declare const enum MTLArgumentBuffersTier {

	Tier1 = 0,

	Tier2 = 1
}

declare class MTLArgumentDescriptor extends NSObject implements NSCopying {

	static alloc(): MTLArgumentDescriptor; // inherited from NSObject

	static argumentDescriptor(): MTLArgumentDescriptor;

	static new(): MTLArgumentDescriptor; // inherited from NSObject

	access: MTLBindingAccess;

	arrayLength: number;

	constantBlockAlignment: number;

	dataType: MTLDataType;

	index: number;

	textureType: MTLTextureType;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

interface MTLArgumentEncoder extends NSObjectProtocol {

	alignment: number;

	device: MTLDevice;

	encodedLength: number;

	label: string;

	constantDataAtIndex(index: number): interop.Pointer | interop.Reference<any>;

	newArgumentEncoderForBufferAtIndex(index: number): MTLArgumentEncoder;

	setAccelerationStructureAtIndex(accelerationStructure: MTLAccelerationStructure, index: number): void;

	setArgumentBufferOffset(argumentBuffer: MTLBuffer, offset: number): void;

	setArgumentBufferStartOffsetArrayElement(argumentBuffer: MTLBuffer, startOffset: number, arrayElement: number): void;

	setBufferOffsetAtIndex(buffer: MTLBuffer, offset: number, index: number): void;

	setBuffersOffsetsWithRange(buffers: interop.Reference<MTLBuffer>, offsets: interop.Reference<number>, range: NSRange): void;

	setComputePipelineStateAtIndex(pipeline: MTLComputePipelineState, index: number): void;

	setComputePipelineStatesWithRange(pipelines: interop.Reference<MTLComputePipelineState>, range: NSRange): void;

	setIndirectCommandBufferAtIndex(indirectCommandBuffer: MTLIndirectCommandBuffer, index: number): void;

	setIndirectCommandBuffersWithRange(buffers: interop.Reference<MTLIndirectCommandBuffer>, range: NSRange): void;

	setIntersectionFunctionTableAtIndex(intersectionFunctionTable: MTLIntersectionFunctionTable, index: number): void;

	setIntersectionFunctionTablesWithRange(intersectionFunctionTables: interop.Reference<MTLIntersectionFunctionTable>, range: NSRange): void;

	setRenderPipelineStateAtIndex(pipeline: MTLRenderPipelineState, index: number): void;

	setRenderPipelineStatesWithRange(pipelines: interop.Reference<MTLRenderPipelineState>, range: NSRange): void;

	setSamplerStateAtIndex(sampler: MTLSamplerState, index: number): void;

	setSamplerStatesWithRange(samplers: interop.Reference<MTLSamplerState>, range: NSRange): void;

	setTextureAtIndex(texture: MTLTexture, index: number): void;

	setTexturesWithRange(textures: interop.Reference<MTLTexture>, range: NSRange): void;

	setVisibleFunctionTableAtIndex(visibleFunctionTable: MTLVisibleFunctionTable, index: number): void;

	setVisibleFunctionTablesWithRange(visibleFunctionTables: interop.Reference<MTLVisibleFunctionTable>, range: NSRange): void;
}
declare var MTLArgumentEncoder: {

	prototype: MTLArgumentEncoder;
};

declare const enum MTLArgumentType {

	Buffer = 0,

	ThreadgroupMemory = 1,

	Texture = 2,

	Sampler = 3,

	ImageblockData = 16,

	Imageblock = 17,

	VisibleFunctionTable = 24,

	PrimitiveAccelerationStructure = 25,

	InstanceAccelerationStructure = 26,

	IntersectionFunctionTable = 27
}

declare class MTLArrayType extends MTLType {

	static alloc(): MTLArrayType; // inherited from NSObject

	static new(): MTLArrayType; // inherited from NSObject

	readonly argumentIndexStride: number;

	readonly arrayLength: number;

	readonly elementType: MTLDataType;

	readonly stride: number;

	elementArrayType(): MTLArrayType;

	elementPointerType(): MTLPointerType;

	elementStructType(): MTLStructType;

	elementTextureReferenceType(): MTLTextureReferenceType;
}

declare class MTLAttribute extends NSObject {

	static alloc(): MTLAttribute; // inherited from NSObject

	static new(): MTLAttribute; // inherited from NSObject

	readonly active: boolean;

	readonly attributeIndex: number;

	readonly attributeType: MTLDataType;

	readonly name: string;

	readonly patchControlPointData: boolean;

	readonly patchData: boolean;
}

declare class MTLAttributeDescriptor extends NSObject implements NSCopying {

	static alloc(): MTLAttributeDescriptor; // inherited from NSObject

	static new(): MTLAttributeDescriptor; // inherited from NSObject

	bufferIndex: number;

	format: MTLAttributeFormat;

	offset: number;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare class MTLAttributeDescriptorArray extends NSObject {

	static alloc(): MTLAttributeDescriptorArray; // inherited from NSObject

	static new(): MTLAttributeDescriptorArray; // inherited from NSObject
	[index: number]: MTLAttributeDescriptor;

	objectAtIndexedSubscript(index: number): MTLAttributeDescriptor;

	setObjectAtIndexedSubscript(attributeDesc: MTLAttributeDescriptor, index: number): void;
}

declare const enum MTLAttributeFormat {

	Invalid = 0,

	UChar2 = 1,

	UChar3 = 2,

	UChar4 = 3,

	Char2 = 4,

	Char3 = 5,

	Char4 = 6,

	UChar2Normalized = 7,

	UChar3Normalized = 8,

	UChar4Normalized = 9,

	Char2Normalized = 10,

	Char3Normalized = 11,

	Char4Normalized = 12,

	UShort2 = 13,

	UShort3 = 14,

	UShort4 = 15,

	Short2 = 16,

	Short3 = 17,

	Short4 = 18,

	UShort2Normalized = 19,

	UShort3Normalized = 20,

	UShort4Normalized = 21,

	Short2Normalized = 22,

	Short3Normalized = 23,

	Short4Normalized = 24,

	Half2 = 25,

	Half3 = 26,

	Half4 = 27,

	Float = 28,

	Float2 = 29,

	Float3 = 30,

	Float4 = 31,

	Int = 32,

	Int2 = 33,

	Int3 = 34,

	Int4 = 35,

	UInt = 36,

	UInt2 = 37,

	UInt3 = 38,

	UInt4 = 39,

	Int1010102Normalized = 40,

	UInt1010102Normalized = 41,

	UChar4Normalized_BGRA = 42,

	UChar = 45,

	Char = 46,

	UCharNormalized = 47,

	CharNormalized = 48,

	UShort = 49,

	Short = 50,

	UShortNormalized = 51,

	ShortNormalized = 52,

	Half = 53,

	FloatRG11B10 = 54,

	FloatRGB9E5 = 55
}

declare var MTLAttributeStrideStatic: number;

declare const enum MTLBarrierScope {

	Buffers = 1,

	Textures = 2,

	RenderTargets = 4
}

interface MTLBinaryArchive extends NSObjectProtocol {

	device: MTLDevice;

	label: string;

	addComputePipelineFunctionsWithDescriptorError(descriptor: MTLComputePipelineDescriptor): boolean;

	addFunctionWithDescriptorLibraryError(descriptor: MTLFunctionDescriptor, library: MTLLibrary): boolean;

	addRenderPipelineFunctionsWithDescriptorError(descriptor: MTLRenderPipelineDescriptor): boolean;

	addTileRenderPipelineFunctionsWithDescriptorError(descriptor: MTLTileRenderPipelineDescriptor): boolean;

	serializeToURLError(url: NSURL): boolean;
}
declare var MTLBinaryArchive: {

	prototype: MTLBinaryArchive;
};

declare class MTLBinaryArchiveDescriptor extends NSObject implements NSCopying {

	static alloc(): MTLBinaryArchiveDescriptor; // inherited from NSObject

	static new(): MTLBinaryArchiveDescriptor; // inherited from NSObject

	url: NSURL;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare var MTLBinaryArchiveDomain: string;

declare const enum MTLBinaryArchiveError {

	None = 0,

	InvalidFile = 1,

	UnexpectedElement = 2,

	CompilationFailure = 3,

	InternalError = 4
}

interface MTLBinding extends NSObjectProtocol {

	access: MTLBindingAccess;

	argument: boolean;

	index: number;

	name: string;

	type: MTLBindingType;

	used: boolean;
}
declare var MTLBinding: {

	prototype: MTLBinding;
};

declare const enum MTLBindingAccess {

	BindingAccessReadOnly = 0,

	BindingAccessReadWrite = 1,

	BindingAccessWriteOnly = 2,

	ArgumentAccessReadOnly = 0,

	ArgumentAccessReadWrite = 1,

	ArgumentAccessWriteOnly = 2
}

declare const enum MTLBindingType {

	Buffer = 0,

	ThreadgroupMemory = 1,

	Texture = 2,

	Sampler = 3,

	ImageblockData = 16,

	Imageblock = 17,

	VisibleFunctionTable = 24,

	PrimitiveAccelerationStructure = 25,

	InstanceAccelerationStructure = 26,

	IntersectionFunctionTable = 27,

	ObjectPayload = 34
}

declare const enum MTLBlendFactor {

	Zero = 0,

	One = 1,

	SourceColor = 2,

	OneMinusSourceColor = 3,

	SourceAlpha = 4,

	OneMinusSourceAlpha = 5,

	DestinationColor = 6,

	OneMinusDestinationColor = 7,

	DestinationAlpha = 8,

	OneMinusDestinationAlpha = 9,

	SourceAlphaSaturated = 10,

	BlendColor = 11,

	OneMinusBlendColor = 12,

	BlendAlpha = 13,

	OneMinusBlendAlpha = 14,

	Source1Color = 15,

	OneMinusSource1Color = 16,

	Source1Alpha = 17,

	OneMinusSource1Alpha = 18
}

declare const enum MTLBlendOperation {

	Add = 0,

	Subtract = 1,

	ReverseSubtract = 2,

	Min = 3,

	Max = 4
}

interface MTLBlitCommandEncoder extends MTLCommandEncoder {

	copyFromBufferSourceOffsetSourceBytesPerRowSourceBytesPerImageSourceSizeToTextureDestinationSliceDestinationLevelDestinationOrigin(sourceBuffer: MTLBuffer, sourceOffset: number, sourceBytesPerRow: number, sourceBytesPerImage: number, sourceSize: MTLSize, destinationTexture: MTLTexture, destinationSlice: number, destinationLevel: number, destinationOrigin: MTLOrigin): void;

	copyFromBufferSourceOffsetSourceBytesPerRowSourceBytesPerImageSourceSizeToTextureDestinationSliceDestinationLevelDestinationOriginOptions(sourceBuffer: MTLBuffer, sourceOffset: number, sourceBytesPerRow: number, sourceBytesPerImage: number, sourceSize: MTLSize, destinationTexture: MTLTexture, destinationSlice: number, destinationLevel: number, destinationOrigin: MTLOrigin, options: MTLBlitOption): void;

	copyFromBufferSourceOffsetToBufferDestinationOffsetSize(sourceBuffer: MTLBuffer, sourceOffset: number, destinationBuffer: MTLBuffer, destinationOffset: number, size: number): void;

	copyFromTextureSourceSliceSourceLevelSourceOriginSourceSizeToBufferDestinationOffsetDestinationBytesPerRowDestinationBytesPerImage(sourceTexture: MTLTexture, sourceSlice: number, sourceLevel: number, sourceOrigin: MTLOrigin, sourceSize: MTLSize, destinationBuffer: MTLBuffer, destinationOffset: number, destinationBytesPerRow: number, destinationBytesPerImage: number): void;

	copyFromTextureSourceSliceSourceLevelSourceOriginSourceSizeToBufferDestinationOffsetDestinationBytesPerRowDestinationBytesPerImageOptions(sourceTexture: MTLTexture, sourceSlice: number, sourceLevel: number, sourceOrigin: MTLOrigin, sourceSize: MTLSize, destinationBuffer: MTLBuffer, destinationOffset: number, destinationBytesPerRow: number, destinationBytesPerImage: number, options: MTLBlitOption): void;

	copyFromTextureSourceSliceSourceLevelSourceOriginSourceSizeToTextureDestinationSliceDestinationLevelDestinationOrigin(sourceTexture: MTLTexture, sourceSlice: number, sourceLevel: number, sourceOrigin: MTLOrigin, sourceSize: MTLSize, destinationTexture: MTLTexture, destinationSlice: number, destinationLevel: number, destinationOrigin: MTLOrigin): void;

	copyFromTextureSourceSliceSourceLevelToTextureDestinationSliceDestinationLevelSliceCountLevelCount(sourceTexture: MTLTexture, sourceSlice: number, sourceLevel: number, destinationTexture: MTLTexture, destinationSlice: number, destinationLevel: number, sliceCount: number, levelCount: number): void;

	copyFromTextureToTexture(sourceTexture: MTLTexture, destinationTexture: MTLTexture): void;

	copyIndirectCommandBufferSourceRangeDestinationDestinationIndex(source: MTLIndirectCommandBuffer, sourceRange: NSRange, destination: MTLIndirectCommandBuffer, destinationIndex: number): void;

	fillBufferRangeValue(buffer: MTLBuffer, range: NSRange, value: number): void;

	generateMipmapsForTexture(texture: MTLTexture): void;

	getTextureAccessCountersRegionMipLevelSliceResetCountersCountersBufferCountersBufferOffset(texture: MTLTexture, region: MTLRegion, mipLevel: number, slice: number, resetCounters: boolean, countersBuffer: MTLBuffer, countersBufferOffset: number): void;

	optimizeContentsForCPUAccess(texture: MTLTexture): void;

	optimizeContentsForCPUAccessSliceLevel(texture: MTLTexture, slice: number, level: number): void;

	optimizeContentsForGPUAccess(texture: MTLTexture): void;

	optimizeContentsForGPUAccessSliceLevel(texture: MTLTexture, slice: number, level: number): void;

	optimizeIndirectCommandBufferWithRange(indirectCommandBuffer: MTLIndirectCommandBuffer, range: NSRange): void;

	resetCommandsInBufferWithRange(buffer: MTLIndirectCommandBuffer, range: NSRange): void;

	resetTextureAccessCountersRegionMipLevelSlice(texture: MTLTexture, region: MTLRegion, mipLevel: number, slice: number): void;

	resolveCountersInRangeDestinationBufferDestinationOffset(sampleBuffer: MTLCounterSampleBuffer, range: NSRange, destinationBuffer: MTLBuffer, destinationOffset: number): void;

	sampleCountersInBufferAtSampleIndexWithBarrier(sampleBuffer: MTLCounterSampleBuffer, sampleIndex: number, barrier: boolean): void;

	updateFence(fence: MTLFence): void;

	waitForFence(fence: MTLFence): void;
}
declare var MTLBlitCommandEncoder: {

	prototype: MTLBlitCommandEncoder;
};

declare const enum MTLBlitOption {

	None = 0,

	DepthFromDepthStencil = 1,

	StencilFromDepthStencil = 2,

	RowLinearPVRTC = 4
}

declare class MTLBlitPassDescriptor extends NSObject implements NSCopying {

	static alloc(): MTLBlitPassDescriptor; // inherited from NSObject

	static blitPassDescriptor(): MTLBlitPassDescriptor;

	static new(): MTLBlitPassDescriptor; // inherited from NSObject

	readonly sampleBufferAttachments: MTLBlitPassSampleBufferAttachmentDescriptorArray;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare class MTLBlitPassSampleBufferAttachmentDescriptor extends NSObject implements NSCopying {

	static alloc(): MTLBlitPassSampleBufferAttachmentDescriptor; // inherited from NSObject

	static new(): MTLBlitPassSampleBufferAttachmentDescriptor; // inherited from NSObject

	endOfEncoderSampleIndex: number;

	sampleBuffer: MTLCounterSampleBuffer;

	startOfEncoderSampleIndex: number;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare class MTLBlitPassSampleBufferAttachmentDescriptorArray extends NSObject {

	static alloc(): MTLBlitPassSampleBufferAttachmentDescriptorArray; // inherited from NSObject

	static new(): MTLBlitPassSampleBufferAttachmentDescriptorArray; // inherited from NSObject
	[index: number]: MTLBlitPassSampleBufferAttachmentDescriptor;

	objectAtIndexedSubscript(attachmentIndex: number): MTLBlitPassSampleBufferAttachmentDescriptor;

	setObjectAtIndexedSubscript(attachment: MTLBlitPassSampleBufferAttachmentDescriptor, attachmentIndex: number): void;
}

interface MTLBuffer extends MTLResource {

	gpuAddress: number;

	length: number;

	addDebugMarkerRange(marker: string, range: NSRange): void;

	contents(): interop.Pointer | interop.Reference<any>;

	newTextureWithDescriptorOffsetBytesPerRow(descriptor: MTLTextureDescriptor, offset: number, bytesPerRow: number): MTLTexture;

	removeAllDebugMarkers(): void;
}
declare var MTLBuffer: {

	prototype: MTLBuffer;
};

interface MTLBufferBinding extends MTLBinding {

	bufferAlignment: number;

	bufferDataSize: number;

	bufferDataType: MTLDataType;

	bufferPointerType: MTLPointerType;

	bufferStructType: MTLStructType;
}
declare var MTLBufferBinding: {

	prototype: MTLBufferBinding;
};

declare class MTLBufferLayoutDescriptor extends NSObject implements NSCopying {

	static alloc(): MTLBufferLayoutDescriptor; // inherited from NSObject

	static new(): MTLBufferLayoutDescriptor; // inherited from NSObject

	stepFunction: MTLStepFunction;

	stepRate: number;

	stride: number;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare class MTLBufferLayoutDescriptorArray extends NSObject {

	static alloc(): MTLBufferLayoutDescriptorArray; // inherited from NSObject

	static new(): MTLBufferLayoutDescriptorArray; // inherited from NSObject
	[index: number]: MTLBufferLayoutDescriptor;

	objectAtIndexedSubscript(index: number): MTLBufferLayoutDescriptor;

	setObjectAtIndexedSubscript(bufferDesc: MTLBufferLayoutDescriptor, index: number): void;
}

declare var MTLBufferLayoutStrideDynamic: number;

declare const enum MTLCPUCacheMode {

	DefaultCache = 0,

	WriteCombined = 1
}

declare class MTLCaptureDescriptor extends NSObject implements NSCopying {

	static alloc(): MTLCaptureDescriptor; // inherited from NSObject

	static new(): MTLCaptureDescriptor; // inherited from NSObject

	captureObject: any;

	destination: MTLCaptureDestination;

	outputURL: NSURL;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare const enum MTLCaptureDestination {

	DeveloperTools = 1,

	GPUTraceDocument = 2
}

declare const enum MTLCaptureError {

	NotSupported = 1,

	AlreadyCapturing = 2,

	InvalidDescriptor = 3
}

declare var MTLCaptureErrorDomain: string;

declare class MTLCaptureManager extends NSObject {

	static alloc(): MTLCaptureManager; // inherited from NSObject

	static new(): MTLCaptureManager; // inherited from NSObject

	static sharedCaptureManager(): MTLCaptureManager;

	defaultCaptureScope: MTLCaptureScope;

	readonly isCapturing: boolean;

	newCaptureScopeWithCommandQueue(commandQueue: MTLCommandQueue): MTLCaptureScope;

	newCaptureScopeWithDevice(device: MTLDevice): MTLCaptureScope;

	startCaptureWithCommandQueue(commandQueue: MTLCommandQueue): void;

	startCaptureWithDescriptorError(descriptor: MTLCaptureDescriptor): boolean;

	startCaptureWithDevice(device: MTLDevice): void;

	startCaptureWithScope(captureScope: MTLCaptureScope): void;

	stopCapture(): void;

	supportsDestination(destination: MTLCaptureDestination): boolean;
}

interface MTLCaptureScope extends NSObjectProtocol {

	commandQueue: MTLCommandQueue;

	device: MTLDevice;

	label: string;

	beginScope(): void;

	endScope(): void;
}
declare var MTLCaptureScope: {

	prototype: MTLCaptureScope;
};

interface MTLClearColor {
	red: number;
	green: number;
	blue: number;
	alpha: number;
}
declare var MTLClearColor: interop.StructType<MTLClearColor>;

declare function MTLClearColorMake(red: number, green: number, blue: number, alpha: number): MTLClearColor;

declare const enum MTLColorWriteMask {

	None = 0,

	Red = 8,

	Green = 4,

	Blue = 2,

	Alpha = 1,

	All = 15
}

interface MTLCommandBuffer extends NSObjectProtocol {

	GPUEndTime: number;

	GPUStartTime: number;

	commandQueue: MTLCommandQueue;

	device: MTLDevice;

	error: NSError;

	errorOptions: MTLCommandBufferErrorOption;

	kernelEndTime: number;

	kernelStartTime: number;

	label: string;

	logs: MTLLogContainer;

	retainedReferences: boolean;

	status: MTLCommandBufferStatus;

	accelerationStructureCommandEncoder(): MTLAccelerationStructureCommandEncoder;

	accelerationStructureCommandEncoderWithDescriptor(descriptor: MTLAccelerationStructurePassDescriptor): MTLAccelerationStructureCommandEncoder;

	addCompletedHandler(block: (p1: MTLCommandBuffer) => void): void;

	addScheduledHandler(block: (p1: MTLCommandBuffer) => void): void;

	blitCommandEncoder(): MTLBlitCommandEncoder;

	blitCommandEncoderWithDescriptor(blitPassDescriptor: MTLBlitPassDescriptor): MTLBlitCommandEncoder;

	commit(): void;

	computeCommandEncoder(): MTLComputeCommandEncoder;

	computeCommandEncoderWithDescriptor(computePassDescriptor: MTLComputePassDescriptor): MTLComputeCommandEncoder;

	computeCommandEncoderWithDispatchType(dispatchType: MTLDispatchType): MTLComputeCommandEncoder;

	encodeSignalEventValue(event: MTLEvent, value: number): void;

	encodeWaitForEventValue(event: MTLEvent, value: number): void;

	enqueue(): void;

	parallelRenderCommandEncoderWithDescriptor(renderPassDescriptor: MTLRenderPassDescriptor): MTLParallelRenderCommandEncoder;

	popDebugGroup(): void;

	presentDrawable(drawable: MTLDrawable): void;

	presentDrawableAtTime(drawable: MTLDrawable, presentationTime: number): void;

	pushDebugGroup(string: string): void;

	renderCommandEncoderWithDescriptor(renderPassDescriptor: MTLRenderPassDescriptor): MTLRenderCommandEncoder;

	resourceStateCommandEncoder(): MTLResourceStateCommandEncoder;

	resourceStateCommandEncoderWithDescriptor(resourceStatePassDescriptor: MTLResourceStatePassDescriptor): MTLResourceStateCommandEncoder;

	waitUntilCompleted(): void;

	waitUntilScheduled(): void;
}
declare var MTLCommandBuffer: {

	prototype: MTLCommandBuffer;
};

declare class MTLCommandBufferDescriptor extends NSObject implements NSCopying {

	static alloc(): MTLCommandBufferDescriptor; // inherited from NSObject

	static new(): MTLCommandBufferDescriptor; // inherited from NSObject

	errorOptions: MTLCommandBufferErrorOption;

	retainedReferences: boolean;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

interface MTLCommandBufferEncoderInfo extends NSObjectProtocol {

	debugSignposts: NSArray<string>;

	errorState: MTLCommandEncoderErrorState;

	label: string;
}
declare var MTLCommandBufferEncoderInfo: {

	prototype: MTLCommandBufferEncoderInfo;
};

declare var MTLCommandBufferEncoderInfoErrorKey: string;

declare const enum MTLCommandBufferError {

	None = 0,

	Internal = 1,

	Timeout = 2,

	PageFault = 3,

	Blacklisted = 4,

	AccessRevoked = 4,

	NotPermitted = 7,

	OutOfMemory = 8,

	InvalidResource = 9,

	Memoryless = 10,

	DeviceRemoved = 11,

	StackOverflow = 12
}

declare var MTLCommandBufferErrorDomain: string;

declare const enum MTLCommandBufferErrorOption {

	None = 0,

	EncoderExecutionStatus = 1
}

declare const enum MTLCommandBufferStatus {

	NotEnqueued = 0,

	Enqueued = 1,

	Committed = 2,

	Scheduled = 3,

	Completed = 4,

	Error = 5
}

interface MTLCommandEncoder extends NSObjectProtocol {

	device: MTLDevice;

	label: string;

	endEncoding(): void;

	insertDebugSignpost(string: string): void;

	popDebugGroup(): void;

	pushDebugGroup(string: string): void;
}
declare var MTLCommandEncoder: {

	prototype: MTLCommandEncoder;
};

declare const enum MTLCommandEncoderErrorState {

	Unknown = 0,

	Completed = 1,

	Affected = 2,

	Pending = 3,

	Faulted = 4
}

interface MTLCommandQueue extends NSObjectProtocol {

	device: MTLDevice;

	label: string;

	commandBuffer(): MTLCommandBuffer;

	commandBufferWithDescriptor(descriptor: MTLCommandBufferDescriptor): MTLCommandBuffer;

	commandBufferWithUnretainedReferences(): MTLCommandBuffer;

	insertDebugCaptureBoundary(): void;
}
declare var MTLCommandQueue: {

	prototype: MTLCommandQueue;
};

declare var MTLCommonCounterClipperInvocations: string;

declare var MTLCommonCounterClipperPrimitivesOut: string;

declare var MTLCommonCounterComputeKernelInvocations: string;

declare var MTLCommonCounterFragmentCycles: string;

declare var MTLCommonCounterFragmentInvocations: string;

declare var MTLCommonCounterFragmentsPassed: string;

declare var MTLCommonCounterPostTessellationVertexCycles: string;

declare var MTLCommonCounterPostTessellationVertexInvocations: string;

declare var MTLCommonCounterRenderTargetWriteCycles: string;

declare var MTLCommonCounterSetStageUtilization: string;

declare var MTLCommonCounterSetStatistic: string;

declare var MTLCommonCounterSetTimestamp: string;

declare var MTLCommonCounterTessellationCycles: string;

declare var MTLCommonCounterTessellationInputPatches: string;

declare var MTLCommonCounterTimestamp: string;

declare var MTLCommonCounterTotalCycles: string;

declare var MTLCommonCounterVertexCycles: string;

declare var MTLCommonCounterVertexInvocations: string;

declare const enum MTLCompareFunction {

	Never = 0,

	Less = 1,

	Equal = 2,

	LessEqual = 3,

	Greater = 4,

	NotEqual = 5,

	GreaterEqual = 6,

	Always = 7
}

declare class MTLCompileOptions extends NSObject implements NSCopying {

	static alloc(): MTLCompileOptions; // inherited from NSObject

	static new(): MTLCompileOptions; // inherited from NSObject

	allowReferencingUndefinedSymbols: boolean;

	compileSymbolVisibility: MTLCompileSymbolVisibility;

	fastMathEnabled: boolean;

	installName: string;

	languageVersion: MTLLanguageVersion;

	libraries: NSArray<MTLDynamicLibrary>;

	libraryType: MTLLibraryType;

	maxTotalThreadsPerThreadgroup: number;

	optimizationLevel: MTLLibraryOptimizationLevel;

	preprocessorMacros: NSDictionary<string, NSObject>;

	preserveInvariance: boolean;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare const enum MTLCompileSymbolVisibility {

	Default = 0,

	Hidden = 1
}

interface MTLComputeCommandEncoder extends MTLCommandEncoder {

	dispatchType: MTLDispatchType;

	dispatchThreadgroupsThreadsPerThreadgroup(threadgroupsPerGrid: MTLSize, threadsPerThreadgroup: MTLSize): void;

	dispatchThreadgroupsWithIndirectBufferIndirectBufferOffsetThreadsPerThreadgroup(indirectBuffer: MTLBuffer, indirectBufferOffset: number, threadsPerThreadgroup: MTLSize): void;

	dispatchThreadsThreadsPerThreadgroup(threadsPerGrid: MTLSize, threadsPerThreadgroup: MTLSize): void;

	executeCommandsInBufferIndirectBufferIndirectBufferOffset(indirectCommandbuffer: MTLIndirectCommandBuffer, indirectRangeBuffer: MTLBuffer, indirectBufferOffset: number): void;

	executeCommandsInBufferWithRange(indirectCommandBuffer: MTLIndirectCommandBuffer, executionRange: NSRange): void;

	memoryBarrierWithResourcesCount(resources: interop.Reference<MTLResource>, count: number): void;

	memoryBarrierWithScope(scope: MTLBarrierScope): void;

	sampleCountersInBufferAtSampleIndexWithBarrier(sampleBuffer: MTLCounterSampleBuffer, sampleIndex: number, barrier: boolean): void;

	setAccelerationStructureAtBufferIndex(accelerationStructure: MTLAccelerationStructure, bufferIndex: number): void;

	setBufferOffsetAtIndex(buffer: MTLBuffer, offset: number, index: number): void;

	setBufferOffsetAtIndex(offset: number, index: number): void;

	setBufferOffsetAttributeStrideAtIndex(buffer: MTLBuffer, offset: number, stride: number, index: number): void;

	setBufferOffsetAttributeStrideAtIndex(offset: number, stride: number, index: number): void;

	setBuffersOffsetsAttributeStridesWithRange(buffers: interop.Reference<MTLBuffer>, offsets: interop.Reference<number>, strides: interop.Reference<number>, range: NSRange): void;

	setBuffersOffsetsWithRange(buffers: interop.Reference<MTLBuffer>, offsets: interop.Reference<number>, range: NSRange): void;

	setBytesLengthAtIndex(bytes: interop.Pointer | interop.Reference<any>, length: number, index: number): void;

	setBytesLengthAttributeStrideAtIndex(bytes: interop.Pointer | interop.Reference<any>, length: number, stride: number, index: number): void;

	setComputePipelineState(state: MTLComputePipelineState): void;

	setImageblockWidthHeight(width: number, height: number): void;

	setIntersectionFunctionTableAtBufferIndex(intersectionFunctionTable: MTLIntersectionFunctionTable, bufferIndex: number): void;

	setIntersectionFunctionTablesWithBufferRange(intersectionFunctionTables: interop.Reference<MTLIntersectionFunctionTable>, range: NSRange): void;

	setSamplerStateAtIndex(sampler: MTLSamplerState, index: number): void;

	setSamplerStateLodMinClampLodMaxClampAtIndex(sampler: MTLSamplerState, lodMinClamp: number, lodMaxClamp: number, index: number): void;

	setSamplerStatesLodMinClampsLodMaxClampsWithRange(samplers: interop.Reference<MTLSamplerState>, lodMinClamps: interop.Reference<number>, lodMaxClamps: interop.Reference<number>, range: NSRange): void;

	setSamplerStatesWithRange(samplers: interop.Reference<MTLSamplerState>, range: NSRange): void;

	setStageInRegion(region: MTLRegion): void;

	setStageInRegionWithIndirectBufferIndirectBufferOffset(indirectBuffer: MTLBuffer, indirectBufferOffset: number): void;

	setTextureAtIndex(texture: MTLTexture, index: number): void;

	setTexturesWithRange(textures: interop.Reference<MTLTexture>, range: NSRange): void;

	setThreadgroupMemoryLengthAtIndex(length: number, index: number): void;

	setVisibleFunctionTableAtBufferIndex(visibleFunctionTable: MTLVisibleFunctionTable, bufferIndex: number): void;

	setVisibleFunctionTablesWithBufferRange(visibleFunctionTables: interop.Reference<MTLVisibleFunctionTable>, range: NSRange): void;

	updateFence(fence: MTLFence): void;

	useHeap(heap: MTLHeap): void;

	useHeapsCount(heaps: interop.Reference<MTLHeap>, count: number): void;

	useResourceUsage(resource: MTLResource, usage: MTLResourceUsage): void;

	useResourcesCountUsage(resources: interop.Reference<MTLResource>, count: number, usage: MTLResourceUsage): void;

	waitForFence(fence: MTLFence): void;
}
declare var MTLComputeCommandEncoder: {

	prototype: MTLComputeCommandEncoder;
};

declare class MTLComputePassDescriptor extends NSObject implements NSCopying {

	static alloc(): MTLComputePassDescriptor; // inherited from NSObject

	static computePassDescriptor(): MTLComputePassDescriptor;

	static new(): MTLComputePassDescriptor; // inherited from NSObject

	dispatchType: MTLDispatchType;

	readonly sampleBufferAttachments: MTLComputePassSampleBufferAttachmentDescriptorArray;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare class MTLComputePassSampleBufferAttachmentDescriptor extends NSObject implements NSCopying {

	static alloc(): MTLComputePassSampleBufferAttachmentDescriptor; // inherited from NSObject

	static new(): MTLComputePassSampleBufferAttachmentDescriptor; // inherited from NSObject

	endOfEncoderSampleIndex: number;

	sampleBuffer: MTLCounterSampleBuffer;

	startOfEncoderSampleIndex: number;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare class MTLComputePassSampleBufferAttachmentDescriptorArray extends NSObject {

	static alloc(): MTLComputePassSampleBufferAttachmentDescriptorArray; // inherited from NSObject

	static new(): MTLComputePassSampleBufferAttachmentDescriptorArray; // inherited from NSObject
	[index: number]: MTLComputePassSampleBufferAttachmentDescriptor;

	objectAtIndexedSubscript(attachmentIndex: number): MTLComputePassSampleBufferAttachmentDescriptor;

	setObjectAtIndexedSubscript(attachment: MTLComputePassSampleBufferAttachmentDescriptor, attachmentIndex: number): void;
}

declare class MTLComputePipelineDescriptor extends NSObject implements NSCopying {

	static alloc(): MTLComputePipelineDescriptor; // inherited from NSObject

	static new(): MTLComputePipelineDescriptor; // inherited from NSObject

	binaryArchives: NSArray<MTLBinaryArchive>;

	readonly buffers: MTLPipelineBufferDescriptorArray;

	computeFunction: MTLFunction;

	insertLibraries: NSArray<MTLDynamicLibrary>;

	label: string;

	linkedFunctions: MTLLinkedFunctions;

	maxCallStackDepth: number;

	maxTotalThreadsPerThreadgroup: number;

	preloadedLibraries: NSArray<MTLDynamicLibrary>;

	stageInputDescriptor: MTLStageInputOutputDescriptor;

	supportAddingBinaryFunctions: boolean;

	supportIndirectCommandBuffers: boolean;

	threadGroupSizeIsMultipleOfThreadExecutionWidth: boolean;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	reset(): void;
}

declare class MTLComputePipelineReflection extends NSObject {

	static alloc(): MTLComputePipelineReflection; // inherited from NSObject

	static new(): MTLComputePipelineReflection; // inherited from NSObject

	readonly arguments: NSArray<MTLArgument>;

	readonly bindings: NSArray<MTLBinding>;
}

interface MTLComputePipelineState extends NSObjectProtocol {

	device: MTLDevice;

	gpuResourceID: MTLResourceID;

	label: string;

	maxTotalThreadsPerThreadgroup: number;

	staticThreadgroupMemoryLength: number;

	supportIndirectCommandBuffers: boolean;

	threadExecutionWidth: number;

	functionHandleWithFunction(_function: MTLFunction): MTLFunctionHandle;

	imageblockMemoryLengthForDimensions(imageblockDimensions: MTLSize): number;

	newComputePipelineStateWithAdditionalBinaryFunctionsError(functions: NSArray<MTLFunction> | MTLFunction[]): MTLComputePipelineState;

	newIntersectionFunctionTableWithDescriptor(descriptor: MTLIntersectionFunctionTableDescriptor): MTLIntersectionFunctionTable;

	newVisibleFunctionTableWithDescriptor(descriptor: MTLVisibleFunctionTableDescriptor): MTLVisibleFunctionTable;
}
declare var MTLComputePipelineState: {

	prototype: MTLComputePipelineState;
};

interface MTLCounter extends NSObjectProtocol {

	name: string;
}
declare var MTLCounter: {

	prototype: MTLCounter;
};

declare var MTLCounterErrorDomain: string;

interface MTLCounterResultStageUtilization {
	totalCycles: number;
	vertexCycles: number;
	tessellationCycles: number;
	postTessellationVertexCycles: number;
	fragmentCycles: number;
	renderTargetCycles: number;
}
declare var MTLCounterResultStageUtilization: interop.StructType<MTLCounterResultStageUtilization>;

interface MTLCounterResultStatistic {
	tessellationInputPatches: number;
	vertexInvocations: number;
	postTessellationVertexInvocations: number;
	clipperInvocations: number;
	clipperPrimitivesOut: number;
	fragmentInvocations: number;
	fragmentsPassed: number;
	computeKernelInvocations: number;
}
declare var MTLCounterResultStatistic: interop.StructType<MTLCounterResultStatistic>;

interface MTLCounterResultTimestamp {
	timestamp: number;
}
declare var MTLCounterResultTimestamp: interop.StructType<MTLCounterResultTimestamp>;

interface MTLCounterSampleBuffer extends NSObjectProtocol {

	device: MTLDevice;

	label: string;

	sampleCount: number;

	resolveCounterRange(range: NSRange): NSData;
}
declare var MTLCounterSampleBuffer: {

	prototype: MTLCounterSampleBuffer;
};

declare class MTLCounterSampleBufferDescriptor extends NSObject implements NSCopying {

	static alloc(): MTLCounterSampleBufferDescriptor; // inherited from NSObject

	static new(): MTLCounterSampleBufferDescriptor; // inherited from NSObject

	counterSet: MTLCounterSet;

	label: string;

	sampleCount: number;

	storageMode: MTLStorageMode;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare const enum MTLCounterSampleBufferError {

	OutOfMemory = 0,

	Invalid = 1,

	Internal = 2
}

declare const enum MTLCounterSamplingPoint {

	AtStageBoundary = 0,

	AtDrawBoundary = 1,

	AtDispatchBoundary = 2,

	AtTileDispatchBoundary = 3,

	AtBlitBoundary = 4
}

interface MTLCounterSet extends NSObjectProtocol {

	counters: NSArray<MTLCounter>;

	name: string;
}
declare var MTLCounterSet: {

	prototype: MTLCounterSet;
};

declare function MTLCreateSystemDefaultDevice(): MTLDevice;

declare const enum MTLCullMode {

	None = 0,

	Front = 1,

	Back = 2
}

declare const enum MTLCurveBasis {

	BSpline = 0,

	CatmullRom = 1,

	Linear = 2,

	Bezier = 3
}

declare const enum MTLCurveEndCaps {

	None = 0,

	Disk = 1,

	Sphere = 2
}

declare const enum MTLCurveType {

	Round = 0,

	Flat = 1
}

declare const enum MTLDataType {

	None = 0,

	Struct = 1,

	Array = 2,

	Float = 3,

	Float2 = 4,

	Float3 = 5,

	Float4 = 6,

	Float2x2 = 7,

	Float2x3 = 8,

	Float2x4 = 9,

	Float3x2 = 10,

	Float3x3 = 11,

	Float3x4 = 12,

	Float4x2 = 13,

	Float4x3 = 14,

	Float4x4 = 15,

	Half = 16,

	Half2 = 17,

	Half3 = 18,

	Half4 = 19,

	Half2x2 = 20,

	Half2x3 = 21,

	Half2x4 = 22,

	Half3x2 = 23,

	Half3x3 = 24,

	Half3x4 = 25,

	Half4x2 = 26,

	Half4x3 = 27,

	Half4x4 = 28,

	Int = 29,

	Int2 = 30,

	Int3 = 31,

	Int4 = 32,

	UInt = 33,

	UInt2 = 34,

	UInt3 = 35,

	UInt4 = 36,

	Short = 37,

	Short2 = 38,

	Short3 = 39,

	Short4 = 40,

	UShort = 41,

	UShort2 = 42,

	UShort3 = 43,

	UShort4 = 44,

	Char = 45,

	Char2 = 46,

	Char3 = 47,

	Char4 = 48,

	UChar = 49,

	UChar2 = 50,

	UChar3 = 51,

	UChar4 = 52,

	Bool = 53,

	Bool2 = 54,

	Bool3 = 55,

	Bool4 = 56,

	Texture = 58,

	Sampler = 59,

	Pointer = 60,

	R8Unorm = 62,

	R8Snorm = 63,

	R16Unorm = 64,

	R16Snorm = 65,

	RG8Unorm = 66,

	RG8Snorm = 67,

	RG16Unorm = 68,

	RG16Snorm = 69,

	RGBA8Unorm = 70,

	RGBA8Unorm_sRGB = 71,

	RGBA8Snorm = 72,

	RGBA16Unorm = 73,

	RGBA16Snorm = 74,

	RGB10A2Unorm = 75,

	RG11B10Float = 76,

	RGB9E5Float = 77,

	RenderPipeline = 78,

	ComputePipeline = 79,

	IndirectCommandBuffer = 80,

	Long = 81,

	Long2 = 82,

	Long3 = 83,

	Long4 = 84,

	ULong = 85,

	ULong2 = 86,

	ULong3 = 87,

	ULong4 = 88,

	VisibleFunctionTable = 115,

	IntersectionFunctionTable = 116,

	PrimitiveAccelerationStructure = 117,

	InstanceAccelerationStructure = 118,

	BFloat = 121,

	BFloat2 = 122,

	BFloat3 = 123,

	BFloat4 = 124
}

declare const enum MTLDepthClipMode {

	Clip = 0,

	Clamp = 1
}

declare class MTLDepthStencilDescriptor extends NSObject implements NSCopying {

	static alloc(): MTLDepthStencilDescriptor; // inherited from NSObject

	static new(): MTLDepthStencilDescriptor; // inherited from NSObject

	backFaceStencil: MTLStencilDescriptor;

	depthCompareFunction: MTLCompareFunction;

	depthWriteEnabled: boolean;

	frontFaceStencil: MTLStencilDescriptor;

	label: string;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

interface MTLDepthStencilState extends NSObjectProtocol {

	device: MTLDevice;

	label: string;
}
declare var MTLDepthStencilState: {

	prototype: MTLDepthStencilState;
};

interface MTLDevice extends NSObjectProtocol {

	architecture: MTLArchitecture;

	argumentBuffersSupport: MTLArgumentBuffersTier;

	barycentricCoordsSupported: boolean;

	counterSets: NSArray<MTLCounterSet>;

	currentAllocatedSize: number;

	hasUnifiedMemory: boolean;

	maxArgumentBufferSamplerCount: number;

	maxBufferLength: number;

	maxThreadgroupMemoryLength: number;

	maxThreadsPerThreadgroup: MTLSize;

	name: string;

	programmableSamplePositionsSupported: boolean;

	rasterOrderGroupsSupported: boolean;

	readWriteTextureSupport: MTLReadWriteTextureTier;

	recommendedMaxWorkingSetSize: number;

	registryID: number;

	sparseTileSizeInBytes: number;

	supports32BitFloatFiltering: boolean;

	supports32BitMSAA: boolean;

	supportsBCTextureCompression: boolean;

	supportsDynamicLibraries: boolean;

	supportsFunctionPointers: boolean;

	supportsFunctionPointersFromRender: boolean;

	supportsPrimitiveMotionBlur: boolean;

	supportsPullModelInterpolation: boolean;

	supportsQueryTextureLOD: boolean;

	supportsRaytracing: boolean;

	supportsRaytracingFromRender: boolean;

	supportsRenderDynamicLibraries: boolean;

	supportsShaderBarycentricCoordinates: boolean;

	accelerationStructureSizesWithDescriptor(descriptor: MTLAccelerationStructureDescriptor): MTLAccelerationStructureSizes;

	convertSparsePixelRegionsToTileRegionsWithTileSizeAlignmentModeNumRegions?(pixelRegions: interop.Reference<MTLRegion>, tileRegions: interop.Reference<MTLRegion>, tileSize: MTLSize, mode: MTLSparseTextureRegionAlignmentMode, numRegions: number): void;

	convertSparseTileRegionsToPixelRegionsWithTileSizeNumRegions?(tileRegions: interop.Reference<MTLRegion>, pixelRegions: interop.Reference<MTLRegion>, tileSize: MTLSize, numRegions: number): void;

	getDefaultSamplePositionsCount(positions: interop.Pointer | interop.Reference<MTLSamplePosition>, count: number): void;

	heapAccelerationStructureSizeAndAlignWithDescriptor(descriptor: MTLAccelerationStructureDescriptor): MTLSizeAndAlign;

	heapAccelerationStructureSizeAndAlignWithSize(size: number): MTLSizeAndAlign;

	heapBufferSizeAndAlignWithLengthOptions(length: number, options: MTLResourceOptions): MTLSizeAndAlign;

	heapTextureSizeAndAlignWithDescriptor(desc: MTLTextureDescriptor): MTLSizeAndAlign;

	minimumLinearTextureAlignmentForPixelFormat(format: MTLPixelFormat): number;

	minimumTextureBufferAlignmentForPixelFormat(format: MTLPixelFormat): number;

	newAccelerationStructureWithDescriptor(descriptor: MTLAccelerationStructureDescriptor): MTLAccelerationStructure;

	newAccelerationStructureWithSize(size: number): MTLAccelerationStructure;

	newArgumentEncoderWithArguments(_arguments: NSArray<MTLArgumentDescriptor> | MTLArgumentDescriptor[]): MTLArgumentEncoder;

	newArgumentEncoderWithBufferBinding(bufferBinding: MTLBufferBinding): MTLArgumentEncoder;

	newBinaryArchiveWithDescriptorError(descriptor: MTLBinaryArchiveDescriptor): MTLBinaryArchive;

	newBufferWithBytesLengthOptions(pointer: interop.Pointer | interop.Reference<any>, length: number, options: MTLResourceOptions): MTLBuffer;

	newBufferWithBytesNoCopyLengthOptionsDeallocator(pointer: interop.Pointer | interop.Reference<any>, length: number, options: MTLResourceOptions, deallocator: (p1: interop.Pointer | interop.Reference<any>, p2: number) => void): MTLBuffer;

	newBufferWithLengthOptions(length: number, options: MTLResourceOptions): MTLBuffer;

	newCommandQueue(): MTLCommandQueue;

	newCommandQueueWithMaxCommandBufferCount(maxCommandBufferCount: number): MTLCommandQueue;

	newComputePipelineStateWithDescriptorOptionsCompletionHandler(descriptor: MTLComputePipelineDescriptor, options: MTLPipelineOption, completionHandler: (p1: MTLComputePipelineState, p2: MTLComputePipelineReflection, p3: NSError) => void): void;

	newComputePipelineStateWithDescriptorOptionsReflectionError(descriptor: MTLComputePipelineDescriptor, options: MTLPipelineOption, reflection: interop.Pointer | interop.Reference<MTLComputePipelineReflection>): MTLComputePipelineState;

	newComputePipelineStateWithFunctionCompletionHandler(computeFunction: MTLFunction, completionHandler: (p1: MTLComputePipelineState, p2: NSError) => void): void;

	newComputePipelineStateWithFunctionError(computeFunction: MTLFunction): MTLComputePipelineState;

	newComputePipelineStateWithFunctionOptionsCompletionHandler(computeFunction: MTLFunction, options: MTLPipelineOption, completionHandler: (p1: MTLComputePipelineState, p2: MTLComputePipelineReflection, p3: NSError) => void): void;

	newComputePipelineStateWithFunctionOptionsReflectionError(computeFunction: MTLFunction, options: MTLPipelineOption, reflection: interop.Pointer | interop.Reference<MTLComputePipelineReflection>): MTLComputePipelineState;

	newCounterSampleBufferWithDescriptorError(descriptor: MTLCounterSampleBufferDescriptor): MTLCounterSampleBuffer;

	newDefaultLibrary(): MTLLibrary;

	newDefaultLibraryWithBundleError(bundle: NSBundle): MTLLibrary;

	newDepthStencilStateWithDescriptor(descriptor: MTLDepthStencilDescriptor): MTLDepthStencilState;

	newDynamicLibraryError(library: MTLLibrary): MTLDynamicLibrary;

	newDynamicLibraryWithURLError(url: NSURL): MTLDynamicLibrary;

	newEvent(): MTLEvent;

	newFence(): MTLFence;

	newHeapWithDescriptor(descriptor: MTLHeapDescriptor): MTLHeap;

	newIndirectCommandBufferWithDescriptorMaxCommandCountOptions(descriptor: MTLIndirectCommandBufferDescriptor, maxCount: number, options: MTLResourceOptions): MTLIndirectCommandBuffer;

	newLibraryWithDataError(data: interop.Pointer | interop.Reference<any>): MTLLibrary;

	newLibraryWithFileError(filepath: string): MTLLibrary;

	newLibraryWithSourceOptionsCompletionHandler(source: string, options: MTLCompileOptions, completionHandler: (p1: MTLLibrary, p2: NSError) => void): void;

	newLibraryWithSourceOptionsError(source: string, options: MTLCompileOptions): MTLLibrary;

	newLibraryWithStitchedDescriptorCompletionHandler(descriptor: MTLStitchedLibraryDescriptor, completionHandler: (p1: MTLLibrary, p2: NSError) => void): void;

	newLibraryWithStitchedDescriptorError(descriptor: MTLStitchedLibraryDescriptor): MTLLibrary;

	newLibraryWithURLError(url: NSURL): MTLLibrary;

	newRasterizationRateMapWithDescriptor(descriptor: MTLRasterizationRateMapDescriptor): MTLRasterizationRateMap;

	newRenderPipelineStateWithDescriptorCompletionHandler(descriptor: MTLRenderPipelineDescriptor, completionHandler: (p1: MTLRenderPipelineState, p2: NSError) => void): void;

	newRenderPipelineStateWithDescriptorError(descriptor: MTLRenderPipelineDescriptor): MTLRenderPipelineState;

	newRenderPipelineStateWithDescriptorOptionsCompletionHandler(descriptor: MTLRenderPipelineDescriptor, options: MTLPipelineOption, completionHandler: (p1: MTLRenderPipelineState, p2: MTLRenderPipelineReflection, p3: NSError) => void): void;

	newRenderPipelineStateWithDescriptorOptionsReflectionError(descriptor: MTLRenderPipelineDescriptor, options: MTLPipelineOption, reflection: interop.Pointer | interop.Reference<MTLRenderPipelineReflection>): MTLRenderPipelineState;

	newRenderPipelineStateWithMeshDescriptorOptionsCompletionHandler(descriptor: MTLMeshRenderPipelineDescriptor, options: MTLPipelineOption, completionHandler: (p1: MTLRenderPipelineState, p2: MTLRenderPipelineReflection, p3: NSError) => void): void;

	newRenderPipelineStateWithMeshDescriptorOptionsReflectionError(descriptor: MTLMeshRenderPipelineDescriptor, options: MTLPipelineOption, reflection: interop.Pointer | interop.Reference<MTLRenderPipelineReflection>): MTLRenderPipelineState;

	newRenderPipelineStateWithTileDescriptorOptionsCompletionHandler(descriptor: MTLTileRenderPipelineDescriptor, options: MTLPipelineOption, completionHandler: (p1: MTLRenderPipelineState, p2: MTLRenderPipelineReflection, p3: NSError) => void): void;

	newRenderPipelineStateWithTileDescriptorOptionsReflectionError(descriptor: MTLTileRenderPipelineDescriptor, options: MTLPipelineOption, reflection: interop.Pointer | interop.Reference<MTLRenderPipelineReflection>): MTLRenderPipelineState;

	newSamplerStateWithDescriptor(descriptor: MTLSamplerDescriptor): MTLSamplerState;

	newSharedEvent(): MTLSharedEvent;

	newSharedEventWithHandle(sharedEventHandle: MTLSharedEventHandle): MTLSharedEvent;

	newTextureWithDescriptor(descriptor: MTLTextureDescriptor): MTLTexture;

	newTextureWithDescriptorIosurfacePlane(descriptor: MTLTextureDescriptor, iosurface: IOSurface, plane: number): MTLTexture;

	sampleTimestampsGpuTimestamp(cpuTimestamp: interop.Pointer | interop.Reference<number>, gpuTimestamp: interop.Pointer | interop.Reference<number>): void;

	sparseTileSizeInBytesForSparsePageSize(sparsePageSize: MTLSparsePageSize): number;

	sparseTileSizeWithTextureTypePixelFormatSampleCount(textureType: MTLTextureType, pixelFormat: MTLPixelFormat, sampleCount: number): MTLSize;

	sparseTileSizeWithTextureTypePixelFormatSampleCountSparsePageSize(textureType: MTLTextureType, pixelFormat: MTLPixelFormat, sampleCount: number, sparsePageSize: MTLSparsePageSize): MTLSize;

	supportsCounterSampling(samplingPoint: MTLCounterSamplingPoint): boolean;

	supportsFamily(gpuFamily: MTLGPUFamily): boolean;

	supportsFeatureSet(featureSet: MTLFeatureSet): boolean;

	supportsRasterizationRateMapWithLayerCount(layerCount: number): boolean;

	supportsTextureSampleCount(sampleCount: number): boolean;

	supportsVertexAmplificationCount(count: number): boolean;
}
declare var MTLDevice: {

	prototype: MTLDevice;
};

interface MTLDispatchThreadgroupsIndirectArguments {
	threadgroupsPerGrid: interop.Reference<number>;
}
declare var MTLDispatchThreadgroupsIndirectArguments: interop.StructType<MTLDispatchThreadgroupsIndirectArguments>;

declare const enum MTLDispatchType {

	Serial = 0,

	Concurrent = 1
}

interface MTLDrawIndexedPrimitivesIndirectArguments {
	indexCount: number;
	instanceCount: number;
	indexStart: number;
	baseVertex: number;
	baseInstance: number;
}
declare var MTLDrawIndexedPrimitivesIndirectArguments: interop.StructType<MTLDrawIndexedPrimitivesIndirectArguments>;

interface MTLDrawPatchIndirectArguments {
	patchCount: number;
	instanceCount: number;
	patchStart: number;
	baseInstance: number;
}
declare var MTLDrawPatchIndirectArguments: interop.StructType<MTLDrawPatchIndirectArguments>;

interface MTLDrawPrimitivesIndirectArguments {
	vertexCount: number;
	instanceCount: number;
	vertexStart: number;
	baseInstance: number;
}
declare var MTLDrawPrimitivesIndirectArguments: interop.StructType<MTLDrawPrimitivesIndirectArguments>;

interface MTLDrawable extends NSObjectProtocol {

	present(): void;

	presentAtTime(presentationTime: number): void;
}
declare var MTLDrawable: {

	prototype: MTLDrawable;
};

interface MTLDynamicLibrary extends NSObjectProtocol {

	device: MTLDevice;

	installName: string;

	label: string;

	serializeToURLError(url: NSURL): boolean;
}
declare var MTLDynamicLibrary: {

	prototype: MTLDynamicLibrary;
};

declare var MTLDynamicLibraryDomain: string;

declare const enum MTLDynamicLibraryError {

	None = 0,

	InvalidFile = 1,

	CompilationFailure = 2,

	UnresolvedInstallName = 3,

	DependencyLoadFailure = 4,

	Unsupported = 5
}

interface MTLEvent extends NSObjectProtocol {

	device: MTLDevice;

	label: string;
}
declare var MTLEvent: {

	prototype: MTLEvent;
};

declare const enum MTLFeatureSet {

	iOS_GPUFamily1_v1 = 0,

	iOS_GPUFamily2_v1 = 1,

	iOS_GPUFamily1_v2 = 2,

	iOS_GPUFamily2_v2 = 3,

	iOS_GPUFamily3_v1 = 4,

	iOS_GPUFamily1_v3 = 5,

	iOS_GPUFamily2_v3 = 6,

	iOS_GPUFamily3_v2 = 7,

	iOS_GPUFamily1_v4 = 8,

	iOS_GPUFamily2_v4 = 9,

	iOS_GPUFamily3_v3 = 10,

	iOS_GPUFamily4_v1 = 11,

	iOS_GPUFamily1_v5 = 12,

	iOS_GPUFamily2_v5 = 13,

	iOS_GPUFamily3_v4 = 14,

	iOS_GPUFamily4_v2 = 15,

	iOS_GPUFamily5_v1 = 16,

	macOS_GPUFamily1_v1 = 10000,

	OSX_GPUFamily1_v1 = 10000,

	macOS_GPUFamily1_v2 = 10001,

	OSX_GPUFamily1_v2 = 10001,

	macOS_ReadWriteTextureTier2 = 10002,

	OSX_ReadWriteTextureTier2 = 10002,

	macOS_GPUFamily1_v3 = 10003,

	macOS_GPUFamily1_v4 = 10004,

	macOS_GPUFamily2_v1 = 10005,

	tvOS_GPUFamily1_v1 = 30000,

	TVOS_GPUFamily1_v1 = 30000,

	tvOS_GPUFamily1_v2 = 30001,

	tvOS_GPUFamily1_v3 = 30002,

	tvOS_GPUFamily1_v4 = 30004
}

interface MTLFence extends NSObjectProtocol {

	device: MTLDevice;

	label: string;
}
declare var MTLFence: {

	prototype: MTLFence;
};

interface MTLFunction extends NSObjectProtocol {

	device: MTLDevice;

	functionConstantsDictionary: NSDictionary<string, MTLFunctionConstant>;

	functionType: MTLFunctionType;

	label: string;

	name: string;

	options: MTLFunctionOptions;

	patchControlPointCount: number;

	patchType: MTLPatchType;

	stageInputAttributes: NSArray<MTLAttribute>;

	vertexAttributes: NSArray<MTLVertexAttribute>;

	newArgumentEncoderWithBufferIndex(bufferIndex: number): MTLArgumentEncoder;

	newArgumentEncoderWithBufferIndexReflection(bufferIndex: number, reflection: interop.Pointer | interop.Reference<MTLArgument>): MTLArgumentEncoder;
}
declare var MTLFunction: {

	prototype: MTLFunction;
};

declare class MTLFunctionConstant extends NSObject {

	static alloc(): MTLFunctionConstant; // inherited from NSObject

	static new(): MTLFunctionConstant; // inherited from NSObject

	readonly index: number;

	readonly name: string;

	readonly required: boolean;

	readonly type: MTLDataType;
}

declare class MTLFunctionConstantValues extends NSObject implements NSCopying {

	static alloc(): MTLFunctionConstantValues; // inherited from NSObject

	static new(): MTLFunctionConstantValues; // inherited from NSObject

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	reset(): void;

	setConstantValueTypeAtIndex(value: interop.Pointer | interop.Reference<any>, type: MTLDataType, index: number): void;

	setConstantValueTypeWithName(value: interop.Pointer | interop.Reference<any>, type: MTLDataType, name: string): void;

	setConstantValuesTypeWithRange(values: interop.Pointer | interop.Reference<any>, type: MTLDataType, range: NSRange): void;
}

declare class MTLFunctionDescriptor extends NSObject implements NSCopying {

	static alloc(): MTLFunctionDescriptor; // inherited from NSObject

	static functionDescriptor(): MTLFunctionDescriptor;

	static new(): MTLFunctionDescriptor; // inherited from NSObject

	binaryArchives: NSArray<MTLBinaryArchive>;

	constantValues: MTLFunctionConstantValues;

	name: string;

	options: MTLFunctionOptions;

	specializedName: string;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

interface MTLFunctionHandle extends NSObjectProtocol {

	device: MTLDevice;

	functionType: MTLFunctionType;

	name: string;
}
declare var MTLFunctionHandle: {

	prototype: MTLFunctionHandle;
};

interface MTLFunctionLog extends NSObjectProtocol {

	debugLocation: MTLFunctionLogDebugLocation;

	encoderLabel: string;

	function: MTLFunction;

	type: MTLFunctionLogType;
}
declare var MTLFunctionLog: {

	prototype: MTLFunctionLog;
};

interface MTLFunctionLogDebugLocation extends NSObjectProtocol {

	URL: NSURL;

	column: number;

	functionName: string;

	line: number;
}
declare var MTLFunctionLogDebugLocation: {

	prototype: MTLFunctionLogDebugLocation;
};

declare const enum MTLFunctionLogType {

	Validation = 0
}

declare const enum MTLFunctionOptions {

	None = 0,

	CompileToBinary = 1,

	StoreFunctionInMetalScript = 2
}

interface MTLFunctionStitchingAttribute extends NSObjectProtocol {
}
declare var MTLFunctionStitchingAttribute: {

	prototype: MTLFunctionStitchingAttribute;
};

declare class MTLFunctionStitchingAttributeAlwaysInline extends NSObject implements MTLFunctionStitchingAttribute {

	static alloc(): MTLFunctionStitchingAttributeAlwaysInline; // inherited from NSObject

	static new(): MTLFunctionStitchingAttributeAlwaysInline; // inherited from NSObject

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

declare class MTLFunctionStitchingFunctionNode extends NSObject implements MTLFunctionStitchingNode {

	static alloc(): MTLFunctionStitchingFunctionNode; // inherited from NSObject

	static new(): MTLFunctionStitchingFunctionNode; // inherited from NSObject

	arguments: NSArray<MTLFunctionStitchingNode>;

	controlDependencies: NSArray<MTLFunctionStitchingFunctionNode>;

	name: string;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	constructor(o: { name: string; arguments: NSArray<MTLFunctionStitchingNode> | MTLFunctionStitchingNode[]; controlDependencies: NSArray<MTLFunctionStitchingFunctionNode> | MTLFunctionStitchingFunctionNode[]; });

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	initWithNameArgumentsControlDependencies(name: string, _arguments: NSArray<MTLFunctionStitchingNode> | MTLFunctionStitchingNode[], controlDependencies: NSArray<MTLFunctionStitchingFunctionNode> | MTLFunctionStitchingFunctionNode[]): this;

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

declare class MTLFunctionStitchingGraph extends NSObject implements NSCopying {

	static alloc(): MTLFunctionStitchingGraph; // inherited from NSObject

	static new(): MTLFunctionStitchingGraph; // inherited from NSObject

	attributes: NSArray<MTLFunctionStitchingAttribute>;

	functionName: string;

	nodes: NSArray<MTLFunctionStitchingFunctionNode>;

	outputNode: MTLFunctionStitchingFunctionNode;

	constructor(o: { functionName: string; nodes: NSArray<MTLFunctionStitchingFunctionNode> | MTLFunctionStitchingFunctionNode[]; outputNode: MTLFunctionStitchingFunctionNode; attributes: NSArray<MTLFunctionStitchingAttribute> | MTLFunctionStitchingAttribute[]; });

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	initWithFunctionNameNodesOutputNodeAttributes(functionName: string, nodes: NSArray<MTLFunctionStitchingFunctionNode> | MTLFunctionStitchingFunctionNode[], outputNode: MTLFunctionStitchingFunctionNode, attributes: NSArray<MTLFunctionStitchingAttribute> | MTLFunctionStitchingAttribute[]): this;
}

declare class MTLFunctionStitchingInputNode extends NSObject implements MTLFunctionStitchingNode {

	static alloc(): MTLFunctionStitchingInputNode; // inherited from NSObject

	static new(): MTLFunctionStitchingInputNode; // inherited from NSObject

	argumentIndex: number;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	constructor(o: { argumentIndex: number; });

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	initWithArgumentIndex(argument: number): this;

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

interface MTLFunctionStitchingNode extends NSCopying, NSObjectProtocol {
}
declare var MTLFunctionStitchingNode: {

	prototype: MTLFunctionStitchingNode;
};

declare const enum MTLFunctionType {

	Vertex = 1,

	Fragment = 2,

	Kernel = 3,

	Visible = 5,

	Intersection = 6,

	Mesh = 7,

	Object = 8
}

declare const enum MTLGPUFamily {

	Apple1 = 1001,

	Apple2 = 1002,

	Apple3 = 1003,

	Apple4 = 1004,

	Apple5 = 1005,

	Apple6 = 1006,

	Apple7 = 1007,

	Apple8 = 1008,

	Apple9 = 1009,

	Mac1 = 2001,

	Mac2 = 2002,

	Common1 = 3001,

	Common2 = 3002,

	Common3 = 3003,

	MacCatalyst1 = 4001,

	MacCatalyst2 = 4002,

	Metal3 = 5001
}

declare const enum MTLHazardTrackingMode {

	Default = 0,

	Untracked = 1,

	Tracked = 2
}

interface MTLHeap extends NSObjectProtocol {

	cpuCacheMode: MTLCPUCacheMode;

	currentAllocatedSize: number;

	device: MTLDevice;

	hazardTrackingMode: MTLHazardTrackingMode;

	label: string;

	resourceOptions: MTLResourceOptions;

	size: number;

	storageMode: MTLStorageMode;

	type: MTLHeapType;

	usedSize: number;

	maxAvailableSizeWithAlignment(alignment: number): number;

	newAccelerationStructureWithDescriptor(descriptor: MTLAccelerationStructureDescriptor): MTLAccelerationStructure;

	newAccelerationStructureWithDescriptorOffset(descriptor: MTLAccelerationStructureDescriptor, offset: number): MTLAccelerationStructure;

	newAccelerationStructureWithSize(size: number): MTLAccelerationStructure;

	newAccelerationStructureWithSizeOffset(size: number, offset: number): MTLAccelerationStructure;

	newBufferWithLengthOptions(length: number, options: MTLResourceOptions): MTLBuffer;

	newBufferWithLengthOptionsOffset(length: number, options: MTLResourceOptions, offset: number): MTLBuffer;

	newTextureWithDescriptor(descriptor: MTLTextureDescriptor): MTLTexture;

	newTextureWithDescriptorOffset(descriptor: MTLTextureDescriptor, offset: number): MTLTexture;

	setPurgeableState(state: MTLPurgeableState): MTLPurgeableState;
}
declare var MTLHeap: {

	prototype: MTLHeap;
};

declare class MTLHeapDescriptor extends NSObject implements NSCopying {

	static alloc(): MTLHeapDescriptor; // inherited from NSObject

	static new(): MTLHeapDescriptor; // inherited from NSObject

	cpuCacheMode: MTLCPUCacheMode;

	hazardTrackingMode: MTLHazardTrackingMode;

	resourceOptions: MTLResourceOptions;

	size: number;

	sparsePageSize: MTLSparsePageSize;

	storageMode: MTLStorageMode;

	type: MTLHeapType;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare const enum MTLHeapType {

	Automatic = 0,

	Placement = 1,

	Sparse = 2
}

declare const enum MTLIndexType {

	UInt16 = 0,

	UInt32 = 1
}

interface MTLIndirectAccelerationStructureMotionInstanceDescriptor {
	options: MTLAccelerationStructureInstanceOptions;
	mask: number;
	intersectionFunctionTableOffset: number;
	userID: number;
	accelerationStructureID: MTLResourceID;
	motionTransformsStartIndex: number;
	motionTransformsCount: number;
	motionStartBorderMode: MTLMotionBorderMode;
	motionEndBorderMode: MTLMotionBorderMode;
	motionStartTime: number;
	motionEndTime: number;
}
declare var MTLIndirectAccelerationStructureMotionInstanceDescriptor: interop.StructType<MTLIndirectAccelerationStructureMotionInstanceDescriptor>;

interface MTLIndirectCommandBuffer extends MTLResource {

	gpuResourceID: MTLResourceID;

	size: number;

	indirectComputeCommandAtIndex(commandIndex: number): MTLIndirectComputeCommand;

	indirectRenderCommandAtIndex(commandIndex: number): MTLIndirectRenderCommand;

	resetWithRange(range: NSRange): void;
}
declare var MTLIndirectCommandBuffer: {

	prototype: MTLIndirectCommandBuffer;
};

declare class MTLIndirectCommandBufferDescriptor extends NSObject implements NSCopying {

	static alloc(): MTLIndirectCommandBufferDescriptor; // inherited from NSObject

	static new(): MTLIndirectCommandBufferDescriptor; // inherited from NSObject

	commandTypes: MTLIndirectCommandType;

	inheritBuffers: boolean;

	inheritPipelineState: boolean;

	maxFragmentBufferBindCount: number;

	maxKernelBufferBindCount: number;

	maxKernelThreadgroupMemoryBindCount: number;

	maxMeshBufferBindCount: number;

	maxObjectBufferBindCount: number;

	maxObjectThreadgroupMemoryBindCount: number;

	maxVertexBufferBindCount: number;

	supportDynamicAttributeStride: boolean;

	supportRayTracing: boolean;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

interface MTLIndirectCommandBufferExecutionRange {
	location: number;
	length: number;
}
declare var MTLIndirectCommandBufferExecutionRange: interop.StructType<MTLIndirectCommandBufferExecutionRange>;

declare const enum MTLIndirectCommandType {

	Draw = 1,

	DrawIndexed = 2,

	DrawPatches = 4,

	DrawIndexedPatches = 8,

	ConcurrentDispatch = 32,

	ConcurrentDispatchThreads = 64,

	DrawMeshThreadgroups = 128,

	DrawMeshThreads = 256
}

interface MTLIndirectComputeCommand extends NSObjectProtocol {

	clearBarrier(): void;

	concurrentDispatchThreadgroupsThreadsPerThreadgroup(threadgroupsPerGrid: MTLSize, threadsPerThreadgroup: MTLSize): void;

	concurrentDispatchThreadsThreadsPerThreadgroup(threadsPerGrid: MTLSize, threadsPerThreadgroup: MTLSize): void;

	reset(): void;

	setBarrier(): void;

	setComputePipelineState(pipelineState: MTLComputePipelineState): void;

	setImageblockWidthHeight(width: number, height: number): void;

	setKernelBufferOffsetAtIndex(buffer: MTLBuffer, offset: number, index: number): void;

	setKernelBufferOffsetAttributeStrideAtIndex(buffer: MTLBuffer, offset: number, stride: number, index: number): void;

	setStageInRegion(region: MTLRegion): void;

	setThreadgroupMemoryLengthAtIndex(length: number, index: number): void;
}
declare var MTLIndirectComputeCommand: {

	prototype: MTLIndirectComputeCommand;
};

declare class MTLIndirectInstanceAccelerationStructureDescriptor extends MTLAccelerationStructureDescriptor {

	static alloc(): MTLIndirectInstanceAccelerationStructureDescriptor; // inherited from NSObject

	static descriptor(): MTLIndirectInstanceAccelerationStructureDescriptor;

	static new(): MTLIndirectInstanceAccelerationStructureDescriptor; // inherited from NSObject

	instanceCountBuffer: MTLBuffer;

	instanceCountBufferOffset: number;

	instanceDescriptorBuffer: MTLBuffer;

	instanceDescriptorBufferOffset: number;

	instanceDescriptorStride: number;

	instanceDescriptorType: MTLAccelerationStructureInstanceDescriptorType;

	maxInstanceCount: number;

	maxMotionTransformCount: number;

	motionTransformBuffer: MTLBuffer;

	motionTransformBufferOffset: number;

	motionTransformCountBuffer: MTLBuffer;

	motionTransformCountBufferOffset: number;
}

interface MTLIndirectRenderCommand extends NSObjectProtocol {

	clearBarrier(): void;

	drawIndexedPatchesPatchStartPatchCountPatchIndexBufferPatchIndexBufferOffsetControlPointIndexBufferControlPointIndexBufferOffsetInstanceCountBaseInstanceTessellationFactorBufferTessellationFactorBufferOffsetTessellationFactorBufferInstanceStride(numberOfPatchControlPoints: number, patchStart: number, patchCount: number, patchIndexBuffer: MTLBuffer, patchIndexBufferOffset: number, controlPointIndexBuffer: MTLBuffer, controlPointIndexBufferOffset: number, instanceCount: number, baseInstance: number, buffer: MTLBuffer, offset: number, instanceStride: number): void;

	drawIndexedPrimitivesIndexCountIndexTypeIndexBufferIndexBufferOffsetInstanceCountBaseVertexBaseInstance(primitiveType: MTLPrimitiveType, indexCount: number, indexType: MTLIndexType, indexBuffer: MTLBuffer, indexBufferOffset: number, instanceCount: number, baseVertex: number, baseInstance: number): void;

	drawMeshThreadgroupsThreadsPerObjectThreadgroupThreadsPerMeshThreadgroup(threadgroupsPerGrid: MTLSize, threadsPerObjectThreadgroup: MTLSize, threadsPerMeshThreadgroup: MTLSize): void;

	drawMeshThreadsThreadsPerObjectThreadgroupThreadsPerMeshThreadgroup(threadsPerGrid: MTLSize, threadsPerObjectThreadgroup: MTLSize, threadsPerMeshThreadgroup: MTLSize): void;

	drawPatchesPatchStartPatchCountPatchIndexBufferPatchIndexBufferOffsetInstanceCountBaseInstanceTessellationFactorBufferTessellationFactorBufferOffsetTessellationFactorBufferInstanceStride(numberOfPatchControlPoints: number, patchStart: number, patchCount: number, patchIndexBuffer: MTLBuffer, patchIndexBufferOffset: number, instanceCount: number, baseInstance: number, buffer: MTLBuffer, offset: number, instanceStride: number): void;

	drawPrimitivesVertexStartVertexCountInstanceCountBaseInstance(primitiveType: MTLPrimitiveType, vertexStart: number, vertexCount: number, instanceCount: number, baseInstance: number): void;

	reset(): void;

	setBarrier(): void;

	setFragmentBufferOffsetAtIndex(buffer: MTLBuffer, offset: number, index: number): void;

	setMeshBufferOffsetAtIndex(buffer: MTLBuffer, offset: number, index: number): void;

	setObjectBufferOffsetAtIndex(buffer: MTLBuffer, offset: number, index: number): void;

	setObjectThreadgroupMemoryLengthAtIndex(length: number, index: number): void;

	setRenderPipelineState(pipelineState: MTLRenderPipelineState): void;

	setVertexBufferOffsetAtIndex(buffer: MTLBuffer, offset: number, index: number): void;

	setVertexBufferOffsetAttributeStrideAtIndex(buffer: MTLBuffer, offset: number, stride: number, index: number): void;
}
declare var MTLIndirectRenderCommand: {

	prototype: MTLIndirectRenderCommand;
};

declare class MTLInstanceAccelerationStructureDescriptor extends MTLAccelerationStructureDescriptor {

	static alloc(): MTLInstanceAccelerationStructureDescriptor; // inherited from NSObject

	static descriptor(): MTLInstanceAccelerationStructureDescriptor;

	static new(): MTLInstanceAccelerationStructureDescriptor; // inherited from NSObject

	instanceCount: number;

	instanceDescriptorBuffer: MTLBuffer;

	instanceDescriptorBufferOffset: number;

	instanceDescriptorStride: number;

	instanceDescriptorType: MTLAccelerationStructureInstanceDescriptorType;

	instancedAccelerationStructures: NSArray<MTLAccelerationStructure>;

	motionTransformBuffer: MTLBuffer;

	motionTransformBufferOffset: number;

	motionTransformCount: number;
}

declare class MTLIntersectionFunctionDescriptor extends MTLFunctionDescriptor implements NSCopying {

	static alloc(): MTLIntersectionFunctionDescriptor; // inherited from NSObject

	static new(): MTLIntersectionFunctionDescriptor; // inherited from NSObject

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare const enum MTLIntersectionFunctionSignature {

	None = 0,

	Instancing = 1,

	TriangleData = 2,

	WorldSpaceData = 4,

	InstanceMotion = 8,

	PrimitiveMotion = 16,

	ExtendedLimits = 32,

	MaxLevels = 64,

	CurveData = 128
}

interface MTLIntersectionFunctionTable extends MTLResource {

	gpuResourceID: MTLResourceID;

	setBufferOffsetAtIndex(buffer: MTLBuffer, offset: number, index: number): void;

	setBuffersOffsetsWithRange(buffers: interop.Reference<MTLBuffer>, offsets: interop.Reference<number>, range: NSRange): void;

	setFunctionAtIndex(_function: MTLFunctionHandle, index: number): void;

	setFunctionsWithRange(functions: interop.Reference<MTLFunctionHandle>, range: NSRange): void;

	setOpaqueCurveIntersectionFunctionWithSignatureAtIndex(signature: MTLIntersectionFunctionSignature, index: number): void;

	setOpaqueCurveIntersectionFunctionWithSignatureWithRange(signature: MTLIntersectionFunctionSignature, range: NSRange): void;

	setOpaqueTriangleIntersectionFunctionWithSignatureAtIndex(signature: MTLIntersectionFunctionSignature, index: number): void;

	setOpaqueTriangleIntersectionFunctionWithSignatureWithRange(signature: MTLIntersectionFunctionSignature, range: NSRange): void;

	setVisibleFunctionTableAtBufferIndex(functionTable: MTLVisibleFunctionTable, bufferIndex: number): void;

	setVisibleFunctionTablesWithBufferRange(functionTables: interop.Reference<MTLVisibleFunctionTable>, bufferRange: NSRange): void;
}
declare var MTLIntersectionFunctionTable: {

	prototype: MTLIntersectionFunctionTable;
};

declare class MTLIntersectionFunctionTableDescriptor extends NSObject implements NSCopying {

	static alloc(): MTLIntersectionFunctionTableDescriptor; // inherited from NSObject

	static intersectionFunctionTableDescriptor(): MTLIntersectionFunctionTableDescriptor;

	static new(): MTLIntersectionFunctionTableDescriptor; // inherited from NSObject

	functionCount: number;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare const enum MTLLanguageVersion {

	Version1_0 = 65536,

	Version1_1 = 65537,

	Version1_2 = 65538,

	Version2_0 = 131072,

	Version2_1 = 131073,

	Version2_2 = 131074,

	Version2_3 = 131075,

	Version2_4 = 131076,

	Version3_0 = 196608,

	Version3_1 = 196609
}

interface MTLLibrary extends NSObjectProtocol {

	device: MTLDevice;

	functionNames: NSArray<string>;

	installName: string;

	label: string;

	type: MTLLibraryType;

	newFunctionWithDescriptorCompletionHandler(descriptor: MTLFunctionDescriptor, completionHandler: (p1: MTLFunction, p2: NSError) => void): void;

	newFunctionWithDescriptorError(descriptor: MTLFunctionDescriptor): MTLFunction;

	newFunctionWithName(functionName: string): MTLFunction;

	newFunctionWithNameConstantValuesCompletionHandler(name: string, constantValues: MTLFunctionConstantValues, completionHandler: (p1: MTLFunction, p2: NSError) => void): void;

	newFunctionWithNameConstantValuesError(name: string, constantValues: MTLFunctionConstantValues): MTLFunction;

	newIntersectionFunctionWithDescriptorCompletionHandler(descriptor: MTLIntersectionFunctionDescriptor, completionHandler: (p1: MTLFunction, p2: NSError) => void): void;

	newIntersectionFunctionWithDescriptorError(descriptor: MTLIntersectionFunctionDescriptor): MTLFunction;
}
declare var MTLLibrary: {

	prototype: MTLLibrary;
};

declare const enum MTLLibraryError {

	Unsupported = 1,

	Internal = 2,

	CompileFailure = 3,

	CompileWarning = 4,

	FunctionNotFound = 5,

	FileNotFound = 6
}

declare var MTLLibraryErrorDomain: string;

declare const enum MTLLibraryOptimizationLevel {

	Default = 0,

	Size = 1
}

declare const enum MTLLibraryType {

	Executable = 0,

	Dynamic = 1
}

declare class MTLLinkedFunctions extends NSObject implements NSCopying {

	static alloc(): MTLLinkedFunctions; // inherited from NSObject

	static linkedFunctions(): MTLLinkedFunctions;

	static new(): MTLLinkedFunctions; // inherited from NSObject

	binaryFunctions: NSArray<MTLFunction>;

	functions: NSArray<MTLFunction>;

	groups: NSDictionary<string, NSArray<MTLFunction>>;

	privateFunctions: NSArray<MTLFunction>;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare const enum MTLLoadAction {

	DontCare = 0,

	Load = 1,

	Clear = 2
}

interface MTLLogContainer extends NSFastEnumeration {
}
declare var MTLLogContainer: {

	prototype: MTLLogContainer;
};

interface MTLMapIndirectArguments {
	regionOriginX: number;
	regionOriginY: number;
	regionOriginZ: number;
	regionSizeWidth: number;
	regionSizeHeight: number;
	regionSizeDepth: number;
	mipMapLevel: number;
	sliceId: number;
}
declare var MTLMapIndirectArguments: interop.StructType<MTLMapIndirectArguments>;

declare class MTLMeshRenderPipelineDescriptor extends NSObject implements NSCopying {

	static alloc(): MTLMeshRenderPipelineDescriptor; // inherited from NSObject

	static new(): MTLMeshRenderPipelineDescriptor; // inherited from NSObject

	alphaToCoverageEnabled: boolean;

	alphaToOneEnabled: boolean;

	readonly colorAttachments: MTLRenderPipelineColorAttachmentDescriptorArray;

	depthAttachmentPixelFormat: MTLPixelFormat;

	readonly fragmentBuffers: MTLPipelineBufferDescriptorArray;

	fragmentFunction: MTLFunction;

	fragmentLinkedFunctions: MTLLinkedFunctions;

	label: string;

	maxTotalThreadgroupsPerMeshGrid: number;

	maxTotalThreadsPerMeshThreadgroup: number;

	maxTotalThreadsPerObjectThreadgroup: number;

	maxVertexAmplificationCount: number;

	readonly meshBuffers: MTLPipelineBufferDescriptorArray;

	meshFunction: MTLFunction;

	meshLinkedFunctions: MTLLinkedFunctions;

	meshThreadgroupSizeIsMultipleOfThreadExecutionWidth: boolean;

	readonly objectBuffers: MTLPipelineBufferDescriptorArray;

	objectFunction: MTLFunction;

	objectLinkedFunctions: MTLLinkedFunctions;

	objectThreadgroupSizeIsMultipleOfThreadExecutionWidth: boolean;

	payloadMemoryLength: number;

	rasterSampleCount: number;

	rasterizationEnabled: boolean;

	stencilAttachmentPixelFormat: MTLPixelFormat;

	supportIndirectCommandBuffers: boolean;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	reset(): void;
}

declare const enum MTLMotionBorderMode {

	Clamp = 0,

	Vanish = 1
}

declare class MTLMotionKeyframeData extends NSObject {

	static alloc(): MTLMotionKeyframeData; // inherited from NSObject

	static data(): MTLMotionKeyframeData;

	static new(): MTLMotionKeyframeData; // inherited from NSObject

	buffer: MTLBuffer;

	offset: number;
}

declare const enum MTLMultisampleDepthResolveFilter {

	Sample0 = 0,

	Min = 1,

	Max = 2
}

declare const enum MTLMultisampleStencilResolveFilter {

	Sample0 = 0,

	DepthResolvedSample = 1
}

declare const enum MTLMutability {

	Default = 0,

	Mutable = 1,

	Immutable = 2
}

interface MTLObjectPayloadBinding extends MTLBinding {

	objectPayloadAlignment: number;

	objectPayloadDataSize: number;
}
declare var MTLObjectPayloadBinding: {

	prototype: MTLObjectPayloadBinding;
};

interface MTLOrigin {
	x: number;
	y: number;
	z: number;
}
declare var MTLOrigin: interop.StructType<MTLOrigin>;

interface MTLParallelRenderCommandEncoder extends MTLCommandEncoder {

	renderCommandEncoder(): MTLRenderCommandEncoder;

	setColorStoreActionAtIndex(storeAction: MTLStoreAction, colorAttachmentIndex: number): void;

	setColorStoreActionOptionsAtIndex(storeActionOptions: MTLStoreActionOptions, colorAttachmentIndex: number): void;

	setDepthStoreAction(storeAction: MTLStoreAction): void;

	setDepthStoreActionOptions(storeActionOptions: MTLStoreActionOptions): void;

	setStencilStoreAction(storeAction: MTLStoreAction): void;

	setStencilStoreActionOptions(storeActionOptions: MTLStoreActionOptions): void;
}
declare var MTLParallelRenderCommandEncoder: {

	prototype: MTLParallelRenderCommandEncoder;
};

declare const enum MTLPatchType {

	None = 0,

	Triangle = 1,

	Quad = 2
}

declare class MTLPipelineBufferDescriptor extends NSObject implements NSCopying {

	static alloc(): MTLPipelineBufferDescriptor; // inherited from NSObject

	static new(): MTLPipelineBufferDescriptor; // inherited from NSObject

	mutability: MTLMutability;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare class MTLPipelineBufferDescriptorArray extends NSObject {

	static alloc(): MTLPipelineBufferDescriptorArray; // inherited from NSObject

	static new(): MTLPipelineBufferDescriptorArray; // inherited from NSObject
	[index: number]: MTLPipelineBufferDescriptor;

	objectAtIndexedSubscript(bufferIndex: number): MTLPipelineBufferDescriptor;

	setObjectAtIndexedSubscript(buffer: MTLPipelineBufferDescriptor, bufferIndex: number): void;
}

declare const enum MTLPipelineOption {

	None = 0,

	ArgumentInfo = 1,

	BufferTypeInfo = 2,

	FailOnBinaryArchiveMiss = 4
}

declare const enum MTLPixelFormat {

	Invalid = 0,

	A8Unorm = 1,

	R8Unorm = 10,

	R8Unorm_sRGB = 11,

	R8Snorm = 12,

	R8Uint = 13,

	R8Sint = 14,

	R16Unorm = 20,

	R16Snorm = 22,

	R16Uint = 23,

	R16Sint = 24,

	R16Float = 25,

	RG8Unorm = 30,

	RG8Unorm_sRGB = 31,

	RG8Snorm = 32,

	RG8Uint = 33,

	RG8Sint = 34,

	B5G6R5Unorm = 40,

	A1BGR5Unorm = 41,

	ABGR4Unorm = 42,

	BGR5A1Unorm = 43,

	R32Uint = 53,

	R32Sint = 54,

	R32Float = 55,

	RG16Unorm = 60,

	RG16Snorm = 62,

	RG16Uint = 63,

	RG16Sint = 64,

	RG16Float = 65,

	RGBA8Unorm = 70,

	RGBA8Unorm_sRGB = 71,

	RGBA8Snorm = 72,

	RGBA8Uint = 73,

	RGBA8Sint = 74,

	BGRA8Unorm = 80,

	BGRA8Unorm_sRGB = 81,

	RGB10A2Unorm = 90,

	RGB10A2Uint = 91,

	RG11B10Float = 92,

	RGB9E5Float = 93,

	BGR10A2Unorm = 94,

	BGR10_XR = 554,

	BGR10_XR_sRGB = 555,

	RG32Uint = 103,

	RG32Sint = 104,

	RG32Float = 105,

	RGBA16Unorm = 110,

	RGBA16Snorm = 112,

	RGBA16Uint = 113,

	RGBA16Sint = 114,

	RGBA16Float = 115,

	BGRA10_XR = 552,

	BGRA10_XR_sRGB = 553,

	RGBA32Uint = 123,

	RGBA32Sint = 124,

	RGBA32Float = 125,

	BC1_RGBA = 130,

	BC1_RGBA_sRGB = 131,

	BC2_RGBA = 132,

	BC2_RGBA_sRGB = 133,

	BC3_RGBA = 134,

	BC3_RGBA_sRGB = 135,

	BC4_RUnorm = 140,

	BC4_RSnorm = 141,

	BC5_RGUnorm = 142,

	BC5_RGSnorm = 143,

	BC6H_RGBFloat = 150,

	BC6H_RGBUfloat = 151,

	BC7_RGBAUnorm = 152,

	BC7_RGBAUnorm_sRGB = 153,

	PVRTC_RGB_2BPP = 160,

	PVRTC_RGB_2BPP_sRGB = 161,

	PVRTC_RGB_4BPP = 162,

	PVRTC_RGB_4BPP_sRGB = 163,

	PVRTC_RGBA_2BPP = 164,

	PVRTC_RGBA_2BPP_sRGB = 165,

	PVRTC_RGBA_4BPP = 166,

	PVRTC_RGBA_4BPP_sRGB = 167,

	EAC_R11Unorm = 170,

	EAC_R11Snorm = 172,

	EAC_RG11Unorm = 174,

	EAC_RG11Snorm = 176,

	EAC_RGBA8 = 178,

	EAC_RGBA8_sRGB = 179,

	ETC2_RGB8 = 180,

	ETC2_RGB8_sRGB = 181,

	ETC2_RGB8A1 = 182,

	ETC2_RGB8A1_sRGB = 183,

	ASTC_4x4_sRGB = 186,

	ASTC_5x4_sRGB = 187,

	ASTC_5x5_sRGB = 188,

	ASTC_6x5_sRGB = 189,

	ASTC_6x6_sRGB = 190,

	ASTC_8x5_sRGB = 192,

	ASTC_8x6_sRGB = 193,

	ASTC_8x8_sRGB = 194,

	ASTC_10x5_sRGB = 195,

	ASTC_10x6_sRGB = 196,

	ASTC_10x8_sRGB = 197,

	ASTC_10x10_sRGB = 198,

	ASTC_12x10_sRGB = 199,

	ASTC_12x12_sRGB = 200,

	ASTC_4x4_LDR = 204,

	ASTC_5x4_LDR = 205,

	ASTC_5x5_LDR = 206,

	ASTC_6x5_LDR = 207,

	ASTC_6x6_LDR = 208,

	ASTC_8x5_LDR = 210,

	ASTC_8x6_LDR = 211,

	ASTC_8x8_LDR = 212,

	ASTC_10x5_LDR = 213,

	ASTC_10x6_LDR = 214,

	ASTC_10x8_LDR = 215,

	ASTC_10x10_LDR = 216,

	ASTC_12x10_LDR = 217,

	ASTC_12x12_LDR = 218,

	ASTC_4x4_HDR = 222,

	ASTC_5x4_HDR = 223,

	ASTC_5x5_HDR = 224,

	ASTC_6x5_HDR = 225,

	ASTC_6x6_HDR = 226,

	ASTC_8x5_HDR = 228,

	ASTC_8x6_HDR = 229,

	ASTC_8x8_HDR = 230,

	ASTC_10x5_HDR = 231,

	ASTC_10x6_HDR = 232,

	ASTC_10x8_HDR = 233,

	ASTC_10x10_HDR = 234,

	ASTC_12x10_HDR = 235,

	ASTC_12x12_HDR = 236,

	GBGR422 = 240,

	BGRG422 = 241,

	Depth16Unorm = 250,

	Depth32Float = 252,

	Stencil8 = 253,

	Depth24Unorm_Stencil8 = 255,

	Depth32Float_Stencil8 = 260,

	X32_Stencil8 = 261,

	X24_Stencil8 = 262
}

declare class MTLPointerType extends MTLType {

	static alloc(): MTLPointerType; // inherited from NSObject

	static new(): MTLPointerType; // inherited from NSObject

	readonly access: MTLBindingAccess;

	readonly alignment: number;

	readonly dataSize: number;

	readonly elementIsArgumentBuffer: boolean;

	readonly elementType: MTLDataType;

	elementArrayType(): MTLArrayType;

	elementStructType(): MTLStructType;
}

declare class MTLPrimitiveAccelerationStructureDescriptor extends MTLAccelerationStructureDescriptor {

	static alloc(): MTLPrimitiveAccelerationStructureDescriptor; // inherited from NSObject

	static descriptor(): MTLPrimitiveAccelerationStructureDescriptor;

	static new(): MTLPrimitiveAccelerationStructureDescriptor; // inherited from NSObject

	geometryDescriptors: NSArray<MTLAccelerationStructureGeometryDescriptor>;

	motionEndBorderMode: MTLMotionBorderMode;

	motionEndTime: number;

	motionKeyframeCount: number;

	motionStartBorderMode: MTLMotionBorderMode;

	motionStartTime: number;
}

declare const enum MTLPrimitiveTopologyClass {

	Unspecified = 0,

	Point = 1,

	Line = 2,

	Triangle = 3
}

declare const enum MTLPrimitiveType {

	Point = 0,

	Line = 1,

	LineStrip = 2,

	Triangle = 3,

	TriangleStrip = 4
}

declare const enum MTLPurgeableState {

	KeepCurrent = 1,

	NonVolatile = 2,

	Volatile = 3,

	Empty = 4
}

interface MTLQuadTessellationFactorsHalf {
	edgeTessellationFactor: interop.Reference<number>;
	insideTessellationFactor: interop.Reference<number>;
}
declare var MTLQuadTessellationFactorsHalf: interop.StructType<MTLQuadTessellationFactorsHalf>;

declare class MTLRasterizationRateLayerArray extends NSObject {

	static alloc(): MTLRasterizationRateLayerArray; // inherited from NSObject

	static new(): MTLRasterizationRateLayerArray; // inherited from NSObject
	[index: number]: MTLRasterizationRateLayerDescriptor;

	objectAtIndexedSubscript(layerIndex: number): MTLRasterizationRateLayerDescriptor;

	setObjectAtIndexedSubscript(layer: MTLRasterizationRateLayerDescriptor, layerIndex: number): void;
}

declare class MTLRasterizationRateLayerDescriptor extends NSObject implements NSCopying {

	static alloc(): MTLRasterizationRateLayerDescriptor; // inherited from NSObject

	static new(): MTLRasterizationRateLayerDescriptor; // inherited from NSObject

	readonly horizontal: MTLRasterizationRateSampleArray;

	readonly horizontalSampleStorage: interop.Pointer | interop.Reference<number>;

	readonly maxSampleCount: MTLSize;

	sampleCount: MTLSize;

	readonly vertical: MTLRasterizationRateSampleArray;

	readonly verticalSampleStorage: interop.Pointer | interop.Reference<number>;

	constructor(o: { sampleCount: MTLSize; });

	constructor(o: { sampleCount: MTLSize; horizontal: interop.Pointer | interop.Reference<number>; vertical: interop.Pointer | interop.Reference<number>; });

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	initWithSampleCount(sampleCount: MTLSize): this;

	initWithSampleCountHorizontalVertical(sampleCount: MTLSize, horizontal: interop.Pointer | interop.Reference<number>, vertical: interop.Pointer | interop.Reference<number>): this;
}

interface MTLRasterizationRateMap extends NSObjectProtocol {

	device: MTLDevice;

	label: string;

	layerCount: number;

	parameterBufferSizeAndAlign: MTLSizeAndAlign;

	physicalGranularity: MTLSize;

	screenSize: MTLSize;

	copyParameterDataToBufferOffset(buffer: MTLBuffer, offset: number): void;

	mapPhysicalToScreenCoordinatesForLayer(physicalCoordinates: MTLSamplePosition, layerIndex: number): MTLSamplePosition;

	mapScreenToPhysicalCoordinatesForLayer(screenCoordinates: MTLSamplePosition, layerIndex: number): MTLSamplePosition;

	physicalSizeForLayer(layerIndex: number): MTLSize;
}
declare var MTLRasterizationRateMap: {

	prototype: MTLRasterizationRateMap;
};

declare class MTLRasterizationRateMapDescriptor extends NSObject implements NSCopying {

	static alloc(): MTLRasterizationRateMapDescriptor; // inherited from NSObject

	static new(): MTLRasterizationRateMapDescriptor; // inherited from NSObject

	static rasterizationRateMapDescriptorWithScreenSize(screenSize: MTLSize): MTLRasterizationRateMapDescriptor;

	static rasterizationRateMapDescriptorWithScreenSizeLayer(screenSize: MTLSize, layer: MTLRasterizationRateLayerDescriptor): MTLRasterizationRateMapDescriptor;

	static rasterizationRateMapDescriptorWithScreenSizeLayerCountLayers(screenSize: MTLSize, layerCount: number, layers: interop.Pointer | interop.Reference<MTLRasterizationRateLayerDescriptor>): MTLRasterizationRateMapDescriptor;

	label: string;

	readonly layerCount: number;

	readonly layers: MTLRasterizationRateLayerArray;

	screenSize: MTLSize;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	layerAtIndex(layerIndex: number): MTLRasterizationRateLayerDescriptor;

	setLayerAtIndex(layer: MTLRasterizationRateLayerDescriptor, layerIndex: number): void;
}

declare class MTLRasterizationRateSampleArray extends NSObject {

	static alloc(): MTLRasterizationRateSampleArray; // inherited from NSObject

	static new(): MTLRasterizationRateSampleArray; // inherited from NSObject
	[index: number]: number;

	objectAtIndexedSubscript(index: number): number;

	setObjectAtIndexedSubscript(value: number, index: number): void;
}

declare const enum MTLReadWriteTextureTier {

	TierNone = 0,

	Tier1 = 1,

	Tier2 = 2
}

interface MTLRegion {
	origin: MTLOrigin;
	size: MTLSize;
}
declare var MTLRegion: interop.StructType<MTLRegion>;

interface MTLRenderCommandEncoder extends MTLCommandEncoder {

	tileHeight: number;

	tileWidth: number;

	dispatchThreadsPerTile(threadsPerTile: MTLSize): void;

	drawIndexedPatchesPatchIndexBufferPatchIndexBufferOffsetControlPointIndexBufferControlPointIndexBufferOffsetIndirectBufferIndirectBufferOffset(numberOfPatchControlPoints: number, patchIndexBuffer: MTLBuffer, patchIndexBufferOffset: number, controlPointIndexBuffer: MTLBuffer, controlPointIndexBufferOffset: number, indirectBuffer: MTLBuffer, indirectBufferOffset: number): void;

	drawIndexedPatchesPatchStartPatchCountPatchIndexBufferPatchIndexBufferOffsetControlPointIndexBufferControlPointIndexBufferOffsetInstanceCountBaseInstance(numberOfPatchControlPoints: number, patchStart: number, patchCount: number, patchIndexBuffer: MTLBuffer, patchIndexBufferOffset: number, controlPointIndexBuffer: MTLBuffer, controlPointIndexBufferOffset: number, instanceCount: number, baseInstance: number): void;

	drawIndexedPrimitivesIndexCountIndexTypeIndexBufferIndexBufferOffset(primitiveType: MTLPrimitiveType, indexCount: number, indexType: MTLIndexType, indexBuffer: MTLBuffer, indexBufferOffset: number): void;

	drawIndexedPrimitivesIndexCountIndexTypeIndexBufferIndexBufferOffsetInstanceCount(primitiveType: MTLPrimitiveType, indexCount: number, indexType: MTLIndexType, indexBuffer: MTLBuffer, indexBufferOffset: number, instanceCount: number): void;

	drawIndexedPrimitivesIndexCountIndexTypeIndexBufferIndexBufferOffsetInstanceCountBaseVertexBaseInstance(primitiveType: MTLPrimitiveType, indexCount: number, indexType: MTLIndexType, indexBuffer: MTLBuffer, indexBufferOffset: number, instanceCount: number, baseVertex: number, baseInstance: number): void;

	drawIndexedPrimitivesIndexTypeIndexBufferIndexBufferOffsetIndirectBufferIndirectBufferOffset(primitiveType: MTLPrimitiveType, indexType: MTLIndexType, indexBuffer: MTLBuffer, indexBufferOffset: number, indirectBuffer: MTLBuffer, indirectBufferOffset: number): void;

	drawMeshThreadgroupsThreadsPerObjectThreadgroupThreadsPerMeshThreadgroup(threadgroupsPerGrid: MTLSize, threadsPerObjectThreadgroup: MTLSize, threadsPerMeshThreadgroup: MTLSize): void;

	drawMeshThreadgroupsWithIndirectBufferIndirectBufferOffsetThreadsPerObjectThreadgroupThreadsPerMeshThreadgroup(indirectBuffer: MTLBuffer, indirectBufferOffset: number, threadsPerObjectThreadgroup: MTLSize, threadsPerMeshThreadgroup: MTLSize): void;

	drawMeshThreadsThreadsPerObjectThreadgroupThreadsPerMeshThreadgroup(threadsPerGrid: MTLSize, threadsPerObjectThreadgroup: MTLSize, threadsPerMeshThreadgroup: MTLSize): void;

	drawPatchesPatchIndexBufferPatchIndexBufferOffsetIndirectBufferIndirectBufferOffset(numberOfPatchControlPoints: number, patchIndexBuffer: MTLBuffer, patchIndexBufferOffset: number, indirectBuffer: MTLBuffer, indirectBufferOffset: number): void;

	drawPatchesPatchStartPatchCountPatchIndexBufferPatchIndexBufferOffsetInstanceCountBaseInstance(numberOfPatchControlPoints: number, patchStart: number, patchCount: number, patchIndexBuffer: MTLBuffer, patchIndexBufferOffset: number, instanceCount: number, baseInstance: number): void;

	drawPrimitivesIndirectBufferIndirectBufferOffset(primitiveType: MTLPrimitiveType, indirectBuffer: MTLBuffer, indirectBufferOffset: number): void;

	drawPrimitivesVertexStartVertexCount(primitiveType: MTLPrimitiveType, vertexStart: number, vertexCount: number): void;

	drawPrimitivesVertexStartVertexCountInstanceCount(primitiveType: MTLPrimitiveType, vertexStart: number, vertexCount: number, instanceCount: number): void;

	drawPrimitivesVertexStartVertexCountInstanceCountBaseInstance(primitiveType: MTLPrimitiveType, vertexStart: number, vertexCount: number, instanceCount: number, baseInstance: number): void;

	executeCommandsInBufferIndirectBufferIndirectBufferOffset(indirectCommandbuffer: MTLIndirectCommandBuffer, indirectRangeBuffer: MTLBuffer, indirectBufferOffset: number): void;

	executeCommandsInBufferWithRange(indirectCommandBuffer: MTLIndirectCommandBuffer, executionRange: NSRange): void;

	memoryBarrierWithResourcesCountAfterStagesBeforeStages(resources: interop.Reference<MTLResource>, count: number, after: MTLRenderStages, before: MTLRenderStages): void;

	memoryBarrierWithScopeAfterStagesBeforeStages(scope: MTLBarrierScope, after: MTLRenderStages, before: MTLRenderStages): void;

	sampleCountersInBufferAtSampleIndexWithBarrier(sampleBuffer: MTLCounterSampleBuffer, sampleIndex: number, barrier: boolean): void;

	setBlendColorRedGreenBlueAlpha(red: number, green: number, blue: number, alpha: number): void;

	setColorStoreActionAtIndex(storeAction: MTLStoreAction, colorAttachmentIndex: number): void;

	setColorStoreActionOptionsAtIndex(storeActionOptions: MTLStoreActionOptions, colorAttachmentIndex: number): void;

	setCullMode(cullMode: MTLCullMode): void;

	setDepthBiasSlopeScaleClamp(depthBias: number, slopeScale: number, clamp: number): void;

	setDepthClipMode(depthClipMode: MTLDepthClipMode): void;

	setDepthStencilState(depthStencilState: MTLDepthStencilState): void;

	setDepthStoreAction(storeAction: MTLStoreAction): void;

	setDepthStoreActionOptions(storeActionOptions: MTLStoreActionOptions): void;

	setFragmentAccelerationStructureAtBufferIndex(accelerationStructure: MTLAccelerationStructure, bufferIndex: number): void;

	setFragmentBufferOffsetAtIndex(buffer: MTLBuffer, offset: number, index: number): void;

	setFragmentBufferOffsetAtIndex(offset: number, index: number): void;

	setFragmentBuffersOffsetsWithRange(buffers: interop.Reference<MTLBuffer>, offsets: interop.Reference<number>, range: NSRange): void;

	setFragmentBytesLengthAtIndex(bytes: interop.Pointer | interop.Reference<any>, length: number, index: number): void;

	setFragmentIntersectionFunctionTableAtBufferIndex(intersectionFunctionTable: MTLIntersectionFunctionTable, bufferIndex: number): void;

	setFragmentIntersectionFunctionTablesWithBufferRange(intersectionFunctionTables: interop.Reference<MTLIntersectionFunctionTable>, range: NSRange): void;

	setFragmentSamplerStateAtIndex(sampler: MTLSamplerState, index: number): void;

	setFragmentSamplerStateLodMinClampLodMaxClampAtIndex(sampler: MTLSamplerState, lodMinClamp: number, lodMaxClamp: number, index: number): void;

	setFragmentSamplerStatesLodMinClampsLodMaxClampsWithRange(samplers: interop.Reference<MTLSamplerState>, lodMinClamps: interop.Reference<number>, lodMaxClamps: interop.Reference<number>, range: NSRange): void;

	setFragmentSamplerStatesWithRange(samplers: interop.Reference<MTLSamplerState>, range: NSRange): void;

	setFragmentTextureAtIndex(texture: MTLTexture, index: number): void;

	setFragmentTexturesWithRange(textures: interop.Reference<MTLTexture>, range: NSRange): void;

	setFragmentVisibleFunctionTableAtBufferIndex(functionTable: MTLVisibleFunctionTable, bufferIndex: number): void;

	setFragmentVisibleFunctionTablesWithBufferRange(functionTables: interop.Reference<MTLVisibleFunctionTable>, range: NSRange): void;

	setFrontFacingWinding(frontFacingWinding: MTLWinding): void;

	setMeshBufferOffsetAtIndex(offset: number, index: number): void;

	setMeshBufferOffsetAtIndex(buffer: MTLBuffer, offset: number, index: number): void;

	setMeshBuffersOffsetsWithRange(buffers: interop.Reference<MTLBuffer>, offsets: interop.Reference<number>, range: NSRange): void;

	setMeshBytesLengthAtIndex(bytes: interop.Pointer | interop.Reference<any>, length: number, index: number): void;

	setMeshSamplerStateAtIndex(sampler: MTLSamplerState, index: number): void;

	setMeshSamplerStateLodMinClampLodMaxClampAtIndex(sampler: MTLSamplerState, lodMinClamp: number, lodMaxClamp: number, index: number): void;

	setMeshSamplerStatesLodMinClampsLodMaxClampsWithRange(samplers: interop.Reference<MTLSamplerState>, lodMinClamps: interop.Reference<number>, lodMaxClamps: interop.Reference<number>, range: NSRange): void;

	setMeshSamplerStatesWithRange(samplers: interop.Reference<MTLSamplerState>, range: NSRange): void;

	setMeshTextureAtIndex(texture: MTLTexture, index: number): void;

	setMeshTexturesWithRange(textures: interop.Reference<MTLTexture>, range: NSRange): void;

	setObjectBufferOffsetAtIndex(buffer: MTLBuffer, offset: number, index: number): void;

	setObjectBufferOffsetAtIndex(offset: number, index: number): void;

	setObjectBuffersOffsetsWithRange(buffers: interop.Reference<MTLBuffer>, offsets: interop.Reference<number>, range: NSRange): void;

	setObjectBytesLengthAtIndex(bytes: interop.Pointer | interop.Reference<any>, length: number, index: number): void;

	setObjectSamplerStateAtIndex(sampler: MTLSamplerState, index: number): void;

	setObjectSamplerStateLodMinClampLodMaxClampAtIndex(sampler: MTLSamplerState, lodMinClamp: number, lodMaxClamp: number, index: number): void;

	setObjectSamplerStatesLodMinClampsLodMaxClampsWithRange(samplers: interop.Reference<MTLSamplerState>, lodMinClamps: interop.Reference<number>, lodMaxClamps: interop.Reference<number>, range: NSRange): void;

	setObjectSamplerStatesWithRange(samplers: interop.Reference<MTLSamplerState>, range: NSRange): void;

	setObjectTextureAtIndex(texture: MTLTexture, index: number): void;

	setObjectTexturesWithRange(textures: interop.Reference<MTLTexture>, range: NSRange): void;

	setObjectThreadgroupMemoryLengthAtIndex(length: number, index: number): void;

	setRenderPipelineState(pipelineState: MTLRenderPipelineState): void;

	setScissorRect(rect: MTLScissorRect): void;

	setScissorRectsCount(scissorRects: interop.Reference<MTLScissorRect>, count: number): void;

	setStencilFrontReferenceValueBackReferenceValue(frontReferenceValue: number, backReferenceValue: number): void;

	setStencilReferenceValue(referenceValue: number): void;

	setStencilStoreAction(storeAction: MTLStoreAction): void;

	setStencilStoreActionOptions(storeActionOptions: MTLStoreActionOptions): void;

	setTessellationFactorBufferOffsetInstanceStride(buffer: MTLBuffer, offset: number, instanceStride: number): void;

	setTessellationFactorScale(scale: number): void;

	setThreadgroupMemoryLengthOffsetAtIndex(length: number, offset: number, index: number): void;

	setTileAccelerationStructureAtBufferIndex(accelerationStructure: MTLAccelerationStructure, bufferIndex: number): void;

	setTileBufferOffsetAtIndex(buffer: MTLBuffer, offset: number, index: number): void;

	setTileBufferOffsetAtIndex(offset: number, index: number): void;

	setTileBuffersOffsetsWithRange(buffers: interop.Reference<MTLBuffer>, offsets: interop.Reference<number>, range: NSRange): void;

	setTileBytesLengthAtIndex(bytes: interop.Pointer | interop.Reference<any>, length: number, index: number): void;

	setTileIntersectionFunctionTableAtBufferIndex(intersectionFunctionTable: MTLIntersectionFunctionTable, bufferIndex: number): void;

	setTileIntersectionFunctionTablesWithBufferRange(intersectionFunctionTables: interop.Reference<MTLIntersectionFunctionTable>, range: NSRange): void;

	setTileSamplerStateAtIndex(sampler: MTLSamplerState, index: number): void;

	setTileSamplerStateLodMinClampLodMaxClampAtIndex(sampler: MTLSamplerState, lodMinClamp: number, lodMaxClamp: number, index: number): void;

	setTileSamplerStatesLodMinClampsLodMaxClampsWithRange(samplers: interop.Reference<MTLSamplerState>, lodMinClamps: interop.Reference<number>, lodMaxClamps: interop.Reference<number>, range: NSRange): void;

	setTileSamplerStatesWithRange(samplers: interop.Reference<MTLSamplerState>, range: NSRange): void;

	setTileTextureAtIndex(texture: MTLTexture, index: number): void;

	setTileTexturesWithRange(textures: interop.Reference<MTLTexture>, range: NSRange): void;

	setTileVisibleFunctionTableAtBufferIndex(functionTable: MTLVisibleFunctionTable, bufferIndex: number): void;

	setTileVisibleFunctionTablesWithBufferRange(functionTables: interop.Reference<MTLVisibleFunctionTable>, range: NSRange): void;

	setTriangleFillMode(fillMode: MTLTriangleFillMode): void;

	setVertexAccelerationStructureAtBufferIndex(accelerationStructure: MTLAccelerationStructure, bufferIndex: number): void;

	setVertexAmplificationCountViewMappings(count: number, viewMappings: interop.Pointer | interop.Reference<MTLVertexAmplificationViewMapping>): void;

	setVertexBufferOffsetAtIndex(buffer: MTLBuffer, offset: number, index: number): void;

	setVertexBufferOffsetAtIndex(offset: number, index: number): void;

	setVertexBufferOffsetAttributeStrideAtIndex(buffer: MTLBuffer, offset: number, stride: number, index: number): void;

	setVertexBufferOffsetAttributeStrideAtIndex(offset: number, stride: number, index: number): void;

	setVertexBuffersOffsetsAttributeStridesWithRange(buffers: interop.Reference<MTLBuffer>, offsets: interop.Reference<number>, strides: interop.Reference<number>, range: NSRange): void;

	setVertexBuffersOffsetsWithRange(buffers: interop.Reference<MTLBuffer>, offsets: interop.Reference<number>, range: NSRange): void;

	setVertexBytesLengthAtIndex(bytes: interop.Pointer | interop.Reference<any>, length: number, index: number): void;

	setVertexBytesLengthAttributeStrideAtIndex(bytes: interop.Pointer | interop.Reference<any>, length: number, stride: number, index: number): void;

	setVertexIntersectionFunctionTableAtBufferIndex(intersectionFunctionTable: MTLIntersectionFunctionTable, bufferIndex: number): void;

	setVertexIntersectionFunctionTablesWithBufferRange(intersectionFunctionTables: interop.Reference<MTLIntersectionFunctionTable>, range: NSRange): void;

	setVertexSamplerStateAtIndex(sampler: MTLSamplerState, index: number): void;

	setVertexSamplerStateLodMinClampLodMaxClampAtIndex(sampler: MTLSamplerState, lodMinClamp: number, lodMaxClamp: number, index: number): void;

	setVertexSamplerStatesLodMinClampsLodMaxClampsWithRange(samplers: interop.Reference<MTLSamplerState>, lodMinClamps: interop.Reference<number>, lodMaxClamps: interop.Reference<number>, range: NSRange): void;

	setVertexSamplerStatesWithRange(samplers: interop.Reference<MTLSamplerState>, range: NSRange): void;

	setVertexTextureAtIndex(texture: MTLTexture, index: number): void;

	setVertexTexturesWithRange(textures: interop.Reference<MTLTexture>, range: NSRange): void;

	setVertexVisibleFunctionTableAtBufferIndex(functionTable: MTLVisibleFunctionTable, bufferIndex: number): void;

	setVertexVisibleFunctionTablesWithBufferRange(functionTables: interop.Reference<MTLVisibleFunctionTable>, range: NSRange): void;

	setViewport(viewport: MTLViewport): void;

	setViewportsCount(viewports: interop.Reference<MTLViewport>, count: number): void;

	setVisibilityResultModeOffset(mode: MTLVisibilityResultMode, offset: number): void;

	updateFenceAfterStages(fence: MTLFence, stages: MTLRenderStages): void;

	useHeap(heap: MTLHeap): void;

	useHeapStages(heap: MTLHeap, stages: MTLRenderStages): void;

	useHeapsCount(heaps: interop.Reference<MTLHeap>, count: number): void;

	useHeapsCountStages(heaps: interop.Reference<MTLHeap>, count: number, stages: MTLRenderStages): void;

	useResourceUsage(resource: MTLResource, usage: MTLResourceUsage): void;

	useResourceUsageStages(resource: MTLResource, usage: MTLResourceUsage, stages: MTLRenderStages): void;

	useResourcesCountUsage(resources: interop.Reference<MTLResource>, count: number, usage: MTLResourceUsage): void;

	useResourcesCountUsageStages(resources: interop.Reference<MTLResource>, count: number, usage: MTLResourceUsage, stages: MTLRenderStages): void;

	waitForFenceBeforeStages(fence: MTLFence, stages: MTLRenderStages): void;
}
declare var MTLRenderCommandEncoder: {

	prototype: MTLRenderCommandEncoder;
};

declare class MTLRenderPassAttachmentDescriptor extends NSObject implements NSCopying {

	static alloc(): MTLRenderPassAttachmentDescriptor; // inherited from NSObject

	static new(): MTLRenderPassAttachmentDescriptor; // inherited from NSObject

	depthPlane: number;

	level: number;

	loadAction: MTLLoadAction;

	resolveDepthPlane: number;

	resolveLevel: number;

	resolveSlice: number;

	resolveTexture: MTLTexture;

	slice: number;

	storeAction: MTLStoreAction;

	storeActionOptions: MTLStoreActionOptions;

	texture: MTLTexture;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare class MTLRenderPassColorAttachmentDescriptor extends MTLRenderPassAttachmentDescriptor {

	static alloc(): MTLRenderPassColorAttachmentDescriptor; // inherited from NSObject

	static new(): MTLRenderPassColorAttachmentDescriptor; // inherited from NSObject

	clearColor: MTLClearColor;
}

declare class MTLRenderPassColorAttachmentDescriptorArray extends NSObject {

	static alloc(): MTLRenderPassColorAttachmentDescriptorArray; // inherited from NSObject

	static new(): MTLRenderPassColorAttachmentDescriptorArray; // inherited from NSObject
	[index: number]: MTLRenderPassColorAttachmentDescriptor;

	objectAtIndexedSubscript(attachmentIndex: number): MTLRenderPassColorAttachmentDescriptor;

	setObjectAtIndexedSubscript(attachment: MTLRenderPassColorAttachmentDescriptor, attachmentIndex: number): void;
}

declare class MTLRenderPassDepthAttachmentDescriptor extends MTLRenderPassAttachmentDescriptor {

	static alloc(): MTLRenderPassDepthAttachmentDescriptor; // inherited from NSObject

	static new(): MTLRenderPassDepthAttachmentDescriptor; // inherited from NSObject

	clearDepth: number;

	depthResolveFilter: MTLMultisampleDepthResolveFilter;
}

declare class MTLRenderPassDescriptor extends NSObject implements NSCopying {

	static alloc(): MTLRenderPassDescriptor; // inherited from NSObject

	static new(): MTLRenderPassDescriptor; // inherited from NSObject

	static renderPassDescriptor(): MTLRenderPassDescriptor;

	readonly colorAttachments: MTLRenderPassColorAttachmentDescriptorArray;

	defaultRasterSampleCount: number;

	depthAttachment: MTLRenderPassDepthAttachmentDescriptor;

	imageblockSampleLength: number;

	rasterizationRateMap: MTLRasterizationRateMap;

	renderTargetArrayLength: number;

	renderTargetHeight: number;

	renderTargetWidth: number;

	readonly sampleBufferAttachments: MTLRenderPassSampleBufferAttachmentDescriptorArray;

	stencilAttachment: MTLRenderPassStencilAttachmentDescriptor;

	threadgroupMemoryLength: number;

	tileHeight: number;

	tileWidth: number;

	visibilityResultBuffer: MTLBuffer;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	getSamplePositionsCount(positions: interop.Pointer | interop.Reference<MTLSamplePosition>, count: number): number;

	setSamplePositionsCount(positions: interop.Pointer | interop.Reference<MTLSamplePosition>, count: number): void;
}

declare class MTLRenderPassSampleBufferAttachmentDescriptor extends NSObject implements NSCopying {

	static alloc(): MTLRenderPassSampleBufferAttachmentDescriptor; // inherited from NSObject

	static new(): MTLRenderPassSampleBufferAttachmentDescriptor; // inherited from NSObject

	endOfFragmentSampleIndex: number;

	endOfVertexSampleIndex: number;

	sampleBuffer: MTLCounterSampleBuffer;

	startOfFragmentSampleIndex: number;

	startOfVertexSampleIndex: number;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare class MTLRenderPassSampleBufferAttachmentDescriptorArray extends NSObject {

	static alloc(): MTLRenderPassSampleBufferAttachmentDescriptorArray; // inherited from NSObject

	static new(): MTLRenderPassSampleBufferAttachmentDescriptorArray; // inherited from NSObject
	[index: number]: MTLRenderPassSampleBufferAttachmentDescriptor;

	objectAtIndexedSubscript(attachmentIndex: number): MTLRenderPassSampleBufferAttachmentDescriptor;

	setObjectAtIndexedSubscript(attachment: MTLRenderPassSampleBufferAttachmentDescriptor, attachmentIndex: number): void;
}

declare class MTLRenderPassStencilAttachmentDescriptor extends MTLRenderPassAttachmentDescriptor {

	static alloc(): MTLRenderPassStencilAttachmentDescriptor; // inherited from NSObject

	static new(): MTLRenderPassStencilAttachmentDescriptor; // inherited from NSObject

	clearStencil: number;

	stencilResolveFilter: MTLMultisampleStencilResolveFilter;
}

declare class MTLRenderPipelineColorAttachmentDescriptor extends NSObject implements NSCopying {

	static alloc(): MTLRenderPipelineColorAttachmentDescriptor; // inherited from NSObject

	static new(): MTLRenderPipelineColorAttachmentDescriptor; // inherited from NSObject

	alphaBlendOperation: MTLBlendOperation;

	blendingEnabled: boolean;

	destinationAlphaBlendFactor: MTLBlendFactor;

	destinationRGBBlendFactor: MTLBlendFactor;

	pixelFormat: MTLPixelFormat;

	rgbBlendOperation: MTLBlendOperation;

	sourceAlphaBlendFactor: MTLBlendFactor;

	sourceRGBBlendFactor: MTLBlendFactor;

	writeMask: MTLColorWriteMask;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare class MTLRenderPipelineColorAttachmentDescriptorArray extends NSObject {

	static alloc(): MTLRenderPipelineColorAttachmentDescriptorArray; // inherited from NSObject

	static new(): MTLRenderPipelineColorAttachmentDescriptorArray; // inherited from NSObject
	[index: number]: MTLRenderPipelineColorAttachmentDescriptor;

	objectAtIndexedSubscript(attachmentIndex: number): MTLRenderPipelineColorAttachmentDescriptor;

	setObjectAtIndexedSubscript(attachment: MTLRenderPipelineColorAttachmentDescriptor, attachmentIndex: number): void;
}

declare class MTLRenderPipelineDescriptor extends NSObject implements NSCopying {

	static alloc(): MTLRenderPipelineDescriptor; // inherited from NSObject

	static new(): MTLRenderPipelineDescriptor; // inherited from NSObject

	alphaToCoverageEnabled: boolean;

	alphaToOneEnabled: boolean;

	binaryArchives: NSArray<MTLBinaryArchive>;

	readonly colorAttachments: MTLRenderPipelineColorAttachmentDescriptorArray;

	depthAttachmentPixelFormat: MTLPixelFormat;

	readonly fragmentBuffers: MTLPipelineBufferDescriptorArray;

	fragmentFunction: MTLFunction;

	fragmentLinkedFunctions: MTLLinkedFunctions;

	fragmentPreloadedLibraries: NSArray<MTLDynamicLibrary>;

	inputPrimitiveTopology: MTLPrimitiveTopologyClass;

	label: string;

	maxFragmentCallStackDepth: number;

	maxTessellationFactor: number;

	maxVertexAmplificationCount: number;

	maxVertexCallStackDepth: number;

	rasterSampleCount: number;

	rasterizationEnabled: boolean;

	sampleCount: number;

	stencilAttachmentPixelFormat: MTLPixelFormat;

	supportAddingFragmentBinaryFunctions: boolean;

	supportAddingVertexBinaryFunctions: boolean;

	supportIndirectCommandBuffers: boolean;

	tessellationControlPointIndexType: MTLTessellationControlPointIndexType;

	tessellationFactorFormat: MTLTessellationFactorFormat;

	tessellationFactorScaleEnabled: boolean;

	tessellationFactorStepFunction: MTLTessellationFactorStepFunction;

	tessellationOutputWindingOrder: MTLWinding;

	tessellationPartitionMode: MTLTessellationPartitionMode;

	readonly vertexBuffers: MTLPipelineBufferDescriptorArray;

	vertexDescriptor: MTLVertexDescriptor;

	vertexFunction: MTLFunction;

	vertexLinkedFunctions: MTLLinkedFunctions;

	vertexPreloadedLibraries: NSArray<MTLDynamicLibrary>;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	reset(): void;
}

declare class MTLRenderPipelineFunctionsDescriptor extends NSObject implements NSCopying {

	static alloc(): MTLRenderPipelineFunctionsDescriptor; // inherited from NSObject

	static new(): MTLRenderPipelineFunctionsDescriptor; // inherited from NSObject

	fragmentAdditionalBinaryFunctions: NSArray<MTLFunction>;

	tileAdditionalBinaryFunctions: NSArray<MTLFunction>;

	vertexAdditionalBinaryFunctions: NSArray<MTLFunction>;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare class MTLRenderPipelineReflection extends NSObject {

	static alloc(): MTLRenderPipelineReflection; // inherited from NSObject

	static new(): MTLRenderPipelineReflection; // inherited from NSObject

	readonly fragmentArguments: NSArray<MTLArgument>;

	readonly fragmentBindings: NSArray<MTLBinding>;

	readonly meshBindings: NSArray<MTLBinding>;

	readonly objectBindings: NSArray<MTLBinding>;

	readonly tileArguments: NSArray<MTLArgument>;

	readonly tileBindings: NSArray<MTLBinding>;

	readonly vertexArguments: NSArray<MTLArgument>;

	readonly vertexBindings: NSArray<MTLBinding>;
}

interface MTLRenderPipelineState extends NSObjectProtocol {

	device: MTLDevice;

	gpuResourceID: MTLResourceID;

	imageblockSampleLength: number;

	label: string;

	maxTotalThreadgroupsPerMeshGrid: number;

	maxTotalThreadsPerMeshThreadgroup: number;

	maxTotalThreadsPerObjectThreadgroup: number;

	maxTotalThreadsPerThreadgroup: number;

	meshThreadExecutionWidth: number;

	objectThreadExecutionWidth: number;

	supportIndirectCommandBuffers: boolean;

	threadgroupSizeMatchesTileSize: boolean;

	functionHandleWithFunctionStage(_function: MTLFunction, stage: MTLRenderStages): MTLFunctionHandle;

	imageblockMemoryLengthForDimensions(imageblockDimensions: MTLSize): number;

	newIntersectionFunctionTableWithDescriptorStage(descriptor: MTLIntersectionFunctionTableDescriptor, stage: MTLRenderStages): MTLIntersectionFunctionTable;

	newRenderPipelineStateWithAdditionalBinaryFunctionsError(additionalBinaryFunctions: MTLRenderPipelineFunctionsDescriptor): MTLRenderPipelineState;

	newVisibleFunctionTableWithDescriptorStage(descriptor: MTLVisibleFunctionTableDescriptor, stage: MTLRenderStages): MTLVisibleFunctionTable;
}
declare var MTLRenderPipelineState: {

	prototype: MTLRenderPipelineState;
};

declare const enum MTLRenderStages {

	Vertex = 1,

	Fragment = 2,

	Tile = 4,

	Object = 8,

	Mesh = 16
}

interface MTLResource extends NSObjectProtocol {

	allocatedSize: number;

	cpuCacheMode: MTLCPUCacheMode;

	device: MTLDevice;

	hazardTrackingMode: MTLHazardTrackingMode;

	heap: MTLHeap;

	heapOffset: number;

	label: string;

	resourceOptions: MTLResourceOptions;

	storageMode: MTLStorageMode;

	isAliasable(): boolean;

	makeAliasable(): void;

	setOwnerWithIdentity(task_id_token: number): number;

	setPurgeableState(state: MTLPurgeableState): MTLPurgeableState;
}
declare var MTLResource: {

	prototype: MTLResource;
};

interface MTLResourceID {
	_impl: number;
}
declare var MTLResourceID: interop.StructType<MTLResourceID>;

declare const enum MTLResourceOptions {

	CPUCacheModeDefaultCache = 0,

	CPUCacheModeWriteCombined = 1,

	StorageModeShared = 0,

	StorageModeManaged = 16,

	StorageModePrivate = 32,

	StorageModeMemoryless = 48,

	HazardTrackingModeDefault = 0,

	HazardTrackingModeUntracked = 256,

	HazardTrackingModeTracked = 512,

	OptionCPUCacheModeDefault = 0,

	OptionCPUCacheModeWriteCombined = 1
}

interface MTLResourceStateCommandEncoder extends MTLCommandEncoder {

	moveTextureMappingsFromTextureSourceSliceSourceLevelSourceOriginSourceSizeToTextureDestinationSliceDestinationLevelDestinationOrigin(sourceTexture: MTLTexture, sourceSlice: number, sourceLevel: number, sourceOrigin: MTLOrigin, sourceSize: MTLSize, destinationTexture: MTLTexture, destinationSlice: number, destinationLevel: number, destinationOrigin: MTLOrigin): void;

	updateFence(fence: MTLFence): void;

	updateTextureMappingModeIndirectBufferIndirectBufferOffset(texture: MTLTexture, mode: MTLSparseTextureMappingMode, indirectBuffer: MTLBuffer, indirectBufferOffset: number): void;

	updateTextureMappingModeRegionMipLevelSlice(texture: MTLTexture, mode: MTLSparseTextureMappingMode, region: MTLRegion, mipLevel: number, slice: number): void;

	updateTextureMappingsModeRegionsMipLevelsSlicesNumRegions(texture: MTLTexture, mode: MTLSparseTextureMappingMode, regions: interop.Reference<MTLRegion>, mipLevels: interop.Reference<number>, slices: interop.Reference<number>, numRegions: number): void;

	waitForFence(fence: MTLFence): void;
}
declare var MTLResourceStateCommandEncoder: {

	prototype: MTLResourceStateCommandEncoder;
};

declare class MTLResourceStatePassDescriptor extends NSObject implements NSCopying {

	static alloc(): MTLResourceStatePassDescriptor; // inherited from NSObject

	static new(): MTLResourceStatePassDescriptor; // inherited from NSObject

	static resourceStatePassDescriptor(): MTLResourceStatePassDescriptor;

	readonly sampleBufferAttachments: MTLResourceStatePassSampleBufferAttachmentDescriptorArray;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare class MTLResourceStatePassSampleBufferAttachmentDescriptor extends NSObject implements NSCopying {

	static alloc(): MTLResourceStatePassSampleBufferAttachmentDescriptor; // inherited from NSObject

	static new(): MTLResourceStatePassSampleBufferAttachmentDescriptor; // inherited from NSObject

	endOfEncoderSampleIndex: number;

	sampleBuffer: MTLCounterSampleBuffer;

	startOfEncoderSampleIndex: number;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare class MTLResourceStatePassSampleBufferAttachmentDescriptorArray extends NSObject {

	static alloc(): MTLResourceStatePassSampleBufferAttachmentDescriptorArray; // inherited from NSObject

	static new(): MTLResourceStatePassSampleBufferAttachmentDescriptorArray; // inherited from NSObject
	[index: number]: MTLResourceStatePassSampleBufferAttachmentDescriptor;

	objectAtIndexedSubscript(attachmentIndex: number): MTLResourceStatePassSampleBufferAttachmentDescriptor;

	setObjectAtIndexedSubscript(attachment: MTLResourceStatePassSampleBufferAttachmentDescriptor, attachmentIndex: number): void;
}

declare const enum MTLResourceUsage {

	Read = 1,

	Write = 2,

	Sample = 4
}

interface MTLSamplePosition {
	x: number;
	y: number;
}
declare var MTLSamplePosition: interop.StructType<MTLSamplePosition>;

declare const enum MTLSamplerAddressMode {

	ClampToEdge = 0,

	MirrorClampToEdge = 1,

	Repeat = 2,

	MirrorRepeat = 3,

	ClampToZero = 4,

	ClampToBorderColor = 5
}

declare const enum MTLSamplerBorderColor {

	TransparentBlack = 0,

	OpaqueBlack = 1,

	OpaqueWhite = 2
}

declare class MTLSamplerDescriptor extends NSObject implements NSCopying {

	static alloc(): MTLSamplerDescriptor; // inherited from NSObject

	static new(): MTLSamplerDescriptor; // inherited from NSObject

	borderColor: MTLSamplerBorderColor;

	compareFunction: MTLCompareFunction;

	label: string;

	lodAverage: boolean;

	lodMaxClamp: number;

	lodMinClamp: number;

	magFilter: MTLSamplerMinMagFilter;

	maxAnisotropy: number;

	minFilter: MTLSamplerMinMagFilter;

	mipFilter: MTLSamplerMipFilter;

	normalizedCoordinates: boolean;

	rAddressMode: MTLSamplerAddressMode;

	sAddressMode: MTLSamplerAddressMode;

	supportArgumentBuffers: boolean;

	tAddressMode: MTLSamplerAddressMode;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare const enum MTLSamplerMinMagFilter {

	Nearest = 0,

	Linear = 1
}

declare const enum MTLSamplerMipFilter {

	NotMipmapped = 0,

	Nearest = 1,

	Linear = 2
}

interface MTLSamplerState extends NSObjectProtocol {

	device: MTLDevice;

	gpuResourceID: MTLResourceID;

	label: string;
}
declare var MTLSamplerState: {

	prototype: MTLSamplerState;
};

interface MTLScissorRect {
	x: number;
	y: number;
	width: number;
	height: number;
}
declare var MTLScissorRect: interop.StructType<MTLScissorRect>;

interface MTLSharedEvent extends MTLEvent {

	signaledValue: number;

	newSharedEventHandle(): MTLSharedEventHandle;

	notifyListenerAtValueBlock(listener: MTLSharedEventListener, value: number, block: (p1: MTLSharedEvent, p2: number) => void): void;

	waitUntilSignaledValueTimeoutMS(value: number, milliseconds: number): boolean;
}
declare var MTLSharedEvent: {

	prototype: MTLSharedEvent;
};

declare class MTLSharedEventHandle extends NSObject implements NSSecureCoding {

	static alloc(): MTLSharedEventHandle; // inherited from NSObject

	static new(): MTLSharedEventHandle; // inherited from NSObject

	readonly label: string;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare class MTLSharedEventListener extends NSObject {

	static alloc(): MTLSharedEventListener; // inherited from NSObject

	static new(): MTLSharedEventListener; // inherited from NSObject

	readonly dispatchQueue: interop.Pointer | interop.Reference<any>;

	constructor(o: { dispatchQueue: interop.Pointer | interop.Reference<any>; });

	initWithDispatchQueue(dispatchQueue: interop.Pointer | interop.Reference<any>): this;
}

interface MTLSize {
	width: number;
	height: number;
	depth: number;
}
declare var MTLSize: interop.StructType<MTLSize>;

interface MTLSizeAndAlign {
	size: number;
	align: number;
}
declare var MTLSizeAndAlign: interop.StructType<MTLSizeAndAlign>;

declare const enum MTLSparsePageSize {

	Size16 = 101,

	Size64 = 102,

	Size256 = 103
}

declare const enum MTLSparseTextureMappingMode {

	Map = 0,

	Unmap = 1
}

declare const enum MTLSparseTextureRegionAlignmentMode {

	Outward = 0,

	Inward = 1
}

interface MTLStageInRegionIndirectArguments {
	stageInOrigin: interop.Reference<number>;
	stageInSize: interop.Reference<number>;
}
declare var MTLStageInRegionIndirectArguments: interop.StructType<MTLStageInRegionIndirectArguments>;

declare class MTLStageInputOutputDescriptor extends NSObject implements NSCopying {

	static alloc(): MTLStageInputOutputDescriptor; // inherited from NSObject

	static new(): MTLStageInputOutputDescriptor; // inherited from NSObject

	static stageInputOutputDescriptor(): MTLStageInputOutputDescriptor;

	readonly attributes: MTLAttributeDescriptorArray;

	indexBufferIndex: number;

	indexType: MTLIndexType;

	readonly layouts: MTLBufferLayoutDescriptorArray;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	reset(): void;
}

declare class MTLStencilDescriptor extends NSObject implements NSCopying {

	static alloc(): MTLStencilDescriptor; // inherited from NSObject

	static new(): MTLStencilDescriptor; // inherited from NSObject

	depthFailureOperation: MTLStencilOperation;

	depthStencilPassOperation: MTLStencilOperation;

	readMask: number;

	stencilCompareFunction: MTLCompareFunction;

	stencilFailureOperation: MTLStencilOperation;

	writeMask: number;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare const enum MTLStencilOperation {

	Keep = 0,

	Zero = 1,

	Replace = 2,

	IncrementClamp = 3,

	DecrementClamp = 4,

	Invert = 5,

	IncrementWrap = 6,

	DecrementWrap = 7
}

declare const enum MTLStepFunction {

	Constant = 0,

	PerVertex = 1,

	PerInstance = 2,

	PerPatch = 3,

	PerPatchControlPoint = 4,

	ThreadPositionInGridX = 5,

	ThreadPositionInGridY = 6,

	ThreadPositionInGridXIndexed = 7,

	ThreadPositionInGridYIndexed = 8
}

declare class MTLStitchedLibraryDescriptor extends NSObject implements NSCopying {

	static alloc(): MTLStitchedLibraryDescriptor; // inherited from NSObject

	static new(): MTLStitchedLibraryDescriptor; // inherited from NSObject

	functionGraphs: NSArray<MTLFunctionStitchingGraph>;

	functions: NSArray<MTLFunction>;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare const enum MTLStorageMode {

	Shared = 0,

	Managed = 1,

	Private = 2,

	Memoryless = 3
}

declare const enum MTLStoreAction {

	DontCare = 0,

	Store = 1,

	MultisampleResolve = 2,

	StoreAndMultisampleResolve = 3,

	Unknown = 4,

	CustomSampleDepthStore = 5
}

declare const enum MTLStoreActionOptions {

	None = 0,

	CustomSamplePositions = 1
}

declare class MTLStructMember extends NSObject {

	static alloc(): MTLStructMember; // inherited from NSObject

	static new(): MTLStructMember; // inherited from NSObject

	readonly argumentIndex: number;

	readonly dataType: MTLDataType;

	readonly name: string;

	readonly offset: number;

	arrayType(): MTLArrayType;

	pointerType(): MTLPointerType;

	structType(): MTLStructType;

	textureReferenceType(): MTLTextureReferenceType;
}

declare class MTLStructType extends MTLType {

	static alloc(): MTLStructType; // inherited from NSObject

	static new(): MTLStructType; // inherited from NSObject

	readonly members: NSArray<MTLStructMember>;

	memberByName(name: string): MTLStructMember;
}

declare const enum MTLTessellationControlPointIndexType {

	None = 0,

	UInt16 = 1,

	UInt32 = 2
}

declare const enum MTLTessellationFactorFormat {

	Half = 0
}

declare const enum MTLTessellationFactorStepFunction {

	Constant = 0,

	PerPatch = 1,

	PerInstance = 2,

	PerPatchAndPerInstance = 3
}

declare const enum MTLTessellationPartitionMode {

	Pow2 = 0,

	Integer = 1,

	FractionalOdd = 2,

	FractionalEven = 3
}

interface MTLTexture extends MTLResource {

	allowGPUOptimizedContents: boolean;

	arrayLength: number;

	buffer: MTLBuffer;

	bufferBytesPerRow: number;

	bufferOffset: number;

	compressionType: MTLTextureCompressionType;

	depth: number;

	firstMipmapInTail: number;

	framebufferOnly: boolean;

	gpuResourceID: MTLResourceID;

	height: number;

	iosurface: IOSurface;

	iosurfacePlane: number;

	isSparse: boolean;

	mipmapLevelCount: number;

	parentRelativeLevel: number;

	parentRelativeSlice: number;

	parentTexture: MTLTexture;

	pixelFormat: MTLPixelFormat;

	rootResource: MTLResource;

	sampleCount: number;

	swizzle: MTLTextureSwizzleChannels;

	tailSizeInBytes: number;

	textureType: MTLTextureType;

	usage: MTLTextureUsage;

	width: number;

	getBytesBytesPerRowBytesPerImageFromRegionMipmapLevelSlice(pixelBytes: interop.Pointer | interop.Reference<any>, bytesPerRow: number, bytesPerImage: number, region: MTLRegion, level: number, slice: number): void;

	getBytesBytesPerRowFromRegionMipmapLevel(pixelBytes: interop.Pointer | interop.Reference<any>, bytesPerRow: number, region: MTLRegion, level: number): void;

	newTextureViewWithPixelFormat(pixelFormat: MTLPixelFormat): MTLTexture;

	newTextureViewWithPixelFormatTextureTypeLevelsSlices(pixelFormat: MTLPixelFormat, textureType: MTLTextureType, levelRange: NSRange, sliceRange: NSRange): MTLTexture;

	newTextureViewWithPixelFormatTextureTypeLevelsSlicesSwizzle(pixelFormat: MTLPixelFormat, textureType: MTLTextureType, levelRange: NSRange, sliceRange: NSRange, swizzle: MTLTextureSwizzleChannels): MTLTexture;

	replaceRegionMipmapLevelSliceWithBytesBytesPerRowBytesPerImage(region: MTLRegion, level: number, slice: number, pixelBytes: interop.Pointer | interop.Reference<any>, bytesPerRow: number, bytesPerImage: number): void;

	replaceRegionMipmapLevelWithBytesBytesPerRow(region: MTLRegion, level: number, pixelBytes: interop.Pointer | interop.Reference<any>, bytesPerRow: number): void;
}
declare var MTLTexture: {

	prototype: MTLTexture;
};

interface MTLTextureBinding extends MTLBinding {

	arrayLength: number;

	depthTexture: boolean;

	textureDataType: MTLDataType;

	textureType: MTLTextureType;
}
declare var MTLTextureBinding: {

	prototype: MTLTextureBinding;
};

declare const enum MTLTextureCompressionType {

	Lossless = 0,

	Lossy = 1
}

declare class MTLTextureDescriptor extends NSObject implements NSCopying {

	static alloc(): MTLTextureDescriptor; // inherited from NSObject

	static new(): MTLTextureDescriptor; // inherited from NSObject

	static texture2DDescriptorWithPixelFormatWidthHeightMipmapped(pixelFormat: MTLPixelFormat, width: number, height: number, mipmapped: boolean): MTLTextureDescriptor;

	static textureBufferDescriptorWithPixelFormatWidthResourceOptionsUsage(pixelFormat: MTLPixelFormat, width: number, resourceOptions: MTLResourceOptions, usage: MTLTextureUsage): MTLTextureDescriptor;

	static textureCubeDescriptorWithPixelFormatSizeMipmapped(pixelFormat: MTLPixelFormat, size: number, mipmapped: boolean): MTLTextureDescriptor;

	allowGPUOptimizedContents: boolean;

	arrayLength: number;

	compressionType: MTLTextureCompressionType;

	cpuCacheMode: MTLCPUCacheMode;

	depth: number;

	hazardTrackingMode: MTLHazardTrackingMode;

	height: number;

	mipmapLevelCount: number;

	pixelFormat: MTLPixelFormat;

	resourceOptions: MTLResourceOptions;

	sampleCount: number;

	storageMode: MTLStorageMode;

	swizzle: MTLTextureSwizzleChannels;

	textureType: MTLTextureType;

	usage: MTLTextureUsage;

	width: number;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare class MTLTextureReferenceType extends MTLType {

	static alloc(): MTLTextureReferenceType; // inherited from NSObject

	static new(): MTLTextureReferenceType; // inherited from NSObject

	readonly access: MTLBindingAccess;

	readonly isDepthTexture: boolean;

	readonly textureDataType: MTLDataType;

	readonly textureType: MTLTextureType;
}

declare const enum MTLTextureSwizzle {

	Zero = 0,

	One = 1,

	Red = 2,

	Green = 3,

	Blue = 4,

	Alpha = 5
}

interface MTLTextureSwizzleChannels {
	red: MTLTextureSwizzle;
	green: MTLTextureSwizzle;
	blue: MTLTextureSwizzle;
	alpha: MTLTextureSwizzle;
}
declare var MTLTextureSwizzleChannels: interop.StructType<MTLTextureSwizzleChannels>;

declare const enum MTLTextureType {

	Type1D = 0,

	Type1DArray = 1,

	Type2D = 2,

	Type2DArray = 3,

	Type2DMultisample = 4,

	TypeCube = 5,

	TypeCubeArray = 6,

	Type3D = 7,

	Type2DMultisampleArray = 8,

	TypeTextureBuffer = 9
}

declare const enum MTLTextureUsage {

	Unknown = 0,

	ShaderRead = 1,

	ShaderWrite = 2,

	RenderTarget = 4,

	PixelFormatView = 16,

	ShaderAtomic = 32
}

interface MTLThreadgroupBinding extends MTLBinding {

	threadgroupMemoryAlignment: number;

	threadgroupMemoryDataSize: number;
}
declare var MTLThreadgroupBinding: {

	prototype: MTLThreadgroupBinding;
};

declare class MTLTileRenderPipelineColorAttachmentDescriptor extends NSObject implements NSCopying {

	static alloc(): MTLTileRenderPipelineColorAttachmentDescriptor; // inherited from NSObject

	static new(): MTLTileRenderPipelineColorAttachmentDescriptor; // inherited from NSObject

	pixelFormat: MTLPixelFormat;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare class MTLTileRenderPipelineColorAttachmentDescriptorArray extends NSObject {

	static alloc(): MTLTileRenderPipelineColorAttachmentDescriptorArray; // inherited from NSObject

	static new(): MTLTileRenderPipelineColorAttachmentDescriptorArray; // inherited from NSObject
	[index: number]: MTLTileRenderPipelineColorAttachmentDescriptor;

	objectAtIndexedSubscript(attachmentIndex: number): MTLTileRenderPipelineColorAttachmentDescriptor;

	setObjectAtIndexedSubscript(attachment: MTLTileRenderPipelineColorAttachmentDescriptor, attachmentIndex: number): void;
}

declare class MTLTileRenderPipelineDescriptor extends NSObject implements NSCopying {

	static alloc(): MTLTileRenderPipelineDescriptor; // inherited from NSObject

	static new(): MTLTileRenderPipelineDescriptor; // inherited from NSObject

	binaryArchives: NSArray<MTLBinaryArchive>;

	readonly colorAttachments: MTLTileRenderPipelineColorAttachmentDescriptorArray;

	label: string;

	linkedFunctions: MTLLinkedFunctions;

	maxCallStackDepth: number;

	maxTotalThreadsPerThreadgroup: number;

	preloadedLibraries: NSArray<MTLDynamicLibrary>;

	rasterSampleCount: number;

	supportAddingBinaryFunctions: boolean;

	threadgroupSizeMatchesTileSize: boolean;

	readonly tileBuffers: MTLPipelineBufferDescriptorArray;

	tileFunction: MTLFunction;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	reset(): void;
}

declare const enum MTLTriangleFillMode {

	Fill = 0,

	Lines = 1
}

interface MTLTriangleTessellationFactorsHalf {
	edgeTessellationFactor: interop.Reference<number>;
	insideTessellationFactor: number;
}
declare var MTLTriangleTessellationFactorsHalf: interop.StructType<MTLTriangleTessellationFactorsHalf>;

declare class MTLType extends NSObject {

	static alloc(): MTLType; // inherited from NSObject

	static new(): MTLType; // inherited from NSObject

	readonly dataType: MTLDataType;
}

interface MTLVertexAmplificationViewMapping {
	viewportArrayIndexOffset: number;
	renderTargetArrayIndexOffset: number;
}
declare var MTLVertexAmplificationViewMapping: interop.StructType<MTLVertexAmplificationViewMapping>;

declare class MTLVertexAttribute extends NSObject {

	static alloc(): MTLVertexAttribute; // inherited from NSObject

	static new(): MTLVertexAttribute; // inherited from NSObject

	readonly active: boolean;

	readonly attributeIndex: number;

	readonly attributeType: MTLDataType;

	readonly name: string;

	readonly patchControlPointData: boolean;

	readonly patchData: boolean;
}

declare class MTLVertexAttributeDescriptor extends NSObject implements NSCopying {

	static alloc(): MTLVertexAttributeDescriptor; // inherited from NSObject

	static new(): MTLVertexAttributeDescriptor; // inherited from NSObject

	bufferIndex: number;

	format: MTLVertexFormat;

	offset: number;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare class MTLVertexAttributeDescriptorArray extends NSObject {

	static alloc(): MTLVertexAttributeDescriptorArray; // inherited from NSObject

	static new(): MTLVertexAttributeDescriptorArray; // inherited from NSObject
	[index: number]: MTLVertexAttributeDescriptor;

	objectAtIndexedSubscript(index: number): MTLVertexAttributeDescriptor;

	setObjectAtIndexedSubscript(attributeDesc: MTLVertexAttributeDescriptor, index: number): void;
}

declare class MTLVertexBufferLayoutDescriptor extends NSObject implements NSCopying {

	static alloc(): MTLVertexBufferLayoutDescriptor; // inherited from NSObject

	static new(): MTLVertexBufferLayoutDescriptor; // inherited from NSObject

	stepFunction: MTLVertexStepFunction;

	stepRate: number;

	stride: number;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare class MTLVertexBufferLayoutDescriptorArray extends NSObject {

	static alloc(): MTLVertexBufferLayoutDescriptorArray; // inherited from NSObject

	static new(): MTLVertexBufferLayoutDescriptorArray; // inherited from NSObject
	[index: number]: MTLVertexBufferLayoutDescriptor;

	objectAtIndexedSubscript(index: number): MTLVertexBufferLayoutDescriptor;

	setObjectAtIndexedSubscript(bufferDesc: MTLVertexBufferLayoutDescriptor, index: number): void;
}

declare class MTLVertexDescriptor extends NSObject implements NSCopying {

	static alloc(): MTLVertexDescriptor; // inherited from NSObject

	static new(): MTLVertexDescriptor; // inherited from NSObject

	static vertexDescriptor(): MTLVertexDescriptor;

	readonly attributes: MTLVertexAttributeDescriptorArray;

	readonly layouts: MTLVertexBufferLayoutDescriptorArray;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	reset(): void;
}

declare const enum MTLVertexFormat {

	Invalid = 0,

	UChar2 = 1,

	UChar3 = 2,

	UChar4 = 3,

	Char2 = 4,

	Char3 = 5,

	Char4 = 6,

	UChar2Normalized = 7,

	UChar3Normalized = 8,

	UChar4Normalized = 9,

	Char2Normalized = 10,

	Char3Normalized = 11,

	Char4Normalized = 12,

	UShort2 = 13,

	UShort3 = 14,

	UShort4 = 15,

	Short2 = 16,

	Short3 = 17,

	Short4 = 18,

	UShort2Normalized = 19,

	UShort3Normalized = 20,

	UShort4Normalized = 21,

	Short2Normalized = 22,

	Short3Normalized = 23,

	Short4Normalized = 24,

	Half2 = 25,

	Half3 = 26,

	Half4 = 27,

	Float = 28,

	Float2 = 29,

	Float3 = 30,

	Float4 = 31,

	Int = 32,

	Int2 = 33,

	Int3 = 34,

	Int4 = 35,

	UInt = 36,

	UInt2 = 37,

	UInt3 = 38,

	UInt4 = 39,

	Int1010102Normalized = 40,

	UInt1010102Normalized = 41,

	UChar4Normalized_BGRA = 42,

	UChar = 45,

	Char = 46,

	UCharNormalized = 47,

	CharNormalized = 48,

	UShort = 49,

	Short = 50,

	UShortNormalized = 51,

	ShortNormalized = 52,

	Half = 53,

	FloatRG11B10 = 54,

	FloatRGB9E5 = 55
}

declare const enum MTLVertexStepFunction {

	Constant = 0,

	PerVertex = 1,

	PerInstance = 2,

	PerPatch = 3,

	PerPatchControlPoint = 4
}

interface MTLViewport {
	originX: number;
	originY: number;
	width: number;
	height: number;
	znear: number;
	zfar: number;
}
declare var MTLViewport: interop.StructType<MTLViewport>;

declare const enum MTLVisibilityResultMode {

	Disabled = 0,

	Boolean = 1,

	Counting = 2
}

interface MTLVisibleFunctionTable extends MTLResource {

	gpuResourceID: MTLResourceID;

	setFunctionAtIndex(_function: MTLFunctionHandle, index: number): void;

	setFunctionsWithRange(functions: interop.Reference<MTLFunctionHandle>, range: NSRange): void;
}
declare var MTLVisibleFunctionTable: {

	prototype: MTLVisibleFunctionTable;
};

declare class MTLVisibleFunctionTableDescriptor extends NSObject implements NSCopying {

	static alloc(): MTLVisibleFunctionTableDescriptor; // inherited from NSObject

	static new(): MTLVisibleFunctionTableDescriptor; // inherited from NSObject

	static visibleFunctionTableDescriptor(): MTLVisibleFunctionTableDescriptor;

	functionCount: number;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare const enum MTLWinding {

	Clockwise = 0,

	CounterClockwise = 1
}
