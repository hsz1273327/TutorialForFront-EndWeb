
declare class NIAlgorithmConvergence extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): NIAlgorithmConvergence; // inherited from NSObject

	static new(): NIAlgorithmConvergence; // inherited from NSObject

	readonly reasons: NSArray<string>;

	readonly status: NIAlgorithmConvergenceStatus;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare const enum NIAlgorithmConvergenceStatus {

	Unknown = 0,

	NotConverged = 1,

	Converged = 2
}

declare function NIAlgorithmConvergenceStatusReasonDescription(reason: string): string;

declare var NIAlgorithmConvergenceStatusReasonInsufficientHorizontalSweep: string;

declare var NIAlgorithmConvergenceStatusReasonInsufficientLighting: string;

declare var NIAlgorithmConvergenceStatusReasonInsufficientMovement: string;

declare var NIAlgorithmConvergenceStatusReasonInsufficientVerticalSweep: string;

declare class NIConfiguration extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): NIConfiguration; // inherited from NSObject

	static new(): NIConfiguration; // inherited from NSObject

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

interface NIDeviceCapability {

	supportsCameraAssistance: boolean;

	supportsDirectionMeasurement: boolean;

	supportsExtendedDistanceMeasurement: boolean;

	supportsPreciseDistanceMeasurement: boolean;
}
declare var NIDeviceCapability: {

	prototype: NIDeviceCapability;
};

declare class NIDiscoveryToken extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): NIDiscoveryToken; // inherited from NSObject

	static new(): NIDiscoveryToken; // inherited from NSObject

	readonly deviceCapabilities: NIDeviceCapability;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare const enum NIErrorCode {

	UnsupportedPlatform = -5889,

	InvalidConfiguration = -5888,

	SessionFailed = -5887,

	ResourceUsageTimeout = -5886,

	ActiveSessionsLimitExceeded = -5885,

	UserDidNotAllow = -5884,

	InvalidARConfiguration = -5883,

	AccessoryPeerDeviceUnavailable = -5882,

	IncompatiblePeerDevice = -5881,

	ActiveExtendedDistanceSessionsLimitExceeded = -5880
}

declare var NIErrorDomain: string;

declare class NINearbyAccessoryConfiguration extends NIConfiguration {

	static alloc(): NINearbyAccessoryConfiguration; // inherited from NSObject

	static new(): NINearbyAccessoryConfiguration; // inherited from NSObject

	readonly accessoryDiscoveryToken: NIDiscoveryToken;

	cameraAssistanceEnabled: boolean;

	constructor(o: { accessoryData: NSData; bluetoothPeerIdentifier: NSUUID; });

	constructor(o: { data: NSData; });

	initWithAccessoryDataBluetoothPeerIdentifierError(accessoryData: NSData, identifier: NSUUID): this;

	initWithDataError(data: NSData): this;
}

declare class NINearbyObject extends NSObject implements NSCopying, NSSecureCoding {

	static alloc(): NINearbyObject; // inherited from NSObject

	static new(): NINearbyObject; // inherited from NSObject

	readonly direction: interop.Reference<number>;

	readonly discoveryToken: NIDiscoveryToken;

	readonly distance: number;

	readonly horizontalAngle: number;

	readonly verticalDirectionEstimate: NINearbyObjectVerticalDirectionEstimate;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	copyWithZone(zone: interop.Pointer | interop.Reference<any>): any;

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare var NINearbyObjectAngleNotAvailable: number;

declare var NINearbyObjectDirectionNotAvailable: interop.Reference<number>;

declare var NINearbyObjectDistanceNotAvailable: number;

declare const enum NINearbyObjectRemovalReason {

	Timeout = 0,

	PeerEnded = 1
}

declare const enum NINearbyObjectVerticalDirectionEstimate {

	Unknown = 0,

	Same = 1,

	Above = 2,

	Below = 3,

	AboveOrBelow = 4
}

declare var NINearbyObjectWorldTransformNotAvailable: simd_float4x4;

declare class NINearbyPeerConfiguration extends NIConfiguration {

	static alloc(): NINearbyPeerConfiguration; // inherited from NSObject

	static new(): NINearbyPeerConfiguration; // inherited from NSObject

	cameraAssistanceEnabled: boolean;

	extendedDistanceMeasurementEnabled: boolean;

	readonly peerDiscoveryToken: NIDiscoveryToken;

	constructor(o: { peerToken: NIDiscoveryToken; });

	initWithPeerToken(peerToken: NIDiscoveryToken): this;
}

declare class NISession extends NSObject {

	static alloc(): NISession; // inherited from NSObject

	static new(): NISession; // inherited from NSObject

	readonly configuration: NIConfiguration;

	delegate: NISessionDelegate;

	readonly discoveryToken: NIDiscoveryToken;

	static readonly deviceCapabilities: NIDeviceCapability;

	static readonly supported: boolean;

	invalidate(): void;

	pause(): void;

	runWithConfiguration(configuration: NIConfiguration): void;

	setARSession(session: ARSession): void;

	worldTransformForObject(object: NINearbyObject): simd_float4x4;
}

interface NISessionDelegate extends NSObjectProtocol {

	sessionDidGenerateShareableConfigurationDataForObject?(session: NISession, shareableConfigurationData: NSData, object: NINearbyObject): void;

	sessionDidInvalidateWithError?(session: NISession, error: NSError): void;

	sessionDidRemoveNearbyObjectsWithReason?(session: NISession, nearbyObjects: NSArray<NINearbyObject> | NINearbyObject[], reason: NINearbyObjectRemovalReason): void;

	sessionDidStartRunning?(session: NISession): void;

	sessionDidUpdateAlgorithmConvergenceForObject?(session: NISession, convergence: NIAlgorithmConvergence, object: NINearbyObject): void;

	sessionDidUpdateNearbyObjects?(session: NISession, nearbyObjects: NSArray<NINearbyObject> | NINearbyObject[]): void;

	sessionSuspensionEnded?(session: NISession): void;

	sessionWasSuspended?(session: NISession): void;
}
declare var NISessionDelegate: {

	prototype: NISessionDelegate;
};
