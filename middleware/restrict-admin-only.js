import firebase from 'firebase/app'
import 'firebase/auth'

export default async function ({ app, error }) {

  if(!app.$fireAuth.currentUser) {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await app.$fireAuth.signInWithPopup(provider)
    } catch(e) {
      return error({statusCode: 403, message: 'Access denied'})
    }
  }

  return null
}