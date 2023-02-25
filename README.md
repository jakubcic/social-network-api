# Social Network API
[![MIT License badge](https://img.shields.io/badge/license-MIT-yellow.svg)](https://choosealicense.com/licenses/mit/)

## Table of Contents

- [Description](#description)
- [Installation](#installation)
    + [Prerequisites](#prerequisites)
    + [How to install](#how-to-install)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)


## Description
This is a API that serves as a backend for a social network. In this social network, users can post thoughts and other users can post reactions to those thoughts. Users can also add one another as friends. The API exposes the following endpoints and supports the listed HTTP methods:

| Endpoint              | Supported Methods |
|-----------------------|-------------------|
| `/api/thoughts`     | GET, POST         |
| `/api/thoughts/:id` | GET, PUT, DELETE  |
| `/api/users/`           | GET, POST         |
| `/api/users/:id`           | GET, PUT, DELETE |
| `/api/thoughts/:id/reactions`       | POST  |
| `/api/thoughts/:id/reactions/:reactionId`       | DELETE  |
| `/api/users/:id/friends/:friendId`   | POST, DELETE  |

## Installation
### Prerequisites
If you want to run this application locally, you must have **node.js** installed. I highly recommend using [**nvm**](https://github.com/nvm-sh/nvm) (node version manager) to manage your node.js installation.
<br>

This application is based on **node v16.18.1**.
You must also have a local MongoDB server installed. You can [use homebrew to install it on macOS](https://brew.sh/). Install homebrew if you don't have it already, then in a terminal run the following:
```
brew install mongodb-community
```
Check if your MongoDB server is running:
```
brew services info mongodb-community
```
If not, run:
```
brew services start mongodb-community
```


### How to install
After you ensure that you have **node.js** and **MongoDB** installed you can simply clone this repositry:
```
git clone git@github.com:jakubcic/social-network-api.git
```

Then in your terminal navigate to the root of the **social-network-api** directory and run:
```
npm install
```

## Usage
Once you have everything installed, including the dependencies, you can seed the database and start the server. First we'll seed the database. In our **package.json** we've configured a few scripts. One of them is `seed`. You can run the following to call the seed script **utils/seed.js**:
```
npm run seed
```
Now that we're set up with the database we can run the server (and start calling the API endpoints!).
```
npm run start
```
<br>

Here's a video demo showcasing all the possible API calls:



https://user-images.githubusercontent.com/39972418/219845113-735991a4-d7e8-4a92-9a1f-60a9aefa8292.mp4



## Credits
### Dependencies
This API is built with the following technologies:
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

## License
This application is covered under the [MIT License](https://choosealicense.com/licenses/mit/).


