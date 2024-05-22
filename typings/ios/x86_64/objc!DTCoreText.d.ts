
declare class DTAccessibilityElement extends UIAccessibilityElement {

	static alloc(): DTAccessibilityElement; // inherited from NSObject

	static new(): DTAccessibilityElement; // inherited from NSObject

	localCoordinateAccessibilityActivationPoint: CGPoint;

	localCoordinateAccessibilityFrame: CGRect;

	constructor(o: { parentView: UIView; });

	initWithParentView(parentView: UIView): this;
}

declare class DTAccessibilityViewProxy extends NSProxy {

	static alloc(): DTAccessibilityViewProxy; // inherited from NSProxy

	readonly delegate: DTAccessibilityViewProxyDelegate;

	readonly textAttachment: DTTextAttachment;

	constructor(o: { textAttachment: DTTextAttachment; delegate: DTAccessibilityViewProxyDelegate; });

	initWithTextAttachmentDelegate(textAttachment: DTTextAttachment, delegate: DTAccessibilityViewProxyDelegate): this;
}

interface DTAccessibilityViewProxyDelegate {

	viewForTextAttachmentProxy(attachment: DTTextAttachment, proxy: DTAccessibilityViewProxy): UIView;
}
declare var DTAccessibilityViewProxyDelegate: {

	prototype: DTAccessibilityViewProxyDelegate;
};

declare var DTAnchorAttribute: string;

declare class DTAnchorHTMLElement extends DTHTMLElement {

	static alloc(): DTAnchorHTMLElement; // inherited from NSObject

	static new(): DTAnchorHTMLElement; // inherited from NSObject

	highlightedTextColor: UIColor;
}

declare var DTArchivingAttribute: string;

declare var DTAscentMultiplierAttribute: string;

declare var DTAttachmentParagraphSpacingAttribute: string;

declare class DTAttributedLabel extends DTAttributedTextContentView {

	static alloc(): DTAttributedLabel; // inherited from NSObject

	static appearance(): DTAttributedLabel; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): DTAttributedLabel; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): DTAttributedLabel; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): DTAttributedLabel; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): DTAttributedLabel; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): DTAttributedLabel; // inherited from UIAppearance

	static new(): DTAttributedLabel; // inherited from NSObject

	lineBreakMode: NSLineBreakMode;

	numberOfLines: number;

	truncationString: NSAttributedString;
}

declare class DTAttributedTextCell extends UITableViewCell {

	static alloc(): DTAttributedTextCell; // inherited from NSObject

	static appearance(): DTAttributedTextCell; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): DTAttributedTextCell; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): DTAttributedTextCell; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): DTAttributedTextCell; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): DTAttributedTextCell; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): DTAttributedTextCell; // inherited from UIAppearance

	static new(): DTAttributedTextCell; // inherited from NSObject

	attributedString: NSAttributedString;

	readonly attributedTextContextView: DTAttributedTextContentView;

	hasFixedRowHeight: boolean;

	textDelegate: DTAttributedTextContentViewDelegate;

	constructor(o: { reuseIdentifier: string; });

	initWithReuseIdentifier(reuseIdentifier: string): this;

	requiredRowHeightInTableView(tableView: UITableView): number;

	setHTMLString(html: string): void;

	setHTMLStringOptions(html: string, options: NSDictionary<any, any>): void;
}

declare class DTAttributedTextContentView extends UIView {

	static alloc(): DTAttributedTextContentView; // inherited from NSObject

	static appearance(): DTAttributedTextContentView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): DTAttributedTextContentView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): DTAttributedTextContentView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): DTAttributedTextContentView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): DTAttributedTextContentView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): DTAttributedTextContentView; // inherited from UIAppearance

	static layerClass(): typeof NSObject;

	static new(): DTAttributedTextContentView; // inherited from NSObject

	static setLayerClass(layerClass: typeof NSObject): void;

	attributedString: NSAttributedString;

	backgroundOffset: CGSize;

	delegate: DTAttributedTextContentViewDelegate;

	edgeInsets: UIEdgeInsets;

	layoutFrame: DTCoreTextLayoutFrame;

	layoutFrameHeightIsConstrainedByBounds: boolean;

	layoutOffset: CGPoint;

	layouter: DTCoreTextLayouter;

	relayoutMask: number;

	shouldDrawImages: boolean;

	shouldDrawLinks: boolean;

	shouldLayoutCustomSubviews: boolean;

	closestCursorIndexToPoint(point: CGPoint): number;

	contentImageWithBoundsOptions(bounds: CGRect, options: DTCoreTextLayoutFrameDrawingOptions): UIImage;

	cursorRectAtIndex(index: number): CGRect;

	intrinsicContentSize(): CGSize;

	layoutSubviewsInRect(rect: CGRect): void;

	relayoutText(): void;

	removeAllCustomViews(): void;

	removeAllCustomViewsForLinks(): void;

	suggestedFrameSizeToFitEntireStringConstraintedToWidth(width: number): CGSize;
}

interface DTAttributedTextContentViewDelegate extends NSObjectProtocol {

	attributedTextContentViewDidDrawLayoutFrameInContext?(attributedTextContentView: DTAttributedTextContentView, layoutFrame: DTCoreTextLayoutFrame, context: any): void;

	attributedTextContentViewShouldDrawBackgroundForTextBlockFrameContextForLayoutFrame?(attributedTextContentView: DTAttributedTextContentView, textBlock: DTTextBlock, frame: CGRect, context: any, layoutFrame: DTCoreTextLayoutFrame): boolean;

	attributedTextContentViewViewForAttachmentFrame?(attributedTextContentView: DTAttributedTextContentView, attachment: DTTextAttachment, frame: CGRect): UIView;

	attributedTextContentViewViewForAttributedStringFrame?(attributedTextContentView: DTAttributedTextContentView, string: NSAttributedString, frame: CGRect): UIView;

	attributedTextContentViewViewForLinkIdentifierFrame?(attributedTextContentView: DTAttributedTextContentView, url: NSURL, identifier: string, frame: CGRect): UIView;

	attributedTextContentViewWillDrawLayoutFrameInContext?(attributedTextContentView: DTAttributedTextContentView, layoutFrame: DTCoreTextLayoutFrame, context: any): void;
}
declare var DTAttributedTextContentViewDelegate: {

	prototype: DTAttributedTextContentViewDelegate;
};

declare var DTAttributedTextContentViewDidFinishLayoutNotification: string;

declare const DTAttributedTextContentViewRelayoutNever: number;

declare const DTAttributedTextContentViewRelayoutOnHeightChanged: number;

declare const DTAttributedTextContentViewRelayoutOnWidthChanged: number;

declare class DTAttributedTextView extends UIScrollView {

	static alloc(): DTAttributedTextView; // inherited from NSObject

	static appearance(): DTAttributedTextView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): DTAttributedTextView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): DTAttributedTextView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): DTAttributedTextView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): DTAttributedTextView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): DTAttributedTextView; // inherited from UIAppearance

	static new(): DTAttributedTextView; // inherited from NSObject

	attributedString: NSAttributedString;

	readonly attributedTextContentView: DTAttributedTextContentView;

	backgroundView: UIView;

	shouldDrawImages: boolean;

	shouldDrawLinks: boolean;

	textDelegate: DTAttributedTextContentViewDelegate;

	classForContentView(): typeof NSObject;

	closestCursorIndexToPoint(point: CGPoint): number;

	cursorRectAtIndex(index: number): CGRect;

	relayoutText(): void;

	scrollRangeToVisibleAnimated(range: NSRange, animated: boolean): void;

	scrollToAnchorNamedAnimated(anchorName: string, animated: boolean): void;
}

declare var DTBackgroundColorAttribute: string;

declare var DTBackgroundCornerRadiusAttribute: string;

declare var DTBackgroundStrokeColorAttribute: string;

declare var DTBackgroundStrokeWidthAttribute: string;

declare class DTBreakHTMLElement extends DTHTMLElement {

	static alloc(): DTBreakHTMLElement; // inherited from NSObject

	static new(): DTBreakHTMLElement; // inherited from NSObject
}

declare class DTCSSListStyle extends NSObject implements NSCoding {

	static alloc(): DTCSSListStyle; // inherited from NSObject

	static listStylePositionFromString(string: string): DTCSSListStylePosition;

	static listStyleTypeFromString(string: string): DTCSSListStyleType;

	static new(): DTCSSListStyle; // inherited from NSObject

	imageName: string;

	inherit: boolean;

	position: DTCSSListStylePosition;

	type: DTCSSListStyleType;

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	constructor(o: { styles: NSDictionary<any, any>; });

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;

	initWithStyles(styles: NSDictionary<any, any>): this;

	isEqualToListStyle(otherListStyle: DTCSSListStyle): boolean;

	isOrdered(): boolean;

	prefixWithCounter(counter: number): string;

	setStartingItemNumber(itemNum: number): void;

	startingItemNumber(): number;

	updateFromStyleDictionary(styles: NSDictionary<any, any>): void;
}

declare const enum DTCSSListStylePosition {

	Inherit = 0,

	Inside = 1,

	Outside = 2,

	Invalid = 9223372036854775807
}

declare const enum DTCSSListStyleType {

	Inherit = 0,

	None = 1,

	Circle = 2,

	Decimal = 3,

	DecimalLeadingZero = 4,

	Disc = 5,

	Square = 6,

	UpperAlpha = 7,

	UpperLatin = 8,

	UpperRoman = 9,

	LowerAlpha = 10,

	LowerLatin = 11,

	LowerRoman = 12,

	Plus = 13,

	Underscore = 14,

	Image = 15,

	Invalid = 9223372036854775807
}

declare class DTCSSStylesheet extends NSObject implements NSCopying {

	static alloc(): DTCSSStylesheet; // inherited from NSObject

	static defaultStyleSheet(): DTCSSStylesheet;

	static new(): DTCSSStylesheet; // inherited from NSObject

	constructor(o: { styleBlock: string; });

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	initWithStyleBlock(css: string): this;

	mergeStylesheet(stylesheet: DTCSSStylesheet): void;

	mergedStyleDictionaryForElementMatchedSelectorsIgnoreInlineStyle(element: DTHTMLElement, matchedSelectors: interop.Pointer | interop.Reference<NSSet<any>>, ignoreInlineStyle: boolean): NSDictionary<any, any>;

	orderedSelectors(): NSArray<any>;

	parseStyleBlock(css: string): void;

	styles(): NSDictionary<any, any>;
}

declare function DTCTFontCreateWithUIFont(font: UIFont): interop.Unmanaged<UIFont>;

declare function DTCTLineTruncationTypeFromNSLineBreakMode(lineBreakMode: NSLineBreakMode): CTLineTruncationType;

declare function DTCeilWithContentScale(value: number, contentScale: number): number;

declare function DTColorCreateWithHTMLName(name: string): UIColor;

declare function DTColorCreateWithHexString(hexString: string): UIColor;

declare class DTCoreTextFontCollection extends NSObject {

	static alloc(): DTCoreTextFontCollection; // inherited from NSObject

	static availableFontsCollection(): DTCoreTextFontCollection;

	static new(): DTCoreTextFontCollection; // inherited from NSObject

	fontDescriptors(): NSArray<any>;

	fontFamilyNames(): NSArray<any>;

	matchingFontDescriptorForFontDescriptor(descriptor: DTCoreTextFontDescriptor): DTCoreTextFontDescriptor;
}

declare class DTCoreTextFontDescriptor extends NSObject implements NSCoding, NSCopying {

	static alloc(): DTCoreTextFontDescriptor; // inherited from NSObject

	static asyncPreloadFontLookupTable(): void;

	static fallbackFontFamily(): string;

	static fontDescriptorForCTFont(ctFont: UIFont): DTCoreTextFontDescriptor;

	static fontDescriptorWithFontAttributes(attributes: NSDictionary<any, any>): DTCoreTextFontDescriptor;

	static new(): DTCoreTextFontDescriptor; // inherited from NSObject

	static overrideFontNameforFontFamilyBoldItalic(fontFamily: string, bold: boolean, italic: boolean): string;

	static setFallbackFontFamily(fontFamily: string): void;

	static setOverrideFontNameForFontFamilyBoldItalic(fontName: string, fontFamily: string, bold: boolean, italic: boolean): void;

	static setSmallCapsFontNameForFontFamilyBoldItalic(fontName: string, fontFamily: string, bold: boolean, italic: boolean): void;

	static smallCapsFontNameforFontFamilyBoldItalic(fontFamily: string, bold: boolean, italic: boolean): string;

	UIoptimizedTrait: boolean;

	boldTrait: boolean;

	condensedTrait: boolean;

	expandedTrait: boolean;

	fontFamily: string;

	fontName: string;

	italicTrait: boolean;

	monospaceTrait: boolean;

	pointSize: number;

	smallCapsFeature: boolean;

	stylisticClass: CTFontStylisticClass;

	symbolicTraits: CTFontSymbolicTraits;

	verticalTrait: boolean;

	constructor(o: { CTFont: UIFont; });

	constructor(o: { CTFontDescriptor: UIFontDescriptor; });

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	constructor(o: { fontAttributes: NSDictionary<any, any>; });

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	cssStyleRepresentation(): string;

	encodeWithCoder(coder: NSCoder): void;

	fontAttributes(): NSDictionary<any, any>;

	initWithCTFont(ctFont: UIFont): this;

	initWithCTFontDescriptor(ctFontDescriptor: UIFontDescriptor): this;

	initWithCoder(coder: NSCoder): this;

	initWithFontAttributes(attributes: NSDictionary<any, any>): this;

	newMatchingFont(): UIFont;

	setFontAttributes(newAttributes: NSDictionary<any, any>): void;

	supportsNativeSmallCaps(): boolean;
}

declare var DTCoreTextFontDescriptorException: string;

declare class DTCoreTextGlyphRun extends NSObject {

	static alloc(): DTCoreTextGlyphRun; // inherited from NSObject

	static new(): DTCoreTextGlyphRun; // inherited from NSObject

	readonly ascent: number;

	readonly attachment: DTTextAttachment;

	readonly attributes: NSDictionary<any, any>;

	readonly descent: number;

	readonly frame: CGRect;

	readonly hyperlink: boolean;

	readonly leading: number;

	readonly numberOfGlyphs: number;

	readonly width: number;

	readonly writingDirectionIsRightToLeft: boolean;

	constructor(o: { run: any; layoutLine: DTCoreTextLayoutLine; offset: number; });

	drawDecorationInContext(context: any): void;

	drawInContext(context: any): void;

	frameOfGlyphAtIndex(index: number): CGRect;

	imageBoundsInContext(context: any): CGRect;

	initWithRunLayoutLineOffset(run: any, layoutLine: DTCoreTextLayoutLine, offset: number): this;

	isTrailingWhitespace(): boolean;

	newPathWithGlyphs(): any;

	stringIndices(): NSArray<any>;

	stringRange(): NSRange;
}

declare class DTCoreTextLayoutFrame extends NSObject {

	static alloc(): DTCoreTextLayoutFrame; // inherited from NSObject

	static new(): DTCoreTextLayoutFrame; // inherited from NSObject

	static setShouldDrawDebugFrames(debugFrames: boolean): void;

	static shouldDrawDebugFrames(): boolean;

	readonly frame: CGRect;

	justifyRatio: number;

	lineBreakMode: NSLineBreakMode;

	readonly lines: NSArray<any>;

	numberOfLines: number;

	readonly paragraphRanges: NSArray<any>;

	textBlockHandler: (p1: DTTextBlock, p2: CGRect, p3: any, p4: interop.Pointer | interop.Reference<boolean>) => void;

	truncationString: NSAttributedString;

	constructor(o: { frame: CGRect; layouter: DTCoreTextLayouter; });

	constructor(o: { frame: CGRect; layouter: DTCoreTextLayouter; range: NSRange; });

	attributedStringFragment(): NSAttributedString;

	baselineOriginToPositionLineAfterLine(line: DTCoreTextLayoutLine, previousLine: DTCoreTextLayoutLine): CGPoint;

	baselineOriginToPositionLineAfterLineOptions(line: DTCoreTextLayoutLine, previousLine: DTCoreTextLayoutLine, options: DTCoreTextLayoutFrameLinePositioningOptions): CGPoint;

	closestCursorIndexToPoint(point: CGPoint): number;

	cursorRectAtIndex(index: number): CGRect;

	drawInContextDrawImagesDrawLinks(context: any, drawImages: boolean, drawLinks: boolean): void;

	drawInContextOptions(context: any, options: DTCoreTextLayoutFrameDrawingOptions): void;

	frameOfGlyphAtIndex(index: number): CGRect;

	initWithFrameLayouter(frame: CGRect, layouter: DTCoreTextLayouter): this;

	initWithFrameLayouterRange(frame: CGRect, layouter: DTCoreTextLayouter, range: NSRange): this;

	intrinsicContentFrame(): CGRect;

	isLineFirstInParagraph(line: DTCoreTextLayoutLine): boolean;

	isLineLastInParagraph(line: DTCoreTextLayoutLine): boolean;

	lineContainingIndex(index: number): DTCoreTextLayoutLine;

	lineIndexForGlyphIndex(index: number): number;

	linesContainedInRect(rect: CGRect): NSArray<any>;

	linesInParagraphAtIndex(index: number): NSArray<any>;

	linesVisibleInRect(rect: CGRect): NSArray<any>;

	paragraphIndexContainingStringIndex(stringIndex: number): number;

	paragraphRangeContainingStringRange(stringRange: NSRange): NSRange;

	stringIndices(): NSArray<any>;

	textAttachments(): NSArray<any>;

	textAttachmentsWithPredicate(predicate: NSPredicate): NSArray<any>;

	visibleStringRange(): NSRange;
}

declare class DTCoreTextLayoutFrameAccessibilityElementGenerator extends NSObject {

	static alloc(): DTCoreTextLayoutFrameAccessibilityElementGenerator; // inherited from NSObject

	static new(): DTCoreTextLayoutFrameAccessibilityElementGenerator; // inherited from NSObject

	accessibilityElementsForLayoutFrameViewAttachmentViewProvider(frame: DTCoreTextLayoutFrame, view: UIView, block: (p1: DTTextAttachment) => any): NSArray<any>;
}

declare const enum DTCoreTextLayoutFrameDrawingOptions {

	Default = 1,

	OmitLinks = 2,

	OmitAttachments = 4,

	DrawLinksHighlighted = 8
}

declare const enum DTCoreTextLayoutFrameLinePositioningOptions {

	AlgorithmWebKit = 1,

	AlgorithmLegacy = 2
}

declare class DTCoreTextLayoutLine extends NSObject {

	static alloc(): DTCoreTextLayoutLine; // inherited from NSObject

	static new(): DTCoreTextLayoutLine; // inherited from NSObject

	ascent: number;

	readonly attachments: NSArray<any>;

	baselineOrigin: CGPoint;

	readonly descent: number;

	frame: CGRect;

	readonly glyphRuns: NSArray<any>;

	readonly leading: number;

	readonly lineHeight: number;

	readonly paragraphStyle: DTCoreTextParagraphStyle;

	readonly stringLocationOffset: number;

	readonly textBlocks: NSArray<any>;

	readonly trailingWhitespaceWidth: number;

	readonly underlineOffset: number;

	writingDirectionIsRightToLeft: boolean;

	constructor(o: { line: any; });

	constructor(o: { line: any; stringLocationOffset: number; });

	drawInContext(context: any): void;

	frameOfGlyphAtIndex(index: number): CGRect;

	frameOfGlyphsWithRange(range: NSRange): CGRect;

	glyphRunsWithRange(range: NSRange): NSArray<any>;

	imageBoundsInContext(context: any): CGRect;

	initWithLine(line: any): this;

	initWithLineStringLocationOffset(line: any, stringLocationOffset: number): this;

	isHorizontalRule(): boolean;

	justifiedLineWithFactorJustificationWidth(justificationFactor: number, justificationWidth: number): DTCoreTextLayoutLine;

	newPathWithGlyphs(): any;

	numberOfGlyphs(): number;

	offsetForStringIndex(index: number): number;

	stringIndexForPosition(position: CGPoint): number;

	stringIndices(): NSArray<any>;

	stringRange(): NSRange;
}

declare class DTCoreTextLayouter extends NSObject {

	static alloc(): DTCoreTextLayouter; // inherited from NSObject

	static new(): DTCoreTextLayouter; // inherited from NSObject

	attributedString: NSAttributedString;

	readonly framesetter: any;

	shouldCacheLayoutFrames: boolean;

	constructor(o: { attributedString: NSAttributedString; });

	initWithAttributedString(attributedString: NSAttributedString): this;

	layoutFrameWithRectRange(frame: CGRect, range: NSRange): DTCoreTextLayoutFrame;
}

declare class DTCoreTextParagraphStyle extends NSObject implements NSCopying {

	static alloc(): DTCoreTextParagraphStyle; // inherited from NSObject

	static defaultParagraphStyle(): DTCoreTextParagraphStyle;

	static new(): DTCoreTextParagraphStyle; // inherited from NSObject

	static paragraphStyleWithCTParagraphStyle(ctParagraphStyle: any): DTCoreTextParagraphStyle;

	static paragraphStyleWithNSParagraphStyle(paragraphStyle: NSParagraphStyle): DTCoreTextParagraphStyle;

	alignment: CTTextAlignment;

	baseWritingDirection: CTWritingDirection;

	defaultTabInterval: number;

	firstLineHeadIndent: number;

	headIndent: number;

	lineHeightMultiple: number;

	maximumLineHeight: number;

	minimumLineHeight: number;

	paragraphSpacing: number;

	paragraphSpacingBefore: number;

	tabStops: NSArray<any>;

	tailIndent: number;

	textBlocks: NSArray<any>;

	textLists: NSArray<any>;

	constructor(o: { CTParagraphStyle: any; });

	NSParagraphStyle(): NSParagraphStyle;

	addTabStopAtPositionAlignment(position: number, alignment: CTTextAlignment): void;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	createCTParagraphStyle(): any;

	cssStyleRepresentation(): string;

	initWithCTParagraphStyle(ctParagraphStyle: any): this;
}

declare var DTCoreTextVersionNumber: number;

declare var DTCoreTextVersionString: interop.Reference<number>;

declare var DTCustomAttributesAttribute: string;

declare var DTDefaultFirstLineHeadIndent: string;

declare var DTDefaultFontDescriptor: string;

declare var DTDefaultFontFamily: string;

declare var DTDefaultFontName: string;

declare var DTDefaultFontSize: string;

declare var DTDefaultHeadIndent: string;

declare var DTDefaultLineHeightMultiplier: string;

declare var DTDefaultLineHeightMultiplierVar: string;

declare var DTDefaultLinkColor: string;

declare var DTDefaultLinkDecoration: string;

declare var DTDefaultLinkHighlightColor: string;

declare var DTDefaultStyleSheet: string;

declare var DTDefaultTextAlignment: string;

declare var DTDefaultTextColor: string;

declare class DTDictationPlaceholderTextAttachment extends DTTextAttachment {

	static alloc(): DTDictationPlaceholderTextAttachment; // inherited from NSObject

	static new(): DTDictationPlaceholderTextAttachment; // inherited from NSObject

	replacedAttributedString: NSAttributedString;
}

declare class DTDictationPlaceholderView extends UIView {

	static alloc(): DTDictationPlaceholderView; // inherited from NSObject

	static appearance(): DTDictationPlaceholderView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): DTDictationPlaceholderView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): DTDictationPlaceholderView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): DTDictationPlaceholderView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): DTDictationPlaceholderView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): DTDictationPlaceholderView; // inherited from UIAppearance

	static new(): DTDictationPlaceholderView; // inherited from NSObject

	static placeholderView(): DTDictationPlaceholderView;

	context: any;
}

declare var DTDocumentPreserveTrailingSpaces: string;

declare var DTFieldAttribute: string;

declare function DTFloorWithContentScale(value: number, contentScale: number): number;

declare var DTGUIDAttribute: string;

declare class DTHTMLAttributedStringBuilder extends NSObject implements DTHTMLParserDelegate {

	static alloc(): DTHTMLAttributedStringBuilder; // inherited from NSObject

	static new(): DTHTMLAttributedStringBuilder; // inherited from NSObject

	parseErrorCallback: (p1: NSAttributedString, p2: NSError) => void;

	shouldKeepDocumentNodeTree: boolean;

	willFlushCallback: (p1: DTHTMLElement) => void;

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	constructor(o: { HTML: NSData; options: NSDictionary<any, any>; documentAttributes: interop.Pointer | interop.Reference<NSDictionary<any, any>>; });

	abortParsing(): void;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	generatedAttributedString(): NSAttributedString;

	initWithHTMLOptionsDocumentAttributes(data: NSData, options: NSDictionary<any, any>, docAttributes: interop.Pointer | interop.Reference<NSDictionary<any, any>>): this;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	parserDidEndDocument(parser: DTHTMLParser): void;

	parserDidEndElement(parser: DTHTMLParser, elementName: string): void;

	parserDidStartDocument(parser: DTHTMLParser): void;

	parserDidStartElementAttributes(parser: DTHTMLParser, elementName: string, attributeDict: NSDictionary<any, any>): void;

	parserFoundCDATA(parser: DTHTMLParser, CDATABlock: NSData): void;

	parserFoundCharacters(parser: DTHTMLParser, string: string): void;

	parserFoundComment(parser: DTHTMLParser, comment: string): void;

	parserFoundProcessingInstructionWithTargetData(parser: DTHTMLParser, target: string, data: string): void;

	parserParseErrorOccurred(parser: DTHTMLParser, parseError: NSError): void;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

declare class DTHTMLElement extends DTHTMLParserNode {

	static alloc(): DTHTMLElement; // inherited from NSObject

	static attributesToIgnoreForCustomAttributesAttribute(): NSSet<any>;

	static elementWithNameAttributesOptions(name: string, attributes: NSDictionary<any, any>, options: NSDictionary<any, any>): DTHTMLElement;

	static new(): DTHTMLElement; // inherited from NSObject

	CSSClassNamesToIgnoreForCustomAttributes: NSSet<any>;

	anchorName: string;

	backgroundColor: UIColor;

	backgroundCornerRadius: number;

	backgroundStrokeColor: UIColor;

	backgroundStrokeWidth: number;

	beforeContent: string;

	containsAppleConvertedSpace: boolean;

	currentTextSize: number;

	didOutput: boolean;

	displayStyle: DTHTMLElementDisplayStyle;

	readonly floatStyle: DTHTMLElementFloatStyle;

	fontDescriptor: DTCoreTextFontDescriptor;

	fontVariant: DTHTMLElementFontVariant;

	headerLevel: number;

	isColorInherited: boolean;

	letterSpacing: number;

	link: NSURL;

	margins: UIEdgeInsets;

	pTextIndent: number;

	padding: UIEdgeInsets;

	paragraphStyle: DTCoreTextParagraphStyle;

	preserveNewlines: boolean;

	shadows: NSArray<any>;

	shouldProcessCustomHTMLAttributes: boolean;

	size: CGSize;

	strikeOut: boolean;

	superscriptStyle: number;

	textAttachment: DTTextAttachment;

	textColor: UIColor;

	textScale: number;

	underlineColor: UIColor;

	underlineStyle: CTUnderlineStyle;

	applyStyleDictionary(styles: NSDictionary<any, any>): void;

	attributeForKey(key: string): string;

	attributedString(): NSAttributedString;

	attributesForAttributedStringRepresentation(): NSDictionary<any, any>;

	inheritAttributesFromElement(element: DTHTMLElement): void;

	interpretAttributes(): void;

	listStyle(): DTCSSListStyle;

	needsOutput(): boolean;

	parentElement(): DTHTMLElement;
}

declare const enum DTHTMLElementDisplayStyle {

	Inline = 0,

	None = 1,

	Block = 2,

	ListItem = 3,

	Table = 4
}

declare const enum DTHTMLElementFloatStyle {

	None = 0,

	Left = 1,

	Right = 2
}

declare const enum DTHTMLElementFontVariant {

	Inherit = 0,

	Normal = 1,

	SmallCaps = 2
}

declare class DTHTMLParserNode extends NSObject {

	static alloc(): DTHTMLParserNode; // inherited from NSObject

	static new(): DTHTMLParserNode; // inherited from NSObject

	attributes: NSDictionary<any, any>;

	readonly childNodes: NSArray<any>;

	name: string;

	parentNode: DTHTMLParserNode;

	readonly text: string;

	constructor(o: { name: string; attributes: NSDictionary<any, any>; });

	addChildNode(childNode: DTHTMLParserNode): void;

	debugDescription(): string;

	initWithNameAttributes(name: string, attributes: NSDictionary<any, any>): this;

	removeAllChildNodes(): void;

	removeChildNode(childNode: DTHTMLParserNode): void;
}

declare class DTHTMLParserTextNode extends DTHTMLParserNode {

	static alloc(): DTHTMLParserTextNode; // inherited from NSObject

	static new(): DTHTMLParserTextNode; // inherited from NSObject

	readonly characters: string;

	constructor(o: { characters: string; });

	initWithCharacters(characters: string): this;
}

declare class DTHTMLWriter extends NSObject {

	static alloc(): DTHTMLWriter; // inherited from NSObject

	static new(): DTHTMLWriter; // inherited from NSObject

	readonly attributedString: NSAttributedString;

	paragraphTagName: string;

	textScale: number;

	useAppleConvertedSpace: boolean;

	constructor(o: { attributedString: NSAttributedString; });

	HTMLFragment(): string;

	HTMLString(): string;

	initWithAttributedString(attributedString: NSAttributedString): this;
}

declare var DTHeaderLevelAttribute: string;

declare function DTHexStringFromDTColor(color: UIColor): string;

declare class DTHorizontalRuleHTMLElement extends DTHTMLElement {

	static alloc(): DTHorizontalRuleHTMLElement; // inherited from NSObject

	static new(): DTHorizontalRuleHTMLElement; // inherited from NSObject
}

declare var DTHorizontalRuleStyleAttribute: string;

declare class DTIframeTextAttachment extends DTTextAttachment implements DTTextAttachmentHTMLPersistence {

	static alloc(): DTIframeTextAttachment; // inherited from NSObject

	static new(): DTIframeTextAttachment; // inherited from NSObject

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

	stringByEncodingAsHTML(): string;
}

declare var DTIgnoreInlineStylesOption: string;

declare class DTImageTextAttachment extends DTTextAttachment implements DTTextAttachmentDrawing, DTTextAttachmentHTMLPersistence {

	static alloc(): DTImageTextAttachment; // inherited from NSObject

	static new(): DTImageTextAttachment; // inherited from NSObject

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	dataURLRepresentation(): string;

	drawInRectContext(rect: CGRect, context: any): void;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	stringByEncodingAsHTML(): string;
}

declare class DTLazyImageView extends UIImageView {

	static alloc(): DTLazyImageView; // inherited from NSObject

	static appearance(): DTLazyImageView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): DTLazyImageView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): DTLazyImageView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): DTLazyImageView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): DTLazyImageView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): DTLazyImageView; // inherited from UIAppearance

	static new(): DTLazyImageView; // inherited from NSObject

	contentView: DTAttributedTextContentView;

	delegate: DTLazyImageViewDelegate;

	shouldShowProgressiveDownload: boolean;

	url: NSURL;

	urlRequest: NSMutableURLRequest;

	cancelLoading(): void;
}

interface DTLazyImageViewDelegate extends NSObjectProtocol {

	lazyImageViewDidChangeImageSize?(lazyImageView: DTLazyImageView, size: CGSize): void;
}
declare var DTLazyImageViewDelegate: {

	prototype: DTLazyImageViewDelegate;
};

declare var DTLazyImageViewDidFinishDownloadNotification: string;

declare var DTLazyImageViewWillStartDownloadNotification: string;

declare var DTLinkAttribute: string;

declare class DTLinkButton extends UIButton {

	static alloc(): DTLinkButton; // inherited from NSObject

	static appearance(): DTLinkButton; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): DTLinkButton; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): DTLinkButton; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): DTLinkButton; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): DTLinkButton; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | typeof NSObject[]): DTLinkButton; // inherited from UIAppearance

	static buttonWithConfigurationPrimaryAction(configuration: UIButtonConfiguration, primaryAction: UIAction): DTLinkButton; // inherited from UIButton

	static buttonWithType(buttonType: UIButtonType): DTLinkButton; // inherited from UIButton

	static buttonWithTypePrimaryAction(buttonType: UIButtonType, primaryAction: UIAction): DTLinkButton; // inherited from UIButton

	static new(): DTLinkButton; // inherited from NSObject

	static systemButtonWithImageTargetAction(image: UIImage, target: any, action: string): DTLinkButton; // inherited from UIButton

	static systemButtonWithPrimaryAction(primaryAction: UIAction): DTLinkButton; // inherited from UIButton

	GUID: string;

	URL: NSURL;

	minimumHitSize: CGSize;
}

declare var DTLinkButtonDidHighlightNotification: string;

declare var DTLinkHighlightColorAttribute: string;

declare class DTListItemHTMLElement extends DTHTMLElement {

	static alloc(): DTListItemHTMLElement; // inherited from NSObject

	static new(): DTListItemHTMLElement; // inherited from NSObject
}

declare var DTListPrefixField: string;

declare var DTMaxImageSize: string;

declare function DTNSTextAlignmentFromCTTextAlignment(ctTextAlignment: CTTextAlignment): NSTextAlignment;

declare function DTNSTextAlignmentToCTTextAlignment(nsTextAlignment: NSTextAlignment): CTTextAlignment;

declare class DTObjectTextAttachment extends DTTextAttachment implements DTTextAttachmentHTMLPersistence {

	static alloc(): DTObjectTextAttachment; // inherited from NSObject

	static new(): DTObjectTextAttachment; // inherited from NSObject

	childNodes: NSArray<any>;

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

	stringByEncodingAsHTML(): string;
}

declare var DTProcessCustomHTMLAttributes: string;

declare function DTRoundWithContentScale(value: number, contentScale: number): number;

declare var DTShadowsAttribute: string;

declare var DTStrikeOutAttribute: string;

declare class DTStylesheetHTMLElement extends DTHTMLElement {

	static alloc(): DTStylesheetHTMLElement; // inherited from NSObject

	static new(): DTStylesheetHTMLElement; // inherited from NSObject

	stylesheet(): DTCSSStylesheet;
}

declare class DTTextAttachment extends NSTextAttachment {

	static alloc(): DTTextAttachment; // inherited from NSObject

	static new(): DTTextAttachment; // inherited from NSObject

	static registerClassForTagName(theClass: typeof NSObject, tagName: string): void;

	static registeredClassForTagName(tagName: string): typeof NSObject;

	static textAttachmentWithElementOptions(element: DTHTMLElement, options: NSDictionary<any, any>): DTTextAttachment;

	attributes: NSDictionary<any, any>;

	contentURL: NSURL;

	displaySize: CGSize;

	hyperLinkGUID: string;

	hyperLinkURL: NSURL;

	originalSize: CGSize;

	verticalAlignment: DTTextAttachmentVerticalAlignment;

	constructor(o: { element: DTHTMLElement; options: NSDictionary<any, any>; });

	adjustVerticalAlignmentForFont(font: UIFont): void;

	ascentForLayout(): number;

	descentForLayout(): number;

	initWithElementOptions(element: DTHTMLElement, options: NSDictionary<any, any>): this;

	setDisplaySizeWithMaxDisplaySize(displaySize: CGSize, maxDisplaySize: CGSize): void;
}

interface DTTextAttachmentDrawing extends NSObjectProtocol {

	drawInRectContext(rect: CGRect, context: any): void;
}
declare var DTTextAttachmentDrawing: {

	prototype: DTTextAttachmentDrawing;
};

declare class DTTextAttachmentHTMLElement extends DTHTMLElement {

	static alloc(): DTTextAttachmentHTMLElement; // inherited from NSObject

	static new(): DTTextAttachmentHTMLElement; // inherited from NSObject
}

interface DTTextAttachmentHTMLPersistence extends NSObjectProtocol {

	stringByEncodingAsHTML(): string;
}
declare var DTTextAttachmentHTMLPersistence: {

	prototype: DTTextAttachmentHTMLPersistence;
};

declare const enum DTTextAttachmentVerticalAlignment {

	Baseline = 0,

	Top = 1,

	Center = 2,

	Bottom = 3
}

declare class DTTextBlock extends NSObject implements NSCoding {

	static alloc(): DTTextBlock; // inherited from NSObject

	static new(): DTTextBlock; // inherited from NSObject

	backgroundColor: UIColor;

	padding: UIEdgeInsets;

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare var DTTextBlocksAttribute: string;

declare class DTTextHTMLElement extends DTHTMLElement {

	static alloc(): DTTextHTMLElement; // inherited from NSObject

	static new(): DTTextHTMLElement; // inherited from NSObject

	text: string;
}

declare var DTTextListsAttribute: string;

declare var DTUseiOS6Attributes: string;

declare class DTVideoTextAttachment extends DTTextAttachment implements DTTextAttachmentHTMLPersistence {

	static alloc(): DTVideoTextAttachment; // inherited from NSObject

	static new(): DTVideoTextAttachment; // inherited from NSObject

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

	stringByEncodingAsHTML(): string;
}

declare var DTWillFlushBlockCallBack: string;

declare var NSBaseURLDocumentOption: string;

declare var NSTextEncodingNameDocumentOption: string;

declare var NSTextSizeMultiplierDocumentOption: string;

declare var ___useiOS6Attributes: boolean;

declare function areLinesEqual(line1: any, line2: any): boolean;

declare function createEmbeddedObjectRunDelegate(obj: any): interop.Unmanaged<any>;

declare function embeddedObjectDeallocCallback(context: interop.Pointer | interop.Reference<any>): void;

declare function embeddedObjectGetAscentCallback(context: interop.Pointer | interop.Reference<any>): number;

declare function embeddedObjectGetDescentCallback(context: interop.Pointer | interop.Reference<any>): number;

declare function embeddedObjectGetWidthCallback(context: interop.Pointer | interop.Reference<any>): number;

declare function getTruncationIndex(line: any, trunc: any): number;
