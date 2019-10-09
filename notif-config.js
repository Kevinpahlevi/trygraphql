var target = 'e0DHwOAvr1vcbxO0ZHbXK1:APA91bFoDKbX_TUTJGrEGQ4cLD2xQjNFT6Jl_bB-kQKcAy8xHkY7PrnfiosFyKVRVYKCpR5ptC-c151lCEHMLYXuGFx1Ik26GnxB7pWo977NA9FhTYow4NNfHF72Or19GbPuF2xxH4G1'
var targetBatch = ['cxjBqkie073Qu1F_NveNot:APA91bE7NIBcSCOHqtXgxBfDSuiqwMH3m4PyiWyMLyOKJlBFOgO2iyIVz9h5Jj6VVd_tSKnHOgjzagh06MayDBBgu1RRaeKlSsM3lKy3B1We9cex62leCWdHWcvygPwetJ67uvH20gbN',
  'e0DHwOAvr1vcbxO0ZHbXK1:APA91bFoDKbX_TUTJGrEGQ4cLD2xQjNFT6Jl_bB-kQKcAy8xHkY7PrnfiosFyKVRVYKCpR5ptC-c151lCEHMLYXuGFx1Ik26GnxB7pWo977NA9FhTYow4NNfHF72Or19GbPuF2xxH4G1']
var payload = {
  notification: {
    title: 'NOTIFICATION FROM BACKEND',
    body: 'notif from backend.',
    icon: 'https://rescdn.imtxwy.com/ro/home/images/logo.png'
  }
}

var payloadBatch = {
  notification: {
    title: 'NOTIFICATION FROM BACKEND BATCH',
    body: 'notif from backend batch.',
    icon: 'https://rescdn.imtxwy.com/ro/home/images/logo.png'
  }
}

var message = {
  notification: {
    title: 'topic',
    body: 'test-topic'
  },
  data: {
    score: '850',
    time: '2:45'
  },
  topic: 'test-topic'
}

var messageTest = {
  notification: {
    title: 'topic',
    body: 'topic-mocha-test'
  },
  data: {
    score: '850',
    time: '2:45'
  },
  topic: 'topic-mocha-test'
}

var messageTestBatch = {
  notification: {
    title: 'topic',
    body: 'topic-mocha-test-batch'
  },
  data: {
    score: '850',
    time: '2:45'
  },
  topic: 'topic-mocha-test-batch'
}

var options = {
  priority: 'high',
  timeToLive: 60 * 60 * 24
}

var database = 'https://test-project-8dc3c.firebaseio.com'

module.exports = { target, payload, options, database, targetBatch, payloadBatch, message, messageTest, messageTestBatch }
