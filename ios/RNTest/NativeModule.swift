import Foundation
import React

@objc(NativeModule)

class NativeModule: NSObject {
    static var viewController: ViewController?
    
    @objc func closeRNApp() -> Void {
        if let viewController = NativeModule.viewController {
            DispatchQueue.global(qos: .background).async {
                DispatchQueue.main.async {
                    viewController.dismissReactNativeApp()
                }
            }
        }
    }
}
