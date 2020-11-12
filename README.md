# Park-depot Challenge

## Technologies

- React
- Redux for State Management
- React-Router
- Emotion Library for Styled Components
- Ant Design Framework
- Node.js
- Express.js
- TypeOrm
- Postgres
- Apollo Client
- Graphql
- TypeScript
- Docker

The project relies heavily on using the react hooks including the new redux hooks and the router hooks as they have a significant improvement in performance.

---

## Getting Started

Allow me to walk you through the project.

**Step: 1** Run the following command to clone the repository:

`git clone https://github.com/mhmdbehairy/parkdepot-challenge.git`

**Step: 2** Navigate to the project's directory:

`cd parkdepot-challenge`

Now, there are two ways of getting things up and running. I will show you both below:

**Step: 3** Using docker you can type the following command in the root directoty:

`docker-compose up -d --build`

**Step: 4** Visit: [http://localhost:3000](http://localhost:3000). Now you are good to go.

The backend can be reached on [http://localhost:4000/graphql](http://localhost:4000/graphql)

---

Now, if you need to run it without docker, stop at step 2 and follow from bellow.

Before we proceed, make sure to take down the docker containers in order not to conflict with the next steps.

**Step: 3** Navigate to the server directory.

`cd server`

**Step: 4** Start the express server.

`yarn start`

**Step: 5** Navigate to the client directory.

`../client`

**Step: 6** Start the react application.

`yarn start`

Voilà! you are up and running again.

---

## Quick Guide

For the sake of simplicity, I have reated a script that runs automatically to insert some data into the database.

So, you can use the following credentials to try out users with different permissions:

1. email: manager@gmail.com --- password: 123456
2. email: employee@gmail.com --- password: 123456
3. email: trainee@gmail.com --- password: 123456

In case things went wrong and you weren't able to login, you can use the following to run the seeding script.

**Step: 1** Navigate to the server directory

**Step: 2** Use the following command

`yarn seed`

Note that this method only works on local not with docker. I still got you covered if worse get to worst. But you're gonna have to do this manually. Still better than getting stuck right?

**Step: 1** Go to [http://localhost:4000/graphql](http://localhost:4000/graphql)

**Step: 2** In the editor you can enter the following:

```json
mutation {
  register(
    email: "manager@gmail.com"
    password: "123456"
    firstName: "John"
    lastName: "Doe"
    permissions: ["VIEW_ITEMS", "CREATE_ITEM"]
  )
}
```

Unfortunately, due to time limitations, permissions are a column in the users table not in a separate related one. I know that's not how it's supposed to be, but the task was long.

So, the permissions you wanna be using are:

```json
[ "VIEW_ITEMS", "CREATE_ITEM", "UPDATE_ITEM", "DELETE_ITEM]
```

Depending on what you pick from the list above, some features may or may not be available.

But, on the bright side you hopefully won't need to do any manual work. And the provided users have the following permissions:

1. manager: `[ "VIEW_ITEMS", "CREATE_ITEM", "UPDATE_ITEM", "DELETE_ITEM]`
2. employee: `[ "VIEW_ITEMS", "UPDATE_ITEM"]`
3. trainee: `[VIEW_ITEMS]`

At this point, things get easier. Just go with the flow. If anything came up, feel free to contact me for any additional information.
