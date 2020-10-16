# DevRant Bot
An NPM package to create DevRant Bots
![image](https://user-images.githubusercontent.com/17960677/96278822-9703a480-0ff3-11eb-804e-859ef31be175.png)
## How To Use
This Package can be used to create Bots which will act when someone mentions it.  
It can then Reply to that mention with some text or image.
```js
var dbot = require('devrant-bot');
(async function() {
await dbot.login("username","password");
var mentions = await dbot.get();
console.log(mentions);
})();
```
