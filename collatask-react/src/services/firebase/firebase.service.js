import app from 'firebase/app';
import { firebase } from '../../constants/config';

export default class FirebaseService {

    constructor() {
        app.initializeApp(firebase);
    }

}