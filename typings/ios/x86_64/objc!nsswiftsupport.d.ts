
declare class HelloSwift extends NSObject {

	static alloc(): HelloSwift; // inherited from NSObject

	static new(): HelloSwift; // inherited from NSObject

	hello: string;

	addWithAB(a: number, b: number): number;
}

declare class NativeScriptContainerCtrl extends UIViewController {

	static alloc(): NativeScriptContainerCtrl; // inherited from NSObject

	static new(): NativeScriptContainerCtrl; // inherited from NSObject

	updateData: (p1: NSMutableDictionary<any, any>) => void;
}

declare class NativeScriptViewFactory extends NSObject implements NativeScriptEmbedderDelegate {

	static alloc(): NativeScriptViewFactory; // inherited from NSObject

	static getKeyWindow(): UIWindow;

	static initShared(): void;

	static new(): NativeScriptViewFactory; // inherited from NSObject

	static setApp(value: NativeScriptContainerCtrl): void;

	static setShared(value: NativeScriptViewFactory): void;

	viewCreator: (p1: string) => void;

	viewDestroyer: (p1: string) => void;

	views: NSMutableDictionary<any, any>;

	static app: NativeScriptContainerCtrl;

	static shared: NativeScriptViewFactory;

	getViewById(id: string): UIView;

	presentNativeScriptApp(vc: UIViewController): any;
}
