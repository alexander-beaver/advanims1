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

## Adding a Component

Any component (such as a UI element or page) is created with the same basic template. The template is available [on the gist](https://gist.github.com/alexander-beaver/5af7a8df45b4f01260704635ad2cef12#file-componenttemplate-js) or as seen below

*ComponentTemplate.js*
```javascript 
import React from 'react';
import {Component} from 'react';

import {
    View,
    
} from 'react-native';

var globalStyles = require('../../assets/styles');

export class ComponentTemplate extends Component{
    constructor(props){
        super(props);
        this.state = {
            
        }

    }
    
    render(){
        return(
            <View>
                
            </View>

        );
    }

}
```

Anything that you want to render goes inside of the `render()` function and can include other components. The syntax for the `render()` function is very similar to HTML.


