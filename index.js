const Eris = require("eris");
const bot = new Eris("TOKEN", {intents: ["allPrivileged", "allNonPrivileged"]});

const Wasteful = require("wastefuldb");
const db = new Wasteful({serial: true, path: `${__dirname}/data`});

const fetch = require("node-fetch");

bot.on("ready", async() => {
    console.log("Ready! Monitoring cheesestick.com...");
})

bot.on('interactionCreate', async(interaction) => {
    if(interaction instanceof Eris.CommandInteraction) {
        try {
            switch(interaction.data.name) {
                case "check":
                    fetch("http://svcs.myregisteredsite.com/svcs/increment_page_counter.jsp?obpp=blDe2trOXurEzlraytTKxObuWN5W7lrm6sTiaGRkZm5i&type=e&cid=1186333767&partner=inldspear", {method: "GET", headers: { "Content-Type": "text/javascript"}}).then(res => res.text()).then(async(msg) => {
                        let _text, _final = []    
                        _text = msg.toString().trim().split("document.write")
                        _text.shift();
                        _text.shift();
                        _text.pop();
                        try {
                        _text.forEach(number => {
                            number = number.slice(number.indexOf("counter_e_")+10, number.indexOf(".gif"));
                             _final.push(number);
                        })
                        }catch(err) {
                            console.log(err);
                        }
                        console.log(_final);
                        _final = _final.join("");
                          await interaction.createMessage({
                              embed: {
                                  timestamp: new Date(),
                                  title: "cheesestick.com Observation",
                                  description: `~\`${_final}\` views`,
                                  color: 0xffac52
                              }
                          })
                        
                      })
                break;
            }
        }catch(err) {
            return console.log(err);
        }
    }
})

function log(string) {
    try {
      console.log(string);
    }catch(err) {
      throw err;
    }
  }
  
setInterval(async() => {
    try {
    fetch("http://svcs.myregisteredsite.com/svcs/increment_page_counter.jsp?obpp=blDe2trOXurEzlraytTKxObuWN5W7lrm6sTiaGRkZm5i&type=e&cid=1186333767&partner=inldspear", {method: "GET", headers: { "Content-Type": "text/javascript"}}).then(res => res.text()).then(msg => {
      let text, final = [];  
      text = msg.toString().trim().split("document.write")
      text.shift();
      text.shift();
      text.pop();
      text.forEach(number => {
          number = number.slice(number.indexOf("counter_e_")+10, number.indexOf(".gif"));
           final.push(number);
      })
      final = final.join("");
      //
      bot.executeWebhook("ID", "TOKEN", {
        embed: {
            timestamp: new Date(),
            title: "5-Minute Interval Observation",
            description: `~\`${final}\` views`,
            color:0xffac52
        }
      })
      db.insert({timestamp: new Date(), views: final})
  })
}catch(err){
    return console.log(err);
}


}, 60000*5)





bot.connect();
