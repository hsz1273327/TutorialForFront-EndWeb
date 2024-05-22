
declare const enum HKActivityMoveMode {

	ActiveEnergy = 1,

	AppleMoveTime = 2
}

declare class HKActivityMoveModeObject extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): HKActivityMoveModeObject; // inherited from NSObject

	static new(): HKActivityMoveModeObject; // inherited from NSObject

	readonly activityMoveMode: HKActivityMoveMode;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare class HKActivitySummary extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): HKActivitySummary; // inherited from NSObject

	static new(): HKActivitySummary; // inherited from NSObject

	activeEnergyBurned: HKQuantity;

	activeEnergyBurnedGoal: HKQuantity;

	activityMoveMode: HKActivityMoveMode;

	appleExerciseTime: HKQuantity;

	appleExerciseTimeGoal: HKQuantity;

	appleMoveTime: HKQuantity;

	appleMoveTimeGoal: HKQuantity;

	appleStandHours: HKQuantity;

	appleStandHoursGoal: HKQuantity;

	exerciseTimeGoal: HKQuantity;

	standHoursGoal: HKQuantity;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	dateComponentsForCalendar(calendar: NSCalendar): NSDateComponents;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare class HKActivitySummaryQuery extends HKQuery {

	static alloc(): HKActivitySummaryQuery; // inherited from NSObject

	static new(): HKActivitySummaryQuery; // inherited from NSObject

	updateHandler: (p1: HKActivitySummaryQuery, p2: NSArray<HKActivitySummary>, p3: NSError) => void;

	constructor(o: { predicate: NSPredicate; resultsHandler: (p1: HKActivitySummaryQuery, p2: NSArray<HKActivitySummary>, p3: NSError) => void; });

	initWithPredicateResultsHandler(predicate: NSPredicate, handler: (p1: HKActivitySummaryQuery, p2: NSArray<HKActivitySummary>, p3: NSError) => void): this;
}

declare class HKActivitySummaryType extends HKObjectType {

	static alloc(): HKActivitySummaryType; // inherited from NSObject

	static new(): HKActivitySummaryType; // inherited from NSObject
}

declare class HKAnchoredObjectQuery extends HKQuery {

	static alloc(): HKAnchoredObjectQuery; // inherited from NSObject

	static new(): HKAnchoredObjectQuery; // inherited from NSObject

	updateHandler: (p1: HKAnchoredObjectQuery, p2: NSArray<HKSample>, p3: NSArray<HKDeletedObject>, p4: HKQueryAnchor, p5: NSError) => void;

	constructor(o: { queryDescriptors: NSArray<HKQueryDescriptor> | HKQueryDescriptor[]; anchor: HKQueryAnchor; limit: number; resultsHandler: (p1: HKAnchoredObjectQuery, p2: NSArray<HKSample>, p3: NSArray<HKDeletedObject>, p4: HKQueryAnchor, p5: NSError) => void; });

	constructor(o: { type: HKSampleType; predicate: NSPredicate; anchor: number; limit: number; completionHandler: (p1: HKAnchoredObjectQuery, p2: NSArray<HKSample>, p3: number, p4: NSError) => void; });

	constructor(o: { type: HKSampleType; predicate: NSPredicate; anchor: HKQueryAnchor; limit: number; resultsHandler: (p1: HKAnchoredObjectQuery, p2: NSArray<HKSample>, p3: NSArray<HKDeletedObject>, p4: HKQueryAnchor, p5: NSError) => void; });

	initWithQueryDescriptorsAnchorLimitResultsHandler(queryDescriptors: NSArray<HKQueryDescriptor> | HKQueryDescriptor[], anchor: HKQueryAnchor, limit: number, handler: (p1: HKAnchoredObjectQuery, p2: NSArray<HKSample>, p3: NSArray<HKDeletedObject>, p4: HKQueryAnchor, p5: NSError) => void): this;

	initWithTypePredicateAnchorLimitCompletionHandler(type: HKSampleType, predicate: NSPredicate, anchor: number, limit: number, handler: (p1: HKAnchoredObjectQuery, p2: NSArray<HKSample>, p3: number, p4: NSError) => void): this;

	initWithTypePredicateAnchorLimitResultsHandler(type: HKSampleType, predicate: NSPredicate, anchor: HKQueryAnchor, limit: number, handler: (p1: HKAnchoredObjectQuery, p2: NSArray<HKSample>, p3: NSArray<HKDeletedObject>, p4: HKQueryAnchor, p5: NSError) => void): this;
}

declare const enum HKAppleECGAlgorithmVersion {

	Version1 = 1,

	Version2 = 2
}

declare const enum HKAppleWalkingSteadinessClassification {

	OK = 1,

	Low = 2,

	VeryLow = 3
}

declare function HKAppleWalkingSteadinessClassificationForQuantity(value: HKQuantity, classificationOut: interop.Pointer | interop.Reference<HKAppleWalkingSteadinessClassification>, errorOut: interop.Pointer | interop.Reference<NSError>): boolean;

declare function HKAppleWalkingSteadinessMaximumQuantityForClassification(classification: HKAppleWalkingSteadinessClassification): HKQuantity;

declare function HKAppleWalkingSteadinessMinimumQuantityForClassification(classification: HKAppleWalkingSteadinessClassification): HKQuantity;

declare class HKAttachment extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): HKAttachment; // inherited from NSObject

	static new(): HKAttachment; // inherited from NSObject

	readonly contentType: UTType;

	readonly creationDate: Date;

	readonly identifier: NSUUID;

	readonly metadata: NSDictionary<string, any>;

	readonly name: string;

	readonly size: number;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare class HKAttachmentStore extends NSObject {

	static alloc(): HKAttachmentStore; // inherited from NSObject

	static new(): HKAttachmentStore; // inherited from NSObject

	constructor(o: { healthStore: HKHealthStore; });

	addAttachmentToObjectNameContentTypeURLMetadataCompletion(object: HKObject, name: string, contentType: UTType, URL: NSURL, metadata: NSDictionary<string, any>, completion: (p1: HKAttachment, p2: NSError) => void): void;

	getAttachmentsForObjectCompletion(object: HKObject, completion: (p1: NSArray<HKAttachment>, p2: NSError) => void): void;

	getDataForAttachmentCompletion(attachment: HKAttachment, completion: (p1: NSData, p2: NSError) => void): NSProgress;

	initWithHealthStore(healthStore: HKHealthStore): this;

	removeAttachmentFromObjectCompletion(attachment: HKAttachment, object: HKObject, completion: (p1: boolean, p2: NSError) => void): void;

	streamDataForAttachmentDataHandler(attachment: HKAttachment, dataHandler: (p1: NSData, p2: NSError, p3: boolean) => void): NSProgress;
}

declare class HKAudiogramSample extends HKSample {

	static alloc(): HKAudiogramSample; // inherited from NSObject

	static audiogramSampleWithSensitivityPointsStartDateEndDateMetadata(sensitivityPoints: NSArray<HKAudiogramSensitivityPoint> | HKAudiogramSensitivityPoint[], startDate: Date, endDate: Date, metadata: NSDictionary<string, any>): HKAudiogramSample;

	static new(): HKAudiogramSample; // inherited from NSObject

	readonly sensitivityPoints: NSArray<HKAudiogramSensitivityPoint>;
}

declare class HKAudiogramSampleType extends HKSampleType {

	static alloc(): HKAudiogramSampleType; // inherited from NSObject

	static new(): HKAudiogramSampleType; // inherited from NSObject
}

declare class HKAudiogramSensitivityPoint extends NSObject {

	static alloc(): HKAudiogramSensitivityPoint; // inherited from NSObject

	static new(): HKAudiogramSensitivityPoint; // inherited from NSObject

	static sensitivityPointWithFrequencyLeftEarSensitivityRightEarSensitivityError(frequency: HKQuantity, leftEarSensitivity: HKQuantity, rightEarSensitivity: HKQuantity): HKAudiogramSensitivityPoint;

	readonly frequency: HKQuantity;

	readonly leftEarSensitivity: HKQuantity;

	readonly rightEarSensitivity: HKQuantity;
}

declare const enum HKAuthorizationRequestStatus {

	Unknown = 0,

	ShouldRequest = 1,

	Unnecessary = 2
}

declare const enum HKAuthorizationStatus {

	NotDetermined = 0,

	SharingDenied = 1,

	SharingAuthorized = 2
}

declare const enum HKBiologicalSex {

	NotSet = 0,

	Female = 1,

	Male = 2,

	Other = 3
}

declare class HKBiologicalSexObject extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): HKBiologicalSexObject; // inherited from NSObject

	static new(): HKBiologicalSexObject; // inherited from NSObject

	readonly biologicalSex: HKBiologicalSex;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare const enum HKBloodGlucoseMealTime {

	Preprandial = 1,

	Postprandial = 2
}

declare const enum HKBloodType {

	NotSet = 0,

	APositive = 1,

	ANegative = 2,

	BPositive = 3,

	BNegative = 4,

	ABPositive = 5,

	ABNegative = 6,

	OPositive = 7,

	ONegative = 8
}

declare class HKBloodTypeObject extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): HKBloodTypeObject; // inherited from NSObject

	static new(): HKBloodTypeObject; // inherited from NSObject

	readonly bloodType: HKBloodType;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare const enum HKBodyTemperatureSensorLocation {

	Other = 0,

	Armpit = 1,

	Body = 2,

	Ear = 3,

	Finger = 4,

	GastroIntestinal = 5,

	Mouth = 6,

	Rectum = 7,

	Toe = 8,

	EarDrum = 9,

	TemporalArtery = 10,

	Forehead = 11
}

declare class HKCDADocument extends NSObject {

	static alloc(): HKCDADocument; // inherited from NSObject

	static new(): HKCDADocument; // inherited from NSObject

	readonly authorName: string;

	readonly custodianName: string;

	readonly documentData: NSData;

	readonly patientName: string;

	readonly title: string;
}

declare class HKCDADocumentSample extends HKDocumentSample {

	static CDADocumentSampleWithDataStartDateEndDateMetadataValidationError(documentData: NSData, startDate: Date, endDate: Date, metadata: NSDictionary<string, any>): HKCDADocumentSample;

	static alloc(): HKCDADocumentSample; // inherited from NSObject

	static new(): HKCDADocumentSample; // inherited from NSObject

	readonly document: HKCDADocument;
}

declare class HKCategorySample extends HKSample {

	static alloc(): HKCategorySample; // inherited from NSObject

	static categorySampleWithTypeValueStartDateEndDate(type: HKCategoryType, value: number, startDate: Date, endDate: Date): HKCategorySample;

	static categorySampleWithTypeValueStartDateEndDateDeviceMetadata(type: HKCategoryType, value: number, startDate: Date, endDate: Date, device: HKDevice, metadata: NSDictionary<string, any>): HKCategorySample;

	static categorySampleWithTypeValueStartDateEndDateMetadata(type: HKCategoryType, value: number, startDate: Date, endDate: Date, metadata: NSDictionary<string, any>): HKCategorySample;

	static new(): HKCategorySample; // inherited from NSObject

	readonly categoryType: HKCategoryType;

	readonly value: number;
}

declare class HKCategoryType extends HKSampleType {

	static alloc(): HKCategoryType; // inherited from NSObject

	static new(): HKCategoryType; // inherited from NSObject
}

declare var HKCategoryTypeIdentifierAbdominalCramps: string;

declare var HKCategoryTypeIdentifierAcne: string;

declare var HKCategoryTypeIdentifierAppetiteChanges: string;

declare var HKCategoryTypeIdentifierAppleStandHour: string;

declare var HKCategoryTypeIdentifierAppleWalkingSteadinessEvent: string;

declare var HKCategoryTypeIdentifierAudioExposureEvent: string;

declare var HKCategoryTypeIdentifierBladderIncontinence: string;

declare var HKCategoryTypeIdentifierBloating: string;

declare var HKCategoryTypeIdentifierBreastPain: string;

declare var HKCategoryTypeIdentifierCervicalMucusQuality: string;

declare var HKCategoryTypeIdentifierChestTightnessOrPain: string;

declare var HKCategoryTypeIdentifierChills: string;

declare var HKCategoryTypeIdentifierConstipation: string;

declare var HKCategoryTypeIdentifierContraceptive: string;

declare var HKCategoryTypeIdentifierCoughing: string;

declare var HKCategoryTypeIdentifierDiarrhea: string;

declare var HKCategoryTypeIdentifierDizziness: string;

declare var HKCategoryTypeIdentifierDrySkin: string;

declare var HKCategoryTypeIdentifierEnvironmentalAudioExposureEvent: string;

declare var HKCategoryTypeIdentifierFainting: string;

declare var HKCategoryTypeIdentifierFatigue: string;

declare var HKCategoryTypeIdentifierFever: string;

declare var HKCategoryTypeIdentifierGeneralizedBodyAche: string;

declare var HKCategoryTypeIdentifierHairLoss: string;

declare var HKCategoryTypeIdentifierHandwashingEvent: string;

declare var HKCategoryTypeIdentifierHeadache: string;

declare var HKCategoryTypeIdentifierHeadphoneAudioExposureEvent: string;

declare var HKCategoryTypeIdentifierHeartburn: string;

declare var HKCategoryTypeIdentifierHighHeartRateEvent: string;

declare var HKCategoryTypeIdentifierHotFlashes: string;

declare var HKCategoryTypeIdentifierInfrequentMenstrualCycles: string;

declare var HKCategoryTypeIdentifierIntermenstrualBleeding: string;

declare var HKCategoryTypeIdentifierIrregularHeartRhythmEvent: string;

declare var HKCategoryTypeIdentifierIrregularMenstrualCycles: string;

declare var HKCategoryTypeIdentifierLactation: string;

declare var HKCategoryTypeIdentifierLossOfSmell: string;

declare var HKCategoryTypeIdentifierLossOfTaste: string;

declare var HKCategoryTypeIdentifierLowCardioFitnessEvent: string;

declare var HKCategoryTypeIdentifierLowHeartRateEvent: string;

declare var HKCategoryTypeIdentifierLowerBackPain: string;

declare var HKCategoryTypeIdentifierMemoryLapse: string;

declare var HKCategoryTypeIdentifierMenstrualFlow: string;

declare var HKCategoryTypeIdentifierMindfulSession: string;

declare var HKCategoryTypeIdentifierMoodChanges: string;

declare var HKCategoryTypeIdentifierNausea: string;

declare var HKCategoryTypeIdentifierNightSweats: string;

declare var HKCategoryTypeIdentifierOvulationTestResult: string;

declare var HKCategoryTypeIdentifierPelvicPain: string;

declare var HKCategoryTypeIdentifierPersistentIntermenstrualBleeding: string;

declare var HKCategoryTypeIdentifierPregnancy: string;

declare var HKCategoryTypeIdentifierPregnancyTestResult: string;

declare var HKCategoryTypeIdentifierProgesteroneTestResult: string;

declare var HKCategoryTypeIdentifierProlongedMenstrualPeriods: string;

declare var HKCategoryTypeIdentifierRapidPoundingOrFlutteringHeartbeat: string;

declare var HKCategoryTypeIdentifierRunnyNose: string;

declare var HKCategoryTypeIdentifierSexualActivity: string;

declare var HKCategoryTypeIdentifierShortnessOfBreath: string;

declare var HKCategoryTypeIdentifierSinusCongestion: string;

declare var HKCategoryTypeIdentifierSkippedHeartbeat: string;

declare var HKCategoryTypeIdentifierSleepAnalysis: string;

declare var HKCategoryTypeIdentifierSleepChanges: string;

declare var HKCategoryTypeIdentifierSoreThroat: string;

declare var HKCategoryTypeIdentifierToothbrushingEvent: string;

declare var HKCategoryTypeIdentifierVaginalDryness: string;

declare var HKCategoryTypeIdentifierVomiting: string;

declare var HKCategoryTypeIdentifierWheezing: string;

declare const enum HKCategoryValue {

	NotApplicable = 0
}

declare const enum HKCategoryValueAppetiteChanges {

	Unspecified = 0,

	NoChange = 1,

	Decreased = 2,

	Increased = 3
}

declare const enum HKCategoryValueAppleStandHour {

	Stood = 0,

	Idle = 1
}

declare const enum HKCategoryValueAppleWalkingSteadinessEvent {

	InitialLow = 1,

	InitialVeryLow = 2,

	RepeatLow = 3,

	RepeatVeryLow = 4
}

declare const enum HKCategoryValueAudioExposureEvent {

	LoudEnvironment = 1
}

declare const enum HKCategoryValueCervicalMucusQuality {

	Dry = 1,

	Sticky = 2,

	Creamy = 3,

	Watery = 4,

	EggWhite = 5
}

declare const enum HKCategoryValueContraceptive {

	Unspecified = 1,

	Implant = 2,

	Injection = 3,

	IntrauterineDevice = 4,

	IntravaginalRing = 5,

	Oral = 6,

	Patch = 7
}

declare const enum HKCategoryValueEnvironmentalAudioExposureEvent {

	MomentaryLimit = 1
}

declare const enum HKCategoryValueHeadphoneAudioExposureEvent {

	SevenDayLimit = 1
}

declare const enum HKCategoryValueLowCardioFitnessEvent {

	LowFitness = 1
}

declare const enum HKCategoryValueMenstrualFlow {

	Unspecified = 1,

	Light = 2,

	Medium = 3,

	Heavy = 4,

	None = 5
}

declare const enum HKCategoryValueOvulationTestResult {

	Negative = 1,

	LuteinizingHormoneSurge = 2,

	Positive = 2,

	Indeterminate = 3,

	EstrogenSurge = 4
}

declare const enum HKCategoryValuePregnancyTestResult {

	Negative = 1,

	Positive = 2,

	Indeterminate = 3
}

declare const enum HKCategoryValuePresence {

	Present = 0,

	NotPresent = 1
}

declare const enum HKCategoryValueProgesteroneTestResult {

	Negative = 1,

	Positive = 2,

	Indeterminate = 3
}

declare const enum HKCategoryValueSeverity {

	Unspecified = 0,

	NotPresent = 1,

	Mild = 2,

	Moderate = 3,

	Severe = 4
}

declare const enum HKCategoryValueSleepAnalysis {

	InBed = 0,

	AsleepUnspecified = 1,

	Asleep = 1,

	Awake = 2,

	AsleepCore = 3,

	AsleepDeep = 4,

	AsleepREM = 5
}

declare function HKCategoryValueSleepAnalysisAsleepValues(): NSSet<number>;

declare class HKCharacteristicType extends HKObjectType {

	static alloc(): HKCharacteristicType; // inherited from NSObject

	static new(): HKCharacteristicType; // inherited from NSObject
}

declare var HKCharacteristicTypeIdentifierActivityMoveMode: string;

declare var HKCharacteristicTypeIdentifierBiologicalSex: string;

declare var HKCharacteristicTypeIdentifierBloodType: string;

declare var HKCharacteristicTypeIdentifierDateOfBirth: string;

declare var HKCharacteristicTypeIdentifierFitzpatrickSkinType: string;

declare var HKCharacteristicTypeIdentifierWheelchairUse: string;

declare class HKClinicalRecord extends HKSample implements NSCopying, NSSecureCoding {

	static alloc(): HKClinicalRecord; // inherited from NSObject

	static new(): HKClinicalRecord; // inherited from NSObject

	readonly FHIRResource: HKFHIRResource;

	readonly clinicalType: HKClinicalType;

	readonly displayName: string;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare class HKClinicalType extends HKSampleType {

	static alloc(): HKClinicalType; // inherited from NSObject

	static new(): HKClinicalType; // inherited from NSObject
}

declare var HKClinicalTypeIdentifierAllergyRecord: string;

declare var HKClinicalTypeIdentifierClinicalNoteRecord: string;

declare var HKClinicalTypeIdentifierConditionRecord: string;

declare var HKClinicalTypeIdentifierCoverageRecord: string;

declare var HKClinicalTypeIdentifierImmunizationRecord: string;

declare var HKClinicalTypeIdentifierLabResultRecord: string;

declare var HKClinicalTypeIdentifierMedicationRecord: string;

declare var HKClinicalTypeIdentifierProcedureRecord: string;

declare var HKClinicalTypeIdentifierVitalSignRecord: string;

declare class HKContactsLensSpecification extends HKLensSpecification implements NSCopying, NSSecureCoding {

	static alloc(): HKContactsLensSpecification; // inherited from NSObject

	static new(): HKContactsLensSpecification; // inherited from NSObject

	readonly baseCurve: HKQuantity;

	readonly diameter: HKQuantity;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	constructor(o: { sphere: HKQuantity; cylinder: HKQuantity; axis: HKQuantity; addPower: HKQuantity; baseCurve: HKQuantity; diameter: HKQuantity; });

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;

	initWithSphereCylinderAxisAddPowerBaseCurveDiameter(sphere: HKQuantity, cylinder: HKQuantity, axis: HKQuantity, addPower: HKQuantity, baseCurve: HKQuantity, diameter: HKQuantity): this;
}

declare class HKContactsPrescription extends HKVisionPrescription implements NSCopying, NSSecureCoding {

	static alloc(): HKContactsPrescription; // inherited from NSObject

	static new(): HKContactsPrescription; // inherited from NSObject

	static prescriptionWithRightEyeSpecificationLeftEyeSpecificationBrandDateIssuedExpirationDateDeviceMetadata(rightEyeSpecification: HKContactsLensSpecification, leftEyeSpecification: HKContactsLensSpecification, brand: string, dateIssued: Date, expirationDate: Date, device: HKDevice, metadata: NSDictionary<string, any>): HKContactsPrescription;

	static prescriptionWithTypeDateIssuedExpirationDateDeviceMetadata(type: HKVisionPrescriptionType, dateIssued: Date, expirationDate: Date, device: HKDevice, metadata: NSDictionary<string, any>): HKContactsPrescription; // inherited from HKVisionPrescription

	readonly brand: string;

	readonly leftEye: HKContactsLensSpecification;

	readonly rightEye: HKContactsLensSpecification;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare class HKCorrelation extends HKSample {

	static alloc(): HKCorrelation; // inherited from NSObject

	static correlationWithTypeStartDateEndDateObjects(correlationType: HKCorrelationType, startDate: Date, endDate: Date, objects: NSSet<HKSample>): HKCorrelation;

	static correlationWithTypeStartDateEndDateObjectsDeviceMetadata(correlationType: HKCorrelationType, startDate: Date, endDate: Date, objects: NSSet<HKSample>, device: HKDevice, metadata: NSDictionary<string, any>): HKCorrelation;

	static correlationWithTypeStartDateEndDateObjectsMetadata(correlationType: HKCorrelationType, startDate: Date, endDate: Date, objects: NSSet<HKSample>, metadata: NSDictionary<string, any>): HKCorrelation;

	static new(): HKCorrelation; // inherited from NSObject

	readonly correlationType: HKCorrelationType;

	readonly objects: NSSet<HKSample>;

	objectsForType(objectType: HKObjectType): NSSet<HKSample>;
}

declare class HKCorrelationQuery extends HKQuery {

	static alloc(): HKCorrelationQuery; // inherited from NSObject

	static new(): HKCorrelationQuery; // inherited from NSObject

	readonly correlationType: HKCorrelationType;

	readonly samplePredicates: NSDictionary<HKSampleType, NSPredicate>;

	constructor(o: { type: HKCorrelationType; predicate: NSPredicate; samplePredicates: NSDictionary<HKSampleType, NSPredicate>; completion: (p1: HKCorrelationQuery, p2: NSArray<HKCorrelation>, p3: NSError) => void; });

	initWithTypePredicateSamplePredicatesCompletion(correlationType: HKCorrelationType, predicate: NSPredicate, samplePredicates: NSDictionary<HKSampleType, NSPredicate>, completion: (p1: HKCorrelationQuery, p2: NSArray<HKCorrelation>, p3: NSError) => void): this;
}

declare class HKCorrelationType extends HKSampleType {

	static alloc(): HKCorrelationType; // inherited from NSObject

	static new(): HKCorrelationType; // inherited from NSObject
}

declare var HKCorrelationTypeIdentifierBloodPressure: string;

declare var HKCorrelationTypeIdentifierFood: string;

declare class HKCumulativeQuantitySample extends HKQuantitySample {

	static alloc(): HKCumulativeQuantitySample; // inherited from NSObject

	static new(): HKCumulativeQuantitySample; // inherited from NSObject

	static quantitySampleWithTypeQuantityStartDateEndDate(quantityType: HKQuantityType, quantity: HKQuantity, startDate: Date, endDate: Date): HKCumulativeQuantitySample; // inherited from HKQuantitySample

	static quantitySampleWithTypeQuantityStartDateEndDateDeviceMetadata(quantityType: HKQuantityType, quantity: HKQuantity, startDate: Date, endDate: Date, device: HKDevice, metadata: NSDictionary<string, any>): HKCumulativeQuantitySample; // inherited from HKQuantitySample

	static quantitySampleWithTypeQuantityStartDateEndDateMetadata(quantityType: HKQuantityType, quantity: HKQuantity, startDate: Date, endDate: Date, metadata: NSDictionary<string, any>): HKCumulativeQuantitySample; // inherited from HKQuantitySample

	readonly sumQuantity: HKQuantity;
}

declare class HKCumulativeQuantitySeriesSample extends HKCumulativeQuantitySample {

	static alloc(): HKCumulativeQuantitySeriesSample; // inherited from NSObject

	static new(): HKCumulativeQuantitySeriesSample; // inherited from NSObject

	static quantitySampleWithTypeQuantityStartDateEndDate(quantityType: HKQuantityType, quantity: HKQuantity, startDate: Date, endDate: Date): HKCumulativeQuantitySeriesSample; // inherited from HKQuantitySample

	static quantitySampleWithTypeQuantityStartDateEndDateDeviceMetadata(quantityType: HKQuantityType, quantity: HKQuantity, startDate: Date, endDate: Date, device: HKDevice, metadata: NSDictionary<string, any>): HKCumulativeQuantitySeriesSample; // inherited from HKQuantitySample

	static quantitySampleWithTypeQuantityStartDateEndDateMetadata(quantityType: HKQuantityType, quantity: HKQuantity, startDate: Date, endDate: Date, metadata: NSDictionary<string, any>): HKCumulativeQuantitySeriesSample; // inherited from HKQuantitySample

	readonly sum: HKQuantity;
}

declare const enum HKCyclingFunctionalThresholdPowerTestType {

	MaxExercise60Minute = 1,

	MaxExercise20Minute = 2,

	RampTest = 3,

	PredictionExercise = 4
}

declare var HKDataTypeIdentifierHeartbeatSeries: string;

declare class HKDeletedObject extends NSObject implements NSSecureCoding {

	static alloc(): HKDeletedObject; // inherited from NSObject

	static new(): HKDeletedObject; // inherited from NSObject

	readonly UUID: NSUUID;

	readonly metadata: NSDictionary<string, any>;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare var HKDetailedCDAValidationErrorKey: string;

declare class HKDevice extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): HKDevice; // inherited from NSObject

	static localDevice(): HKDevice;

	static new(): HKDevice; // inherited from NSObject

	readonly UDIDeviceIdentifier: string;

	readonly firmwareVersion: string;

	readonly hardwareVersion: string;

	readonly localIdentifier: string;

	readonly manufacturer: string;

	readonly model: string;

	readonly name: string;

	readonly softwareVersion: string;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	constructor(o: { name: string; manufacturer: string; model: string; hardwareVersion: string; firmwareVersion: string; softwareVersion: string; localIdentifier: string; UDIDeviceIdentifier: string; });

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;

	initWithNameManufacturerModelHardwareVersionFirmwareVersionSoftwareVersionLocalIdentifierUDIDeviceIdentifier(name: string, manufacturer: string, model: string, hardwareVersion: string, firmwareVersion: string, softwareVersion: string, localIdentifier: string, UDIDeviceIdentifier: string): this;
}

declare const enum HKDevicePlacementSide {

	Unknown = 0,

	Left = 1,

	Right = 2,

	Central = 3
}

declare var HKDevicePropertyKeyFirmwareVersion: string;

declare var HKDevicePropertyKeyHardwareVersion: string;

declare var HKDevicePropertyKeyLocalIdentifier: string;

declare var HKDevicePropertyKeyManufacturer: string;

declare var HKDevicePropertyKeyModel: string;

declare var HKDevicePropertyKeyName: string;

declare var HKDevicePropertyKeySoftwareVersion: string;

declare var HKDevicePropertyKeyUDIDeviceIdentifier: string;

declare class HKDiscreteQuantitySample extends HKQuantitySample {

	static alloc(): HKDiscreteQuantitySample; // inherited from NSObject

	static new(): HKDiscreteQuantitySample; // inherited from NSObject

	static quantitySampleWithTypeQuantityStartDateEndDate(quantityType: HKQuantityType, quantity: HKQuantity, startDate: Date, endDate: Date): HKDiscreteQuantitySample; // inherited from HKQuantitySample

	static quantitySampleWithTypeQuantityStartDateEndDateDeviceMetadata(quantityType: HKQuantityType, quantity: HKQuantity, startDate: Date, endDate: Date, device: HKDevice, metadata: NSDictionary<string, any>): HKDiscreteQuantitySample; // inherited from HKQuantitySample

	static quantitySampleWithTypeQuantityStartDateEndDateMetadata(quantityType: HKQuantityType, quantity: HKQuantity, startDate: Date, endDate: Date, metadata: NSDictionary<string, any>): HKDiscreteQuantitySample; // inherited from HKQuantitySample

	readonly averageQuantity: HKQuantity;

	readonly maximumQuantity: HKQuantity;

	readonly minimumQuantity: HKQuantity;

	readonly mostRecentQuantity: HKQuantity;

	readonly mostRecentQuantityDateInterval: NSDateInterval;
}

declare class HKDocumentQuery extends HKQuery {

	static alloc(): HKDocumentQuery; // inherited from NSObject

	static new(): HKDocumentQuery; // inherited from NSObject

	readonly includeDocumentData: boolean;

	readonly limit: number;

	readonly sortDescriptors: NSArray<NSSortDescriptor>;

	constructor(o: { documentType: HKDocumentType; predicate: NSPredicate; limit: number; sortDescriptors: NSArray<NSSortDescriptor> | NSSortDescriptor[]; includeDocumentData: boolean; resultsHandler: (p1: HKDocumentQuery, p2: NSArray<HKDocumentSample>, p3: boolean, p4: NSError) => void; });

	initWithDocumentTypePredicateLimitSortDescriptorsIncludeDocumentDataResultsHandler(documentType: HKDocumentType, predicate: NSPredicate, limit: number, sortDescriptors: NSArray<NSSortDescriptor> | NSSortDescriptor[], includeDocumentData: boolean, resultsHandler: (p1: HKDocumentQuery, p2: NSArray<HKDocumentSample>, p3: boolean, p4: NSError) => void): this;
}

declare class HKDocumentSample extends HKSample {

	static alloc(): HKDocumentSample; // inherited from NSObject

	static new(): HKDocumentSample; // inherited from NSObject

	readonly documentType: HKDocumentType;
}

declare class HKDocumentType extends HKSampleType {

	static alloc(): HKDocumentType; // inherited from NSObject

	static new(): HKDocumentType; // inherited from NSObject
}

declare var HKDocumentTypeIdentifierCDA: string;

declare class HKElectrocardiogram extends HKSample {

	static alloc(): HKElectrocardiogram; // inherited from NSObject

	static new(): HKElectrocardiogram; // inherited from NSObject

	readonly averageHeartRate: HKQuantity;

	readonly classification: HKElectrocardiogramClassification;

	readonly numberOfVoltageMeasurements: number;

	readonly samplingFrequency: HKQuantity;

	readonly symptomsStatus: HKElectrocardiogramSymptomsStatus;
}

declare const enum HKElectrocardiogramClassification {

	NotSet = 0,

	SinusRhythm = 1,

	AtrialFibrillation = 2,

	InconclusiveLowHeartRate = 3,

	InconclusiveHighHeartRate = 4,

	InconclusivePoorReading = 5,

	InconclusiveOther = 6,

	Unrecognized = 100
}

declare const enum HKElectrocardiogramLead {

	AppleWatchSimilarToLeadI = 1
}

declare class HKElectrocardiogramQuery extends HKQuery {

	static alloc(): HKElectrocardiogramQuery; // inherited from NSObject

	static new(): HKElectrocardiogramQuery; // inherited from NSObject

	constructor(o: { electrocardiogram: HKElectrocardiogram; dataHandler: (p1: HKElectrocardiogramQuery, p2: HKElectrocardiogramVoltageMeasurement, p3: boolean, p4: NSError) => void; });

	initWithElectrocardiogramDataHandler(electrocardiogram: HKElectrocardiogram, dataHandler: (p1: HKElectrocardiogramQuery, p2: HKElectrocardiogramVoltageMeasurement, p3: boolean, p4: NSError) => void): this;
}

declare const enum HKElectrocardiogramSymptomsStatus {

	NotSet = 0,

	None = 1,

	Present = 2
}

declare class HKElectrocardiogramType extends HKSampleType {

	static alloc(): HKElectrocardiogramType; // inherited from NSObject

	static new(): HKElectrocardiogramType; // inherited from NSObject
}

declare class HKElectrocardiogramVoltageMeasurement extends NSObject implements NSCopying {

	static alloc(): HKElectrocardiogramVoltageMeasurement; // inherited from NSObject

	static new(): HKElectrocardiogramVoltageMeasurement; // inherited from NSObject

	readonly timeSinceSampleStart: number;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	quantityForLead(lead: HKElectrocardiogramLead): HKQuantity;
}

declare const enum HKErrorCode {

	UnknownError = 0,

	NoError = 0,

	ErrorHealthDataUnavailable = 1,

	ErrorHealthDataRestricted = 2,

	ErrorInvalidArgument = 3,

	ErrorAuthorizationDenied = 4,

	ErrorAuthorizationNotDetermined = 5,

	ErrorDatabaseInaccessible = 6,

	ErrorUserCanceled = 7,

	ErrorAnotherWorkoutSessionStarted = 8,

	ErrorUserExitedWorkoutSession = 9,

	ErrorRequiredAuthorizationDenied = 10,

	ErrorNoData = 11,

	ErrorWorkoutActivityNotAllowed = 12,

	ErrorDataSizeExceeded = 13,

	ErrorBackgroundWorkoutSessionNotAllowed = 14
}

declare var HKErrorDomain: string;

declare var HKFHIRReleaseDSTU2: string;

declare var HKFHIRReleaseR4: string;

declare var HKFHIRReleaseUnknown: string;

declare class HKFHIRResource extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): HKFHIRResource; // inherited from NSObject

	static new(): HKFHIRResource; // inherited from NSObject

	readonly FHIRVersion: HKFHIRVersion;

	readonly data: NSData;

	readonly identifier: string;

	readonly resourceType: string;

	readonly sourceURL: NSURL;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare var HKFHIRResourceTypeAllergyIntolerance: string;

declare var HKFHIRResourceTypeCondition: string;

declare var HKFHIRResourceTypeCoverage: string;

declare var HKFHIRResourceTypeDiagnosticReport: string;

declare var HKFHIRResourceTypeDocumentReference: string;

declare var HKFHIRResourceTypeImmunization: string;

declare var HKFHIRResourceTypeMedicationDispense: string;

declare var HKFHIRResourceTypeMedicationOrder: string;

declare var HKFHIRResourceTypeMedicationRequest: string;

declare var HKFHIRResourceTypeMedicationStatement: string;

declare var HKFHIRResourceTypeObservation: string;

declare var HKFHIRResourceTypeProcedure: string;

declare class HKFHIRVersion extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): HKFHIRVersion; // inherited from NSObject

	static new(): HKFHIRVersion; // inherited from NSObject

	static primaryDSTU2Version(): HKFHIRVersion;

	static primaryR4Version(): HKFHIRVersion;

	static versionFromVersionStringError(versionString: string): HKFHIRVersion;

	readonly FHIRRelease: string;

	readonly majorVersion: number;

	readonly minorVersion: number;

	readonly patchVersion: number;

	readonly stringRepresentation: string;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare const enum HKFitzpatrickSkinType {

	NotSet = 0,

	I = 1,

	II = 2,

	III = 3,

	IV = 4,

	V = 5,

	VI = 6
}

declare class HKFitzpatrickSkinTypeObject extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): HKFitzpatrickSkinTypeObject; // inherited from NSObject

	static new(): HKFitzpatrickSkinTypeObject; // inherited from NSObject

	readonly skinType: HKFitzpatrickSkinType;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare class HKGlassesLensSpecification extends HKLensSpecification implements NSCopying, NSSecureCoding {

	static alloc(): HKGlassesLensSpecification; // inherited from NSObject

	static new(): HKGlassesLensSpecification; // inherited from NSObject

	readonly farPupillaryDistance: HKQuantity;

	readonly nearPupillaryDistance: HKQuantity;

	readonly prism: HKVisionPrism;

	readonly vertexDistance: HKQuantity;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	constructor(o: { sphere: HKQuantity; cylinder: HKQuantity; axis: HKQuantity; addPower: HKQuantity; vertexDistance: HKQuantity; prism: HKVisionPrism; farPupillaryDistance: HKQuantity; nearPupillaryDistance: HKQuantity; });

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;

	initWithSphereCylinderAxisAddPowerVertexDistancePrismFarPupillaryDistanceNearPupillaryDistance(sphere: HKQuantity, cylinder: HKQuantity, axis: HKQuantity, addPower: HKQuantity, vertexDistance: HKQuantity, prism: HKVisionPrism, farPupillaryDistance: HKQuantity, nearPupillaryDistance: HKQuantity): this;
}

declare class HKGlassesPrescription extends HKVisionPrescription implements NSCopying, NSSecureCoding {

	static alloc(): HKGlassesPrescription; // inherited from NSObject

	static new(): HKGlassesPrescription; // inherited from NSObject

	static prescriptionWithRightEyeSpecificationLeftEyeSpecificationDateIssuedExpirationDateDeviceMetadata(rightEyeSpecification: HKGlassesLensSpecification, leftEyeSpecification: HKGlassesLensSpecification, dateIssued: Date, expirationDate: Date, device: HKDevice, metadata: NSDictionary<string, any>): HKGlassesPrescription;

	static prescriptionWithTypeDateIssuedExpirationDateDeviceMetadata(type: HKVisionPrescriptionType, dateIssued: Date, expirationDate: Date, device: HKDevice, metadata: NSDictionary<string, any>): HKGlassesPrescription; // inherited from HKVisionPrescription

	readonly leftEye: HKGlassesLensSpecification;

	readonly rightEye: HKGlassesLensSpecification;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare class HKHealthStore extends NSObject {

	static alloc(): HKHealthStore; // inherited from NSObject

	static isHealthDataAvailable(): boolean;

	static new(): HKHealthStore; // inherited from NSObject

	authorizationViewControllerPresenter: UIViewController;

	workoutSessionMirroringStartHandler: (p1: HKWorkoutSession) => void;

	activityMoveModeWithError(): HKActivityMoveModeObject;

	addSamplesToWorkoutCompletion(samples: NSArray<HKSample> | HKSample[], workout: HKWorkout, completion: (p1: boolean, p2: NSError) => void): void;

	authorizationStatusForType(type: HKObjectType): HKAuthorizationStatus;

	biologicalSexWithError(): HKBiologicalSexObject;

	bloodTypeWithError(): HKBloodTypeObject;

	dateOfBirthComponentsWithError(): NSDateComponents;

	dateOfBirthWithError(): Date;

	deleteObjectWithCompletion(object: HKObject, completion: (p1: boolean, p2: NSError) => void): void;

	deleteObjectsOfTypePredicateWithCompletion(objectType: HKObjectType, predicate: NSPredicate, completion: (p1: boolean, p2: number, p3: NSError) => void): void;

	deleteObjectsWithCompletion(objects: NSArray<HKObject> | HKObject[], completion: (p1: boolean, p2: NSError) => void): void;

	disableAllBackgroundDeliveryWithCompletion(completion: (p1: boolean, p2: NSError) => void): void;

	disableBackgroundDeliveryForTypeWithCompletion(type: HKObjectType, completion: (p1: boolean, p2: NSError) => void): void;

	earliestPermittedSampleDate(): Date;

	enableBackgroundDeliveryForTypeFrequencyWithCompletion(type: HKObjectType, frequency: HKUpdateFrequency, completion: (p1: boolean, p2: NSError) => void): void;

	executeQuery(query: HKQuery): void;

	fitzpatrickSkinTypeWithError(): HKFitzpatrickSkinTypeObject;

	getRequestStatusForAuthorizationToShareTypesReadTypesCompletion(typesToShare: NSSet<HKSampleType>, typesToRead: NSSet<HKObjectType>, completion: (p1: HKAuthorizationRequestStatus, p2: NSError) => void): void;

	handleAuthorizationForExtensionWithCompletion(completion: (p1: boolean, p2: NSError) => void): void;

	preferredUnitsForQuantityTypesCompletion(quantityTypes: NSSet<HKQuantityType>, completion: (p1: NSDictionary<HKQuantityType, HKUnit>, p2: NSError) => void): void;

	recalibrateEstimatesForSampleTypeAtDateCompletion(sampleType: HKSampleType, date: Date, completion: (p1: boolean, p2: NSError) => void): void;

	requestAuthorizationToShareTypesReadTypesCompletion(typesToShare: NSSet<HKSampleType>, typesToRead: NSSet<HKObjectType>, completion: (p1: boolean, p2: NSError) => void): void;

	requestPerObjectReadAuthorizationForTypePredicateCompletion(objectType: HKObjectType, predicate: NSPredicate, completion: (p1: boolean, p2: NSError) => void): void;

	saveObjectWithCompletion(object: HKObject, completion: (p1: boolean, p2: NSError) => void): void;

	saveObjectsWithCompletion(objects: NSArray<HKObject> | HKObject[], completion: (p1: boolean, p2: NSError) => void): void;

	splitTotalEnergyStartDateEndDateResultsHandler(totalEnergy: HKQuantity, startDate: Date, endDate: Date, resultsHandler: (p1: HKQuantity, p2: HKQuantity, p3: NSError) => void): void;

	startWatchAppWithWorkoutConfigurationCompletion(workoutConfiguration: HKWorkoutConfiguration, completion: (p1: boolean, p2: NSError) => void): void;

	stopQuery(query: HKQuery): void;

	supportsHealthRecords(): boolean;

	wheelchairUseWithError(): HKWheelchairUseObject;
}

declare const enum HKHeartRateMotionContext {

	NotSet = 0,

	Sedentary = 1,

	Active = 2
}

declare const enum HKHeartRateRecoveryTestType {

	MaxExercise = 1,

	PredictionSubMaxExercise = 2,

	PredictionNonExercise = 3
}

declare const enum HKHeartRateSensorLocation {

	Other = 0,

	Chest = 1,

	Wrist = 2,

	Finger = 3,

	Hand = 4,

	EarLobe = 5,

	Foot = 6
}

declare class HKHeartbeatSeriesBuilder extends HKSeriesBuilder {

	static alloc(): HKHeartbeatSeriesBuilder; // inherited from NSObject

	static new(): HKHeartbeatSeriesBuilder; // inherited from NSObject

	static readonly maximumCount: number;

	constructor(o: { healthStore: HKHealthStore; device: HKDevice; startDate: Date; });

	addHeartbeatWithTimeIntervalSinceSeriesStartDatePrecededByGapCompletion(timeIntervalSinceStart: number, precededByGap: boolean, completion: (p1: boolean, p2: NSError) => void): void;

	addMetadataCompletion(metadata: NSDictionary<string, any>, completion: (p1: boolean, p2: NSError) => void): void;

	finishSeriesWithCompletion(completion: (p1: HKHeartbeatSeriesSample, p2: NSError) => void): void;

	initWithHealthStoreDeviceStartDate(healthStore: HKHealthStore, device: HKDevice, startDate: Date): this;
}

declare class HKHeartbeatSeriesQuery extends HKQuery {

	static alloc(): HKHeartbeatSeriesQuery; // inherited from NSObject

	static new(): HKHeartbeatSeriesQuery; // inherited from NSObject

	constructor(o: { heartbeatSeries: HKHeartbeatSeriesSample; dataHandler: (p1: HKHeartbeatSeriesQuery, p2: number, p3: boolean, p4: boolean, p5: NSError) => void; });

	initWithHeartbeatSeriesDataHandler(heartbeatSeries: HKHeartbeatSeriesSample, dataHandler: (p1: HKHeartbeatSeriesQuery, p2: number, p3: boolean, p4: boolean, p5: NSError) => void): this;
}

declare class HKHeartbeatSeriesSample extends HKSeriesSample {

	static alloc(): HKHeartbeatSeriesSample; // inherited from NSObject

	static new(): HKHeartbeatSeriesSample; // inherited from NSObject
}

declare const enum HKInsulinDeliveryReason {

	Basal = 1,

	Bolus = 2
}

declare class HKLensSpecification extends NSObject {

	static alloc(): HKLensSpecification; // inherited from NSObject

	static new(): HKLensSpecification; // inherited from NSObject

	readonly addPower: HKQuantity;

	readonly axis: HKQuantity;

	readonly cylinder: HKQuantity;

	readonly sphere: HKQuantity;
}

declare var HKMetadataKeyActivityType: string;

declare var HKMetadataKeyAlgorithmVersion: string;

declare var HKMetadataKeyAlpineSlopeGrade: string;

declare var HKMetadataKeyAppleDeviceCalibrated: string;

declare var HKMetadataKeyAppleECGAlgorithmVersion: string;

declare var HKMetadataKeyAppleFitnessPlusSession: string;

declare var HKMetadataKeyAudioExposureDuration: string;

declare var HKMetadataKeyAudioExposureLevel: string;

declare var HKMetadataKeyAverageMETs: string;

declare var HKMetadataKeyAverageSpeed: string;

declare var HKMetadataKeyBarometricPressure: string;

declare var HKMetadataKeyBloodGlucoseMealTime: string;

declare var HKMetadataKeyBodyTemperatureSensorLocation: string;

declare var HKMetadataKeyCoachedWorkout: string;

declare var HKMetadataKeyCrossTrainerDistance: string;

declare var HKMetadataKeyCyclingFunctionalThresholdPowerTestType: string;

declare var HKMetadataKeyDateOfEarliestDataUsedForEstimate: string;

declare var HKMetadataKeyDeviceManufacturerName: string;

declare var HKMetadataKeyDeviceName: string;

declare var HKMetadataKeyDevicePlacementSide: string;

declare var HKMetadataKeyDeviceSerialNumber: string;

declare var HKMetadataKeyDigitalSignature: string;

declare var HKMetadataKeyElevationAscended: string;

declare var HKMetadataKeyElevationDescended: string;

declare var HKMetadataKeyExternalUUID: string;

declare var HKMetadataKeyFitnessMachineDuration: string;

declare var HKMetadataKeyFoodType: string;

declare var HKMetadataKeyGlassesPrescriptionDescription: string;

declare var HKMetadataKeyGroupFitness: string;

declare var HKMetadataKeyHeadphoneGain: string;

declare var HKMetadataKeyHeartRateEventThreshold: string;

declare var HKMetadataKeyHeartRateMotionContext: string;

declare var HKMetadataKeyHeartRateRecoveryActivityDuration: string;

declare var HKMetadataKeyHeartRateRecoveryActivityType: string;

declare var HKMetadataKeyHeartRateRecoveryMaxObservedRecoveryHeartRate: string;

declare var HKMetadataKeyHeartRateRecoveryTestType: string;

declare var HKMetadataKeyHeartRateSensorLocation: string;

declare var HKMetadataKeyIndoorBikeDistance: string;

declare var HKMetadataKeyIndoorWorkout: string;

declare var HKMetadataKeyInsulinDeliveryReason: string;

declare var HKMetadataKeyLapLength: string;

declare var HKMetadataKeyLowCardioFitnessEventThreshold: string;

declare var HKMetadataKeyMaximumLightIntensity: string;

declare var HKMetadataKeyMaximumSpeed: string;

declare var HKMetadataKeyMenstrualCycleStart: string;

declare var HKMetadataKeyPhysicalEffortEstimationType: string;

declare var HKMetadataKeyQuantityClampedToLowerBound: string;

declare var HKMetadataKeyQuantityClampedToUpperBound: string;

declare var HKMetadataKeyReferenceRangeLowerLimit: string;

declare var HKMetadataKeyReferenceRangeUpperLimit: string;

declare var HKMetadataKeySWOLFScore: string;

declare var HKMetadataKeySessionEstimate: string;

declare var HKMetadataKeySexualActivityProtectionUsed: string;

declare var HKMetadataKeySwimmingLocationType: string;

declare var HKMetadataKeySwimmingStrokeStyle: string;

declare var HKMetadataKeySyncIdentifier: string;

declare var HKMetadataKeySyncVersion: string;

declare var HKMetadataKeyTimeZone: string;

declare var HKMetadataKeyUDIDeviceIdentifier: string;

declare var HKMetadataKeyUDIProductionIdentifier: string;

declare var HKMetadataKeyUserMotionContext: string;

declare var HKMetadataKeyVO2MaxTestType: string;

declare var HKMetadataKeyVO2MaxValue: string;

declare var HKMetadataKeyWasTakenInLab: string;

declare var HKMetadataKeyWasUserEntered: string;

declare var HKMetadataKeyWaterSalinity: string;

declare var HKMetadataKeyWeatherCondition: string;

declare var HKMetadataKeyWeatherHumidity: string;

declare var HKMetadataKeyWeatherTemperature: string;

declare var HKMetadataKeyWorkoutBrandName: string;

declare const enum HKMetricPrefix {

	None = 0,

	Femto = 13,

	Pico = 1,

	Nano = 2,

	Micro = 3,

	Milli = 4,

	Centi = 5,

	Deci = 6,

	Deca = 7,

	Hecto = 8,

	Kilo = 9,

	Mega = 10,

	Giga = 11,

	Tera = 12
}

declare class HKObject extends NSObject implements NSSecureCoding {

	static alloc(): HKObject; // inherited from NSObject

	static new(): HKObject; // inherited from NSObject

	readonly UUID: NSUUID;

	readonly device: HKDevice;

	readonly metadata: NSDictionary<string, any>;

	readonly source: HKSource;

	readonly sourceRevision: HKSourceRevision;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare var HKObjectQueryNoLimit: number;

declare class HKObjectType extends NSObject implements NSCopying, NSSecureCoding {

	static activitySummaryType(): HKActivitySummaryType;

	static alloc(): HKObjectType; // inherited from NSObject

	static audiogramSampleType(): HKAudiogramSampleType;

	static categoryTypeForIdentifier(identifier: string): HKCategoryType;

	static characteristicTypeForIdentifier(identifier: string): HKCharacteristicType;

	static clinicalTypeForIdentifier(identifier: string): HKClinicalType;

	static correlationTypeForIdentifier(identifier: string): HKCorrelationType;

	static documentTypeForIdentifier(identifier: string): HKDocumentType;

	static electrocardiogramType(): HKElectrocardiogramType;

	static new(): HKObjectType; // inherited from NSObject

	static quantityTypeForIdentifier(identifier: string): HKQuantityType;

	static seriesTypeForIdentifier(identifier: string): HKSeriesType;

	static visionPrescriptionType(): HKPrescriptionType;

	static workoutType(): HKWorkoutType;

	readonly identifier: string;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;

	requiresPerObjectAuthorization(): boolean;
}

declare class HKObserverQuery extends HKQuery {

	static alloc(): HKObserverQuery; // inherited from NSObject

	static new(): HKObserverQuery; // inherited from NSObject

	constructor(o: { queryDescriptors: NSArray<HKQueryDescriptor> | HKQueryDescriptor[]; updateHandler: (p1: HKObserverQuery, p2: NSSet<HKSampleType>, p3: () => void, p4: NSError) => void; });

	constructor(o: { sampleType: HKSampleType; predicate: NSPredicate; updateHandler: (p1: HKObserverQuery, p2: () => void, p3: NSError) => void; });

	initWithQueryDescriptorsUpdateHandler(queryDescriptors: NSArray<HKQueryDescriptor> | HKQueryDescriptor[], updateHandler: (p1: HKObserverQuery, p2: NSSet<HKSampleType>, p3: () => void, p4: NSError) => void): this;

	initWithSampleTypePredicateUpdateHandler(sampleType: HKSampleType, predicate: NSPredicate, updateHandler: (p1: HKObserverQuery, p2: () => void, p3: NSError) => void): this;
}

declare const enum HKPhysicalEffortEstimationType {

	ActivityLookup = 1,

	DeviceSensed = 2
}

declare var HKPredicateKeyPathAverage: string;

declare var HKPredicateKeyPathAverageHeartRate: string;

declare var HKPredicateKeyPathCDAAuthorName: string;

declare var HKPredicateKeyPathCDACustodianName: string;

declare var HKPredicateKeyPathCDAPatientName: string;

declare var HKPredicateKeyPathCDATitle: string;

declare var HKPredicateKeyPathCategoryValue: string;

declare var HKPredicateKeyPathClinicalRecordFHIRResourceIdentifier: string;

declare var HKPredicateKeyPathClinicalRecordFHIRResourceType: string;

declare var HKPredicateKeyPathCorrelation: string;

declare var HKPredicateKeyPathCount: string;

declare var HKPredicateKeyPathDateComponents: string;

declare var HKPredicateKeyPathDevice: string;

declare var HKPredicateKeyPathECGClassification: string;

declare var HKPredicateKeyPathECGSymptomsStatus: string;

declare var HKPredicateKeyPathEndDate: string;

declare var HKPredicateKeyPathMax: string;

declare var HKPredicateKeyPathMetadata: string;

declare var HKPredicateKeyPathMin: string;

declare var HKPredicateKeyPathMostRecent: string;

declare var HKPredicateKeyPathMostRecentDuration: string;

declare var HKPredicateKeyPathMostRecentEndDate: string;

declare var HKPredicateKeyPathMostRecentStartDate: string;

declare var HKPredicateKeyPathQuantity: string;

declare var HKPredicateKeyPathSource: string;

declare var HKPredicateKeyPathSourceRevision: string;

declare var HKPredicateKeyPathStartDate: string;

declare var HKPredicateKeyPathSum: string;

declare var HKPredicateKeyPathUUID: string;

declare var HKPredicateKeyPathWorkout: string;

declare var HKPredicateKeyPathWorkoutActivity: string;

declare var HKPredicateKeyPathWorkoutActivityAverageQuantity: string;

declare var HKPredicateKeyPathWorkoutActivityDuration: string;

declare var HKPredicateKeyPathWorkoutActivityEndDate: string;

declare var HKPredicateKeyPathWorkoutActivityMaximumQuantity: string;

declare var HKPredicateKeyPathWorkoutActivityMinimumQuantity: string;

declare var HKPredicateKeyPathWorkoutActivityStartDate: string;

declare var HKPredicateKeyPathWorkoutActivitySumQuantity: string;

declare var HKPredicateKeyPathWorkoutActivityType: string;

declare var HKPredicateKeyPathWorkoutAverageQuantity: string;

declare var HKPredicateKeyPathWorkoutDuration: string;

declare var HKPredicateKeyPathWorkoutMaximumQuantity: string;

declare var HKPredicateKeyPathWorkoutMinimumQuantity: string;

declare var HKPredicateKeyPathWorkoutSumQuantity: string;

declare var HKPredicateKeyPathWorkoutTotalDistance: string;

declare var HKPredicateKeyPathWorkoutTotalEnergyBurned: string;

declare var HKPredicateKeyPathWorkoutTotalFlightsClimbed: string;

declare var HKPredicateKeyPathWorkoutTotalSwimmingStrokeCount: string;

declare var HKPredicateKeyPathWorkoutType: string;

declare class HKPrescriptionType extends HKSampleType {

	static alloc(): HKPrescriptionType; // inherited from NSObject

	static new(): HKPrescriptionType; // inherited from NSObject
}

declare const enum HKPrismBase {

	None = 0,

	Up = 1,

	Down = 2,

	In = 3,

	Out = 4
}

declare class HKQuantity extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): HKQuantity; // inherited from NSObject

	static new(): HKQuantity; // inherited from NSObject

	static quantityWithUnitDoubleValue(unit: HKUnit, value: number): HKQuantity;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	compare(quantity: HKQuantity): NSComparisonResult;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	doubleValueForUnit(unit: HKUnit): number;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;

	isCompatibleWithUnit(unit: HKUnit): boolean;
}

declare const enum HKQuantityAggregationStyle {

	Cumulative = 0,

	DiscreteArithmetic = 1,

	Discrete = 1,

	DiscreteTemporallyWeighted = 2,

	DiscreteEquivalentContinuousLevel = 3
}

declare class HKQuantitySample extends HKSample {

	static alloc(): HKQuantitySample; // inherited from NSObject

	static new(): HKQuantitySample; // inherited from NSObject

	static quantitySampleWithTypeQuantityStartDateEndDate(quantityType: HKQuantityType, quantity: HKQuantity, startDate: Date, endDate: Date): HKQuantitySample;

	static quantitySampleWithTypeQuantityStartDateEndDateDeviceMetadata(quantityType: HKQuantityType, quantity: HKQuantity, startDate: Date, endDate: Date, device: HKDevice, metadata: NSDictionary<string, any>): HKQuantitySample;

	static quantitySampleWithTypeQuantityStartDateEndDateMetadata(quantityType: HKQuantityType, quantity: HKQuantity, startDate: Date, endDate: Date, metadata: NSDictionary<string, any>): HKQuantitySample;

	readonly count: number;

	readonly quantity: HKQuantity;

	readonly quantityType: HKQuantityType;
}

declare class HKQuantitySeriesSampleBuilder extends NSObject {

	static alloc(): HKQuantitySeriesSampleBuilder; // inherited from NSObject

	static new(): HKQuantitySeriesSampleBuilder; // inherited from NSObject

	readonly device: HKDevice;

	readonly quantityType: HKQuantityType;

	readonly startDate: Date;

	constructor(o: { healthStore: HKHealthStore; quantityType: HKQuantityType; startDate: Date; device: HKDevice; });

	discard(): void;

	finishSeriesWithMetadataCompletion(metadata: NSDictionary<string, any>, completion: (p1: NSArray<HKQuantitySample>, p2: NSError) => void): void;

	finishSeriesWithMetadataEndDateCompletion(metadata: NSDictionary<string, any>, endDate: Date, completion: (p1: NSArray<HKQuantitySample>, p2: NSError) => void): void;

	initWithHealthStoreQuantityTypeStartDateDevice(healthStore: HKHealthStore, quantityType: HKQuantityType, startDate: Date, device: HKDevice): this;

	insertQuantityDateError(quantity: HKQuantity, date: Date): boolean;

	insertQuantityDateIntervalError(quantity: HKQuantity, dateInterval: NSDateInterval): boolean;
}

declare class HKQuantitySeriesSampleQuery extends HKQuery {

	static alloc(): HKQuantitySeriesSampleQuery; // inherited from NSObject

	static new(): HKQuantitySeriesSampleQuery; // inherited from NSObject

	includeSample: boolean;

	orderByQuantitySampleStartDate: boolean;

	constructor(o: { quantityType: HKQuantityType; predicate: NSPredicate; quantityHandler: (p1: HKQuantitySeriesSampleQuery, p2: HKQuantity, p3: NSDateInterval, p4: HKQuantitySample, p5: boolean, p6: NSError) => void; });

	constructor(o: { sample: HKQuantitySample; quantityHandler: (p1: HKQuantitySeriesSampleQuery, p2: HKQuantity, p3: Date, p4: boolean, p5: NSError) => void; });

	initWithQuantityTypePredicateQuantityHandler(quantityType: HKQuantityType, predicate: NSPredicate, quantityHandler: (p1: HKQuantitySeriesSampleQuery, p2: HKQuantity, p3: NSDateInterval, p4: HKQuantitySample, p5: boolean, p6: NSError) => void): this;

	initWithSampleQuantityHandler(quantitySample: HKQuantitySample, quantityHandler: (p1: HKQuantitySeriesSampleQuery, p2: HKQuantity, p3: Date, p4: boolean, p5: NSError) => void): this;
}

declare class HKQuantityType extends HKSampleType {

	static alloc(): HKQuantityType; // inherited from NSObject

	static new(): HKQuantityType; // inherited from NSObject

	readonly aggregationStyle: HKQuantityAggregationStyle;

	isCompatibleWithUnit(unit: HKUnit): boolean;
}

declare var HKQuantityTypeIdentifierActiveEnergyBurned: string;

declare var HKQuantityTypeIdentifierAppleExerciseTime: string;

declare var HKQuantityTypeIdentifierAppleMoveTime: string;

declare var HKQuantityTypeIdentifierAppleSleepingWristTemperature: string;

declare var HKQuantityTypeIdentifierAppleStandTime: string;

declare var HKQuantityTypeIdentifierAppleWalkingSteadiness: string;

declare var HKQuantityTypeIdentifierAtrialFibrillationBurden: string;

declare var HKQuantityTypeIdentifierBasalBodyTemperature: string;

declare var HKQuantityTypeIdentifierBasalEnergyBurned: string;

declare var HKQuantityTypeIdentifierBloodAlcoholContent: string;

declare var HKQuantityTypeIdentifierBloodGlucose: string;

declare var HKQuantityTypeIdentifierBloodPressureDiastolic: string;

declare var HKQuantityTypeIdentifierBloodPressureSystolic: string;

declare var HKQuantityTypeIdentifierBodyFatPercentage: string;

declare var HKQuantityTypeIdentifierBodyMass: string;

declare var HKQuantityTypeIdentifierBodyMassIndex: string;

declare var HKQuantityTypeIdentifierBodyTemperature: string;

declare var HKQuantityTypeIdentifierCyclingCadence: string;

declare var HKQuantityTypeIdentifierCyclingFunctionalThresholdPower: string;

declare var HKQuantityTypeIdentifierCyclingPower: string;

declare var HKQuantityTypeIdentifierCyclingSpeed: string;

declare var HKQuantityTypeIdentifierDietaryBiotin: string;

declare var HKQuantityTypeIdentifierDietaryCaffeine: string;

declare var HKQuantityTypeIdentifierDietaryCalcium: string;

declare var HKQuantityTypeIdentifierDietaryCarbohydrates: string;

declare var HKQuantityTypeIdentifierDietaryChloride: string;

declare var HKQuantityTypeIdentifierDietaryCholesterol: string;

declare var HKQuantityTypeIdentifierDietaryChromium: string;

declare var HKQuantityTypeIdentifierDietaryCopper: string;

declare var HKQuantityTypeIdentifierDietaryEnergyConsumed: string;

declare var HKQuantityTypeIdentifierDietaryFatMonounsaturated: string;

declare var HKQuantityTypeIdentifierDietaryFatPolyunsaturated: string;

declare var HKQuantityTypeIdentifierDietaryFatSaturated: string;

declare var HKQuantityTypeIdentifierDietaryFatTotal: string;

declare var HKQuantityTypeIdentifierDietaryFiber: string;

declare var HKQuantityTypeIdentifierDietaryFolate: string;

declare var HKQuantityTypeIdentifierDietaryIodine: string;

declare var HKQuantityTypeIdentifierDietaryIron: string;

declare var HKQuantityTypeIdentifierDietaryMagnesium: string;

declare var HKQuantityTypeIdentifierDietaryManganese: string;

declare var HKQuantityTypeIdentifierDietaryMolybdenum: string;

declare var HKQuantityTypeIdentifierDietaryNiacin: string;

declare var HKQuantityTypeIdentifierDietaryPantothenicAcid: string;

declare var HKQuantityTypeIdentifierDietaryPhosphorus: string;

declare var HKQuantityTypeIdentifierDietaryPotassium: string;

declare var HKQuantityTypeIdentifierDietaryProtein: string;

declare var HKQuantityTypeIdentifierDietaryRiboflavin: string;

declare var HKQuantityTypeIdentifierDietarySelenium: string;

declare var HKQuantityTypeIdentifierDietarySodium: string;

declare var HKQuantityTypeIdentifierDietarySugar: string;

declare var HKQuantityTypeIdentifierDietaryThiamin: string;

declare var HKQuantityTypeIdentifierDietaryVitaminA: string;

declare var HKQuantityTypeIdentifierDietaryVitaminB12: string;

declare var HKQuantityTypeIdentifierDietaryVitaminB6: string;

declare var HKQuantityTypeIdentifierDietaryVitaminC: string;

declare var HKQuantityTypeIdentifierDietaryVitaminD: string;

declare var HKQuantityTypeIdentifierDietaryVitaminE: string;

declare var HKQuantityTypeIdentifierDietaryVitaminK: string;

declare var HKQuantityTypeIdentifierDietaryWater: string;

declare var HKQuantityTypeIdentifierDietaryZinc: string;

declare var HKQuantityTypeIdentifierDistanceCycling: string;

declare var HKQuantityTypeIdentifierDistanceDownhillSnowSports: string;

declare var HKQuantityTypeIdentifierDistanceSwimming: string;

declare var HKQuantityTypeIdentifierDistanceWalkingRunning: string;

declare var HKQuantityTypeIdentifierDistanceWheelchair: string;

declare var HKQuantityTypeIdentifierElectrodermalActivity: string;

declare var HKQuantityTypeIdentifierEnvironmentalAudioExposure: string;

declare var HKQuantityTypeIdentifierEnvironmentalSoundReduction: string;

declare var HKQuantityTypeIdentifierFlightsClimbed: string;

declare var HKQuantityTypeIdentifierForcedExpiratoryVolume1: string;

declare var HKQuantityTypeIdentifierForcedVitalCapacity: string;

declare var HKQuantityTypeIdentifierHeadphoneAudioExposure: string;

declare var HKQuantityTypeIdentifierHeartRate: string;

declare var HKQuantityTypeIdentifierHeartRateRecoveryOneMinute: string;

declare var HKQuantityTypeIdentifierHeartRateVariabilitySDNN: string;

declare var HKQuantityTypeIdentifierHeight: string;

declare var HKQuantityTypeIdentifierInhalerUsage: string;

declare var HKQuantityTypeIdentifierInsulinDelivery: string;

declare var HKQuantityTypeIdentifierLeanBodyMass: string;

declare var HKQuantityTypeIdentifierNikeFuel: string;

declare var HKQuantityTypeIdentifierNumberOfAlcoholicBeverages: string;

declare var HKQuantityTypeIdentifierNumberOfTimesFallen: string;

declare var HKQuantityTypeIdentifierOxygenSaturation: string;

declare var HKQuantityTypeIdentifierPeakExpiratoryFlowRate: string;

declare var HKQuantityTypeIdentifierPeripheralPerfusionIndex: string;

declare var HKQuantityTypeIdentifierPhysicalEffort: string;

declare var HKQuantityTypeIdentifierPushCount: string;

declare var HKQuantityTypeIdentifierRespiratoryRate: string;

declare var HKQuantityTypeIdentifierRestingHeartRate: string;

declare var HKQuantityTypeIdentifierRunningGroundContactTime: string;

declare var HKQuantityTypeIdentifierRunningPower: string;

declare var HKQuantityTypeIdentifierRunningSpeed: string;

declare var HKQuantityTypeIdentifierRunningStrideLength: string;

declare var HKQuantityTypeIdentifierRunningVerticalOscillation: string;

declare var HKQuantityTypeIdentifierSixMinuteWalkTestDistance: string;

declare var HKQuantityTypeIdentifierStairAscentSpeed: string;

declare var HKQuantityTypeIdentifierStairDescentSpeed: string;

declare var HKQuantityTypeIdentifierStepCount: string;

declare var HKQuantityTypeIdentifierSwimmingStrokeCount: string;

declare var HKQuantityTypeIdentifierTimeInDaylight: string;

declare var HKQuantityTypeIdentifierUVExposure: string;

declare var HKQuantityTypeIdentifierUnderwaterDepth: string;

declare var HKQuantityTypeIdentifierVO2Max: string;

declare var HKQuantityTypeIdentifierWaistCircumference: string;

declare var HKQuantityTypeIdentifierWalkingAsymmetryPercentage: string;

declare var HKQuantityTypeIdentifierWalkingDoubleSupportPercentage: string;

declare var HKQuantityTypeIdentifierWalkingHeartRateAverage: string;

declare var HKQuantityTypeIdentifierWalkingSpeed: string;

declare var HKQuantityTypeIdentifierWalkingStepLength: string;

declare var HKQuantityTypeIdentifierWaterTemperature: string;

declare class HKQuery extends NSObject {

	static alloc(): HKQuery; // inherited from NSObject

	static new(): HKQuery; // inherited from NSObject

	static predicateForActivitySummariesBetweenStartDateComponentsEndDateComponents(startDateComponents: NSDateComponents, endDateComponents: NSDateComponents): NSPredicate;

	static predicateForActivitySummaryWithDateComponents(dateComponents: NSDateComponents): NSPredicate;

	static predicateForCategorySamplesEqualToValues(values: NSSet<number>): NSPredicate;

	static predicateForCategorySamplesWithOperatorTypeValue(operatorType: NSPredicateOperatorType, value: number): NSPredicate;

	static predicateForClinicalRecordsFromSourceFHIRResourceTypeIdentifier(source: HKSource, resourceType: string, identifier: string): NSPredicate;

	static predicateForClinicalRecordsWithFHIRResourceType(resourceType: string): NSPredicate;

	static predicateForElectrocardiogramsWithClassification(classification: HKElectrocardiogramClassification): NSPredicate;

	static predicateForElectrocardiogramsWithSymptomsStatus(symptomsStatus: HKElectrocardiogramSymptomsStatus): NSPredicate;

	static predicateForObjectWithUUID(UUID: NSUUID): NSPredicate;

	static predicateForObjectsAssociatedWithElectrocardiogram(electrocardiogram: HKElectrocardiogram): NSPredicate;

	static predicateForObjectsFromDevices(devices: NSSet<HKDevice>): NSPredicate;

	static predicateForObjectsFromSource(source: HKSource): NSPredicate;

	static predicateForObjectsFromSourceRevisions(sourceRevisions: NSSet<HKSourceRevision>): NSPredicate;

	static predicateForObjectsFromSources(sources: NSSet<HKSource>): NSPredicate;

	static predicateForObjectsFromWorkout(workout: HKWorkout): NSPredicate;

	static predicateForObjectsWithDevicePropertyAllowedValues(key: string, allowedValues: NSSet<string>): NSPredicate;

	static predicateForObjectsWithMetadataKey(key: string): NSPredicate;

	static predicateForObjectsWithMetadataKeyAllowedValues(key: string, allowedValues: NSArray<any> | any[]): NSPredicate;

	static predicateForObjectsWithMetadataKeyOperatorTypeValue(key: string, operatorType: NSPredicateOperatorType, value: any): NSPredicate;

	static predicateForObjectsWithNoCorrelation(): NSPredicate;

	static predicateForObjectsWithUUIDs(UUIDs: NSSet<NSUUID>): NSPredicate;

	static predicateForQuantitySamplesWithOperatorTypeQuantity(operatorType: NSPredicateOperatorType, quantity: HKQuantity): NSPredicate;

	static predicateForSamplesWithStartDateEndDateOptions(startDate: Date, endDate: Date, options: HKQueryOptions): NSPredicate;

	static predicateForVerifiableClinicalRecordsWithRelevantDateWithinDateInterval(dateInterval: NSDateInterval): NSPredicate;

	static predicateForWorkoutActivitiesWithOperatorTypeDuration(operatorType: NSPredicateOperatorType, duration: number): NSPredicate;

	static predicateForWorkoutActivitiesWithOperatorTypeQuantityTypeAverageQuantity(operatorType: NSPredicateOperatorType, quantityType: HKQuantityType, averageQuantity: HKQuantity): NSPredicate;

	static predicateForWorkoutActivitiesWithOperatorTypeQuantityTypeMaximumQuantity(operatorType: NSPredicateOperatorType, quantityType: HKQuantityType, maximumQuantity: HKQuantity): NSPredicate;

	static predicateForWorkoutActivitiesWithOperatorTypeQuantityTypeMinimumQuantity(operatorType: NSPredicateOperatorType, quantityType: HKQuantityType, minimumQuantity: HKQuantity): NSPredicate;

	static predicateForWorkoutActivitiesWithOperatorTypeQuantityTypeSumQuantity(operatorType: NSPredicateOperatorType, quantityType: HKQuantityType, sumQuantity: HKQuantity): NSPredicate;

	static predicateForWorkoutActivitiesWithStartDateEndDateOptions(startDate: Date, endDate: Date, options: HKQueryOptions): NSPredicate;

	static predicateForWorkoutActivitiesWithWorkoutActivityType(workoutActivityType: HKWorkoutActivityType): NSPredicate;

	static predicateForWorkoutsWithActivityPredicate(activityPredicate: NSPredicate): NSPredicate;

	static predicateForWorkoutsWithOperatorTypeDuration(operatorType: NSPredicateOperatorType, duration: number): NSPredicate;

	static predicateForWorkoutsWithOperatorTypeQuantityTypeAverageQuantity(operatorType: NSPredicateOperatorType, quantityType: HKQuantityType, averageQuantity: HKQuantity): NSPredicate;

	static predicateForWorkoutsWithOperatorTypeQuantityTypeMaximumQuantity(operatorType: NSPredicateOperatorType, quantityType: HKQuantityType, maximumQuantity: HKQuantity): NSPredicate;

	static predicateForWorkoutsWithOperatorTypeQuantityTypeMinimumQuantity(operatorType: NSPredicateOperatorType, quantityType: HKQuantityType, minimumQuantity: HKQuantity): NSPredicate;

	static predicateForWorkoutsWithOperatorTypeQuantityTypeSumQuantity(operatorType: NSPredicateOperatorType, quantityType: HKQuantityType, sumQuantity: HKQuantity): NSPredicate;

	static predicateForWorkoutsWithOperatorTypeTotalDistance(operatorType: NSPredicateOperatorType, totalDistance: HKQuantity): NSPredicate;

	static predicateForWorkoutsWithOperatorTypeTotalEnergyBurned(operatorType: NSPredicateOperatorType, totalEnergyBurned: HKQuantity): NSPredicate;

	static predicateForWorkoutsWithOperatorTypeTotalFlightsClimbed(operatorType: NSPredicateOperatorType, totalFlightsClimbed: HKQuantity): NSPredicate;

	static predicateForWorkoutsWithOperatorTypeTotalSwimmingStrokeCount(operatorType: NSPredicateOperatorType, totalSwimmingStrokeCount: HKQuantity): NSPredicate;

	static predicateForWorkoutsWithWorkoutActivityType(workoutActivityType: HKWorkoutActivityType): NSPredicate;

	readonly objectType: HKObjectType;

	readonly predicate: NSPredicate;

	readonly sampleType: HKSampleType;
}

declare class HKQueryAnchor extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): HKQueryAnchor; // inherited from NSObject

	static anchorFromValue(value: number): HKQueryAnchor;

	static new(): HKQueryAnchor; // inherited from NSObject

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare class HKQueryDescriptor extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): HKQueryDescriptor; // inherited from NSObject

	static new(): HKQueryDescriptor; // inherited from NSObject

	readonly predicate: NSPredicate;

	readonly sampleType: HKSampleType;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	constructor(o: { sampleType: HKSampleType; predicate: NSPredicate; });

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;

	initWithSampleTypePredicate(sampleType: HKSampleType, predicate: NSPredicate): this;
}

declare const enum HKQueryOptions {

	None = 0,

	StrictStartDate = 1,

	StrictEndDate = 2
}

declare class HKSample extends HKObject {

	static alloc(): HKSample; // inherited from NSObject

	static new(): HKSample; // inherited from NSObject

	readonly endDate: Date;

	readonly hasUndeterminedDuration: boolean;

	readonly sampleType: HKSampleType;

	readonly startDate: Date;
}

declare class HKSampleQuery extends HKQuery {

	static alloc(): HKSampleQuery; // inherited from NSObject

	static new(): HKSampleQuery; // inherited from NSObject

	readonly limit: number;

	readonly sortDescriptors: NSArray<NSSortDescriptor>;

	constructor(o: { queryDescriptors: NSArray<HKQueryDescriptor> | HKQueryDescriptor[]; limit: number; resultsHandler: (p1: HKSampleQuery, p2: NSArray<HKSample>, p3: NSError) => void; });

	constructor(o: { queryDescriptors: NSArray<HKQueryDescriptor> | HKQueryDescriptor[]; limit: number; sortDescriptors: NSArray<NSSortDescriptor> | NSSortDescriptor[]; resultsHandler: (p1: HKSampleQuery, p2: NSArray<HKSample>, p3: NSError) => void; });

	constructor(o: { sampleType: HKSampleType; predicate: NSPredicate; limit: number; sortDescriptors: NSArray<NSSortDescriptor> | NSSortDescriptor[]; resultsHandler: (p1: HKSampleQuery, p2: NSArray<HKSample>, p3: NSError) => void; });

	initWithQueryDescriptorsLimitResultsHandler(queryDescriptors: NSArray<HKQueryDescriptor> | HKQueryDescriptor[], limit: number, resultsHandler: (p1: HKSampleQuery, p2: NSArray<HKSample>, p3: NSError) => void): this;

	initWithQueryDescriptorsLimitSortDescriptorsResultsHandler(queryDescriptors: NSArray<HKQueryDescriptor> | HKQueryDescriptor[], limit: number, sortDescriptors: NSArray<NSSortDescriptor> | NSSortDescriptor[], resultsHandler: (p1: HKSampleQuery, p2: NSArray<HKSample>, p3: NSError) => void): this;

	initWithSampleTypePredicateLimitSortDescriptorsResultsHandler(sampleType: HKSampleType, predicate: NSPredicate, limit: number, sortDescriptors: NSArray<NSSortDescriptor> | NSSortDescriptor[], resultsHandler: (p1: HKSampleQuery, p2: NSArray<HKSample>, p3: NSError) => void): this;
}

declare var HKSampleSortIdentifierEndDate: string;

declare var HKSampleSortIdentifierStartDate: string;

declare class HKSampleType extends HKObjectType {

	static alloc(): HKSampleType; // inherited from NSObject

	static new(): HKSampleType; // inherited from NSObject

	readonly allowsRecalibrationForEstimates: boolean;

	readonly isMaximumDurationRestricted: boolean;

	readonly isMinimumDurationRestricted: boolean;

	readonly maximumAllowedDuration: number;

	readonly minimumAllowedDuration: number;
}

declare class HKSeriesBuilder extends NSObject {

	static alloc(): HKSeriesBuilder; // inherited from NSObject

	static new(): HKSeriesBuilder; // inherited from NSObject

	discard(): void;
}

declare class HKSeriesSample extends HKSample {

	static alloc(): HKSeriesSample; // inherited from NSObject

	static new(): HKSeriesSample; // inherited from NSObject

	readonly count: number;
}

declare class HKSeriesType extends HKSampleType {

	static alloc(): HKSeriesType; // inherited from NSObject

	static heartbeatSeriesType(): HKSeriesType;

	static new(): HKSeriesType; // inherited from NSObject

	static workoutRouteType(): HKSeriesType;
}

declare class HKSource extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): HKSource; // inherited from NSObject

	static defaultSource(): HKSource;

	static new(): HKSource; // inherited from NSObject

	readonly bundleIdentifier: string;

	readonly name: string;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare class HKSourceQuery extends HKQuery {

	static alloc(): HKSourceQuery; // inherited from NSObject

	static new(): HKSourceQuery; // inherited from NSObject

	constructor(o: { sampleType: HKSampleType; samplePredicate: NSPredicate; completionHandler: (p1: HKSourceQuery, p2: NSSet<HKSource>, p3: NSError) => void; });

	initWithSampleTypeSamplePredicateCompletionHandler(sampleType: HKSampleType, objectPredicate: NSPredicate, completionHandler: (p1: HKSourceQuery, p2: NSSet<HKSource>, p3: NSError) => void): this;
}

declare class HKSourceRevision extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): HKSourceRevision; // inherited from NSObject

	static new(): HKSourceRevision; // inherited from NSObject

	readonly operatingSystemVersion: NSOperatingSystemVersion;

	readonly productType: string;

	readonly source: HKSource;

	readonly version: string;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	constructor(o: { source: HKSource; version: string; });

	constructor(o: { source: HKSource; version: string; productType: string; operatingSystemVersion: NSOperatingSystemVersion; });

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;

	initWithSourceVersion(source: HKSource, version: string): this;

	initWithSourceVersionProductTypeOperatingSystemVersion(source: HKSource, version: string, productType: string, operatingSystemVersion: NSOperatingSystemVersion): this;
}

declare var HKSourceRevisionAnyOperatingSystem: NSOperatingSystemVersion;

declare var HKSourceRevisionAnyProductType: string;

declare var HKSourceRevisionAnyVersion: string;

declare class HKStatistics extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): HKStatistics; // inherited from NSObject

	static new(): HKStatistics; // inherited from NSObject

	readonly endDate: Date;

	readonly quantityType: HKQuantityType;

	readonly sources: NSArray<HKSource>;

	readonly startDate: Date;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	averageQuantity(): HKQuantity;

	averageQuantityForSource(source: HKSource): HKQuantity;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	duration(): HKQuantity;

	durationForSource(source: HKSource): HKQuantity;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;

	maximumQuantity(): HKQuantity;

	maximumQuantityForSource(source: HKSource): HKQuantity;

	minimumQuantity(): HKQuantity;

	minimumQuantityForSource(source: HKSource): HKQuantity;

	mostRecentQuantity(): HKQuantity;

	mostRecentQuantityDateInterval(): NSDateInterval;

	mostRecentQuantityDateIntervalForSource(source: HKSource): NSDateInterval;

	mostRecentQuantityForSource(source: HKSource): HKQuantity;

	sumQuantity(): HKQuantity;

	sumQuantityForSource(source: HKSource): HKQuantity;
}

declare class HKStatisticsCollection extends NSObject {

	static alloc(): HKStatisticsCollection; // inherited from NSObject

	static new(): HKStatisticsCollection; // inherited from NSObject

	enumerateStatisticsFromDateToDateWithBlock(startDate: Date, endDate: Date, block: (p1: HKStatistics, p2: interop.Pointer | interop.Reference<boolean>) => void): void;

	sources(): NSSet<HKSource>;

	statistics(): NSArray<HKStatistics>;

	statisticsForDate(date: Date): HKStatistics;
}

declare class HKStatisticsCollectionQuery extends HKQuery {

	static alloc(): HKStatisticsCollectionQuery; // inherited from NSObject

	static new(): HKStatisticsCollectionQuery; // inherited from NSObject

	readonly anchorDate: Date;

	initialResultsHandler: (p1: HKStatisticsCollectionQuery, p2: HKStatisticsCollection, p3: NSError) => void;

	readonly intervalComponents: NSDateComponents;

	readonly options: HKStatisticsOptions;

	statisticsUpdateHandler: (p1: HKStatisticsCollectionQuery, p2: HKStatistics, p3: HKStatisticsCollection, p4: NSError) => void;

	constructor(o: { quantityType: HKQuantityType; quantitySamplePredicate: NSPredicate; options: HKStatisticsOptions; anchorDate: Date; intervalComponents: NSDateComponents; });

	initWithQuantityTypeQuantitySamplePredicateOptionsAnchorDateIntervalComponents(quantityType: HKQuantityType, quantitySamplePredicate: NSPredicate, options: HKStatisticsOptions, anchorDate: Date, intervalComponents: NSDateComponents): this;
}

declare const enum HKStatisticsOptions {

	None = 0,

	SeparateBySource = 1,

	DiscreteAverage = 2,

	DiscreteMin = 4,

	DiscreteMax = 8,

	CumulativeSum = 16,

	MostRecent = 32,

	DiscreteMostRecent = 32,

	Duration = 64
}

declare class HKStatisticsQuery extends HKQuery {

	static alloc(): HKStatisticsQuery; // inherited from NSObject

	static new(): HKStatisticsQuery; // inherited from NSObject

	constructor(o: { quantityType: HKQuantityType; quantitySamplePredicate: NSPredicate; options: HKStatisticsOptions; completionHandler: (p1: HKStatisticsQuery, p2: HKStatistics, p3: NSError) => void; });

	initWithQuantityTypeQuantitySamplePredicateOptionsCompletionHandler(quantityType: HKQuantityType, quantitySamplePredicate: NSPredicate, options: HKStatisticsOptions, handler: (p1: HKStatisticsQuery, p2: HKStatistics, p3: NSError) => void): this;
}

declare const enum HKSwimmingStrokeStyle {

	Unknown = 0,

	Mixed = 1,

	Freestyle = 2,

	Backstroke = 3,

	Breaststroke = 4,

	Butterfly = 5,

	Kickboard = 6
}

declare class HKUnit extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): HKUnit; // inherited from NSObject

	static atmosphereUnit(): HKUnit;

	static calorieUnit(): HKUnit;

	static centimeterOfWaterUnit(): HKUnit;

	static countUnit(): HKUnit;

	static cupImperialUnit(): HKUnit;

	static cupUSUnit(): HKUnit;

	static dayUnit(): HKUnit;

	static decibelAWeightedSoundPressureLevelUnit(): HKUnit;

	static decibelHearingLevelUnit(): HKUnit;

	static degreeAngleUnit(): HKUnit;

	static degreeCelsiusUnit(): HKUnit;

	static degreeFahrenheitUnit(): HKUnit;

	static diopterUnit(): HKUnit;

	static energyFormatterUnitFromUnit(unit: HKUnit): NSEnergyFormatterUnit;

	static fluidOunceImperialUnit(): HKUnit;

	static fluidOunceUSUnit(): HKUnit;

	static footUnit(): HKUnit;

	static gramUnit(): HKUnit;

	static gramUnitWithMetricPrefix(prefix: HKMetricPrefix): HKUnit;

	static hertzUnit(): HKUnit;

	static hertzUnitWithMetricPrefix(prefix: HKMetricPrefix): HKUnit;

	static hourUnit(): HKUnit;

	static inchUnit(): HKUnit;

	static inchesOfMercuryUnit(): HKUnit;

	static internationalUnit(): HKUnit;

	static jouleUnit(): HKUnit;

	static jouleUnitWithMetricPrefix(prefix: HKMetricPrefix): HKUnit;

	static kelvinUnit(): HKUnit;

	static kilocalorieUnit(): HKUnit;

	static largeCalorieUnit(): HKUnit;

	static lengthFormatterUnitFromUnit(unit: HKUnit): NSLengthFormatterUnit;

	static literUnit(): HKUnit;

	static literUnitWithMetricPrefix(prefix: HKMetricPrefix): HKUnit;

	static luxUnit(): HKUnit;

	static luxUnitWithMetricPrefix(prefix: HKMetricPrefix): HKUnit;

	static massFormatterUnitFromUnit(unit: HKUnit): NSMassFormatterUnit;

	static meterUnit(): HKUnit;

	static meterUnitWithMetricPrefix(prefix: HKMetricPrefix): HKUnit;

	static mileUnit(): HKUnit;

	static millimeterOfMercuryUnit(): HKUnit;

	static minuteUnit(): HKUnit;

	static moleUnitWithMetricPrefixMolarMass(prefix: HKMetricPrefix, gramsPerMole: number): HKUnit;

	static moleUnitWithMolarMass(gramsPerMole: number): HKUnit;

	static new(): HKUnit; // inherited from NSObject

	static ounceUnit(): HKUnit;

	static pascalUnit(): HKUnit;

	static pascalUnitWithMetricPrefix(prefix: HKMetricPrefix): HKUnit;

	static percentUnit(): HKUnit;

	static pintImperialUnit(): HKUnit;

	static pintUSUnit(): HKUnit;

	static poundUnit(): HKUnit;

	static prismDiopterUnit(): HKUnit;

	static radianAngleUnit(): HKUnit;

	static radianAngleUnitWithMetricPrefix(prefix: HKMetricPrefix): HKUnit;

	static secondUnit(): HKUnit;

	static secondUnitWithMetricPrefix(prefix: HKMetricPrefix): HKUnit;

	static siemenUnit(): HKUnit;

	static siemenUnitWithMetricPrefix(prefix: HKMetricPrefix): HKUnit;

	static smallCalorieUnit(): HKUnit;

	static stoneUnit(): HKUnit;

	static unitFromEnergyFormatterUnit(energyFormatterUnit: NSEnergyFormatterUnit): HKUnit;

	static unitFromLengthFormatterUnit(lengthFormatterUnit: NSLengthFormatterUnit): HKUnit;

	static unitFromMassFormatterUnit(massFormatterUnit: NSMassFormatterUnit): HKUnit;

	static unitFromString(string: string): HKUnit;

	static voltUnit(): HKUnit;

	static voltUnitWithMetricPrefix(prefix: HKMetricPrefix): HKUnit;

	static wattUnit(): HKUnit;

	static wattUnitWithMetricPrefix(prefix: HKMetricPrefix): HKUnit;

	static yardUnit(): HKUnit;

	readonly unitString: string;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;

	isNull(): boolean;

	reciprocalUnit(): HKUnit;

	unitDividedByUnit(unit: HKUnit): HKUnit;

	unitMultipliedByUnit(unit: HKUnit): HKUnit;

	unitRaisedToPower(power: number): HKUnit;
}

declare const enum HKUpdateFrequency {

	Immediate = 1,

	Hourly = 2,

	Daily = 3,

	Weekly = 4
}

declare const enum HKUserMotionContext {

	NotSet = 0,

	Stationary = 1,

	Active = 2
}

declare var HKUserPreferencesDidChangeNotification: string;

declare const enum HKVO2MaxTestType {

	MaxExercise = 1,

	PredictionSubMaxExercise = 2,

	PredictionNonExercise = 3
}

declare class HKVerifiableClinicalRecord extends HKSample {

	static alloc(): HKVerifiableClinicalRecord; // inherited from NSObject

	static new(): HKVerifiableClinicalRecord; // inherited from NSObject

	readonly JWSRepresentation: NSData;

	readonly dataRepresentation: NSData;

	readonly expirationDate: Date;

	readonly issuedDate: Date;

	readonly issuerIdentifier: string;

	readonly itemNames: NSArray<string>;

	readonly recordTypes: NSArray<string>;

	readonly relevantDate: Date;

	readonly sourceType: string;

	readonly subject: HKVerifiableClinicalRecordSubject;
}

declare var HKVerifiableClinicalRecordCredentialTypeCOVID19: string;

declare var HKVerifiableClinicalRecordCredentialTypeImmunization: string;

declare var HKVerifiableClinicalRecordCredentialTypeLaboratory: string;

declare var HKVerifiableClinicalRecordCredentialTypeRecovery: string;

declare class HKVerifiableClinicalRecordQuery extends HKQuery {

	static alloc(): HKVerifiableClinicalRecordQuery; // inherited from NSObject

	static new(): HKVerifiableClinicalRecordQuery; // inherited from NSObject

	readonly recordTypes: NSArray<string>;

	readonly sourceTypes: NSArray<string>;

	constructor(o: { recordTypes: NSArray<string> | string[]; predicate: NSPredicate; resultsHandler: (p1: HKVerifiableClinicalRecordQuery, p2: NSArray<HKVerifiableClinicalRecord>, p3: NSError) => void; });

	constructor(o: { recordTypes: NSArray<string> | string[]; sourceTypes: NSArray<string> | string[]; predicate: NSPredicate; resultsHandler: (p1: HKVerifiableClinicalRecordQuery, p2: NSArray<HKVerifiableClinicalRecord>, p3: NSError) => void; });

	initWithRecordTypesPredicateResultsHandler(recordTypes: NSArray<string> | string[], predicate: NSPredicate, resultsHandler: (p1: HKVerifiableClinicalRecordQuery, p2: NSArray<HKVerifiableClinicalRecord>, p3: NSError) => void): this;

	initWithRecordTypesSourceTypesPredicateResultsHandler(recordTypes: NSArray<string> | string[], sourceTypes: NSArray<string> | string[], predicate: NSPredicate, resultsHandler: (p1: HKVerifiableClinicalRecordQuery, p2: NSArray<HKVerifiableClinicalRecord>, p3: NSError) => void): this;
}

declare var HKVerifiableClinicalRecordSourceTypeEUDigitalCOVIDCertificate: string;

declare var HKVerifiableClinicalRecordSourceTypeSMARTHealthCard: string;

declare class HKVerifiableClinicalRecordSubject extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): HKVerifiableClinicalRecordSubject; // inherited from NSObject

	static new(): HKVerifiableClinicalRecordSubject; // inherited from NSObject

	readonly dateOfBirthComponents: NSDateComponents;

	readonly fullName: string;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare const enum HKVisionEye {

	Left = 1,

	Right = 2
}

declare class HKVisionPrescription extends HKSample implements NSCopying, NSSecureCoding {

	static alloc(): HKVisionPrescription; // inherited from NSObject

	static new(): HKVisionPrescription; // inherited from NSObject

	static prescriptionWithTypeDateIssuedExpirationDateDeviceMetadata(type: HKVisionPrescriptionType, dateIssued: Date, expirationDate: Date, device: HKDevice, metadata: NSDictionary<string, any>): HKVisionPrescription;

	readonly dateIssued: Date;

	readonly expirationDate: Date;

	readonly prescriptionType: HKVisionPrescriptionType;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare const enum HKVisionPrescriptionType {

	Glasses = 1,

	Contacts = 2
}

declare var HKVisionPrescriptionTypeIdentifier: string;

declare class HKVisionPrism extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): HKVisionPrism; // inherited from NSObject

	static new(): HKVisionPrism; // inherited from NSObject

	readonly amount: HKQuantity;

	readonly angle: HKQuantity;

	readonly eye: HKVisionEye;

	readonly horizontalAmount: HKQuantity;

	readonly horizontalBase: HKPrismBase;

	readonly verticalAmount: HKQuantity;

	readonly verticalBase: HKPrismBase;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { amount: HKQuantity; angle: HKQuantity; eye: HKVisionEye; });

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	constructor(o: { verticalAmount: HKQuantity; verticalBase: HKPrismBase; horizontalAmount: HKQuantity; horizontalBase: HKPrismBase; eye: HKVisionEye; });

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithAmountAngleEye(amount: HKQuantity, angle: HKQuantity, eye: HKVisionEye): this;

	initWithCoder(coder: NSCoder): this;

	initWithVerticalAmountVerticalBaseHorizontalAmountHorizontalBaseEye(verticalAmount: HKQuantity, verticalBase: HKPrismBase, horizontalAmount: HKQuantity, horizontalBase: HKPrismBase, eye: HKVisionEye): this;
}

declare const enum HKWaterSalinity {

	FreshWater = 1,

	SaltWater = 2
}

declare const enum HKWeatherCondition {

	None = 0,

	Clear = 1,

	Fair = 2,

	PartlyCloudy = 3,

	MostlyCloudy = 4,

	Cloudy = 5,

	Foggy = 6,

	Haze = 7,

	Windy = 8,

	Blustery = 9,

	Smoky = 10,

	Dust = 11,

	Snow = 12,

	Hail = 13,

	Sleet = 14,

	FreezingDrizzle = 15,

	FreezingRain = 16,

	MixedRainAndHail = 17,

	MixedRainAndSnow = 18,

	MixedRainAndSleet = 19,

	MixedSnowAndSleet = 20,

	Drizzle = 21,

	ScatteredShowers = 22,

	Showers = 23,

	Thunderstorms = 24,

	TropicalStorm = 25,

	Hurricane = 26,

	Tornado = 27
}

declare const enum HKWheelchairUse {

	NotSet = 0,

	No = 1,

	Yes = 2
}

declare class HKWheelchairUseObject extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): HKWheelchairUseObject; // inherited from NSObject

	static new(): HKWheelchairUseObject; // inherited from NSObject

	readonly wheelchairUse: HKWheelchairUse;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare class HKWorkout extends HKSample {

	static alloc(): HKWorkout; // inherited from NSObject

	static new(): HKWorkout; // inherited from NSObject

	static workoutWithActivityTypeStartDateEndDate(workoutActivityType: HKWorkoutActivityType, startDate: Date, endDate: Date): HKWorkout;

	static workoutWithActivityTypeStartDateEndDateDurationTotalEnergyBurnedTotalDistanceDeviceMetadata(workoutActivityType: HKWorkoutActivityType, startDate: Date, endDate: Date, duration: number, totalEnergyBurned: HKQuantity, totalDistance: HKQuantity, device: HKDevice, metadata: NSDictionary<string, any>): HKWorkout;

	static workoutWithActivityTypeStartDateEndDateDurationTotalEnergyBurnedTotalDistanceMetadata(workoutActivityType: HKWorkoutActivityType, startDate: Date, endDate: Date, duration: number, totalEnergyBurned: HKQuantity, totalDistance: HKQuantity, metadata: NSDictionary<string, any>): HKWorkout;

	static workoutWithActivityTypeStartDateEndDateWorkoutEventsTotalEnergyBurnedTotalDistanceDeviceMetadata(workoutActivityType: HKWorkoutActivityType, startDate: Date, endDate: Date, workoutEvents: NSArray<HKWorkoutEvent> | HKWorkoutEvent[], totalEnergyBurned: HKQuantity, totalDistance: HKQuantity, device: HKDevice, metadata: NSDictionary<string, any>): HKWorkout;

	static workoutWithActivityTypeStartDateEndDateWorkoutEventsTotalEnergyBurnedTotalDistanceMetadata(workoutActivityType: HKWorkoutActivityType, startDate: Date, endDate: Date, workoutEvents: NSArray<HKWorkoutEvent> | HKWorkoutEvent[], totalEnergyBurned: HKQuantity, totalDistance: HKQuantity, metadata: NSDictionary<string, any>): HKWorkout;

	static workoutWithActivityTypeStartDateEndDateWorkoutEventsTotalEnergyBurnedTotalDistanceTotalFlightsClimbedDeviceMetadata(workoutActivityType: HKWorkoutActivityType, startDate: Date, endDate: Date, workoutEvents: NSArray<HKWorkoutEvent> | HKWorkoutEvent[], totalEnergyBurned: HKQuantity, totalDistance: HKQuantity, totalFlightsClimbed: HKQuantity, device: HKDevice, metadata: NSDictionary<string, any>): HKWorkout;

	static workoutWithActivityTypeStartDateEndDateWorkoutEventsTotalEnergyBurnedTotalDistanceTotalSwimmingStrokeCountDeviceMetadata(workoutActivityType: HKWorkoutActivityType, startDate: Date, endDate: Date, workoutEvents: NSArray<HKWorkoutEvent> | HKWorkoutEvent[], totalEnergyBurned: HKQuantity, totalDistance: HKQuantity, totalSwimmingStrokeCount: HKQuantity, device: HKDevice, metadata: NSDictionary<string, any>): HKWorkout;

	readonly allStatistics: NSDictionary<HKQuantityType, HKStatistics>;

	readonly duration: number;

	readonly totalDistance: HKQuantity;

	readonly totalEnergyBurned: HKQuantity;

	readonly totalFlightsClimbed: HKQuantity;

	readonly totalSwimmingStrokeCount: HKQuantity;

	readonly workoutActivities: NSArray<HKWorkoutActivity>;

	readonly workoutActivityType: HKWorkoutActivityType;

	readonly workoutEvents: NSArray<HKWorkoutEvent>;

	statisticsForType(quantityType: HKQuantityType): HKStatistics;
}

declare class HKWorkoutActivity extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): HKWorkoutActivity; // inherited from NSObject

	static new(): HKWorkoutActivity; // inherited from NSObject

	readonly UUID: NSUUID;

	readonly allStatistics: NSDictionary<HKQuantityType, HKStatistics>;

	readonly duration: number;

	readonly endDate: Date;

	readonly metadata: NSDictionary<string, any>;

	readonly startDate: Date;

	readonly workoutConfiguration: HKWorkoutConfiguration;

	readonly workoutEvents: NSArray<HKWorkoutEvent>;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	constructor(o: { workoutConfiguration: HKWorkoutConfiguration; startDate: Date; endDate: Date; metadata: NSDictionary<string, any>; });

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;

	initWithWorkoutConfigurationStartDateEndDateMetadata(workoutConfiguration: HKWorkoutConfiguration, startDate: Date, endDate: Date, metadata: NSDictionary<string, any>): this;

	statisticsForType(quantityType: HKQuantityType): HKStatistics;
}

declare const enum HKWorkoutActivityType {

	AmericanFootball = 1,

	Archery = 2,

	AustralianFootball = 3,

	Badminton = 4,

	Baseball = 5,

	Basketball = 6,

	Bowling = 7,

	Boxing = 8,

	Climbing = 9,

	Cricket = 10,

	CrossTraining = 11,

	Curling = 12,

	Cycling = 13,

	Dance = 14,

	DanceInspiredTraining = 15,

	Elliptical = 16,

	EquestrianSports = 17,

	Fencing = 18,

	Fishing = 19,

	FunctionalStrengthTraining = 20,

	Golf = 21,

	Gymnastics = 22,

	Handball = 23,

	Hiking = 24,

	Hockey = 25,

	Hunting = 26,

	Lacrosse = 27,

	MartialArts = 28,

	MindAndBody = 29,

	MixedMetabolicCardioTraining = 30,

	PaddleSports = 31,

	Play = 32,

	PreparationAndRecovery = 33,

	Racquetball = 34,

	Rowing = 35,

	Rugby = 36,

	Running = 37,

	Sailing = 38,

	SkatingSports = 39,

	SnowSports = 40,

	Soccer = 41,

	Softball = 42,

	Squash = 43,

	StairClimbing = 44,

	SurfingSports = 45,

	Swimming = 46,

	TableTennis = 47,

	Tennis = 48,

	TrackAndField = 49,

	TraditionalStrengthTraining = 50,

	Volleyball = 51,

	Walking = 52,

	WaterFitness = 53,

	WaterPolo = 54,

	WaterSports = 55,

	Wrestling = 56,

	Yoga = 57,

	Barre = 58,

	CoreTraining = 59,

	CrossCountrySkiing = 60,

	DownhillSkiing = 61,

	Flexibility = 62,

	HighIntensityIntervalTraining = 63,

	JumpRope = 64,

	Kickboxing = 65,

	Pilates = 66,

	Snowboarding = 67,

	Stairs = 68,

	StepTraining = 69,

	WheelchairWalkPace = 70,

	WheelchairRunPace = 71,

	TaiChi = 72,

	MixedCardio = 73,

	HandCycling = 74,

	DiscSports = 75,

	FitnessGaming = 76,

	CardioDance = 77,

	SocialDance = 78,

	Pickleball = 79,

	Cooldown = 80,

	SwimBikeRun = 82,

	Transition = 83,

	UnderwaterDiving = 84,

	Other = 3000
}

declare class HKWorkoutBuilder extends NSObject {

	static alloc(): HKWorkoutBuilder; // inherited from NSObject

	static new(): HKWorkoutBuilder; // inherited from NSObject

	readonly allStatistics: NSDictionary<HKQuantityType, HKStatistics>;

	readonly device: HKDevice;

	readonly endDate: Date;

	readonly metadata: NSDictionary<string, any>;

	readonly startDate: Date;

	readonly workoutActivities: NSArray<HKWorkoutActivity>;

	readonly workoutConfiguration: HKWorkoutConfiguration;

	readonly workoutEvents: NSArray<HKWorkoutEvent>;

	constructor(o: { healthStore: HKHealthStore; configuration: HKWorkoutConfiguration; device: HKDevice; });

	addMetadataCompletion(metadata: NSDictionary<string, any>, completion: (p1: boolean, p2: NSError) => void): void;

	addSamplesCompletion(samples: NSArray<HKSample> | HKSample[], completion: (p1: boolean, p2: NSError) => void): void;

	addWorkoutActivityCompletion(workoutActivity: HKWorkoutActivity, completion: (p1: boolean, p2: NSError) => void): void;

	addWorkoutEventsCompletion(workoutEvents: NSArray<HKWorkoutEvent> | HKWorkoutEvent[], completion: (p1: boolean, p2: NSError) => void): void;

	beginCollectionWithStartDateCompletion(startDate: Date, completion: (p1: boolean, p2: NSError) => void): void;

	discardWorkout(): void;

	elapsedTimeAtDate(date: Date): number;

	endCollectionWithEndDateCompletion(endDate: Date, completion: (p1: boolean, p2: NSError) => void): void;

	finishWorkoutWithCompletion(completion: (p1: HKWorkout, p2: NSError) => void): void;

	initWithHealthStoreConfigurationDevice(healthStore: HKHealthStore, configuration: HKWorkoutConfiguration, device: HKDevice): this;

	seriesBuilderForType(seriesType: HKSeriesType): HKSeriesBuilder;

	statisticsForType(quantityType: HKQuantityType): HKStatistics;

	updateActivityWithUUIDAddMedatataCompletion(UUID: NSUUID, metadata: NSDictionary<string, any>, completion: (p1: boolean, p2: NSError) => void): void;

	updateActivityWithUUIDEndDateCompletion(UUID: NSUUID, endDate: Date, completion: (p1: boolean, p2: NSError) => void): void;
}

declare class HKWorkoutConfiguration extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): HKWorkoutConfiguration; // inherited from NSObject

	static new(): HKWorkoutConfiguration; // inherited from NSObject

	activityType: HKWorkoutActivityType;

	lapLength: HKQuantity;

	locationType: HKWorkoutSessionLocationType;

	swimmingLocationType: HKWorkoutSwimmingLocationType;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare class HKWorkoutEvent extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): HKWorkoutEvent; // inherited from NSObject

	static new(): HKWorkoutEvent; // inherited from NSObject

	static workoutEventWithTypeDate(type: HKWorkoutEventType, date: Date): HKWorkoutEvent;

	static workoutEventWithTypeDateIntervalMetadata(type: HKWorkoutEventType, dateInterval: NSDateInterval, metadata: NSDictionary<string, any>): HKWorkoutEvent;

	static workoutEventWithTypeDateMetadata(type: HKWorkoutEventType, date: Date, metadata: NSDictionary<string, any>): HKWorkoutEvent;

	readonly date: Date;

	readonly dateInterval: NSDateInterval;

	readonly metadata: NSDictionary<string, any>;

	readonly type: HKWorkoutEventType;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare const enum HKWorkoutEventType {

	Pause = 1,

	Resume = 2,

	Lap = 3,

	Marker = 4,

	MotionPaused = 5,

	MotionResumed = 6,

	Segment = 7,

	PauseOrResumeRequest = 8
}

declare class HKWorkoutRoute extends HKSeriesSample {

	static alloc(): HKWorkoutRoute; // inherited from NSObject

	static new(): HKWorkoutRoute; // inherited from NSObject
}

declare class HKWorkoutRouteBuilder extends HKSeriesBuilder {

	static alloc(): HKWorkoutRouteBuilder; // inherited from NSObject

	static new(): HKWorkoutRouteBuilder; // inherited from NSObject

	constructor(o: { healthStore: HKHealthStore; device: HKDevice; });

	addMetadataCompletion(metadata: NSDictionary<string, any>, completion: (p1: boolean, p2: NSError) => void): void;

	finishRouteWithWorkoutMetadataCompletion(workout: HKWorkout, metadata: NSDictionary<string, any>, completion: (p1: HKWorkoutRoute, p2: NSError) => void): void;

	initWithHealthStoreDevice(healthStore: HKHealthStore, device: HKDevice): this;

	insertRouteDataCompletion(routeData: NSArray<CLLocation> | CLLocation[], completion: (p1: boolean, p2: NSError) => void): void;
}

declare class HKWorkoutRouteQuery extends HKQuery {

	static alloc(): HKWorkoutRouteQuery; // inherited from NSObject

	static new(): HKWorkoutRouteQuery; // inherited from NSObject

	constructor(o: { route: HKWorkoutRoute; dataHandler: (p1: HKWorkoutRouteQuery, p2: NSArray<CLLocation>, p3: boolean, p4: NSError) => void; });

	constructor(o: { route: HKWorkoutRoute; dateInterval: NSDateInterval; dataHandler: (p1: HKWorkoutRouteQuery, p2: NSArray<CLLocation>, p3: boolean, p4: NSError) => void; });

	initWithRouteDataHandler(workoutRoute: HKWorkoutRoute, dataHandler: (p1: HKWorkoutRouteQuery, p2: NSArray<CLLocation>, p3: boolean, p4: NSError) => void): this;

	initWithRouteDateIntervalDataHandler(workoutRoute: HKWorkoutRoute, dateInterval: NSDateInterval, dataHandler: (p1: HKWorkoutRouteQuery, p2: NSArray<CLLocation>, p3: boolean, p4: NSError) => void): this;
}

declare var HKWorkoutRouteTypeIdentifier: string;

declare class HKWorkoutSession extends NSObject implements NSSecureCoding {

	static alloc(): HKWorkoutSession; // inherited from NSObject

	static new(): HKWorkoutSession; // inherited from NSObject

	readonly activityType: HKWorkoutActivityType;

	readonly currentActivity: HKWorkoutActivity;

	delegate: HKWorkoutSessionDelegate;

	readonly endDate: Date;

	readonly locationType: HKWorkoutSessionLocationType;

	readonly startDate: Date;

	readonly state: HKWorkoutSessionState;

	readonly type: HKWorkoutSessionType;

	readonly workoutConfiguration: HKWorkoutConfiguration;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	beginNewActivityWithConfigurationDateMetadata(workoutConfiguration: HKWorkoutConfiguration, date: Date, metadata: NSDictionary<string, any>): void;

	encodeWithCoder(coder: NSCoder): void;

	end(): void;

	endCurrentActivityOnDate(date: Date): void;

	initWithCoder(coder: NSCoder): this;

	pause(): void;

	prepare(): void;

	resume(): void;

	sendDataToRemoteWorkoutSessionCompletion(data: NSData, completion: (p1: boolean, p2: NSError) => void): void;

	startActivityWithDate(date: Date): void;

	stopActivityWithDate(date: Date): void;
}

interface HKWorkoutSessionDelegate extends NSObjectProtocol {

	workoutSessionDidBeginActivityWithConfigurationDate?(workoutSession: HKWorkoutSession, workoutConfiguration: HKWorkoutConfiguration, date: Date): void;

	workoutSessionDidChangeToStateFromStateDate(workoutSession: HKWorkoutSession, toState: HKWorkoutSessionState, fromState: HKWorkoutSessionState, date: Date): void;

	workoutSessionDidDisconnectFromRemoteDeviceWithError?(workoutSession: HKWorkoutSession, error: NSError): void;

	workoutSessionDidEndActivityWithConfigurationDate?(workoutSession: HKWorkoutSession, workoutConfiguration: HKWorkoutConfiguration, date: Date): void;

	workoutSessionDidFailWithError(workoutSession: HKWorkoutSession, error: NSError): void;

	workoutSessionDidGenerateEvent?(workoutSession: HKWorkoutSession, event: HKWorkoutEvent): void;

	workoutSessionDidReceiveDataFromRemoteWorkoutSession?(workoutSession: HKWorkoutSession, data: NSArray<NSData> | NSData[]): void;
}
declare var HKWorkoutSessionDelegate: {

	prototype: HKWorkoutSessionDelegate;
};

declare const enum HKWorkoutSessionLocationType {

	Unknown = 1,

	Indoor = 2,

	Outdoor = 3
}

declare const enum HKWorkoutSessionState {

	NotStarted = 1,

	Running = 2,

	Ended = 3,

	Paused = 4,

	Prepared = 5,

	Stopped = 6
}

declare const enum HKWorkoutSessionType {

	Primary = 0,

	Mirrored = 1
}

declare var HKWorkoutSortIdentifierDuration: string;

declare var HKWorkoutSortIdentifierTotalDistance: string;

declare var HKWorkoutSortIdentifierTotalEnergyBurned: string;

declare var HKWorkoutSortIdentifierTotalFlightsClimbed: string;

declare var HKWorkoutSortIdentifierTotalSwimmingStrokeCount: string;

declare const enum HKWorkoutSwimmingLocationType {

	Unknown = 0,

	Pool = 1,

	OpenWater = 2
}

declare class HKWorkoutType extends HKSampleType {

	static alloc(): HKWorkoutType; // inherited from NSObject

	static new(): HKWorkoutType; // inherited from NSObject
}

declare var HKWorkoutTypeIdentifier: string;
