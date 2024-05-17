import UIKit

@objcMembers
public class HelloSwift: NSObject {
  @objc public var hello: String = "Hello from Swift!"

  @objc public func addWith(a: Double, b: Double) -> Double {
    return a + b;
  }
}
