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

const audd = new Audd('api_key');

audd.fromURL('https://audd.tech/example1.mp3').then((res) => {
    if (res.result) {
        console.log(res.result.title + ' by ' + res.result.artist);
    }
});
```

### Wiki:

Full information with example responses can be found in the wiki:

Documentation for: [Enterprise Accounts](https://github.com/DrKain/audd.io/wiki/Enterprise)  
Documentation for: [Free/Trial Accounts](https://github.com/DrKain/audd.io/wiki/Free-Trial)
