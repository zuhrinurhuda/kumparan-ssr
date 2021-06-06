# Redux Toolkit TypeScript Example

This example shows how to integrate Next.js with [Redux Toolkit](https://redux-toolkit.js.org).

The **Redux Toolkit** is a standardized way to write Redux logic (create actions and reducers, setup the store with some default middlewares like redux devtools extension). This example demonstrates each of these features with Next.js

## Deploy your own

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-redux-toolkit-typescript&project-name=with-redux-toolkit&repository-name=with-redux-toolkit)

## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npx create-next-app --example with-redux-toolkit-typescript with-redux-toolkit-app
# or
yarn create next-app --example with-redux-toolkit-typescript with-redux-toolkit-app
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

● User can view list of users                               /
  ● User can view the detail of each user                   /users/userId
● User can view list of posts of each user                  /users/userId/posts
  ● User can view the detail of each post and its comment   /users/userId/posts/postId
    ● User can add, edit and delete post                      
    ● User can add, edit and delete comment                   
● User can view list of albums of each user                 /users/userId/albums
  ● User can view list of photos from an album              /users/userId/albums/albumId
    ● User can view the detail of photo                     /users/userId/albums/photoId
