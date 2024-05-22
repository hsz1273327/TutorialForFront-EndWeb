
declare class AVAggregateAssetDownloadTask extends NSURLSessionTask {

	static alloc(): AVAggregateAssetDownloadTask; // inherited from NSObject

	static new(): AVAggregateAssetDownloadTask; // inherited from NSObject

	readonly URLAsset: AVURLAsset;
}

declare class AVAsset extends NSObject implements AVAsynchronousKeyValueLoading, NSCopying {

	static alloc(): AVAsset; // inherited from NSObject

	static assetWithURL(URL: NSURL): AVAsset;

	static new(): AVAsset; // inherited from NSObject

	readonly allMediaSelections: NSArray<AVMediaSelection>;

	readonly availableChapterLocales: NSArray<NSLocale>;

	readonly availableMediaCharacteristicsWithMediaSelectionOptions: NSArray<string>;

	readonly availableMetadataFormats: NSArray<string>;

	readonly canContainFragments: boolean;

	readonly commonMetadata: NSArray<AVMetadataItem>;

	readonly compatibleWithAirPlayVideo: boolean;

	readonly compatibleWithSavedPhotosAlbum: boolean;

	readonly composable: boolean;

	readonly containsFragments: boolean;

	readonly creationDate: AVMetadataItem;

	readonly duration: CMTime;

	readonly exportable: boolean;

	readonly hasProtectedContent: boolean;

	readonly lyrics: string;

	readonly metadata: NSArray<AVMetadataItem>;

	readonly minimumTimeOffsetFromLive: CMTime;

	readonly naturalSize: CGSize;

	readonly overallDurationHint: CMTime;

	readonly playable: boolean;

	readonly preferredMediaSelection: AVMediaSelection;

	readonly preferredRate: number;

	readonly preferredTransform: CGAffineTransform;

	readonly preferredVolume: number;

	readonly providesPreciseDurationAndTiming: boolean;

	readonly readable: boolean;

	readonly referenceRestrictions: AVAssetReferenceRestrictions;

	readonly trackGroups: NSArray<AVAssetTrackGroup>;

	readonly tracks: NSArray<AVAssetTrack>;

	cancelLoading(): void;

	chapterMetadataGroupsBestMatchingPreferredLanguages(preferredLanguages: NSArray<string> | string[]): NSArray<AVTimedMetadataGroup>;

	chapterMetadataGroupsWithTitleLocaleContainingItemsWithCommonKeys(locale: NSLocale, commonKeys: NSArray<string> | string[]): NSArray<AVTimedMetadataGroup>;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	findUnusedTrackIDWithCompletionHandler(completionHandler: (p1: number, p2: NSError) => void): void;

	loadChapterMetadataGroupsBestMatchingPreferredLanguagesCompletionHandler(preferredLanguages: NSArray<string> | string[], completionHandler: (p1: NSArray<AVTimedMetadataGroup>, p2: NSError) => void): void;

	loadChapterMetadataGroupsWithTitleLocaleContainingItemsWithCommonKeysCompletionHandler(locale: NSLocale, commonKeys: NSArray<string> | string[], completionHandler: (p1: NSArray<AVTimedMetadataGroup>, p2: NSError) => void): void;

	loadMediaSelectionGroupForMediaCharacteristicCompletionHandler(mediaCharacteristic: string, completionHandler: (p1: AVMediaSelectionGroup, p2: NSError) => void): void;

	loadMetadataForFormatCompletionHandler(format: string, completionHandler: (p1: NSArray<AVMetadataItem>, p2: NSError) => void): void;

	loadTrackWithTrackIDCompletionHandler(trackID: number, completionHandler: (p1: AVAssetTrack, p2: NSError) => void): void;

	loadTracksWithMediaCharacteristicCompletionHandler(mediaCharacteristic: string, completionHandler: (p1: NSArray<AVAssetTrack>, p2: NSError) => void): void;

	loadTracksWithMediaTypeCompletionHandler(mediaType: string, completionHandler: (p1: NSArray<AVAssetTrack>, p2: NSError) => void): void;

	loadValuesAsynchronouslyForKeysCompletionHandler(keys: NSArray<string> | string[], handler: () => void): void;

	mediaSelectionGroupForMediaCharacteristic(mediaCharacteristic: string): AVMediaSelectionGroup;

	metadataForFormat(format: string): NSArray<AVMetadataItem>;

	statusOfValueForKeyError(key: string): AVKeyValueStatus;

	trackWithTrackID(trackID: number): AVAssetTrack;

	tracksWithMediaCharacteristic(mediaCharacteristic: string): NSArray<AVAssetTrack>;

	tracksWithMediaType(mediaType: string): NSArray<AVAssetTrack>;

	unusedTrackID(): number;
}

declare class AVAssetCache extends NSObject {

	static alloc(): AVAssetCache; // inherited from NSObject

	static new(): AVAssetCache; // inherited from NSObject

	readonly playableOffline: boolean;

	mediaSelectionOptionsInMediaSelectionGroup(mediaSelectionGroup: AVMediaSelectionGroup): NSArray<AVMediaSelectionOption>;
}

declare var AVAssetChapterMetadataGroupsDidChangeNotification: string;

declare var AVAssetContainsFragmentsDidChangeNotification: string;

declare class AVAssetDownloadConfiguration extends NSObject {

	static alloc(): AVAssetDownloadConfiguration; // inherited from NSObject

	static downloadConfigurationWithAssetTitle(asset: AVURLAsset, title: string): AVAssetDownloadConfiguration;

	static new(): AVAssetDownloadConfiguration; // inherited from NSObject

	artworkData: NSData;

	auxiliaryContentConfigurations: NSArray<AVAssetDownloadContentConfiguration>;

	optimizesAuxiliaryContentConfigurations: boolean;

	readonly primaryContentConfiguration: AVAssetDownloadContentConfiguration;
}

declare class AVAssetDownloadContentConfiguration extends NSObject implements NSCopying {

	static alloc(): AVAssetDownloadContentConfiguration; // inherited from NSObject

	static new(): AVAssetDownloadContentConfiguration; // inherited from NSObject

	mediaSelections: NSArray<AVMediaSelection>;

	variantQualifiers: NSArray<AVAssetVariantQualifier>;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

interface AVAssetDownloadDelegate extends NSURLSessionTaskDelegate {

	URLSessionAggregateAssetDownloadTaskDidCompleteForMediaSelection?(session: NSURLSession, aggregateAssetDownloadTask: AVAggregateAssetDownloadTask, mediaSelection: AVMediaSelection): void;

	URLSessionAggregateAssetDownloadTaskDidLoadTimeRangeTotalTimeRangesLoadedTimeRangeExpectedToLoadForMediaSelection?(session: NSURLSession, aggregateAssetDownloadTask: AVAggregateAssetDownloadTask, timeRange: CMTimeRange, loadedTimeRanges: NSArray<NSValue> | NSValue[], timeRangeExpectedToLoad: CMTimeRange, mediaSelection: AVMediaSelection): void;

	URLSessionAggregateAssetDownloadTaskWillDownloadToURL?(session: NSURLSession, aggregateAssetDownloadTask: AVAggregateAssetDownloadTask, location: NSURL): void;

	URLSessionAssetDownloadTaskDidFinishDownloadingToURL?(session: NSURLSession, assetDownloadTask: AVAssetDownloadTask, location: NSURL): void;

	URLSessionAssetDownloadTaskDidLoadTimeRangeTotalTimeRangesLoadedTimeRangeExpectedToLoad?(session: NSURLSession, assetDownloadTask: AVAssetDownloadTask, timeRange: CMTimeRange, loadedTimeRanges: NSArray<NSValue> | NSValue[], timeRangeExpectedToLoad: CMTimeRange): void;

	URLSessionAssetDownloadTaskDidResolveMediaSelection?(session: NSURLSession, assetDownloadTask: AVAssetDownloadTask, resolvedMediaSelection: AVMediaSelection): void;

	URLSessionAssetDownloadTaskWillDownloadVariants?(session: NSURLSession, assetDownloadTask: AVAssetDownloadTask, variants: NSArray<AVAssetVariant> | AVAssetVariant[]): void;
}
declare var AVAssetDownloadDelegate: {

	prototype: AVAssetDownloadDelegate;
};

declare class AVAssetDownloadStorageManagementPolicy extends NSObject implements NSCopying, NSMutableCopying {

	static alloc(): AVAssetDownloadStorageManagementPolicy; // inherited from NSObject

	static new(): AVAssetDownloadStorageManagementPolicy; // inherited from NSObject

	readonly expirationDate: Date;

	readonly priority: string;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	mutableCopyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare class AVAssetDownloadStorageManager extends NSObject {

	static alloc(): AVAssetDownloadStorageManager; // inherited from NSObject

	static new(): AVAssetDownloadStorageManager; // inherited from NSObject

	static sharedDownloadStorageManager(): AVAssetDownloadStorageManager;

	setStorageManagementPolicyForURL(storageManagementPolicy: AVAssetDownloadStorageManagementPolicy, downloadStorageURL: NSURL): void;

	storageManagementPolicyForURL(downloadStorageURL: NSURL): AVAssetDownloadStorageManagementPolicy;
}

declare class AVAssetDownloadTask extends NSURLSessionTask {

	static alloc(): AVAssetDownloadTask; // inherited from NSObject

	static new(): AVAssetDownloadTask; // inherited from NSObject

	readonly URLAsset: AVURLAsset;

	readonly destinationURL: NSURL;

	readonly loadedTimeRanges: NSArray<NSValue>;

	readonly options: NSDictionary<string, any>;
}

declare var AVAssetDownloadTaskMediaSelectionKey: string;

declare var AVAssetDownloadTaskMediaSelectionPrefersMultichannelKey: string;

declare var AVAssetDownloadTaskMinimumRequiredMediaBitrateKey: string;

declare var AVAssetDownloadTaskMinimumRequiredPresentationSizeKey: string;

declare var AVAssetDownloadTaskPrefersHDRKey: string;

declare var AVAssetDownloadTaskPrefersLosslessAudioKey: string;

declare class AVAssetDownloadURLSession extends NSURLSession {

	static alloc(): AVAssetDownloadURLSession; // inherited from NSObject

	static new(): AVAssetDownloadURLSession; // inherited from NSObject

	static sessionWithConfigurationAssetDownloadDelegateDelegateQueue(configuration: NSURLSessionConfiguration, delegate: AVAssetDownloadDelegate, delegateQueue: NSOperationQueue): AVAssetDownloadURLSession;

	aggregateAssetDownloadTaskWithURLAssetMediaSelectionsAssetTitleAssetArtworkDataOptions(URLAsset: AVURLAsset, mediaSelections: NSArray<AVMediaSelection> | AVMediaSelection[], title: string, artworkData: NSData, options: NSDictionary<string, any>): AVAggregateAssetDownloadTask;

	assetDownloadTaskWithConfiguration(downloadConfiguration: AVAssetDownloadConfiguration): AVAssetDownloadTask;

	assetDownloadTaskWithURLAssetAssetTitleAssetArtworkDataOptions(URLAsset: AVURLAsset, title: string, artworkData: NSData, options: NSDictionary<string, any>): AVAssetDownloadTask;

	assetDownloadTaskWithURLAssetDestinationURLOptions(URLAsset: AVURLAsset, destinationURL: NSURL, options: NSDictionary<string, any>): AVAssetDownloadTask;
}

declare var AVAssetDownloadedAssetEvictionPriorityDefault: string;

declare var AVAssetDownloadedAssetEvictionPriorityImportant: string;

declare var AVAssetDurationDidChangeNotification: string;

declare var AVAssetExportPreset1280x720: string;

declare var AVAssetExportPreset1920x1080: string;

declare var AVAssetExportPreset3840x2160: string;

declare var AVAssetExportPreset640x480: string;

declare var AVAssetExportPreset960x540: string;

declare var AVAssetExportPresetAppleM4A: string;

declare var AVAssetExportPresetAppleProRes422LPCM: string;

declare var AVAssetExportPresetAppleProRes4444LPCM: string;

declare var AVAssetExportPresetHEVC1920x1080: string;

declare var AVAssetExportPresetHEVC1920x1080WithAlpha: string;

declare var AVAssetExportPresetHEVC3840x2160: string;

declare var AVAssetExportPresetHEVC3840x2160WithAlpha: string;

declare var AVAssetExportPresetHEVCHighestQuality: string;

declare var AVAssetExportPresetHEVCHighestQualityWithAlpha: string;

declare var AVAssetExportPresetHighestQuality: string;

declare var AVAssetExportPresetLowQuality: string;

declare var AVAssetExportPresetMVHEVC1440x1440: string;

declare var AVAssetExportPresetMVHEVC960x960: string;

declare var AVAssetExportPresetMediumQuality: string;

declare var AVAssetExportPresetPassthrough: string;

declare class AVAssetExportSession extends NSObject {

	static allExportPresets(): NSArray<string>;

	static alloc(): AVAssetExportSession; // inherited from NSObject

	static determineCompatibilityOfExportPresetWithAssetOutputFileTypeCompletionHandler(presetName: string, asset: AVAsset, outputFileType: string, handler: (p1: boolean) => void): void;

	static exportPresetsCompatibleWithAsset(asset: AVAsset): NSArray<string>;

	static exportSessionWithAssetPresetName(asset: AVAsset, presetName: string): AVAssetExportSession;

	static new(): AVAssetExportSession; // inherited from NSObject

	readonly asset: AVAsset;

	audioMix: AVAudioMix;

	audioTimePitchAlgorithm: string;

	audioTrackGroupHandling: AVAssetTrackGroupOutputHandling;

	canPerformMultiplePassesOverSourceMediaData: boolean;

	readonly customVideoCompositor: AVVideoCompositing;

	directoryForTemporaryFiles: NSURL;

	readonly error: NSError;

	readonly estimatedOutputFileLength: number;

	fileLengthLimit: number;

	readonly maxDuration: CMTime;

	metadata: NSArray<AVMetadataItem>;

	metadataItemFilter: AVMetadataItemFilter;

	outputFileType: string;

	outputURL: NSURL;

	readonly presetName: string;

	readonly progress: number;

	shouldOptimizeForNetworkUse: boolean;

	readonly status: AVAssetExportSessionStatus;

	readonly supportedFileTypes: NSArray<string>;

	timeRange: CMTimeRange;

	videoComposition: AVVideoComposition;

	constructor(o: { asset: AVAsset; presetName: string; });

	cancelExport(): void;

	determineCompatibleFileTypesWithCompletionHandler(handler: (p1: NSArray<string>) => void): void;

	estimateMaximumDurationWithCompletionHandler(handler: (p1: CMTime, p2: NSError) => void): void;

	estimateOutputFileLengthWithCompletionHandler(handler: (p1: number, p2: NSError) => void): void;

	exportAsynchronouslyWithCompletionHandler(handler: () => void): void;

	initWithAssetPresetName(asset: AVAsset, presetName: string): this;
}

declare const enum AVAssetExportSessionStatus {

	Unknown = 0,

	Waiting = 1,

	Exporting = 2,

	Completed = 3,

	Failed = 4,

	Cancelled = 5
}

declare class AVAssetImageGenerator extends NSObject {

	static alloc(): AVAssetImageGenerator; // inherited from NSObject

	static assetImageGeneratorWithAsset(asset: AVAsset): AVAssetImageGenerator;

	static new(): AVAssetImageGenerator; // inherited from NSObject

	apertureMode: string;

	appliesPreferredTrackTransform: boolean;

	readonly asset: AVAsset;

	readonly customVideoCompositor: AVVideoCompositing;

	maximumSize: CGSize;

	requestedTimeToleranceAfter: CMTime;

	requestedTimeToleranceBefore: CMTime;

	videoComposition: AVVideoComposition;

	constructor(o: { asset: AVAsset; });

	cancelAllCGImageGeneration(): void;

	copyCGImageAtTimeActualTimeError(requestedTime: CMTime, actualTime: interop.Pointer | interop.Reference<CMTime>): any;

	generateCGImageAsynchronouslyForTimeCompletionHandler(requestedTime: CMTime, handler: (p1: any, p2: CMTime, p3: NSError) => void): void;

	generateCGImagesAsynchronouslyForTimesCompletionHandler(requestedTimes: NSArray<NSValue> | NSValue[], handler: (p1: CMTime, p2: any, p3: CMTime, p4: AVAssetImageGeneratorResult, p5: NSError) => void): void;

	initWithAsset(asset: AVAsset): this;
}

declare var AVAssetImageGeneratorApertureModeCleanAperture: string;

declare var AVAssetImageGeneratorApertureModeEncodedPixels: string;

declare var AVAssetImageGeneratorApertureModeProductionAperture: string;

declare const enum AVAssetImageGeneratorResult {

	Succeeded = 0,

	Failed = 1,

	Cancelled = 2
}

declare var AVAssetMediaSelectionGroupsDidChangeNotification: string;

declare class AVAssetPlaybackAssistant extends NSObject {

	static alloc(): AVAssetPlaybackAssistant; // inherited from NSObject

	static assetPlaybackAssistantWithAsset(asset: AVAsset): AVAssetPlaybackAssistant;

	static new(): AVAssetPlaybackAssistant; // inherited from NSObject

	loadPlaybackConfigurationOptionsWithCompletionHandler(completionHandler: (p1: NSArray<string>) => void): void;
}

declare var AVAssetPlaybackConfigurationOptionStereoMultiviewVideo: string;

declare var AVAssetPlaybackConfigurationOptionStereoVideo: string;

declare class AVAssetReader extends NSObject {

	static alloc(): AVAssetReader; // inherited from NSObject

	static assetReaderWithAssetError(asset: AVAsset): AVAssetReader;

	static new(): AVAssetReader; // inherited from NSObject

	readonly asset: AVAsset;

	readonly error: NSError;

	readonly outputs: NSArray<AVAssetReaderOutput>;

	readonly status: AVAssetReaderStatus;

	timeRange: CMTimeRange;

	constructor(o: { asset: AVAsset; });

	addOutput(output: AVAssetReaderOutput): void;

	canAddOutput(output: AVAssetReaderOutput): boolean;

	cancelReading(): void;

	initWithAssetError(asset: AVAsset): this;

	startReading(): boolean;
}

declare class AVAssetReaderAudioMixOutput extends AVAssetReaderOutput {

	static alloc(): AVAssetReaderAudioMixOutput; // inherited from NSObject

	static assetReaderAudioMixOutputWithAudioTracksAudioSettings(audioTracks: NSArray<AVAssetTrack> | AVAssetTrack[], audioSettings: NSDictionary<string, any>): AVAssetReaderAudioMixOutput;

	static new(): AVAssetReaderAudioMixOutput; // inherited from NSObject

	audioMix: AVAudioMix;

	readonly audioSettings: NSDictionary<string, any>;

	audioTimePitchAlgorithm: string;

	readonly audioTracks: NSArray<AVAssetTrack>;

	constructor(o: { audioTracks: NSArray<AVAssetTrack> | AVAssetTrack[]; audioSettings: NSDictionary<string, any>; });

	initWithAudioTracksAudioSettings(audioTracks: NSArray<AVAssetTrack> | AVAssetTrack[], audioSettings: NSDictionary<string, any>): this;
}

declare class AVAssetReaderOutput extends NSObject {

	static alloc(): AVAssetReaderOutput; // inherited from NSObject

	static new(): AVAssetReaderOutput; // inherited from NSObject

	alwaysCopiesSampleData: boolean;

	readonly mediaType: string;

	supportsRandomAccess: boolean;

	copyNextSampleBuffer(): any;

	markConfigurationAsFinal(): void;

	resetForReadingTimeRanges(timeRanges: NSArray<NSValue> | NSValue[]): void;
}

declare class AVAssetReaderOutputMetadataAdaptor extends NSObject {

	static alloc(): AVAssetReaderOutputMetadataAdaptor; // inherited from NSObject

	static assetReaderOutputMetadataAdaptorWithAssetReaderTrackOutput(trackOutput: AVAssetReaderTrackOutput): AVAssetReaderOutputMetadataAdaptor;

	static new(): AVAssetReaderOutputMetadataAdaptor; // inherited from NSObject

	readonly assetReaderTrackOutput: AVAssetReaderTrackOutput;

	constructor(o: { assetReaderTrackOutput: AVAssetReaderTrackOutput; });

	initWithAssetReaderTrackOutput(trackOutput: AVAssetReaderTrackOutput): this;

	nextTimedMetadataGroup(): AVTimedMetadataGroup;
}

declare class AVAssetReaderSampleReferenceOutput extends AVAssetReaderOutput {

	static alloc(): AVAssetReaderSampleReferenceOutput; // inherited from NSObject

	static assetReaderSampleReferenceOutputWithTrack(track: AVAssetTrack): AVAssetReaderSampleReferenceOutput;

	static new(): AVAssetReaderSampleReferenceOutput; // inherited from NSObject

	readonly track: AVAssetTrack;

	constructor(o: { track: AVAssetTrack; });

	initWithTrack(track: AVAssetTrack): this;
}

declare const enum AVAssetReaderStatus {

	Unknown = 0,

	Reading = 1,

	Completed = 2,

	Failed = 3,

	Cancelled = 4
}

declare class AVAssetReaderTrackOutput extends AVAssetReaderOutput {

	static alloc(): AVAssetReaderTrackOutput; // inherited from NSObject

	static assetReaderTrackOutputWithTrackOutputSettings(track: AVAssetTrack, outputSettings: NSDictionary<string, any>): AVAssetReaderTrackOutput;

	static new(): AVAssetReaderTrackOutput; // inherited from NSObject

	audioTimePitchAlgorithm: string;

	readonly outputSettings: NSDictionary<string, any>;

	readonly track: AVAssetTrack;

	constructor(o: { track: AVAssetTrack; outputSettings: NSDictionary<string, any>; });

	initWithTrackOutputSettings(track: AVAssetTrack, outputSettings: NSDictionary<string, any>): this;
}

declare class AVAssetReaderVideoCompositionOutput extends AVAssetReaderOutput {

	static alloc(): AVAssetReaderVideoCompositionOutput; // inherited from NSObject

	static assetReaderVideoCompositionOutputWithVideoTracksVideoSettings(videoTracks: NSArray<AVAssetTrack> | AVAssetTrack[], videoSettings: NSDictionary<string, any>): AVAssetReaderVideoCompositionOutput;

	static new(): AVAssetReaderVideoCompositionOutput; // inherited from NSObject

	readonly customVideoCompositor: AVVideoCompositing;

	videoComposition: AVVideoComposition;

	readonly videoSettings: NSDictionary<string, any>;

	readonly videoTracks: NSArray<AVAssetTrack>;

	constructor(o: { videoTracks: NSArray<AVAssetTrack> | AVAssetTrack[]; videoSettings: NSDictionary<string, any>; });

	initWithVideoTracksVideoSettings(videoTracks: NSArray<AVAssetTrack> | AVAssetTrack[], videoSettings: NSDictionary<string, any>): this;
}

declare const enum AVAssetReferenceRestrictions {

	ForbidNone = 0,

	ForbidRemoteReferenceToLocal = 1,

	ForbidLocalReferenceToRemote = 2,

	ForbidCrossSiteReference = 4,

	ForbidLocalReferenceToLocal = 8,

	ForbidAll = 65535,

	DefaultPolicy = 2
}

declare class AVAssetResourceLoader extends NSObject {

	static alloc(): AVAssetResourceLoader; // inherited from NSObject

	static new(): AVAssetResourceLoader; // inherited from NSObject

	readonly delegate: AVAssetResourceLoaderDelegate;

	readonly delegateQueue: interop.Pointer | interop.Reference<any>;

	preloadsEligibleContentKeys: boolean;

	setDelegateQueue(delegate: AVAssetResourceLoaderDelegate, delegateQueue: interop.Pointer | interop.Reference<any>): void;
}

interface AVAssetResourceLoaderDelegate extends NSObjectProtocol {

	resourceLoaderDidCancelAuthenticationChallenge?(resourceLoader: AVAssetResourceLoader, authenticationChallenge: NSURLAuthenticationChallenge): void;

	resourceLoaderDidCancelLoadingRequest?(resourceLoader: AVAssetResourceLoader, loadingRequest: AVAssetResourceLoadingRequest): void;

	resourceLoaderShouldWaitForLoadingOfRequestedResource?(resourceLoader: AVAssetResourceLoader, loadingRequest: AVAssetResourceLoadingRequest): boolean;

	resourceLoaderShouldWaitForRenewalOfRequestedResource?(resourceLoader: AVAssetResourceLoader, renewalRequest: AVAssetResourceRenewalRequest): boolean;

	resourceLoaderShouldWaitForResponseToAuthenticationChallenge?(resourceLoader: AVAssetResourceLoader, authenticationChallenge: NSURLAuthenticationChallenge): boolean;
}
declare var AVAssetResourceLoaderDelegate: {

	prototype: AVAssetResourceLoaderDelegate;
};

declare class AVAssetResourceLoadingContentInformationRequest extends NSObject {

	static alloc(): AVAssetResourceLoadingContentInformationRequest; // inherited from NSObject

	static new(): AVAssetResourceLoadingContentInformationRequest; // inherited from NSObject

	readonly allowedContentTypes: NSArray<string>;

	byteRangeAccessSupported: boolean;

	contentLength: number;

	contentType: string;

	entireLengthAvailableOnDemand: boolean;

	renewalDate: Date;
}

declare class AVAssetResourceLoadingDataRequest extends NSObject {

	static alloc(): AVAssetResourceLoadingDataRequest; // inherited from NSObject

	static new(): AVAssetResourceLoadingDataRequest; // inherited from NSObject

	readonly currentOffset: number;

	readonly requestedLength: number;

	readonly requestedOffset: number;

	readonly requestsAllDataToEndOfResource: boolean;

	respondWithData(data: NSData): void;
}

declare class AVAssetResourceLoadingRequest extends NSObject {

	static alloc(): AVAssetResourceLoadingRequest; // inherited from NSObject

	static new(): AVAssetResourceLoadingRequest; // inherited from NSObject

	readonly cancelled: boolean;

	readonly contentInformationRequest: AVAssetResourceLoadingContentInformationRequest;

	readonly dataRequest: AVAssetResourceLoadingDataRequest;

	readonly finished: boolean;

	redirect: NSURLRequest;

	readonly request: NSURLRequest;

	readonly requestor: AVAssetResourceLoadingRequestor;

	response: NSURLResponse;

	finishLoading(): void;

	finishLoadingWithError(error: NSError): void;

	finishLoadingWithResponseDataRedirect(response: NSURLResponse, data: NSData, redirect: NSURLRequest): void;

	persistentContentKeyFromKeyVendorResponseOptionsError(keyVendorResponse: NSData, options: NSDictionary<string, any>): NSData;

	streamingContentKeyRequestDataForAppContentIdentifierOptionsError(appIdentifier: NSData, contentIdentifier: NSData, options: NSDictionary<string, any>): NSData;
}

declare var AVAssetResourceLoadingRequestStreamingContentKeyRequestRequiresPersistentKey: string;

declare class AVAssetResourceLoadingRequestor extends NSObject {

	static alloc(): AVAssetResourceLoadingRequestor; // inherited from NSObject

	static new(): AVAssetResourceLoadingRequestor; // inherited from NSObject

	readonly providesExpiredSessionReports: boolean;
}

declare class AVAssetResourceRenewalRequest extends AVAssetResourceLoadingRequest {

	static alloc(): AVAssetResourceRenewalRequest; // inherited from NSObject

	static new(): AVAssetResourceRenewalRequest; // inherited from NSObject
}

declare class AVAssetSegmentReport extends NSObject {

	static alloc(): AVAssetSegmentReport; // inherited from NSObject

	static new(): AVAssetSegmentReport; // inherited from NSObject

	readonly segmentType: AVAssetSegmentType;

	readonly trackReports: NSArray<AVAssetSegmentTrackReport>;
}

declare class AVAssetSegmentReportSampleInformation extends NSObject {

	static alloc(): AVAssetSegmentReportSampleInformation; // inherited from NSObject

	static new(): AVAssetSegmentReportSampleInformation; // inherited from NSObject

	readonly isSyncSample: boolean;

	readonly length: number;

	readonly offset: number;

	readonly presentationTimeStamp: CMTime;
}

declare class AVAssetSegmentTrackReport extends NSObject {

	static alloc(): AVAssetSegmentTrackReport; // inherited from NSObject

	static new(): AVAssetSegmentTrackReport; // inherited from NSObject

	readonly duration: CMTime;

	readonly earliestPresentationTimeStamp: CMTime;

	readonly firstVideoSampleInformation: AVAssetSegmentReportSampleInformation;

	readonly mediaType: string;

	readonly trackID: number;
}

declare const enum AVAssetSegmentType {

	Initialization = 1,

	Separable = 2
}

declare class AVAssetTrack extends NSObject implements AVAsynchronousKeyValueLoading, NSCopying {

	static alloc(): AVAssetTrack; // inherited from NSObject

	static new(): AVAssetTrack; // inherited from NSObject

	readonly asset: AVAsset;

	readonly availableMetadataFormats: NSArray<string>;

	readonly availableTrackAssociationTypes: NSArray<string>;

	readonly canProvideSampleCursors: boolean;

	readonly commonMetadata: NSArray<AVMetadataItem>;

	readonly decodable: boolean;

	readonly enabled: boolean;

	readonly estimatedDataRate: number;

	readonly extendedLanguageTag: string;

	readonly formatDescriptions: NSArray<any>;

	readonly hasAudioSampleDependencies: boolean;

	readonly languageCode: string;

	readonly mediaType: string;

	readonly metadata: NSArray<AVMetadataItem>;

	readonly minFrameDuration: CMTime;

	readonly naturalSize: CGSize;

	readonly naturalTimeScale: number;

	readonly nominalFrameRate: number;

	readonly playable: boolean;

	readonly preferredTransform: CGAffineTransform;

	readonly preferredVolume: number;

	readonly requiresFrameReordering: boolean;

	readonly segments: NSArray<AVAssetTrackSegment>;

	readonly selfContained: boolean;

	readonly timeRange: CMTimeRange;

	readonly totalSampleDataLength: number;

	readonly trackID: number;

	associatedTracksOfType(trackAssociationType: string): NSArray<AVAssetTrack>;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	hasMediaCharacteristic(mediaCharacteristic: string): boolean;

	loadAssociatedTracksOfTypeCompletionHandler(trackAssociationType: string, completionHandler: (p1: NSArray<AVAssetTrack>, p2: NSError) => void): void;

	loadMetadataForFormatCompletionHandler(format: string, completionHandler: (p1: NSArray<AVMetadataItem>, p2: NSError) => void): void;

	loadSamplePresentationTimeForTrackTimeCompletionHandler(trackTime: CMTime, completionHandler: (p1: CMTime, p2: NSError) => void): void;

	loadSegmentForTrackTimeCompletionHandler(trackTime: CMTime, completionHandler: (p1: AVAssetTrackSegment, p2: NSError) => void): void;

	loadValuesAsynchronouslyForKeysCompletionHandler(keys: NSArray<string> | string[], handler: () => void): void;

	makeSampleCursorAtFirstSampleInDecodeOrder(): AVSampleCursor;

	makeSampleCursorAtLastSampleInDecodeOrder(): AVSampleCursor;

	makeSampleCursorWithPresentationTimeStamp(presentationTimeStamp: CMTime): AVSampleCursor;

	metadataForFormat(format: string): NSArray<AVMetadataItem>;

	samplePresentationTimeForTrackTime(trackTime: CMTime): CMTime;

	segmentForTrackTime(trackTime: CMTime): AVAssetTrackSegment;

	statusOfValueForKeyError(key: string): AVKeyValueStatus;
}

declare class AVAssetTrackGroup extends NSObject implements NSCopying {

	static alloc(): AVAssetTrackGroup; // inherited from NSObject

	static new(): AVAssetTrackGroup; // inherited from NSObject

	readonly trackIDs: NSArray<number>;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare const enum AVAssetTrackGroupOutputHandling {

	None = 0,

	PreserveAlternateTracks = 1,

	DefaultPolicy = 0
}

declare class AVAssetTrackSegment extends NSObject {

	static alloc(): AVAssetTrackSegment; // inherited from NSObject

	static new(): AVAssetTrackSegment; // inherited from NSObject

	readonly empty: boolean;

	readonly timeMapping: CMTimeMapping;
}

declare var AVAssetTrackSegmentsDidChangeNotification: string;

declare var AVAssetTrackTimeRangeDidChangeNotification: string;

declare var AVAssetTrackTrackAssociationsDidChangeNotification: string;

declare class AVAssetVariant extends NSObject {

	static alloc(): AVAssetVariant; // inherited from NSObject

	static new(): AVAssetVariant; // inherited from NSObject

	readonly audioAttributes: AVAssetVariantAudioAttributes;

	readonly averageBitRate: number;

	readonly peakBitRate: number;

	readonly videoAttributes: AVAssetVariantVideoAttributes;
}

declare class AVAssetVariantAudioAttributes extends NSObject {

	static alloc(): AVAssetVariantAudioAttributes; // inherited from NSObject

	static new(): AVAssetVariantAudioAttributes; // inherited from NSObject

	readonly formatIDs: NSArray<number>;

	renditionSpecificAttributesForMediaOption(mediaSelectionOption: AVMediaSelectionOption): AVAssetVariantAudioRenditionSpecificAttributes;
}

declare class AVAssetVariantAudioRenditionSpecificAttributes extends NSObject {

	static alloc(): AVAssetVariantAudioRenditionSpecificAttributes; // inherited from NSObject

	static new(): AVAssetVariantAudioRenditionSpecificAttributes; // inherited from NSObject

	readonly binaural: boolean;

	readonly channelCount: number;

	readonly downmix: boolean;

	readonly immersive: boolean;
}

declare class AVAssetVariantQualifier extends NSObject implements NSCopying {

	static alloc(): AVAssetVariantQualifier; // inherited from NSObject

	static assetVariantQualifierWithPredicate(predicate: NSPredicate): AVAssetVariantQualifier;

	static assetVariantQualifierWithVariant(variant: AVAssetVariant): AVAssetVariantQualifier;

	static new(): AVAssetVariantQualifier; // inherited from NSObject

	static predicateForBinauralAudioMediaSelectionOption(isBinauralAudio: boolean, mediaSelectionOption: AVMediaSelectionOption): NSPredicate;

	static predicateForChannelCountMediaSelectionOptionOperatorType(channelCount: number, mediaSelectionOption: AVMediaSelectionOption, operatorType: NSPredicateOperatorType): NSPredicate;

	static predicateForDownmixAudioMediaSelectionOption(isDownmixAudio: boolean, mediaSelectionOption: AVMediaSelectionOption): NSPredicate;

	static predicateForImmersiveAudioMediaSelectionOption(isImmersiveAudio: boolean, mediaSelectionOption: AVMediaSelectionOption): NSPredicate;

	static predicateForPresentationHeightOperatorType(height: number, operatorType: NSPredicateOperatorType): NSPredicate;

	static predicateForPresentationWidthOperatorType(width: number, operatorType: NSPredicateOperatorType): NSPredicate;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare class AVAssetVariantVideoAttributes extends NSObject {

	static alloc(): AVAssetVariantVideoAttributes; // inherited from NSObject

	static new(): AVAssetVariantVideoAttributes; // inherited from NSObject

	readonly codecTypes: NSArray<number>;

	readonly nominalFrameRate: number;

	readonly presentationSize: CGSize;

	readonly videoLayoutAttributes: NSArray<AVAssetVariantVideoLayoutAttributes>;

	readonly videoRange: string;
}

declare class AVAssetVariantVideoLayoutAttributes extends NSObject {

	static alloc(): AVAssetVariantVideoLayoutAttributes; // inherited from NSObject

	static new(): AVAssetVariantVideoLayoutAttributes; // inherited from NSObject

	readonly stereoViewComponents: CMStereoViewComponents;
}

declare var AVAssetWasDefragmentedNotification: string;

declare class AVAssetWriter extends NSObject {

	static alloc(): AVAssetWriter; // inherited from NSObject

	static assetWriterWithURLFileTypeError(outputURL: NSURL, outputFileType: string): AVAssetWriter;

	static new(): AVAssetWriter; // inherited from NSObject

	readonly availableMediaTypes: NSArray<string>;

	delegate: AVAssetWriterDelegate;

	directoryForTemporaryFiles: NSURL;

	readonly error: NSError;

	initialMovieFragmentInterval: CMTime;

	initialMovieFragmentSequenceNumber: number;

	initialSegmentStartTime: CMTime;

	readonly inputGroups: NSArray<AVAssetWriterInputGroup>;

	readonly inputs: NSArray<AVAssetWriterInput>;

	metadata: NSArray<AVMetadataItem>;

	movieFragmentInterval: CMTime;

	movieTimeScale: number;

	readonly outputFileType: string;

	outputFileTypeProfile: string;

	readonly outputURL: NSURL;

	overallDurationHint: CMTime;

	preferredOutputSegmentInterval: CMTime;

	producesCombinableFragments: boolean;

	shouldOptimizeForNetworkUse: boolean;

	readonly status: AVAssetWriterStatus;

	constructor(o: { contentType: UTType; });

	constructor(o: { URL: NSURL; fileType: string; });

	addInput(input: AVAssetWriterInput): void;

	addInputGroup(inputGroup: AVAssetWriterInputGroup): void;

	canAddInput(input: AVAssetWriterInput): boolean;

	canAddInputGroup(inputGroup: AVAssetWriterInputGroup): boolean;

	canApplyOutputSettingsForMediaType(outputSettings: NSDictionary<string, any>, mediaType: string): boolean;

	cancelWriting(): void;

	endSessionAtSourceTime(endTime: CMTime): void;

	finishWriting(): boolean;

	finishWritingWithCompletionHandler(handler: () => void): void;

	flushSegment(): void;

	initWithContentType(outputContentType: UTType): this;

	initWithURLFileTypeError(outputURL: NSURL, outputFileType: string): this;

	startSessionAtSourceTime(startTime: CMTime): void;

	startWriting(): boolean;
}

interface AVAssetWriterDelegate extends NSObjectProtocol {

	assetWriterDidOutputSegmentDataSegmentType?(writer: AVAssetWriter, segmentData: NSData, segmentType: AVAssetSegmentType): void;

	assetWriterDidOutputSegmentDataSegmentTypeSegmentReport?(writer: AVAssetWriter, segmentData: NSData, segmentType: AVAssetSegmentType, segmentReport: AVAssetSegmentReport): void;
}
declare var AVAssetWriterDelegate: {

	prototype: AVAssetWriterDelegate;
};

declare class AVAssetWriterInput extends NSObject {

	static alloc(): AVAssetWriterInput; // inherited from NSObject

	static assetWriterInputWithMediaTypeOutputSettings(mediaType: string, outputSettings: NSDictionary<string, any>): AVAssetWriterInput;

	static assetWriterInputWithMediaTypeOutputSettingsSourceFormatHint(mediaType: string, outputSettings: NSDictionary<string, any>, sourceFormatHint: any): AVAssetWriterInput;

	static new(): AVAssetWriterInput; // inherited from NSObject

	readonly canPerformMultiplePasses: boolean;

	readonly currentPassDescription: AVAssetWriterInputPassDescription;

	expectsMediaDataInRealTime: boolean;

	extendedLanguageTag: string;

	languageCode: string;

	marksOutputTrackAsEnabled: boolean;

	mediaDataLocation: string;

	mediaTimeScale: number;

	readonly mediaType: string;

	metadata: NSArray<AVMetadataItem>;

	naturalSize: CGSize;

	readonly outputSettings: NSDictionary<string, any>;

	performsMultiPassEncodingIfSupported: boolean;

	preferredMediaChunkAlignment: number;

	preferredMediaChunkDuration: CMTime;

	preferredVolume: number;

	readonly readyForMoreMediaData: boolean;

	sampleReferenceBaseURL: NSURL;

	readonly sourceFormatHint: any;

	transform: CGAffineTransform;

	constructor(o: { mediaType: string; outputSettings: NSDictionary<string, any>; });

	constructor(o: { mediaType: string; outputSettings: NSDictionary<string, any>; sourceFormatHint: any; });

	addTrackAssociationWithTrackOfInputType(input: AVAssetWriterInput, trackAssociationType: string): void;

	appendSampleBuffer(sampleBuffer: any): boolean;

	canAddTrackAssociationWithTrackOfInputType(input: AVAssetWriterInput, trackAssociationType: string): boolean;

	initWithMediaTypeOutputSettings(mediaType: string, outputSettings: NSDictionary<string, any>): this;

	initWithMediaTypeOutputSettingsSourceFormatHint(mediaType: string, outputSettings: NSDictionary<string, any>, sourceFormatHint: any): this;

	markAsFinished(): void;

	markCurrentPassAsFinished(): void;

	requestMediaDataWhenReadyOnQueueUsingBlock(queue: interop.Pointer | interop.Reference<any>, block: () => void): void;

	respondToEachPassDescriptionOnQueueUsingBlock(queue: interop.Pointer | interop.Reference<any>, block: () => void): void;
}

declare class AVAssetWriterInputGroup extends AVMediaSelectionGroup {

	static alloc(): AVAssetWriterInputGroup; // inherited from NSObject

	static assetWriterInputGroupWithInputsDefaultInput(inputs: NSArray<AVAssetWriterInput> | AVAssetWriterInput[], defaultInput: AVAssetWriterInput): AVAssetWriterInputGroup;

	static new(): AVAssetWriterInputGroup; // inherited from NSObject

	readonly defaultInput: AVAssetWriterInput;

	readonly inputs: NSArray<AVAssetWriterInput>;

	constructor(o: { inputs: NSArray<AVAssetWriterInput> | AVAssetWriterInput[]; defaultInput: AVAssetWriterInput; });

	initWithInputsDefaultInput(inputs: NSArray<AVAssetWriterInput> | AVAssetWriterInput[], defaultInput: AVAssetWriterInput): this;
}

declare var AVAssetWriterInputMediaDataLocationBeforeMainMediaDataNotInterleaved: string;

declare var AVAssetWriterInputMediaDataLocationInterleavedWithMainMediaData: string;

declare class AVAssetWriterInputMetadataAdaptor extends NSObject {

	static alloc(): AVAssetWriterInputMetadataAdaptor; // inherited from NSObject

	static assetWriterInputMetadataAdaptorWithAssetWriterInput(input: AVAssetWriterInput): AVAssetWriterInputMetadataAdaptor;

	static new(): AVAssetWriterInputMetadataAdaptor; // inherited from NSObject

	readonly assetWriterInput: AVAssetWriterInput;

	constructor(o: { assetWriterInput: AVAssetWriterInput; });

	appendTimedMetadataGroup(timedMetadataGroup: AVTimedMetadataGroup): boolean;

	initWithAssetWriterInput(input: AVAssetWriterInput): this;
}

declare class AVAssetWriterInputPassDescription extends NSObject {

	static alloc(): AVAssetWriterInputPassDescription; // inherited from NSObject

	static new(): AVAssetWriterInputPassDescription; // inherited from NSObject

	readonly sourceTimeRanges: NSArray<NSValue>;
}

declare class AVAssetWriterInputPixelBufferAdaptor extends NSObject {

	static alloc(): AVAssetWriterInputPixelBufferAdaptor; // inherited from NSObject

	static assetWriterInputPixelBufferAdaptorWithAssetWriterInputSourcePixelBufferAttributes(input: AVAssetWriterInput, sourcePixelBufferAttributes: NSDictionary<string, any>): AVAssetWriterInputPixelBufferAdaptor;

	static new(): AVAssetWriterInputPixelBufferAdaptor; // inherited from NSObject

	readonly assetWriterInput: AVAssetWriterInput;

	readonly pixelBufferPool: any;

	readonly sourcePixelBufferAttributes: NSDictionary<string, any>;

	constructor(o: { assetWriterInput: AVAssetWriterInput; sourcePixelBufferAttributes: NSDictionary<string, any>; });

	appendPixelBufferWithPresentationTime(pixelBuffer: any, presentationTime: CMTime): boolean;

	initWithAssetWriterInputSourcePixelBufferAttributes(input: AVAssetWriterInput, sourcePixelBufferAttributes: NSDictionary<string, any>): this;
}

declare class AVAssetWriterInputTaggedPixelBufferGroupAdaptor extends NSObject {

	static alloc(): AVAssetWriterInputTaggedPixelBufferGroupAdaptor; // inherited from NSObject

	static assetWriterInputTaggedPixelBufferGroupAdaptorWithAssetWriterInputSourcePixelBufferAttributes(input: AVAssetWriterInput, sourcePixelBufferAttributes: NSDictionary<string, any>): AVAssetWriterInputTaggedPixelBufferGroupAdaptor;

	static new(): AVAssetWriterInputTaggedPixelBufferGroupAdaptor; // inherited from NSObject

	readonly assetWriterInput: AVAssetWriterInput;

	readonly pixelBufferPool: any;

	readonly sourcePixelBufferAttributes: NSDictionary<string, any>;

	constructor(o: { assetWriterInput: AVAssetWriterInput; sourcePixelBufferAttributes: NSDictionary<string, any>; });

	appendTaggedPixelBufferGroupWithPresentationTime(taggedPixelBufferGroup: any, presentationTime: CMTime): boolean;

	initWithAssetWriterInputSourcePixelBufferAttributes(input: AVAssetWriterInput, sourcePixelBufferAttributes: NSDictionary<string, any>): this;
}

declare const enum AVAssetWriterStatus {

	Unknown = 0,

	Writing = 1,

	Completed = 2,

	Failed = 3,

	Cancelled = 4
}

declare class AVAsynchronousCIImageFilteringRequest extends NSObject implements NSCopying {

	static alloc(): AVAsynchronousCIImageFilteringRequest; // inherited from NSObject

	static new(): AVAsynchronousCIImageFilteringRequest; // inherited from NSObject

	readonly compositionTime: CMTime;

	readonly renderSize: CGSize;

	readonly sourceImage: CIImage;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	finishWithError(error: NSError): void;

	finishWithImageContext(filteredImage: CIImage, context: CIContext): void;
}

interface AVAsynchronousKeyValueLoading {

	loadValuesAsynchronouslyForKeysCompletionHandler(keys: NSArray<string> | string[], handler: () => void): void;

	statusOfValueForKeyError(key: string): AVKeyValueStatus;
}
declare var AVAsynchronousKeyValueLoading: {

	prototype: AVAsynchronousKeyValueLoading;
};

declare class AVAsynchronousVideoCompositionRequest extends NSObject implements NSCopying {

	static alloc(): AVAsynchronousVideoCompositionRequest; // inherited from NSObject

	static new(): AVAsynchronousVideoCompositionRequest; // inherited from NSObject

	readonly compositionTime: CMTime;

	readonly renderContext: AVVideoCompositionRenderContext;

	readonly sourceSampleDataTrackIDs: NSArray<number>;

	readonly sourceTrackIDs: NSArray<number>;

	readonly videoCompositionInstruction: AVVideoCompositionInstructionProtocol;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	finishCancelledRequest(): void;

	finishWithComposedVideoFrame(composedVideoFrame: any): void;

	finishWithError(error: NSError): void;

	sourceFrameByTrackID(trackID: number): any;

	sourceSampleBufferByTrackID(trackID: number): any;

	sourceTimedMetadataByTrackID(trackID: number): AVTimedMetadataGroup;
}

declare class AVAudioMix extends NSObject implements NSCopying, NSMutableCopying {

	static alloc(): AVAudioMix; // inherited from NSObject

	static new(): AVAudioMix; // inherited from NSObject

	readonly inputParameters: NSArray<AVAudioMixInputParameters>;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	mutableCopyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare class AVAudioMixInputParameters extends NSObject implements NSCopying, NSMutableCopying {

	static alloc(): AVAudioMixInputParameters; // inherited from NSObject

	static new(): AVAudioMixInputParameters; // inherited from NSObject

	readonly audioTapProcessor: any;

	readonly audioTimePitchAlgorithm: string;

	readonly trackID: number;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	getVolumeRampForTimeStartVolumeEndVolumeTimeRange(time: CMTime, startVolume: interop.Pointer | interop.Reference<number>, endVolume: interop.Pointer | interop.Reference<number>, timeRange: interop.Pointer | interop.Reference<CMTimeRange>): boolean;

	mutableCopyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare const enum AVAudioSpatializationFormats {

	None = 0,

	MonoAndStereo = 3,

	Multichannel = 4,

	MonoStereoAndMultichannel = 7
}

declare var AVAudioTimePitchAlgorithmLowQualityZeroLatency: string;

declare var AVAudioTimePitchAlgorithmSpectral: string;

declare var AVAudioTimePitchAlgorithmTimeDomain: string;

declare var AVAudioTimePitchAlgorithmVarispeed: string;

declare const enum AVAuthorizationStatus {

	NotDetermined = 0,

	Restricted = 1,

	Denied = 2,

	Authorized = 3
}

declare class AVCameraCalibrationData extends NSObject {

	static alloc(): AVCameraCalibrationData; // inherited from NSObject

	static new(): AVCameraCalibrationData; // inherited from NSObject

	readonly extrinsicMatrix: simd_float4x3;

	readonly intrinsicMatrix: simd_float3x3;

	readonly intrinsicMatrixReferenceDimensions: CGSize;

	readonly inverseLensDistortionLookupTable: NSData;

	readonly lensDistortionCenter: CGPoint;

	readonly lensDistortionLookupTable: NSData;

	readonly pixelSize: number;
}

declare class AVCaptureAudioChannel extends NSObject {

	static alloc(): AVCaptureAudioChannel; // inherited from NSObject

	static new(): AVCaptureAudioChannel; // inherited from NSObject

	readonly averagePowerLevel: number;

	readonly peakHoldLevel: number;
}

declare class AVCaptureAudioDataOutput extends AVCaptureOutput {

	static alloc(): AVCaptureAudioDataOutput; // inherited from NSObject

	static new(): AVCaptureAudioDataOutput; // inherited from NSObject

	readonly sampleBufferCallbackQueue: interop.Pointer | interop.Reference<any>;

	readonly sampleBufferDelegate: AVCaptureAudioDataOutputSampleBufferDelegate;

	recommendedAudioSettingsForAssetWriterWithOutputFileType(outputFileType: string): NSDictionary<string, any>;

	setSampleBufferDelegateQueue(sampleBufferDelegate: AVCaptureAudioDataOutputSampleBufferDelegate, sampleBufferCallbackQueue: interop.Pointer | interop.Reference<any>): void;
}

interface AVCaptureAudioDataOutputSampleBufferDelegate extends NSObjectProtocol {

	captureOutputDidOutputSampleBufferFromConnection?(output: AVCaptureOutput, sampleBuffer: any, connection: AVCaptureConnection): void;
}
declare var AVCaptureAudioDataOutputSampleBufferDelegate: {

	prototype: AVCaptureAudioDataOutputSampleBufferDelegate;
};

declare class AVCaptureAutoExposureBracketedStillImageSettings extends AVCaptureBracketedStillImageSettings {

	static alloc(): AVCaptureAutoExposureBracketedStillImageSettings; // inherited from NSObject

	static autoExposureSettingsWithExposureTargetBias(exposureTargetBias: number): AVCaptureAutoExposureBracketedStillImageSettings;

	static new(): AVCaptureAutoExposureBracketedStillImageSettings; // inherited from NSObject

	readonly exposureTargetBias: number;
}

declare const enum AVCaptureAutoFocusRangeRestriction {

	None = 0,

	Near = 1,

	Far = 2
}

declare const enum AVCaptureAutoFocusSystem {

	None = 0,

	ContrastDetection = 1,

	PhaseDetection = 2
}

declare class AVCaptureBracketedStillImageSettings extends NSObject {

	static alloc(): AVCaptureBracketedStillImageSettings; // inherited from NSObject

	static new(): AVCaptureBracketedStillImageSettings; // inherited from NSObject
}

declare const enum AVCaptureCenterStageControlMode {

	User = 0,

	App = 1,

	Cooperative = 2
}

declare const enum AVCaptureColorSpace {

	sRGB = 0,

	P3_D65 = 1,

	HLG_BT2020 = 2,

	AppleLog = 3
}

declare class AVCaptureConnection extends NSObject {

	static alloc(): AVCaptureConnection; // inherited from NSObject

	static connectionWithInputPortVideoPreviewLayer(port: AVCaptureInputPort, layer: AVCaptureVideoPreviewLayer): AVCaptureConnection;

	static connectionWithInputPortsOutput(ports: NSArray<AVCaptureInputPort> | AVCaptureInputPort[], output: AVCaptureOutput): AVCaptureConnection;

	static new(): AVCaptureConnection; // inherited from NSObject

	readonly active: boolean;

	readonly activeVideoStabilizationMode: AVCaptureVideoStabilizationMode;

	readonly audioChannels: NSArray<AVCaptureAudioChannel>;

	automaticallyAdjustsVideoMirroring: boolean;

	cameraIntrinsicMatrixDeliveryEnabled: boolean;

	readonly cameraIntrinsicMatrixDeliverySupported: boolean;

	enabled: boolean;

	enablesVideoStabilizationWhenAvailable: boolean;

	readonly inputPorts: NSArray<AVCaptureInputPort>;

	readonly output: AVCaptureOutput;

	preferredVideoStabilizationMode: AVCaptureVideoStabilizationMode;

	readonly supportsVideoMaxFrameDuration: boolean;

	readonly supportsVideoMinFrameDuration: boolean;

	readonly supportsVideoMirroring: boolean;

	readonly supportsVideoOrientation: boolean;

	readonly supportsVideoStabilization: boolean;

	videoMaxFrameDuration: CMTime;

	readonly videoMaxScaleAndCropFactor: number;

	videoMinFrameDuration: CMTime;

	videoMirrored: boolean;

	videoOrientation: AVCaptureVideoOrientation;

	readonly videoPreviewLayer: AVCaptureVideoPreviewLayer;

	videoRotationAngle: number;

	videoScaleAndCropFactor: number;

	readonly videoStabilizationEnabled: boolean;

	constructor(o: { inputPort: AVCaptureInputPort; videoPreviewLayer: AVCaptureVideoPreviewLayer; });

	constructor(o: { inputPorts: NSArray<AVCaptureInputPort> | AVCaptureInputPort[]; output: AVCaptureOutput; });

	initWithInputPortVideoPreviewLayer(port: AVCaptureInputPort, layer: AVCaptureVideoPreviewLayer): this;

	initWithInputPortsOutput(ports: NSArray<AVCaptureInputPort> | AVCaptureInputPort[], output: AVCaptureOutput): this;

	isVideoRotationAngleSupported(videoRotationAngle: number): boolean;
}

declare class AVCaptureDataOutputSynchronizer extends NSObject {

	static alloc(): AVCaptureDataOutputSynchronizer; // inherited from NSObject

	static new(): AVCaptureDataOutputSynchronizer; // inherited from NSObject

	readonly dataOutputs: NSArray<AVCaptureOutput>;

	readonly delegate: AVCaptureDataOutputSynchronizerDelegate;

	readonly delegateCallbackQueue: interop.Pointer | interop.Reference<any>;

	constructor(o: { dataOutputs: NSArray<AVCaptureOutput> | AVCaptureOutput[]; });

	initWithDataOutputs(dataOutputs: NSArray<AVCaptureOutput> | AVCaptureOutput[]): this;

	setDelegateQueue(delegate: AVCaptureDataOutputSynchronizerDelegate, delegateCallbackQueue: interop.Pointer | interop.Reference<any>): void;
}

interface AVCaptureDataOutputSynchronizerDelegate extends NSObjectProtocol {

	dataOutputSynchronizerDidOutputSynchronizedDataCollection(synchronizer: AVCaptureDataOutputSynchronizer, synchronizedDataCollection: AVCaptureSynchronizedDataCollection): void;
}
declare var AVCaptureDataOutputSynchronizerDelegate: {

	prototype: AVCaptureDataOutputSynchronizerDelegate;
};

declare class AVCaptureDeferredPhotoProxy extends AVCapturePhoto {

	static alloc(): AVCaptureDeferredPhotoProxy; // inherited from NSObject

	static new(): AVCaptureDeferredPhotoProxy; // inherited from NSObject
}

declare class AVCaptureDepthDataOutput extends AVCaptureOutput {

	static alloc(): AVCaptureDepthDataOutput; // inherited from NSObject

	static new(): AVCaptureDepthDataOutput; // inherited from NSObject

	alwaysDiscardsLateDepthData: boolean;

	readonly delegate: AVCaptureDepthDataOutputDelegate;

	readonly delegateCallbackQueue: interop.Pointer | interop.Reference<any>;

	filteringEnabled: boolean;

	setDelegateCallbackQueue(delegate: AVCaptureDepthDataOutputDelegate, callbackQueue: interop.Pointer | interop.Reference<any>): void;
}

interface AVCaptureDepthDataOutputDelegate extends NSObjectProtocol {

	depthDataOutputDidDropDepthDataTimestampConnectionReason?(output: AVCaptureDepthDataOutput, depthData: AVDepthData, timestamp: CMTime, connection: AVCaptureConnection, reason: AVCaptureOutputDataDroppedReason): void;

	depthDataOutputDidOutputDepthDataTimestampConnection?(output: AVCaptureDepthDataOutput, depthData: AVDepthData, timestamp: CMTime, connection: AVCaptureConnection): void;
}
declare var AVCaptureDepthDataOutputDelegate: {

	prototype: AVCaptureDepthDataOutputDelegate;
};

declare class AVCaptureDevice extends NSObject {

	static alloc(): AVCaptureDevice; // inherited from NSObject

	static authorizationStatusForMediaType(mediaType: string): AVAuthorizationStatus;

	static defaultDeviceWithDeviceTypeMediaTypePosition(deviceType: string, mediaType: string, position: AVCaptureDevicePosition): AVCaptureDevice;

	static defaultDeviceWithMediaType(mediaType: string): AVCaptureDevice;

	static deviceWithUniqueID(deviceUniqueID: string): AVCaptureDevice;

	static devices(): NSArray<AVCaptureDevice>;

	static devicesWithMediaType(mediaType: string): NSArray<AVCaptureDevice>;

	static extrinsicMatrixFromDeviceToDevice(fromDevice: AVCaptureDevice, toDevice: AVCaptureDevice): NSData;

	static new(): AVCaptureDevice; // inherited from NSObject

	static requestAccessForMediaTypeCompletionHandler(mediaType: string, handler: (p1: boolean) => void): void;

	static showSystemUserInterface(systemUserInterface: AVCaptureSystemUserInterface): void;

	readonly ISO: number;

	activeColorSpace: AVCaptureColorSpace;

	activeDepthDataFormat: AVCaptureDeviceFormat;

	activeDepthDataMinFrameDuration: CMTime;

	activeFormat: AVCaptureDeviceFormat;

	activeMaxExposureDuration: CMTime;

	readonly activePrimaryConstituentDevice: AVCaptureDevice;

	readonly activePrimaryConstituentDeviceRestrictedSwitchingBehaviorConditions: AVCapturePrimaryConstituentDeviceRestrictedSwitchingBehaviorConditions;

	readonly activePrimaryConstituentDeviceSwitchingBehavior: AVCapturePrimaryConstituentDeviceSwitchingBehavior;

	activeVideoMaxFrameDuration: CMTime;

	activeVideoMinFrameDuration: CMTime;

	readonly adjustingExposure: boolean;

	readonly adjustingFocus: boolean;

	readonly adjustingWhiteBalance: boolean;

	autoFocusRangeRestriction: AVCaptureAutoFocusRangeRestriction;

	readonly autoFocusRangeRestrictionSupported: boolean;

	automaticallyAdjustsFaceDrivenAutoExposureEnabled: boolean;

	automaticallyAdjustsFaceDrivenAutoFocusEnabled: boolean;

	automaticallyAdjustsVideoHDREnabled: boolean;

	automaticallyEnablesLowLightBoostWhenAvailable: boolean;

	readonly availableReactionTypes: NSSet<string>;

	readonly canPerformReactionEffects: boolean;

	readonly centerStageActive: boolean;

	centerStageRectOfInterest: CGRect;

	readonly companionDeskViewCamera: AVCaptureDevice;

	readonly connected: boolean;

	readonly constituentDevices: NSArray<AVCaptureDevice>;

	readonly continuityCamera: boolean;

	readonly deviceType: string;

	readonly deviceWhiteBalanceGains: AVCaptureWhiteBalanceGains;

	readonly dualCameraSwitchOverVideoZoomFactor: number;

	readonly exposureDuration: CMTime;

	exposureMode: AVCaptureExposureMode;

	exposurePointOfInterest: CGPoint;

	readonly exposurePointOfInterestSupported: boolean;

	readonly exposureTargetBias: number;

	readonly exposureTargetOffset: number;

	faceDrivenAutoExposureEnabled: boolean;

	faceDrivenAutoFocusEnabled: boolean;

	fallbackPrimaryConstituentDevices: NSArray<AVCaptureDevice>;

	readonly flashActive: boolean;

	readonly flashAvailable: boolean;

	flashMode: AVCaptureFlashMode;

	focusMode: AVCaptureFocusMode;

	focusPointOfInterest: CGPoint;

	readonly focusPointOfInterestSupported: boolean;

	readonly formats: NSArray<AVCaptureDeviceFormat>;

	geometricDistortionCorrectionEnabled: boolean;

	readonly geometricDistortionCorrectionSupported: boolean;

	globalToneMappingEnabled: boolean;

	readonly grayWorldDeviceWhiteBalanceGains: AVCaptureWhiteBalanceGains;

	readonly hasFlash: boolean;

	readonly hasTorch: boolean;

	readonly lensAperture: number;

	readonly lensPosition: number;

	readonly localizedName: string;

	readonly lockingFocusWithCustomLensPositionSupported: boolean;

	readonly lockingWhiteBalanceWithCustomDeviceGainsSupported: boolean;

	readonly lowLightBoostEnabled: boolean;

	readonly lowLightBoostSupported: boolean;

	readonly manufacturer: string;

	readonly maxAvailableVideoZoomFactor: number;

	readonly maxExposureTargetBias: number;

	readonly maxWhiteBalanceGain: number;

	readonly minAvailableVideoZoomFactor: number;

	readonly minExposureTargetBias: number;

	readonly minimumFocusDistance: number;

	readonly modelID: string;

	readonly portraitEffectActive: boolean;

	readonly position: AVCaptureDevicePosition;

	readonly primaryConstituentDeviceRestrictedSwitchingBehaviorConditions: AVCapturePrimaryConstituentDeviceRestrictedSwitchingBehaviorConditions;

	readonly primaryConstituentDeviceSwitchingBehavior: AVCapturePrimaryConstituentDeviceSwitchingBehavior;

	readonly rampingVideoZoom: boolean;

	readonly reactionEffectsInProgress: NSArray<AVCaptureReactionEffectState>;

	smoothAutoFocusEnabled: boolean;

	readonly smoothAutoFocusSupported: boolean;

	readonly studioLightActive: boolean;

	subjectAreaChangeMonitoringEnabled: boolean;

	readonly supportedFallbackPrimaryConstituentDevices: NSArray<AVCaptureDevice>;

	readonly suspended: boolean;

	readonly systemPressureState: AVCaptureSystemPressureState;

	readonly torchActive: boolean;

	readonly torchAvailable: boolean;

	readonly torchLevel: number;

	torchMode: AVCaptureTorchMode;

	readonly uniqueID: string;

	videoHDREnabled: boolean;

	videoZoomFactor: number;

	readonly virtualDevice: boolean;

	readonly virtualDeviceSwitchOverVideoZoomFactors: NSArray<number>;

	whiteBalanceMode: AVCaptureWhiteBalanceMode;

	static readonly activeMicrophoneMode: AVCaptureMicrophoneMode;

	static centerStageControlMode: AVCaptureCenterStageControlMode;

	static centerStageEnabled: boolean;

	static readonly portraitEffectEnabled: boolean;

	static readonly preferredMicrophoneMode: AVCaptureMicrophoneMode;

	static readonly reactionEffectGesturesEnabled: boolean;

	static readonly reactionEffectsEnabled: boolean;

	static readonly studioLightEnabled: boolean;

	static readonly systemPreferredCamera: AVCaptureDevice;

	static userPreferredCamera: AVCaptureDevice;

	cancelVideoZoomRamp(): void;

	chromaticityValuesForDeviceWhiteBalanceGains(whiteBalanceGains: AVCaptureWhiteBalanceGains): AVCaptureWhiteBalanceChromaticityValues;

	deviceWhiteBalanceGainsForChromaticityValues(chromaticityValues: AVCaptureWhiteBalanceChromaticityValues): AVCaptureWhiteBalanceGains;

	deviceWhiteBalanceGainsForTemperatureAndTintValues(tempAndTintValues: AVCaptureWhiteBalanceTemperatureAndTintValues): AVCaptureWhiteBalanceGains;

	hasMediaType(mediaType: string): boolean;

	isExposureModeSupported(exposureMode: AVCaptureExposureMode): boolean;

	isFlashModeSupported(flashMode: AVCaptureFlashMode): boolean;

	isFocusModeSupported(focusMode: AVCaptureFocusMode): boolean;

	isTorchModeSupported(torchMode: AVCaptureTorchMode): boolean;

	isWhiteBalanceModeSupported(whiteBalanceMode: AVCaptureWhiteBalanceMode): boolean;

	lockForConfiguration(): boolean;

	performEffectForReaction(reactionType: string): void;

	rampToVideoZoomFactorWithRate(factor: number, rate: number): void;

	setExposureModeCustomWithDurationISOCompletionHandler(duration: CMTime, ISO: number, handler: (p1: CMTime) => void): void;

	setExposureTargetBiasCompletionHandler(bias: number, handler: (p1: CMTime) => void): void;

	setFocusModeLockedWithLensPositionCompletionHandler(lensPosition: number, handler: (p1: CMTime) => void): void;

	setPrimaryConstituentDeviceSwitchingBehaviorRestrictedSwitchingBehaviorConditions(switchingBehavior: AVCapturePrimaryConstituentDeviceSwitchingBehavior, restrictedSwitchingBehaviorConditions: AVCapturePrimaryConstituentDeviceRestrictedSwitchingBehaviorConditions): void;

	setTorchModeOnWithLevelError(torchLevel: number): boolean;

	setWhiteBalanceModeLockedWithDeviceWhiteBalanceGainsCompletionHandler(whiteBalanceGains: AVCaptureWhiteBalanceGains, handler: (p1: CMTime) => void): void;

	supportsAVCaptureSessionPreset(preset: string): boolean;

	temperatureAndTintValuesForDeviceWhiteBalanceGains(whiteBalanceGains: AVCaptureWhiteBalanceGains): AVCaptureWhiteBalanceTemperatureAndTintValues;

	unlockForConfiguration(): void;
}

declare class AVCaptureDeviceDiscoverySession extends NSObject {

	static alloc(): AVCaptureDeviceDiscoverySession; // inherited from NSObject

	static discoverySessionWithDeviceTypesMediaTypePosition(deviceTypes: NSArray<string> | string[], mediaType: string, position: AVCaptureDevicePosition): AVCaptureDeviceDiscoverySession;

	static new(): AVCaptureDeviceDiscoverySession; // inherited from NSObject

	readonly devices: NSArray<AVCaptureDevice>;

	readonly supportedMultiCamDeviceSets: NSArray<NSSet<AVCaptureDevice>>;
}

declare class AVCaptureDeviceFormat extends NSObject {

	static alloc(): AVCaptureDeviceFormat; // inherited from NSObject

	static new(): AVCaptureDeviceFormat; // inherited from NSObject

	readonly autoFocusSystem: AVCaptureAutoFocusSystem;

	readonly centerStageSupported: boolean;

	readonly formatDescription: any;

	readonly geometricDistortionCorrectedVideoFieldOfView: number;

	readonly globalToneMappingSupported: boolean;

	readonly highPhotoQualitySupported: boolean;

	readonly highResolutionStillImageDimensions: CMVideoDimensions;

	readonly highestPhotoQualitySupported: boolean;

	readonly maxExposureDuration: CMTime;

	readonly maxISO: number;

	readonly mediaType: string;

	readonly minExposureDuration: CMTime;

	readonly minISO: number;

	readonly multiCamSupported: boolean;

	readonly portraitEffectSupported: boolean;

	readonly portraitEffectsMatteStillImageDeliverySupported: boolean;

	readonly reactionEffectsSupported: boolean;

	readonly secondaryNativeResolutionZoomFactors: NSArray<number>;

	readonly studioLightSupported: boolean;

	readonly supportedColorSpaces: NSArray<number>;

	readonly supportedDepthDataFormats: NSArray<AVCaptureDeviceFormat>;

	readonly supportedMaxPhotoDimensions: NSArray<NSValue>;

	readonly supportedVideoZoomFactorsForDepthDataDelivery: NSArray<number>;

	readonly supportedVideoZoomRangesForDepthDataDelivery: NSArray<AVZoomRange>;

	readonly unsupportedCaptureOutputClasses: NSArray<typeof NSObject>;

	readonly videoBinned: boolean;

	readonly videoFieldOfView: number;

	readonly videoFrameRateRangeForCenterStage: AVFrameRateRange;

	readonly videoFrameRateRangeForPortraitEffect: AVFrameRateRange;

	readonly videoFrameRateRangeForReactionEffectsInProgress: AVFrameRateRange;

	readonly videoFrameRateRangeForStudioLight: AVFrameRateRange;

	readonly videoHDRSupported: boolean;

	readonly videoMaxZoomFactor: number;

	readonly videoMaxZoomFactorForCenterStage: number;

	readonly videoMaxZoomFactorForDepthDataDelivery: number;

	readonly videoMinZoomFactorForCenterStage: number;

	readonly videoMinZoomFactorForDepthDataDelivery: number;

	readonly videoStabilizationSupported: boolean;

	readonly videoSupportedFrameRateRanges: NSArray<AVFrameRateRange>;

	readonly videoZoomFactorUpscaleThreshold: number;

	readonly zoomFactorsOutsideOfVideoZoomRangesForDepthDeliverySupported: boolean;

	isVideoStabilizationModeSupported(videoStabilizationMode: AVCaptureVideoStabilizationMode): boolean;
}

declare class AVCaptureDeviceInput extends AVCaptureInput {

	static alloc(): AVCaptureDeviceInput; // inherited from NSObject

	static deviceInputWithDeviceError(device: AVCaptureDevice): AVCaptureDeviceInput;

	static new(): AVCaptureDeviceInput; // inherited from NSObject

	readonly device: AVCaptureDevice;

	unifiedAutoExposureDefaultsEnabled: boolean;

	videoMinFrameDurationOverride: CMTime;

	constructor(o: { device: AVCaptureDevice; });

	initWithDeviceError(device: AVCaptureDevice): this;

	portsWithMediaTypeSourceDeviceTypeSourceDevicePosition(mediaType: string, sourceDeviceType: string, sourceDevicePosition: AVCaptureDevicePosition): NSArray<AVCaptureInputPort>;
}

declare const enum AVCaptureDevicePosition {

	Unspecified = 0,

	Back = 1,

	Front = 2
}

declare class AVCaptureDeviceRotationCoordinator extends NSObject {

	static alloc(): AVCaptureDeviceRotationCoordinator; // inherited from NSObject

	static new(): AVCaptureDeviceRotationCoordinator; // inherited from NSObject

	readonly device: AVCaptureDevice;

	readonly previewLayer: CALayer;

	readonly videoRotationAngleForHorizonLevelCapture: number;

	readonly videoRotationAngleForHorizonLevelPreview: number;

	constructor(o: { device: AVCaptureDevice; previewLayer: CALayer; });

	initWithDevicePreviewLayer(device: AVCaptureDevice, previewLayer: CALayer): this;
}

declare var AVCaptureDeviceSubjectAreaDidChangeNotification: string;

declare var AVCaptureDeviceTypeBuiltInDualCamera: string;

declare var AVCaptureDeviceTypeBuiltInDualWideCamera: string;

declare var AVCaptureDeviceTypeBuiltInDuoCamera: string;

declare var AVCaptureDeviceTypeBuiltInLiDARDepthCamera: string;

declare var AVCaptureDeviceTypeBuiltInMicrophone: string;

declare var AVCaptureDeviceTypeBuiltInTelephotoCamera: string;

declare var AVCaptureDeviceTypeBuiltInTripleCamera: string;

declare var AVCaptureDeviceTypeBuiltInTrueDepthCamera: string;

declare var AVCaptureDeviceTypeBuiltInUltraWideCamera: string;

declare var AVCaptureDeviceTypeBuiltInWideAngleCamera: string;

declare var AVCaptureDeviceTypeContinuityCamera: string;

declare var AVCaptureDeviceTypeExternal: string;

declare var AVCaptureDeviceTypeMicrophone: string;

declare var AVCaptureDeviceWasConnectedNotification: string;

declare var AVCaptureDeviceWasDisconnectedNotification: string;

declare var AVCaptureExposureDurationCurrent: CMTime;

declare const enum AVCaptureExposureMode {

	Locked = 0,

	AutoExpose = 1,

	ContinuousAutoExposure = 2,

	Custom = 3
}

declare var AVCaptureExposureTargetBiasCurrent: number;

declare class AVCaptureFileOutput extends AVCaptureOutput {

	static alloc(): AVCaptureFileOutput; // inherited from NSObject

	static new(): AVCaptureFileOutput; // inherited from NSObject

	maxRecordedDuration: CMTime;

	maxRecordedFileSize: number;

	minFreeDiskSpaceLimit: number;

	readonly outputFileURL: NSURL;

	readonly recordedDuration: CMTime;

	readonly recordedFileSize: number;

	readonly recording: boolean;

	startRecordingToOutputFileURLRecordingDelegate(outputFileURL: NSURL, delegate: AVCaptureFileOutputRecordingDelegate): void;

	stopRecording(): void;
}

interface AVCaptureFileOutputRecordingDelegate extends NSObjectProtocol {

	captureOutputDidFinishRecordingToOutputFileAtURLFromConnectionsError(output: AVCaptureFileOutput, outputFileURL: NSURL, connections: NSArray<AVCaptureConnection> | AVCaptureConnection[], error: NSError): void;

	captureOutputDidStartRecordingToOutputFileAtURLFromConnections?(output: AVCaptureFileOutput, fileURL: NSURL, connections: NSArray<AVCaptureConnection> | AVCaptureConnection[]): void;
}
declare var AVCaptureFileOutputRecordingDelegate: {

	prototype: AVCaptureFileOutputRecordingDelegate;
};

declare const enum AVCaptureFlashMode {

	Off = 0,

	On = 1,

	Auto = 2
}

declare const enum AVCaptureFocusMode {

	Locked = 0,

	AutoFocus = 1,

	ContinuousAutoFocus = 2
}

declare var AVCaptureISOCurrent: number;

declare class AVCaptureInput extends NSObject {

	static alloc(): AVCaptureInput; // inherited from NSObject

	static new(): AVCaptureInput; // inherited from NSObject

	readonly ports: NSArray<AVCaptureInputPort>;
}

declare class AVCaptureInputPort extends NSObject {

	static alloc(): AVCaptureInputPort; // inherited from NSObject

	static new(): AVCaptureInputPort; // inherited from NSObject

	readonly clock: any;

	enabled: boolean;

	readonly formatDescription: any;

	readonly input: AVCaptureInput;

	readonly mediaType: string;

	readonly sourceDevicePosition: AVCaptureDevicePosition;

	readonly sourceDeviceType: string;
}

declare var AVCaptureInputPortFormatDescriptionDidChangeNotification: string;

declare var AVCaptureLensPositionCurrent: number;

declare const enum AVCaptureLensStabilizationStatus {

	Unsupported = 0,

	Off = 1,

	Active = 2,

	OutOfRange = 3,

	Unavailable = 4
}

declare class AVCaptureManualExposureBracketedStillImageSettings extends AVCaptureBracketedStillImageSettings {

	static alloc(): AVCaptureManualExposureBracketedStillImageSettings; // inherited from NSObject

	static manualExposureSettingsWithExposureDurationISO(duration: CMTime, ISO: number): AVCaptureManualExposureBracketedStillImageSettings;

	static new(): AVCaptureManualExposureBracketedStillImageSettings; // inherited from NSObject

	readonly ISO: number;

	readonly exposureDuration: CMTime;
}

declare var AVCaptureMaxAvailableTorchLevel: number;

declare class AVCaptureMetadataInput extends AVCaptureInput {

	static alloc(): AVCaptureMetadataInput; // inherited from NSObject

	static metadataInputWithFormatDescriptionClock(desc: any, clock: any): AVCaptureMetadataInput;

	static new(): AVCaptureMetadataInput; // inherited from NSObject

	constructor(o: { formatDescription: any; clock: any; });

	appendTimedMetadataGroupError(metadata: AVTimedMetadataGroup): boolean;

	initWithFormatDescriptionClock(desc: any, clock: any): this;
}

declare class AVCaptureMetadataOutput extends AVCaptureOutput {

	static alloc(): AVCaptureMetadataOutput; // inherited from NSObject

	static new(): AVCaptureMetadataOutput; // inherited from NSObject

	readonly availableMetadataObjectTypes: NSArray<string>;

	metadataObjectTypes: NSArray<string>;

	readonly metadataObjectsCallbackQueue: interop.Pointer | interop.Reference<any>;

	readonly metadataObjectsDelegate: AVCaptureMetadataOutputObjectsDelegate;

	rectOfInterest: CGRect;

	setMetadataObjectsDelegateQueue(objectsDelegate: AVCaptureMetadataOutputObjectsDelegate, objectsCallbackQueue: interop.Pointer | interop.Reference<any>): void;
}

interface AVCaptureMetadataOutputObjectsDelegate extends NSObjectProtocol {

	captureOutputDidOutputMetadataObjectsFromConnection?(output: AVCaptureOutput, metadataObjects: NSArray<AVMetadataObject> | AVMetadataObject[], connection: AVCaptureConnection): void;
}
declare var AVCaptureMetadataOutputObjectsDelegate: {

	prototype: AVCaptureMetadataOutputObjectsDelegate;
};

declare const enum AVCaptureMicrophoneMode {

	Standard = 0,

	WideSpectrum = 1,

	VoiceIsolation = 2
}

declare class AVCaptureMovieFileOutput extends AVCaptureFileOutput {

	static alloc(): AVCaptureMovieFileOutput; // inherited from NSObject

	static new(): AVCaptureMovieFileOutput; // inherited from NSObject

	readonly availableVideoCodecTypes: NSArray<string>;

	metadata: NSArray<AVMetadataItem>;

	movieFragmentInterval: CMTime;

	readonly primaryConstituentDeviceRestrictedSwitchingBehaviorConditionsForRecording: AVCapturePrimaryConstituentDeviceRestrictedSwitchingBehaviorConditions;

	readonly primaryConstituentDeviceSwitchingBehaviorForRecording: AVCapturePrimaryConstituentDeviceSwitchingBehavior;

	primaryConstituentDeviceSwitchingBehaviorForRecordingEnabled: boolean;

	outputSettingsForConnection(connection: AVCaptureConnection): NSDictionary<string, any>;

	recordsVideoOrientationAndMirroringChangesAsMetadataTrackForConnection(connection: AVCaptureConnection): boolean;

	setOutputSettingsForConnection(outputSettings: NSDictionary<string, any>, connection: AVCaptureConnection): void;

	setPrimaryConstituentDeviceSwitchingBehaviorForRecordingRestrictedSwitchingBehaviorConditions(switchingBehavior: AVCapturePrimaryConstituentDeviceSwitchingBehavior, restrictedSwitchingBehaviorConditions: AVCapturePrimaryConstituentDeviceRestrictedSwitchingBehaviorConditions): void;

	setRecordsVideoOrientationAndMirroringChangesAsMetadataTrackForConnection(doRecordChanges: boolean, connection: AVCaptureConnection): void;

	supportedOutputSettingsKeysForConnection(connection: AVCaptureConnection): NSArray<string>;
}

declare class AVCaptureMultiCamSession extends AVCaptureSession {

	static alloc(): AVCaptureMultiCamSession; // inherited from NSObject

	static new(): AVCaptureMultiCamSession; // inherited from NSObject

	readonly systemPressureCost: number;

	static readonly multiCamSupported: boolean;
}

declare class AVCaptureOutput extends NSObject {

	static alloc(): AVCaptureOutput; // inherited from NSObject

	static new(): AVCaptureOutput; // inherited from NSObject

	readonly connections: NSArray<AVCaptureConnection>;

	connectionWithMediaType(mediaType: string): AVCaptureConnection;

	metadataOutputRectOfInterestForRect(rectInOutputCoordinates: CGRect): CGRect;

	rectForMetadataOutputRectOfInterest(rectInMetadataOutputCoordinates: CGRect): CGRect;

	transformedMetadataObjectForMetadataObjectConnection(metadataObject: AVMetadataObject, connection: AVCaptureConnection): AVMetadataObject;
}

declare const enum AVCaptureOutputDataDroppedReason {

	None = 0,

	LateData = 1,

	OutOfBuffers = 2,

	Discontinuity = 3
}

declare class AVCapturePhoto extends NSObject {

	static alloc(): AVCapturePhoto; // inherited from NSObject

	static new(): AVCapturePhoto; // inherited from NSObject

	readonly bracketSettings: AVCaptureBracketedStillImageSettings;

	readonly cameraCalibrationData: AVCameraCalibrationData;

	readonly depthData: AVDepthData;

	readonly embeddedThumbnailPhotoFormat: NSDictionary<string, any>;

	readonly lensStabilizationStatus: AVCaptureLensStabilizationStatus;

	readonly metadata: NSDictionary<string, any>;

	readonly photoCount: number;

	readonly pixelBuffer: any;

	readonly portraitEffectsMatte: AVPortraitEffectsMatte;

	readonly previewPixelBuffer: any;

	readonly rawPhoto: boolean;

	readonly resolvedSettings: AVCaptureResolvedPhotoSettings;

	readonly sequenceCount: number;

	readonly sourceDeviceType: string;

	readonly timestamp: CMTime;

	CGImageRepresentation(): any;

	fileDataRepresentation(): NSData;

	fileDataRepresentationWithCustomizer(customizer: AVCapturePhotoFileDataRepresentationCustomizer): NSData;

	fileDataRepresentationWithReplacementMetadataReplacementEmbeddedThumbnailPhotoFormatReplacementEmbeddedThumbnailPixelBufferReplacementDepthData(replacementMetadata: NSDictionary<string, any>, replacementEmbeddedThumbnailPhotoFormat: NSDictionary<string, any>, replacementEmbeddedThumbnailPixelBuffer: any, replacementDepthData: AVDepthData): NSData;

	previewCGImageRepresentation(): any;

	semanticSegmentationMatteForType(semanticSegmentationMatteType: string): AVSemanticSegmentationMatte;
}

declare class AVCapturePhotoBracketSettings extends AVCapturePhotoSettings {

	static alloc(): AVCapturePhotoBracketSettings; // inherited from NSObject

	static new(): AVCapturePhotoBracketSettings; // inherited from NSObject

	static photoBracketSettingsWithRawPixelFormatTypeProcessedFormatBracketedSettings(rawPixelFormatType: number, processedFormat: NSDictionary<string, any>, bracketedSettings: NSArray<AVCaptureBracketedStillImageSettings> | AVCaptureBracketedStillImageSettings[]): AVCapturePhotoBracketSettings;

	static photoBracketSettingsWithRawPixelFormatTypeRawFileTypeProcessedFormatProcessedFileTypeBracketedSettings(rawPixelFormatType: number, rawFileType: string, processedFormat: NSDictionary<string, any>, processedFileType: string, bracketedSettings: NSArray<AVCaptureBracketedStillImageSettings> | AVCaptureBracketedStillImageSettings[]): AVCapturePhotoBracketSettings;

	static photoSettings(): AVCapturePhotoBracketSettings; // inherited from AVCapturePhotoSettings

	static photoSettingsFromPhotoSettings(photoSettings: AVCapturePhotoSettings): AVCapturePhotoBracketSettings; // inherited from AVCapturePhotoSettings

	static photoSettingsWithFormat(format: NSDictionary<string, any>): AVCapturePhotoBracketSettings; // inherited from AVCapturePhotoSettings

	static photoSettingsWithRawPixelFormatType(rawPixelFormatType: number): AVCapturePhotoBracketSettings; // inherited from AVCapturePhotoSettings

	static photoSettingsWithRawPixelFormatTypeProcessedFormat(rawPixelFormatType: number, processedFormat: NSDictionary<string, any>): AVCapturePhotoBracketSettings; // inherited from AVCapturePhotoSettings

	static photoSettingsWithRawPixelFormatTypeRawFileTypeProcessedFormatProcessedFileType(rawPixelFormatType: number, rawFileType: string, processedFormat: NSDictionary<string, any>, processedFileType: string): AVCapturePhotoBracketSettings; // inherited from AVCapturePhotoSettings

	readonly bracketedSettings: NSArray<AVCaptureBracketedStillImageSettings>;

	lensStabilizationEnabled: boolean;
}

interface AVCapturePhotoCaptureDelegate extends NSObjectProtocol {

	captureOutputDidCapturePhotoForResolvedSettings?(output: AVCapturePhotoOutput, resolvedSettings: AVCaptureResolvedPhotoSettings): void;

	captureOutputDidFinishCaptureForResolvedSettingsError?(output: AVCapturePhotoOutput, resolvedSettings: AVCaptureResolvedPhotoSettings, error: NSError): void;

	captureOutputDidFinishCapturingDeferredPhotoProxyError?(output: AVCapturePhotoOutput, deferredPhotoProxy: AVCaptureDeferredPhotoProxy, error: NSError): void;

	captureOutputDidFinishProcessingLivePhotoToMovieFileAtURLDurationPhotoDisplayTimeResolvedSettingsError?(output: AVCapturePhotoOutput, outputFileURL: NSURL, duration: CMTime, photoDisplayTime: CMTime, resolvedSettings: AVCaptureResolvedPhotoSettings, error: NSError): void;

	captureOutputDidFinishProcessingPhotoError?(output: AVCapturePhotoOutput, photo: AVCapturePhoto, error: NSError): void;

	captureOutputDidFinishProcessingPhotoSampleBufferPreviewPhotoSampleBufferResolvedSettingsBracketSettingsError?(output: AVCapturePhotoOutput, photoSampleBuffer: any, previewPhotoSampleBuffer: any, resolvedSettings: AVCaptureResolvedPhotoSettings, bracketSettings: AVCaptureBracketedStillImageSettings, error: NSError): void;

	captureOutputDidFinishProcessingRawPhotoSampleBufferPreviewPhotoSampleBufferResolvedSettingsBracketSettingsError?(output: AVCapturePhotoOutput, rawSampleBuffer: any, previewPhotoSampleBuffer: any, resolvedSettings: AVCaptureResolvedPhotoSettings, bracketSettings: AVCaptureBracketedStillImageSettings, error: NSError): void;

	captureOutputDidFinishRecordingLivePhotoMovieForEventualFileAtURLResolvedSettings?(output: AVCapturePhotoOutput, outputFileURL: NSURL, resolvedSettings: AVCaptureResolvedPhotoSettings): void;

	captureOutputWillBeginCaptureForResolvedSettings?(output: AVCapturePhotoOutput, resolvedSettings: AVCaptureResolvedPhotoSettings): void;

	captureOutputWillCapturePhotoForResolvedSettings?(output: AVCapturePhotoOutput, resolvedSettings: AVCaptureResolvedPhotoSettings): void;
}
declare var AVCapturePhotoCaptureDelegate: {

	prototype: AVCapturePhotoCaptureDelegate;
};

interface AVCapturePhotoFileDataRepresentationCustomizer extends NSObjectProtocol {

	replacementAppleProRAWCompressionSettingsForPhotoDefaultSettingsMaximumBitDepth?(photo: AVCapturePhoto, defaultSettings: NSDictionary<string, any>, maximumBitDepth: number): NSDictionary<string, any>;

	replacementDepthDataForPhoto?(photo: AVCapturePhoto): AVDepthData;

	replacementEmbeddedThumbnailPixelBufferWithPhotoFormatForPhoto?(replacementEmbeddedThumbnailPhotoFormatOut: interop.Pointer | interop.Reference<NSDictionary<string, any>>, photo: AVCapturePhoto): any;

	replacementMetadataForPhoto?(photo: AVCapturePhoto): NSDictionary<string, any>;

	replacementPortraitEffectsMatteForPhoto?(photo: AVCapturePhoto): AVPortraitEffectsMatte;

	replacementSemanticSegmentationMatteOfTypeForPhoto?(semanticSegmentationMatteType: string, photo: AVCapturePhoto): AVSemanticSegmentationMatte;
}
declare var AVCapturePhotoFileDataRepresentationCustomizer: {

	prototype: AVCapturePhotoFileDataRepresentationCustomizer;
};

declare class AVCapturePhotoOutput extends AVCaptureOutput {

	static DNGPhotoDataRepresentationForRawSampleBufferPreviewPhotoSampleBuffer(rawSampleBuffer: any, previewPhotoSampleBuffer: any): NSData;

	static JPEGPhotoDataRepresentationForJPEGSampleBufferPreviewPhotoSampleBuffer(JPEGSampleBuffer: any, previewPhotoSampleBuffer: any): NSData;

	static alloc(): AVCapturePhotoOutput; // inherited from NSObject

	static isAppleProRAWPixelFormat(pixelFormat: number): boolean;

	static isBayerRAWPixelFormat(pixelFormat: number): boolean;

	static new(): AVCapturePhotoOutput; // inherited from NSObject

	appleProRAWEnabled: boolean;

	readonly appleProRAWSupported: boolean;

	autoDeferredPhotoDeliveryEnabled: boolean;

	readonly autoDeferredPhotoDeliverySupported: boolean;

	readonly autoRedEyeReductionSupported: boolean;

	readonly availableLivePhotoVideoCodecTypes: NSArray<string>;

	readonly availablePhotoCodecTypes: NSArray<string>;

	readonly availablePhotoFileTypes: NSArray<string>;

	readonly availablePhotoPixelFormatTypes: NSArray<number>;

	readonly availableRawPhotoFileTypes: NSArray<string>;

	readonly availableRawPhotoPixelFormatTypes: NSArray<number>;

	readonly availableSemanticSegmentationMatteTypes: NSArray<string>;

	readonly cameraCalibrationDataDeliverySupported: boolean;

	readonly captureReadiness: AVCapturePhotoOutputCaptureReadiness;

	contentAwareDistortionCorrectionEnabled: boolean;

	readonly contentAwareDistortionCorrectionSupported: boolean;

	depthDataDeliveryEnabled: boolean;

	readonly depthDataDeliverySupported: boolean;

	dualCameraDualPhotoDeliveryEnabled: boolean;

	readonly dualCameraDualPhotoDeliverySupported: boolean;

	readonly dualCameraFusionSupported: boolean;

	enabledSemanticSegmentationMatteTypes: NSArray<string>;

	fastCapturePrioritizationEnabled: boolean;

	fastCapturePrioritizationSupported: boolean;

	highResolutionCaptureEnabled: boolean;

	readonly isFlashScene: boolean;

	readonly isStillImageStabilizationScene: boolean;

	readonly lensStabilizationDuringBracketedCaptureSupported: boolean;

	livePhotoAutoTrimmingEnabled: boolean;

	livePhotoCaptureEnabled: boolean;

	readonly livePhotoCaptureSupported: boolean;

	livePhotoCaptureSuspended: boolean;

	readonly maxBracketedCapturePhotoCount: number;

	maxPhotoDimensions: CMVideoDimensions;

	maxPhotoQualityPrioritization: AVCapturePhotoQualityPrioritization;

	photoSettingsForSceneMonitoring: AVCapturePhotoSettings;

	portraitEffectsMatteDeliveryEnabled: boolean;

	readonly portraitEffectsMatteDeliverySupported: boolean;

	readonly preparedPhotoSettingsArray: NSArray<AVCapturePhotoSettings>;

	preservesLivePhotoCaptureSuspendedOnSessionStop: boolean;

	responsiveCaptureEnabled: boolean;

	readonly responsiveCaptureSupported: boolean;

	readonly stillImageStabilizationSupported: boolean;

	readonly supportedFlashModes: NSArray<number>;

	virtualDeviceConstituentPhotoDeliveryEnabled: boolean;

	readonly virtualDeviceConstituentPhotoDeliverySupported: boolean;

	readonly virtualDeviceFusionSupported: boolean;

	zeroShutterLagEnabled: boolean;

	readonly zeroShutterLagSupported: boolean;

	capturePhotoWithSettingsDelegate(settings: AVCapturePhotoSettings, delegate: AVCapturePhotoCaptureDelegate): void;

	setPreparedPhotoSettingsArrayCompletionHandler(preparedPhotoSettingsArray: NSArray<AVCapturePhotoSettings> | AVCapturePhotoSettings[], completionHandler: (p1: boolean, p2: NSError) => void): void;

	supportedPhotoCodecTypesForFileType(fileType: string): NSArray<string>;

	supportedPhotoPixelFormatTypesForFileType(fileType: string): NSArray<number>;

	supportedRawPhotoPixelFormatTypesForFileType(fileType: string): NSArray<number>;
}

declare const enum AVCapturePhotoOutputCaptureReadiness {

	SessionNotRunning = 0,

	Ready = 1,

	NotReadyMomentarily = 2,

	NotReadyWaitingForCapture = 3,

	NotReadyWaitingForProcessing = 4
}

declare class AVCapturePhotoOutputReadinessCoordinator extends NSObject {

	static alloc(): AVCapturePhotoOutputReadinessCoordinator; // inherited from NSObject

	static new(): AVCapturePhotoOutputReadinessCoordinator; // inherited from NSObject

	readonly captureReadiness: AVCapturePhotoOutputCaptureReadiness;

	delegate: AVCapturePhotoOutputReadinessCoordinatorDelegate;

	constructor(o: { photoOutput: AVCapturePhotoOutput; });

	initWithPhotoOutput(photoOutput: AVCapturePhotoOutput): this;

	startTrackingCaptureRequestUsingPhotoSettings(settings: AVCapturePhotoSettings): void;

	stopTrackingCaptureRequestUsingPhotoSettingsUniqueID(settingsUniqueID: number): void;
}

interface AVCapturePhotoOutputReadinessCoordinatorDelegate extends NSObjectProtocol {

	readinessCoordinatorCaptureReadinessDidChange?(coordinator: AVCapturePhotoOutputReadinessCoordinator, captureReadiness: AVCapturePhotoOutputCaptureReadiness): void;
}
declare var AVCapturePhotoOutputReadinessCoordinatorDelegate: {

	prototype: AVCapturePhotoOutputReadinessCoordinatorDelegate;
};

declare const enum AVCapturePhotoQualityPrioritization {

	Speed = 1,

	Balanced = 2,

	Quality = 3
}

declare class AVCapturePhotoSettings extends NSObject implements NSCopying {

	static alloc(): AVCapturePhotoSettings; // inherited from NSObject

	static new(): AVCapturePhotoSettings; // inherited from NSObject

	static photoSettings(): AVCapturePhotoSettings;

	static photoSettingsFromPhotoSettings(photoSettings: AVCapturePhotoSettings): AVCapturePhotoSettings;

	static photoSettingsWithFormat(format: NSDictionary<string, any>): AVCapturePhotoSettings;

	static photoSettingsWithRawPixelFormatType(rawPixelFormatType: number): AVCapturePhotoSettings;

	static photoSettingsWithRawPixelFormatTypeProcessedFormat(rawPixelFormatType: number, processedFormat: NSDictionary<string, any>): AVCapturePhotoSettings;

	static photoSettingsWithRawPixelFormatTypeRawFileTypeProcessedFormatProcessedFileType(rawPixelFormatType: number, rawFileType: string, processedFormat: NSDictionary<string, any>, processedFileType: string): AVCapturePhotoSettings;

	autoContentAwareDistortionCorrectionEnabled: boolean;

	autoDualCameraFusionEnabled: boolean;

	autoRedEyeReductionEnabled: boolean;

	autoStillImageStabilizationEnabled: boolean;

	autoVirtualDeviceFusionEnabled: boolean;

	readonly availableEmbeddedThumbnailPhotoCodecTypes: NSArray<string>;

	readonly availablePreviewPhotoPixelFormatTypes: NSArray<number>;

	readonly availableRawEmbeddedThumbnailPhotoCodecTypes: NSArray<string>;

	cameraCalibrationDataDeliveryEnabled: boolean;

	depthDataDeliveryEnabled: boolean;

	depthDataFiltered: boolean;

	dualCameraDualPhotoDeliveryEnabled: boolean;

	embeddedThumbnailPhotoFormat: NSDictionary<string, any>;

	embedsDepthDataInPhoto: boolean;

	embedsPortraitEffectsMatteInPhoto: boolean;

	embedsSemanticSegmentationMattesInPhoto: boolean;

	enabledSemanticSegmentationMatteTypes: NSArray<string>;

	flashMode: AVCaptureFlashMode;

	readonly format: NSDictionary<string, any>;

	highResolutionPhotoEnabled: boolean;

	livePhotoMovieFileURL: NSURL;

	livePhotoMovieMetadata: NSArray<AVMetadataItem>;

	livePhotoVideoCodecType: string;

	maxPhotoDimensions: CMVideoDimensions;

	metadata: NSDictionary<string, any>;

	photoQualityPrioritization: AVCapturePhotoQualityPrioritization;

	portraitEffectsMatteDeliveryEnabled: boolean;

	previewPhotoFormat: NSDictionary<string, any>;

	readonly processedFileType: string;

	rawEmbeddedThumbnailPhotoFormat: NSDictionary<string, any>;

	readonly rawFileType: string;

	readonly rawPhotoPixelFormatType: number;

	readonly uniqueID: number;

	virtualDeviceConstituentPhotoDeliveryEnabledDevices: NSArray<AVCaptureDevice>;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare const enum AVCapturePrimaryConstituentDeviceRestrictedSwitchingBehaviorConditions {

	None = 0,

	VideoZoomChanged = 1,

	FocusModeChanged = 2,

	ExposureModeChanged = 4
}

declare const enum AVCapturePrimaryConstituentDeviceSwitchingBehavior {

	Unsupported = 0,

	Auto = 1,

	Restricted = 2,

	Locked = 3
}

declare class AVCaptureReactionEffectState extends NSObject {

	static alloc(): AVCaptureReactionEffectState; // inherited from NSObject

	static new(): AVCaptureReactionEffectState; // inherited from NSObject

	readonly endTime: CMTime;

	readonly reactionType: string;

	readonly startTime: CMTime;
}

declare function AVCaptureReactionSystemImageNameForType(reactionType: string): string;

declare var AVCaptureReactionTypeBalloons: string;

declare var AVCaptureReactionTypeConfetti: string;

declare var AVCaptureReactionTypeFireworks: string;

declare var AVCaptureReactionTypeHeart: string;

declare var AVCaptureReactionTypeLasers: string;

declare var AVCaptureReactionTypeRain: string;

declare var AVCaptureReactionTypeThumbsDown: string;

declare var AVCaptureReactionTypeThumbsUp: string;

declare class AVCaptureResolvedPhotoSettings extends NSObject {

	static alloc(): AVCaptureResolvedPhotoSettings; // inherited from NSObject

	static new(): AVCaptureResolvedPhotoSettings; // inherited from NSObject

	readonly contentAwareDistortionCorrectionEnabled: boolean;

	readonly deferredPhotoProxyDimensions: CMVideoDimensions;

	readonly dualCameraFusionEnabled: boolean;

	readonly embeddedThumbnailDimensions: CMVideoDimensions;

	readonly expectedPhotoCount: number;

	readonly fastCapturePrioritizationEnabled: boolean;

	readonly flashEnabled: boolean;

	readonly livePhotoMovieDimensions: CMVideoDimensions;

	readonly photoDimensions: CMVideoDimensions;

	readonly photoProcessingTimeRange: CMTimeRange;

	readonly portraitEffectsMatteDimensions: CMVideoDimensions;

	readonly previewDimensions: CMVideoDimensions;

	readonly rawEmbeddedThumbnailDimensions: CMVideoDimensions;

	readonly rawPhotoDimensions: CMVideoDimensions;

	readonly redEyeReductionEnabled: boolean;

	readonly stillImageStabilizationEnabled: boolean;

	readonly uniqueID: number;

	readonly virtualDeviceFusionEnabled: boolean;

	dimensionsForSemanticSegmentationMatteOfType(semanticSegmentationMatteType: string): CMVideoDimensions;
}

declare class AVCaptureSession extends NSObject {

	static alloc(): AVCaptureSession; // inherited from NSObject

	static new(): AVCaptureSession; // inherited from NSObject

	automaticallyConfiguresApplicationAudioSession: boolean;

	automaticallyConfiguresCaptureDeviceForWideColor: boolean;

	readonly connections: NSArray<AVCaptureConnection>;

	readonly hardwareCost: number;

	readonly inputs: NSArray<AVCaptureInput>;

	readonly interrupted: boolean;

	readonly masterClock: any;

	multitaskingCameraAccessEnabled: boolean;

	readonly multitaskingCameraAccessSupported: boolean;

	readonly outputs: NSArray<AVCaptureOutput>;

	readonly running: boolean;

	sessionPreset: string;

	readonly synchronizationClock: any;

	usesApplicationAudioSession: boolean;

	addConnection(connection: AVCaptureConnection): void;

	addInput(input: AVCaptureInput): void;

	addInputWithNoConnections(input: AVCaptureInput): void;

	addOutput(output: AVCaptureOutput): void;

	addOutputWithNoConnections(output: AVCaptureOutput): void;

	beginConfiguration(): void;

	canAddConnection(connection: AVCaptureConnection): boolean;

	canAddInput(input: AVCaptureInput): boolean;

	canAddOutput(output: AVCaptureOutput): boolean;

	canSetSessionPreset(preset: string): boolean;

	commitConfiguration(): void;

	removeConnection(connection: AVCaptureConnection): void;

	removeInput(input: AVCaptureInput): void;

	removeOutput(output: AVCaptureOutput): void;

	startRunning(): void;

	stopRunning(): void;
}

declare var AVCaptureSessionDidStartRunningNotification: string;

declare var AVCaptureSessionDidStopRunningNotification: string;

declare var AVCaptureSessionErrorKey: string;

declare var AVCaptureSessionInterruptionEndedNotification: string;

declare const enum AVCaptureSessionInterruptionReason {

	VideoDeviceNotAvailableInBackground = 1,

	AudioDeviceInUseByAnotherClient = 2,

	VideoDeviceInUseByAnotherClient = 3,

	VideoDeviceNotAvailableWithMultipleForegroundApps = 4,

	VideoDeviceNotAvailableDueToSystemPressure = 5
}

declare var AVCaptureSessionInterruptionReasonKey: string;

declare var AVCaptureSessionInterruptionSystemPressureStateKey: string;

declare var AVCaptureSessionPreset1280x720: string;

declare var AVCaptureSessionPreset1920x1080: string;

declare var AVCaptureSessionPreset352x288: string;

declare var AVCaptureSessionPreset3840x2160: string;

declare var AVCaptureSessionPreset640x480: string;

declare var AVCaptureSessionPresetHigh: string;

declare var AVCaptureSessionPresetInputPriority: string;

declare var AVCaptureSessionPresetLow: string;

declare var AVCaptureSessionPresetMedium: string;

declare var AVCaptureSessionPresetPhoto: string;

declare var AVCaptureSessionPresetiFrame1280x720: string;

declare var AVCaptureSessionPresetiFrame960x540: string;

declare var AVCaptureSessionRuntimeErrorNotification: string;

declare var AVCaptureSessionWasInterruptedNotification: string;

declare class AVCaptureStillImageOutput extends AVCaptureOutput {

	static alloc(): AVCaptureStillImageOutput; // inherited from NSObject

	static jpegStillImageNSDataRepresentation(jpegSampleBuffer: any): NSData;

	static new(): AVCaptureStillImageOutput; // inherited from NSObject

	automaticallyEnablesStillImageStabilizationWhenAvailable: boolean;

	readonly availableImageDataCVPixelFormatTypes: NSArray<number>;

	readonly availableImageDataCodecTypes: NSArray<string>;

	readonly capturingStillImage: boolean;

	highResolutionStillImageOutputEnabled: boolean;

	lensStabilizationDuringBracketedCaptureEnabled: boolean;

	readonly lensStabilizationDuringBracketedCaptureSupported: boolean;

	readonly maxBracketedCaptureStillImageCount: number;

	outputSettings: NSDictionary<string, any>;

	readonly stillImageStabilizationActive: boolean;

	readonly stillImageStabilizationSupported: boolean;

	captureStillImageAsynchronouslyFromConnectionCompletionHandler(connection: AVCaptureConnection, handler: (p1: any, p2: NSError) => void): void;

	captureStillImageBracketAsynchronouslyFromConnectionWithSettingsArrayCompletionHandler(connection: AVCaptureConnection, settings: NSArray<AVCaptureBracketedStillImageSettings> | AVCaptureBracketedStillImageSettings[], handler: (p1: any, p2: AVCaptureBracketedStillImageSettings, p3: NSError) => void): void;

	prepareToCaptureStillImageBracketFromConnectionWithSettingsArrayCompletionHandler(connection: AVCaptureConnection, settings: NSArray<AVCaptureBracketedStillImageSettings> | AVCaptureBracketedStillImageSettings[], handler: (p1: boolean, p2: NSError) => void): void;
}

declare class AVCaptureSynchronizedData extends NSObject {

	static alloc(): AVCaptureSynchronizedData; // inherited from NSObject

	static new(): AVCaptureSynchronizedData; // inherited from NSObject

	readonly timestamp: CMTime;
}

declare class AVCaptureSynchronizedDataCollection extends NSObject implements NSFastEnumeration {

	static alloc(): AVCaptureSynchronizedDataCollection; // inherited from NSObject

	static new(): AVCaptureSynchronizedDataCollection; // inherited from NSObject

	readonly count: number;
	[Symbol.iterator](): Iterator<any>;

	objectForKeyedSubscript(key: AVCaptureOutput): AVCaptureSynchronizedData;

	synchronizedDataForCaptureOutput(captureOutput: AVCaptureOutput): AVCaptureSynchronizedData;
}

declare class AVCaptureSynchronizedDepthData extends AVCaptureSynchronizedData {

	static alloc(): AVCaptureSynchronizedDepthData; // inherited from NSObject

	static new(): AVCaptureSynchronizedDepthData; // inherited from NSObject

	readonly depthData: AVDepthData;

	readonly depthDataWasDropped: boolean;

	readonly droppedReason: AVCaptureOutputDataDroppedReason;
}

declare class AVCaptureSynchronizedMetadataObjectData extends AVCaptureSynchronizedData {

	static alloc(): AVCaptureSynchronizedMetadataObjectData; // inherited from NSObject

	static new(): AVCaptureSynchronizedMetadataObjectData; // inherited from NSObject

	readonly metadataObjects: NSArray<AVMetadataObject>;
}

declare class AVCaptureSynchronizedSampleBufferData extends AVCaptureSynchronizedData {

	static alloc(): AVCaptureSynchronizedSampleBufferData; // inherited from NSObject

	static new(): AVCaptureSynchronizedSampleBufferData; // inherited from NSObject

	readonly droppedReason: AVCaptureOutputDataDroppedReason;

	readonly sampleBuffer: any;

	readonly sampleBufferWasDropped: boolean;
}

declare const enum AVCaptureSystemPressureFactors {

	None = 0,

	SystemTemperature = 1,

	PeakPower = 2,

	DepthModuleTemperature = 4,

	CameraTemperature = 8
}

declare var AVCaptureSystemPressureLevelCritical: string;

declare var AVCaptureSystemPressureLevelFair: string;

declare var AVCaptureSystemPressureLevelNominal: string;

declare var AVCaptureSystemPressureLevelSerious: string;

declare var AVCaptureSystemPressureLevelShutdown: string;

declare class AVCaptureSystemPressureState extends NSObject {

	static alloc(): AVCaptureSystemPressureState; // inherited from NSObject

	static new(): AVCaptureSystemPressureState; // inherited from NSObject

	readonly factors: AVCaptureSystemPressureFactors;

	readonly level: string;
}

declare const enum AVCaptureSystemUserInterface {

	VideoEffects = 1,

	MicrophoneModes = 2
}

declare const enum AVCaptureTorchMode {

	Off = 0,

	On = 1,

	Auto = 2
}

declare class AVCaptureVideoDataOutput extends AVCaptureOutput {

	static alloc(): AVCaptureVideoDataOutput; // inherited from NSObject

	static new(): AVCaptureVideoDataOutput; // inherited from NSObject

	alwaysDiscardsLateVideoFrames: boolean;

	automaticallyConfiguresOutputBufferDimensions: boolean;

	readonly availableVideoCVPixelFormatTypes: NSArray<number>;

	readonly availableVideoCodecTypes: NSArray<string>;

	deliversPreviewSizedOutputBuffers: boolean;

	minFrameDuration: CMTime;

	readonly sampleBufferCallbackQueue: interop.Pointer | interop.Reference<any>;

	readonly sampleBufferDelegate: AVCaptureVideoDataOutputSampleBufferDelegate;

	videoSettings: NSDictionary<string, any>;

	availableVideoCodecTypesForAssetWriterWithOutputFileType(outputFileType: string): NSArray<string>;

	recommendedVideoSettingsForAssetWriterWithOutputFileType(outputFileType: string): NSDictionary<string, any>;

	recommendedVideoSettingsForVideoCodecTypeAssetWriterOutputFileType(videoCodecType: string, outputFileType: string): NSDictionary<string, any>;

	recommendedVideoSettingsForVideoCodecTypeAssetWriterOutputFileTypeOutputFileURL(videoCodecType: string, outputFileType: string, outputFileURL: NSURL): NSDictionary<string, any>;

	setSampleBufferDelegateQueue(sampleBufferDelegate: AVCaptureVideoDataOutputSampleBufferDelegate, sampleBufferCallbackQueue: interop.Pointer | interop.Reference<any>): void;
}

interface AVCaptureVideoDataOutputSampleBufferDelegate extends NSObjectProtocol {

	captureOutputDidDropSampleBufferFromConnection?(output: AVCaptureOutput, sampleBuffer: any, connection: AVCaptureConnection): void;

	captureOutputDidOutputSampleBufferFromConnection?(output: AVCaptureOutput, sampleBuffer: any, connection: AVCaptureConnection): void;
}
declare var AVCaptureVideoDataOutputSampleBufferDelegate: {

	prototype: AVCaptureVideoDataOutputSampleBufferDelegate;
};

declare const enum AVCaptureVideoOrientation {

	Portrait = 1,

	PortraitUpsideDown = 2,

	LandscapeRight = 3,

	LandscapeLeft = 4
}

declare class AVCaptureVideoPreviewLayer extends CALayer {

	static alloc(): AVCaptureVideoPreviewLayer; // inherited from NSObject

	static layer(): AVCaptureVideoPreviewLayer; // inherited from CALayer

	static layerWithSession(session: AVCaptureSession): AVCaptureVideoPreviewLayer;

	static layerWithSessionWithNoConnection(session: AVCaptureSession): AVCaptureVideoPreviewLayer;

	static new(): AVCaptureVideoPreviewLayer; // inherited from NSObject

	automaticallyAdjustsMirroring: boolean;

	readonly connection: AVCaptureConnection;

	mirrored: boolean;

	readonly mirroringSupported: boolean;

	orientation: AVCaptureVideoOrientation;

	readonly orientationSupported: boolean;

	readonly previewing: boolean;

	session: AVCaptureSession;

	videoGravity: string;

	constructor(o: { session: AVCaptureSession; });

	constructor(o: { sessionWithNoConnection: AVCaptureSession; });

	captureDevicePointOfInterestForPoint(pointInLayer: CGPoint): CGPoint;

	initWithSession(session: AVCaptureSession): this;

	initWithSessionWithNoConnection(session: AVCaptureSession): this;

	metadataOutputRectOfInterestForRect(rectInLayerCoordinates: CGRect): CGRect;

	pointForCaptureDevicePointOfInterest(captureDevicePointOfInterest: CGPoint): CGPoint;

	rectForMetadataOutputRectOfInterest(rectInMetadataOutputCoordinates: CGRect): CGRect;

	setSessionWithNoConnection(session: AVCaptureSession): void;

	transformedMetadataObjectForMetadataObject(metadataObject: AVMetadataObject): AVMetadataObject;
}

declare const enum AVCaptureVideoStabilizationMode {

	Off = 0,

	Standard = 1,

	Cinematic = 2,

	CinematicExtended = 3,

	PreviewOptimized = 4,

	Auto = -1
}

interface AVCaptureWhiteBalanceChromaticityValues {
	x: number;
	y: number;
}
declare var AVCaptureWhiteBalanceChromaticityValues: interop.StructType<AVCaptureWhiteBalanceChromaticityValues>;

interface AVCaptureWhiteBalanceGains {
	redGain: number;
	greenGain: number;
	blueGain: number;
}
declare var AVCaptureWhiteBalanceGains: interop.StructType<AVCaptureWhiteBalanceGains>;

declare var AVCaptureWhiteBalanceGainsCurrent: AVCaptureWhiteBalanceGains;

declare const enum AVCaptureWhiteBalanceMode {

	Locked = 0,

	AutoWhiteBalance = 1,

	ContinuousAutoWhiteBalance = 2
}

interface AVCaptureWhiteBalanceTemperatureAndTintValues {
	temperature: number;
	tint: number;
}
declare var AVCaptureWhiteBalanceTemperatureAndTintValues: interop.StructType<AVCaptureWhiteBalanceTemperatureAndTintValues>;

declare class AVComposition extends AVAsset implements NSMutableCopying {

	static alloc(): AVComposition; // inherited from NSObject

	static assetWithURL(URL: NSURL): AVComposition; // inherited from AVAsset

	static new(): AVComposition; // inherited from NSObject

	readonly URLAssetInitializationOptions: NSDictionary<string, any>;

	loadTrackWithTrackIDCompletionHandler(trackID: number, completionHandler: (p1: AVCompositionTrack, p2: NSError) => void): void;

	mutableCopyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	trackWithTrackID(trackID: number): AVCompositionTrack;
}

declare class AVCompositionTrack extends AVAssetTrack {

	static alloc(): AVCompositionTrack; // inherited from NSObject

	static new(): AVCompositionTrack; // inherited from NSObject

	readonly formatDescriptionReplacements: NSArray<AVCompositionTrackFormatDescriptionReplacement>;

	segmentForTrackTime(trackTime: CMTime): AVCompositionTrackSegment;
}

declare class AVCompositionTrackFormatDescriptionReplacement extends NSObject implements NSSecureCoding {

	static alloc(): AVCompositionTrackFormatDescriptionReplacement; // inherited from NSObject

	static new(): AVCompositionTrackFormatDescriptionReplacement; // inherited from NSObject

	readonly originalFormatDescription: any;

	readonly replacementFormatDescription: any;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare class AVCompositionTrackSegment extends AVAssetTrackSegment {

	static alloc(): AVCompositionTrackSegment; // inherited from NSObject

	static compositionTrackSegmentWithTimeRange(timeRange: CMTimeRange): AVCompositionTrackSegment;

	static compositionTrackSegmentWithURLTrackIDSourceTimeRangeTargetTimeRange(URL: NSURL, trackID: number, sourceTimeRange: CMTimeRange, targetTimeRange: CMTimeRange): AVCompositionTrackSegment;

	static new(): AVCompositionTrackSegment; // inherited from NSObject

	readonly sourceTrackID: number;

	readonly sourceURL: NSURL;

	constructor(o: { timeRange: CMTimeRange; });

	constructor(o: { URL: NSURL; trackID: number; sourceTimeRange: CMTimeRange; targetTimeRange: CMTimeRange; });

	initWithTimeRange(timeRange: CMTimeRange): this;

	initWithURLTrackIDSourceTimeRangeTargetTimeRange(URL: NSURL, trackID: number, sourceTimeRange: CMTimeRange, targetTimeRange: CMTimeRange): this;
}

declare class AVContentKey extends NSObject {

	static alloc(): AVContentKey; // inherited from NSObject

	static new(): AVContentKey; // inherited from NSObject

	readonly contentKeySpecifier: AVContentKeySpecifier;

	readonly externalContentProtectionStatus: AVExternalContentProtectionStatus;

	revoke(): void;
}

interface AVContentKeyRecipient {

	mayRequireContentKeysForMediaDataProcessing: boolean;

	contentKeySessionDidProvideContentKey?(contentKeySession: AVContentKeySession, contentKey: AVContentKey): void;
}
declare var AVContentKeyRecipient: {

	prototype: AVContentKeyRecipient;
};

declare class AVContentKeyRequest extends NSObject {

	static alloc(): AVContentKeyRequest; // inherited from NSObject

	static new(): AVContentKeyRequest; // inherited from NSObject

	readonly canProvidePersistableContentKey: boolean;

	readonly contentKey: AVContentKey;

	readonly contentKeySpecifier: AVContentKeySpecifier;

	readonly error: NSError;

	readonly identifier: any;

	readonly initializationData: NSData;

	readonly options: NSDictionary<string, any>;

	readonly renewsExpiringResponseData: boolean;

	readonly status: AVContentKeyRequestStatus;

	makeStreamingContentKeyRequestDataForAppContentIdentifierOptionsCompletionHandler(appIdentifier: NSData, contentIdentifier: NSData, options: NSDictionary<string, any>, handler: (p1: NSData, p2: NSError) => void): void;

	processContentKeyResponse(keyResponse: AVContentKeyResponse): void;

	processContentKeyResponseError(error: NSError): void;

	respondByRequestingPersistableContentKeyRequest(): void;

	respondByRequestingPersistableContentKeyRequestAndReturnError(): boolean;
}

declare var AVContentKeyRequestProtocolVersionsKey: string;

declare var AVContentKeyRequestRequiresValidationDataInSecureTokenKey: string;

declare var AVContentKeyRequestRetryReasonReceivedObsoleteContentKey: string;

declare var AVContentKeyRequestRetryReasonReceivedResponseWithExpiredLease: string;

declare var AVContentKeyRequestRetryReasonTimedOut: string;

declare const enum AVContentKeyRequestStatus {

	RequestingResponse = 0,

	ReceivedResponse = 1,

	Renewed = 2,

	Retried = 3,

	Cancelled = 4,

	Failed = 5
}

declare class AVContentKeyResponse extends NSObject {

	static alloc(): AVContentKeyResponse; // inherited from NSObject

	static contentKeyResponseWithAuthorizationTokenData(authorizationTokenData: NSData): AVContentKeyResponse;

	static contentKeyResponseWithClearKeyDataInitializationVector(keyData: NSData, initializationVector: NSData): AVContentKeyResponse;

	static contentKeyResponseWithFairPlayStreamingKeyResponseData(keyResponseData: NSData): AVContentKeyResponse;

	static new(): AVContentKeyResponse; // inherited from NSObject
}

declare class AVContentKeySession extends NSObject {

	static alloc(): AVContentKeySession; // inherited from NSObject

	static contentKeySessionWithKeySystem(keySystem: string): AVContentKeySession;

	static contentKeySessionWithKeySystemStorageDirectoryAtURL(keySystem: string, storageURL: NSURL): AVContentKeySession;

	static new(): AVContentKeySession; // inherited from NSObject

	static pendingExpiredSessionReportsWithAppIdentifierStorageDirectoryAtURL(appIdentifier: NSData, storageURL: NSURL): NSArray<NSData>;

	static removePendingExpiredSessionReportsWithAppIdentifierStorageDirectoryAtURL(expiredSessionReports: NSArray<NSData> | NSData[], appIdentifier: NSData, storageURL: NSURL): void;

	readonly contentKeyRecipients: NSArray<AVContentKeyRecipient>;

	readonly contentProtectionSessionIdentifier: NSData;

	readonly delegate: AVContentKeySessionDelegate;

	readonly delegateQueue: interop.Pointer | interop.Reference<any>;

	readonly keySystem: string;

	readonly storageURL: NSURL;

	addContentKeyRecipient(recipient: AVContentKeyRecipient): void;

	expire(): void;

	invalidateAllPersistableContentKeysForAppOptionsCompletionHandler(appIdentifier: NSData, options: NSDictionary<string, any>, handler: (p1: NSData, p2: NSError) => void): void;

	invalidatePersistableContentKeyOptionsCompletionHandler(persistableContentKeyData: NSData, options: NSDictionary<string, any>, handler: (p1: NSData, p2: NSError) => void): void;

	makeSecureTokenForExpirationDateOfPersistableContentKeyCompletionHandler(persistableContentKeyData: NSData, handler: (p1: NSData, p2: NSError) => void): void;

	processContentKeyRequestWithIdentifierInitializationDataOptions(identifier: any, initializationData: NSData, options: NSDictionary<string, any>): void;

	removeContentKeyRecipient(recipient: AVContentKeyRecipient): void;

	renewExpiringResponseDataForContentKeyRequest(contentKeyRequest: AVContentKeyRequest): void;

	setDelegateQueue(delegate: AVContentKeySessionDelegate, delegateQueue: interop.Pointer | interop.Reference<any>): void;
}

interface AVContentKeySessionDelegate extends NSObjectProtocol {

	contentKeySessionContentKeyRequestDidFailWithError?(session: AVContentKeySession, keyRequest: AVContentKeyRequest, err: NSError): void;

	contentKeySessionContentKeyRequestDidSucceed?(session: AVContentKeySession, keyRequest: AVContentKeyRequest): void;

	contentKeySessionContentProtectionSessionIdentifierDidChange?(session: AVContentKeySession): void;

	contentKeySessionDidGenerateExpiredSessionReport?(session: AVContentKeySession): void;

	contentKeySessionDidProvideContentKeyRequest(session: AVContentKeySession, keyRequest: AVContentKeyRequest): void;

	contentKeySessionDidProvideContentKeyRequestsForInitializationData?(session: AVContentKeySession, keyRequests: NSArray<AVContentKeyRequest> | AVContentKeyRequest[], initializationData: NSData): void;

	contentKeySessionDidProvidePersistableContentKeyRequest?(session: AVContentKeySession, keyRequest: AVPersistableContentKeyRequest): void;

	contentKeySessionDidProvideRenewingContentKeyRequest?(session: AVContentKeySession, keyRequest: AVContentKeyRequest): void;

	contentKeySessionDidUpdatePersistableContentKeyForContentKeyIdentifier?(session: AVContentKeySession, persistableContentKey: NSData, keyIdentifier: any): void;

	contentKeySessionExternalProtectionStatusDidChangeForContentKey?(session: AVContentKeySession, contentKey: AVContentKey): void;

	contentKeySessionShouldRetryContentKeyRequestReason?(session: AVContentKeySession, keyRequest: AVContentKeyRequest, retryReason: string): boolean;
}
declare var AVContentKeySessionDelegate: {

	prototype: AVContentKeySessionDelegate;
};

declare var AVContentKeySessionServerPlaybackContextOptionProtocolVersions: string;

declare var AVContentKeySessionServerPlaybackContextOptionServerChallenge: string;

declare class AVContentKeySpecifier extends NSObject {

	static alloc(): AVContentKeySpecifier; // inherited from NSObject

	static contentKeySpecifierForKeySystemIdentifierOptions(keySystem: string, contentKeyIdentifier: any, options: NSDictionary<string, any>): AVContentKeySpecifier;

	static new(): AVContentKeySpecifier; // inherited from NSObject

	readonly identifier: any;

	readonly keySystem: string;

	readonly options: NSDictionary<string, any>;

	constructor(o: { forKeySystem: string; identifier: any; options: NSDictionary<string, any>; });

	initForKeySystemIdentifierOptions(keySystem: string, contentKeyIdentifier: any, options: NSDictionary<string, any>): this;
}

declare var AVContentKeySystemAuthorizationToken: string;

declare var AVContentKeySystemClearKey: string;

declare var AVContentKeySystemFairPlayStreaming: string;

declare class AVCoordinatedPlaybackParticipant extends NSObject {

	static alloc(): AVCoordinatedPlaybackParticipant; // inherited from NSObject

	static new(): AVCoordinatedPlaybackParticipant; // inherited from NSObject

	readonly identifier: NSUUID;

	readonly readyToPlay: boolean;

	readonly suspensionReasons: NSArray<string>;
}

declare class AVCoordinatedPlaybackSuspension extends NSObject {

	static alloc(): AVCoordinatedPlaybackSuspension; // inherited from NSObject

	static new(): AVCoordinatedPlaybackSuspension; // inherited from NSObject

	readonly beginDate: Date;

	readonly reason: string;

	end(): void;

	endProposingNewTime(time: CMTime): void;
}

declare var AVCoordinatedPlaybackSuspensionReasonAudioSessionInterrupted: string;

declare var AVCoordinatedPlaybackSuspensionReasonCoordinatedPlaybackNotPossible: string;

declare var AVCoordinatedPlaybackSuspensionReasonPlayingInterstitial: string;

declare var AVCoordinatedPlaybackSuspensionReasonStallRecovery: string;

declare var AVCoordinatedPlaybackSuspensionReasonUserActionRequired: string;

declare var AVCoordinatedPlaybackSuspensionReasonUserIsChangingCurrentTime: string;

declare var AVCoreAnimationBeginTimeAtZero: number;

declare class AVDateRangeMetadataGroup extends AVMetadataGroup implements NSCopying, NSMutableCopying {

	static alloc(): AVDateRangeMetadataGroup; // inherited from NSObject

	static new(): AVDateRangeMetadataGroup; // inherited from NSObject

	readonly endDate: Date;

	readonly startDate: Date;

	constructor(o: { items: NSArray<AVMetadataItem> | AVMetadataItem[]; startDate: Date; endDate: Date; });

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	initWithItemsStartDateEndDate(items: NSArray<AVMetadataItem> | AVMetadataItem[], startDate: Date, endDate: Date): this;

	mutableCopyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare class AVDelegatingPlaybackCoordinator extends AVPlaybackCoordinator {

	static alloc(): AVDelegatingPlaybackCoordinator; // inherited from NSObject

	static new(): AVDelegatingPlaybackCoordinator; // inherited from NSObject

	readonly currentItemIdentifier: string;

	readonly playbackControlDelegate: AVPlaybackCoordinatorPlaybackControlDelegate;

	constructor(o: { playbackControlDelegate: AVPlaybackCoordinatorPlaybackControlDelegate; });

	coordinateRateChangeToRateOptions(rate: number, options: AVDelegatingPlaybackCoordinatorRateChangeOptions): void;

	coordinateSeekToTimeOptions(time: CMTime, options: AVDelegatingPlaybackCoordinatorSeekOptions): void;

	initWithPlaybackControlDelegate(playbackControlDelegate: AVPlaybackCoordinatorPlaybackControlDelegate): this;

	reapplyCurrentItemStateToPlaybackControlDelegate(): void;

	transitionToItemWithIdentifierProposingInitialTimingBasedOnTimebase(itemIdentifier: string, snapshotTimebase: any): void;
}

declare class AVDelegatingPlaybackCoordinatorBufferingCommand extends AVDelegatingPlaybackCoordinatorPlaybackControlCommand {

	static alloc(): AVDelegatingPlaybackCoordinatorBufferingCommand; // inherited from NSObject

	static new(): AVDelegatingPlaybackCoordinatorBufferingCommand; // inherited from NSObject

	readonly anticipatedPlaybackRate: number;

	readonly completionDueDate: Date;
}

declare class AVDelegatingPlaybackCoordinatorPauseCommand extends AVDelegatingPlaybackCoordinatorPlaybackControlCommand {

	static alloc(): AVDelegatingPlaybackCoordinatorPauseCommand; // inherited from NSObject

	static new(): AVDelegatingPlaybackCoordinatorPauseCommand; // inherited from NSObject

	readonly anticipatedPlaybackRate: number;

	readonly shouldBufferInAnticipationOfPlayback: boolean;
}

declare class AVDelegatingPlaybackCoordinatorPlayCommand extends AVDelegatingPlaybackCoordinatorPlaybackControlCommand {

	static alloc(): AVDelegatingPlaybackCoordinatorPlayCommand; // inherited from NSObject

	static new(): AVDelegatingPlaybackCoordinatorPlayCommand; // inherited from NSObject

	readonly hostClockTime: CMTime;

	readonly itemTime: CMTime;

	readonly rate: number;
}

declare class AVDelegatingPlaybackCoordinatorPlaybackControlCommand extends NSObject {

	static alloc(): AVDelegatingPlaybackCoordinatorPlaybackControlCommand; // inherited from NSObject

	static new(): AVDelegatingPlaybackCoordinatorPlaybackControlCommand; // inherited from NSObject

	readonly expectedCurrentItemIdentifier: string;

	readonly originator: AVCoordinatedPlaybackParticipant;
}

declare const enum AVDelegatingPlaybackCoordinatorRateChangeOptions {

	PlayImmediately = 1
}

declare class AVDelegatingPlaybackCoordinatorSeekCommand extends AVDelegatingPlaybackCoordinatorPlaybackControlCommand {

	static alloc(): AVDelegatingPlaybackCoordinatorSeekCommand; // inherited from NSObject

	static new(): AVDelegatingPlaybackCoordinatorSeekCommand; // inherited from NSObject

	readonly anticipatedPlaybackRate: number;

	readonly completionDueDate: Date;

	readonly itemTime: CMTime;

	readonly shouldBufferInAnticipationOfPlayback: boolean;
}

declare const enum AVDelegatingPlaybackCoordinatorSeekOptions {

	ResumeImmediately = 1
}

declare class AVDepthData extends NSObject {

	static alloc(): AVDepthData; // inherited from NSObject

	static depthDataFromDictionaryRepresentationError(imageSourceAuxDataInfoDictionary: NSDictionary<any, any>): AVDepthData;

	static new(): AVDepthData; // inherited from NSObject

	readonly availableDepthDataTypes: NSArray<number>;

	readonly cameraCalibrationData: AVCameraCalibrationData;

	readonly depthDataAccuracy: AVDepthDataAccuracy;

	readonly depthDataFiltered: boolean;

	readonly depthDataMap: any;

	readonly depthDataQuality: AVDepthDataQuality;

	readonly depthDataType: number;

	depthDataByApplyingExifOrientation(exifOrientation: CGImagePropertyOrientation): this;

	depthDataByConvertingToDepthDataType(depthDataType: number): this;

	depthDataByReplacingDepthDataMapWithPixelBufferError(pixelBuffer: any): this;

	dictionaryRepresentationForAuxiliaryDataType(outAuxDataType: interop.Pointer | interop.Reference<string>): NSDictionary<any, any>;
}

declare const enum AVDepthDataAccuracy {

	Relative = 0,

	Absolute = 1
}

declare const enum AVDepthDataQuality {

	Low = 0,

	High = 1
}

interface AVEdgeWidths {
	left: number;
	top: number;
	right: number;
	bottom: number;
}
declare var AVEdgeWidths: interop.StructType<AVEdgeWidths>;

declare const enum AVError {

	Unknown = -11800,

	OutOfMemory = -11801,

	SessionNotRunning = -11803,

	DeviceAlreadyUsedByAnotherSession = -11804,

	NoDataCaptured = -11805,

	SessionConfigurationChanged = -11806,

	DiskFull = -11807,

	DeviceWasDisconnected = -11808,

	MediaChanged = -11809,

	MaximumDurationReached = -11810,

	MaximumFileSizeReached = -11811,

	MediaDiscontinuity = -11812,

	MaximumNumberOfSamplesForFileFormatReached = -11813,

	DeviceNotConnected = -11814,

	DeviceInUseByAnotherApplication = -11815,

	DeviceLockedForConfigurationByAnotherProcess = -11817,

	SessionWasInterrupted = -11818,

	MediaServicesWereReset = -11819,

	ExportFailed = -11820,

	DecodeFailed = -11821,

	InvalidSourceMedia = -11822,

	FileAlreadyExists = -11823,

	CompositionTrackSegmentsNotContiguous = -11824,

	InvalidCompositionTrackSegmentDuration = -11825,

	InvalidCompositionTrackSegmentSourceStartTime = -11826,

	InvalidCompositionTrackSegmentSourceDuration = -11827,

	FileFormatNotRecognized = -11828,

	FileFailedToParse = -11829,

	MaximumStillImageCaptureRequestsExceeded = -11830,

	ContentIsProtected = -11831,

	NoImageAtTime = -11832,

	DecoderNotFound = -11833,

	EncoderNotFound = -11834,

	ContentIsNotAuthorized = -11835,

	ApplicationIsNotAuthorized = -11836,

	DeviceIsNotAvailableInBackground = -11837,

	OperationNotSupportedForAsset = -11838,

	DecoderTemporarilyUnavailable = -11839,

	EncoderTemporarilyUnavailable = -11840,

	InvalidVideoComposition = -11841,

	ReferenceForbiddenByReferencePolicy = -11842,

	InvalidOutputURLPathExtension = -11843,

	ScreenCaptureFailed = -11844,

	DisplayWasDisabled = -11845,

	TorchLevelUnavailable = -11846,

	OperationInterrupted = -11847,

	IncompatibleAsset = -11848,

	FailedToLoadMediaData = -11849,

	ServerIncorrectlyConfigured = -11850,

	ApplicationIsNotAuthorizedToUseDevice = -11852,

	FailedToParse = -11853,

	FileTypeDoesNotSupportSampleReferences = -11854,

	UndecodableMediaData = -11855,

	AirPlayControllerRequiresInternet = -11856,

	AirPlayReceiverRequiresInternet = -11857,

	VideoCompositorFailed = -11858,

	RecordingAlreadyInProgress = -11859,

	CreateContentKeyRequestFailed = -11860,

	UnsupportedOutputSettings = -11861,

	OperationNotAllowed = -11862,

	ContentIsUnavailable = -11863,

	FormatUnsupported = -11864,

	MalformedDepth = -11865,

	ContentNotUpdated = -11866,

	NoLongerPlayable = -11867,

	NoCompatibleAlternatesForExternalDisplay = -11868,

	NoSourceTrack = -11869,

	ExternalPlaybackNotSupportedForAsset = -11870,

	OperationNotSupportedForPreset = -11871,

	SessionHardwareCostOverage = -11872,

	UnsupportedDeviceActiveFormat = -11873,

	IncorrectlyConfigured = -11875,

	SegmentStartedWithNonSyncSample = -11876,

	RosettaNotInstalled = -11877,

	OperationCancelled = -11878,

	ContentKeyRequestCancelled = -11879,

	InvalidSampleCursor = -11880,

	FailedToLoadSampleData = -11881,

	AirPlayReceiverTemporarilyUnavailable = -11882,

	EncodeFailed = -11883,

	SandboxExtensionDenied = -11884
}

declare var AVErrorDeviceKey: string;

declare var AVErrorFileSizeKey: string;

declare var AVErrorFileTypeKey: string;

declare var AVErrorMediaSubTypeKey: string;

declare var AVErrorMediaTypeKey: string;

declare var AVErrorPIDKey: string;

declare var AVErrorPersistentTrackIDKey: string;

declare var AVErrorPresentationTimeStampKey: string;

declare var AVErrorRecordingSuccessfullyFinishedKey: string;

declare var AVErrorTimeKey: string;

declare const enum AVExternalContentProtectionStatus {

	Pending = 0,

	Sufficient = 1,

	Insufficient = 2
}

declare class AVExternalStorageDevice extends NSObject {

	static alloc(): AVExternalStorageDevice; // inherited from NSObject

	static new(): AVExternalStorageDevice; // inherited from NSObject

	static requestAccessWithCompletionHandler(handler: (p1: boolean) => void): void;

	readonly connected: boolean;

	readonly displayName: string;

	readonly freeSize: number;

	readonly notRecommendedForCaptureUse: boolean;

	readonly totalSize: number;

	readonly uuid: NSUUID;

	static readonly authorizationStatus: AVAuthorizationStatus;

	nextAvailableURLsWithPathExtensionsError(extensionArray: NSArray<string> | string[]): NSArray<NSURL>;
}

declare class AVExternalStorageDeviceDiscoverySession extends NSObject {

	static alloc(): AVExternalStorageDeviceDiscoverySession; // inherited from NSObject

	static new(): AVExternalStorageDeviceDiscoverySession; // inherited from NSObject

	readonly externalStorageDevices: NSArray<AVExternalStorageDevice>;

	static readonly sharedSession: AVExternalStorageDeviceDiscoverySession;

	static readonly supported: boolean;
}

declare var AVFileType3GPP: string;

declare var AVFileType3GPP2: string;

declare var AVFileTypeAC3: string;

declare var AVFileTypeAHAP: string;

declare var AVFileTypeAIFC: string;

declare var AVFileTypeAIFF: string;

declare var AVFileTypeAMR: string;

declare var AVFileTypeAVCI: string;

declare var AVFileTypeAppleM4A: string;

declare var AVFileTypeAppleM4V: string;

declare var AVFileTypeCoreAudioFormat: string;

declare var AVFileTypeDNG: string;

declare var AVFileTypeEnhancedAC3: string;

declare var AVFileTypeHEIC: string;

declare var AVFileTypeHEIF: string;

declare var AVFileTypeJPEG: string;

declare var AVFileTypeMPEG4: string;

declare var AVFileTypeMPEGLayer3: string;

declare var AVFileTypeProfileMPEG4AppleHLS: string;

declare var AVFileTypeProfileMPEG4CMAFCompliant: string;

declare var AVFileTypeQuickTimeMovie: string;

declare var AVFileTypeSunAU: string;

declare var AVFileTypeTIFF: string;

declare var AVFileTypeWAVE: string;

declare var AVFoundationErrorDomain: string;

interface AVFragmentMinding {

	associatedWithFragmentMinder: boolean;
}
declare var AVFragmentMinding: {

	prototype: AVFragmentMinding;
};

declare class AVFragmentedAsset extends AVURLAsset implements AVFragmentMinding {

	static URLAssetWithURLOptions(URL: NSURL, options: NSDictionary<string, any>): AVFragmentedAsset; // inherited from AVURLAsset

	static alloc(): AVFragmentedAsset; // inherited from NSObject

	static assetWithURL(URL: NSURL): AVFragmentedAsset; // inherited from AVAsset

	static fragmentedAssetWithURLOptions(URL: NSURL, options: NSDictionary<string, any>): AVFragmentedAsset;

	static new(): AVFragmentedAsset; // inherited from NSObject

	static objectWithItemProviderDataTypeIdentifierError(data: NSData, typeIdentifier: string): AVFragmentedAsset; // inherited from NSItemProviderReading

	readonly associatedWithFragmentMinder: boolean; // inherited from AVFragmentMinding

	loadTrackWithTrackIDCompletionHandler(trackID: number, completionHandler: (p1: AVFragmentedAssetTrack, p2: NSError) => void): void;

	trackWithTrackID(trackID: number): AVFragmentedAssetTrack;
}

declare class AVFragmentedAssetMinder extends NSObject {

	static alloc(): AVFragmentedAssetMinder; // inherited from NSObject

	static fragmentedAssetMinderWithAssetMindingInterval(asset: AVAsset, mindingInterval: number): AVFragmentedAssetMinder;

	static new(): AVFragmentedAssetMinder; // inherited from NSObject

	readonly assets: NSArray<AVAsset>;

	mindingInterval: number;

	constructor(o: { asset: AVAsset; mindingInterval: number; });

	addFragmentedAsset(asset: AVAsset): void;

	initWithAssetMindingInterval(asset: AVAsset, mindingInterval: number): this;

	removeFragmentedAsset(asset: AVAsset): void;
}

declare class AVFragmentedAssetTrack extends AVAssetTrack {

	static alloc(): AVFragmentedAssetTrack; // inherited from NSObject

	static new(): AVFragmentedAssetTrack; // inherited from NSObject
}

declare class AVFragmentedMovie extends AVMovie implements AVFragmentMinding {

	static alloc(): AVFragmentedMovie; // inherited from NSObject

	static assetWithURL(URL: NSURL): AVFragmentedMovie; // inherited from AVAsset

	static movieWithDataOptions(data: NSData, options: NSDictionary<string, any>): AVFragmentedMovie; // inherited from AVMovie

	static movieWithURLOptions(URL: NSURL, options: NSDictionary<string, any>): AVFragmentedMovie; // inherited from AVMovie

	static new(): AVFragmentedMovie; // inherited from NSObject

	readonly associatedWithFragmentMinder: boolean; // inherited from AVFragmentMinding

	loadTrackWithTrackIDCompletionHandler(trackID: number, completionHandler: (p1: AVFragmentedMovieTrack, p2: NSError) => void): void;

	trackWithTrackID(trackID: number): AVFragmentedMovieTrack;
}

declare var AVFragmentedMovieContainsMovieFragmentsDidChangeNotification: string;

declare var AVFragmentedMovieDurationDidChangeNotification: string;

declare class AVFragmentedMovieMinder extends AVFragmentedAssetMinder {

	static alloc(): AVFragmentedMovieMinder; // inherited from NSObject

	static fragmentedAssetMinderWithAssetMindingInterval(asset: AVAsset, mindingInterval: number): AVFragmentedMovieMinder; // inherited from AVFragmentedAssetMinder

	static fragmentedMovieMinderWithMovieMindingInterval(movie: AVFragmentedMovie, mindingInterval: number): AVFragmentedMovieMinder;

	static new(): AVFragmentedMovieMinder; // inherited from NSObject

	readonly movies: NSArray<AVFragmentedMovie>;

	constructor(o: { movie: AVFragmentedMovie; mindingInterval: number; });

	addFragmentedMovie(movie: AVFragmentedMovie): void;

	initWithMovieMindingInterval(movie: AVFragmentedMovie, mindingInterval: number): this;

	removeFragmentedMovie(movie: AVFragmentedMovie): void;
}

declare class AVFragmentedMovieTrack extends AVMovieTrack {

	static alloc(): AVFragmentedMovieTrack; // inherited from NSObject

	static new(): AVFragmentedMovieTrack; // inherited from NSObject
}

declare var AVFragmentedMovieTrackSegmentsDidChangeNotification: string;

declare var AVFragmentedMovieTrackTimeRangeDidChangeNotification: string;

declare var AVFragmentedMovieWasDefragmentedNotification: string;

declare class AVFrameRateRange extends NSObject {

	static alloc(): AVFrameRateRange; // inherited from NSObject

	static new(): AVFrameRateRange; // inherited from NSObject

	readonly maxFrameDuration: CMTime;

	readonly maxFrameRate: number;

	readonly minFrameDuration: CMTime;

	readonly minFrameRate: number;
}

declare const enum AVKeyValueStatus {

	Unknown = 0,

	Loading = 1,

	Loaded = 2,

	Failed = 3,

	Cancelled = 4
}

declare var AVLayerVideoGravityResize: string;

declare var AVLayerVideoGravityResizeAspect: string;

declare var AVLayerVideoGravityResizeAspectFill: string;

declare function AVMakeRectWithAspectRatioInsideRect(aspectRatio: CGSize, boundingRect: CGRect): CGRect;

declare var AVMediaCharacteristicAudible: string;

declare var AVMediaCharacteristicCarriesVideoStereoMetadata: string;

declare var AVMediaCharacteristicContainsAlphaChannel: string;

declare var AVMediaCharacteristicContainsHDRVideo: string;

declare var AVMediaCharacteristicContainsOnlyForcedSubtitles: string;

declare var AVMediaCharacteristicContainsStereoMultiviewVideo: string;

declare var AVMediaCharacteristicDescribesMusicAndSoundForAccessibility: string;

declare var AVMediaCharacteristicDescribesVideoForAccessibility: string;

declare var AVMediaCharacteristicDubbedTranslation: string;

declare var AVMediaCharacteristicEasyToRead: string;

declare var AVMediaCharacteristicEnhancesSpeechIntelligibility: string;

declare var AVMediaCharacteristicFrameBased: string;

declare var AVMediaCharacteristicIndicatesHorizontalFieldOfView: string;

declare var AVMediaCharacteristicIsAuxiliaryContent: string;

declare var AVMediaCharacteristicIsMainProgramContent: string;

declare var AVMediaCharacteristicIsOriginalContent: string;

declare var AVMediaCharacteristicLanguageTranslation: string;

declare var AVMediaCharacteristicLegible: string;

declare var AVMediaCharacteristicTactileMinimal: string;

declare var AVMediaCharacteristicTranscribesSpokenDialogForAccessibility: string;

declare var AVMediaCharacteristicUsesWideGamutColorSpace: string;

declare var AVMediaCharacteristicVisual: string;

declare var AVMediaCharacteristicVoiceOverTranslation: string;

declare class AVMediaDataStorage extends NSObject {

	static alloc(): AVMediaDataStorage; // inherited from NSObject

	static new(): AVMediaDataStorage; // inherited from NSObject

	constructor(o: { URL: NSURL; options: NSDictionary<string, any>; });

	URL(): NSURL;

	initWithURLOptions(URL: NSURL, options: NSDictionary<string, any>): this;
}

declare class AVMediaSelection extends NSObject implements NSCopying, NSMutableCopying {

	static alloc(): AVMediaSelection; // inherited from NSObject

	static new(): AVMediaSelection; // inherited from NSObject

	readonly asset: AVAsset;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	mediaSelectionCriteriaCanBeAppliedAutomaticallyToMediaSelectionGroup(mediaSelectionGroup: AVMediaSelectionGroup): boolean;

	mutableCopyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	selectedMediaOptionInMediaSelectionGroup(mediaSelectionGroup: AVMediaSelectionGroup): AVMediaSelectionOption;
}

declare class AVMediaSelectionGroup extends NSObject implements NSCopying {

	static alloc(): AVMediaSelectionGroup; // inherited from NSObject

	static mediaSelectionOptionsFromArrayFilteredAndSortedAccordingToPreferredLanguages(mediaSelectionOptions: NSArray<AVMediaSelectionOption> | AVMediaSelectionOption[], preferredLanguages: NSArray<string> | string[]): NSArray<AVMediaSelectionOption>;

	static mediaSelectionOptionsFromArrayWithLocale(mediaSelectionOptions: NSArray<AVMediaSelectionOption> | AVMediaSelectionOption[], locale: NSLocale): NSArray<AVMediaSelectionOption>;

	static mediaSelectionOptionsFromArrayWithMediaCharacteristics(mediaSelectionOptions: NSArray<AVMediaSelectionOption> | AVMediaSelectionOption[], mediaCharacteristics: NSArray<string> | string[]): NSArray<AVMediaSelectionOption>;

	static mediaSelectionOptionsFromArrayWithoutMediaCharacteristics(mediaSelectionOptions: NSArray<AVMediaSelectionOption> | AVMediaSelectionOption[], mediaCharacteristics: NSArray<string> | string[]): NSArray<AVMediaSelectionOption>;

	static new(): AVMediaSelectionGroup; // inherited from NSObject

	static playableMediaSelectionOptionsFromArray(mediaSelectionOptions: NSArray<AVMediaSelectionOption> | AVMediaSelectionOption[]): NSArray<AVMediaSelectionOption>;

	readonly allowsEmptySelection: boolean;

	readonly defaultOption: AVMediaSelectionOption;

	readonly options: NSArray<AVMediaSelectionOption>;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	makeNowPlayingInfoLanguageOptionGroup(): MPNowPlayingInfoLanguageOptionGroup;

	mediaSelectionOptionWithPropertyList(plist: any): AVMediaSelectionOption;
}

declare class AVMediaSelectionOption extends NSObject implements NSCopying {

	static alloc(): AVMediaSelectionOption; // inherited from NSObject

	static new(): AVMediaSelectionOption; // inherited from NSObject

	readonly availableMetadataFormats: NSArray<string>;

	readonly commonMetadata: NSArray<AVMetadataItem>;

	readonly displayName: string;

	readonly extendedLanguageTag: string;

	readonly locale: NSLocale;

	readonly mediaSubTypes: NSArray<number>;

	readonly mediaType: string;

	readonly playable: boolean;

	associatedMediaSelectionOptionInMediaSelectionGroup(mediaSelectionGroup: AVMediaSelectionGroup): AVMediaSelectionOption;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	displayNameWithLocale(locale: NSLocale): string;

	hasMediaCharacteristic(mediaCharacteristic: string): boolean;

	makeNowPlayingInfoLanguageOption(): MPNowPlayingInfoLanguageOption;

	metadataForFormat(format: string): NSArray<AVMetadataItem>;

	propertyList(): any;
}

declare var AVMediaTypeAudio: string;

declare var AVMediaTypeClosedCaption: string;

declare var AVMediaTypeDepthData: string;

declare var AVMediaTypeHaptic: string;

declare var AVMediaTypeMetadata: string;

declare var AVMediaTypeMetadataObject: string;

declare var AVMediaTypeMuxed: string;

declare var AVMediaTypeSubtitle: string;

declare var AVMediaTypeText: string;

declare var AVMediaTypeTimecode: string;

declare var AVMediaTypeVideo: string;

declare var AVMetadata3GPUserDataKeyAlbumAndTrack: string;

declare var AVMetadata3GPUserDataKeyAuthor: string;

declare var AVMetadata3GPUserDataKeyCollection: string;

declare var AVMetadata3GPUserDataKeyCopyright: string;

declare var AVMetadata3GPUserDataKeyDescription: string;

declare var AVMetadata3GPUserDataKeyGenre: string;

declare var AVMetadata3GPUserDataKeyKeywordList: string;

declare var AVMetadata3GPUserDataKeyLocation: string;

declare var AVMetadata3GPUserDataKeyMediaClassification: string;

declare var AVMetadata3GPUserDataKeyMediaRating: string;

declare var AVMetadata3GPUserDataKeyPerformer: string;

declare var AVMetadata3GPUserDataKeyRecordingYear: string;

declare var AVMetadata3GPUserDataKeyThumbnail: string;

declare var AVMetadata3GPUserDataKeyTitle: string;

declare var AVMetadata3GPUserDataKeyUserRating: string;

declare class AVMetadataBodyObject extends AVMetadataObject implements NSCopying {

	static alloc(): AVMetadataBodyObject; // inherited from NSObject

	static new(): AVMetadataBodyObject; // inherited from NSObject

	readonly bodyID: number;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare class AVMetadataCatBodyObject extends AVMetadataBodyObject implements NSCopying {

	static alloc(): AVMetadataCatBodyObject; // inherited from NSObject

	static new(): AVMetadataCatBodyObject; // inherited from NSObject

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare var AVMetadataCommonIdentifierAccessibilityDescription: string;

declare var AVMetadataCommonIdentifierAlbumName: string;

declare var AVMetadataCommonIdentifierArtist: string;

declare var AVMetadataCommonIdentifierArtwork: string;

declare var AVMetadataCommonIdentifierAssetIdentifier: string;

declare var AVMetadataCommonIdentifierAuthor: string;

declare var AVMetadataCommonIdentifierContributor: string;

declare var AVMetadataCommonIdentifierCopyrights: string;

declare var AVMetadataCommonIdentifierCreationDate: string;

declare var AVMetadataCommonIdentifierCreator: string;

declare var AVMetadataCommonIdentifierDescription: string;

declare var AVMetadataCommonIdentifierFormat: string;

declare var AVMetadataCommonIdentifierLanguage: string;

declare var AVMetadataCommonIdentifierLastModifiedDate: string;

declare var AVMetadataCommonIdentifierLocation: string;

declare var AVMetadataCommonIdentifierMake: string;

declare var AVMetadataCommonIdentifierModel: string;

declare var AVMetadataCommonIdentifierPublisher: string;

declare var AVMetadataCommonIdentifierRelation: string;

declare var AVMetadataCommonIdentifierSoftware: string;

declare var AVMetadataCommonIdentifierSource: string;

declare var AVMetadataCommonIdentifierSubject: string;

declare var AVMetadataCommonIdentifierTitle: string;

declare var AVMetadataCommonIdentifierType: string;

declare var AVMetadataCommonKeyAccessibilityDescription: string;

declare var AVMetadataCommonKeyAlbumName: string;

declare var AVMetadataCommonKeyArtist: string;

declare var AVMetadataCommonKeyArtwork: string;

declare var AVMetadataCommonKeyAuthor: string;

declare var AVMetadataCommonKeyContributor: string;

declare var AVMetadataCommonKeyCopyrights: string;

declare var AVMetadataCommonKeyCreationDate: string;

declare var AVMetadataCommonKeyCreator: string;

declare var AVMetadataCommonKeyDescription: string;

declare var AVMetadataCommonKeyFormat: string;

declare var AVMetadataCommonKeyIdentifier: string;

declare var AVMetadataCommonKeyLanguage: string;

declare var AVMetadataCommonKeyLastModifiedDate: string;

declare var AVMetadataCommonKeyLocation: string;

declare var AVMetadataCommonKeyMake: string;

declare var AVMetadataCommonKeyModel: string;

declare var AVMetadataCommonKeyPublisher: string;

declare var AVMetadataCommonKeyRelation: string;

declare var AVMetadataCommonKeySoftware: string;

declare var AVMetadataCommonKeySource: string;

declare var AVMetadataCommonKeySubject: string;

declare var AVMetadataCommonKeyTitle: string;

declare var AVMetadataCommonKeyType: string;

declare class AVMetadataDogBodyObject extends AVMetadataBodyObject implements NSCopying {

	static alloc(): AVMetadataDogBodyObject; // inherited from NSObject

	static new(): AVMetadataDogBodyObject; // inherited from NSObject

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare var AVMetadataExtraAttributeBaseURIKey: string;

declare var AVMetadataExtraAttributeInfoKey: string;

declare var AVMetadataExtraAttributeValueURIKey: string;

declare class AVMetadataFaceObject extends AVMetadataObject implements NSCopying {

	static alloc(): AVMetadataFaceObject; // inherited from NSObject

	static new(): AVMetadataFaceObject; // inherited from NSObject

	readonly faceID: number;

	readonly hasRollAngle: boolean;

	readonly hasYawAngle: boolean;

	readonly rollAngle: number;

	readonly yawAngle: number;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare var AVMetadataFormatHLSMetadata: string;

declare var AVMetadataFormatID3Metadata: string;

declare var AVMetadataFormatISOUserData: string;

declare var AVMetadataFormatQuickTimeMetadata: string;

declare var AVMetadataFormatQuickTimeUserData: string;

declare var AVMetadataFormatUnknown: string;

declare var AVMetadataFormatiTunesMetadata: string;

declare class AVMetadataGroup extends NSObject {

	static alloc(): AVMetadataGroup; // inherited from NSObject

	static new(): AVMetadataGroup; // inherited from NSObject

	readonly classifyingLabel: string;

	readonly items: NSArray<AVMetadataItem>;

	readonly uniqueID: string;
}

declare class AVMetadataHumanBodyObject extends AVMetadataBodyObject implements NSCopying {

	static alloc(): AVMetadataHumanBodyObject; // inherited from NSObject

	static new(): AVMetadataHumanBodyObject; // inherited from NSObject

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare class AVMetadataHumanFullBodyObject extends AVMetadataBodyObject implements NSCopying {

	static alloc(): AVMetadataHumanFullBodyObject; // inherited from NSObject

	static new(): AVMetadataHumanFullBodyObject; // inherited from NSObject

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare var AVMetadataID3MetadataKeyAlbumSortOrder: string;

declare var AVMetadataID3MetadataKeyAlbumTitle: string;

declare var AVMetadataID3MetadataKeyAttachedPicture: string;

declare var AVMetadataID3MetadataKeyAudioEncryption: string;

declare var AVMetadataID3MetadataKeyAudioSeekPointIndex: string;

declare var AVMetadataID3MetadataKeyBand: string;

declare var AVMetadataID3MetadataKeyBeatsPerMinute: string;

declare var AVMetadataID3MetadataKeyComments: string;

declare var AVMetadataID3MetadataKeyCommercial: string;

declare var AVMetadataID3MetadataKeyCommercialInformation: string;

declare var AVMetadataID3MetadataKeyCommerical: string;

declare var AVMetadataID3MetadataKeyComposer: string;

declare var AVMetadataID3MetadataKeyConductor: string;

declare var AVMetadataID3MetadataKeyContentGroupDescription: string;

declare var AVMetadataID3MetadataKeyContentType: string;

declare var AVMetadataID3MetadataKeyCopyright: string;

declare var AVMetadataID3MetadataKeyCopyrightInformation: string;

declare var AVMetadataID3MetadataKeyDate: string;

declare var AVMetadataID3MetadataKeyEncodedBy: string;

declare var AVMetadataID3MetadataKeyEncodedWith: string;

declare var AVMetadataID3MetadataKeyEncodingTime: string;

declare var AVMetadataID3MetadataKeyEncryption: string;

declare var AVMetadataID3MetadataKeyEqualization: string;

declare var AVMetadataID3MetadataKeyEqualization2: string;

declare var AVMetadataID3MetadataKeyEventTimingCodes: string;

declare var AVMetadataID3MetadataKeyFileOwner: string;

declare var AVMetadataID3MetadataKeyFileType: string;

declare var AVMetadataID3MetadataKeyGeneralEncapsulatedObject: string;

declare var AVMetadataID3MetadataKeyGroupIdentifier: string;

declare var AVMetadataID3MetadataKeyInitialKey: string;

declare var AVMetadataID3MetadataKeyInternationalStandardRecordingCode: string;

declare var AVMetadataID3MetadataKeyInternetRadioStationName: string;

declare var AVMetadataID3MetadataKeyInternetRadioStationOwner: string;

declare var AVMetadataID3MetadataKeyInvolvedPeopleList_v23: string;

declare var AVMetadataID3MetadataKeyInvolvedPeopleList_v24: string;

declare var AVMetadataID3MetadataKeyLanguage: string;

declare var AVMetadataID3MetadataKeyLeadPerformer: string;

declare var AVMetadataID3MetadataKeyLength: string;

declare var AVMetadataID3MetadataKeyLink: string;

declare var AVMetadataID3MetadataKeyLyricist: string;

declare var AVMetadataID3MetadataKeyMPEGLocationLookupTable: string;

declare var AVMetadataID3MetadataKeyMediaType: string;

declare var AVMetadataID3MetadataKeyModifiedBy: string;

declare var AVMetadataID3MetadataKeyMood: string;

declare var AVMetadataID3MetadataKeyMusicCDIdentifier: string;

declare var AVMetadataID3MetadataKeyMusicianCreditsList: string;

declare var AVMetadataID3MetadataKeyOfficialArtistWebpage: string;

declare var AVMetadataID3MetadataKeyOfficialAudioFileWebpage: string;

declare var AVMetadataID3MetadataKeyOfficialAudioSourceWebpage: string;

declare var AVMetadataID3MetadataKeyOfficialInternetRadioStationHomepage: string;

declare var AVMetadataID3MetadataKeyOfficialPublisherWebpage: string;

declare var AVMetadataID3MetadataKeyOriginalAlbumTitle: string;

declare var AVMetadataID3MetadataKeyOriginalArtist: string;

declare var AVMetadataID3MetadataKeyOriginalFilename: string;

declare var AVMetadataID3MetadataKeyOriginalLyricist: string;

declare var AVMetadataID3MetadataKeyOriginalReleaseTime: string;

declare var AVMetadataID3MetadataKeyOriginalReleaseYear: string;

declare var AVMetadataID3MetadataKeyOwnership: string;

declare var AVMetadataID3MetadataKeyPartOfASet: string;

declare var AVMetadataID3MetadataKeyPayment: string;

declare var AVMetadataID3MetadataKeyPerformerSortOrder: string;

declare var AVMetadataID3MetadataKeyPlayCounter: string;

declare var AVMetadataID3MetadataKeyPlaylistDelay: string;

declare var AVMetadataID3MetadataKeyPopularimeter: string;

declare var AVMetadataID3MetadataKeyPositionSynchronization: string;

declare var AVMetadataID3MetadataKeyPrivate: string;

declare var AVMetadataID3MetadataKeyProducedNotice: string;

declare var AVMetadataID3MetadataKeyPublisher: string;

declare var AVMetadataID3MetadataKeyRecommendedBufferSize: string;

declare var AVMetadataID3MetadataKeyRecordingDates: string;

declare var AVMetadataID3MetadataKeyRecordingTime: string;

declare var AVMetadataID3MetadataKeyRelativeVolumeAdjustment: string;

declare var AVMetadataID3MetadataKeyRelativeVolumeAdjustment2: string;

declare var AVMetadataID3MetadataKeyReleaseTime: string;

declare var AVMetadataID3MetadataKeyReverb: string;

declare var AVMetadataID3MetadataKeySeek: string;

declare var AVMetadataID3MetadataKeySetSubtitle: string;

declare var AVMetadataID3MetadataKeySignature: string;

declare var AVMetadataID3MetadataKeySize: string;

declare var AVMetadataID3MetadataKeySubTitle: string;

declare var AVMetadataID3MetadataKeySynchronizedLyric: string;

declare var AVMetadataID3MetadataKeySynchronizedTempoCodes: string;

declare var AVMetadataID3MetadataKeyTaggingTime: string;

declare var AVMetadataID3MetadataKeyTermsOfUse: string;

declare var AVMetadataID3MetadataKeyTime: string;

declare var AVMetadataID3MetadataKeyTitleDescription: string;

declare var AVMetadataID3MetadataKeyTitleSortOrder: string;

declare var AVMetadataID3MetadataKeyTrackNumber: string;

declare var AVMetadataID3MetadataKeyUniqueFileIdentifier: string;

declare var AVMetadataID3MetadataKeyUnsynchronizedLyric: string;

declare var AVMetadataID3MetadataKeyUserText: string;

declare var AVMetadataID3MetadataKeyUserURL: string;

declare var AVMetadataID3MetadataKeyYear: string;

declare var AVMetadataISOUserDataKeyAccessibilityDescription: string;

declare var AVMetadataISOUserDataKeyCopyright: string;

declare var AVMetadataISOUserDataKeyDate: string;

declare var AVMetadataISOUserDataKeyTaggedCharacteristic: string;

declare var AVMetadataIcyMetadataKeyStreamTitle: string;

declare var AVMetadataIcyMetadataKeyStreamURL: string;

declare var AVMetadataIdentifier3GPUserDataAlbumAndTrack: string;

declare var AVMetadataIdentifier3GPUserDataAuthor: string;

declare var AVMetadataIdentifier3GPUserDataCollection: string;

declare var AVMetadataIdentifier3GPUserDataCopyright: string;

declare var AVMetadataIdentifier3GPUserDataDescription: string;

declare var AVMetadataIdentifier3GPUserDataGenre: string;

declare var AVMetadataIdentifier3GPUserDataKeywordList: string;

declare var AVMetadataIdentifier3GPUserDataLocation: string;

declare var AVMetadataIdentifier3GPUserDataMediaClassification: string;

declare var AVMetadataIdentifier3GPUserDataMediaRating: string;

declare var AVMetadataIdentifier3GPUserDataPerformer: string;

declare var AVMetadataIdentifier3GPUserDataRecordingYear: string;

declare var AVMetadataIdentifier3GPUserDataThumbnail: string;

declare var AVMetadataIdentifier3GPUserDataTitle: string;

declare var AVMetadataIdentifier3GPUserDataUserRating: string;

declare var AVMetadataIdentifierID3MetadataAlbumSortOrder: string;

declare var AVMetadataIdentifierID3MetadataAlbumTitle: string;

declare var AVMetadataIdentifierID3MetadataAttachedPicture: string;

declare var AVMetadataIdentifierID3MetadataAudioEncryption: string;

declare var AVMetadataIdentifierID3MetadataAudioSeekPointIndex: string;

declare var AVMetadataIdentifierID3MetadataBand: string;

declare var AVMetadataIdentifierID3MetadataBeatsPerMinute: string;

declare var AVMetadataIdentifierID3MetadataComments: string;

declare var AVMetadataIdentifierID3MetadataCommercial: string;

declare var AVMetadataIdentifierID3MetadataCommercialInformation: string;

declare var AVMetadataIdentifierID3MetadataCommerical: string;

declare var AVMetadataIdentifierID3MetadataComposer: string;

declare var AVMetadataIdentifierID3MetadataConductor: string;

declare var AVMetadataIdentifierID3MetadataContentGroupDescription: string;

declare var AVMetadataIdentifierID3MetadataContentType: string;

declare var AVMetadataIdentifierID3MetadataCopyright: string;

declare var AVMetadataIdentifierID3MetadataCopyrightInformation: string;

declare var AVMetadataIdentifierID3MetadataDate: string;

declare var AVMetadataIdentifierID3MetadataEncodedBy: string;

declare var AVMetadataIdentifierID3MetadataEncodedWith: string;

declare var AVMetadataIdentifierID3MetadataEncodingTime: string;

declare var AVMetadataIdentifierID3MetadataEncryption: string;

declare var AVMetadataIdentifierID3MetadataEqualization: string;

declare var AVMetadataIdentifierID3MetadataEqualization2: string;

declare var AVMetadataIdentifierID3MetadataEventTimingCodes: string;

declare var AVMetadataIdentifierID3MetadataFileOwner: string;

declare var AVMetadataIdentifierID3MetadataFileType: string;

declare var AVMetadataIdentifierID3MetadataGeneralEncapsulatedObject: string;

declare var AVMetadataIdentifierID3MetadataGroupIdentifier: string;

declare var AVMetadataIdentifierID3MetadataInitialKey: string;

declare var AVMetadataIdentifierID3MetadataInternationalStandardRecordingCode: string;

declare var AVMetadataIdentifierID3MetadataInternetRadioStationName: string;

declare var AVMetadataIdentifierID3MetadataInternetRadioStationOwner: string;

declare var AVMetadataIdentifierID3MetadataInvolvedPeopleList_v23: string;

declare var AVMetadataIdentifierID3MetadataInvolvedPeopleList_v24: string;

declare var AVMetadataIdentifierID3MetadataLanguage: string;

declare var AVMetadataIdentifierID3MetadataLeadPerformer: string;

declare var AVMetadataIdentifierID3MetadataLength: string;

declare var AVMetadataIdentifierID3MetadataLink: string;

declare var AVMetadataIdentifierID3MetadataLyricist: string;

declare var AVMetadataIdentifierID3MetadataMPEGLocationLookupTable: string;

declare var AVMetadataIdentifierID3MetadataMediaType: string;

declare var AVMetadataIdentifierID3MetadataModifiedBy: string;

declare var AVMetadataIdentifierID3MetadataMood: string;

declare var AVMetadataIdentifierID3MetadataMusicCDIdentifier: string;

declare var AVMetadataIdentifierID3MetadataMusicianCreditsList: string;

declare var AVMetadataIdentifierID3MetadataOfficialArtistWebpage: string;

declare var AVMetadataIdentifierID3MetadataOfficialAudioFileWebpage: string;

declare var AVMetadataIdentifierID3MetadataOfficialAudioSourceWebpage: string;

declare var AVMetadataIdentifierID3MetadataOfficialInternetRadioStationHomepage: string;

declare var AVMetadataIdentifierID3MetadataOfficialPublisherWebpage: string;

declare var AVMetadataIdentifierID3MetadataOriginalAlbumTitle: string;

declare var AVMetadataIdentifierID3MetadataOriginalArtist: string;

declare var AVMetadataIdentifierID3MetadataOriginalFilename: string;

declare var AVMetadataIdentifierID3MetadataOriginalLyricist: string;

declare var AVMetadataIdentifierID3MetadataOriginalReleaseTime: string;

declare var AVMetadataIdentifierID3MetadataOriginalReleaseYear: string;

declare var AVMetadataIdentifierID3MetadataOwnership: string;

declare var AVMetadataIdentifierID3MetadataPartOfASet: string;

declare var AVMetadataIdentifierID3MetadataPayment: string;

declare var AVMetadataIdentifierID3MetadataPerformerSortOrder: string;

declare var AVMetadataIdentifierID3MetadataPlayCounter: string;

declare var AVMetadataIdentifierID3MetadataPlaylistDelay: string;

declare var AVMetadataIdentifierID3MetadataPopularimeter: string;

declare var AVMetadataIdentifierID3MetadataPositionSynchronization: string;

declare var AVMetadataIdentifierID3MetadataPrivate: string;

declare var AVMetadataIdentifierID3MetadataProducedNotice: string;

declare var AVMetadataIdentifierID3MetadataPublisher: string;

declare var AVMetadataIdentifierID3MetadataRecommendedBufferSize: string;

declare var AVMetadataIdentifierID3MetadataRecordingDates: string;

declare var AVMetadataIdentifierID3MetadataRecordingTime: string;

declare var AVMetadataIdentifierID3MetadataRelativeVolumeAdjustment: string;

declare var AVMetadataIdentifierID3MetadataRelativeVolumeAdjustment2: string;

declare var AVMetadataIdentifierID3MetadataReleaseTime: string;

declare var AVMetadataIdentifierID3MetadataReverb: string;

declare var AVMetadataIdentifierID3MetadataSeek: string;

declare var AVMetadataIdentifierID3MetadataSetSubtitle: string;

declare var AVMetadataIdentifierID3MetadataSignature: string;

declare var AVMetadataIdentifierID3MetadataSize: string;

declare var AVMetadataIdentifierID3MetadataSubTitle: string;

declare var AVMetadataIdentifierID3MetadataSynchronizedLyric: string;

declare var AVMetadataIdentifierID3MetadataSynchronizedTempoCodes: string;

declare var AVMetadataIdentifierID3MetadataTaggingTime: string;

declare var AVMetadataIdentifierID3MetadataTermsOfUse: string;

declare var AVMetadataIdentifierID3MetadataTime: string;

declare var AVMetadataIdentifierID3MetadataTitleDescription: string;

declare var AVMetadataIdentifierID3MetadataTitleSortOrder: string;

declare var AVMetadataIdentifierID3MetadataTrackNumber: string;

declare var AVMetadataIdentifierID3MetadataUniqueFileIdentifier: string;

declare var AVMetadataIdentifierID3MetadataUnsynchronizedLyric: string;

declare var AVMetadataIdentifierID3MetadataUserText: string;

declare var AVMetadataIdentifierID3MetadataUserURL: string;

declare var AVMetadataIdentifierID3MetadataYear: string;

declare var AVMetadataIdentifierISOUserDataAccessibilityDescription: string;

declare var AVMetadataIdentifierISOUserDataCopyright: string;

declare var AVMetadataIdentifierISOUserDataDate: string;

declare var AVMetadataIdentifierISOUserDataTaggedCharacteristic: string;

declare var AVMetadataIdentifierIcyMetadataStreamTitle: string;

declare var AVMetadataIdentifierIcyMetadataStreamURL: string;

declare var AVMetadataIdentifierQuickTimeMetadataAccessibilityDescription: string;

declare var AVMetadataIdentifierQuickTimeMetadataAlbum: string;

declare var AVMetadataIdentifierQuickTimeMetadataArranger: string;

declare var AVMetadataIdentifierQuickTimeMetadataArtist: string;

declare var AVMetadataIdentifierQuickTimeMetadataArtwork: string;

declare var AVMetadataIdentifierQuickTimeMetadataAuthor: string;

declare var AVMetadataIdentifierQuickTimeMetadataAutoLivePhoto: string;

declare var AVMetadataIdentifierQuickTimeMetadataCameraFrameReadoutTime: string;

declare var AVMetadataIdentifierQuickTimeMetadataCameraIdentifier: string;

declare var AVMetadataIdentifierQuickTimeMetadataCollectionUser: string;

declare var AVMetadataIdentifierQuickTimeMetadataComment: string;

declare var AVMetadataIdentifierQuickTimeMetadataComposer: string;

declare var AVMetadataIdentifierQuickTimeMetadataContentIdentifier: string;

declare var AVMetadataIdentifierQuickTimeMetadataCopyright: string;

declare var AVMetadataIdentifierQuickTimeMetadataCreationDate: string;

declare var AVMetadataIdentifierQuickTimeMetadataCredits: string;

declare var AVMetadataIdentifierQuickTimeMetadataDescription: string;

declare var AVMetadataIdentifierQuickTimeMetadataDetectedCatBody: string;

declare var AVMetadataIdentifierQuickTimeMetadataDetectedDogBody: string;

declare var AVMetadataIdentifierQuickTimeMetadataDetectedFace: string;

declare var AVMetadataIdentifierQuickTimeMetadataDetectedHumanBody: string;

declare var AVMetadataIdentifierQuickTimeMetadataDetectedSalientObject: string;

declare var AVMetadataIdentifierQuickTimeMetadataDirectionFacing: string;

declare var AVMetadataIdentifierQuickTimeMetadataDirectionMotion: string;

declare var AVMetadataIdentifierQuickTimeMetadataDirector: string;

declare var AVMetadataIdentifierQuickTimeMetadataDisplayName: string;

declare var AVMetadataIdentifierQuickTimeMetadataEncodedBy: string;

declare var AVMetadataIdentifierQuickTimeMetadataGenre: string;

declare var AVMetadataIdentifierQuickTimeMetadataInformation: string;

declare var AVMetadataIdentifierQuickTimeMetadataIsMontage: string;

declare var AVMetadataIdentifierQuickTimeMetadataKeywords: string;

declare var AVMetadataIdentifierQuickTimeMetadataLivePhotoVitalityScore: string;

declare var AVMetadataIdentifierQuickTimeMetadataLivePhotoVitalityScoringVersion: string;

declare var AVMetadataIdentifierQuickTimeMetadataLocationBody: string;

declare var AVMetadataIdentifierQuickTimeMetadataLocationDate: string;

declare var AVMetadataIdentifierQuickTimeMetadataLocationHorizontalAccuracyInMeters: string;

declare var AVMetadataIdentifierQuickTimeMetadataLocationISO6709: string;

declare var AVMetadataIdentifierQuickTimeMetadataLocationName: string;

declare var AVMetadataIdentifierQuickTimeMetadataLocationNote: string;

declare var AVMetadataIdentifierQuickTimeMetadataLocationRole: string;

declare var AVMetadataIdentifierQuickTimeMetadataMake: string;

declare var AVMetadataIdentifierQuickTimeMetadataModel: string;

declare var AVMetadataIdentifierQuickTimeMetadataOriginalArtist: string;

declare var AVMetadataIdentifierQuickTimeMetadataPerformer: string;

declare var AVMetadataIdentifierQuickTimeMetadataPhonogramRights: string;

declare var AVMetadataIdentifierQuickTimeMetadataPreferredAffineTransform: string;

declare var AVMetadataIdentifierQuickTimeMetadataProducer: string;

declare var AVMetadataIdentifierQuickTimeMetadataPublisher: string;

declare var AVMetadataIdentifierQuickTimeMetadataRatingUser: string;

declare var AVMetadataIdentifierQuickTimeMetadataSoftware: string;

declare var AVMetadataIdentifierQuickTimeMetadataSpatialOverCaptureQualityScore: string;

declare var AVMetadataIdentifierQuickTimeMetadataSpatialOverCaptureQualityScoringVersion: string;

declare var AVMetadataIdentifierQuickTimeMetadataTitle: string;

declare var AVMetadataIdentifierQuickTimeMetadataVideoOrientation: string;

declare var AVMetadataIdentifierQuickTimeMetadataYear: string;

declare var AVMetadataIdentifierQuickTimeMetadataiXML: string;

declare var AVMetadataIdentifierQuickTimeUserDataAccessibilityDescription: string;

declare var AVMetadataIdentifierQuickTimeUserDataAlbum: string;

declare var AVMetadataIdentifierQuickTimeUserDataArranger: string;

declare var AVMetadataIdentifierQuickTimeUserDataArtist: string;

declare var AVMetadataIdentifierQuickTimeUserDataAuthor: string;

declare var AVMetadataIdentifierQuickTimeUserDataChapter: string;

declare var AVMetadataIdentifierQuickTimeUserDataComment: string;

declare var AVMetadataIdentifierQuickTimeUserDataComposer: string;

declare var AVMetadataIdentifierQuickTimeUserDataCopyright: string;

declare var AVMetadataIdentifierQuickTimeUserDataCreationDate: string;

declare var AVMetadataIdentifierQuickTimeUserDataCredits: string;

declare var AVMetadataIdentifierQuickTimeUserDataDescription: string;

declare var AVMetadataIdentifierQuickTimeUserDataDirector: string;

declare var AVMetadataIdentifierQuickTimeUserDataDisclaimer: string;

declare var AVMetadataIdentifierQuickTimeUserDataEncodedBy: string;

declare var AVMetadataIdentifierQuickTimeUserDataFullName: string;

declare var AVMetadataIdentifierQuickTimeUserDataGenre: string;

declare var AVMetadataIdentifierQuickTimeUserDataHostComputer: string;

declare var AVMetadataIdentifierQuickTimeUserDataInformation: string;

declare var AVMetadataIdentifierQuickTimeUserDataKeywords: string;

declare var AVMetadataIdentifierQuickTimeUserDataLocationISO6709: string;

declare var AVMetadataIdentifierQuickTimeUserDataMake: string;

declare var AVMetadataIdentifierQuickTimeUserDataModel: string;

declare var AVMetadataIdentifierQuickTimeUserDataOriginalArtist: string;

declare var AVMetadataIdentifierQuickTimeUserDataOriginalFormat: string;

declare var AVMetadataIdentifierQuickTimeUserDataOriginalSource: string;

declare var AVMetadataIdentifierQuickTimeUserDataPerformers: string;

declare var AVMetadataIdentifierQuickTimeUserDataPhonogramRights: string;

declare var AVMetadataIdentifierQuickTimeUserDataProducer: string;

declare var AVMetadataIdentifierQuickTimeUserDataProduct: string;

declare var AVMetadataIdentifierQuickTimeUserDataPublisher: string;

declare var AVMetadataIdentifierQuickTimeUserDataSoftware: string;

declare var AVMetadataIdentifierQuickTimeUserDataSpecialPlaybackRequirements: string;

declare var AVMetadataIdentifierQuickTimeUserDataTaggedCharacteristic: string;

declare var AVMetadataIdentifierQuickTimeUserDataTrack: string;

declare var AVMetadataIdentifierQuickTimeUserDataTrackName: string;

declare var AVMetadataIdentifierQuickTimeUserDataURLLink: string;

declare var AVMetadataIdentifierQuickTimeUserDataWarning: string;

declare var AVMetadataIdentifierQuickTimeUserDataWriter: string;

declare var AVMetadataIdentifieriTunesMetadataAccountKind: string;

declare var AVMetadataIdentifieriTunesMetadataAcknowledgement: string;

declare var AVMetadataIdentifieriTunesMetadataAlbum: string;

declare var AVMetadataIdentifieriTunesMetadataAlbumArtist: string;

declare var AVMetadataIdentifieriTunesMetadataAppleID: string;

declare var AVMetadataIdentifieriTunesMetadataArranger: string;

declare var AVMetadataIdentifieriTunesMetadataArtDirector: string;

declare var AVMetadataIdentifieriTunesMetadataArtist: string;

declare var AVMetadataIdentifieriTunesMetadataArtistID: string;

declare var AVMetadataIdentifieriTunesMetadataAuthor: string;

declare var AVMetadataIdentifieriTunesMetadataBeatsPerMin: string;

declare var AVMetadataIdentifieriTunesMetadataComposer: string;

declare var AVMetadataIdentifieriTunesMetadataConductor: string;

declare var AVMetadataIdentifieriTunesMetadataContentRating: string;

declare var AVMetadataIdentifieriTunesMetadataCopyright: string;

declare var AVMetadataIdentifieriTunesMetadataCoverArt: string;

declare var AVMetadataIdentifieriTunesMetadataCredits: string;

declare var AVMetadataIdentifieriTunesMetadataDescription: string;

declare var AVMetadataIdentifieriTunesMetadataDirector: string;

declare var AVMetadataIdentifieriTunesMetadataDiscCompilation: string;

declare var AVMetadataIdentifieriTunesMetadataDiscNumber: string;

declare var AVMetadataIdentifieriTunesMetadataEQ: string;

declare var AVMetadataIdentifieriTunesMetadataEncodedBy: string;

declare var AVMetadataIdentifieriTunesMetadataEncodingTool: string;

declare var AVMetadataIdentifieriTunesMetadataExecProducer: string;

declare var AVMetadataIdentifieriTunesMetadataGenreID: string;

declare var AVMetadataIdentifieriTunesMetadataGrouping: string;

declare var AVMetadataIdentifieriTunesMetadataLinerNotes: string;

declare var AVMetadataIdentifieriTunesMetadataLyrics: string;

declare var AVMetadataIdentifieriTunesMetadataOnlineExtras: string;

declare var AVMetadataIdentifieriTunesMetadataOriginalArtist: string;

declare var AVMetadataIdentifieriTunesMetadataPerformer: string;

declare var AVMetadataIdentifieriTunesMetadataPhonogramRights: string;

declare var AVMetadataIdentifieriTunesMetadataPlaylistID: string;

declare var AVMetadataIdentifieriTunesMetadataPredefinedGenre: string;

declare var AVMetadataIdentifieriTunesMetadataProducer: string;

declare var AVMetadataIdentifieriTunesMetadataPublisher: string;

declare var AVMetadataIdentifieriTunesMetadataRecordCompany: string;

declare var AVMetadataIdentifieriTunesMetadataReleaseDate: string;

declare var AVMetadataIdentifieriTunesMetadataSoloist: string;

declare var AVMetadataIdentifieriTunesMetadataSongID: string;

declare var AVMetadataIdentifieriTunesMetadataSongName: string;

declare var AVMetadataIdentifieriTunesMetadataSoundEngineer: string;

declare var AVMetadataIdentifieriTunesMetadataThanks: string;

declare var AVMetadataIdentifieriTunesMetadataTrackNumber: string;

declare var AVMetadataIdentifieriTunesMetadataTrackSubTitle: string;

declare var AVMetadataIdentifieriTunesMetadataUserComment: string;

declare var AVMetadataIdentifieriTunesMetadataUserGenre: string;

declare class AVMetadataItem extends NSObject implements AVAsynchronousKeyValueLoading, NSCopying, NSMutableCopying {

	static alloc(): AVMetadataItem; // inherited from NSObject

	static identifierForKeyKeySpace(key: any, keySpace: string): string;

	static keyForIdentifier(identifier: string): any;

	static keySpaceForIdentifier(identifier: string): string;

	static metadataItemWithPropertiesOfMetadataItemValueLoadingHandler(metadataItem: AVMetadataItem, handler: (p1: AVMetadataItemValueRequest) => void): AVMetadataItem;

	static metadataItemsFromArrayFilteredAndSortedAccordingToPreferredLanguages(metadataItems: NSArray<AVMetadataItem> | AVMetadataItem[], preferredLanguages: NSArray<string> | string[]): NSArray<AVMetadataItem>;

	static metadataItemsFromArrayFilteredByIdentifier(metadataItems: NSArray<AVMetadataItem> | AVMetadataItem[], identifier: string): NSArray<AVMetadataItem>;

	static metadataItemsFromArrayFilteredByMetadataItemFilter(metadataItems: NSArray<AVMetadataItem> | AVMetadataItem[], metadataItemFilter: AVMetadataItemFilter): NSArray<AVMetadataItem>;

	static metadataItemsFromArrayWithKeyKeySpace(metadataItems: NSArray<AVMetadataItem> | AVMetadataItem[], key: any, keySpace: string): NSArray<AVMetadataItem>;

	static metadataItemsFromArrayWithLocale(metadataItems: NSArray<AVMetadataItem> | AVMetadataItem[], locale: NSLocale): NSArray<AVMetadataItem>;

	static new(): AVMetadataItem; // inherited from NSObject

	readonly commonKey: string;

	readonly dataType: string;

	readonly dataValue: NSData;

	readonly dateValue: Date;

	readonly duration: CMTime;

	readonly extendedLanguageTag: string;

	readonly extraAttributes: NSDictionary<string, any>;

	readonly identifier: string;

	readonly key: any;

	readonly keySpace: string;

	readonly locale: NSLocale;

	readonly numberValue: number;

	readonly startDate: Date;

	readonly stringValue: string;

	readonly time: CMTime;

	readonly value: any;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	loadValuesAsynchronouslyForKeysCompletionHandler(keys: NSArray<string> | string[], handler: () => void): void;

	mutableCopyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	statusOfValueForKeyError(key: string): AVKeyValueStatus;
}

declare class AVMetadataItemFilter extends NSObject {

	static alloc(): AVMetadataItemFilter; // inherited from NSObject

	static metadataItemFilterForSharing(): AVMetadataItemFilter;

	static new(): AVMetadataItemFilter; // inherited from NSObject
}

declare class AVMetadataItemValueRequest extends NSObject {

	static alloc(): AVMetadataItemValueRequest; // inherited from NSObject

	static new(): AVMetadataItemValueRequest; // inherited from NSObject

	readonly metadataItem: AVMetadataItem;

	respondWithError(error: NSError): void;

	respondWithValue(value: any): void;
}

declare var AVMetadataKeySpaceAudioFile: string;

declare var AVMetadataKeySpaceCommon: string;

declare var AVMetadataKeySpaceHLSDateRange: string;

declare var AVMetadataKeySpaceID3: string;

declare var AVMetadataKeySpaceISOUserData: string;

declare var AVMetadataKeySpaceIcy: string;

declare var AVMetadataKeySpaceQuickTimeMetadata: string;

declare var AVMetadataKeySpaceQuickTimeUserData: string;

declare var AVMetadataKeySpaceiTunes: string;

declare class AVMetadataMachineReadableCodeObject extends AVMetadataObject {

	static alloc(): AVMetadataMachineReadableCodeObject; // inherited from NSObject

	static new(): AVMetadataMachineReadableCodeObject; // inherited from NSObject

	readonly corners: NSArray<NSDictionary<any, any>>;

	readonly descriptor: CIBarcodeDescriptor;

	readonly stringValue: string;
}

declare class AVMetadataObject extends NSObject {

	static alloc(): AVMetadataObject; // inherited from NSObject

	static new(): AVMetadataObject; // inherited from NSObject

	readonly bounds: CGRect;

	readonly duration: CMTime;

	readonly time: CMTime;

	readonly type: string;
}

declare var AVMetadataObjectTypeAztecCode: string;

declare var AVMetadataObjectTypeCatBody: string;

declare var AVMetadataObjectTypeCodabarCode: string;

declare var AVMetadataObjectTypeCode128Code: string;

declare var AVMetadataObjectTypeCode39Code: string;

declare var AVMetadataObjectTypeCode39Mod43Code: string;

declare var AVMetadataObjectTypeCode93Code: string;

declare var AVMetadataObjectTypeDataMatrixCode: string;

declare var AVMetadataObjectTypeDogBody: string;

declare var AVMetadataObjectTypeEAN13Code: string;

declare var AVMetadataObjectTypeEAN8Code: string;

declare var AVMetadataObjectTypeFace: string;

declare var AVMetadataObjectTypeGS1DataBarCode: string;

declare var AVMetadataObjectTypeGS1DataBarExpandedCode: string;

declare var AVMetadataObjectTypeGS1DataBarLimitedCode: string;

declare var AVMetadataObjectTypeHumanBody: string;

declare var AVMetadataObjectTypeHumanFullBody: string;

declare var AVMetadataObjectTypeITF14Code: string;

declare var AVMetadataObjectTypeInterleaved2of5Code: string;

declare var AVMetadataObjectTypeMicroPDF417Code: string;

declare var AVMetadataObjectTypeMicroQRCode: string;

declare var AVMetadataObjectTypePDF417Code: string;

declare var AVMetadataObjectTypeQRCode: string;

declare var AVMetadataObjectTypeSalientObject: string;

declare var AVMetadataObjectTypeUPCECode: string;

declare var AVMetadataQuickTimeMetadataKeyAccessibilityDescription: string;

declare var AVMetadataQuickTimeMetadataKeyAlbum: string;

declare var AVMetadataQuickTimeMetadataKeyArranger: string;

declare var AVMetadataQuickTimeMetadataKeyArtist: string;

declare var AVMetadataQuickTimeMetadataKeyArtwork: string;

declare var AVMetadataQuickTimeMetadataKeyAuthor: string;

declare var AVMetadataQuickTimeMetadataKeyCameraFrameReadoutTime: string;

declare var AVMetadataQuickTimeMetadataKeyCameraIdentifier: string;

declare var AVMetadataQuickTimeMetadataKeyCollectionUser: string;

declare var AVMetadataQuickTimeMetadataKeyComment: string;

declare var AVMetadataQuickTimeMetadataKeyComposer: string;

declare var AVMetadataQuickTimeMetadataKeyContentIdentifier: string;

declare var AVMetadataQuickTimeMetadataKeyCopyright: string;

declare var AVMetadataQuickTimeMetadataKeyCreationDate: string;

declare var AVMetadataQuickTimeMetadataKeyCredits: string;

declare var AVMetadataQuickTimeMetadataKeyDescription: string;

declare var AVMetadataQuickTimeMetadataKeyDirectionFacing: string;

declare var AVMetadataQuickTimeMetadataKeyDirectionMotion: string;

declare var AVMetadataQuickTimeMetadataKeyDirector: string;

declare var AVMetadataQuickTimeMetadataKeyDisplayName: string;

declare var AVMetadataQuickTimeMetadataKeyEncodedBy: string;

declare var AVMetadataQuickTimeMetadataKeyGenre: string;

declare var AVMetadataQuickTimeMetadataKeyInformation: string;

declare var AVMetadataQuickTimeMetadataKeyIsMontage: string;

declare var AVMetadataQuickTimeMetadataKeyKeywords: string;

declare var AVMetadataQuickTimeMetadataKeyLocationBody: string;

declare var AVMetadataQuickTimeMetadataKeyLocationDate: string;

declare var AVMetadataQuickTimeMetadataKeyLocationISO6709: string;

declare var AVMetadataQuickTimeMetadataKeyLocationName: string;

declare var AVMetadataQuickTimeMetadataKeyLocationNote: string;

declare var AVMetadataQuickTimeMetadataKeyLocationRole: string;

declare var AVMetadataQuickTimeMetadataKeyMake: string;

declare var AVMetadataQuickTimeMetadataKeyModel: string;

declare var AVMetadataQuickTimeMetadataKeyOriginalArtist: string;

declare var AVMetadataQuickTimeMetadataKeyPerformer: string;

declare var AVMetadataQuickTimeMetadataKeyPhonogramRights: string;

declare var AVMetadataQuickTimeMetadataKeyProducer: string;

declare var AVMetadataQuickTimeMetadataKeyPublisher: string;

declare var AVMetadataQuickTimeMetadataKeyRatingUser: string;

declare var AVMetadataQuickTimeMetadataKeySoftware: string;

declare var AVMetadataQuickTimeMetadataKeyTitle: string;

declare var AVMetadataQuickTimeMetadataKeyYear: string;

declare var AVMetadataQuickTimeMetadataKeyiXML: string;

declare var AVMetadataQuickTimeUserDataKeyAccessibilityDescription: string;

declare var AVMetadataQuickTimeUserDataKeyAlbum: string;

declare var AVMetadataQuickTimeUserDataKeyArranger: string;

declare var AVMetadataQuickTimeUserDataKeyArtist: string;

declare var AVMetadataQuickTimeUserDataKeyAuthor: string;

declare var AVMetadataQuickTimeUserDataKeyChapter: string;

declare var AVMetadataQuickTimeUserDataKeyComment: string;

declare var AVMetadataQuickTimeUserDataKeyComposer: string;

declare var AVMetadataQuickTimeUserDataKeyCopyright: string;

declare var AVMetadataQuickTimeUserDataKeyCreationDate: string;

declare var AVMetadataQuickTimeUserDataKeyCredits: string;

declare var AVMetadataQuickTimeUserDataKeyDescription: string;

declare var AVMetadataQuickTimeUserDataKeyDirector: string;

declare var AVMetadataQuickTimeUserDataKeyDisclaimer: string;

declare var AVMetadataQuickTimeUserDataKeyEncodedBy: string;

declare var AVMetadataQuickTimeUserDataKeyFullName: string;

declare var AVMetadataQuickTimeUserDataKeyGenre: string;

declare var AVMetadataQuickTimeUserDataKeyHostComputer: string;

declare var AVMetadataQuickTimeUserDataKeyInformation: string;

declare var AVMetadataQuickTimeUserDataKeyKeywords: string;

declare var AVMetadataQuickTimeUserDataKeyLocationISO6709: string;

declare var AVMetadataQuickTimeUserDataKeyMake: string;

declare var AVMetadataQuickTimeUserDataKeyModel: string;

declare var AVMetadataQuickTimeUserDataKeyOriginalArtist: string;

declare var AVMetadataQuickTimeUserDataKeyOriginalFormat: string;

declare var AVMetadataQuickTimeUserDataKeyOriginalSource: string;

declare var AVMetadataQuickTimeUserDataKeyPerformers: string;

declare var AVMetadataQuickTimeUserDataKeyPhonogramRights: string;

declare var AVMetadataQuickTimeUserDataKeyProducer: string;

declare var AVMetadataQuickTimeUserDataKeyProduct: string;

declare var AVMetadataQuickTimeUserDataKeyPublisher: string;

declare var AVMetadataQuickTimeUserDataKeySoftware: string;

declare var AVMetadataQuickTimeUserDataKeySpecialPlaybackRequirements: string;

declare var AVMetadataQuickTimeUserDataKeyTaggedCharacteristic: string;

declare var AVMetadataQuickTimeUserDataKeyTrack: string;

declare var AVMetadataQuickTimeUserDataKeyTrackName: string;

declare var AVMetadataQuickTimeUserDataKeyURLLink: string;

declare var AVMetadataQuickTimeUserDataKeyWarning: string;

declare var AVMetadataQuickTimeUserDataKeyWriter: string;

declare class AVMetadataSalientObject extends AVMetadataObject implements NSCopying {

	static alloc(): AVMetadataSalientObject; // inherited from NSObject

	static new(): AVMetadataSalientObject; // inherited from NSObject

	readonly objectID: number;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare var AVMetadataiTunesMetadataKeyAccountKind: string;

declare var AVMetadataiTunesMetadataKeyAcknowledgement: string;

declare var AVMetadataiTunesMetadataKeyAlbum: string;

declare var AVMetadataiTunesMetadataKeyAlbumArtist: string;

declare var AVMetadataiTunesMetadataKeyAppleID: string;

declare var AVMetadataiTunesMetadataKeyArranger: string;

declare var AVMetadataiTunesMetadataKeyArtDirector: string;

declare var AVMetadataiTunesMetadataKeyArtist: string;

declare var AVMetadataiTunesMetadataKeyArtistID: string;

declare var AVMetadataiTunesMetadataKeyAuthor: string;

declare var AVMetadataiTunesMetadataKeyBeatsPerMin: string;

declare var AVMetadataiTunesMetadataKeyComposer: string;

declare var AVMetadataiTunesMetadataKeyConductor: string;

declare var AVMetadataiTunesMetadataKeyContentRating: string;

declare var AVMetadataiTunesMetadataKeyCopyright: string;

declare var AVMetadataiTunesMetadataKeyCoverArt: string;

declare var AVMetadataiTunesMetadataKeyCredits: string;

declare var AVMetadataiTunesMetadataKeyDescription: string;

declare var AVMetadataiTunesMetadataKeyDirector: string;

declare var AVMetadataiTunesMetadataKeyDiscCompilation: string;

declare var AVMetadataiTunesMetadataKeyDiscNumber: string;

declare var AVMetadataiTunesMetadataKeyEQ: string;

declare var AVMetadataiTunesMetadataKeyEncodedBy: string;

declare var AVMetadataiTunesMetadataKeyEncodingTool: string;

declare var AVMetadataiTunesMetadataKeyExecProducer: string;

declare var AVMetadataiTunesMetadataKeyGenreID: string;

declare var AVMetadataiTunesMetadataKeyGrouping: string;

declare var AVMetadataiTunesMetadataKeyLinerNotes: string;

declare var AVMetadataiTunesMetadataKeyLyrics: string;

declare var AVMetadataiTunesMetadataKeyOnlineExtras: string;

declare var AVMetadataiTunesMetadataKeyOriginalArtist: string;

declare var AVMetadataiTunesMetadataKeyPerformer: string;

declare var AVMetadataiTunesMetadataKeyPhonogramRights: string;

declare var AVMetadataiTunesMetadataKeyPlaylistID: string;

declare var AVMetadataiTunesMetadataKeyPredefinedGenre: string;

declare var AVMetadataiTunesMetadataKeyProducer: string;

declare var AVMetadataiTunesMetadataKeyPublisher: string;

declare var AVMetadataiTunesMetadataKeyRecordCompany: string;

declare var AVMetadataiTunesMetadataKeyReleaseDate: string;

declare var AVMetadataiTunesMetadataKeySoloist: string;

declare var AVMetadataiTunesMetadataKeySongID: string;

declare var AVMetadataiTunesMetadataKeySongName: string;

declare var AVMetadataiTunesMetadataKeySoundEngineer: string;

declare var AVMetadataiTunesMetadataKeyThanks: string;

declare var AVMetadataiTunesMetadataKeyTrackNumber: string;

declare var AVMetadataiTunesMetadataKeyTrackSubTitle: string;

declare var AVMetadataiTunesMetadataKeyUserComment: string;

declare var AVMetadataiTunesMetadataKeyUserGenre: string;

declare class AVMovie extends AVAsset implements NSCopying, NSMutableCopying {

	static alloc(): AVMovie; // inherited from NSObject

	static assetWithURL(URL: NSURL): AVMovie; // inherited from AVAsset

	static movieTypes(): NSArray<string>;

	static movieWithDataOptions(data: NSData, options: NSDictionary<string, any>): AVMovie;

	static movieWithURLOptions(URL: NSURL, options: NSDictionary<string, any>): AVMovie;

	static new(): AVMovie; // inherited from NSObject

	readonly URL: NSURL;

	readonly canContainMovieFragments: boolean;

	readonly containsMovieFragments: boolean;

	readonly data: NSData;

	readonly defaultMediaDataStorage: AVMediaDataStorage;

	constructor(o: { data: NSData; options: NSDictionary<string, any>; });

	constructor(o: { URL: NSURL; options: NSDictionary<string, any>; });

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	initWithDataOptions(data: NSData, options: NSDictionary<string, any>): this;

	initWithURLOptions(URL: NSURL, options: NSDictionary<string, any>): this;

	isCompatibleWithFileType(fileType: string): boolean;

	loadTrackWithTrackIDCompletionHandler(trackID: number, completionHandler: (p1: AVMovieTrack, p2: NSError) => void): void;

	movieHeaderWithFileTypeError(fileType: string): NSData;

	mutableCopyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	trackWithTrackID(trackID: number): AVMovieTrack;

	writeMovieHeaderToURLFileTypeOptionsError(URL: NSURL, fileType: string, options: AVMovieWritingOptions): boolean;
}

declare var AVMovieReferenceRestrictionsKey: string;

declare var AVMovieShouldSupportAliasDataReferencesKey: string;

declare class AVMovieTrack extends AVAssetTrack {

	static alloc(): AVMovieTrack; // inherited from NSObject

	static new(): AVMovieTrack; // inherited from NSObject

	readonly alternateGroupID: number;

	readonly mediaDataStorage: AVMediaDataStorage;

	readonly mediaDecodeTimeRange: CMTimeRange;

	readonly mediaPresentationTimeRange: CMTimeRange;
}

declare const enum AVMovieWritingOptions {

	AddMovieHeaderToDestination = 0,

	TruncateDestinationToMovieHeaderOnly = 1
}

declare class AVMutableAssetDownloadStorageManagementPolicy extends AVAssetDownloadStorageManagementPolicy {

	static alloc(): AVMutableAssetDownloadStorageManagementPolicy; // inherited from NSObject

	static new(): AVMutableAssetDownloadStorageManagementPolicy; // inherited from NSObject

	expirationDate: Date;

	priority: string;
}

declare class AVMutableAudioMix extends AVAudioMix {

	static alloc(): AVMutableAudioMix; // inherited from NSObject

	static audioMix(): AVMutableAudioMix;

	static new(): AVMutableAudioMix; // inherited from NSObject

	inputParameters: NSArray<AVAudioMixInputParameters>;
}

declare class AVMutableAudioMixInputParameters extends AVAudioMixInputParameters {

	static alloc(): AVMutableAudioMixInputParameters; // inherited from NSObject

	static audioMixInputParameters(): AVMutableAudioMixInputParameters;

	static audioMixInputParametersWithTrack(track: AVAssetTrack): AVMutableAudioMixInputParameters;

	static new(): AVMutableAudioMixInputParameters; // inherited from NSObject

	audioTapProcessor: any;

	audioTimePitchAlgorithm: string;

	trackID: number;

	setVolumeAtTime(volume: number, time: CMTime): void;

	setVolumeRampFromStartVolumeToEndVolumeTimeRange(startVolume: number, endVolume: number, timeRange: CMTimeRange): void;
}

declare class AVMutableComposition extends AVComposition {

	static alloc(): AVMutableComposition; // inherited from NSObject

	static assetWithURL(URL: NSURL): AVMutableComposition; // inherited from AVAsset

	static composition(): AVMutableComposition;

	static compositionWithURLAssetInitializationOptions(URLAssetInitializationOptions: NSDictionary<string, any>): AVMutableComposition;

	static new(): AVMutableComposition; // inherited from NSObject

	naturalSize: CGSize;

	addMutableTrackWithMediaTypePreferredTrackID(mediaType: string, preferredTrackID: number): AVMutableCompositionTrack;

	insertEmptyTimeRange(timeRange: CMTimeRange): void;

	insertTimeRangeOfAssetAtTimeCompletionHandler(timeRange: CMTimeRange, asset: AVAsset, startTime: CMTime, completionHandler: (p1: NSError) => void): void;

	insertTimeRangeOfAssetAtTimeError(timeRange: CMTimeRange, asset: AVAsset, startTime: CMTime): boolean;

	loadTrackWithTrackIDCompletionHandler(trackID: number, completionHandler: (p1: AVMutableCompositionTrack, p2: NSError) => void): void;

	mutableTrackCompatibleWithTrack(track: AVAssetTrack): AVMutableCompositionTrack;

	removeTimeRange(timeRange: CMTimeRange): void;

	removeTrack(track: AVCompositionTrack): void;

	scaleTimeRangeToDuration(timeRange: CMTimeRange, duration: CMTime): void;

	trackWithTrackID(trackID: number): AVMutableCompositionTrack;
}

declare class AVMutableCompositionTrack extends AVCompositionTrack {

	static alloc(): AVMutableCompositionTrack; // inherited from NSObject

	static new(): AVMutableCompositionTrack; // inherited from NSObject

	enabled: boolean;

	extendedLanguageTag: string;

	languageCode: string;

	naturalTimeScale: number;

	preferredTransform: CGAffineTransform;

	preferredVolume: number;

	segments: NSArray<AVCompositionTrackSegment>;

	addTrackAssociationToTrackType(compositionTrack: AVCompositionTrack, trackAssociationType: string): void;

	insertEmptyTimeRange(timeRange: CMTimeRange): void;

	insertTimeRangeOfTrackAtTimeError(timeRange: CMTimeRange, track: AVAssetTrack, startTime: CMTime): boolean;

	insertTimeRangesOfTracksAtTimeError(timeRanges: NSArray<NSValue> | NSValue[], tracks: NSArray<AVAssetTrack> | AVAssetTrack[], startTime: CMTime): boolean;

	removeTimeRange(timeRange: CMTimeRange): void;

	removeTrackAssociationToTrackType(compositionTrack: AVCompositionTrack, trackAssociationType: string): void;

	replaceFormatDescriptionWithFormatDescription(originalFormatDescription: any, replacementFormatDescription: any): void;

	scaleTimeRangeToDuration(timeRange: CMTimeRange, duration: CMTime): void;

	validateTrackSegmentsError(trackSegments: NSArray<AVCompositionTrackSegment> | AVCompositionTrackSegment[]): boolean;
}

declare class AVMutableDateRangeMetadataGroup extends AVDateRangeMetadataGroup {

	static alloc(): AVMutableDateRangeMetadataGroup; // inherited from NSObject

	static new(): AVMutableDateRangeMetadataGroup; // inherited from NSObject

	endDate: Date;

	items: NSArray<AVMetadataItem>;

	startDate: Date;
}

declare class AVMutableMediaSelection extends AVMediaSelection {

	static alloc(): AVMutableMediaSelection; // inherited from NSObject

	static new(): AVMutableMediaSelection; // inherited from NSObject

	selectMediaOptionInMediaSelectionGroup(mediaSelectionOption: AVMediaSelectionOption, mediaSelectionGroup: AVMediaSelectionGroup): void;
}

declare class AVMutableMetadataItem extends AVMetadataItem {

	static alloc(): AVMutableMetadataItem; // inherited from NSObject

	static metadataItem(): AVMutableMetadataItem;

	static new(): AVMutableMetadataItem; // inherited from NSObject

	dataType: string;

	duration: CMTime;

	extendedLanguageTag: string;

	extraAttributes: NSDictionary<string, any>;

	identifier: string;

	key: any;

	keySpace: string;

	locale: NSLocale;

	startDate: Date;

	time: CMTime;

	value: any;
}

declare class AVMutableMovie extends AVMovie {

	static alloc(): AVMutableMovie; // inherited from NSObject

	static assetWithURL(URL: NSURL): AVMutableMovie; // inherited from AVAsset

	static movieWithDataOptions(data: NSData, options: NSDictionary<string, any>): AVMutableMovie; // inherited from AVMovie

	static movieWithDataOptionsError(data: NSData, options: NSDictionary<string, any>): AVMutableMovie;

	static movieWithSettingsFromMovieOptionsError(movie: AVMovie, options: NSDictionary<string, any>): AVMutableMovie;

	static movieWithURLOptions(URL: NSURL, options: NSDictionary<string, any>): AVMutableMovie; // inherited from AVMovie

	static movieWithURLOptionsError(URL: NSURL, options: NSDictionary<string, any>): AVMutableMovie;

	static new(): AVMutableMovie; // inherited from NSObject

	defaultMediaDataStorage: AVMediaDataStorage;

	interleavingPeriod: CMTime;

	metadata: NSArray<AVMetadataItem>;

	modified: boolean;

	preferredRate: number;

	preferredTransform: CGAffineTransform;

	preferredVolume: number;

	timescale: number;

	constructor(o: { data: NSData; options: NSDictionary<string, any>; });

	constructor(o: { settingsFromMovie: AVMovie; options: NSDictionary<string, any>; });

	constructor(o: { URL: NSURL; options: NSDictionary<string, any>; });

	addMutableTrackWithMediaTypeCopySettingsFromTrackOptions(mediaType: string, track: AVAssetTrack, options: NSDictionary<string, any>): AVMutableMovieTrack;

	addMutableTracksCopyingSettingsFromTracksOptions(existingTracks: NSArray<AVAssetTrack> | AVAssetTrack[], options: NSDictionary<string, any>): NSArray<AVMutableMovieTrack>;

	initWithDataOptionsError(data: NSData, options: NSDictionary<string, any>): this;

	initWithSettingsFromMovieOptionsError(movie: AVMovie, options: NSDictionary<string, any>): this;

	initWithURLOptionsError(URL: NSURL, options: NSDictionary<string, any>): this;

	insertEmptyTimeRange(timeRange: CMTimeRange): void;

	insertTimeRangeOfAssetAtTimeCopySampleDataError(timeRange: CMTimeRange, asset: AVAsset, startTime: CMTime, copySampleData: boolean): boolean;

	loadTrackWithTrackIDCompletionHandler(trackID: number, completionHandler: (p1: AVMutableMovieTrack, p2: NSError) => void): void;

	mutableTrackCompatibleWithTrack(track: AVAssetTrack): AVMutableMovieTrack;

	removeTimeRange(timeRange: CMTimeRange): void;

	removeTrack(track: AVMovieTrack): void;

	scaleTimeRangeToDuration(timeRange: CMTimeRange, duration: CMTime): void;

	trackWithTrackID(trackID: number): AVMutableMovieTrack;
}

declare class AVMutableMovieTrack extends AVMovieTrack {

	static alloc(): AVMutableMovieTrack; // inherited from NSObject

	static new(): AVMutableMovieTrack; // inherited from NSObject

	alternateGroupID: number;

	cleanApertureDimensions: CGSize;

	enabled: boolean;

	encodedPixelsDimensions: CGSize;

	extendedLanguageTag: string;

	readonly hasProtectedContent: boolean;

	languageCode: string;

	layer: number;

	mediaDataStorage: AVMediaDataStorage;

	metadata: NSArray<AVMetadataItem>;

	modified: boolean;

	naturalSize: CGSize;

	preferredMediaChunkAlignment: number;

	preferredMediaChunkDuration: CMTime;

	preferredMediaChunkSize: number;

	preferredTransform: CGAffineTransform;

	preferredVolume: number;

	productionApertureDimensions: CGSize;

	sampleReferenceBaseURL: NSURL;

	timescale: number;

	addTrackAssociationToTrackType(movieTrack: AVMovieTrack, trackAssociationType: string): void;

	appendSampleBufferDecodeTimePresentationTimeError(sampleBuffer: any, outDecodeTime: interop.Pointer | interop.Reference<CMTime>, outPresentationTime: interop.Pointer | interop.Reference<CMTime>): boolean;

	insertEmptyTimeRange(timeRange: CMTimeRange): void;

	insertMediaTimeRangeIntoTimeRange(mediaTimeRange: CMTimeRange, trackTimeRange: CMTimeRange): boolean;

	insertTimeRangeOfTrackAtTimeCopySampleDataError(timeRange: CMTimeRange, track: AVAssetTrack, startTime: CMTime, copySampleData: boolean): boolean;

	removeTimeRange(timeRange: CMTimeRange): void;

	removeTrackAssociationToTrackType(movieTrack: AVMovieTrack, trackAssociationType: string): void;

	replaceFormatDescriptionWithFormatDescription(formatDescription: any, newFormatDescription: any): void;

	scaleTimeRangeToDuration(timeRange: CMTimeRange, duration: CMTime): void;
}

declare class AVMutableTimedMetadataGroup extends AVTimedMetadataGroup {

	static alloc(): AVMutableTimedMetadataGroup; // inherited from NSObject

	static new(): AVMutableTimedMetadataGroup; // inherited from NSObject

	items: NSArray<AVMetadataItem>;

	timeRange: CMTimeRange;
}

declare class AVMutableVideoComposition extends AVVideoComposition {

	static alloc(): AVMutableVideoComposition; // inherited from NSObject

	static new(): AVMutableVideoComposition; // inherited from NSObject

	static videoComposition(): AVMutableVideoComposition;

	static videoCompositionWithAssetApplyingCIFiltersWithHandler(asset: AVAsset, applier: (p1: AVAsynchronousCIImageFilteringRequest) => void): AVMutableVideoComposition;

	static videoCompositionWithAssetApplyingCIFiltersWithHandlerCompletionHandler(asset: AVAsset, applier: (p1: AVAsynchronousCIImageFilteringRequest) => void, completionHandler: (p1: AVMutableVideoComposition, p2: NSError) => void): void;

	static videoCompositionWithPropertiesOfAssetPrototypeInstruction(asset: AVAsset, prototypeInstruction: AVVideoCompositionInstruction): AVMutableVideoComposition;

	static videoCompositionWithPropertiesOfAssetPrototypeInstructionCompletionHandler(asset: AVAsset, prototypeInstruction: AVVideoCompositionInstruction, completionHandler: (p1: AVMutableVideoComposition, p2: NSError) => void): void;

	animationTool: AVVideoCompositionCoreAnimationTool;

	colorPrimaries: string;

	colorTransferFunction: string;

	colorYCbCrMatrix: string;

	customVideoCompositorClass: typeof NSObject;

	frameDuration: CMTime;

	instructions: NSArray<AVVideoCompositionInstructionProtocol>;

	perFrameHDRDisplayMetadataPolicy: string;

	renderScale: number;

	renderSize: CGSize;

	sourceSampleDataTrackIDs: NSArray<number>;

	sourceTrackIDForFrameTiming: number;
}

declare class AVMutableVideoCompositionInstruction extends AVVideoCompositionInstruction {

	static alloc(): AVMutableVideoCompositionInstruction; // inherited from NSObject

	static new(): AVMutableVideoCompositionInstruction; // inherited from NSObject

	static videoCompositionInstruction(): AVMutableVideoCompositionInstruction;

	backgroundColor: any;

	enablePostProcessing: boolean;

	layerInstructions: NSArray<AVVideoCompositionLayerInstruction>;

	requiredSourceSampleDataTrackIDs: NSArray<number>;

	timeRange: CMTimeRange;
}

declare class AVMutableVideoCompositionLayerInstruction extends AVVideoCompositionLayerInstruction {

	static alloc(): AVMutableVideoCompositionLayerInstruction; // inherited from NSObject

	static new(): AVMutableVideoCompositionLayerInstruction; // inherited from NSObject

	static videoCompositionLayerInstruction(): AVMutableVideoCompositionLayerInstruction;

	static videoCompositionLayerInstructionWithAssetTrack(track: AVAssetTrack): AVMutableVideoCompositionLayerInstruction;

	trackID: number;

	setCropRectangleAtTime(cropRectangle: CGRect, time: CMTime): void;

	setCropRectangleRampFromStartCropRectangleToEndCropRectangleTimeRange(startCropRectangle: CGRect, endCropRectangle: CGRect, timeRange: CMTimeRange): void;

	setOpacityAtTime(opacity: number, time: CMTime): void;

	setOpacityRampFromStartOpacityToEndOpacityTimeRange(startOpacity: number, endOpacity: number, timeRange: CMTimeRange): void;

	setTransformAtTime(transform: CGAffineTransform, time: CMTime): void;

	setTransformRampFromStartTransformToEndTransformTimeRange(startTransform: CGAffineTransform, endTransform: CGAffineTransform, timeRange: CMTimeRange): void;
}

declare class AVOutputSettingsAssistant extends NSObject {

	static alloc(): AVOutputSettingsAssistant; // inherited from NSObject

	static availableOutputSettingsPresets(): NSArray<string>;

	static new(): AVOutputSettingsAssistant; // inherited from NSObject

	static outputSettingsAssistantWithPreset(presetIdentifier: string): AVOutputSettingsAssistant;

	readonly audioSettings: NSDictionary<string, any>;

	readonly outputFileType: string;

	sourceAudioFormat: any;

	sourceVideoAverageFrameDuration: CMTime;

	sourceVideoFormat: any;

	sourceVideoMinFrameDuration: CMTime;

	readonly videoSettings: NSDictionary<string, any>;
}

declare var AVOutputSettingsPreset1280x720: string;

declare var AVOutputSettingsPreset1920x1080: string;

declare var AVOutputSettingsPreset3840x2160: string;

declare var AVOutputSettingsPreset640x480: string;

declare var AVOutputSettingsPreset960x540: string;

declare var AVOutputSettingsPresetHEVC1920x1080: string;

declare var AVOutputSettingsPresetHEVC1920x1080WithAlpha: string;

declare var AVOutputSettingsPresetHEVC3840x2160: string;

declare var AVOutputSettingsPresetHEVC3840x2160WithAlpha: string;

declare var AVOutputSettingsPresetMVHEVC1440x1440: string;

declare var AVOutputSettingsPresetMVHEVC960x960: string;

declare class AVPersistableContentKeyRequest extends AVContentKeyRequest {

	static alloc(): AVPersistableContentKeyRequest; // inherited from NSObject

	static new(): AVPersistableContentKeyRequest; // inherited from NSObject

	persistableContentKeyFromKeyVendorResponseOptionsError(keyVendorResponse: NSData, options: NSDictionary<string, any>): NSData;
}

interface AVPixelAspectRatio {
	horizontalSpacing: number;
	verticalSpacing: number;
}
declare var AVPixelAspectRatio: interop.StructType<AVPixelAspectRatio>;

declare class AVPlaybackCoordinator extends NSObject {

	static alloc(): AVPlaybackCoordinator; // inherited from NSObject

	static new(): AVPlaybackCoordinator; // inherited from NSObject

	readonly otherParticipants: NSArray<AVCoordinatedPlaybackParticipant>;

	pauseSnapsToMediaTimeOfOriginator: boolean;

	readonly suspensionReasons: NSArray<string>;

	suspensionReasonsThatTriggerWaiting: NSArray<string>;

	beginSuspensionForReason(suspensionReason: string): AVCoordinatedPlaybackSuspension;

	expectedItemTimeAtHostTime(hostClockTime: CMTime): CMTime;

	participantLimitForWaitingOutSuspensionsWithReason(reason: string): number;

	setParticipantLimitForWaitingOutSuspensionsWithReason(participantLimit: number, reason: string): void;
}

declare var AVPlaybackCoordinatorOtherParticipantsDidChangeNotification: string;

interface AVPlaybackCoordinatorPlaybackControlDelegate extends NSObjectProtocol {

	playbackCoordinatorDidIssueBufferingCommandCompletionHandler(coordinator: AVDelegatingPlaybackCoordinator, bufferingCommand: AVDelegatingPlaybackCoordinatorBufferingCommand, completionHandler: () => void): void;

	playbackCoordinatorDidIssuePauseCommandCompletionHandler(coordinator: AVDelegatingPlaybackCoordinator, pauseCommand: AVDelegatingPlaybackCoordinatorPauseCommand, completionHandler: () => void): void;

	playbackCoordinatorDidIssuePlayCommandCompletionHandler(coordinator: AVDelegatingPlaybackCoordinator, playCommand: AVDelegatingPlaybackCoordinatorPlayCommand, completionHandler: () => void): void;

	playbackCoordinatorDidIssueSeekCommandCompletionHandler(coordinator: AVDelegatingPlaybackCoordinator, seekCommand: AVDelegatingPlaybackCoordinatorSeekCommand, completionHandler: () => void): void;
}
declare var AVPlaybackCoordinatorPlaybackControlDelegate: {

	prototype: AVPlaybackCoordinatorPlaybackControlDelegate;
};

declare var AVPlaybackCoordinatorSuspensionReasonsDidChangeNotification: string;

declare class AVPlayer extends NSObject {

	static alloc(): AVPlayer; // inherited from NSObject

	static new(): AVPlayer; // inherited from NSObject

	static playerWithPlayerItem(item: AVPlayerItem): AVPlayer;

	static playerWithURL(URL: NSURL): AVPlayer;

	actionAtItemEnd: AVPlayerActionAtItemEnd;

	readonly airPlayVideoActive: boolean;

	allowsAirPlayVideo: boolean;

	allowsExternalPlayback: boolean;

	appliesMediaSelectionCriteriaAutomatically: boolean;

	audiovisualBackgroundPlaybackPolicy: AVPlayerAudiovisualBackgroundPlaybackPolicy;

	automaticallyWaitsToMinimizeStalling: boolean;

	closedCaptionDisplayEnabled: boolean;

	readonly currentItem: AVPlayerItem;

	defaultRate: number;

	readonly error: NSError;

	readonly externalPlaybackActive: boolean;

	externalPlaybackVideoGravity: string;

	masterClock: any;

	muted: boolean;

	readonly outputObscuredDueToInsufficientExternalProtection: boolean;

	readonly playbackCoordinator: AVPlayerPlaybackCoordinator;

	preventsDisplaySleepDuringVideoPlayback: boolean;

	rate: number;

	readonly reasonForWaitingToPlay: string;

	sourceClock: any;

	readonly status: AVPlayerStatus;

	readonly timeControlStatus: AVPlayerTimeControlStatus;

	usesAirPlayVideoWhileAirPlayScreenIsActive: boolean;

	usesExternalPlaybackWhileExternalScreenIsActive: boolean;

	videoOutput: AVPlayerVideoOutput;

	volume: number;

	static readonly availableHDRModes: AVPlayerHDRMode;

	static readonly eligibleForHDRPlayback: boolean;

	constructor(o: { playerItem: AVPlayerItem; });

	constructor(o: { URL: NSURL; });

	addBoundaryTimeObserverForTimesQueueUsingBlock(times: NSArray<NSValue> | NSValue[], queue: interop.Pointer | interop.Reference<any>, block: () => void): any;

	addPeriodicTimeObserverForIntervalQueueUsingBlock(interval: CMTime, queue: interop.Pointer | interop.Reference<any>, block: (p1: CMTime) => void): any;

	cancelPendingPrerolls(): void;

	currentTime(): CMTime;

	initWithPlayerItem(item: AVPlayerItem): this;

	initWithURL(URL: NSURL): this;

	mediaSelectionCriteriaForMediaCharacteristic(mediaCharacteristic: string): AVPlayerMediaSelectionCriteria;

	pause(): void;

	play(): void;

	playImmediatelyAtRate(rate: number): void;

	prerollAtRateCompletionHandler(rate: number, completionHandler: (p1: boolean) => void): void;

	removeTimeObserver(observer: any): void;

	replaceCurrentItemWithPlayerItem(item: AVPlayerItem): void;

	seekToDate(date: Date): void;

	seekToDateCompletionHandler(date: Date, completionHandler: (p1: boolean) => void): void;

	seekToTime(time: CMTime): void;

	seekToTimeCompletionHandler(time: CMTime, completionHandler: (p1: boolean) => void): void;

	seekToTimeToleranceBeforeToleranceAfter(time: CMTime, toleranceBefore: CMTime, toleranceAfter: CMTime): void;

	seekToTimeToleranceBeforeToleranceAfterCompletionHandler(time: CMTime, toleranceBefore: CMTime, toleranceAfter: CMTime, completionHandler: (p1: boolean) => void): void;

	setMediaSelectionCriteriaForMediaCharacteristic(criteria: AVPlayerMediaSelectionCriteria, mediaCharacteristic: string): void;

	setRateTimeAtHostTime(rate: number, itemTime: CMTime, hostClockTime: CMTime): void;
}

declare const enum AVPlayerActionAtItemEnd {

	Advance = 0,

	Pause = 1,

	None = 2
}

declare const enum AVPlayerAudiovisualBackgroundPlaybackPolicy {

	Automatic = 1,

	Pauses = 2,

	ContinuesIfPossible = 3
}

declare var AVPlayerAvailableHDRModesDidChangeNotification: string;

declare var AVPlayerEligibleForHDRPlaybackDidChangeNotification: string;

declare const enum AVPlayerHDRMode {

	HLG = 1,

	HDR10 = 2,

	DolbyVision = 4
}

declare class AVPlayerInterstitialEvent extends NSObject implements NSCopying {

	static alloc(): AVPlayerInterstitialEvent; // inherited from NSObject

	static interstitialEventWithPrimaryItemDate(primaryItem: AVPlayerItem, date: Date): AVPlayerInterstitialEvent;

	static interstitialEventWithPrimaryItemIdentifierDateTemplateItemsRestrictionsResumptionOffsetPlayoutLimitUserDefinedAttributes(primaryItem: AVPlayerItem, identifier: string, date: Date, templateItems: NSArray<AVPlayerItem> | AVPlayerItem[], restrictions: AVPlayerInterstitialEventRestrictions, resumptionOffset: CMTime, playoutLimit: CMTime, userDefinedAttributes: NSDictionary<any, any>): AVPlayerInterstitialEvent;

	static interstitialEventWithPrimaryItemIdentifierTimeTemplateItemsRestrictionsResumptionOffsetPlayoutLimitUserDefinedAttributes(primaryItem: AVPlayerItem, identifier: string, time: CMTime, templateItems: NSArray<AVPlayerItem> | AVPlayerItem[], restrictions: AVPlayerInterstitialEventRestrictions, resumptionOffset: CMTime, playoutLimit: CMTime, userDefinedAttributes: NSDictionary<any, any>): AVPlayerInterstitialEvent;

	static interstitialEventWithPrimaryItemTime(primaryItem: AVPlayerItem, time: CMTime): AVPlayerInterstitialEvent;

	static new(): AVPlayerInterstitialEvent; // inherited from NSObject

	alignsResumptionWithPrimarySegmentBoundary: boolean;

	alignsStartWithPrimarySegmentBoundary: boolean;

	readonly assetListResponse: NSDictionary<any, any>;

	cue: string;

	date: Date;

	identifier: string;

	playoutLimit: CMTime;

	primaryItem: AVPlayerItem;

	restrictions: AVPlayerInterstitialEventRestrictions;

	resumptionOffset: CMTime;

	templateItems: NSArray<AVPlayerItem>;

	time: CMTime;

	userDefinedAttributes: NSDictionary<any, any>;

	willPlayOnce: boolean;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare const enum AVPlayerInterstitialEventAssetListResponseStatus {

	Available = 0,

	Cleared = 1,

	Unavailable = 2
}

declare class AVPlayerInterstitialEventController extends AVPlayerInterstitialEventMonitor {

	static alloc(): AVPlayerInterstitialEventController; // inherited from NSObject

	static interstitialEventControllerWithPrimaryPlayer(primaryPlayer: AVPlayer): AVPlayerInterstitialEventController;

	static interstitialEventMonitorWithPrimaryPlayer(primaryPlayer: AVPlayer): AVPlayerInterstitialEventController; // inherited from AVPlayerInterstitialEventMonitor

	static new(): AVPlayerInterstitialEventController; // inherited from NSObject

	events: NSArray<AVPlayerInterstitialEvent>;

	cancelCurrentEventWithResumptionOffset(resumptionOffset: CMTime): void;
}

declare var AVPlayerInterstitialEventJoinCue: string;

declare var AVPlayerInterstitialEventLeaveCue: string;

declare class AVPlayerInterstitialEventMonitor extends NSObject {

	static alloc(): AVPlayerInterstitialEventMonitor; // inherited from NSObject

	static interstitialEventMonitorWithPrimaryPlayer(primaryPlayer: AVPlayer): AVPlayerInterstitialEventMonitor;

	static new(): AVPlayerInterstitialEventMonitor; // inherited from NSObject

	readonly currentEvent: AVPlayerInterstitialEvent;

	readonly events: NSArray<AVPlayerInterstitialEvent>;

	readonly interstitialPlayer: AVQueuePlayer;

	readonly primaryPlayer: AVPlayer;

	constructor(o: { primaryPlayer: AVPlayer; });

	initWithPrimaryPlayer(primaryPlayer: AVPlayer): this;
}

declare var AVPlayerInterstitialEventMonitorAssetListResponseStatusDidChangeErrorKey: string;

declare var AVPlayerInterstitialEventMonitorAssetListResponseStatusDidChangeEventKey: string;

declare var AVPlayerInterstitialEventMonitorAssetListResponseStatusDidChangeNotification: string;

declare var AVPlayerInterstitialEventMonitorAssetListResponseStatusDidChangeStatusKey: string;

declare var AVPlayerInterstitialEventMonitorCurrentEventDidChangeNotification: string;

declare var AVPlayerInterstitialEventMonitorEventsDidChangeNotification: string;

declare var AVPlayerInterstitialEventNoCue: string;

declare const enum AVPlayerInterstitialEventRestrictions {

	None = 0,

	ConstrainsSeekingForwardInPrimaryContent = 1,

	RequiresPlaybackAtPreferredRateForAdvancement = 4,

	DefaultPolicy = 0
}

declare class AVPlayerItem extends NSObject implements NSCopying {

	static alloc(): AVPlayerItem; // inherited from NSObject

	static new(): AVPlayerItem; // inherited from NSObject

	static playerItemWithAsset(asset: AVAsset): AVPlayerItem;

	static playerItemWithAssetAutomaticallyLoadedAssetKeys(asset: AVAsset, automaticallyLoadedAssetKeys: NSArray<string> | string[]): AVPlayerItem;

	static playerItemWithURL(URL: NSURL): AVPlayerItem;

	allowedAudioSpatializationFormats: AVAudioSpatializationFormats;

	appliesPerFrameHDRDisplayMetadata: boolean;

	readonly asset: AVAsset;

	audioMix: AVAudioMix;

	audioSpatializationAllowed: boolean;

	audioTimePitchAlgorithm: string;

	automaticallyHandlesInterstitialEvents: boolean;

	readonly automaticallyLoadedAssetKeys: NSArray<string>;

	automaticallyPreservesTimeOffsetFromLive: boolean;

	readonly canPlayFastForward: boolean;

	readonly canPlayFastReverse: boolean;

	readonly canPlayReverse: boolean;

	readonly canPlaySlowForward: boolean;

	readonly canPlaySlowReverse: boolean;

	readonly canStepBackward: boolean;

	readonly canStepForward: boolean;

	canUseNetworkResourcesForLiveStreamingWhilePaused: boolean;

	configuredTimeOffsetFromLive: CMTime;

	readonly currentMediaSelection: AVMediaSelection;

	readonly customVideoCompositor: AVVideoCompositing;

	readonly duration: CMTime;

	readonly error: NSError;

	externalMetadata: NSArray<AVMetadataItem>;

	forwardPlaybackEndTime: CMTime;

	readonly interstitialTimeRanges: NSArray<AVInterstitialTimeRange>;

	readonly loadedTimeRanges: NSArray<NSValue>;

	readonly mediaDataCollectors: NSArray<AVPlayerItemMediaDataCollector>;

	nowPlayingInfo: NSDictionary<string, any>;

	readonly outputs: NSArray<AVPlayerItemOutput>;

	readonly playbackBufferEmpty: boolean;

	readonly playbackBufferFull: boolean;

	readonly playbackLikelyToKeepUp: boolean;

	preferredForwardBufferDuration: number;

	preferredMaximumResolution: CGSize;

	preferredMaximumResolutionForExpensiveNetworks: CGSize;

	preferredPeakBitRate: number;

	preferredPeakBitRateForExpensiveNetworks: number;

	readonly presentationSize: CGSize;

	readonly recommendedTimeOffsetFromLive: CMTime;

	reversePlaybackEndTime: CMTime;

	readonly seekableTimeRanges: NSArray<NSValue>;

	seekingWaitsForVideoCompositionRendering: boolean;

	startsOnFirstEligibleVariant: boolean;

	readonly status: AVPlayerItemStatus;

	readonly templatePlayerItem: AVPlayerItem;

	textStyleRules: NSArray<AVTextStyleRule>;

	readonly timebase: any;

	readonly timedMetadata: NSArray<AVMetadataItem>;

	readonly tracks: NSArray<AVPlayerItemTrack>;

	variantPreferences: AVVariantPreferences;

	videoApertureMode: string;

	videoComposition: AVVideoComposition;

	constructor(o: { asset: AVAsset; });

	constructor(o: { asset: AVAsset; automaticallyLoadedAssetKeys: NSArray<string> | string[]; });

	constructor(o: { URL: NSURL; });

	accessLog(): AVPlayerItemAccessLog;

	addMediaDataCollector(collector: AVPlayerItemMediaDataCollector): void;

	addOutput(output: AVPlayerItemOutput): void;

	cancelPendingSeeks(): void;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	currentDate(): Date;

	currentTime(): CMTime;

	errorLog(): AVPlayerItemErrorLog;

	initWithAsset(asset: AVAsset): this;

	initWithAssetAutomaticallyLoadedAssetKeys(asset: AVAsset, automaticallyLoadedAssetKeys: NSArray<string> | string[]): this;

	initWithURL(URL: NSURL): this;

	removeMediaDataCollector(collector: AVPlayerItemMediaDataCollector): void;

	removeOutput(output: AVPlayerItemOutput): void;

	seekToDate(date: Date): boolean;

	seekToDateCompletionHandler(date: Date, completionHandler: (p1: boolean) => void): boolean;

	seekToTime(time: CMTime): void;

	seekToTimeCompletionHandler(time: CMTime, completionHandler: (p1: boolean) => void): void;

	seekToTimeToleranceBeforeToleranceAfter(time: CMTime, toleranceBefore: CMTime, toleranceAfter: CMTime): void;

	seekToTimeToleranceBeforeToleranceAfterCompletionHandler(time: CMTime, toleranceBefore: CMTime, toleranceAfter: CMTime, completionHandler: (p1: boolean) => void): void;

	selectMediaOptionAutomaticallyInMediaSelectionGroup(mediaSelectionGroup: AVMediaSelectionGroup): void;

	selectMediaOptionInMediaSelectionGroup(mediaSelectionOption: AVMediaSelectionOption, mediaSelectionGroup: AVMediaSelectionGroup): void;

	selectedMediaOptionInMediaSelectionGroup(mediaSelectionGroup: AVMediaSelectionGroup): AVMediaSelectionOption;

	stepByCount(stepCount: number): void;
}

declare class AVPlayerItemAccessLog extends NSObject implements NSCopying {

	static alloc(): AVPlayerItemAccessLog; // inherited from NSObject

	static new(): AVPlayerItemAccessLog; // inherited from NSObject

	readonly events: NSArray<AVPlayerItemAccessLogEvent>;

	readonly extendedLogDataStringEncoding: number;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	extendedLogData(): NSData;
}

declare class AVPlayerItemAccessLogEvent extends NSObject implements NSCopying {

	static alloc(): AVPlayerItemAccessLogEvent; // inherited from NSObject

	static new(): AVPlayerItemAccessLogEvent; // inherited from NSObject

	readonly URI: string;

	readonly averageAudioBitrate: number;

	readonly averageVideoBitrate: number;

	readonly downloadOverdue: number;

	readonly durationWatched: number;

	readonly indicatedAverageBitrate: number;

	readonly indicatedBitrate: number;

	readonly mediaRequestsWWAN: number;

	readonly numberOfBytesTransferred: number;

	readonly numberOfDroppedVideoFrames: number;

	readonly numberOfMediaRequests: number;

	readonly numberOfSegmentsDownloaded: number;

	readonly numberOfServerAddressChanges: number;

	readonly numberOfStalls: number;

	readonly observedBitrate: number;

	readonly observedBitrateStandardDeviation: number;

	readonly observedMaxBitrate: number;

	readonly observedMinBitrate: number;

	readonly playbackSessionID: string;

	readonly playbackStartDate: Date;

	readonly playbackStartOffset: number;

	readonly playbackType: string;

	readonly segmentsDownloadedDuration: number;

	readonly serverAddress: string;

	readonly startupTime: number;

	readonly switchBitrate: number;

	readonly transferDuration: number;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare var AVPlayerItemDidPlayToEndTimeNotification: string;

declare class AVPlayerItemErrorLog extends NSObject implements NSCopying {

	static alloc(): AVPlayerItemErrorLog; // inherited from NSObject

	static new(): AVPlayerItemErrorLog; // inherited from NSObject

	readonly events: NSArray<AVPlayerItemErrorLogEvent>;

	readonly extendedLogDataStringEncoding: number;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	extendedLogData(): NSData;
}

declare class AVPlayerItemErrorLogEvent extends NSObject implements NSCopying {

	static alloc(): AVPlayerItemErrorLogEvent; // inherited from NSObject

	static new(): AVPlayerItemErrorLogEvent; // inherited from NSObject

	readonly URI: string;

	readonly date: Date;

	readonly errorComment: string;

	readonly errorDomain: string;

	readonly errorStatusCode: number;

	readonly playbackSessionID: string;

	readonly serverAddress: string;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare var AVPlayerItemFailedToPlayToEndTimeErrorKey: string;

declare var AVPlayerItemFailedToPlayToEndTimeNotification: string;

declare class AVPlayerItemLegibleOutput extends AVPlayerItemOutput {

	static alloc(): AVPlayerItemLegibleOutput; // inherited from NSObject

	static new(): AVPlayerItemLegibleOutput; // inherited from NSObject

	advanceIntervalForDelegateInvocation: number;

	readonly delegate: AVPlayerItemLegibleOutputPushDelegate;

	readonly delegateQueue: interop.Pointer | interop.Reference<any>;

	textStylingResolution: string;

	constructor(o: { mediaSubtypesForNativeRepresentation: NSArray<number> | number[]; });

	initWithMediaSubtypesForNativeRepresentation(subtypes: NSArray<number> | number[]): this;

	setDelegateQueue(delegate: AVPlayerItemLegibleOutputPushDelegate, delegateQueue: interop.Pointer | interop.Reference<any>): void;
}

interface AVPlayerItemLegibleOutputPushDelegate extends AVPlayerItemOutputPushDelegate {

	legibleOutputDidOutputAttributedStringsNativeSampleBuffersForItemTime?(output: AVPlayerItemLegibleOutput, strings: NSArray<NSAttributedString> | NSAttributedString[], nativeSamples: NSArray<any> | any[], itemTime: CMTime): void;
}
declare var AVPlayerItemLegibleOutputPushDelegate: {

	prototype: AVPlayerItemLegibleOutputPushDelegate;
};

declare var AVPlayerItemLegibleOutputTextStylingResolutionDefault: string;

declare var AVPlayerItemLegibleOutputTextStylingResolutionSourceAndRulesOnly: string;

declare class AVPlayerItemMediaDataCollector extends NSObject {

	static alloc(): AVPlayerItemMediaDataCollector; // inherited from NSObject

	static new(): AVPlayerItemMediaDataCollector; // inherited from NSObject
}

declare var AVPlayerItemMediaSelectionDidChangeNotification: string;

declare class AVPlayerItemMetadataCollector extends AVPlayerItemMediaDataCollector {

	static alloc(): AVPlayerItemMetadataCollector; // inherited from NSObject

	static new(): AVPlayerItemMetadataCollector; // inherited from NSObject

	readonly delegate: AVPlayerItemMetadataCollectorPushDelegate;

	readonly delegateQueue: interop.Pointer | interop.Reference<any>;

	constructor(o: { identifiers: NSArray<string> | string[]; classifyingLabels: NSArray<string> | string[]; });

	initWithIdentifiersClassifyingLabels(identifiers: NSArray<string> | string[], classifyingLabels: NSArray<string> | string[]): this;

	setDelegateQueue(delegate: AVPlayerItemMetadataCollectorPushDelegate, delegateQueue: interop.Pointer | interop.Reference<any>): void;
}

interface AVPlayerItemMetadataCollectorPushDelegate extends NSObjectProtocol {

	metadataCollectorDidCollectDateRangeMetadataGroupsIndexesOfNewGroupsIndexesOfModifiedGroups(metadataCollector: AVPlayerItemMetadataCollector, metadataGroups: NSArray<AVDateRangeMetadataGroup> | AVDateRangeMetadataGroup[], indexesOfNewGroups: NSIndexSet, indexesOfModifiedGroups: NSIndexSet): void;
}
declare var AVPlayerItemMetadataCollectorPushDelegate: {

	prototype: AVPlayerItemMetadataCollectorPushDelegate;
};

declare class AVPlayerItemMetadataOutput extends AVPlayerItemOutput {

	static alloc(): AVPlayerItemMetadataOutput; // inherited from NSObject

	static new(): AVPlayerItemMetadataOutput; // inherited from NSObject

	advanceIntervalForDelegateInvocation: number;

	readonly delegate: AVPlayerItemMetadataOutputPushDelegate;

	readonly delegateQueue: interop.Pointer | interop.Reference<any>;

	constructor(o: { identifiers: NSArray<string> | string[]; });

	initWithIdentifiers(identifiers: NSArray<string> | string[]): this;

	setDelegateQueue(delegate: AVPlayerItemMetadataOutputPushDelegate, delegateQueue: interop.Pointer | interop.Reference<any>): void;
}

interface AVPlayerItemMetadataOutputPushDelegate extends AVPlayerItemOutputPushDelegate {

	metadataOutputDidOutputTimedMetadataGroupsFromPlayerItemTrack?(output: AVPlayerItemMetadataOutput, groups: NSArray<AVTimedMetadataGroup> | AVTimedMetadataGroup[], track: AVPlayerItemTrack): void;
}
declare var AVPlayerItemMetadataOutputPushDelegate: {

	prototype: AVPlayerItemMetadataOutputPushDelegate;
};

declare var AVPlayerItemNewAccessLogEntryNotification: string;

declare var AVPlayerItemNewErrorLogEntryNotification: string;

declare class AVPlayerItemOutput extends NSObject {

	static alloc(): AVPlayerItemOutput; // inherited from NSObject

	static new(): AVPlayerItemOutput; // inherited from NSObject

	suppressesPlayerRendering: boolean;

	itemTimeForHostTime(hostTimeInSeconds: number): CMTime;

	itemTimeForMachAbsoluteTime(machAbsoluteTime: number): CMTime;
}

interface AVPlayerItemOutputPullDelegate extends NSObjectProtocol {

	outputMediaDataWillChange?(sender: AVPlayerItemOutput): void;

	outputSequenceWasFlushed?(output: AVPlayerItemOutput): void;
}
declare var AVPlayerItemOutputPullDelegate: {

	prototype: AVPlayerItemOutputPullDelegate;
};

interface AVPlayerItemOutputPushDelegate extends NSObjectProtocol {

	outputSequenceWasFlushed?(output: AVPlayerItemOutput): void;
}
declare var AVPlayerItemOutputPushDelegate: {

	prototype: AVPlayerItemOutputPushDelegate;
};

declare var AVPlayerItemPlaybackStalledNotification: string;

declare var AVPlayerItemRecommendedTimeOffsetFromLiveDidChangeNotification: string;

declare const enum AVPlayerItemStatus {

	Unknown = 0,

	ReadyToPlay = 1,

	Failed = 2
}

declare var AVPlayerItemTimeJumpedNotification: string;

declare var AVPlayerItemTimeJumpedOriginatingParticipantKey: string;

declare class AVPlayerItemTrack extends NSObject {

	static alloc(): AVPlayerItemTrack; // inherited from NSObject

	static new(): AVPlayerItemTrack; // inherited from NSObject

	readonly assetTrack: AVAssetTrack;

	readonly currentVideoFrameRate: number;

	enabled: boolean;
}

declare class AVPlayerItemVideoOutput extends AVPlayerItemOutput {

	static alloc(): AVPlayerItemVideoOutput; // inherited from NSObject

	static new(): AVPlayerItemVideoOutput; // inherited from NSObject

	readonly delegate: AVPlayerItemOutputPullDelegate;

	readonly delegateQueue: interop.Pointer | interop.Reference<any>;

	constructor(o: { outputSettings: NSDictionary<string, any>; });

	constructor(o: { pixelBufferAttributes: NSDictionary<string, any>; });

	copyPixelBufferForItemTimeItemTimeForDisplay(itemTime: CMTime, outItemTimeForDisplay: interop.Pointer | interop.Reference<CMTime>): any;

	hasNewPixelBufferForItemTime(itemTime: CMTime): boolean;

	initWithOutputSettings(outputSettings: NSDictionary<string, any>): this;

	initWithPixelBufferAttributes(pixelBufferAttributes: NSDictionary<string, any>): this;

	requestNotificationOfMediaDataChangeWithAdvanceInterval(interval: number): void;

	setDelegateQueue(delegate: AVPlayerItemOutputPullDelegate, delegateQueue: interop.Pointer | interop.Reference<any>): void;
}

declare class AVPlayerLayer extends CALayer {

	static alloc(): AVPlayerLayer; // inherited from NSObject

	static layer(): AVPlayerLayer; // inherited from CALayer

	static new(): AVPlayerLayer; // inherited from NSObject

	static playerLayerWithPlayer(player: AVPlayer): AVPlayerLayer;

	pixelBufferAttributes: NSDictionary<string, any>;

	player: AVPlayer;

	readonly readyForDisplay: boolean;

	videoGravity: string;

	readonly videoRect: CGRect;

	copyDisplayedPixelBuffer(): any;
}

declare class AVPlayerLooper extends NSObject {

	static alloc(): AVPlayerLooper; // inherited from NSObject

	static new(): AVPlayerLooper; // inherited from NSObject

	static playerLooperWithPlayerTemplateItem(player: AVQueuePlayer, itemToLoop: AVPlayerItem): AVPlayerLooper;

	static playerLooperWithPlayerTemplateItemTimeRange(player: AVQueuePlayer, itemToLoop: AVPlayerItem, loopRange: CMTimeRange): AVPlayerLooper;

	readonly error: NSError;

	readonly loopCount: number;

	readonly loopingPlayerItems: NSArray<AVPlayerItem>;

	readonly status: AVPlayerLooperStatus;

	constructor(o: { player: AVQueuePlayer; templateItem: AVPlayerItem; timeRange: CMTimeRange; });

	constructor(o: { player: AVQueuePlayer; templateItem: AVPlayerItem; timeRange: CMTimeRange; existingItemsOrdering: AVPlayerLooperItemOrdering; });

	disableLooping(): void;

	initWithPlayerTemplateItemTimeRange(player: AVQueuePlayer, itemToLoop: AVPlayerItem, loopRange: CMTimeRange): this;

	initWithPlayerTemplateItemTimeRangeExistingItemsOrdering(player: AVQueuePlayer, itemToLoop: AVPlayerItem, loopRange: CMTimeRange, itemOrdering: AVPlayerLooperItemOrdering): this;
}

declare const enum AVPlayerLooperItemOrdering {

	LoopingItemsPrecedeExistingItems = 0,

	LoopingItemsFollowExistingItems = 1
}

declare const enum AVPlayerLooperStatus {

	Unknown = 0,

	Ready = 1,

	Failed = 2,

	Cancelled = 3
}

declare class AVPlayerMediaSelectionCriteria extends NSObject {

	static alloc(): AVPlayerMediaSelectionCriteria; // inherited from NSObject

	static new(): AVPlayerMediaSelectionCriteria; // inherited from NSObject

	readonly preferredLanguages: NSArray<string>;

	readonly preferredMediaCharacteristics: NSArray<string>;

	readonly principalMediaCharacteristics: NSArray<string>;

	constructor(o: { preferredLanguages: NSArray<string> | string[]; preferredMediaCharacteristics: NSArray<string> | string[]; });

	constructor(o: { principalMediaCharacteristics: NSArray<string> | string[]; preferredLanguages: NSArray<string> | string[]; preferredMediaCharacteristics: NSArray<string> | string[]; });

	initWithPreferredLanguagesPreferredMediaCharacteristics(preferredLanguages: NSArray<string> | string[], preferredMediaCharacteristics: NSArray<string> | string[]): this;

	initWithPrincipalMediaCharacteristicsPreferredLanguagesPreferredMediaCharacteristics(principalMediaCharacteristics: NSArray<string> | string[], preferredLanguages: NSArray<string> | string[], preferredMediaCharacteristics: NSArray<string> | string[]): this;
}

declare class AVPlayerPlaybackCoordinator extends AVPlaybackCoordinator {

	static alloc(): AVPlayerPlaybackCoordinator; // inherited from NSObject

	static new(): AVPlayerPlaybackCoordinator; // inherited from NSObject

	delegate: AVPlayerPlaybackCoordinatorDelegate;

	readonly player: AVPlayer;
}

interface AVPlayerPlaybackCoordinatorDelegate extends NSObjectProtocol {

	playbackCoordinatorIdentifierForPlayerItem?(coordinator: AVPlayerPlaybackCoordinator, playerItem: AVPlayerItem): string;

	playbackCoordinatorInterstitialTimeRangesForPlayerItem?(coordinator: AVPlayerPlaybackCoordinator, playerItem: AVPlayerItem): NSArray<NSValue>;
}
declare var AVPlayerPlaybackCoordinatorDelegate: {

	prototype: AVPlayerPlaybackCoordinatorDelegate;
};

declare var AVPlayerRateDidChangeNotification: string;

declare var AVPlayerRateDidChangeOriginatingParticipantKey: string;

declare var AVPlayerRateDidChangeReasonAppBackgrounded: string;

declare var AVPlayerRateDidChangeReasonAudioSessionInterrupted: string;

declare var AVPlayerRateDidChangeReasonKey: string;

declare var AVPlayerRateDidChangeReasonSetRateCalled: string;

declare var AVPlayerRateDidChangeReasonSetRateFailed: string;

declare const enum AVPlayerStatus {

	Unknown = 0,

	ReadyToPlay = 1,

	Failed = 2
}

declare const enum AVPlayerTimeControlStatus {

	Paused = 0,

	WaitingToPlayAtSpecifiedRate = 1,

	Playing = 2
}

declare class AVPlayerVideoOutput extends NSObject {

	static alloc(): AVPlayerVideoOutput; // inherited from NSObject

	static new(): AVPlayerVideoOutput; // inherited from NSObject

	constructor(o: { specification: AVVideoOutputSpecification; });

	copyTaggedBufferGroupForHostTimePresentationTimeStampActiveConfiguration(hostTime: CMTime, presentationTimeStampOut: interop.Pointer | interop.Reference<CMTime>, activeConfigurationOut: interop.Pointer | interop.Reference<AVPlayerVideoOutputConfiguration>): any;

	initWithSpecification(specification: AVVideoOutputSpecification): this;
}

declare class AVPlayerVideoOutputConfiguration extends NSObject {

	static alloc(): AVPlayerVideoOutputConfiguration; // inherited from NSObject

	static new(): AVPlayerVideoOutputConfiguration; // inherited from NSObject

	readonly activationTime: CMTime;

	readonly dataChannelDescriptions: NSArray<any>;

	readonly sourcePlayerItem: AVPlayerItem;
}

declare var AVPlayerWaitingDuringInterstitialEventReason: string;

declare var AVPlayerWaitingForCoordinatedPlaybackReason: string;

declare var AVPlayerWaitingToMinimizeStallsReason: string;

declare var AVPlayerWaitingWhileEvaluatingBufferingRateReason: string;

declare var AVPlayerWaitingWithNoItemToPlayReason: string;

declare class AVPortraitEffectsMatte extends NSObject {

	static alloc(): AVPortraitEffectsMatte; // inherited from NSObject

	static new(): AVPortraitEffectsMatte; // inherited from NSObject

	static portraitEffectsMatteFromDictionaryRepresentationError(imageSourceAuxDataInfoDictionary: NSDictionary<any, any>): AVPortraitEffectsMatte;

	readonly mattingImage: any;

	readonly pixelFormatType: number;

	dictionaryRepresentationForAuxiliaryDataType(outAuxDataType: interop.Pointer | interop.Reference<string>): NSDictionary<any, any>;

	portraitEffectsMatteByApplyingExifOrientation(exifOrientation: CGImagePropertyOrientation): this;

	portraitEffectsMatteByReplacingPortraitEffectsMatteWithPixelBufferError(pixelBuffer: any): this;
}

declare class AVQueuePlayer extends AVPlayer {

	static alloc(): AVQueuePlayer; // inherited from NSObject

	static new(): AVQueuePlayer; // inherited from NSObject

	static playerWithPlayerItem(item: AVPlayerItem): AVQueuePlayer; // inherited from AVPlayer

	static playerWithURL(URL: NSURL): AVQueuePlayer; // inherited from AVPlayer

	static queuePlayerWithItems(items: NSArray<AVPlayerItem> | AVPlayerItem[]): AVQueuePlayer;

	constructor(o: { items: NSArray<AVPlayerItem> | AVPlayerItem[]; });

	advanceToNextItem(): void;

	canInsertItemAfterItem(item: AVPlayerItem, afterItem: AVPlayerItem): boolean;

	initWithItems(items: NSArray<AVPlayerItem> | AVPlayerItem[]): this;

	insertItemAfterItem(item: AVPlayerItem, afterItem: AVPlayerItem): void;

	items(): NSArray<AVPlayerItem>;

	removeAllItems(): void;

	removeItem(item: AVPlayerItem): void;
}

interface AVQueuedSampleBufferRendering extends NSObjectProtocol {

	hasSufficientMediaDataForReliablePlaybackStart: boolean;

	readyForMoreMediaData: boolean;

	timebase: any;

	enqueueSampleBuffer(sampleBuffer: any): void;

	flush(): void;

	requestMediaDataWhenReadyOnQueueUsingBlock(queue: interop.Pointer | interop.Reference<any>, block: () => void): void;

	stopRequestingMediaData(): void;
}
declare var AVQueuedSampleBufferRendering: {

	prototype: AVQueuedSampleBufferRendering;
};

declare const enum AVQueuedSampleBufferRenderingStatus {

	Unknown = 0,

	Rendering = 1,

	Failed = 2
}

declare class AVRouteDetector extends NSObject {

	static alloc(): AVRouteDetector; // inherited from NSObject

	static new(): AVRouteDetector; // inherited from NSObject

	detectsCustomRoutes: boolean;

	readonly multipleRoutesDetected: boolean;

	routeDetectionEnabled: boolean;
}

declare var AVRouteDetectorMultipleRoutesDetectedDidChangeNotification: string;

declare function AVSampleBufferAttachContentKey(sbuf: any, contentKey: AVContentKey, outError: interop.Pointer | interop.Reference<NSError>): boolean;

declare class AVSampleBufferAudioRenderer extends NSObject implements AVQueuedSampleBufferRendering {

	static alloc(): AVSampleBufferAudioRenderer; // inherited from NSObject

	static new(): AVSampleBufferAudioRenderer; // inherited from NSObject

	allowedAudioSpatializationFormats: AVAudioSpatializationFormats;

	audioTimePitchAlgorithm: string;

	readonly error: NSError;

	muted: boolean;

	readonly status: AVQueuedSampleBufferRenderingStatus;

	volume: number;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hasSufficientMediaDataForReliablePlaybackStart: boolean; // inherited from AVQueuedSampleBufferRendering

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly readyForMoreMediaData: boolean; // inherited from AVQueuedSampleBufferRendering

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly timebase: any; // inherited from AVQueuedSampleBufferRendering

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	enqueueSampleBuffer(sampleBuffer: any): void;

	flush(): void;

	flushFromSourceTimeCompletionHandler(time: CMTime, completionHandler: (p1: boolean) => void): void;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	requestMediaDataWhenReadyOnQueueUsingBlock(queue: interop.Pointer | interop.Reference<any>, block: () => void): void;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	stopRequestingMediaData(): void;
}

declare var AVSampleBufferAudioRendererFlushTimeKey: string;

declare var AVSampleBufferAudioRendererOutputConfigurationDidChangeNotification: string;

declare var AVSampleBufferAudioRendererWasFlushedAutomaticallyNotification: string;

declare class AVSampleBufferDisplayLayer extends CALayer implements AVQueuedSampleBufferRendering {

	static alloc(): AVSampleBufferDisplayLayer; // inherited from NSObject

	static layer(): AVSampleBufferDisplayLayer; // inherited from CALayer

	static new(): AVSampleBufferDisplayLayer; // inherited from NSObject

	controlTimebase: any;

	readonly error: NSError;

	readonly outputObscuredDueToInsufficientExternalProtection: boolean;

	preventsCapture: boolean;

	preventsDisplaySleepDuringVideoPlayback: boolean;

	readonly readyForDisplay: boolean;

	readonly requiresFlushToResumeDecoding: boolean;

	readonly sampleBufferRenderer: AVSampleBufferVideoRenderer;

	readonly status: AVQueuedSampleBufferRenderingStatus;

	videoGravity: string;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hasSufficientMediaDataForReliablePlaybackStart: boolean; // inherited from AVQueuedSampleBufferRendering

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly readyForMoreMediaData: boolean; // inherited from AVQueuedSampleBufferRendering

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly timebase: any; // inherited from AVQueuedSampleBufferRendering

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	enqueueSampleBuffer(sampleBuffer: any): void;

	flush(): void;

	flushAndRemoveImage(): void;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	requestMediaDataWhenReadyOnQueueUsingBlock(queue: interop.Pointer | interop.Reference<any>, block: () => void): void;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	stopRequestingMediaData(): void;
}

declare var AVSampleBufferDisplayLayerFailedToDecodeNotification: string;

declare var AVSampleBufferDisplayLayerFailedToDecodeNotificationErrorKey: string;

declare var AVSampleBufferDisplayLayerOutputObscuredDueToInsufficientExternalProtectionDidChangeNotification: string;

declare var AVSampleBufferDisplayLayerReadyForDisplayDidChangeNotification: string;

declare var AVSampleBufferDisplayLayerRequiresFlushToResumeDecodingDidChangeNotification: string;

declare class AVSampleBufferGenerator extends NSObject {

	static alloc(): AVSampleBufferGenerator; // inherited from NSObject

	static new(): AVSampleBufferGenerator; // inherited from NSObject

	static notifyOfDataReadyForSampleBufferCompletionHandler(sbuf: any, completionHandler: (p1: boolean, p2: NSError) => void): void;

	constructor(o: { asset: AVAsset; timebase: any; });

	createSampleBufferForRequestAddingToBatchError(request: AVSampleBufferRequest, batch: AVSampleBufferGeneratorBatch): any;

	createSampleBufferForRequestError(request: AVSampleBufferRequest): any;

	initWithAssetTimebase(asset: AVAsset, timebase: any): this;

	makeBatch(): AVSampleBufferGeneratorBatch;
}

declare class AVSampleBufferGeneratorBatch extends NSObject {

	static alloc(): AVSampleBufferGeneratorBatch; // inherited from NSObject

	static new(): AVSampleBufferGeneratorBatch; // inherited from NSObject

	cancel(): void;

	makeDataReadyWithCompletionHandler(completionHandler: (p1: NSError) => void): void;
}

declare class AVSampleBufferRenderSynchronizer extends NSObject {

	static alloc(): AVSampleBufferRenderSynchronizer; // inherited from NSObject

	static new(): AVSampleBufferRenderSynchronizer; // inherited from NSObject

	delaysRateChangeUntilHasSufficientMediaData: boolean;

	rate: number;

	readonly renderers: NSArray<AVQueuedSampleBufferRendering>;

	readonly timebase: any;

	addBoundaryTimeObserverForTimesQueueUsingBlock(times: NSArray<NSValue> | NSValue[], queue: interop.Pointer | interop.Reference<any>, block: () => void): any;

	addPeriodicTimeObserverForIntervalQueueUsingBlock(interval: CMTime, queue: interop.Pointer | interop.Reference<any>, block: (p1: CMTime) => void): any;

	addRenderer(renderer: AVQueuedSampleBufferRendering): void;

	currentTime(): CMTime;

	removeRendererAtTimeCompletionHandler(renderer: AVQueuedSampleBufferRendering, time: CMTime, completionHandler: (p1: boolean) => void): void;

	removeTimeObserver(observer: any): void;

	setRateTime(rate: number, time: CMTime): void;

	setRateTimeAtHostTime(rate: number, time: CMTime, hostTime: CMTime): void;
}

declare var AVSampleBufferRenderSynchronizerRateDidChangeNotification: string;

declare class AVSampleBufferRequest extends NSObject {

	static alloc(): AVSampleBufferRequest; // inherited from NSObject

	static new(): AVSampleBufferRequest; // inherited from NSObject

	direction: AVSampleBufferRequestDirection;

	limitCursor: AVSampleCursor;

	maxSampleCount: number;

	mode: AVSampleBufferRequestMode;

	overrideTime: CMTime;

	preferredMinSampleCount: number;

	readonly startCursor: AVSampleCursor;

	constructor(o: { startCursor: AVSampleCursor; });

	initWithStartCursor(startCursor: AVSampleCursor): this;
}

declare const enum AVSampleBufferRequestDirection {

	Forward = 1,

	None = 0,

	Reverse = -1
}

declare const enum AVSampleBufferRequestMode {

	Immediate = 0,

	Scheduled = 1,

	Opportunistic = 2
}

declare class AVSampleBufferVideoRenderer extends NSObject implements AVQueuedSampleBufferRendering {

	static alloc(): AVSampleBufferVideoRenderer; // inherited from NSObject

	static new(): AVSampleBufferVideoRenderer; // inherited from NSObject

	readonly error: NSError;

	readonly requiresFlushToResumeDecoding: boolean;

	readonly status: AVQueuedSampleBufferRenderingStatus;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hasSufficientMediaDataForReliablePlaybackStart: boolean; // inherited from AVQueuedSampleBufferRendering

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly readyForMoreMediaData: boolean; // inherited from AVQueuedSampleBufferRendering

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly timebase: any; // inherited from AVQueuedSampleBufferRendering

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	copyDisplayedPixelBuffer(): any;

	enqueueSampleBuffer(sampleBuffer: any): void;

	expectMinimumUpcomingSampleBufferPresentationTime(minimumUpcomingPresentationTime: CMTime): void;

	expectMonotonicallyIncreasingUpcomingSampleBufferPresentationTimes(): void;

	flush(): void;

	flushWithRemovalOfDisplayedImageCompletionHandler(removeDisplayedImage: boolean, handler: () => void): void;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	loadVideoPerformanceMetricsWithCompletionHandler(completionHandler: (p1: AVVideoPerformanceMetrics) => void): void;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	requestMediaDataWhenReadyOnQueueUsingBlock(queue: interop.Pointer | interop.Reference<any>, block: () => void): void;

	resetUpcomingSampleBufferPresentationTimeExpectations(): void;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	stopRequestingMediaData(): void;
}

declare var AVSampleBufferVideoRendererDidFailToDecodeNotification: string;

declare var AVSampleBufferVideoRendererDidFailToDecodeNotificationErrorKey: string;

declare var AVSampleBufferVideoRendererRequiresFlushToResumeDecodingDidChangeNotification: string;

declare class AVSampleCursor extends NSObject implements NSCopying {

	static alloc(): AVSampleCursor; // inherited from NSObject

	static new(): AVSampleCursor; // inherited from NSObject

	readonly currentChunkInfo: AVSampleCursorChunkInfo;

	readonly currentChunkStorageRange: AVSampleCursorStorageRange;

	readonly currentChunkStorageURL: NSURL;

	readonly currentSampleAudioDependencyInfo: AVSampleCursorAudioDependencyInfo;

	readonly currentSampleDependencyAttachments: NSDictionary<any, any>;

	readonly currentSampleDependencyInfo: AVSampleCursorDependencyInfo;

	readonly currentSampleDuration: CMTime;

	readonly currentSampleIndexInChunk: number;

	readonly currentSampleStorageRange: AVSampleCursorStorageRange;

	readonly currentSampleSyncInfo: AVSampleCursorSyncInfo;

	readonly decodeTimeStamp: CMTime;

	readonly presentationTimeStamp: CMTime;

	readonly samplesRequiredForDecoderRefresh: number;

	comparePositionInDecodeOrderWithPositionOfCursor(cursor: AVSampleCursor): NSComparisonResult;

	copyCurrentSampleFormatDescription(): any;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	samplesWithEarlierDecodeTimeStampsMayHaveLaterPresentationTimeStampsThanCursor(cursor: AVSampleCursor): boolean;

	samplesWithLaterDecodeTimeStampsMayHaveEarlierPresentationTimeStampsThanCursor(cursor: AVSampleCursor): boolean;

	stepByDecodeTimeWasPinned(deltaDecodeTime: CMTime, outWasPinned: interop.Pointer | interop.Reference<boolean>): CMTime;

	stepByPresentationTimeWasPinned(deltaPresentationTime: CMTime, outWasPinned: interop.Pointer | interop.Reference<boolean>): CMTime;

	stepInDecodeOrderByCount(stepCount: number): number;

	stepInPresentationOrderByCount(stepCount: number): number;
}

interface AVSampleCursorAudioDependencyInfo {
	audioSampleIsIndependentlyDecodable: boolean;
	audioSamplePacketRefreshCount: number;
}
declare var AVSampleCursorAudioDependencyInfo: interop.StructType<AVSampleCursorAudioDependencyInfo>;

interface AVSampleCursorChunkInfo {
	chunkSampleCount: number;
	chunkHasUniformSampleSizes: boolean;
	chunkHasUniformSampleDurations: boolean;
	chunkHasUniformFormatDescriptions: boolean;
}
declare var AVSampleCursorChunkInfo: interop.StructType<AVSampleCursorChunkInfo>;

interface AVSampleCursorDependencyInfo {
	sampleIndicatesWhetherItHasDependentSamples: boolean;
	sampleHasDependentSamples: boolean;
	sampleIndicatesWhetherItDependsOnOthers: boolean;
	sampleDependsOnOthers: boolean;
	sampleIndicatesWhetherItHasRedundantCoding: boolean;
	sampleHasRedundantCoding: boolean;
}
declare var AVSampleCursorDependencyInfo: interop.StructType<AVSampleCursorDependencyInfo>;

interface AVSampleCursorStorageRange {
	offset: number;
	length: number;
}
declare var AVSampleCursorStorageRange: interop.StructType<AVSampleCursorStorageRange>;

interface AVSampleCursorSyncInfo {
	sampleIsFullSync: boolean;
	sampleIsPartialSync: boolean;
	sampleIsDroppable: boolean;
}
declare var AVSampleCursorSyncInfo: interop.StructType<AVSampleCursorSyncInfo>;

declare class AVSemanticSegmentationMatte extends NSObject {

	static alloc(): AVSemanticSegmentationMatte; // inherited from NSObject

	static new(): AVSemanticSegmentationMatte; // inherited from NSObject

	static semanticSegmentationMatteFromImageSourceAuxiliaryDataTypeDictionaryRepresentationError(imageSourceAuxiliaryDataType: string, imageSourceAuxiliaryDataInfoDictionary: NSDictionary<any, any>): AVSemanticSegmentationMatte;

	readonly matteType: string;

	readonly mattingImage: any;

	readonly pixelFormatType: number;

	dictionaryRepresentationForAuxiliaryDataType(outAuxDataType: interop.Pointer | interop.Reference<string>): NSDictionary<any, any>;

	semanticSegmentationMatteByApplyingExifOrientation(exifOrientation: CGImagePropertyOrientation): this;

	semanticSegmentationMatteByReplacingSemanticSegmentationMatteWithPixelBufferError(pixelBuffer: any): this;
}

declare var AVSemanticSegmentationMatteTypeGlasses: string;

declare var AVSemanticSegmentationMatteTypeHair: string;

declare var AVSemanticSegmentationMatteTypeSkin: string;

declare var AVSemanticSegmentationMatteTypeTeeth: string;

declare var AVStreamingKeyDeliveryContentKeyType: string;

declare var AVStreamingKeyDeliveryPersistentContentKeyType: string;

declare class AVSynchronizedLayer extends CALayer {

	static alloc(): AVSynchronizedLayer; // inherited from NSObject

	static layer(): AVSynchronizedLayer; // inherited from CALayer

	static new(): AVSynchronizedLayer; // inherited from NSObject

	static synchronizedLayerWithPlayerItem(playerItem: AVPlayerItem): AVSynchronizedLayer;

	playerItem: AVPlayerItem;
}

declare class AVTextStyleRule extends NSObject implements NSCopying {

	static alloc(): AVTextStyleRule; // inherited from NSObject

	static new(): AVTextStyleRule; // inherited from NSObject

	static propertyListForTextStyleRules(textStyleRules: NSArray<AVTextStyleRule> | AVTextStyleRule[]): any;

	static textStyleRuleWithTextMarkupAttributes(textMarkupAttributes: NSDictionary<string, any>): AVTextStyleRule;

	static textStyleRuleWithTextMarkupAttributesTextSelector(textMarkupAttributes: NSDictionary<string, any>, textSelector: string): AVTextStyleRule;

	static textStyleRulesFromPropertyList(plist: any): NSArray<AVTextStyleRule>;

	readonly textMarkupAttributes: NSDictionary<string, any>;

	readonly textSelector: string;

	constructor(o: { textMarkupAttributes: NSDictionary<string, any>; });

	constructor(o: { textMarkupAttributes: NSDictionary<string, any>; textSelector: string; });

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	initWithTextMarkupAttributes(textMarkupAttributes: NSDictionary<string, any>): this;

	initWithTextMarkupAttributesTextSelector(textMarkupAttributes: NSDictionary<string, any>, textSelector: string): this;
}

declare class AVTimedMetadataGroup extends AVMetadataGroup implements NSCopying, NSMutableCopying {

	static alloc(): AVTimedMetadataGroup; // inherited from NSObject

	static new(): AVTimedMetadataGroup; // inherited from NSObject

	readonly timeRange: CMTimeRange;

	constructor(o: { items: NSArray<AVMetadataItem> | AVMetadataItem[]; timeRange: CMTimeRange; });

	constructor(o: { sampleBuffer: any; });

	copyFormatDescription(): any;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	initWithItemsTimeRange(items: NSArray<AVMetadataItem> | AVMetadataItem[], timeRange: CMTimeRange): this;

	initWithSampleBuffer(sampleBuffer: any): this;

	mutableCopyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare var AVTrackAssociationTypeAudioFallback: string;

declare var AVTrackAssociationTypeChapterList: string;

declare var AVTrackAssociationTypeForcedSubtitlesOnly: string;

declare var AVTrackAssociationTypeMetadataReferent: string;

declare var AVTrackAssociationTypeSelectionFollower: string;

declare var AVTrackAssociationTypeTimecode: string;

declare class AVURLAsset extends AVAsset implements AVContentKeyRecipient, NSItemProviderReading, NSItemProviderWriting {

	static URLAssetWithURLOptions(URL: NSURL, options: NSDictionary<string, any>): AVURLAsset;

	static alloc(): AVURLAsset; // inherited from NSObject

	static assetWithURL(URL: NSURL): AVURLAsset; // inherited from AVAsset

	static audiovisualMIMETypes(): NSArray<string>;

	static audiovisualTypes(): NSArray<string>;

	static isPlayableExtendedMIMEType(extendedMIMEType: string): boolean;

	static itemProviderVisibilityForRepresentationWithTypeIdentifier(typeIdentifier: string): NSItemProviderRepresentationVisibility;

	static new(): AVURLAsset; // inherited from NSObject

	static objectWithItemProviderDataTypeIdentifierError(data: NSData, typeIdentifier: string): AVURLAsset;

	readonly URL: NSURL;

	readonly assetCache: AVAssetCache;

	readonly httpSessionIdentifier: NSUUID;

	readonly resourceLoader: AVAssetResourceLoader;

	readonly variants: NSArray<AVAssetVariant>;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly mayRequireContentKeysForMediaDataProcessing: boolean; // inherited from AVContentKeyRecipient

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly writableTypeIdentifiersForItemProvider: NSArray<string>; // inherited from NSItemProviderWriting

	readonly  // inherited from NSObjectProtocol

	static readonly readableTypeIdentifiersForItemProvider: NSArray<string>; // inherited from NSItemProviderReading

	static readonly writableTypeIdentifiersForItemProvider: NSArray<string>; // inherited from NSItemProviderWriting

	constructor(o: { URL: NSURL; options: NSDictionary<string, any>; });

	class(): typeof NSObject;

	compatibleTrackForCompositionTrack(compositionTrack: AVCompositionTrack): AVAssetTrack;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	contentKeySessionDidProvideContentKey(contentKeySession: AVContentKeySession, contentKey: AVContentKey): void;

	findCompatibleTrackForCompositionTrackCompletionHandler(compositionTrack: AVCompositionTrack, completionHandler: (p1: AVAssetTrack, p2: NSError) => void): void;

	initWithURLOptions(URL: NSURL, options: NSDictionary<string, any>): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	itemProviderVisibilityForRepresentationWithTypeIdentifier(typeIdentifier: string): NSItemProviderRepresentationVisibility;

	loadDataWithTypeIdentifierForItemProviderCompletionHandler(typeIdentifier: string, completionHandler: (p1: NSData, p2: NSError) => void): NSProgress;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

declare var AVURLAssetAllowsCellularAccessKey: string;

declare var AVURLAssetAllowsConstrainedNetworkAccessKey: string;

declare var AVURLAssetAllowsExpensiveNetworkAccessKey: string;

declare var AVURLAssetHTTPCookiesKey: string;

declare var AVURLAssetHTTPUserAgentKey: string;

declare var AVURLAssetOverrideMIMETypeKey: string;

declare var AVURLAssetPreferPreciseDurationAndTimingKey: string;

declare var AVURLAssetPrimarySessionIdentifierKey: string;

declare var AVURLAssetReferenceRestrictionsKey: string;

declare var AVURLAssetURLRequestAttributionKey: string;

declare const enum AVVariantPreferences {

	None = 0,

	ScalabilityToLosslessAudio = 1
}

declare var AVVideoAllowFrameReorderingKey: string;

declare var AVVideoAllowWideColorKey: string;

declare var AVVideoApertureModeCleanAperture: string;

declare var AVVideoApertureModeEncodedPixels: string;

declare var AVVideoApertureModeProductionAperture: string;

declare var AVVideoAppleProRAWBitDepthKey: string;

declare var AVVideoAverageBitRateKey: string;

declare var AVVideoAverageNonDroppableFrameRateKey: string;

declare var AVVideoCleanApertureHeightKey: string;

declare var AVVideoCleanApertureHorizontalOffsetKey: string;

declare var AVVideoCleanApertureKey: string;

declare var AVVideoCleanApertureVerticalOffsetKey: string;

declare var AVVideoCleanApertureWidthKey: string;

declare var AVVideoCodecH264: string;

declare var AVVideoCodecHEVC: string;

declare var AVVideoCodecJPEG: string;

declare var AVVideoCodecKey: string;

declare var AVVideoCodecTypeAppleProRes422: string;

declare var AVVideoCodecTypeAppleProRes422HQ: string;

declare var AVVideoCodecTypeAppleProRes422LT: string;

declare var AVVideoCodecTypeAppleProRes422Proxy: string;

declare var AVVideoCodecTypeAppleProRes4444: string;

declare var AVVideoCodecTypeH264: string;

declare var AVVideoCodecTypeHEVC: string;

declare var AVVideoCodecTypeHEVCWithAlpha: string;

declare var AVVideoCodecTypeJPEG: string;

declare var AVVideoColorPrimariesKey: string;

declare var AVVideoColorPrimaries_ITU_R_2020: string;

declare var AVVideoColorPrimaries_ITU_R_709_2: string;

declare var AVVideoColorPrimaries_P3_D65: string;

declare var AVVideoColorPrimaries_SMPTE_C: string;

declare var AVVideoColorPropertiesKey: string;

interface AVVideoCompositing extends NSObjectProtocol {

	canConformColorOfSourceFrames?: boolean;

	requiredPixelBufferAttributesForRenderContext: NSDictionary<string, any>;

	sourcePixelBufferAttributes: NSDictionary<string, any>;

	supportsHDRSourceFrames?: boolean;

	supportsWideColorSourceFrames?: boolean;

	anticipateRenderingUsingHint?(renderHint: AVVideoCompositionRenderHint): void;

	cancelAllPendingVideoCompositionRequests?(): void;

	prerollForRenderingUsingHint?(renderHint: AVVideoCompositionRenderHint): void;

	renderContextChanged(newRenderContext: AVVideoCompositionRenderContext): void;

	startVideoCompositionRequest(asyncVideoCompositionRequest: AVAsynchronousVideoCompositionRequest): void;
}
declare var AVVideoCompositing: {

	prototype: AVVideoCompositing;
};

declare class AVVideoComposition extends NSObject implements NSCopying, NSMutableCopying {

	static alloc(): AVVideoComposition; // inherited from NSObject

	static new(): AVVideoComposition; // inherited from NSObject

	static videoCompositionWithAssetApplyingCIFiltersWithHandler(asset: AVAsset, applier: (p1: AVAsynchronousCIImageFilteringRequest) => void): AVVideoComposition;

	static videoCompositionWithAssetApplyingCIFiltersWithHandlerCompletionHandler(asset: AVAsset, applier: (p1: AVAsynchronousCIImageFilteringRequest) => void, completionHandler: (p1: AVVideoComposition, p2: NSError) => void): void;

	static videoCompositionWithPropertiesOfAsset(asset: AVAsset): AVVideoComposition;

	static videoCompositionWithPropertiesOfAssetCompletionHandler(asset: AVAsset, completionHandler: (p1: AVVideoComposition, p2: NSError) => void): void;

	readonly animationTool: AVVideoCompositionCoreAnimationTool;

	readonly colorPrimaries: string;

	readonly colorTransferFunction: string;

	readonly colorYCbCrMatrix: string;

	readonly customVideoCompositorClass: typeof NSObject;

	readonly frameDuration: CMTime;

	readonly instructions: NSArray<AVVideoCompositionInstructionProtocol>;

	readonly perFrameHDRDisplayMetadataPolicy: string;

	readonly renderScale: number;

	readonly renderSize: CGSize;

	readonly sourceSampleDataTrackIDs: NSArray<number>;

	readonly sourceTrackIDForFrameTiming: number;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	determineValidityForAssetTimeRangeValidationDelegateCompletionHandler(asset: AVAsset, timeRange: CMTimeRange, validationDelegate: AVVideoCompositionValidationHandling, completionHandler: (p1: boolean, p2: NSError) => void): void;

	isValidForAssetTimeRangeValidationDelegate(asset: AVAsset, timeRange: CMTimeRange, validationDelegate: AVVideoCompositionValidationHandling): boolean;

	mutableCopyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare class AVVideoCompositionCoreAnimationTool extends NSObject {

	static alloc(): AVVideoCompositionCoreAnimationTool; // inherited from NSObject

	static new(): AVVideoCompositionCoreAnimationTool; // inherited from NSObject

	static videoCompositionCoreAnimationToolWithAdditionalLayerAsTrackID(layer: CALayer, trackID: number): AVVideoCompositionCoreAnimationTool;

	static videoCompositionCoreAnimationToolWithPostProcessingAsVideoLayerInLayer(videoLayer: CALayer, animationLayer: CALayer): AVVideoCompositionCoreAnimationTool;

	static videoCompositionCoreAnimationToolWithPostProcessingAsVideoLayersInLayer(videoLayers: NSArray<CALayer> | CALayer[], animationLayer: CALayer): AVVideoCompositionCoreAnimationTool;
}

declare class AVVideoCompositionInstruction extends NSObject implements AVVideoCompositionInstructionProtocol, NSCopying, NSMutableCopying, NSSecureCoding {

	static alloc(): AVVideoCompositionInstruction; // inherited from NSObject

	static new(): AVVideoCompositionInstruction; // inherited from NSObject

	readonly backgroundColor: any;

	readonly layerInstructions: NSArray<AVVideoCompositionLayerInstruction>;

	readonly containsTweening: boolean; // inherited from AVVideoCompositionInstructionProtocol

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly enablePostProcessing: boolean; // inherited from AVVideoCompositionInstructionProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly passthroughTrackID: number; // inherited from AVVideoCompositionInstructionProtocol

	readonly requiredSourceSampleDataTrackIDs: NSArray<number>; // inherited from AVVideoCompositionInstructionProtocol

	readonly requiredSourceTrackIDs: NSArray<NSValue>; // inherited from AVVideoCompositionInstructionProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly timeRange: CMTimeRange; // inherited from AVVideoCompositionInstructionProtocol

	readonly  // inherited from NSObjectProtocol

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	mutableCopyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

interface AVVideoCompositionInstructionProtocol extends NSObjectProtocol {

	containsTweening: boolean;

	enablePostProcessing: boolean;

	passthroughTrackID: number;

	requiredSourceSampleDataTrackIDs?: NSArray<number>;

	requiredSourceTrackIDs: NSArray<NSValue>;

	timeRange: CMTimeRange;
}
declare var AVVideoCompositionInstructionProtocol: {

	prototype: AVVideoCompositionInstructionProtocol;
};

declare class AVVideoCompositionLayerInstruction extends NSObject implements NSCopying, NSMutableCopying, NSSecureCoding {

	static alloc(): AVVideoCompositionLayerInstruction; // inherited from NSObject

	static new(): AVVideoCompositionLayerInstruction; // inherited from NSObject

	readonly trackID: number;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	getCropRectangleRampForTimeStartCropRectangleEndCropRectangleTimeRange(time: CMTime, startCropRectangle: interop.Pointer | interop.Reference<CGRect>, endCropRectangle: interop.Pointer | interop.Reference<CGRect>, timeRange: interop.Pointer | interop.Reference<CMTimeRange>): boolean;

	getOpacityRampForTimeStartOpacityEndOpacityTimeRange(time: CMTime, startOpacity: interop.Pointer | interop.Reference<number>, endOpacity: interop.Pointer | interop.Reference<number>, timeRange: interop.Pointer | interop.Reference<CMTimeRange>): boolean;

	getTransformRampForTimeStartTransformEndTransformTimeRange(time: CMTime, startTransform: interop.Pointer | interop.Reference<CGAffineTransform>, endTransform: interop.Pointer | interop.Reference<CGAffineTransform>, timeRange: interop.Pointer | interop.Reference<CMTimeRange>): boolean;

	initWithCoder(coder: NSCoder): this;

	mutableCopyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare var AVVideoCompositionPerFrameHDRDisplayMetadataPolicyGenerate: string;

declare var AVVideoCompositionPerFrameHDRDisplayMetadataPolicyPropagate: string;

declare class AVVideoCompositionRenderContext extends NSObject {

	static alloc(): AVVideoCompositionRenderContext; // inherited from NSObject

	static new(): AVVideoCompositionRenderContext; // inherited from NSObject

	readonly edgeWidths: AVEdgeWidths;

	readonly highQualityRendering: boolean;

	readonly pixelAspectRatio: AVPixelAspectRatio;

	readonly renderScale: number;

	readonly renderTransform: CGAffineTransform;

	readonly size: CGSize;

	readonly videoComposition: AVVideoComposition;

	newPixelBuffer(): any;
}

declare class AVVideoCompositionRenderHint extends NSObject {

	static alloc(): AVVideoCompositionRenderHint; // inherited from NSObject

	static new(): AVVideoCompositionRenderHint; // inherited from NSObject

	readonly endCompositionTime: CMTime;

	readonly startCompositionTime: CMTime;
}

interface AVVideoCompositionValidationHandling extends NSObjectProtocol {

	videoCompositionShouldContinueValidatingAfterFindingEmptyTimeRange?(videoComposition: AVVideoComposition, timeRange: CMTimeRange): boolean;

	videoCompositionShouldContinueValidatingAfterFindingInvalidTimeRangeInInstruction?(videoComposition: AVVideoComposition, videoCompositionInstruction: AVVideoCompositionInstructionProtocol): boolean;

	videoCompositionShouldContinueValidatingAfterFindingInvalidTrackIDInInstructionLayerInstructionAsset?(videoComposition: AVVideoComposition, videoCompositionInstruction: AVVideoCompositionInstructionProtocol, layerInstruction: AVVideoCompositionLayerInstruction, asset: AVAsset): boolean;

	videoCompositionShouldContinueValidatingAfterFindingInvalidValueForKey?(videoComposition: AVVideoComposition, key: string): boolean;
}
declare var AVVideoCompositionValidationHandling: {

	prototype: AVVideoCompositionValidationHandling;
};

declare var AVVideoCompressionPropertiesKey: string;

declare var AVVideoDecompressionPropertiesKey: string;

declare var AVVideoExpectedSourceFrameRateKey: string;

declare var AVVideoH264EntropyModeCABAC: string;

declare var AVVideoH264EntropyModeCAVLC: string;

declare var AVVideoH264EntropyModeKey: string;

declare var AVVideoHeightKey: string;

declare var AVVideoMaxKeyFrameIntervalDurationKey: string;

declare var AVVideoMaxKeyFrameIntervalKey: string;

declare class AVVideoOutputSpecification extends NSObject implements NSCopying {

	static alloc(): AVVideoOutputSpecification; // inherited from NSObject

	static new(): AVVideoOutputSpecification; // inherited from NSObject

	defaultPixelBufferAttributes: NSDictionary<string, any>;

	readonly preferredTagCollections: NSArray<any>;

	constructor(o: { tagCollections: NSArray<any> | any[]; });

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	initWithTagCollections(tagCollections: NSArray<any> | any[]): this;

	setOutputPixelBufferAttributesForTagCollection(pixelBufferAttributes: NSDictionary<string, any>, tagCollection: any): void;
}

declare class AVVideoPerformanceMetrics extends NSObject {

	static alloc(): AVVideoPerformanceMetrics; // inherited from NSObject

	static new(): AVVideoPerformanceMetrics; // inherited from NSObject

	readonly numberOfCorruptedFrames: number;

	readonly numberOfDroppedFrames: number;

	readonly numberOfFramesDisplayedUsingOptimizedCompositing: number;

	readonly totalAccumulatedFrameDelay: number;

	readonly totalNumberOfFrames: number;
}

declare var AVVideoPixelAspectRatioHorizontalSpacingKey: string;

declare var AVVideoPixelAspectRatioKey: string;

declare var AVVideoPixelAspectRatioVerticalSpacingKey: string;

declare var AVVideoProfileLevelH264Baseline30: string;

declare var AVVideoProfileLevelH264Baseline31: string;

declare var AVVideoProfileLevelH264Baseline41: string;

declare var AVVideoProfileLevelH264BaselineAutoLevel: string;

declare var AVVideoProfileLevelH264High40: string;

declare var AVVideoProfileLevelH264High41: string;

declare var AVVideoProfileLevelH264HighAutoLevel: string;

declare var AVVideoProfileLevelH264Main30: string;

declare var AVVideoProfileLevelH264Main31: string;

declare var AVVideoProfileLevelH264Main32: string;

declare var AVVideoProfileLevelH264Main41: string;

declare var AVVideoProfileLevelH264MainAutoLevel: string;

declare var AVVideoProfileLevelKey: string;

declare var AVVideoQualityKey: string;

declare var AVVideoRangeHLG: string;

declare var AVVideoRangePQ: string;

declare var AVVideoRangeSDR: string;

declare var AVVideoScalingModeFit: string;

declare var AVVideoScalingModeKey: string;

declare var AVVideoScalingModeResize: string;

declare var AVVideoScalingModeResizeAspect: string;

declare var AVVideoScalingModeResizeAspectFill: string;

declare var AVVideoTransferFunctionKey: string;

declare var AVVideoTransferFunction_ITU_R_2100_HLG: string;

declare var AVVideoTransferFunction_ITU_R_709_2: string;

declare var AVVideoTransferFunction_Linear: string;

declare var AVVideoTransferFunction_SMPTE_ST_2084_PQ: string;

declare var AVVideoWidthKey: string;

declare var AVVideoYCbCrMatrixKey: string;

declare var AVVideoYCbCrMatrix_ITU_R_2020: string;

declare var AVVideoYCbCrMatrix_ITU_R_601_4: string;

declare var AVVideoYCbCrMatrix_ITU_R_709_2: string;

declare class AVZoomRange extends NSObject {

	static alloc(): AVZoomRange; // inherited from NSObject

	static new(): AVZoomRange; // inherited from NSObject

	readonly maxZoomFactor: number;

	readonly minZoomFactor: number;

	containsZoomFactor(zoomFactor: number): boolean;
}

declare function CMTagCollectionCreateWithVideoOutputPreset(allocator: any, preset: CMTagCollectionVideoOutputPreset, newCollectionOut: interop.Pointer | interop.Reference<any>): number;

declare const enum CMTagCollectionVideoOutputPreset {

	kCMTagCollectionVideoOutputPreset_Monoscopic = 0,

	kCMTagCollectionVideoOutputPreset_Stereoscopic = 1
}
