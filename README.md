# Fullstack GraphQL

> Learn how to use GraphQL with Node and React

This course comes with some [slides](https://docs.google.com/presentation/d/1IrGA4PtUEZPVDTBg5_WCMmUapElbFBgLwfSBAp8ft1g/edit?usp=sharing)

## What you'll need

- Node version >= 6

## Solutions

The solution branch has the completed course fo reference. There is no one way to finish this course.
`git checkout solution`

To make this work

1.  ```bash
    rm -rf yarn.lock package-lock.json node_modules
    ```

2.  in `.babelrc`

    ```diff
    + "presets": ["@babel/env", "@babel/react"],
    -  "presets": ["env", "react"],
    ```

3.  in `package.json`

    ```diff
    + "resolutions": {
    +   "@babel/preset-env": "7.13.8"
    + },
    ```

4.  ```bash
    yarn install
    yarn app
    ```
