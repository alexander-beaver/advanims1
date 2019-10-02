# Introduction to React Native

## Setting up your development environment

To get started with your development environment, you will need:

- An editor (I used WebStorm but VS Code also works well)
- Android Studio
- Android SDK
- Android CLI Tools
- A version of the JDK and JRE compatible with your version of the Android SDk
- The `react-native-cli`

### Setting Up the Android SDK and Creating a Project
> Facebook as a well-documented guide on setting up your development environment [on their website](https://facebook.github.io/react-native/docs/getting-started)
 
I followed the guide and only had a couple of issues. My main one was that I had the wrong version of Java in my `$PATH`, but once I got that resolved, it seemed to have worked with little issues.

The other thing that took a fair amount of time was the issues regarding [hardware acceleration in Android Studio](https://developer.android.com/studio/run/emulator-acceleration). It seemed to be a Linux driver issue

### Configuring a Device

Configuring a device should be fairly straightforward. You need to [enable developer options](https://developer.android.com/studio/debug/dev-options) and then [enable USB debugging](https://developer.android.com/studio/debug/dev-options#debugging).

#### Android Versions
In Android, more so than iOS, build version is very important. I had some permissions issue since I was using an old device, so I needed to update, but my device (a 2013 Nexus 7) didn't support newer versions. As a result, I [https://www.androidauthority.com/lineageos-install-guide-893303/](loaded a LineageOS Oreo build) onto my tablet. My device didn't accept OpenGApps and would bootloop if I did, so I had to reinstall LineageOS four times. I was lucky that my device is relatively open. Devices from Samsung, LG, TCL/BlackberryMobile, and others are less easy to install stuff, and it will end up being a huge pain if you need to do so.

### iOS

iOS is much more difficult to try to build for. You need a MacOS device and signatures. I do not know if RN has anything to help in the signing process since I am only using Android for debugging. I would avoid using iOS as a build target unless absolutely necessary.

> Deploying to Google Play is also much easier than the App Store. I would highly recommend that people not even attempt to do App Store deployment.  
