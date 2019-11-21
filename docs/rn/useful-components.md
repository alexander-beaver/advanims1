# Useful Components

Some components can be super helpful for you to build your app. These are pre-built and allow you to easily layout UI and create a functional, efficient UX for your users.

## View

A `View` in React is like a `div` in HTML: it is the basis of content grouping and organization. We use Views extensively to group similar components and create logical parts of the page.

## TouchableOpacity

A `TouchableOpacity` is like a button. Unlike the standard React-Native `Button`, a `TouchableOpacity` can have styles applied.

> **Important Note**
>
> Any reference to a `<Button />` in our code is referring to our `Button` class, which contains a styled `TouchableOpacity`. We do not use any of the standard RN `Button` objects anywhere in our code.
>
> The `Button` class that we wrote can be found at `~/path/to/repo/frontend/AdvAnim/screens/uielements/button.js`

## Text

`Text` allows you to have text inside your app. Unlike HTML, where text can exist outside of one of the following: `p, h1-6, blockquote, etc.`, *all text in React Native MUST exist inside of a `Text` tag*

## Image

`Image` tags are exactly like an `img` in HTML. They can display an image given a URL. 
