
declare function SRAbsoluteTimeFromCFAbsoluteTime(cf: number): number;

declare function SRAbsoluteTimeFromContinuousTime(cont: number): number;

declare function SRAbsoluteTimeGetCurrent(): number;

declare function SRAbsoluteTimeToCFAbsoluteTime(sr: number): number;

interface SRAmbientLightChromaticity {
	x: number;
	y: number;
}
declare var SRAmbientLightChromaticity: interop.StructType<SRAmbientLightChromaticity>;

declare class SRAmbientLightSample extends NSObject {

	static alloc(): SRAmbientLightSample; // inherited from NSObject

	static new(): SRAmbientLightSample; // inherited from NSObject

	readonly chromaticity: SRAmbientLightChromaticity;

	readonly lux: NSMeasurement<NSUnitIlluminance>;

	readonly placement: SRAmbientLightSensorPlacement;
}

declare const enum SRAmbientLightSensorPlacement {

	Unknown = 0,

	FrontTop = 1,

	FrontBottom = 2,

	FrontRight = 3,

	FrontLeft = 4,

	FrontTopRight = 5,

	FrontTopLeft = 6,

	FrontBottomRight = 7,

	FrontBottomLeft = 8
}

declare class SRApplicationUsage extends NSObject {

	static alloc(): SRApplicationUsage; // inherited from NSObject

	static new(): SRApplicationUsage; // inherited from NSObject

	readonly bundleIdentifier: string;

	readonly relativeStartTime: number;

	readonly reportApplicationIdentifier: string;

	readonly supplementalCategories: NSArray<SRSupplementalCategory>;

	readonly textInputSessions: NSArray<SRTextInputSession>;

	readonly usageTime: number;
}

declare class SRAudioLevel extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): SRAudioLevel; // inherited from NSObject

	static new(): SRAudioLevel; // inherited from NSObject

	readonly loudness: number;

	readonly timeRange: CMTimeRange;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare const enum SRAuthorizationStatus {

	NotDetermined = 0,

	Authorized = 1,

	Denied = 2
}

declare const enum SRCrownOrientation {

	Left = 0,

	Right = 1
}

declare const enum SRDeletionReason {

	UserInitiated = 0,

	LowDiskSpace = 1,

	AgeLimit = 2,

	NoInterestedClients = 3,

	SystemInitiated = 4
}

declare class SRDeletionRecord extends NSObject implements NSSecureCoding {

	static alloc(): SRDeletionRecord; // inherited from NSObject

	static new(): SRDeletionRecord; // inherited from NSObject

	readonly endTime: number;

	readonly reason: SRDeletionReason;

	readonly startTime: number;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare class SRDevice extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): SRDevice; // inherited from NSObject

	static new(): SRDevice; // inherited from NSObject

	readonly model: string;

	readonly name: string;

	readonly productType: string;

	readonly systemName: string;

	readonly systemVersion: string;

	static readonly currentDevice: SRDevice;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare var SRDeviceUsageCategoryBooks: string;

declare var SRDeviceUsageCategoryBusiness: string;

declare var SRDeviceUsageCategoryCatalogs: string;

declare var SRDeviceUsageCategoryDeveloperTools: string;

declare var SRDeviceUsageCategoryEducation: string;

declare var SRDeviceUsageCategoryEntertainment: string;

declare var SRDeviceUsageCategoryFinance: string;

declare var SRDeviceUsageCategoryFoodAndDrink: string;

declare var SRDeviceUsageCategoryGames: string;

declare var SRDeviceUsageCategoryGraphicsAndDesign: string;

declare var SRDeviceUsageCategoryHealthAndFitness: string;

declare var SRDeviceUsageCategoryKids: string;

declare var SRDeviceUsageCategoryLifestyle: string;

declare var SRDeviceUsageCategoryMedical: string;

declare var SRDeviceUsageCategoryMiscellaneous: string;

declare var SRDeviceUsageCategoryMusic: string;

declare var SRDeviceUsageCategoryNavigation: string;

declare var SRDeviceUsageCategoryNews: string;

declare var SRDeviceUsageCategoryNewsstand: string;

declare var SRDeviceUsageCategoryPhotoAndVideo: string;

declare var SRDeviceUsageCategoryProductivity: string;

declare var SRDeviceUsageCategoryReference: string;

declare var SRDeviceUsageCategoryShopping: string;

declare var SRDeviceUsageCategorySocialNetworking: string;

declare var SRDeviceUsageCategorySports: string;

declare var SRDeviceUsageCategoryStickers: string;

declare var SRDeviceUsageCategoryTravel: string;

declare var SRDeviceUsageCategoryUtilities: string;

declare var SRDeviceUsageCategoryWeather: string;

declare class SRDeviceUsageReport extends NSObject {

	static alloc(): SRDeviceUsageReport; // inherited from NSObject

	static new(): SRDeviceUsageReport; // inherited from NSObject

	readonly applicationUsageByCategory: NSDictionary<string, NSArray<SRApplicationUsage>>;

	readonly duration: number;

	readonly notificationUsageByCategory: NSDictionary<string, NSArray<SRNotificationUsage>>;

	readonly totalScreenWakes: number;

	readonly totalUnlockDuration: number;

	readonly totalUnlocks: number;

	readonly version: string;

	readonly webUsageByCategory: NSDictionary<string, NSArray<SRWebUsage>>;
}

declare class SRElectrocardiogramData extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): SRElectrocardiogramData; // inherited from NSObject

	static new(): SRElectrocardiogramData; // inherited from NSObject

	readonly flags: SRElectrocardiogramDataFlags;

	readonly value: NSMeasurement<NSUnitElectricPotentialDifference>;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare const enum SRElectrocardiogramDataFlags {

	None = 0,

	SignalInvalid = 1,

	CrownTouched = 2
}

declare const enum SRElectrocardiogramLead {

	RightArmMinusLeftArm = 1,

	LeftArmMinusRightArm = 2
}

declare class SRElectrocardiogramSample extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): SRElectrocardiogramSample; // inherited from NSObject

	static new(): SRElectrocardiogramSample; // inherited from NSObject

	readonly data: NSArray<SRElectrocardiogramData>;

	readonly date: Date;

	readonly frequency: NSMeasurement<NSUnitFrequency>;

	readonly lead: SRElectrocardiogramLead;

	readonly session: SRElectrocardiogramSession;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare class SRElectrocardiogramSession extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): SRElectrocardiogramSession; // inherited from NSObject

	static new(): SRElectrocardiogramSession; // inherited from NSObject

	readonly identifier: string;

	readonly sessionGuidance: SRElectrocardiogramSessionGuidance;

	readonly state: SRElectrocardiogramSessionState;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare const enum SRElectrocardiogramSessionGuidance {

	Guided = 1,

	Unguided = 2
}

declare const enum SRElectrocardiogramSessionState {

	Begin = 1,

	Active = 2,

	End = 3
}

declare const enum SRErrorCode {

	InvalidEntitlement = 0,

	NoAuthorization = 1,

	DataInaccessible = 2,

	FetchRequestInvalid = 3,

	PromptDeclined = 4
}

declare var SRErrorDomain: string;

declare class SRFaceMetrics extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): SRFaceMetrics; // inherited from NSObject

	static new(): SRFaceMetrics; // inherited from NSObject

	readonly context: SRFaceMetricsContext;

	readonly partialFaceExpressions: NSArray<SRFaceMetricsExpression>;

	readonly sessionIdentifier: string;

	readonly version: string;

	readonly wholeFaceExpressions: NSArray<SRFaceMetricsExpression>;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare const enum SRFaceMetricsContext {

	DeviceUnlock = 1,

	MessagingAppUsage = 2
}

declare class SRFaceMetricsExpression extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): SRFaceMetricsExpression; // inherited from NSObject

	static new(): SRFaceMetricsExpression; // inherited from NSObject

	readonly identifier: string;

	readonly value: number;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare class SRFetchRequest extends NSObject {

	static alloc(): SRFetchRequest; // inherited from NSObject

	static new(): SRFetchRequest; // inherited from NSObject

	device: SRDevice;

	from: number;

	to: number;
}

declare class SRFetchResult<SampleType> extends NSObject implements NSCopying {

	static alloc<SampleType>(): SRFetchResult<SampleType>; // inherited from NSObject

	static new<SampleType>(): SRFetchResult<SampleType>; // inherited from NSObject

	readonly sample: SampleType;

	readonly timestamp: number;

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;
}

declare class SRKeyboardMetrics extends NSObject {

	static alloc(): SRKeyboardMetrics; // inherited from NSObject

	static new(): SRKeyboardMetrics; // inherited from NSObject

	readonly anyTapToCharKey: SRKeyboardProbabilityMetric<NSUnitDuration>;

	readonly anyTapToPlaneChangeKey: SRKeyboardProbabilityMetric<NSUnitDuration>;

	readonly charKeyToAnyTapKey: SRKeyboardProbabilityMetric<NSUnitDuration>;

	readonly charKeyToDelete: SRKeyboardProbabilityMetric<NSUnitDuration>;

	readonly charKeyToPlaneChangeKey: SRKeyboardProbabilityMetric<NSUnitDuration>;

	readonly charKeyToPrediction: SRKeyboardProbabilityMetric<NSUnitDuration>;

	readonly charKeyToSpaceKey: SRKeyboardProbabilityMetric<NSUnitDuration>;

	readonly deleteDownErrorDistance: SRKeyboardProbabilityMetric<NSUnitLength>;

	readonly deleteToCharKey: SRKeyboardProbabilityMetric<NSUnitDuration>;

	readonly deleteToDelete: SRKeyboardProbabilityMetric<NSUnitDuration>;

	readonly deleteToDeletes: NSArray<SRKeyboardProbabilityMetric<NSUnitDuration>>;

	readonly deleteToPath: SRKeyboardProbabilityMetric<NSUnitDuration>;

	readonly deleteToPlaneChangeKey: SRKeyboardProbabilityMetric<NSUnitDuration>;

	readonly deleteToShiftKey: SRKeyboardProbabilityMetric<NSUnitDuration>;

	readonly deleteToSpaceKey: SRKeyboardProbabilityMetric<NSUnitDuration>;

	readonly deleteTouchDownUp: SRKeyboardProbabilityMetric<NSUnitDuration>;

	readonly deleteUpErrorDistance: SRKeyboardProbabilityMetric<NSUnitLength>;

	readonly downErrorDistance: SRKeyboardProbabilityMetric<NSUnitLength>;

	readonly duration: number;

	readonly height: NSMeasurement<NSUnitLength>;

	readonly inputModes: NSArray<string>;

	readonly keyboardIdentifier: string;

	readonly longWordDownErrorDistance: NSArray<SRKeyboardProbabilityMetric<NSUnitLength>>;

	readonly longWordTouchDownDown: NSArray<SRKeyboardProbabilityMetric<NSUnitDuration>>;

	readonly longWordTouchDownUp: NSArray<SRKeyboardProbabilityMetric<NSUnitDuration>>;

	readonly longWordTouchUpDown: NSArray<SRKeyboardProbabilityMetric<NSUnitDuration>>;

	readonly longWordUpErrorDistance: NSArray<SRKeyboardProbabilityMetric<NSUnitLength>>;

	readonly pathErrorDistanceRatio: NSArray<number>;

	readonly pathToDelete: SRKeyboardProbabilityMetric<NSUnitDuration>;

	readonly pathToPath: SRKeyboardProbabilityMetric<NSUnitDuration>;

	readonly pathToSpace: SRKeyboardProbabilityMetric<NSUnitDuration>;

	readonly pathTypingSpeed: number;

	readonly planeChangeKeyToCharKey: SRKeyboardProbabilityMetric<NSUnitDuration>;

	readonly planeChangeToAnyTap: SRKeyboardProbabilityMetric<NSUnitDuration>;

	readonly sessionIdentifiers: NSArray<string>;

	readonly shortWordCharKeyDownErrorDistance: SRKeyboardProbabilityMetric<NSUnitLength>;

	readonly shortWordCharKeyToCharKey: SRKeyboardProbabilityMetric<NSUnitDuration>;

	readonly shortWordCharKeyTouchDownUp: SRKeyboardProbabilityMetric<NSUnitDuration>;

	readonly shortWordCharKeyUpErrorDistance: SRKeyboardProbabilityMetric<NSUnitLength>;

	readonly spaceDownErrorDistance: SRKeyboardProbabilityMetric<NSUnitLength>;

	readonly spaceToCharKey: SRKeyboardProbabilityMetric<NSUnitDuration>;

	readonly spaceToDeleteKey: SRKeyboardProbabilityMetric<NSUnitDuration>;

	readonly spaceToPath: SRKeyboardProbabilityMetric<NSUnitDuration>;

	readonly spaceToPlaneChangeKey: SRKeyboardProbabilityMetric<NSUnitDuration>;

	readonly spaceToPredictionKey: SRKeyboardProbabilityMetric<NSUnitDuration>;

	readonly spaceToShiftKey: SRKeyboardProbabilityMetric<NSUnitDuration>;

	readonly spaceToSpaceKey: SRKeyboardProbabilityMetric<NSUnitDuration>;

	readonly spaceTouchDownUp: SRKeyboardProbabilityMetric<NSUnitDuration>;

	readonly spaceUpErrorDistance: SRKeyboardProbabilityMetric<NSUnitLength>;

	readonly totalAlteredWords: number;

	readonly totalAutoCorrections: number;

	readonly totalDeletes: number;

	readonly totalDrags: number;

	readonly totalEmojis: number;

	readonly totalHitTestCorrections: number;

	readonly totalInsertKeyCorrections: number;

	readonly totalNearKeyCorrections: number;

	readonly totalPathLength: NSMeasurement<NSUnitLength>;

	readonly totalPathPauses: number;

	readonly totalPathTime: number;

	readonly totalPaths: number;

	readonly totalPauses: number;

	readonly totalRetroCorrections: number;

	readonly totalSkipTouchCorrections: number;

	readonly totalSpaceCorrections: number;

	readonly totalSubstitutionCorrections: number;

	readonly totalTaps: number;

	readonly totalTranspositionCorrections: number;

	readonly totalTypingDuration: number;

	readonly totalTypingEpisodes: number;

	readonly totalWords: number;

	readonly touchDownDown: SRKeyboardProbabilityMetric<NSUnitDuration>;

	readonly touchDownUp: SRKeyboardProbabilityMetric<NSUnitDuration>;

	readonly touchUpDown: SRKeyboardProbabilityMetric<NSUnitDuration>;

	readonly typingSpeed: number;

	readonly upErrorDistance: SRKeyboardProbabilityMetric<NSUnitLength>;

	readonly version: string;

	readonly width: NSMeasurement<NSUnitLength>;

	emojiCountForSentimentCategory(category: SRKeyboardMetricsSentimentCategory): number;

	wordCountForSentimentCategory(category: SRKeyboardMetricsSentimentCategory): number;
}

declare const enum SRKeyboardMetricsSentimentCategory {

	Absolutist = 0,

	Down = 1,

	Death = 2,

	Anxiety = 3,

	Anger = 4,

	Health = 5,

	Positive = 6,

	Sad = 7,

	LowEnergy = 8,

	Confused = 9
}

declare class SRKeyboardProbabilityMetric<UnitType> extends NSObject {

	static alloc<UnitType>(): SRKeyboardProbabilityMetric<UnitType>; // inherited from NSObject

	static new<UnitType>(): SRKeyboardProbabilityMetric<UnitType>; // inherited from NSObject

	readonly distributionSampleValues: NSArray<NSMeasurement<UnitType>>;
}

declare const enum SRLocationCategory {

	Unknown = 0,

	Home = 1,

	Work = 2,

	School = 3,

	Gym = 4
}

declare class SRMediaEvent extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): SRMediaEvent; // inherited from NSObject

	static new(): SRMediaEvent; // inherited from NSObject

	readonly eventType: SRMediaEventType;

	readonly mediaIdentifier: string;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare const enum SRMediaEventType {

	OnScreen = 1,

	OffScreen = 2
}

declare class SRMessagesUsageReport extends NSObject {

	static alloc(): SRMessagesUsageReport; // inherited from NSObject

	static new(): SRMessagesUsageReport; // inherited from NSObject

	readonly duration: number;

	readonly totalIncomingMessages: number;

	readonly totalOutgoingMessages: number;

	readonly totalUniqueContacts: number;
}

declare const enum SRNotificationEvent {

	Unknown = 0,

	Received = 1,

	DefaultAction = 2,

	SupplementaryAction = 3,

	Clear = 4,

	NotificationCenterClearAll = 5,

	Removed = 6,

	Hide = 7,

	LongLook = 8,

	Silence = 9,

	AppLaunch = 10,

	Expired = 11,

	BannerPulldown = 12,

	TapCoalesce = 13,

	Deduped = 14,

	DeviceActivated = 15,

	DeviceUnlocked = 16
}

declare class SRNotificationUsage extends NSObject {

	static alloc(): SRNotificationUsage; // inherited from NSObject

	static new(): SRNotificationUsage; // inherited from NSObject

	readonly bundleIdentifier: string;

	readonly event: SRNotificationEvent;
}

declare class SRPhoneUsageReport extends NSObject {

	static alloc(): SRPhoneUsageReport; // inherited from NSObject

	static new(): SRPhoneUsageReport; // inherited from NSObject

	readonly duration: number;

	readonly totalIncomingCalls: number;

	readonly totalOutgoingCalls: number;

	readonly totalPhoneCallDuration: number;

	readonly totalUniqueContacts: number;
}

declare class SRPhotoplethysmogramAccelerometerSample extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): SRPhotoplethysmogramAccelerometerSample; // inherited from NSObject

	static new(): SRPhotoplethysmogramAccelerometerSample; // inherited from NSObject

	readonly nanosecondsSinceStart: number;

	readonly samplingFrequency: NSMeasurement<NSUnitFrequency>;

	readonly x: NSMeasurement<NSUnitAcceleration>;

	readonly y: NSMeasurement<NSUnitAcceleration>;

	readonly z: NSMeasurement<NSUnitAcceleration>;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare class SRPhotoplethysmogramOpticalSample extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): SRPhotoplethysmogramOpticalSample; // inherited from NSObject

	static new(): SRPhotoplethysmogramOpticalSample; // inherited from NSObject

	readonly activePhotodiodeIndexes: NSIndexSet;

	readonly backgroundNoise: number;

	readonly backgroundNoiseOffset: number;

	readonly conditions: NSArray<string>;

	readonly effectiveWavelength: NSMeasurement<NSUnitLength>;

	readonly emitter: number;

	readonly nanosecondsSinceStart: number;

	readonly nominalWavelength: NSMeasurement<NSUnitLength>;

	readonly normalizedReflectance: number;

	readonly pinkNoise: number;

	readonly samplingFrequency: NSMeasurement<NSUnitFrequency>;

	readonly signalIdentifier: number;

	readonly whiteNoise: number;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare var SRPhotoplethysmogramOpticalSampleConditionSignalSaturation: string;

declare var SRPhotoplethysmogramOpticalSampleConditionUnreliableNoise: string;

declare class SRPhotoplethysmogramSample extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): SRPhotoplethysmogramSample; // inherited from NSObject

	static new(): SRPhotoplethysmogramSample; // inherited from NSObject

	readonly accelerometerSamples: NSArray<SRPhotoplethysmogramAccelerometerSample>;

	readonly nanosecondsSinceStart: number;

	readonly opticalSamples: NSArray<SRPhotoplethysmogramOpticalSample>;

	readonly startDate: Date;

	readonly temperature: NSMeasurement<NSUnitTemperature>;

	readonly usage: NSArray<string>;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare var SRPhotoplethysmogramSampleUsageBackgroundSystem: string;

declare var SRPhotoplethysmogramSampleUsageDeepBreathing: string;

declare var SRPhotoplethysmogramSampleUsageForegroundBloodOxygen: string;

declare var SRPhotoplethysmogramSampleUsageForegroundHeartRate: string;

declare var SRSensorAccelerometer: string;

declare var SRSensorAmbientLightSensor: string;

declare var SRSensorAmbientPressure: string;

declare var SRSensorDeviceUsageReport: string;

declare var SRSensorElectrocardiogram: string;

declare var SRSensorFaceMetrics: string;

declare var SRSensorHeartRate: string;

declare var SRSensorKeyboardMetrics: string;

declare var SRSensorMediaEvents: string;

declare var SRSensorMessagesUsageReport: string;

declare var SRSensorOdometer: string;

declare var SRSensorOnWristState: string;

declare var SRSensorPedometerData: string;

declare var SRSensorPhoneUsageReport: string;

declare var SRSensorPhotoplethysmogram: string;

declare class SRSensorReader extends NSObject {

	static alloc(): SRSensorReader; // inherited from NSObject

	static new(): SRSensorReader; // inherited from NSObject

	static requestAuthorizationForSensorsCompletion(sensors: NSSet<string>, completion: (p1: NSError) => void): void;

	readonly authorizationStatus: SRAuthorizationStatus;

	delegate: SRSensorReaderDelegate;

	readonly sensor: string;

	constructor(o: { sensor: string; });

	fetch(request: SRFetchRequest): void;

	fetchDevices(): void;

	initWithSensor(sensor: string): this;

	startRecording(): void;

	stopRecording(): void;
}

interface SRSensorReaderDelegate extends NSObjectProtocol {

	sensorReaderDidChangeAuthorizationStatus?(reader: SRSensorReader, authorizationStatus: SRAuthorizationStatus): void;

	sensorReaderDidCompleteFetch?(reader: SRSensorReader, fetchRequest: SRFetchRequest): void;

	sensorReaderDidFetchDevices?(reader: SRSensorReader, devices: NSArray<SRDevice> | SRDevice[]): void;

	sensorReaderDidStopRecording?(reader: SRSensorReader): void;

	sensorReaderFetchDevicesDidFailWithError?(reader: SRSensorReader, error: NSError): void;

	sensorReaderFetchingRequestDidFetchResult?(reader: SRSensorReader, fetchRequest: SRFetchRequest, result: SRFetchResult<any>): boolean;

	sensorReaderFetchingRequestFailedWithError?(reader: SRSensorReader, fetchRequest: SRFetchRequest, error: NSError): void;

	sensorReaderStartRecordingFailedWithError?(reader: SRSensorReader, error: NSError): void;

	sensorReaderStopRecordingFailedWithError?(reader: SRSensorReader, error: NSError): void;

	sensorReaderWillStartRecording?(reader: SRSensorReader): void;
}
declare var SRSensorReaderDelegate: {

	prototype: SRSensorReaderDelegate;
};

declare var SRSensorRotationRate: string;

declare var SRSensorSiriSpeechMetrics: string;

declare var SRSensorTelephonySpeechMetrics: string;

declare var SRSensorVisits: string;

declare var SRSensorWristTemperature: string;

declare class SRSpeechExpression extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): SRSpeechExpression; // inherited from NSObject

	static new(): SRSpeechExpression; // inherited from NSObject

	readonly activation: number;

	readonly confidence: number;

	readonly dominance: number;

	readonly mood: number;

	readonly timeRange: CMTimeRange;

	readonly valence: number;

	readonly version: string;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare class SRSpeechMetrics extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): SRSpeechMetrics; // inherited from NSObject

	static new(): SRSpeechMetrics; // inherited from NSObject

	readonly audioLevel: SRAudioLevel;

	readonly sessionFlags: SRSpeechMetricsSessionFlags;

	readonly sessionIdentifier: string;

	readonly soundClassification: SNClassificationResult;

	readonly speechExpression: SRSpeechExpression;

	readonly speechRecognition: SFSpeechRecognitionResult;

	readonly timeSinceAudioStart: number;

	readonly timestamp: Date;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare const enum SRSpeechMetricsSessionFlags {

	Default = 0,

	BypassVoiceProcessing = 1
}

declare class SRSupplementalCategory extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): SRSupplementalCategory; // inherited from NSObject

	static new(): SRSupplementalCategory; // inherited from NSObject

	readonly identifier: string;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare class SRTextInputSession extends NSObject {

	static alloc(): SRTextInputSession; // inherited from NSObject

	static new(): SRTextInputSession; // inherited from NSObject

	readonly duration: number;

	readonly sessionIdentifier: string;

	readonly sessionType: SRTextInputSessionType;
}

declare const enum SRTextInputSessionType {

	Keyboard = 1,

	ThirdPartyKeyboard = 2,

	Pencil = 3,

	Dictation = 4
}

declare class SRVisit extends NSObject {

	static alloc(): SRVisit; // inherited from NSObject

	static new(): SRVisit; // inherited from NSObject

	readonly arrivalDateInterval: NSDateInterval;

	readonly departureDateInterval: NSDateInterval;

	readonly distanceFromHome: number;

	readonly identifier: NSUUID;

	readonly locationCategory: SRLocationCategory;
}

declare class SRWebUsage extends NSObject {

	static alloc(): SRWebUsage; // inherited from NSObject

	static new(): SRWebUsage; // inherited from NSObject

	readonly totalUsageTime: number;
}

declare class SRWristDetection extends NSObject {

	static alloc(): SRWristDetection; // inherited from NSObject

	static new(): SRWristDetection; // inherited from NSObject

	readonly crownOrientation: SRCrownOrientation;

	readonly offWristDate: Date;

	readonly onWrist: boolean;

	readonly onWristDate: Date;

	readonly wristLocation: SRWristLocation;
}

declare const enum SRWristLocation {

	Left = 0,

	Right = 1
}

declare class SRWristTemperature extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): SRWristTemperature; // inherited from NSObject

	static new(): SRWristTemperature; // inherited from NSObject

	readonly condition: SRWristTemperatureCondition;

	readonly errorEstimate: NSMeasurement<NSUnitTemperature>;

	readonly timestamp: Date;

	readonly value: NSMeasurement<NSUnitTemperature>;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare const enum SRWristTemperatureCondition {

	None = 0,

	OffWrist = 1,

	OnCharger = 2,

	InMotion = 4
}

declare class SRWristTemperatureSession extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): SRWristTemperatureSession; // inherited from NSObject

	static new(): SRWristTemperatureSession; // inherited from NSObject

	readonly duration: number;

	readonly startDate: Date;

	readonly temperatures: NSEnumerator<SRWristTemperature>;

	readonly version: string;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}
