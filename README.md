# dot-matrix-react

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Procedure

    * **Shortcut:** Instead of adding those properties using a text editor; if I have `sed` installed on my system, I can add the properties by issuing the following shell commands:

    ```sh
    $ sed -i '5i\  "homepage": "https://arcostasi.github.io/dot-matrix-react",' ./package.json
    $ sed -i '15i\    "predeploy": "npm run build",' ./package.json
    $ sed -i '16i\    "deploy": "gh-pages -d build",' ./package.json
    ```

