var rs = require("rantscript");
var axios = require("axios");

module.exports = class Bot {
  constructor() {}

  login(username,password) {
    rs.login(username,password).then(token => {
      this.username = username;
      this.token = token["access_token"];
      return Promise.resolve(this.token);
    }).catch(e => {
      return Promise.reject(e);
    });;
  }
  
  test() {
    console.log("working");
  }

  get() {
    axios("https://gist.githubusercontent.com/C0D4-101/f1a50ad4ecf0730550acf8d5d383f63f/raw/d595bd1a2a310d1f821384db77cff0e02e2c85f4/devrant-bot-list.csv").then(list => {
      var bots = list.data.split(",");
      rs.notifications(this.token).then(notifs => {
        var ums = [];
        for (var notif of notifs.data.items) {
          if (notif.type=="comment_mention" && notif.read==0) {
	    devRant.rant(notif["rant_id"],this.token).then(rant => {
              var cts = rant.comments;
	      for (var ct of cts) {
                ums.push({
                  id: notif["rant_id"],
		  text: ct.body.split("@"+this.username).reverse()[0],
	          user: ct["user_username"]
		});
	      }
	    });
          }
        }
      });
    });
  }
}
