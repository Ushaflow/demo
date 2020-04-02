const functions = require('firebase-functions')
const { WebhookClient, Card, Suggestion, Image, Payload } = require('dialogflow-fulfillment')
const actions_payload = require('./actions_payload.json')

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({ request, response })

    const welcome = agent => {
        agent.add('It\'s webhook Demo Time now!')
        agent.add(new Card({
            title: 'Im the card title',
            text: 'Im the card text',
            imageUrl: 'https://via.placeholder.com/150',
            buttonText: 'Im the card button',
            buttonUrl: 'https://example.com/'
        }))

        agent.add(new Suggestion('More demos'))
        agent.add(new Suggestion('Im the suggestion'))
        agent.add(new Image('https://via.placeholder.com/150'))
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
    intentMap.set('Webhook Demo', welcome)
    intentMap.set('Actions Demo', actions)
    agent.handleRequest(intentMap)
})