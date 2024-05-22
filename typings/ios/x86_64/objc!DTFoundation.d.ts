
declare class DTActivityTitleView extends UIView {

	static alloc(): DTActivityTitleView; // inherited from NSObject

	static appearance(): DTActivityTitleView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): DTActivityTitleView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): DTActivityTitleView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): DTActivityTitleView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): DTActivityTitleView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): DTActivityTitleView; // inherited from UIAppearance

	static new(): DTActivityTitleView; // inherited from NSObject

	busy: boolean;

	title: string;
}

declare function DTAnimatedGIFFromData(data: NSData): UIImage;

declare function DTAnimatedGIFFromFile(path: string): UIImage;

declare class DTBase64Coding extends NSObject {

	static alloc(): DTBase64Coding; // inherited from NSObject

	static dataByDecodingString(string: string): NSData;

	static new(): DTBase64Coding; // inherited from NSObject

	static stringByEncodingData(data: NSData): string;
}

declare function DTBlockPerformSyncIfOnMainThreadElseAsync(block: () => void): void;

declare function DTBlockPerformSyncOnMainThread(block: () => void): void;

declare function DTCGRectCenter(rect: CGRect): CGPoint;

declare function DTCGRectCreateDictionaryRepresentation(rect: CGRect): NSDictionary<any, any>;

declare function DTCGRectMakeWithDictionaryRepresentation(dict: NSDictionary<any, any>, rect: interop.Pointer | interop.Reference<CGRect>): boolean;

declare function DTCGSizeCreateDictionaryRepresentation(size: CGSize): NSDictionary<any, any>;

declare function DTCGSizeMakeWithDictionaryRepresentation(dict: NSDictionary<any, any>, size: interop.Pointer | interop.Reference<CGSize>): boolean;

declare function DTCGSizeThatFillsKeepingAspectRatio(originalSize: CGSize, sizeToFit: CGSize): CGSize;

declare function DTCGSizeThatFitsKeepingAspectRatio(originalSize: CGSize, sizeToFit: CGSize): CGSize;

declare var DTCurrentLogLevel: number;

declare class DTCustomColoredAccessory extends UIControl {

	static accessoryWithColor(color: UIColor): DTCustomColoredAccessory;

	static accessoryWithColorType(color: UIColor, type: DTCustomColoredAccessoryType): DTCustomColoredAccessory;

	static alloc(): DTCustomColoredAccessory; // inherited from NSObject

	static appearance(): DTCustomColoredAccessory; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): DTCustomColoredAccessory; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): DTCustomColoredAccessory; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): DTCustomColoredAccessory; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): DTCustomColoredAccessory; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): DTCustomColoredAccessory; // inherited from UIAppearance

	static new(): DTCustomColoredAccessory; // inherited from NSObject

	static squareAccessoryWithColorBackgroundColor(color: UIColor, backgroundColor: UIColor): DTCustomColoredAccessory;

	accessoryColor: UIColor;

	backSquareAccessoryColor: UIColor;

	frontSquareAccessoryColor: UIColor;

	highlightedColor: UIColor;

	type: DTCustomColoredAccessoryType;
}

declare const enum DTCustomColoredAccessoryType {

	Right = 0,

	Left = 1,

	Up = 2,

	Down = 3,

	Square = 4
}

declare class DTExtendedFileAttributes extends NSObject {

	static alloc(): DTExtendedFileAttributes; // inherited from NSObject

	static new(): DTExtendedFileAttributes; // inherited from NSObject

	constructor(o: { path: string; });

	initWithPath(path: string): this;

	removeAttribute(attribute: string): boolean;

	setValueForAttribute(value: string, attribute: string): boolean;

	valueForAttribute(attribute: string): string;
}

declare class DTFolderMonitor extends NSObject {

	static alloc(): DTFolderMonitor; // inherited from NSObject

	static folderMonitorForURLBlock(URL: NSURL, block: () => void): DTFolderMonitor;

	static new(): DTFolderMonitor; // inherited from NSObject

	startMonitoring(): void;

	stopMonitoring(): void;
}

declare var DTFoundationErrorDomain: string;

declare var DTFoundationVersionNumber: number;

declare var DTFoundationVersionString: interop.Reference<number>;

declare class DTHTMLParser extends NSObject {

	static alloc(): DTHTMLParser; // inherited from NSObject

	static new(): DTHTMLParser; // inherited from NSObject

	readonly columnNumber: number;

	delegate: DTHTMLParserDelegate;

	readonly lineNumber: number;

	readonly parserError: NSError;

	readonly publicID: string;

	readonly systemID: string;

	constructor(o: { data: NSData; encoding: number; });

	abortParsing(): void;

	initWithDataEncoding(data: NSData, encoding: number): this;

	parse(): boolean;
}

interface DTHTMLParserDelegate extends NSObjectProtocol {

	parserDidEndDocument?(parser: DTHTMLParser): void;

	parserDidEndElement?(parser: DTHTMLParser, elementName: string): void;

	parserDidStartDocument?(parser: DTHTMLParser): void;

	parserDidStartElementAttributes?(parser: DTHTMLParser, elementName: string, attributeDict: NSDictionary<any, any>): void;

	parserFoundCDATA?(parser: DTHTMLParser, CDATABlock: NSData): void;

	parserFoundCharacters?(parser: DTHTMLParser, string: string): void;

	parserFoundComment?(parser: DTHTMLParser, comment: string): void;

	parserFoundProcessingInstructionWithTargetData?(parser: DTHTMLParser, target: string, data: string): void;

	parserParseErrorOccurred?(parser: DTHTMLParser, parseError: NSError): void;
}
declare var DTHTMLParserDelegate: {

	prototype: DTHTMLParserDelegate;
};

declare function DTLogGetMessages(): NSArray<any>;

declare var DTLogHandler: (p1: number, p2: string, p3: number, p4: string, p5: string) => void;

declare const enum DTLogLevel {

	Emergency = 0,

	Alert = 1,

	Critical = 2,

	Error = 3,

	Warning = 4,

	Notice = 5,

	Info = 6,

	Debug = 7
}

declare function DTLogSetLogLevel(logLevel: number): void;

declare function DTLogSetLoggerBlock(handler: (p1: number, p2: string, p3: number, p4: string, p5: string) => void): void;

declare class DTPieProgressIndicator extends UIView {

	static alloc(): DTPieProgressIndicator; // inherited from NSObject

	static appearance(): DTPieProgressIndicator; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): DTPieProgressIndicator; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): DTPieProgressIndicator; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): DTPieProgressIndicator; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): DTPieProgressIndicator; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): DTPieProgressIndicator; // inherited from UIAppearance

	static new(): DTPieProgressIndicator; // inherited from NSObject

	static pieProgressIndicator(): DTPieProgressIndicator;

	color: UIColor;

	progressPercent: number;
}

declare class DTSmartPagingScrollView extends UIScrollView implements UIScrollViewDelegate {

	static alloc(): DTSmartPagingScrollView; // inherited from NSObject

	static appearance(): DTSmartPagingScrollView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): DTSmartPagingScrollView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): DTSmartPagingScrollView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): DTSmartPagingScrollView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): DTSmartPagingScrollView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): DTSmartPagingScrollView; // inherited from UIAppearance

	static new(): DTSmartPagingScrollView; // inherited from NSObject

	currentPageIndex: number;

	pageDatasource: DTSmartPagingScrollViewDatasource;

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

	rangeOfVisiblePages(): NSRange;

	reloadData(): void;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	scrollToPageAnimated(page: number, animated: boolean): void;

	scrollViewDidChangeAdjustedContentInset(scrollView: UIScrollView): void;

	scrollViewDidEndDecelerating(scrollView: UIScrollView): void;

	scrollViewDidEndDraggingWillDecelerate(scrollView: UIScrollView, decelerate: boolean): void;

	scrollViewDidEndScrollingAnimation(scrollView: UIScrollView): void;

	scrollViewDidEndZoomingWithViewAtScale(scrollView: UIScrollView, view: UIView, scale: number): void;

	scrollViewDidScroll(scrollView: UIScrollView): void;

	scrollViewDidScrollToTop(scrollView: UIScrollView): void;

	scrollViewDidZoom(scrollView: UIScrollView): void;

	scrollViewShouldScrollToTop(scrollView: UIScrollView): boolean;

	scrollViewWillBeginDecelerating(scrollView: UIScrollView): void;

	scrollViewWillBeginDragging(scrollView: UIScrollView): void;

	scrollViewWillBeginZoomingWithView(scrollView: UIScrollView, view: UIView): void;

	scrollViewWillEndDraggingWithVelocityTargetContentOffset(scrollView: UIScrollView, velocity: CGPoint, targetContentOffset: interop.Pointer | interop.Reference<CGPoint>): void;

	self(): this;

	viewForIndex(index: number): UIView;

	viewForZoomingInScrollView(scrollView: UIScrollView): UIView;
}

interface DTSmartPagingScrollViewDatasource extends NSObjectProtocol {

	numberOfPagesInSmartPagingScrollView(smartPagingScrollView: DTSmartPagingScrollView): number;

	smartPagingScrollViewDidScrollToPageAtIndex?(smartPagingScrollView: DTSmartPagingScrollView, index: number): void;

	smartPagingScrollViewViewForPageAtIndex(smartPagingScrollView: DTSmartPagingScrollView, index: number): UIView;
}
declare var DTSmartPagingScrollViewDatasource: {

	prototype: DTSmartPagingScrollViewDatasource;
};

declare class DTTiledLayerWithoutFade extends CATiledLayer {

	static alloc(): DTTiledLayerWithoutFade; // inherited from NSObject

	static layer(): DTTiledLayerWithoutFade; // inherited from CALayer

	static new(): DTTiledLayerWithoutFade; // inherited from NSObject
}

declare class DTVersion extends NSObject {

	static alloc(): DTVersion; // inherited from NSObject

	static appBundleVersion(): DTVersion;

	static new(): DTVersion; // inherited from NSObject

	static osVersion(): DTVersion;

	static osVersionIsGreaterThen(versionString: string): boolean;

	static osVersionIsLessThen(versionString: string): boolean;

	static versionWithString(versionString: string): DTVersion;

	readonly build: number;

	readonly maintenance: number;

	readonly major: number;

	readonly minor: number;

	constructor(o: { major: number; minor: number; maintenance: number; });

	constructor(o: { major: number; minor: number; maintenance: number; build: number; });

	compare(version: DTVersion): NSComparisonResult;

	initWithMajorMinorMaintenance(major: number, minor: number, maintenance: number): this;

	initWithMajorMinorMaintenanceBuild(major: number, minor: number, maintenance: number, build: number): this;

	isEqualToString(versionString: string): boolean;

	isEqualToVersion(version: DTVersion): boolean;

	isGreaterThenVersion(version: DTVersion): boolean;

	isGreaterThenVersionString(versionString: string): boolean;

	isLessThenVersion(version: DTVersion): boolean;

	isLessThenVersionString(versionString: string): boolean;
}
