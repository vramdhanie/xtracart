import app from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./config";

// Initialize Firebase

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
  }

  async register(firstName, lastName, email, password) {
    const newUser = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    return await newUser.user.updateProfile({
      firstName,
      lastName,
      displayName: firstName,
    });
  }

  async login(email, password) {
    return await this.auth.signInWithEmailAndPassword(email, password);
  }
}

const firebase = new Firebase();
export default firebase;
