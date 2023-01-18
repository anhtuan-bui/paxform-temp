# Getting Started

For collaborators, install
* [Git CLI](https://git-scm.com/downloads)
* [Nodejs](https://nodejs.org/en/) - newst LTS version
* [Yarn](https://classic.yarnpkg.com/en/) - package manager

## Installation

To install the project:

1. Create a new folder named e.g: "paxfolio"
2. Open Git Bash at the folder "paxfolio" - right click on the folder, look for Open Git Bash...
3. Type command `git init` to initiate git folder
4. Type command `git remote add origin https://github.com/anhtuan-bui/paxfolio.git` to set name for the repository
5. Type command `git pull origin master` to pull files in the repository to your folder at "paxforlio"
6. Type command `cd paxfolio` to open the folder
7. Type command `yarn install` to gather dependencies for the projects.
8. After finishing installation, type command `yarn start` to view the website locally.

## Available Scripts using Yarn

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `public_html` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Important notes for macOS
### `yarn build-mac`

Builds the app for production to the `public_html` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Chaging information of the website

Some of the information in this code is hard-coded, while other parts are pulled from a Wordpress Rest API. If you want to make changes to any of this information, you can use the **Search** function in Visual Studio Code (accessed with the shortcut `ctrl + shift + f` in Windows or `command + shift + f` on MacOS) to locate it in the code. If you can't find it in the code, it's likely pulled from the API, so you will need to look for it there. 
