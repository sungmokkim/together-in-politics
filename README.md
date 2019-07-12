# Together In Politics(모두의 정치)

Site URL : <https://togetherinpolitics.com>

## Introduction

This repository shares the source codes of a Web Site / Web Application named _Together In Politics_ (_모두의 정치_ in Korean).

_Together In Politics_ (_TIPS_) aims to show how Korean people on the internet think and feel about current Korean President Moon Jae-In.

_Together In Politics_ (_TIPS_) analyzes popular Korean internet communities to find out trends in public sentiments from teenagers to forties, which has been quite difficult to know until now.

_TIPS_ offers unique and diverse indicators to give insights regarding several aspects of Korean society such as approval ratings, the ratio of favorable responses on the president, and people's thoughts on feminism.

Sentiment data were collected from several Korean web sites (web communities) and no personal data were collected.

You can click [Here](https://togetherinpolitics.com) to take a look.

## Release Note - 0.3.3

* **0.3.3**
  * Improved & Fixed
    * Following were fixed or improved
      * Photo card on the main page
      * Navigation bar
      * Status card
  * Added
    * Meta tags for Search Engine Optimization were added
    
* 0.3.2
  * New 
    * Photo card on main page
      * A new photo card was added on main page
      * The photos change every 5 seconds
      * It also shows the current indicator of the community
  * Improved 
    * Now, users can open config button via clicking status component(status card)


* 0.3.1
  * New
    * Status
      * Each page now contains a status component
      * This component shows the current/default settings
  * Improved
    * Relative Mode
      * Relative mode now compares daily indicators to maximum values with the current filtering option 
    * Displaying daily indicators
      * Colors turn to gray if the current condition does not meet the current filtering option 
      * This will be active only when it is in relative mode
      

* 0.3
  * New
    * Freeboard
      * Freeboard has been added
      * Users can write any opinions and suggestions
    * Relative/Absolute mode
      * Users can choose a relative or absolute mode for daily indicators
      * This can give a different perspective when viewing daily indicators



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
