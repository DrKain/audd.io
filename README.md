# audd.io

[![NPM](https://img.shields.io/npm/v/audd.io)](https://www.npmjs.com/package/audd.io) [![NPM](https://img.shields.io/npm/dt/audd.io)](https://www.npmjs.com/package/audd.io) [![NPM](https://img.shields.io/npm/types/audd.io)](https://www.npmjs.com/package/audd.io)
  
 **What is this?**
------------------
A NodeJS package used to interact with the music recognition API provided by [Audd.io](https://docs.audd.io/) in the easiest way possible.  
You can get an `api_token` for free at [https://dashboard.audd.io/](https://dashboard.audd.io/).  

#### Install  
```
npm install audd.io
```

#### Usage:   
```javascript
import { Audd } from 'audd.io';
const audd = new Audd('api_key');  

audd.fromURL('web.com/file.mp3').then(console.log);
```  
  
#### fromURL(url)  
The default API method. It's for the usual music recognition that works like Shazam.  
Attempt to match a song using an externally linked video or audio file.  
  
```javascript  
audd.fromURL('https://example.com/test.mp3').then((response) => {
    // response.result is null if no match is found
    const result = response.result;
    if (result) console.log(`That song is ${result.title} by ${result.artist}`);
    else console.log('Unable to match that song :(');
}, console.log);
```  
  
#### fromFile(file)  
The default API method. It's for the usual music recognition that works like Shazam.  
Attempt to match a song using a local video or audio file.  
```javascript  
audd.fromFile('path/to/file.mp3').then((response) => {
    const result = response.result;
    if (result) console.log(`That song is ${result.title} by ${result.artist}`);
    else console.log('Unable to match that song :(');
}, console.log);
```  
  
#### guessFromURL(url)  
The method for recognition by **humming/singing**. We can't guarantee any accuracy for this method.  
Attempt to guess a song using an externally linked url.  
  
```javascript
audd.guessFromURL('https://example.com/test.mp3').then((response) => {
    const result = response.result;
    if (result && result.count > 0) {
        result.list.map(item => console.log(`${item.title} by ${item.artist} (score: ${item.score})`))
    } else console.log('Unable to match any songs');
}, console.log);
```
  
#### guessFromFile(url)  
The method for recognition by **humming/singing**. We can't guarantee any accuracy for this method.  
Attempt to match a song using a local video or audio file.   
  
```javascript
audd.guessFromFile('path/to/file.mp3').then((response) => {
    const result = response.result;
    if (result && result.count > 0) {
        result.list.map(item => console.log(`${item.title} by ${item.artist} (score: ${item.score})`))
    } else console.log('Unable to match any songs');
}, console.log);
```
  
### Contributing  
Pull requests are appreciated and welcome, please make sure you run the lint script before submitting the PR.  
This package was made for personal use but I'd imagine it would be useful to other developers.