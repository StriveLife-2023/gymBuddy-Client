# Jym Brah Fitness Site

Jym Brah is a fitness tracker and social media site that lets gym goers learn new workouts, ask AI for recommendations, and share their gains with friends.

## Table of Contents

1. [Project Description](#project-description)
2. [Technologies Used](#technologies-used)
3. [Demo](#demo)
3. [How to Install and Run this Project](#how-to-install-and-run-this-project)
4. [Future Enchancements](#future-enhancements)

# Project Description

We created this project from scratch over the course of a week as part of the Hack Reactor Software Engineering Immersive. We were given a “client” that requested that we build a fitness site where gym goers can track their workouts, interact with friends via a social media feed, and receive recommendations from AI.

# Technologies Used

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![DaisyUI](https://img.shields.io/badge/daisyui-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

# Demo

## Login and Auth
coming soon . . . .
## Workout Planner
coming soon . . . .
## Progress Tracker
coming soon . . . .
## Chat
coming soon . . . .
## Social Feed
coming soon . . . .

# How to Install and Run this Project

1. Clone the repo to your computer in your desired folder

`git clone git@github.com:Sirius-Sploosh/bo-client.git`

2. Install all dependencies by running

`npm install`

3. It's time to start your development server! Run

`npm run dev`

in your command line, and check out the project at localhost:5173 in your browser. Have fun!

# Future Enhancements

Given the extremely tight turnaround we faced and the high standards we hold for ourselves, there are a few things we would love to improve when time allows. Some of these include:

 * Robust unit testing
 * Create cohesive styling across pages
 * Integrate video chat with user messaging

# Ticketing Guidelines
1. Always make or claim a ticket before doing any work
2. Ticket naming pattern: `[scope]: [feature/task]`
   - Ticket scopes: `global`, `auth`, `chat`, `planner`, `social`, `tracker`
3. Try to create tickets with a clear "done" condition - use a checklist if applicable
4. Add yourself to a ticket to claim it
5. Before starting work, move the ticket to the "In progress" board
6. After submitting a pull request, move the ticket to the "Staged for review" board
7. If changes are requested, move the ticket to the "Changes requested" board
8. After making changes, move the ticket back to the "Staged for review" board

# Git Workflow
1. Claim a ticket
2. Update your local master branch, and then create a new feature branch
   - `git checkout master`
   - `git pull`
   - `git checkout -b [feature-branch]`
4. Make changes (try to keep them within the scope of your ticket)
   - `git add .`
   - `git commit`
5. Before making a pull request, rebase your feature branch on the upstream master to avoid conflicts
   - `git checkout master`
   - `git pull`
   - `git checkout [feature-branch]`
   - `git rebase master`
   - Run your code again to confirm that it still functions
6. Make a pull request
   - Use the name of your trello ticket in your PR title and move the ticket to the "Staged for review" list
   - Put any additional notes (potential conflicts, scoping comments, compatibility issues) in the PR body

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tson', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
