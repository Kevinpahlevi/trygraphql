var admin = require('firebase-admin')

var firebase

// CONFIG-FIREBASE-CLOUD
function Config (serviceAccount, databaseURL) {
  try {
    firebase = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL
    })
  } catch (Error) {
    console.log('ERROR CONFIG : ', Error)
  }
}

// SEND-NOTIFICATION
async function Send (target, payload, options) {
  try {
    const data = await firebase.messaging().sendToDevice(target, payload, options)
    // .then(function(response) {
    //   console.log("Successfully sent message:", response);
    // })
    // .catch(function(error) {
    //   console.log("Error sending message:", error);
    // });

    return data
  } catch (error) {
    return error
  }
}

async function subscribed (token, topic) {
  try {
    const data = await firebase.messaging().subscribeToTopic(token, topic)
    // .then(function(response) {
    //   // See the MessagingTopicManagementResponse reference documentation
    //   // for the contents of response.
    //   console.log(response)
    //  return response
    // })
    // .catch(function(error) {
    //  return error
    // });
    return data
  } catch (error) {
    return error
  }
}

async function unsubscribed (token, topic) {
  try {
    const data = await firebase.messaging().unsubscribeFromTopic(token, topic)
    // .then(function(response) {
    //   // See the MessagingTopicManagementResponse reference documentation
    //   // for the contents of response.
    //   console.log(response)
    //  return response
    // })
    // .catch(function(error) {
    //  return error
    // });
    return data
  } catch (error) {
    return error
  }
}

async function sendWithTopic (params) {
  try {
  // Send a message to devices subscribed to the provided topic.
    const data = await admin.messaging().send(params)
    return data
  } catch (error) {
    return error
  }
}

module.exports = { Config, Send, subscribed, unsubscribed, sendWithTopic }
