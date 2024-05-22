
declare function MIDIBluetoothDriverActivateAllConnections(): number;

declare function MIDIBluetoothDriverDisconnect(uuid: string): number;

interface MIDICIDeviceIdentification {
	manufacturer: interop.Reference<number>;
	family: interop.Reference<number>;
	modelNumber: interop.Reference<number>;
	revisionLevel: interop.Reference<number>;
	reserved: interop.Reference<number>;
}
declare var MIDICIDeviceIdentification: interop.StructType<MIDICIDeviceIdentification>;

declare class MIDICIDeviceInfo extends NSObject implements NSSecureCoding {

	static alloc(): MIDICIDeviceInfo; // inherited from NSObject

	static new(): MIDICIDeviceInfo; // inherited from NSObject

	readonly family: NSData;

	readonly manufacturerID: NSData;

	readonly midiDestination: number;

	readonly modelNumber: NSData;

	readonly revisionLevel: NSData;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	constructor(o: { destination: number; manufacturer: NSData; family: NSData; model: NSData; revision: NSData; });

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;

	initWithDestinationManufacturerFamilyModelRevision(midiDestination: number, manufacturer: NSData, family: NSData, modelNumber: NSData, revisionLevel: NSData): this;
}

declare class MIDICIDiscoveredNode extends NSObject implements NSSecureCoding {

	static alloc(): MIDICIDiscoveredNode; // inherited from NSObject

	static new(): MIDICIDiscoveredNode; // inherited from NSObject

	readonly destination: number;

	readonly deviceInfo: MIDICIDeviceInfo;

	readonly maximumSysExSize: number;

	readonly supportsProfiles: boolean;

	readonly supportsProperties: boolean;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;
}

declare class MIDICIDiscoveryManager extends NSObject {

	static alloc(): MIDICIDiscoveryManager; // inherited from NSObject

	static new(): MIDICIDiscoveryManager; // inherited from NSObject

	static sharedInstance(): MIDICIDiscoveryManager;

	discoverWithHandler(completedHandler: (p1: NSArray<MIDICIDiscoveredNode>) => void): void;
}

declare class MIDICIProfile extends NSObject implements NSSecureCoding {

	static alloc(): MIDICIProfile; // inherited from NSObject

	static new(): MIDICIProfile; // inherited from NSObject

	readonly name: string;

	readonly profileID: NSData;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	constructor(o: { data: NSData; });

	constructor(o: { data: NSData; name: string; });

	encodeWithCoder(coder: NSCoder): void;

	initWithCoder(coder: NSCoder): this;

	initWithData(data: NSData): this;

	initWithDataName(data: NSData, inName: string): this;
}

interface MIDICIProfileResponderDelegate extends NSObjectProtocol {

	connectInitiatorWithDeviceInfo(initiatorMUID: number, deviceInfo: MIDICIDeviceInfo): boolean;

	handleDataForProfileOnChannelData?(aProfile: MIDICIProfile, channel: number, inData: NSData): void;

	initiatorDisconnected(initiatorMUID: number): void;

	willSetProfileOnChannelEnabled?(aProfile: MIDICIProfile, channel: number, shouldEnable: boolean): boolean;
}
declare var MIDICIProfileResponderDelegate: {

	prototype: MIDICIProfileResponderDelegate;
};

declare class MIDICIProfileState extends NSObject implements NSSecureCoding {

	static alloc(): MIDICIProfileState; // inherited from NSObject

	static new(): MIDICIProfileState; // inherited from NSObject

	readonly disabledProfiles: NSArray<MIDICIProfile>;

	readonly enabledProfiles: NSArray<MIDICIProfile>;

	readonly midiChannel: number;

	static readonly supportsSecureCoding: boolean; // inherited from NSSecureCoding

	constructor(o: { channel: number; enabledProfiles: NSArray<MIDICIProfile> | MIDICIProfile[]; disabledProfiles: NSArray<MIDICIProfile> | MIDICIProfile[]; });

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	constructor(o: { enabledProfiles: NSArray<MIDICIProfile> | MIDICIProfile[]; disabledProfiles: NSArray<MIDICIProfile> | MIDICIProfile[]; });

	encodeWithCoder(coder: NSCoder): void;

	initWithChannelEnabledProfilesDisabledProfiles(midiChannelNum: number, enabled: NSArray<MIDICIProfile> | MIDICIProfile[], disabled: NSArray<MIDICIProfile> | MIDICIProfile[]): this;

	initWithCoder(coder: NSCoder): this;

	initWithEnabledProfilesDisabledProfiles(enabled: NSArray<MIDICIProfile> | MIDICIProfile[], disabled: NSArray<MIDICIProfile> | MIDICIProfile[]): this;
}

declare class MIDICIResponder extends NSObject {

	static alloc(): MIDICIResponder; // inherited from NSObject

	static new(): MIDICIResponder; // inherited from NSObject

	readonly deviceInfo: MIDICIDeviceInfo;

	readonly initiators: NSArray<number>;

	readonly profileDelegate: MIDICIProfileResponderDelegate;

	constructor(o: { deviceInfo: MIDICIDeviceInfo; profileDelegate: MIDICIProfileResponderDelegate; profileStates: NSArray<MIDICIProfileState> | MIDICIProfileState[]; supportProperties: boolean; });

	initWithDeviceInfoProfileDelegateProfileStatesSupportProperties(deviceInfo: MIDICIDeviceInfo, delegate: MIDICIProfileResponderDelegate, profileList: NSArray<MIDICIProfileState> | MIDICIProfileState[], propertiesSupported: boolean): this;

	notifyProfileOnChannelIsEnabled(aProfile: MIDICIProfile, channel: number, enabledState: boolean): boolean;

	sendProfileOnChannelProfileData(aProfile: MIDICIProfile, channel: number, profileSpecificData: NSData): boolean;

	start(): boolean;

	stop(): void;
}

declare class MIDICISession extends NSObject {

	static alloc(): MIDICISession; // inherited from NSObject

	static new(): MIDICISession; // inherited from NSObject

	readonly deviceInfo: MIDICIDeviceInfo;

	readonly maxPropertyRequests: number;

	readonly maxSysExSize: number;

	readonly midiDestination: number;

	profileChangedCallback: (p1: MIDICISession, p2: number, p3: MIDICIProfile, p4: boolean) => void;

	profileSpecificDataHandler: (p1: MIDICISession, p2: number, p3: MIDICIProfile, p4: NSData) => void;

	readonly supportsProfileCapability: boolean;

	readonly supportsPropertyCapability: boolean;

	constructor(o: { discoveredNode: MIDICIDiscoveredNode; dataReadyHandler: () => void; disconnectHandler: (p1: MIDICISession, p2: NSError) => void; });

	disableProfileOnChannelError(profile: MIDICIProfile, channel: number): boolean;

	enableProfileOnChannelError(profile: MIDICIProfile, channel: number): boolean;

	initWithDiscoveredNodeDataReadyHandlerDisconnectHandler(discoveredNode: MIDICIDiscoveredNode, handler: () => void, disconnectHandler: (p1: MIDICISession, p2: NSError) => void): this;

	profileStateForChannel(channel: number): MIDICIProfileState;

	sendProfileOnChannelProfileData(profile: MIDICIProfile, channel: number, profileSpecificData: NSData): boolean;
}

declare const enum MIDICVStatus {

	kMIDICVStatusNoteOff = 8,

	kMIDICVStatusNoteOn = 9,

	kMIDICVStatusPolyPressure = 10,

	kMIDICVStatusControlChange = 11,

	kMIDICVStatusProgramChange = 12,

	kMIDICVStatusChannelPressure = 13,

	kMIDICVStatusPitchBend = 14,

	kMIDICVStatusRegisteredPNC = 0,

	kMIDICVStatusAssignablePNC = 1,

	kMIDICVStatusRegisteredControl = 2,

	kMIDICVStatusAssignableControl = 3,

	kMIDICVStatusRelRegisteredControl = 4,

	kMIDICVStatusRelAssignableControl = 5,

	kMIDICVStatusPerNotePitchBend = 6,

	kMIDICVStatusPerNoteMgmt = 15
}

declare var MIDIChannelsWholePort: number;

declare function MIDIClientCreate(name: string, notifyProc: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<MIDINotification>, p2: interop.Pointer | interop.Reference<any>) => void>, notifyRefCon: interop.Pointer | interop.Reference<any>, outClient: interop.Pointer | interop.Reference<number>): number;

declare function MIDIClientCreateWithBlock(name: string, outClient: interop.Pointer | interop.Reference<number>, notifyBlock: (p1: interop.Pointer | interop.Reference<MIDINotification>) => void): number;

declare function MIDIClientDispose(client: number): number;

interface MIDIControlTransform {
	controlType: MIDITransformControlType;
	remappedControlType: MIDITransformControlType;
	controlNumber: number;
	transform: MIDITransformType;
	param: number;
}
declare var MIDIControlTransform: interop.StructType<MIDIControlTransform>;

declare function MIDIDestinationCreate(client: number, name: string, readProc: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<MIDIPacketList>, p2: interop.Pointer | interop.Reference<any>, p3: interop.Pointer | interop.Reference<any>) => void>, refCon: interop.Pointer | interop.Reference<any>, outDest: interop.Pointer | interop.Reference<number>): number;

declare function MIDIDestinationCreateWithBlock(client: number, name: string, outDest: interop.Pointer | interop.Reference<number>, readBlock: (p1: interop.Pointer | interop.Reference<MIDIPacketList>, p2: interop.Pointer | interop.Reference<any>) => void): number;

declare function MIDIDestinationCreateWithProtocol(client: number, name: string, protocol: MIDIProtocolID, outDest: interop.Pointer | interop.Reference<number>, readBlock: (p1: interop.Pointer | interop.Reference<MIDIEventList>, p2: interop.Pointer | interop.Reference<any>) => void): number;

declare function MIDIDeviceAddEntity(device: number, name: string, embedded: boolean, numSourceEndpoints: number, numDestinationEndpoints: number, newEntity: interop.Pointer | interop.Reference<number>): number;

declare function MIDIDeviceCreate(owner: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<MIDIDriverInterface>>, name: string, manufacturer: string, model: string, outDevice: interop.Pointer | interop.Reference<number>): number;

declare function MIDIDeviceDispose(device: number): number;

declare function MIDIDeviceGetEntity(device: number, entityIndex0: number): number;

declare function MIDIDeviceGetNumberOfEntities(device: number): number;

declare function MIDIDeviceListAddDevice(devList: number, dev: number): number;

declare function MIDIDeviceListDispose(devList: number): number;

declare function MIDIDeviceListGetDevice(devList: number, index0: number): number;

declare function MIDIDeviceListGetNumberOfDevices(devList: number): number;

declare function MIDIDeviceNewEntity(device: number, name: string, protocol: MIDIProtocolID, embedded: boolean, numSourceEndpoints: number, numDestinationEndpoints: number, newEntity: interop.Pointer | interop.Reference<number>): number;

declare function MIDIDeviceRemoveEntity(device: number, entity: number): number;

interface MIDIDriverInterface {
	_reserved: interop.Pointer | interop.Reference<any>;
	QueryInterface: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<any>, p2: CFUUIDBytes, p3: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>) => number>;
	AddRef: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<any>) => number>;
	Release: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<any>) => number>;
	FindDevices: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<MIDIDriverInterface>>, p2: number) => number>;
	Start: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<MIDIDriverInterface>>, p2: number) => number>;
	Stop: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<MIDIDriverInterface>>) => number>;
	Configure: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<MIDIDriverInterface>>, p2: number) => number>;
	Send: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<MIDIDriverInterface>>, p2: interop.Pointer | interop.Reference<MIDIPacketList>, p3: interop.Pointer | interop.Reference<any>, p4: interop.Pointer | interop.Reference<any>) => number>;
	EnableSource: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<MIDIDriverInterface>>, p2: number, p3: boolean) => number>;
	Flush: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<MIDIDriverInterface>>, p2: number, p3: interop.Pointer | interop.Reference<any>, p4: interop.Pointer | interop.Reference<any>) => number>;
	Monitor: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<MIDIDriverInterface>>, p2: number, p3: interop.Pointer | interop.Reference<MIDIPacketList>) => number>;
	SendPackets: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<MIDIDriverInterface>>, p2: interop.Pointer | interop.Reference<MIDIEventList>, p3: interop.Pointer | interop.Reference<any>, p4: interop.Pointer | interop.Reference<any>) => number>;
	MonitorEvents: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<MIDIDriverInterface>>, p2: number, p3: interop.Pointer | interop.Reference<MIDIEventList>) => number>;
}
declare var MIDIDriverInterface: interop.StructType<MIDIDriverInterface>;

declare function MIDIEndpointDispose(endpt: number): number;

declare function MIDIEndpointGetEntity(inEndpoint: number, outEntity: interop.Pointer | interop.Reference<number>): number;

declare function MIDIEndpointGetRefCons(endpt: number, ref1: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>, ref2: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<any>>): number;

declare function MIDIEndpointSetRefCons(endpt: number, ref1: interop.Pointer | interop.Reference<any>, ref2: interop.Pointer | interop.Reference<any>): number;

declare function MIDIEntityAddOrRemoveEndpoints(entity: number, numSourceEndpoints: number, numDestinationEndpoints: number): number;

declare function MIDIEntityGetDestination(entity: number, destIndex0: number): number;

declare function MIDIEntityGetDevice(inEntity: number, outDevice: interop.Pointer | interop.Reference<number>): number;

declare function MIDIEntityGetNumberOfDestinations(entity: number): number;

declare function MIDIEntityGetNumberOfSources(entity: number): number;

declare function MIDIEntityGetSource(entity: number, sourceIndex0: number): number;

interface MIDIEventList {
	protocol: MIDIProtocolID;
	numPackets: number;
	packet: interop.Reference<MIDIEventPacket>;
}
declare var MIDIEventList: interop.StructType<MIDIEventList>;

declare function MIDIEventListAdd(evtlist: interop.Pointer | interop.Reference<MIDIEventList>, listSize: number, curPacket: interop.Pointer | interop.Reference<MIDIEventPacket>, time: number, wordCount: number, words: interop.Pointer | interop.Reference<number>): interop.Pointer | interop.Reference<MIDIEventPacket>;

declare function MIDIEventListInit(evtlist: interop.Pointer | interop.Reference<MIDIEventList>, protocol: MIDIProtocolID): interop.Pointer | interop.Reference<MIDIEventPacket>;

interface MIDIEventPacket {
	timeStamp: number;
	wordCount: number;
	words: interop.Reference<number>;
}
declare var MIDIEventPacket: interop.StructType<MIDIEventPacket>;

declare function MIDIEventPacketSysexBytesForGroup(pkt: interop.Pointer | interop.Reference<MIDIEventPacket>, groupIndex: number, outData: interop.Pointer | interop.Reference<NSData>): number;

declare function MIDIExternalDeviceCreate(name: string, manufacturer: string, model: string, outDevice: interop.Pointer | interop.Reference<number>): number;

declare function MIDIFlushOutput(dest: number): number;

declare function MIDIGetDestination(destIndex0: number): number;

declare function MIDIGetDevice(deviceIndex0: number): number;

declare function MIDIGetDriverDeviceList(driver: interop.Pointer | interop.Reference<interop.Pointer | interop.Reference<MIDIDriverInterface>>): number;

declare function MIDIGetDriverIORunLoop(): interop.Unmanaged<any>;

declare function MIDIGetExternalDevice(deviceIndex0: number): number;

declare function MIDIGetNumberOfDestinations(): number;

declare function MIDIGetNumberOfDevices(): number;

declare function MIDIGetNumberOfExternalDevices(): number;

declare function MIDIGetNumberOfSources(): number;

declare function MIDIGetSource(sourceIndex0: number): number;

interface MIDIIOErrorNotification {
	messageID: MIDINotificationMessageID;
	messageSize: number;
	driverDevice: number;
	errorCode: number;
}
declare var MIDIIOErrorNotification: interop.StructType<MIDIIOErrorNotification>;

declare function MIDIInputPortCreate(client: number, portName: string, readProc: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<MIDIPacketList>, p2: interop.Pointer | interop.Reference<any>, p3: interop.Pointer | interop.Reference<any>) => void>, refCon: interop.Pointer | interop.Reference<any>, outPort: interop.Pointer | interop.Reference<number>): number;

declare function MIDIInputPortCreateWithBlock(client: number, portName: string, outPort: interop.Pointer | interop.Reference<number>, readBlock: (p1: interop.Pointer | interop.Reference<MIDIPacketList>, p2: interop.Pointer | interop.Reference<any>) => void): number;

declare function MIDIInputPortCreateWithProtocol(client: number, portName: string, protocol: MIDIProtocolID, outPort: interop.Pointer | interop.Reference<number>, receiveBlock: (p1: interop.Pointer | interop.Reference<MIDIEventList>, p2: interop.Pointer | interop.Reference<any>) => void): number;

declare const enum MIDIMessageType {

	kMIDIMessageTypeUtility = 0,

	kMIDIMessageTypeSystem = 1,

	kMIDIMessageTypeChannelVoice1 = 2,

	kMIDIMessageTypeSysEx = 3,

	kMIDIMessageTypeChannelVoice2 = 4,

	kMIDIMessageTypeData128 = 5,

	kMIDIMessageTypeUnknownF = 15
}

interface MIDIMessage_128 {
	word0: number;
	word1: number;
	word2: number;
	word3: number;
}
declare var MIDIMessage_128: interop.StructType<MIDIMessage_128>;

interface MIDIMessage_64 {
	word0: number;
	word1: number;
}
declare var MIDIMessage_64: interop.StructType<MIDIMessage_64>;

interface MIDIMessage_96 {
	word0: number;
	word1: number;
	word2: number;
}
declare var MIDIMessage_96: interop.StructType<MIDIMessage_96>;

declare var MIDINetworkBonjourServiceType: string;

declare class MIDINetworkConnection extends NSObject {

	static alloc(): MIDINetworkConnection; // inherited from NSObject

	static connectionWithHost(host: MIDINetworkHost): MIDINetworkConnection;

	static new(): MIDINetworkConnection; // inherited from NSObject

	readonly host: MIDINetworkHost;
}

declare const enum MIDINetworkConnectionPolicy {

	NoOne = 0,

	HostsInContactList = 1,

	Anyone = 2
}

declare class MIDINetworkHost extends NSObject {

	static alloc(): MIDINetworkHost; // inherited from NSObject

	static hostWithNameAddressPort(name: string, address: string, port: number): MIDINetworkHost;

	static hostWithNameNetService(name: string, netService: NSNetService): MIDINetworkHost;

	static hostWithNameNetServiceNameNetServiceDomain(name: string, netServiceName: string, netServiceDomain: string): MIDINetworkHost;

	static new(): MIDINetworkHost; // inherited from NSObject

	readonly address: string;

	readonly name: string;

	readonly netServiceDomain: string;

	readonly netServiceName: string;

	readonly port: number;

	hasSameAddressAs(other: MIDINetworkHost): boolean;
}

declare var MIDINetworkNotificationContactsDidChange: string;

declare var MIDINetworkNotificationSessionDidChange: string;

declare class MIDINetworkSession extends NSObject {

	static alloc(): MIDINetworkSession; // inherited from NSObject

	static defaultSession(): MIDINetworkSession;

	static new(): MIDINetworkSession; // inherited from NSObject

	connectionPolicy: MIDINetworkConnectionPolicy;

	enabled: boolean;

	readonly localName: string;

	readonly networkName: string;

	readonly networkPort: number;

	addConnection(connection: MIDINetworkConnection): boolean;

	addContact(contact: MIDINetworkHost): boolean;

	connections(): NSSet<MIDINetworkConnection>;

	contacts(): NSSet<MIDINetworkHost>;

	destinationEndpoint(): number;

	removeConnection(connection: MIDINetworkConnection): boolean;

	removeContact(contact: MIDINetworkHost): boolean;

	sourceEndpoint(): number;
}

declare const enum MIDINoteAttribute {

	kMIDINoteAttributeNone = 0,

	kMIDINoteAttributeManufacturerSpecific = 1,

	kMIDINoteAttributeProfileSpecific = 2,

	kMIDINoteAttributePitch = 3
}

interface MIDINotification {
	messageID: MIDINotificationMessageID;
	messageSize: number;
}
declare var MIDINotification: interop.StructType<MIDINotification>;

declare const enum MIDINotificationMessageID {

	kMIDIMsgSetupChanged = 1,

	kMIDIMsgObjectAdded = 2,

	kMIDIMsgObjectRemoved = 3,

	kMIDIMsgPropertyChanged = 4,

	kMIDIMsgThruConnectionsChanged = 5,

	kMIDIMsgSerialPortOwnerChanged = 6,

	kMIDIMsgIOError = 7
}

interface MIDIObjectAddRemoveNotification {
	messageID: MIDINotificationMessageID;
	messageSize: number;
	parent: number;
	parentType: MIDIObjectType;
	child: number;
	childType: MIDIObjectType;
}
declare var MIDIObjectAddRemoveNotification: interop.StructType<MIDIObjectAddRemoveNotification>;

declare function MIDIObjectFindByUniqueID(inUniqueID: number, outObject: interop.Pointer | interop.Reference<number>, outObjectType: interop.Pointer | interop.Reference<MIDIObjectType>): number;

declare function MIDIObjectGetDataProperty(obj: number, propertyID: string, outData: interop.Pointer | interop.Reference<NSData>): number;

declare function MIDIObjectGetDictionaryProperty(obj: number, propertyID: string, outDict: interop.Pointer | interop.Reference<NSDictionary<any, any>>): number;

declare function MIDIObjectGetIntegerProperty(obj: number, propertyID: string, outValue: interop.Pointer | interop.Reference<number>): number;

declare function MIDIObjectGetProperties(obj: number, outProperties: interop.Pointer | interop.Reference<any>, deep: boolean): number;

declare function MIDIObjectGetStringProperty(obj: number, propertyID: string, str: interop.Pointer | interop.Reference<string>): number;

interface MIDIObjectPropertyChangeNotification {
	messageID: MIDINotificationMessageID;
	messageSize: number;
	object: number;
	objectType: MIDIObjectType;
	propertyName: string;
}
declare var MIDIObjectPropertyChangeNotification: interop.StructType<MIDIObjectPropertyChangeNotification>;

declare function MIDIObjectRemoveProperty(obj: number, propertyID: string): number;

declare function MIDIObjectSetDataProperty(obj: number, propertyID: string, data: NSData): number;

declare function MIDIObjectSetDictionaryProperty(obj: number, propertyID: string, dict: NSDictionary<any, any>): number;

declare function MIDIObjectSetIntegerProperty(obj: number, propertyID: string, value: number): number;

declare function MIDIObjectSetStringProperty(obj: number, propertyID: string, str: string): number;

declare const enum MIDIObjectType {

	kMIDIObjectType_Other = -1,

	kMIDIObjectType_Device = 0,

	kMIDIObjectType_Entity = 1,

	kMIDIObjectType_Source = 2,

	kMIDIObjectType_Destination = 3,

	kMIDIObjectType_ExternalDevice = 16,

	kMIDIObjectType_ExternalEntity = 17,

	kMIDIObjectType_ExternalSource = 18,

	kMIDIObjectType_ExternalDestination = 19
}

declare function MIDIOutputPortCreate(client: number, portName: string, outPort: interop.Pointer | interop.Reference<number>): number;

interface MIDIPacket {
	timeStamp: number;
	length: number;
	data: interop.Reference<number>;
}
declare var MIDIPacket: interop.StructType<MIDIPacket>;

interface MIDIPacketList {
	numPackets: number;
	packet: interop.Reference<MIDIPacket>;
}
declare var MIDIPacketList: interop.StructType<MIDIPacketList>;

declare function MIDIPacketListAdd(pktlist: interop.Pointer | interop.Reference<MIDIPacketList>, listSize: number, curPacket: interop.Pointer | interop.Reference<MIDIPacket>, time: number, nData: number, data: string | interop.Pointer | interop.Reference<any>): interop.Pointer | interop.Reference<MIDIPacket>;

declare function MIDIPacketListInit(pktlist: interop.Pointer | interop.Reference<MIDIPacketList>): interop.Pointer | interop.Reference<MIDIPacket>;

declare const enum MIDIPerNoteManagementOptions {

	kMIDIPerNoteManagementReset = 1,

	kMIDIPerNoteManagementDetach = 2
}

declare function MIDIPortConnectSource(port: number, source: number, connRefCon: interop.Pointer | interop.Reference<any>): number;

declare function MIDIPortDisconnectSource(port: number, source: number): number;

declare function MIDIPortDispose(port: number): number;

declare const enum MIDIProgramChangeOptions {

	kMIDIProgramChangeBankValid = 1
}

declare const enum MIDIProtocolID {

	kMIDIProtocol_1_0 = 1,

	kMIDIProtocol_2_0 = 2
}

declare function MIDIReceived(src: number, pktlist: interop.Pointer | interop.Reference<MIDIPacketList>): number;

declare function MIDIReceivedEventList(src: number, evtlist: interop.Pointer | interop.Reference<MIDIEventList>): number;

declare function MIDIRestart(): number;

declare function MIDISend(port: number, dest: number, pktlist: interop.Pointer | interop.Reference<MIDIPacketList>): number;

declare function MIDISendEventList(port: number, dest: number, evtlist: interop.Pointer | interop.Reference<MIDIEventList>): number;

declare function MIDISendSysex(request: interop.Pointer | interop.Reference<MIDISysexSendRequest>): number;

declare function MIDISendUMPSysex(umpRequest: interop.Pointer | interop.Reference<MIDISysexSendRequestUMP>): number;

declare function MIDISendUMPSysex8(umpRequest: interop.Pointer | interop.Reference<MIDISysexSendRequestUMP>): number;

declare function MIDISetupAddDevice(device: number): number;

declare function MIDISetupAddExternalDevice(device: number): number;

declare function MIDISetupRemoveDevice(device: number): number;

declare function MIDISetupRemoveExternalDevice(device: number): number;

declare function MIDISourceCreate(client: number, name: string, outSrc: interop.Pointer | interop.Reference<number>): number;

declare function MIDISourceCreateWithProtocol(client: number, name: string, protocol: MIDIProtocolID, outSrc: interop.Pointer | interop.Reference<number>): number;

declare const enum MIDISysExStatus {

	kMIDISysExStatusComplete = 0,

	kMIDISysExStatusStart = 1,

	kMIDISysExStatusContinue = 2,

	kMIDISysExStatusEnd = 3,

	kMIDISysExStatusMixedDataSetHeader = 8,

	kMIDISysExStatusMixedDataSetPayload = 9
}

interface MIDISysexSendRequest {
	destination: number;
	data: string;
	bytesToSend: number;
	complete: boolean;
	reserved: interop.Reference<number>;
	completionProc: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<MIDISysexSendRequest>) => void>;
	completionRefCon: interop.Pointer | interop.Reference<any>;
}
declare var MIDISysexSendRequest: interop.StructType<MIDISysexSendRequest>;

interface MIDISysexSendRequestUMP {
	destination: number;
	words: interop.Pointer | interop.Reference<number>;
	wordsToSend: number;
	complete: boolean;
	completionProc: interop.FunctionReference<(p1: interop.Pointer | interop.Reference<MIDISysexSendRequestUMP>) => void>;
	completionRefCon: interop.Pointer | interop.Reference<any>;
}
declare var MIDISysexSendRequestUMP: interop.StructType<MIDISysexSendRequestUMP>;

declare const enum MIDISystemStatus {

	kMIDIStatusStartOfExclusive = 240,

	kMIDIStatusEndOfExclusive = 247,

	kMIDIStatusMTC = 241,

	kMIDIStatusSongPosPointer = 242,

	kMIDIStatusSongSelect = 243,

	kMIDIStatusTuneRequest = 246,

	kMIDIStatusTimingClock = 248,

	kMIDIStatusStart = 250,

	kMIDIStatusContinue = 251,

	kMIDIStatusStop = 252,

	kMIDIStatusActiveSending = 254,

	kMIDIStatusActiveSensing = 254,

	kMIDIStatusSystemReset = 255
}

declare function MIDIThruConnectionCreate(inPersistentOwnerID: string, inConnectionParams: NSData, outConnection: interop.Pointer | interop.Reference<number>): number;

declare function MIDIThruConnectionDispose(connection: number): number;

interface MIDIThruConnectionEndpoint {
	endpointRef: number;
	uniqueID: number;
}
declare var MIDIThruConnectionEndpoint: interop.StructType<MIDIThruConnectionEndpoint>;

declare function MIDIThruConnectionFind(inPersistentOwnerID: string, outConnectionList: interop.Pointer | interop.Reference<NSData>): number;

declare function MIDIThruConnectionGetParams(connection: number, outConnectionParams: interop.Pointer | interop.Reference<NSData>): number;

interface MIDIThruConnectionParams {
	version: number;
	numSources: number;
	sources: interop.Reference<MIDIThruConnectionEndpoint>;
	numDestinations: number;
	destinations: interop.Reference<MIDIThruConnectionEndpoint>;
	channelMap: interop.Reference<number>;
	lowVelocity: number;
	highVelocity: number;
	lowNote: number;
	highNote: number;
	noteNumber: MIDITransform;
	velocity: MIDITransform;
	keyPressure: MIDITransform;
	channelPressure: MIDITransform;
	programChange: MIDITransform;
	pitchBend: MIDITransform;
	filterOutSysEx: number;
	filterOutMTC: number;
	filterOutBeatClock: number;
	filterOutTuneRequest: number;
	reserved2: interop.Reference<number>;
	filterOutAllControls: number;
	numControlTransforms: number;
	numMaps: number;
	reserved3: interop.Reference<number>;
}
declare var MIDIThruConnectionParams: interop.StructType<MIDIThruConnectionParams>;

declare function MIDIThruConnectionParamsInitialize(inConnectionParams: interop.Pointer | interop.Reference<MIDIThruConnectionParams>): void;

declare function MIDIThruConnectionSetParams(connection: number, inConnectionParams: NSData): number;

interface MIDITransform {
	transform: MIDITransformType;
	param: number;
}
declare var MIDITransform: interop.StructType<MIDITransform>;

declare const enum MIDITransformControlType {

	kMIDIControlType_7Bit = 0,

	kMIDIControlType_14Bit = 1,

	kMIDIControlType_7BitRPN = 2,

	kMIDIControlType_14BitRPN = 3,

	kMIDIControlType_7BitNRPN = 4,

	kMIDIControlType_14BitNRPN = 5
}

declare const enum MIDITransformType {

	kMIDITransform_None = 0,

	kMIDITransform_FilterOut = 1,

	kMIDITransform_MapControl = 2,

	kMIDITransform_Add = 8,

	kMIDITransform_Scale = 9,

	kMIDITransform_MinValue = 10,

	kMIDITransform_MaxValue = 11,

	kMIDITransform_MapValue = 12
}

declare const enum MIDIUtilityStatus {

	kMIDIUtilityStatusNOOP = 0,

	kMIDIUtilityStatusJitterReductionClock = 1,

	kMIDIUtilityStatusJitterReductionTimestamp = 2
}

interface MIDIValueMap {
	value: interop.Reference<number>;
}
declare var MIDIValueMap: interop.StructType<MIDIValueMap>;

declare var kMIDI1UPMaxSysexSize: number;

declare const kMIDIIDNotUnique: number;

declare const kMIDIInvalidClient: number;

declare const kMIDIInvalidPort: number;

declare const kMIDIInvalidUniqueID: number;

declare const kMIDIMessageSendErr: number;

declare const kMIDINoConnection: number;

declare const kMIDINoCurrentSetup: number;

declare const kMIDINotPermitted: number;

declare const kMIDIObjectNotFound: number;

declare var kMIDIObjectType_ExternalMask: MIDIObjectType;

declare var kMIDIPropertyAdvanceScheduleTimeMuSec: string;

declare var kMIDIPropertyCanRoute: string;

declare var kMIDIPropertyConnectionUniqueID: string;

declare var kMIDIPropertyDeviceID: string;

declare var kMIDIPropertyDisplayName: string;

declare var kMIDIPropertyDriverDeviceEditorApp: string;

declare var kMIDIPropertyDriverOwner: string;

declare var kMIDIPropertyDriverVersion: string;

declare var kMIDIPropertyImage: string;

declare var kMIDIPropertyIsBroadcast: string;

declare var kMIDIPropertyIsDrumMachine: string;

declare var kMIDIPropertyIsEffectUnit: string;

declare var kMIDIPropertyIsEmbeddedEntity: string;

declare var kMIDIPropertyIsMixer: string;

declare var kMIDIPropertyIsSampler: string;

declare var kMIDIPropertyManufacturer: string;

declare var kMIDIPropertyMaxReceiveChannels: string;

declare var kMIDIPropertyMaxSysExSpeed: string;

declare var kMIDIPropertyMaxTransmitChannels: string;

declare var kMIDIPropertyModel: string;

declare var kMIDIPropertyName: string;

declare var kMIDIPropertyNameConfiguration: string;

declare var kMIDIPropertyNameConfigurationDictionary: string;

declare var kMIDIPropertyOffline: string;

declare var kMIDIPropertyPanDisruptsStereo: string;

declare var kMIDIPropertyPrivate: string;

declare var kMIDIPropertyProtocolID: string;

declare var kMIDIPropertyReceiveChannels: string;

declare var kMIDIPropertyReceivesBankSelectLSB: string;

declare var kMIDIPropertyReceivesBankSelectMSB: string;

declare var kMIDIPropertyReceivesClock: string;

declare var kMIDIPropertyReceivesMTC: string;

declare var kMIDIPropertyReceivesNotes: string;

declare var kMIDIPropertyReceivesProgramChanges: string;

declare var kMIDIPropertySingleRealtimeEntity: string;

declare var kMIDIPropertySupportsGeneralMIDI: string;

declare var kMIDIPropertySupportsMMC: string;

declare var kMIDIPropertySupportsShowControl: string;

declare var kMIDIPropertyTransmitChannels: string;

declare var kMIDIPropertyTransmitsBankSelectLSB: string;

declare var kMIDIPropertyTransmitsBankSelectMSB: string;

declare var kMIDIPropertyTransmitsClock: string;

declare var kMIDIPropertyTransmitsMTC: string;

declare var kMIDIPropertyTransmitsNotes: string;

declare var kMIDIPropertyTransmitsProgramChanges: string;

declare var kMIDIPropertyUMPActiveGroupBitmap: string;

declare var kMIDIPropertyUMPCanTransmitGroupless: string;

declare var kMIDIPropertyUniqueID: string;

declare const kMIDIServerStartErr: number;

declare const kMIDISetupFormatErr: number;

declare const kMIDIThruConnection_MaxEndpoints: number;

declare const kMIDIUnknownEndpoint: number;

declare const kMIDIUnknownError: number;

declare const kMIDIUnknownProperty: number;

declare const kMIDIWrongEndpointType: number;

declare const kMIDIWrongPropertyType: number;

declare const kMIDIWrongThread: number;
