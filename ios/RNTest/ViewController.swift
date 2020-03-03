//
//  ViewController.swift
//  RNTest
//
//  Created by Julian Aiup on 07/02/2020.
//  Copyright © 2020 Julian Aiup. All rights reserved.
//

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
        // let jsCodeLocation = URL(string: "http://192.168.31.175:8081/index.bundle?platform=ios")
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
