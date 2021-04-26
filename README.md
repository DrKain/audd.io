# audd.io

[![NPM](https://img.shields.io/npm/v/audd.io)](https://www.npmjs.com/package/audd.io) [![NPM](https://img.shields.io/npm/dt/audd.io)](https://www.npmjs.com/package/audd.io) [![NPM](https://img.shields.io/npm/types/audd.io)](https://www.npmjs.com/package/audd.io)

## **What is this?**

A NodeJS package used to interact with the music recognition API provided by [Audd.io](https://docs.audd.io/) in the easiest way possible.  
You can get an `api_token` for free at [https://dashboard.audd.io/](https://dashboard.audd.io/).

### Install

```
npm install audd.io
```

### Usage

```javascript
import { Audd } from 'audd.io';
// const Audd = require('audd.io').Audd;

const audd = new Audd('api_key');

audd.recognize.fromURL('https://example.com/test.mp3');
// or
audd.recognize.fromFile('test.mp3');
```

### Documentation:

Each endpoint contains `fromFile` and `fromURL`, they return different information based on what endpoint you use.

[audd.enterprise](https://github.com/DrKain/audd.io/wiki/Enterprise)  
[audd.recognize](https://github.com/DrKain/audd.io/wiki/Recognize)  
[audd.recognizeWithOffset](https://github.com/DrKain/audd.io/wiki/RecognizeWithOffset)
