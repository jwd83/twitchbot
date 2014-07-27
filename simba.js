
var irc = require('node-twitch-irc'),
    _ = require('underscore'),
    config = require('./config.js');

// List of mods in your channel.
var mods = ['jared0x90','karmaah'];

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
            });

            // "Chat" event.
            event.on(
                "chat",
                function (from, channel, message) {

                    console.log('['+channel+'] <'+from.color+'|'+from.username+'|'+from.special+'> '+message);

                    if(channel === '#karmaah') {

                    }

                    if(channel === '#jared0x90') {
                        client.say('jared0x90', "What's good");
                    }
                }
            );
        } else {
            console.log(err);
        }
    }
);
