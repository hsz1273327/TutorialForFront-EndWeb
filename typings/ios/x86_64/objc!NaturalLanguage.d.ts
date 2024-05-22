
declare class NLContextualEmbedding extends NSObject {

	static alloc(): NLContextualEmbedding; // inherited from NSObject

	static contextualEmbeddingWithLanguage(language: string): NLContextualEmbedding;

	static contextualEmbeddingWithModelIdentifier(modelIdentifier: string): NLContextualEmbedding;

	static contextualEmbeddingWithScript(script: string): NLContextualEmbedding;

	static contextualEmbeddingsForValues(valuesDictionary: NSDictionary<string, any>): NSArray<NLContextualEmbedding>;

	static new(): NLContextualEmbedding; // inherited from NSObject

	readonly dimension: number;

	readonly hasAvailableAssets: boolean;

	readonly languages: NSArray<string>;

	readonly maximumSequenceLength: number;

	readonly modelIdentifier: string;

	readonly revision: number;

	readonly scripts: NSArray<string>;

	embeddingResultForStringLanguageError(string: string, language: string): NLContextualEmbeddingResult;

	loadWithError(): boolean;

	requestEmbeddingAssetsWithCompletionHandler(completionHandler: (p1: NLContextualEmbeddingAssetsResult, p2: NSError) => void): void;

	unload(): void;
}

declare const enum NLContextualEmbeddingAssetsResult {

	Available = 0,

	NotAvailable = 1,

	Error = 2
}

declare var NLContextualEmbeddingKeyLanguages: string;

declare var NLContextualEmbeddingKeyRevision: string;

declare var NLContextualEmbeddingKeyScripts: string;

declare class NLContextualEmbeddingResult extends NSObject {

	static alloc(): NLContextualEmbeddingResult; // inherited from NSObject

	static new(): NLContextualEmbeddingResult; // inherited from NSObject

	readonly language: string;

	readonly sequenceLength: number;

	readonly string: string;

	enumerateTokenVectorsInRangeUsingBlock(range: NSRange, block: (p1: NSArray<number>, p2: NSRange, p3: interop.Pointer | interop.Reference<boolean>) => void): void;

	tokenVectorAtIndexTokenRange(characterIndex: number, tokenRange: interop.Pointer | interop.Reference<NSRange>): NSArray<number>;
}

declare const enum NLDistanceType {

	Cosine = 0
}

declare class NLEmbedding extends NSObject {

	static alloc(): NLEmbedding; // inherited from NSObject

	static currentRevisionForLanguage(language: string): number;

	static currentSentenceEmbeddingRevisionForLanguage(language: string): number;

	static embeddingWithContentsOfURLError(url: NSURL): NLEmbedding;

	static new(): NLEmbedding; // inherited from NSObject

	static sentenceEmbeddingForLanguage(language: string): NLEmbedding;

	static sentenceEmbeddingForLanguageRevision(language: string, revision: number): NLEmbedding;

	static supportedRevisionsForLanguage(language: string): NSIndexSet;

	static supportedSentenceEmbeddingRevisionsForLanguage(language: string): NSIndexSet;

	static wordEmbeddingForLanguage(language: string): NLEmbedding;

	static wordEmbeddingForLanguageRevision(language: string, revision: number): NLEmbedding;

	static writeEmbeddingForDictionaryLanguageRevisionToURLError(dictionary: NSDictionary<string, NSArray<number>>, language: string, revision: number, url: NSURL): boolean;

	readonly dimension: number;

	readonly language: string;

	readonly revision: number;

	readonly vocabularySize: number;

	containsString(string: string): boolean;

	distanceBetweenStringAndStringDistanceType(firstString: string, secondString: string, distanceType: NLDistanceType): number;

	enumerateNeighborsForStringMaximumCountDistanceTypeUsingBlock(string: string, maxCount: number, distanceType: NLDistanceType, block: (p1: string, p2: number, p3: interop.Pointer | interop.Reference<boolean>) => void): void;

	enumerateNeighborsForStringMaximumCountMaximumDistanceDistanceTypeUsingBlock(string: string, maxCount: number, maxDistance: number, distanceType: NLDistanceType, block: (p1: string, p2: number, p3: interop.Pointer | interop.Reference<boolean>) => void): void;

	enumerateNeighborsForVectorMaximumCountDistanceTypeUsingBlock(vector: NSArray<number> | number[], maxCount: number, distanceType: NLDistanceType, block: (p1: string, p2: number, p3: interop.Pointer | interop.Reference<boolean>) => void): void;

	enumerateNeighborsForVectorMaximumCountMaximumDistanceDistanceTypeUsingBlock(vector: NSArray<number> | number[], maxCount: number, maxDistance: number, distanceType: NLDistanceType, block: (p1: string, p2: number, p3: interop.Pointer | interop.Reference<boolean>) => void): void;

	getVectorForString(vector: interop.Pointer | interop.Reference<number>, string: string): boolean;

	neighborsForStringMaximumCountDistanceType(string: string, maxCount: number, distanceType: NLDistanceType): NSArray<string>;

	neighborsForStringMaximumCountMaximumDistanceDistanceType(string: string, maxCount: number, maxDistance: number, distanceType: NLDistanceType): NSArray<string>;

	neighborsForVectorMaximumCountDistanceType(vector: NSArray<number> | number[], maxCount: number, distanceType: NLDistanceType): NSArray<string>;

	neighborsForVectorMaximumCountMaximumDistanceDistanceType(vector: NSArray<number> | number[], maxCount: number, maxDistance: number, distanceType: NLDistanceType): NSArray<string>;

	vectorForString(string: string): NSArray<number>;
}

declare class NLGazetteer extends NSObject {

	static alloc(): NLGazetteer; // inherited from NSObject

	static gazetteerWithContentsOfURLError(url: NSURL): NLGazetteer;

	static new(): NLGazetteer; // inherited from NSObject

	static writeGazetteerForDictionaryLanguageToURLError(dictionary: NSDictionary<string, NSArray<string>>, language: string, url: NSURL): boolean;

	readonly data: NSData;

	readonly language: string;

	constructor(o: { contentsOfURL: NSURL; });

	constructor(o: { data: NSData; });

	constructor(o: { dictionary: NSDictionary<string, NSArray<string>>; language: string; });

	initWithContentsOfURLError(url: NSURL): this;

	initWithDataError(data: NSData): this;

	initWithDictionaryLanguageError(dictionary: NSDictionary<string, NSArray<string>>, language: string): this;

	labelForString(string: string): string;
}

declare var NLLanguageAmharic: string;

declare var NLLanguageArabic: string;

declare var NLLanguageArmenian: string;

declare var NLLanguageBengali: string;

declare var NLLanguageBulgarian: string;

declare var NLLanguageBurmese: string;

declare var NLLanguageCatalan: string;

declare var NLLanguageCherokee: string;

declare var NLLanguageCroatian: string;

declare var NLLanguageCzech: string;

declare var NLLanguageDanish: string;

declare var NLLanguageDutch: string;

declare var NLLanguageEnglish: string;

declare var NLLanguageFinnish: string;

declare var NLLanguageFrench: string;

declare var NLLanguageGeorgian: string;

declare var NLLanguageGerman: string;

declare var NLLanguageGreek: string;

declare var NLLanguageGujarati: string;

declare var NLLanguageHebrew: string;

declare var NLLanguageHindi: string;

declare var NLLanguageHungarian: string;

declare var NLLanguageIcelandic: string;

declare var NLLanguageIndonesian: string;

declare var NLLanguageItalian: string;

declare var NLLanguageJapanese: string;

declare var NLLanguageKannada: string;

declare var NLLanguageKazakh: string;

declare var NLLanguageKhmer: string;

declare var NLLanguageKorean: string;

declare var NLLanguageLao: string;

declare var NLLanguageMalay: string;

declare var NLLanguageMalayalam: string;

declare var NLLanguageMarathi: string;

declare var NLLanguageMongolian: string;

declare var NLLanguageNorwegian: string;

declare var NLLanguageOriya: string;

declare var NLLanguagePersian: string;

declare var NLLanguagePolish: string;

declare var NLLanguagePortuguese: string;

declare var NLLanguagePunjabi: string;

declare class NLLanguageRecognizer extends NSObject {

	static alloc(): NLLanguageRecognizer; // inherited from NSObject

	static dominantLanguageForString(string: string): string;

	static new(): NLLanguageRecognizer; // inherited from NSObject

	readonly dominantLanguage: string;

	languageConstraints: NSArray<string>;

	languageHints: NSDictionary<string, number>;

	languageHypothesesWithMaximum(maxHypotheses: number): NSDictionary<string, number>;

	processString(string: string): void;

	reset(): void;
}

declare var NLLanguageRomanian: string;

declare var NLLanguageRussian: string;

declare var NLLanguageSimplifiedChinese: string;

declare var NLLanguageSinhalese: string;

declare var NLLanguageSlovak: string;

declare var NLLanguageSpanish: string;

declare var NLLanguageSwedish: string;

declare var NLLanguageTamil: string;

declare var NLLanguageTelugu: string;

declare var NLLanguageThai: string;

declare var NLLanguageTibetan: string;

declare var NLLanguageTraditionalChinese: string;

declare var NLLanguageTurkish: string;

declare var NLLanguageUkrainian: string;

declare var NLLanguageUndetermined: string;

declare var NLLanguageUrdu: string;

declare var NLLanguageVietnamese: string;

declare class NLModel extends NSObject {

	static alloc(): NLModel; // inherited from NSObject

	static modelWithContentsOfURLError(url: NSURL): NLModel;

	static modelWithMLModelError(mlModel: MLModel): NLModel;

	static new(): NLModel; // inherited from NSObject

	readonly configuration: NLModelConfiguration;

	predictedLabelForString(string: string): string;

	predictedLabelHypothesesForStringMaximumCount(string: string, maximumCount: number): NSDictionary<string, number>;

	predictedLabelHypothesesForTokensMaximumCount(tokens: NSArray<string> | string[], maximumCount: number): NSArray<NSDictionary<string, number>>;

	predictedLabelsForTokens(tokens: NSArray<string> | string[]): NSArray<string>;
}

declare class NLModelConfiguration extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): NLModelConfiguration; // inherited from NSObject

	static currentRevisionForType(type: NLModelType): number;

	static new(): NLModelConfiguration; // inherited from NSObject

	static supportedRevisionsForType(type: NLModelType): NSIndexSet;

	readonly language: string;

	readonly revision: number;

	readonly type: NLModelType;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare const enum NLModelType {

	Classifier = 0,

	Sequence = 1
}

declare var NLScriptArabic: string;

declare var NLScriptArmenian: string;

declare var NLScriptBengali: string;

declare var NLScriptCanadianAboriginalSyllabics: string;

declare var NLScriptCherokee: string;

declare var NLScriptCyrillic: string;

declare var NLScriptDevanagari: string;

declare var NLScriptEthiopic: string;

declare var NLScriptGeorgian: string;

declare var NLScriptGreek: string;

declare var NLScriptGujarati: string;

declare var NLScriptGurmukhi: string;

declare var NLScriptHebrew: string;

declare var NLScriptJapanese: string;

declare var NLScriptKannada: string;

declare var NLScriptKhmer: string;

declare var NLScriptKorean: string;

declare var NLScriptLao: string;

declare var NLScriptLatin: string;

declare var NLScriptMalayalam: string;

declare var NLScriptMongolian: string;

declare var NLScriptMyanmar: string;

declare var NLScriptOriya: string;

declare var NLScriptSimplifiedChinese: string;

declare var NLScriptSinhala: string;

declare var NLScriptTamil: string;

declare var NLScriptTelugu: string;

declare var NLScriptThai: string;

declare var NLScriptTibetan: string;

declare var NLScriptTraditionalChinese: string;

declare var NLScriptUndetermined: string;

declare var NLTagAdjective: string;

declare var NLTagAdverb: string;

declare var NLTagClassifier: string;

declare var NLTagCloseParenthesis: string;

declare var NLTagCloseQuote: string;

declare var NLTagConjunction: string;

declare var NLTagDash: string;

declare var NLTagDeterminer: string;

declare var NLTagIdiom: string;

declare var NLTagInterjection: string;

declare var NLTagNoun: string;

declare var NLTagNumber: string;

declare var NLTagOpenParenthesis: string;

declare var NLTagOpenQuote: string;

declare var NLTagOrganizationName: string;

declare var NLTagOther: string;

declare var NLTagOtherPunctuation: string;

declare var NLTagOtherWhitespace: string;

declare var NLTagOtherWord: string;

declare var NLTagParagraphBreak: string;

declare var NLTagParticle: string;

declare var NLTagPersonalName: string;

declare var NLTagPlaceName: string;

declare var NLTagPreposition: string;

declare var NLTagPronoun: string;

declare var NLTagPunctuation: string;

declare var NLTagSchemeLanguage: string;

declare var NLTagSchemeLemma: string;

declare var NLTagSchemeLexicalClass: string;

declare var NLTagSchemeNameType: string;

declare var NLTagSchemeNameTypeOrLexicalClass: string;

declare var NLTagSchemeScript: string;

declare var NLTagSchemeSentimentScore: string;

declare var NLTagSchemeTokenType: string;

declare var NLTagSentenceTerminator: string;

declare var NLTagVerb: string;

declare var NLTagWhitespace: string;

declare var NLTagWord: string;

declare var NLTagWordJoiner: string;

declare class NLTagger extends NSObject {

	static alloc(): NLTagger; // inherited from NSObject

	static availableTagSchemesForUnitLanguage(unit: NLTokenUnit, language: string): NSArray<string>;

	static new(): NLTagger; // inherited from NSObject

	static requestAssetsForLanguageTagSchemeCompletionHandler(language: string, tagScheme: string, completionHandler: (p1: NLTaggerAssetsResult, p2: NSError) => void): void;

	readonly dominantLanguage: string;

	string: string;

	readonly tagSchemes: NSArray<string>;

	constructor(o: { tagSchemes: NSArray<string> | string[]; });

	enumerateTagsInRangeUnitSchemeOptionsUsingBlock(range: NSRange, unit: NLTokenUnit, scheme: string, options: NLTaggerOptions, block: (p1: string, p2: NSRange, p3: interop.Pointer | interop.Reference<boolean>) => void): void;

	gazetteersForTagScheme(tagScheme: string): NSArray<NLGazetteer>;

	initWithTagSchemes(tagSchemes: NSArray<string> | string[]): this;

	modelsForTagScheme(tagScheme: string): NSArray<NLModel>;

	setGazetteersForTagScheme(gazetteers: NSArray<NLGazetteer> | NLGazetteer[], tagScheme: string): void;

	setLanguageRange(language: string, range: NSRange): void;

	setModelsForTagScheme(models: NSArray<NLModel> | NLModel[], tagScheme: string): void;

	setOrthographyRange(orthography: NSOrthography, range: NSRange): void;

	tagAtIndexUnitSchemeTokenRange(characterIndex: number, unit: NLTokenUnit, scheme: string, tokenRange: interop.Pointer | interop.Reference<NSRange>): string;

	tagHypothesesAtIndexUnitSchemeMaximumCountTokenRange(characterIndex: number, unit: NLTokenUnit, scheme: string, maximumCount: number, tokenRange: interop.Pointer | interop.Reference<NSRange>): NSDictionary<string, number>;

	tagsInRangeUnitSchemeOptionsTokenRanges(range: NSRange, unit: NLTokenUnit, scheme: string, options: NLTaggerOptions, tokenRanges: interop.Pointer | interop.Reference<NSArray<NSValue>>): NSArray<string>;

	tokenRangeAtIndexUnit(characterIndex: number, unit: NLTokenUnit): NSRange;

	tokenRangeForRangeUnit(range: NSRange, unit: NLTokenUnit): NSRange;
}

declare const enum NLTaggerAssetsResult {

	Available = 0,

	NotAvailable = 1,

	Error = 2
}

declare const enum NLTaggerOptions {

	OmitWords = 1,

	OmitPunctuation = 2,

	OmitWhitespace = 4,

	OmitOther = 8,

	JoinNames = 16,

	JoinContractions = 32
}

declare const enum NLTokenUnit {

	Word = 0,

	Sentence = 1,

	Paragraph = 2,

	Document = 3
}

declare class NLTokenizer extends NSObject {

	static alloc(): NLTokenizer; // inherited from NSObject

	static new(): NLTokenizer; // inherited from NSObject

	string: string;

	readonly unit: NLTokenUnit;

	constructor(o: { unit: NLTokenUnit; });

	enumerateTokensInRangeUsingBlock(range: NSRange, block: (p1: NSRange, p2: NLTokenizerAttributes, p3: interop.Pointer | interop.Reference<boolean>) => void): void;

	initWithUnit(unit: NLTokenUnit): this;

	setLanguage(language: string): void;

	tokenRangeAtIndex(characterIndex: number): NSRange;

	tokenRangeForRange(range: NSRange): NSRange;

	tokensForRange(range: NSRange): NSArray<NSValue>;
}

declare const enum NLTokenizerAttributes {

	Numeric = 1,

	Symbolic = 2,

	Emoji = 4
}
