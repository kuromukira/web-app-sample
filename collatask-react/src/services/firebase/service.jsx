import app from 'firebase/app';
import 'firebase/auth';
import { firebase } from '../../constants/config';

export default class FirebaseService {

    constructor() {
        app.initializeApp(firebase);
        this.auth = app.auth();
    }

    signUp = async (email, password) => {
        const authUser = await this.auth.createUserWithEmailAndPassword(email, password);
        return await authUser.user.sendEmailVerification();
    }

    signIn = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

    signInGoogle = () => this.auth.signInWithPopup(new app.auth.GoogleAuthProvider());

    forgotPassword = (email) => this.auth.sendPasswordResetEmail(email);

    signOutUser = () => this.auth.signOut();

    getToken = async () => {
        const data = await this.auth.currentUser.getIdToken();
        return data;
    }

    getUserEmail = async () => this.auth.currentUser.email;

}