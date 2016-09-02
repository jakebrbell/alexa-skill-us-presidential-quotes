/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This skill was based on a simple sample that has no external dependencies or
 * session management, and shows the most basic example of how to create a
 * Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Presidential Quotes for a quote"
 *  Alexa: "Here's your quote: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.echo-sdk-ams.app.[UNIQUE_ID]";

/**
 * Array containing presidential quotes.
 */
var PRESIDENTIAL_QUOTES = [
    "George Washington. Associate yourself with men of good quality if you esteem your own reputation; for 'tis better to be alone than in bad company.",
    "John Adams. You will ever remember that all the end of study is to make you a good man and a useful citizen.",
    "Thomas Jefferson. When angry, count ten, before you speak; if very angry, a hundred.",
    "James Madison. The advancement and diffusion of knowledge is the only guardian of true liberty.",
    "James Monroe. It is by a thorough knowledge of the whole subject that [people] are enabled to judge correctly of the past and to give a proper direction to the future.",
    "John Quincy Adams. If your actions inspire others to dream more, learn more, do more and become more, you are a leader.",
    "Andrew Jackson. Take time to deliberate; but when the time for action arrives, stop thinking and go in.",
    "Martin Van Buren. All the lessons of history and experience must be lost upon us if we are content to trust alone to the peculiar advantages we happen to possess.",
    "William Henry Harrison. I contend that the strongest of all governments is that which is most free.",
    "John Tyler. Wealth can only be accumulated by the earnings of industry and the savings of frugality.",
    "James Polk. May the boldest fear and the wisest tremble when incurring responsibilities on which may depend our country's peace and prosperity, and in some degree the hopes and happiness of the whole human family.",
    "Zachary Taylor. It would be judicious to act with magnanimity towards a prostrate foe.",
    "Millard Fillmore. An honorable defeat is better than a dishonorable victory.",
    "Franklin Pierce. The storm of frenzy and faction must inevitably dash itself in vain against the unshaken rock of the Constitution.",
    "James Buchanan. A long visit to a friend is often a great bore. Never make people twice glad.",
    "Abraham Lincoln. Always bear in mind that your own resolution to succeed is more important than any other one thing.",
    "Andrew Johnson. Honest conviction is my courage; the Constitution is my guide.",
    "Ulysses S. Grant. The art of war is simple enough. Find out where your enemy is. Get at him as soon as you can. Strike him as hard as you can, and keep moving on.",
    "Rutherford B. Hayes. For honest merit to succeed amid the tricks and intrigues which are now so lamentably common, I know is difficult; but the honor of success is increased by the obstacles which are to be surmounted. Let me triumph as a man or not at all.",
    "James Garfield. Be fit for more than the thing you are now doing. Let everyone know that you have a reserve in yourself; that you have more power than you are now using. If you are not too large for the place you occupy, you are too small for it.",
    "Chester Arthur. Good ball players make good citizens.",
    "Grover Cleveland. A truly American sentiment recognizes the dignity of labor and the fact that honor lies in honest toil.",
    "Benjamin Harrison. I pity the man who wants a coat so cheap that the man or woman who produces the cloth will starve in the process.",
    "William McKinley. Our differences are policies; our agreements, principles.",
    "Teddy Roosevelt. We must dare to be great; and we must realize that greatness is the fruit of toil and sacrifice and high courage.",
    "William Taft. Don't write so that you can be understood, write so that you can't be misunderstood.",
    "Woodrow Wilson. One cool judgment is worth a thousand hasty counsels. The thing to be supplied is light, not heat.",
    "Warren G. Harding. America's present need is not heroics, but healing; not nostrums, but normalcy; not revolution, but restoration; not agitation, but adjustment; not surgery, but serenity; not the dramatic, but the dispassionate; not experiment, but equipoise; not submergence in internationality, but sustainment in triumphant nationality.",
    "Calvin Coolidge. Nothing in the world can take the place of persistence. Talent will not; nothing is more common than unsuccessful men with talent. Genius will not; unrewarded genius is almost a proverb ... Persistence and determination alone are omnipotent.",
    "Herbert Hoover. Older men declare war. But it is youth that must fight and die. And it is youth who must inherit the tribulation, the sorrow and the triumphs that are the aftermath of war.",
    "Franklin D. Roosevelt. Yours is not the task of making your way in the world, but the task of remaking the world which you will find before you.",
    "Harry S. Truman. I have found the best way to give advice to your children is to find out what they want and then advise them to do it.",
    "Dwight Eisenhower. Neither a wise man or a brave man lies down on the tracks of history to wait for the train of the future to run over him.",
    "John F. Kennedy. Life is never easy. There is work to be done and obligations to be met — obligations to truth, to justice, and to liberty.",
    "Lyndon B. Johnson. If we succeed, it will not be because of what we have, but it will be because of what we are; not because of what we own, but, rather because of what we believe.",
    "Richard Nixon. The American dream does not come to those who fall asleep.",
    "Gerald Ford. The founding of our Nation was more than a political event; it was an act of faith, a promise to Americans and to the entire world. The Declaration of Independence declared that people can govern themselves, that they can live in freedom with equal rights, that they can respect the rights of others.",
    "Jimmy Carter. Piling up material goods cannot fill the emptiness of lives which have no confidence or purpose.",
    "Ronald Reagan. The future doesn't belong to the fainthearted; it belongs to the brave.",
    "George H.W. Bush. No problem of human making is too great to be overcome by human ingenuity, human energy, and the untiring hope of the human spirit.",
    "Bill Clinton. If you live long enough, you'll make mistakes. But if you learn from them, you'll be a better person. It's how you handle adversity, not how it affects you. The main thing is never quit, never quit, never quit.",
    "George W. Bush. Life takes its own turns, makes its own demands, writes its own story, and along the way, we start to realize we are not the author.",
    "Barack Obama. One voice can change a room. And if one voice can change a room, then it can change a city. And if it can change a city, it can change a state. And if it can change a state, it can change a nation, and if it can change a nation, it can change the world. Your voice can change the world."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * PresidentialQuotes is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var PresidentialQuotes = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
PresidentialQuotes.prototype = Object.create(AlexaSkill.prototype);
PresidentialQuotes.prototype.constructor = PresidentialQuotes;

PresidentialQuotes.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("PresidentialQuotes onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

PresidentialQuotes.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("PresidentialQuotes onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewQuoteRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
PresidentialQuotes.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("PresidentialQuotes onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

PresidentialQuotes.prototype.intentHandlers = {
    "GetNewQuoteIntent": function (intent, session, response) {
        handleNewQuoteRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask Presidential Quotes tell me a quote, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random quote from the list and returns to the user.
 */
function handleNewQuoteRequest(response) {
    // Get a random quote from the presidential quotes list
    var quoteIndex = Math.floor(Math.random() * PRESIDENTIAL_QUOTES.length);
    var quote = PRESIDENTIAL_QUOTES[quoteIndex];

    // Create speech output
    var speechOutput = "Here's your presidential quote from " + quote;

    response.tellWithCard(speechOutput, "PresidentialQuotes", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    console.log(event);
    // Create an instance of the PresidentialQuotes skill.
    var presidentialQuotes = new PresidentialQuotes();
    presidentialQuotes.execute(event, context);
};
