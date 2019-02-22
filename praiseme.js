
'use strict';
const Alexa = require('alexa-sdk');


//const APP_ID = 'amzn1.ask.skill.868e9aaa-11d9-4220-b06d-327e32dc36a9';
const APP_ID = undefined;
const SKILL_NAME = 'Praise me';
const GET_FACT_MESSAGE = "Here's your fact: ";
const HELP_MESSAGE = ' What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';


const data = [
    'You are beautiful','You are awesome','You are pretty','you are smart'
];

const handlers = {
    'LaunchRequest': function () {
        this.emit('welcomeIntent');
    },
    'welcomeIntent': function () {
        this.emit(':ask','welcome to praise me....!,Just tell me your name');
    },
    'getNameIntent': function () {
        var username=this.event.request.intent.slots.name.value;
        if(username){
        const factArr = data;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomData = factArr[factIndex];
        const speechOutput = randomData;
        this.emit(':ask',username+' '+speechOutput);
        }
    },
    'praiseMeIntent' : function() {
        this.emit(':ask',data[Math.floor(Math.random() * data.length)]);
    },
    'wishIntent' : function () {
        this.emit(':ask','Hello');
    },
    'goodMorningIntent':function () {
  	this.emit(':ask','Very good morning');
    },
    'goodAfternoonIntent':function () {
  	this.emit(':ask','good afternoon');
    },

    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

