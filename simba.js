
var irc = require('node-twitch-irc'),
    _ = require('underscore'),
    config = require('./config.js');

// Create our commands object
var commands = {
    "#karmaah": {
        "!about": "Karma's name is Jaime. She is 21 years young and lives in bean town (Boston, MA, USA)",
        "!ameno": "༼ つ ◕_◕ ༽つ AMENO ༼ つ ◕_◕ ༽つ",
        "!amenoriot": "༼ つ ◕_◕ ༽つ AMENO OR RIOT ༼ つ ◕_◕ ༽つ",
        "!beast": "She's a beast, I call her Karma",
        "!bets": "Place your bets! If you are new here we bet on how many clicks it will take to break each of the 3 windows. Typically this is from 5-9 clicks. An example bet is 6/7/8.",
        "!boys": "K A R M A B O Y S", 
        "!crazybot": "Sadly Crazybot was DOA, I am his replacement! ",
        "!deck": "Karma's decklists can be found here: http://imgur.com/a/zBKR2",
        "!decks": "Karma's decklists can be found here: http://imgur.com/a/zBKR2",
        "!dance": "┏(-_-)┓┏(-_-)┛┗(-_- )┓┗(-_-)┛┏(-_-)┓ ┏(-_-)┛┗(-_- )┓┗(-_-)┛┏(-_-)┓┏(-_-)┛┗(-_- )┓┗(-_-)┛┏(-_-)┓┏(-_-)┛┗(-_- )┓┗(-_-)┛┏(-_-)┓",
        "!fansite": "http://karmaahfans.jwd.me Check out my site for decklists and other information!",
        "!gefft": "༼ つ ◕_◕ ༽つYOU GOT GEFFT ༼ つ ◕_◕ ༽つ",
        "!girls": "K A R M A G I R L S",
        "!grills": "K A R M A G I R L S",
        "!hacks": "Bitch, does it look like she's hacking?",
        "!link": "Play TOME with Karma: http://kix.io/d4f , Twittah: http://twitter.com/karmahTV , YouTube: http://youtube.com/karmathesnipah, Fan Site: http://karmaahfans.jwd.me",
        "!links": "Play TOME with Karma: http://kix.io/d4f , Twittah: http://twitter.com/karmahTV , YouTube: http://youtube.com/karmathesnipah, Fan Site: http://karmaahfans.jwd.me",
        "!molly": "༼ つ ◕_◕ ༽つ MOLLY༼ つ ◕_◕ ༽つ",
        "!mollyriot": "༼ つ ◕_◕ ༽つ MOLLY OR RIOT ༼ つ ◕_◕ ༽つ",
        "!playlist": "Karma's playlists can be found here: ----Spotify: http://goo.gl/eso6Pr ----YouTube: http://goo.gl/4SGrfe",
        "!plugdj": "http://plug.dj/karmaah/",
        "!rekt": "༼ つ ◕_◕ ༽つ REKT SLUT ༼ つ ◕_◕ ༽つ",
        "!sm4llz": "Checkout Sm4llz stream at http://www.twitch.tv/sm4llz",
        "!shades": "karDeal",
        "!simba": "Hi, my name is Simba. I am Karma's famous cat! I have created this bot in an attempt to rule the world. Get out now while you can!",
        "!subemotes": "Subscriber emotes include karSimba (kar Simba) and karDeal (kar Deal)",
        "!twittah": "Follow me on twitter for the latest stream news . www.twitter.com/KarmahTV",
    },
    "#jared0x90": {
        "!alive": "i am alive",
        "!areyouthere": "I LIVE"
    }
};


// Create the IRC client
var client = new irc.connect(
    config,
    function(err, event) {
        if (!err) {
            // "Connected" event.
            event.on("connected", function () {
                console.log('CONNECTED');
            });

            // "Disconnected" event.
            event.on("disconnected", function (reason) {
                console.log('DISCONNECTED: '+reason);
            });

            // "Join" event.
            event.on("join", function (channel, username) {
                console.log(username+' joined '+channel);
                /*
                if(channel === '#karmaah') {
                    client.say(channel, "Welcome to the channel " + username);
                }
                */
            });

            // "Chat" event.
            event.on(
                "chat",
                function (from, channel, message) {

                    console.log('['+channel+'] <'+from.color+'|'+from.username+'|'+from.special+'> '+message);

                    // if(commands.hasOwnProperty(channel)) {
                    if (channel in commands) {

                        if(message === "!commands" || message === "!help" ) {
                            var command_list = "Commands for this channel include: ";

                            for(var cmd in commands[channel]) {
                                command_list = command_list + cmd + ", ";
                            }

                            client.say(channel, command_list);
                        } else {
                            for(var cmd in commands[channel]) {
                                // verify we are looking at a property
                                if (commands[channel].hasOwnProperty(cmd)) {
                                    if(message === cmd) {
                                        client.say(channel, commands[channel][cmd]);
                                    }
                                }
                            }
                        }
                    } else {
                        // console.log('Commands NOT found for channel: ' + channel)
                    }
                }
            );
            
            // repeatable methods
            
            // 600000 = 10 minutes
            /*
            setInterval(function () {
                client.say("#karmaah" , "Play TOME with Karma: http://kix.io/d4f , Twittah: http://twitter.com/karmahTV , YouTube: http://youtube.com/karmathesnipah, Fan Site: http://karmaahfans.jwd.me");
            },  600000);
            */
            
            setInterval(function () {
                client.say("#karmaah" , "Twittah: http://twitter.com/karmahTV");
            },  500000);
            
            
        } else {
            console.log(err);
        }
    }
);
