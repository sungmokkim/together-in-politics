# Together In Politics(모두의 정치)

Site URL : <https://togetherinpolitics.com>

## Introduction

This repository shares the source codes of a Web Site / Web Application named _Together In Politics_ (_모두의 정치_ in Korean).

_Together In Politics_ (_TIPS_) aims to show how Korean people on the internet think and feel about current Korean President Moon Jae-In.

_Together In Politics_ (_TIPS_) analyzes popular Korean internet communities to find out trends in public sentiments from teenagers to forties, which has been quite difficult to know until now.

_TIPS_ offers unique and diverse indicators to give insights regarding several aspects of Korean society such as approval ratings, the ratio of favorable responses on the president, and people's thoughts on feminism.

Sentiment data were collected from several Korean web sites (web communities) and no personal data were collected.

You can click [Here](https://togetherinpolitics.com) to take a look.

## Release Note - 0.2.1

* **0.2.1**
  * New
    * Line Chart
      * Users can choose multiple indicators to display at the same time
      * Instead of showing only one indicator at the same time, the line graph now can show multiple indicators at the same time
    * Keywords Page
      * Users can see keywords based on a specific indicator
      * In the previous version, keywords were shown only based on anti-approval rate 
    * Others
      * New indicator was added
        * This indicator's value goes up when a problematic incident occurs
      * A indicator meter (gauge) bar was added
        * This meter bar illustrates how good or bad the current value is

* 0.2
  * New
      * Keywords Page was added
        * this page shows important keywords of each community based on anti-approval rate of the president
        * there are also options to set range of dates and filtering setting
      * About page was added
      * New indicator was added

    * Changes & Improvements
      * Ranking section was moved to a separate page
      * Some of fetched data now come from MongoDB (previously from MariaDB)
        * this process is still on going(some datasets still come from MariaDB)
      * Refactored some codes
        * it is still on going

## Tech Stacks

* Programming Languages
  * Javascript (Application and Server)
  * Python (Data Collecting and pre-processing)
  * HTML5 / CSS3 / SASS (Web Publishing)

* Front-End
  * React.js
  * Redux

* Back-End
  * Node.js
  * Express
  * Nginx
  * React.js(For server-side rendering)

* Database
  * MongoDB
  * MariaDB

* Devops
  * AWS

## How to Fork and Test

```
npm install
npm run start
```

## Disclaimer

For now (Jun 20th, 2019), we are not sharing the collected data or configuration settings of our database.
Thus, forking from this repository does not guarantee a fully functional web site. Configuration Settings are still needed.

We plan to share our data or guest database account in the future.
