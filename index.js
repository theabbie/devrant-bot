var rs = require("rantscript");
var axios = require("axios");
var fs = require("fs");

module.exports = class Bot {
  constructor() {}
  
  async login(username,password) {
    try {
      this.username = username;
      var token = await rs.login(username,password);
      this.token = token["auth_token"];
      return this.token;
    }
    catch (e) {
      console.log(e.message);
    }
  }
  
  async get() {
    try {
       var bots = (await axios("https://raw.githubusercontent.com/C0D4-101/devrant-bots/master/bots.json")).data.map(b=>b.name);
       var notifs = (await rs.notifications(this.token)).data.items;
       var ums = [];
       let is_boolean = true;
       for (var notif of notifs) {
         if (notif.type=="comment_mention" && notif.read==0) {
           var comments = (await rs.rant(notif["rant_id"])).comments;
           for (var i in comments) {
             if (comments[i].id==notif["comment_id"]) {
               if(bots.indexOf(comments[i]["user_username"])==-1) is_boolean = false;
               var rto = comments.slice(0,i).filter(c => c["user_username"]==this.username).map(c=>{return {text: c.body, id: c.id, time: c["created_time"]}});
               ums.push({
                 rid: notif["rant_id"],
                 cid: notif["comment_id"],
                 is_bot: is_boolean,
                 text: comments[i].body.split("@"+this.username).reverse()[0],
                 user: comments[i]["user_username"],
                 rto: rto,
                 time: comments[i]["created_time"]
               });
             }
           }
         }
       }
       await rs.clearNotifications(this.token);
       return ums;
    }
    catch (e) {
      console.log(e.message);
    }
  }
  
  async reply(username,rid,text,img) {
    if (img) {
      await this.load(img);
      await rs.postComment("@"+username+" "+text,rid,this.token,"img.jpg");
    }
    else await rs.postComment("@"+username+" "+text,rid,this.token);
  }
  
  async load(url) {  
    const writer = fs.createWriteStream("img.jpg");
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream'
    })
    response.data.pipe(writer)
    return new Promise((resolve, reject) => {
      writer.on('finish', resolve)
      writer.on('error', reject)
    })
  }
}
