var admin = require('firebase-admin');

var serviceAccount = require('./keyService.json');

var firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://test-project-8dc3c.firebaseio.com",
}); 

const messaging = firebase.messaging();

function Notification(params) {

var webKevin = "e0DHwOAvr1vcbxO0ZHbXK1:APA91bFoDKbX_TUTJGrEGQ4cLD2xQjNFT6Jl_bB-kQKcAy8xHkY7PrnfiosFyKVRVYKCpR5ptC-c151lCEHMLYXuGFx1Ik26GnxB7pWo977NA9FhTYow4NNfHF72Or19GbPuF2xxH4G1"

var payload = {
  notification: {
    title: "NOTIFICATION FROM BACKEND",
    body: "notif from backend."
  }
};

 var options = {
  priority: "high",
  timeToLive: 60 * 60 *24
};

firebase.messaging().sendToDevice(webKevin, payload, options)
  .then(function(response) {
    console.log("Successfully sent message:", response);
  })
  .catch(function(error) {
    console.log("Error sending message:", error);
  });
}

module.exports = Notification