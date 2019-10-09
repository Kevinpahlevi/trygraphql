/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
/* eslint-disable no-undef */
const { expect } = require('chai')
const { app } = require('../server')
const Notification = require('../Notification')
var serviceAccount = require('../keyService.json')
var notifConfig = require('../notif-config')
var topic = 'topic-mocha-test'
var topicBatch = 'topic-mocha-test-batch'
var count = 1
var countBatch = notifConfig.targetBatch.length

let server
describe('notification', async () => {
  before(() => {
    try {
      server = app.listen(8080)
    } catch (error) {
      throw error
    }
    Notification.Config(serviceAccount, notifConfig.database)
  })

  it('Send notification on single device', async () => {
    const response = await Notification.Send(notifConfig.target, notifConfig.payload, notifConfig.options)
    expect(response.successCount).to.equal(count)
  })

  it('Send notification on batch device', async () => {
    const response = await Notification.Send(notifConfig.targetBatch, notifConfig.payloadBatch, notifConfig.options)
    expect(response.successCount).to.equal(countBatch)
  })

  it('Send notification on random device must error', async () => {
    const response = await Notification.Send('RANDOM-DEVICE', notifConfig.payload, notifConfig.options)
    expect(response.failureCount).to.equal(count)
  })

  // SINGLE
  it('Subcribe topic single device', async () => {
    const response = await Notification.subscribed(notifConfig.target, topic)
    expect(response.successCount).to.equal(count)
  })

  it('Send Notif to topic single device', async () => {
    const response = await Notification.sendWithTopic(notifConfig.messageTest)
    // expect(response.successCount).to.equal(count)
    // console.log(response)
  })

  it('Unsubcribe topic single device', async () => {
    const response = await Notification.subscribed(notifConfig.target, topic)
    expect(response.successCount).to.equal(count)
  })

  // BATCH
  it('Subcribe topic batch device', async () => {
    const response = await Notification.subscribed(notifConfig.targetBatch, topicBatch)
    expect(response.successCount).to.equal(countBatch)
  })

  it('Send Notif to topic batch device', async () => {
    const response = await Notification.sendWithTopic(notifConfig.messageTestBatch)
    // expect(response.successCount).to.equal(count)
    // console.log(response)
  })

  it('Unsubcribe topic batch device', async () => {
    const response = await Notification.subscribed(notifConfig.targetBatch, topicBatch)
    expect(response.successCount).to.equal(countBatch)
  })

  after(() => {
    server.close()
  })
})
