# Kumparan SSR - Social media dashboard

Social media dashboard using SSR with this API [`https://jsonplaceholder.typicode.com`](https://jsonplaceholder.typicode.com)

## Installation

Clone the repository, install the dependencies and devDependencies and start the server.

```sh
git clone https://github.com/zuhrinurhuda/kumparan-ssr.git
cd kumparan-ssr
yarn
yarn dev
```

## Demo

Demo link [`https://kumparan-ssr.vercel.app`](https://kumparan-ssr.vercel.app/users/1)
This demo is deployed to the cloud using [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

## Routes
| Feature | Page | Path |
| ------ | ------ | ------ |
| User can view list of users | Home page (user list) | `/` |
| User can view list of posts of each user | User detail page | `/users/:userId` |
| User can view the detail of each post and its comment | Post detail page | `/users/:userId/posts/:postId` |
| User can add, edit and delete post | User detail page | |
| User can add, edit and delete comment | Post detail page | |
| User can view list of albums of each user | User detail page | `/users/:userId` |
| User can view list of photos from an album | Album detail page | `/users/:userId/albums/:albumId` |
| User can view the detail of photo | Photo detail page | `/users/:userId/albums/:albumId/photos/:photoId` |
