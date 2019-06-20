# Together In Politics(모두의 정치)

Site URL : <https://togetherinpolitics.com>

## Introduction

This repository shares the source codes of a Web Site / Web Application named _Together In Politics_ (_모두의 정치_ in Korean).

_Together In Politics_ (_TIPS_ in short) aims to show how Korean people on the internet think and feel about current Korean President Moon Jae-In.

Sentiment data were collected from several Korean web sites (web communities) and no personal data were collected.

You can click [Here](https://togetherinpolitics.com) to take a look.

## Release Note - 0.1.1

- **0.1.1**
  - Improvements
    - Responsiveness of navigation bar was improved
      - Now it changes its layout based on the current viewport (no need to refresh)
  - Fixes
    - A bug that chart width does not take enough portion of the screen on some browsers was fixed

* 0.1
  - New + Improvement
    - Bubble Chart was added. This bubble chart shows how different Korean communities are placed in coordinates based on:
      - Anti-President Ratio
      - President Mention Ratio
      - Size of the community

## Tech Stacks

- Programming Languages

  - Javascript (Application and Server)
  - Python (Data Collecting and pre-processing)
  - HTML5 / CSS3 / SASS (Web Publishing)

- Front-End

  - React.js
  - Redux

- Back-End

  - Node.js
  - Express
  - Nginx
  - React.js(For server-side rendering)

- Database

  - MongoDB
  - MariaDB

- Devops
  - AWS

## How to Fork and Test

```
npm install
npm run start
```

## Disclaimer

For now (Jun 20th, 2019), we are not sharing the collected data or configuration settings of our database.
Thus, forking from this repository does not guarantee a fully functional web site. Configuration Settings are still needed.

We plan to share our data or guest database account in the future.
