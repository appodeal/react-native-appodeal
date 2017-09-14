
# react-native-appodeal

## Getting started

`$ npm install react-native-appodeal --save`

### Mostly automatic installation

`$ react-native link react-native-appodeal`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-appodeal` and add `RNAppodeal.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNAppodeal.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNAppodealPackage;` to the imports at the top of the file
  - Add `new RNAppodealPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-appodeal'
  	project(':react-native-appodeal').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-appodeal/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-appodeal')
  	```


## Usage
```javascript
import RNAppodeal from 'react-native-appodeal';

// TODO: What to do with the module?
RNAppodeal;
```
  