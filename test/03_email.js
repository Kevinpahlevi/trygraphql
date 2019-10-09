/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-useless-catch */
const { expect } = require('chai')
const { app, mongoose } = require('../server')
const Mail = require('../Email')
const emailConfig = require('../email-config')

let server
describe('create.item', async () => {
  before(() => {
    try {
      server = app.listen(8080)
    } catch (error) {
      throw error
    }
    Mail.Config(emailConfig.mail)
  })

  it('send email text', async () => {
    const data = await Mail.Send(emailConfig.text)
    // console.log(data)
  })

  it('send email template', async () => {
    const data = await Mail.SendWithTemplate(emailConfig.template)
    // console.log(data)
  })

  after(() => {
    server.close()
  })
})
