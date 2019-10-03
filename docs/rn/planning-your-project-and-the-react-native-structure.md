# Planning Your Project and the React Native Project Structure

## Understanding Components

React Native consists of `Components` which are like objects. As a result, it has a very distinctive file structure: 

```
| app.js  		 // This file is like the index.html of the React Native project, and is the starting point for the application
| /android		 // This directory has the Android project, and may need to be used when you need to configure something that can't be done in RN, such as permissions
| /assets  		 // This directory contains all of our global assets, such as stylesheets
| /ios    		 // This is just like the Android folder, but for iOS 
| /screens		 // This directory was created by us and has all of the screens that the user can go to.
	| /auth 	 // This directory contains the pages for the sign up and sign in screens
	| /navigation	 // This directory contains the components to allow for navigation
	| /primary	 // This part has the main components of the app
	| /uielements	 // This directory contains all of the custom elements that we use
| /node_modules 	 // This directory has all of the extensions for the app. It should be gitignored


```

## Planning the Pages of Your App

It is helpful to figure out what pages your app will need before starting. This helps you layout your project before you start. We had two basic groups: `primary` which has all of the main parts of the app and `auth` which handles the authentication procedures (log in, sign up).

## Designing Your App

After you figure out the pages, you need to design the front end of your app. I used Adobe Illustrator because I could easily extract the CSS from my design and import it into React Native. Your end result should look very similar to the one that you are working on, and the extract css form Illustrator is very helpful for this.

## Create your components

Creating your component can be done easily by following the [template in React Native documentation](https://facebook.github.io/react-native/docs/tutorial). 
