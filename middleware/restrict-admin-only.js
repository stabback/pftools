import firebase from 'firebase/app'
import 'firebase/auth'

export default async function ({ app, error }) {

  if(!app.$fireAuth.currentUser) {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await app.$fireAuth.signInWithPopup(provider)
    } catch(e) {
      return error({statusCode: 403, message: 'Access denied, not logged in'})
    }
  }

  const ADMINS = [
    'h7df735HirfdPwdg9adCitD3f4l2',
    'WO46v7wTeae5ub2muOgJVtX63iA2'
  ]
  if(!ADMINS.includes(app.$fireAuth.currentUser.uid)) {
    return error({statusCode: 403, message: 'Access denied, not an admin'})
  }

  return null
}
