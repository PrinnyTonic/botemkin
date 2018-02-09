var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const https = require('https');
const utf8 = require('utf8');

function cleanString(input) {
    var output = "";
    for (var i=0; i<input.length; i++) {
        if (input.charCodeAt(i) <= 127) {
            output += input.charAt(i);
        }
    }
    return output;
}

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'weisheit':

                var weisheit = [
                    'MFN Weisheit #1 : *dann war die Grafik bei Mario damals einfach shit. Zu schnelle motions, zu wenig Details*',
                    'MFN Weisheit #2 : *Tekken hat kein bullshit*',
                    'MFN Weisheit #3 : *Tekken 7 hat zu viel bullshit*',
                    'MFN Weisheit #4 : *find eine niedrigere Framerate aber anspruchsvoller. Du musst die moves besser predicten können*',
                    'MFN Weisheit #5 : *und comics sind nur in den USA riesig*',
                    'MFN Weisheit #6 : *Fighting Games are Dead. Kommen keine 1k auf Events*',
                    'MFN Weisheit #7 : *Steam player charts, das schlimmste was 2017 gebracht hat*',
                    'MFN Weisheit #8 : *Ich kann dir da was im P-Mode zeigen*',
                    'MFN Weisheit #9 : *Unist ist sf on crack, alles aus deinem brain geht durch deine Hände in den char*',
                    'MFN Weisheit #10 : *Da heutzutage ja nur noch mit pcs und Konsolen auf riesigen Monitoren gespielt wird, werden die Spielwelten auch immer größer und open world wird immer mehr zum Trend*',
                    'MFN Weisheit #11 : *Der Boy keept es relativ simpel*',
                    'MFN Weisheit #12 : *Ryu is top tier (Ryu is top tier)*',
                    'MFN Weisheit #13 : *Sie hat die Bücher gestapelt, wie ein richtiger Bücherwurm*',
                    'MFN Weisheit #14 : *wenn ich 100% weiß, dass ein low kommt, mach ich hopkick*',
                    'FGC Weisheit #1 : *Erster whifft, zweiter trifft*',
                    'FGC Weisheit #2 : *When in doubt, EX Tatsu in der Luft*',
                    'FGC Weisheit #3 : *Overhead geht nur Fullscreen*'
                ];

                var weisheitMax = weisheit.length;

                bot.sendMessage({
                    to: channelID,
                    message: weisheit[Math.floor((Math.random() * weisheitMax) + 0)]
             });
            break;

            case 'neverforget':

                var neverforget = [
                    'Oskar schläft mit Mütze',
                    'Paul hat die Geschichte um Pug Battlegrounds geglaubt',
                    'Billy',
                    'Jonah hat sein Pad mit voller Kraft gegen Prinnys Wand geschleudert und stand dann schnaufend im Flur',
                    'Alisa hat einmal ihr fucking Genkai erreicht',
                    'Alle dachten für 1 Jahr, dass Tolu Mexikaner ist',
                    'LUNATICSOUL WO IMMER DU AUCH STECKST',
                    'Halibel hätte sich auf Derby II fast mit Owner geprügelt',
                    'Tobi hat gegen Marco verloren',
                    'Oskar hat gegen Dhalucard verloren',
                    'DER SAFTIGE!',
                    'https://www.youtube.com/watch?v=gTwteooZ5mQ',
                    'HEALING!',
                    'Seine Wurfsterne surren das Kosakenlied.',
                    'Alisa hat Prinny beschuldigt, sie als Nazi bezeichnet zu haben.',
                    'Hey Prinny, du hast doch gesagt, die Karte ist voll scheiße!',
                    'https://www.youtube.com/watch?v=se0RiaH4Dos',
                    'https://cdn.discordapp.com/attachments/173045936455417856/388290401456488448/blockOrHopkick2.png',
                    'Einen Kevin machen - Nach jedem Match in den Character-Select gehen und einfach NICHTS ändern.',
                    'https://www.youtube.com/watch?v=hKBSZaa8fY8'
                ];

                var neverMax = neverforget.length;

                bot.sendMessage({
                    to: channelID,
                    message: 'Never forget: '+neverforget[Math.floor((Math.random() * neverMax) + 0)]
             });
            break;

            case 'react':

                var term = escape(utf8.encode(message).trim().slice(7));

                if(term.lenght >= 60)
                {
                    var term = args[0].substring(0, 60);
                }

                var offset = Math.floor((Math.random() * 100) + 0);

                var giphy = 'https://api.giphy.com/v1/gifs/search?api_key=QWhNgWu4ai0P7HgyLvzgwNQHtreysmMb&q='+utf8.decode(term)+'&limit=1&offset='+offset+'&rating=PG-13&lang=en';     
                
                function httpGet(url)
                {
                    var xmlHttp = new XMLHttpRequest();
                    xmlHttp.open( "GET", url, false ); // false for synchronous request
                    xmlHttp.send( null );
                    return xmlHttp.responseText;
                }

                var apicall = httpGet(giphy);

               
                if (JSON.parse(apicall).pagination.count == 0)
                {
                    var gif = "War unreactable!"   
                }
                else
                {
                 var gif = JSON.parse(apicall).data[0].images.original.url;
                }
         

                bot.sendMessage({
                    to: channelID,
                    message: gif
                });


            break;
            // Just add any case commands if you want to..
         }
     }
});


client.login(process.env.BOT_TOKEN);
