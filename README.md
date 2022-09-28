<h1 align="center">Nest.JS Articles System</h1>

## Description:

The goal of the project is to create articles by users and comment or like them after they create an account for them in the application and confirm their account by email.  
Every person who created an article, comment or like can only edit or delete it whenever he wants.


## To run this project

`Step 1` : To use this project must install [Node.js](https://nodejs.org/en/) and [Mysql](https://www.mysql.com/downloads/) as database Then Download the source code

```
git clone https://github.com/MohamedAlabasy/Nest.JS-Articles-System.git
```

`Step 2` : Enter the project file then install package

```
npm i
```
`Step 3` : Create a database called `articles_system` , then to run server on watch mode :
```
npm run start:dev
```


<h3 align="center">To help you understand the project</h3>

## Folder Structure

```bash
├── src
│   ├── controllers
│   │   ├── adsController.ts => `for handel ADS function`
│   │   └── authController.ts => `for handel authentication function`
│   │
│   │
│   ├── middleware
│   │   ├── morganMiddleware.ts => `for log url, method and statue of requests`
│   │   │── notFoundMiddleware.ts => `for not Found Middleware`
│   │   └── errorMiddleware.ts => `for error Middleware`
│   │
│   │
│   ├── models
│   │   ├── emailVerificationModels.ts => `for handel email verification Models`
│   │   │── resetPasswordModels.ts => `for handel reset password Models`
│   │   │── adsModels.ts => `for handel ADS Models`
│   │   └── userModels.ts => `for handel user Models`
│   │
│   │
│   ├── Public
│   │   └── assets => `contains ADS (photos and videos)`
│   │
│   │
│   ├── routes
│   │   ├── api
│   │   │   │── authRouter.ts => `for handel authentication route`
│   │   │   └── adsRouter.ts => `for handel ADS route`
│   │   └── routes.ts => `import all routes and exports it to index`
│   │
│   │
│   ├── tests => `for testing purposes`
│   │   ├── helpers
│   │   │   └── reporter.ts
│   │   └── indexSpec.ts => `for testing endpoint api`
│   │
│   │
│   ├── utilities
│   │   ├── helpers
│   │   │   │── emailVerification.ts => `for send email message`
│   │   │   └── emailMessagesDesign.ts => `for email messages design ( HTML & CSS )`
│   │   │── checkTokens.ts => `for Request check Tokens`
│   │   └── validateRequest.ts => `for validate Request`
│   │
│   │
│   └── index.ts => `to run the server`
└──
```

## DataBase ERD

<p align="center">
   <img src="https://user-images.githubusercontent.com/93389016/192885498-a6b67fc6-d45c-4227-8b59-a07dffa6889a.jpg" alt="Build Status">
</p>


`Step 4` : Open [postman](https://www.postman.com/downloads/) and import : [API Collation](https://github.com/MohamedAlabasy/Node.JS-ADS-System/blob/main/api_collection.json) You will find it in the project file.

### After completing the registration as a new user, you must go to your email to confirm the email through the code sent to you

   <img src="https://user-images.githubusercontent.com/93389016/192886872-2c8e9c28-f0a0-4fca-ac30-77f469bb119a.png" alt="Build Status">
   <img src="https://user-images.githubusercontent.com/93389016/192886906-3bc7efe9-c79e-4379-b502-5c6ad117592c.png" alt="Build Status">
</p>

<hr>

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```
<hr>

Here are the [Command](https://github.com/MohamedAlabasy/Node.JS-ADS-System/blob/main/command.txt) that were used in the project, You will find it in the project file.
