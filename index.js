const admin = require('firebase-admin');

var serviceAccount = require('./szte-hangman-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();
var docRef = db.collection('users').doc('alovelace');

var setAda = docRef.set({
  first: 'Ada',
  last: 'Lovelace',
  born: 1815
});
