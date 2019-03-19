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

    signInGoogle = () => this.auth.signInGoogle();

    forgotPassword = (email) => this.auth.sendPasswordResetEmail(email);

    signOut = () => this.auth.signOut();

}