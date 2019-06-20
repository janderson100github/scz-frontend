#REACT APP SETUP

## INITIALIZE
```
mkdir front-end && cd front-end
mkdir -p src/{actions,components,reducers,styles,utils}
npm init -y
```

## WEBPACK init
```
npm i webpack --save-dev
npm i webpack-cli --save-dev
npm i webpack-dev-server --save-dev
```

`package.json`
```
"scripts": {
  "build": "webpack --mode production"
}
```

### bundling with html
```
npm i html-webpack-plugin html-loader --save-dev
```

### index.js
Webpack expects the entry point to be ./src/index.js
```
touch src/index.js
```


## BABEL
A transpiler from ES6 to ES5 (which is supported by all modern browsers)

```
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
```

Configure `transform-class-properties`

This let's you to not have to bind variables and functions to this inside the constructor.
[https://medium.com/@jacobworrel/babels-transform-class-properties-plugin-how-it-works-and-what-it-means-for-your-react-apps-6983539ffc22]()


### transform-class-properties

```
npm install --save-dev babel-plugin-transform-class-properties
```

```
touch .babelrc
```

### Babel: Object Rest Spread
Install Object rest spread transform to avoid a SyntaxError Unexpected token when using the object spread operator in Babel:
[https://www.valentinog.com/blog/react-redux-tutorial-beginners/]()
[https://babeljs.io/docs/en/babel-plugin-proposal-object-rest-spread]()


```
npm install --save-dev @babel/plugin-proposal-object-rest-spread
```

`.babelrc`
```
{
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "plugins": ["transform-class-properties", "@babel/plugin-proposal-object-rest-spread"]
}
```

```
touch webpack.config.js
```

```
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
```

For every file with a .js or .jsx extension Webpack pipes the code through babel-loader for transforming ES6 down to ES5.


## React
```
npm i react react-dom --save-dev
```

## WEBPACK continued
`webpack.config.js`

```
const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
```

Also, tell webpack to identify .jsx extensions too:
`webpack.config.js`
```
resolve: {
    extensions: ['.js', '.jsx']
},
```

### index.html
```
touch ./src/index.html
```

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <title>Credit Title</title>
  </head>
  <body>
    <div id="react-app-container"></div>
  </body>
</html>
```

### index.js

To make the application we now turn to `index.js`

```
import init from "./AppInitializer";
 
init("react-app-container");

```


### AppInitializer

```
touch AppInitializer.js
```

```
import App from './App';

const render = (elementId) => {
  ReactDOM.render(
    React.createElement(App, { }),
    document.getElementById(elementId)
  );
};

const init = elementId => {
  window.dataLayer = window.dataLayer || [];
  render(elementId);
};

export default {
  init
};

```

### App
`src/App.jsx`
```
import React from "react";
 
const App = ({}) => (
  <div>Hello World</div>
);
 

export default App;

```

## Test
```
npm run build
```

### Test the application
Open in your browser the created file `./dist/index.html`, it should read "Hello World" or whatever else you have in your `App.jsx`

### Hot deployment 
You've already installed the dev server with
```
npm i webpack-dev-server --save-dev
```
Now add to `package.json`
```
    "scripts": {
      "start": "webpack-dev-server --open --mode development",
      "build": "webpack"
    }

```
and run
```
npm start
```
make a change in `App.jsx` to say "Hello Wonderful World", and see the change immediately in your browser.

