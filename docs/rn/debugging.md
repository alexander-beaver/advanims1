# Downloading to Your Device and React Native Debugging

In order to make good use of your app, you need to be able to test it! There are two fundamental ways to test. Those are:

- Simulator (running on an Android or iOS [mac only] simulator built into your PC)
- Real Device (connecting to a device using a cable to run it on the device physically)

## iOS vs. Android

Here is where the many annoyances with iOS start to show up.

> **_You can only test or deploy for iOS using a Mac_**

If you use Windows or Linux, you cannot build an app for iOS, regardless of whether it is for a single test install or building for the App Store. 

If you are developing on Windows or Linux, your only option for debugging is to use Android. You can use either on MacOS.

Keep in mind that if you (like me) are developing on a platform other than MacOS but primarily use an iPhone, you need to either use the Android Simulator or an Android device.

## Using the Android Simulator

The Android Simulator is included with Android Studio. You can open up a simulator without creating a new project. Since the way to open simulators may change over time, it is worth googling to figure out how to open it.

### What Device Should I Use?

You should use the latest Google Device on the latest API Level that is not in Beta in order to develop on a simulator.

> For the majority of 2020, the latest device from Google will be the Pixel 4 or Pixel 4 XL on Android 10 (API Level 29).
>
> During 2020, Google may also assign API Level 30 to Android 10. If API Level 30 is assigned to Android 10 (and the build is out of beta) you should use that

If the latest Android on the latest Pixel doesn't work, try moving the API level back and trying again. Try this once or twice and if it still doesn't work, switch to an older device. Small rendering issues (such as an improperly rendering status bar on the Pixel 3 XL) probably isn't worth going back a generation for.

### Running the App

To run the app, you need to run a build server and then build for android.

To run the build server, navigate to your project directory and enter
```
react-native start
```

This will start the build server.

> **WARNING**
>
> While you are developing your app, keep the build server open and running. Do not exit the process or the build server will stop.
>
> Any other commands that you need to run should be done in another window

To build and run on the simulator, run on a new terminal

```
react-native run-android
```

The same command can be run if you have an Android device attached

## Using the iOS Simulator

To run in the iOS Simulator, you can use the build server with
```
react-native run-ios
```
### Running on an iOS Device

Running on an iOS device is less simple. The easiest way is to open up the project in XCode and run from there.