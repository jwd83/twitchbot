
var irc = require('node-twitch-irc'),
    _ = require('underscore'),
    config = require('./config.js');

// Create our commands object
var commands = {
    "#karmaah": {
        "!alive": "i am alive",
        "!areyouthere": "I LIVE",
        "!hacks": "Bitch, does it look like she's hacking?",
        "!poll": "Which emma is hotter? http://strawpoll.me/2188097",
        "!molly": "༼ つ ◕_◕ ༽つ MOLLY༼ つ ◕_◕ ༽つ",
        "!ameno": "༼ つ ◕_◕ ༽つ AMENO ༼ つ ◕_◕ ༽つ",
        "!rekt": "༼ つ ◕_◕ ༽つ REKT SLUT ༼ つ ◕_◕ ༽つ",
        "!moobot": "Moobot is OK I suppose. He smells a bit funny.",
        "!crazybot": "Sadly Crazybot was DOA, I am his replacement! ",
        "!amenoriot": "༼ つ ◕_◕ ༽つ AMENO OR RIOT ༼ つ ◕_◕ ༽つ",
        "!mollyriot": "༼ つ ◕_◕ ༽つ MOLLY OR RIOT ༼ つ ◕_◕ ༽つ",
        "!simba": "Hi, my name is Simba. I am Karma's famous cat! I have created this bot in an attempt to rule the world. Get out now while you can!",
        "!twittah": "Follow me on twitter for the latest stream news . www.twitter.com/KarmahTV",
        "!sm4llz": "Checkout Sm4llz stream at http://www.twitch.tv/sm4llz",
        "!dingle": "Checkout DingleDerper's stream at http://www.twitch.tv/dinglederper",
        "!link": "Play TOME with Karma: http://kix.io/d4f , Twittah: http://twitter.com/karmahTV , YouTube: http://youtube.com/karmathesnipah, Fan Site: http://karmaahfans.jwd.me",
        "!links": "Play TOME with Karma: http://kix.io/d4f , Twittah: http://twitter.com/karmahTV , YouTube: http://youtube.com/karmathesnipah, Fan Site: http://karmaahfans.jwd.me",
        "!alien": "Alien Sex Poll http://strawpoll.me/2188418",
        "!bets": "Place your bets! If you are new here we bet on how many clicks it will take to break each of the 3 windows. Typically this is from 5-9 clicks. An example bet is 6/7/8.",
        "!plugdj": "http://plug.dj/karmaah/",
        "!plug": "http://plug.dj/karmaah/",
        "!deck": "Current: http://imgur.com/fHHsCsC , TempoLock: http://imgur.com/ZArdKm2 , Miracle Priest: http://imgur.com/F8sgk1R , Disgusting: http://imgur.com/XjGPeys",
        "!dance": "┏(-_-)┓┏(-_-)┛┗(-_- )┓┗(-_-)┛┏(-_-)┓ ┏(-_-)┛┗(-_- )┓┗(-_-)┛┏(-_-)┓┏(-_-)┛┗(-_- )┓┗(-_-)┛┏(-_-)┓┏(-_-)┛┗(-_- )┓┗(-_-)┛┏(-_-)┓",
        "!karma": "http://karmaahfans.jwd.me Check out my site for decklists and other information!",
        "!beast": "She's a beast, I call her Karma"
    },
    "#jared0x90": {
        "!alive": "i am alive",
        "!areyouthere": "I LIVE",
        "!hacks": "Bitch, does it look like she's hacking?",
        "!poll": "Which emma is hotter? http://strawpoll.me/2188097",
        "!molly": "༼ つ ◕_◕ ༽つ MOLLY༼ つ ◕_◕ ༽つ",
        "!ameno": "༼ つ ◕_◕ ༽つ AMENO ༼ つ ◕_◕ ༽つ",
        "!moobot": "Moobot is OK I suppose. He smells a bit funny.",
        "!crazybot": "Sadly Crazybot was DOA, I am his replacement! ",
        "!amenoriot": "༼ つ ◕_◕ ༽つ AMENO OR RIOT ༼ つ ◕_◕ ༽つ",
        "!mollyriot": "༼ つ ◕_◕ ༽つ MOLLY OR RIOT ༼ つ ◕_◕ ༽つ",
        "!simba": "Hi, my name is Simba. I am Karma's famous cat! I have created this bot in an attempt to rule the world. Get out now while you can!",
        "!twittah": "Follow me on twitter for the latest stream news . www.twitter.com/KarmahTV",
        "!sm4llz": "Checkout Sm4llz stream at http://www.twitch.tv/sm4llz",
        "!about": "I strive to be the humble servant of Karma. The Geoffrey to her Vivian Banks.",
        "!links": "Twittah: http://twitter.com/karmahTV , YouTube: http://youtube.com/karmathesnipah",
        "!alien": "Alien Sex Poll http://strawpoll.me/2188418",
        "!bets": "Place your bets! If you are new here we bet on how many clicks it will take to break each of the 3 windows. Typically this is from 5-9 clicks. An example bet is 6/7/8.",
        "!plugdj": "http://plug.dj/karmaah/",
        "!plug": "http://plug.dj/karmaah/",
        "!deck": "Current: http://imgur.com/fHHsCsC, TempoLock: http://imgur.com/ZArdKm2, Miracle Priest: http://imgur.com/F8sgk1R, Disgusting: http://imgur.com/XjGPeys"
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
            
            setInterval(function () {
                client.say("#karmaah" , "Play TOME with Karma: http://kix.io/d4f , Twittah: http://twitter.com/karmahTV , YouTube: http://youtube.com/karmathesnipah, Fan Site: http://karmaahfans.jwd.me");
            },  600000);
            
            
        } else {
            console.log(err);
        }
    }
);
