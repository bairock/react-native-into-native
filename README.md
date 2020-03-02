Open terminal, go to path of project and Run:

```
yarn install
yarn start
```

And open the native project that you would like to test in an IDE (Android Studio or Xcode).

(iOS) For production Run - just open /ios/RNTest.xcworkspace file in Xcode and Run project.
If you want to rebuild application Run:

```
yarn build:ios
```

And copy main.jsbundle file to main app in Xcode inside project folder.
Also add files from /ios/assets to project.

