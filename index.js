const express = require("express");
const app = express();
const {Telegraf} = require("telegraf");
const axios = require("axios");
const bot = new Telegraf('5634659107:AAFiHMRvRkdC0ANbJ2okW9BTo9xrXu91MoY');

app.get('/',(req,res)=>{
    res.send("This is Tai and English dictionary")
})
app.listen(process.env.PORT || 80,()=>{
    console.log("server started with port 80")
})

bot.start((ctx)=>{
    const text = `Hello ${ctx.chat.first_name} ${ctx.chat.last_name},
    Welcome to our telegram bot. You can search & discover Tai and English words dictionary in this bot easily. Just send English word to us, the bot will automatic reply to you with Tai meaning.
    If you need some help press command beside /help`;
    ctx.reply(text)
})
bot.help((ctx)=>{
    const text = `Hello ${ctx.chat.first_name} ${ctx.chat.last_name}, What should we help you?`;
    ctx.reply(text)
})

bot.on('text',(ctx)=>{
    axios("https://raw.githubusercontent.com/AonMao888/bookbox/main/dictionary").then(all=>{
        let got = all.data.find(({en})=>en===ctx.message.text);
        /*ctx.reply(alldata)*/
        if(got){
            ctx.reply(got.tai)
        }else{
            ctx.reply("No word found!")
        }
    })
})

bot.launch();