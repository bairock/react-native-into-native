# **Android**
Откройте с помощью Android Studio папку **/android**

# **IOS**
Откройте с помощью Xcode проект **RNTest.xcworkspace**

# HOW IT`S WORK
React Native создает сборку в виде файла **android/app/src/main/assets/index.android.bundle - для android**   **ios/index.ios.bundle - для ios**. Они запускаются при открытии страницы с React Native.

### Код открытия Android

```
package com.example.rntest

import android.os.Bundle

import android.app.Activity
import android.graphics.Color
import com.facebook.react.common.LifecycleState
import com.facebook.react.shell.MainReactPackage
import com.facebook.react.ReactInstanceManager
import com.facebook.react.ReactRootView
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler

class MyReactActivity : Activity(), DefaultHardwareBackBtnHandler {
    private var mReactRootView: ReactRootView? = null
    private var mReactInstanceManager: ReactInstanceManager? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        getWindow().getDecorView().setBackgroundColor(Color.parseColor("#282c34"));

        val value = intent.getStringExtra("value")

        mReactRootView = ReactRootView(this)
        mReactInstanceManager = ReactInstanceManager.builder()
            .setApplication(application)
            .setCurrentActivity(this)
			// Production mode
			// .setBundleAssetName("index.bundle")
            .setBundleAssetName("index.android.bundle")
            .setJSMainModulePath("index")
            .addPackage(MainReactPackage())
            .setUseDeveloperSupport(BuildConfig.DEBUG)
            .setInitialLifecycleState(LifecycleState.RESUMED)
            .build()
        val initialProps = Bundle()
        initialProps.putString("nativeParameter", value)
        mReactRootView!!.startReactApplication(mReactInstanceManager, "RNTestScreen", initialProps)

        setContentView(mReactRootView)
    }

    override fun invokeDefaultOnBackPressed() {
        super.onBackPressed()
    }

    override fun onPause() {
        super.onPause()
        mReactInstanceManager?.onHostPause(this)
    }

    override fun onResume() {
        super.onResume()
        mReactInstanceManager?.onHostResume(this, this)
    }

    override fun onDestroy() {
        super.onDestroy()
        mReactInstanceManager?.onHostDestroy(this)
        mReactRootView?.unmountReactApplication()
    }

    override fun onBackPressed() {
        if (mReactInstanceManager == null) {
            super.onBackPressed()
        } else {
            mReactInstanceManager?.onBackPressed()
        }
    }
}
```
### Код открытия iOS
```

import UIKit
import React

class ViewController: UIViewController {
    @IBOutlet weak var valueForReactNativeApp: UITextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        let tap: UITapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(UIInputViewController.dismissKeyboard))
        view.addGestureRecognizer(tap)
        
        NativeModule.viewController = self
    }
    
    @objc func dismissKeyboard() {
        view.endEditing(true)
    }

    @IBAction func highScoreButtonTapped(sender : UIButton) {
        print("Opening React Native App")
        // Production JS bundle location path
        let jsCodeLocation = Bundle.main.url(forResource: "main", withExtension: "jsbundle")!
        
        // Development JS bundle location url
        // let jsCodeLocation = URL(string: "http://localhost:8081/index.bundle?platform=ios")
        let textValueForRNApp = valueForReactNativeApp.text
        let mockData:NSDictionary = ["nativeParameter": textValueForRNApp!]

        let rootView = RCTRootView(
            bundleURL: jsCodeLocation,
            moduleName: "RNTestScreen",
            initialProperties: mockData as [NSObject : AnyObject],
            launchOptions: nil
        )
        let vc = UIViewController()
        vc.view = rootView
        vc.modalPresentationStyle = .fullScreen
        self.present(vc, animated: true, completion: nil)
    }
    
    func dismissReactNativeApp() {
        self.dismiss(animated: true)
    }
}
```