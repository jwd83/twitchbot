
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
        "!moobot": "Moobot is OK I suppose. He smells a bit funny.",
        "!crazybot": "Sadly Crazybot was DOA, I am his replacement! ",
        "!commands": "Some of my commands are !hacks, !poll, !molly, !ameno, !amenoriot, !mollyriot, !simba, !links, !sm4llz and !about",
        "!amenoriot": "༼ つ ◕_◕ ༽つ AMENO OR RIOT ༼ つ ◕_◕ ༽つ",
        "!mollyriot": "༼ つ ◕_◕ ༽つ MOLLY OR RIOT ༼ つ ◕_◕ ༽つ",
        "!simba": "Hi, my name is Simba. I am Karma's famous cat! I have created this bot in an attempt to rule the world. Get out now while you can!",
        "!twittah": "Follow me on twitter for the latest stream news . www.twitter.com/KarmahTV",
        "!sm4llz": "Checkout Sm4llz stream at http://www.twitch.tv/sm4llz",
        "!about": "I strive to be the humble servant of Karma. The Geoffrey to her Vivian Banks.",
        "!links": "Twittah: http://twitter.com/karmahTV , YouTube: http://youtube.com/karmathesnipah",
        "!alien": "Alien Sex Poll http://strawpoll.me/2188418"

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
        "!commands": "Some of my commands are !hacks, !poll, !molly, !ameno, !amenoriot, !mollyriot, !simba, !links, !sm4llz and !about",
        "!amenoriot": "༼ つ ◕_◕ ༽つ AMENO OR RIOT ༼ つ ◕_◕ ༽つ",
        "!mollyriot": "༼ つ ◕_◕ ༽つ MOLLY OR RIOT ༼ つ ◕_◕ ༽つ",
        "!simba": "Hi, my name is Simba. I am Karma's famous cat! I have created this bot in an attempt to rule the world. Get out now while you can!",
        "!twittah": "Follow me on twitter for the latest stream news . www.twitter.com/KarmahTV",
        "!sm4llz": "Checkout Sm4llz stream at http://www.twitch.tv/sm4llz",
        "!about": "I strive to be the humble servant of Karma. The Geoffrey to her Vivian Banks.",
        "!links": "Twittah: http://twitter.com/karmahTV , YouTube: http://youtube.com/karmathesnipah",
        "!alien": "Alien Sex Poll http://strawpoll.me/2188418"

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
                        // console.log('Commands found for channel: ' + channel);
                        for(var cmd in commands[channel]) {
                            // verify we are looking at a property
                            if (commands[channel].hasOwnProperty(cmd)) {
                                if(message === cmd) {
                                    client.say(channel, commands[channel][cmd]);
                                }
                            }
                        }
                    } else {
                        // console.log('Commands NOT found for channel: ' + channel)
                    }
                }
            );
        } else {
            console.log(err);
        }
    }
);
