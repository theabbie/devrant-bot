# DevRant Bot
An NPM package to create DevRant bots,   
Super easy to implement,  
Never care about implementation again, just focus on functionality.    
     
    

![image](https://user-images.githubusercontent.com/17960677/96278822-9703a480-0ff3-11eb-804e-859ef31be175.png)
## How To Use
This package can be used to create bots which will act when someone mentions it.  
It can then Reply to that mention with some text or image.
```js
var Bot = require('devrant-bot');

(async function() {
var bot = new Bot();
await bot.login("username","password");
var mentions = await bot.get();
console.log(mentions);
})();
```
Which produces,

```js
[
  {
    "rid": 2821893, //rant ID
    "cid": 3308364,  //comment ID
    "text": "some message", //Message
    "user": "theabbie",  //Username of user who called
    "time": 1603281044  //Timestamp of comment
    "rto": [{
       "id": 3307103,
       "text": "text",
       "time": 1603264598,
     },
     ...]
  },
  ...
]
```

To reply,

```js
(async function() {
var bot = new Bot();
await bot.login("username","password");
var mentions = await bot.get();
for (msg of mentions) {
  await bot.reply(msg.user,msg.rid,"reply"[,image_url]);
}
})();
```

This makes bot development really easy and you can safely focus only on the functionality rather than the implementation of the DevRant bot.

## Contributing

Thank you for your interest in contributing, If you feel like there's something missing or any new feature can be added, just create a PR and I will see the rest.

## Help

You can contact me on social media, Everything about me can be found [here](https://theabbie.github.io)

## Installation

### Requirements

* Node.Js installed

### Dev Dependencies

* Axios
* RantScript

## Credits

* [RantScript](https://github.com/leahlundqvist/RantScript/) For Creating an excellent Wrapper For the DevRant API.

## Contact

Contact me anywhere, just visit [my portfolio](https://theabbie.github.io)

## License

This project is licensed under MIT License, See [LICENSE](/LICENSE) for more information
