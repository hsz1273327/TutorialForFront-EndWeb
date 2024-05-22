
interface PHContentEditingController extends NSObjectProtocol {

	shouldShowCancelConfirmation: boolean;

	canHandleAdjustmentData(adjustmentData: PHAdjustmentData): boolean;

	cancelContentEditing(): void;

	finishContentEditingWithCompletionHandler(completionHandler: (p1: PHContentEditingOutput) => void): void;

	startContentEditingWithInputPlaceholderImage(contentEditingInput: PHContentEditingInput, placeholderImage: UIImage): void;
}
declare var PHContentEditingController: {

	prototype: PHContentEditingController;
};

declare const enum PHLivePhotoBadgeOptions {

	OverContent = 1,

	LiveOff = 2
}

declare class PHLivePhotoView extends UIView {

	static alloc(): PHLivePhotoView; // inherited from NSObject

	static appearance(): PHLivePhotoView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): PHLivePhotoView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): PHLivePhotoView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): PHLivePhotoView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): PHLivePhotoView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): PHLivePhotoView; // inherited from UIAppearance

	static livePhotoBadgeImageWithOptions(badgeOptions: PHLivePhotoBadgeOptions): UIImage;

	static new(): PHLivePhotoView; // inherited from NSObject

	contentsRect: CGRect;

	delegate: PHLivePhotoViewDelegate;

	livePhoto: PHLivePhoto;

	muted: boolean;

	readonly playbackGestureRecognizer: UIGestureRecognizer;

	startPlaybackWithStyle(playbackStyle: PHLivePhotoViewPlaybackStyle): void;

	stopPlayback(): void;
}

interface PHLivePhotoViewDelegate extends NSObjectProtocol {

	livePhotoViewCanBeginPlaybackWithStyle?(livePhotoView: PHLivePhotoView, playbackStyle: PHLivePhotoViewPlaybackStyle): boolean;

	livePhotoViewDidEndPlaybackWithStyle?(livePhotoView: PHLivePhotoView, playbackStyle: PHLivePhotoViewPlaybackStyle): void;

	livePhotoViewExtraMinimumTouchDurationForTouchWithStyle?(livePhotoView: PHLivePhotoView, touch: UITouch, playbackStyle: PHLivePhotoViewPlaybackStyle): number;

	livePhotoViewWillBeginPlaybackWithStyle?(livePhotoView: PHLivePhotoView, playbackStyle: PHLivePhotoViewPlaybackStyle): void;
}
declare var PHLivePhotoViewDelegate: {

	prototype: PHLivePhotoViewDelegate;
};

declare const enum PHLivePhotoViewPlaybackStyle {

	Undefined = 0,

	Full = 1,

	Hint = 2
}

declare const enum PHPickerCapabilities {

	None = 0,

	Search = 1,

	StagingArea = 2,

	CollectionNavigation = 4,

	SelectionActions = 8,

	SensitivityAnalysisIntervention = 16
}

declare class PHPickerConfiguration extends NSObject implements NSCopying {

	static alloc(): PHPickerConfiguration; // inherited from NSObject

	static new(): PHPickerConfiguration; // inherited from NSObject

	disabledCapabilities: PHPickerCapabilities;

	edgesWithoutContentMargins: NSDirectionalRectEdge;

	filter: PHPickerFilter;

	mode: PHPickerMode;

	preferredAssetRepresentationMode: PHPickerConfigurationAssetRepresentationMode;

	preselectedAssetIdentifiers: NSArray<string>;

	selection: PHPickerConfigurationSelection;

	selectionLimit: number;

	constructor(o: { photoLibrary: PHPhotoLibrary; });

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	initWithPhotoLibrary(photoLibrary: PHPhotoLibrary): this;
}

declare const enum PHPickerConfigurationAssetRepresentationMode {

	Automatic = 0,

	Current = 1,

	Compatible = 2
}

declare const enum PHPickerConfigurationSelection {

	Default = 0,

	Ordered = 1,

	Continuous = 2,

	ContinuousAndOrdered = 3
}

declare class PHPickerFilter extends NSObject implements NSCopying {

	static allFilterMatchingSubfilters(subfilters: NSArray<PHPickerFilter> | PHPickerFilter[]): PHPickerFilter;

	static alloc(): PHPickerFilter; // inherited from NSObject

	static anyFilterMatchingSubfilters(subfilters: NSArray<PHPickerFilter> | PHPickerFilter[]): PHPickerFilter;

	static new(): PHPickerFilter; // inherited from NSObject

	static notFilterOfSubfilter(subfilter: PHPickerFilter): PHPickerFilter;

	static playbackStyleFilter(playbackStyle: PHAssetPlaybackStyle): PHPickerFilter;

	static readonly burstsFilter: PHPickerFilter;

	static readonly cinematicVideosFilter: PHPickerFilter;

	static readonly depthEffectPhotosFilter: PHPickerFilter;

	static readonly imagesFilter: PHPickerFilter;

	static readonly livePhotosFilter: PHPickerFilter;

	static readonly panoramasFilter: PHPickerFilter;

	static readonly screenRecordingsFilter: PHPickerFilter;

	static readonly screenshotsFilter: PHPickerFilter;

	static readonly slomoVideosFilter: PHPickerFilter;

	static readonly timelapseVideosFilter: PHPickerFilter;

	static readonly videosFilter: PHPickerFilter;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare const enum PHPickerMode {

	Default = 0,

	Compact = 1
}

declare class PHPickerResult extends NSObject {

	static alloc(): PHPickerResult; // inherited from NSObject

	static new(): PHPickerResult; // inherited from NSObject

	readonly assetIdentifier: string;

	readonly itemProvider: NSItemProvider;
}

declare class PHPickerUpdateConfiguration extends NSObject implements NSCopying {

	static alloc(): PHPickerUpdateConfiguration; // inherited from NSObject

	static new(): PHPickerUpdateConfiguration; // inherited from NSObject

	edgesWithoutContentMargins: NSDirectionalRectEdge;

	selectionLimit: number;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare class PHPickerViewController extends UIViewController {

	static alloc(): PHPickerViewController; // inherited from NSObject

	static new(): PHPickerViewController; // inherited from NSObject

	readonly configuration: PHPickerConfiguration;

	delegate: PHPickerViewControllerDelegate;

	constructor(o: { configuration: PHPickerConfiguration; });

	deselectAssetsWithIdentifiers(identifiers: NSArray<string> | string[]): void;

	initWithConfiguration(configuration: PHPickerConfiguration): this;

	moveAssetWithIdentifierAfterAssetWithIdentifier(identifier: string, afterIdentifier: string): void;

	scrollToInitialPosition(): void;

	updatePickerUsingConfiguration(configuration: PHPickerUpdateConfiguration): void;

	zoomIn(): void;

	zoomOut(): void;
}

interface PHPickerViewControllerDelegate extends NSObjectProtocol {

	pickerDidFinishPicking(picker: PHPickerViewController, results: NSArray<PHPickerResult> | PHPickerResult[]): void;
}
declare var PHPickerViewControllerDelegate: {

	prototype: PHPickerViewControllerDelegate;
};
