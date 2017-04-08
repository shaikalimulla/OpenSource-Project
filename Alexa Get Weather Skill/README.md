************************************************************************************************************************************
Beginner Instructions
************************************************************************************************************************************
If you're just getting started developing skills for Alexa, I'd recommend reading [Getting Started
with the Alexa Skills
Kit](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/getting-started-guide) and
[Developing an Alexa Skill as a Lambda
Function](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/developing-an-alexa-skill-as-a-lambda-function) to get familiar with the process.

I have even deployed a simple Fact skill to get familiar with process and get hands on about the same. Fact skill can be found here 
(https://github.com/shaikalimulla/OpenSource-Project/tree/master/Alexa%20Fact%20Skill) .

************************************************************************************************************************************
Get Weather Alexa Skill
************************************************************************************************************************************
This is a skill built for Amazon's Alexa service that queries the current forecast from the [Dark
Sky API](https://developer.forecast.io). It allows you to ask Alexa the following:

> Alexa, ask Dark Sky what it's like outside in Brooklyn

> Alexa, ask Dark Sky what the weather's like in Chicago right now

> Alexa, ask Dark Sky what the conditions are in Los Angeles for the hour

> Alexa, ask Dark Sky what the forecast in San Francisco is this week

************************************************************************************************************************************
Testing The Skill Locally
************************************************************************************************************************************
You'll need to register for a developer account with the [Dark Sky](https://developer.forecast.io)
folks and get an API key. Once you do that, open up ".env" and add your API key in the first line of
that file.

************************************************************************************************************************************
Setting up the Skill
************************************************************************************************************************************
To set up the skill, head on over to [Alexa skills kit
development console](https://developer.amazon.com/edw/home.html) and add a new skill. Fill in the
basic skill information however you choose or go through fact skill mentioned above for the idea. For Endpoint, you'll need to fill in your Lambda ARN
which you'll get in the next step. Next, head on over to Interaction Model. In the Intent
Schema field, copy and paste the contents of the "Interaction_model/intent_schema.json" file. Then
in the Sample Utterances field, copy and paste the contents of "Interaction_model/sample_utterances.txt".

************************************************************************************************************************************
Hosting the Skill
************************************************************************************************************************************
The skill is built to be easily hosted on Amazon's [AWS
Lambda service](https://aws.amazon.com/lambda/). Create your Lambda function (using the
alexa-skills-kit-color-expert blueprint) and make sure you choose Node.js as the runtime. After
you've created your Lambda function, look at the top right of the page to get your Lambda ARN
number and put that in the Alexa Skill Information Endpoint field.

To deploy to Lambda, first makes sure you find "lambda.zip" file present at the Root => Source directory.
You can then upload that zip file to Lambda for use in your function and skill.
