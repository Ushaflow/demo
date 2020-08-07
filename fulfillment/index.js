const functions = require('firebase-functions')
const { WebhookClient, Card, Suggestion, Image, Payload } = require('dialogflow-fulfillment')
const actions_payload = require('./actions_payload.json')

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({ request, response })

    const welcome = agent => {
        agent.add('It\'s webhook time!')
        agent.add(new Card({
            title: 'Title',
            text: 'Text',
            imageUrl: 'https://placehold.it/640x480',
            buttonText: 'Button',
            buttonUrl: 'https://example.com/'
        }))

        agent.add(new Suggestion('More demos'))
        agent.add(new Suggestion('Suggestion'))
        agent.add(new Image('https://placehold.it/640x480'))
    }

    const actions = agent => {
        agent.requestSource = agent.ACTIONS_ON_GOOGLE
        agent.add(new Payload(agent.ACTIONS_ON_GOOGLE, {
            expectUserResponse: true,
            isSsml: false,
            noInputPrompts: [],
            ...actions_payload
        }))
    }

    const intentMap = new Map()
    intentMap.set('Webhooks', welcome)
    intentMap.set('Actions on Google', actions)
    agent.handleRequest(intentMap)
})
