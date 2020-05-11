import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./config";
import { COLLECTION_NAMES } from "../utilities/constants";

const { USERS } = COLLECTION_NAMES;

// Initialize Firebase

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  async register(fullName, phoneNumber, email, password) {
    const newUser = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );

    await this.db
      .collection("users")
      .add({ id: newUser.user.uid, phoneNumber });
    return await newUser.user.updateProfile({
      displayName: fullName,
    });
  }

  async login(email, password) {
    return await this.auth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    await this.auth.signOut();
  }

  async resetPassword(email) {
    await this.auth.sendPasswordResetEmail(email);
  }

  async getUserPhone(uid) {
    return await this.db
      .collection(USERS)
      .where("id", "==", uid)
      .get()
      .then((snap) => {
        if (!snap.empty) {
          let doc = snap.docs[0];
          let phoneNumber = doc.data().phoneNumber;
          return phoneNumber;
        }
        return "";
      });
  }
}

const firebase = new Firebase();
export default firebase;
