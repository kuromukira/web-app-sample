import * as firebase from 'firebase/app';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import * as keys from '../local-storage-service/storage-keys';
import { AuthServiceReturn } from 'src/app/models/_index.model';
import { LocalStorageService, StorageModel } from '../local-storage-service/local-storage.service';

@Injectable()
export class AuthService {
    private fb: AngularFireAuth;
    constructor(private ls: LocalStorageService) {
        this.fb = new AngularFireAuth(environment.firebase, 'collatask-firebase-config', '', new NgZone({ enableLongStackTrace: false }));
    }

    hasToken() {
        try {
            let _token: string = this.getUserToken();
            return typeof _token !== 'undefined' && _token;
        } catch (error) {
            return false;
        }
    }

    getUserToken() {
        try {
            let _model: StorageModel = this.ls.get(keys.AccessTokenStorageKey);
            if (_model.data === '' || _model.data === null || _model.data === undefined)
                return null;
            else return _model.data;
        } catch (error) { return null; }
    }

    async signIn(email: string, password: string) {
        try {
            const _userAuth = await this.fb.auth.signInWithEmailAndPassword(email, password);
            if (_userAuth.user.emailVerified) {
                // Save the token returned by firsebase in local storage once firebase detected a change on auth state
                this.fb.auth.onAuthStateChanged(async (user) => {
                    user.getIdToken().then((token) => {
                        this.ls.save(new StorageModel(keys.AccessTokenStorageKey, token));
                        this.ls.save(new StorageModel(keys.LoginCredentialsStorageKey, JSON.stringify(_userAuth)));
                    });
                });
                return new AuthServiceReturn(true, 'Welcome ' + email, _userAuth.user);
            }
            else return new AuthServiceReturn(true, 'Please verify your email address. A verification link has been sent to ' + email, null);
        }
        catch (error) {
            return new AuthServiceReturn(true, error.message, error);
        }
    }

    async signUp(email: string, password: string) {
        try {
            const _result = await this.fb.auth.createUserWithEmailAndPassword(email, password);
            _result.user.sendEmailVerification();
            return new AuthServiceReturn(false, 'An email verification link has been sent to ' + email, _result.user);
        }
        catch (error) {
            return new AuthServiceReturn(true, error.message, error);
        }
    }

    async signInGoogle() {
        try {
            const _googleUser = await this.fb.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
            return new AuthServiceReturn(true, 'Welcome ' + _googleUser.user.email, _googleUser.user);
        }
        catch (error) {
            return new AuthServiceReturn(true, error.message, error);
        }
    }

    async forgotPassword(email: string, provider: string) {
        if (provider.toUpperCase() === 'GOOGLE')
            return new AuthServiceReturn(true, 'Cannot process forgot password for GOOGLE accounts.', null);
        else {
            try {
                await this.fb.auth.sendPasswordResetEmail(email);
                return new AuthServiceReturn(false, "Password reset link has been sent to " + email, null);
            } catch (error) {
                return new AuthServiceReturn(true, error.message, error);
            }
        }
    }

    async signOut() {
        try {
            await this.fb.auth.signOut();
            this.ls.delete(keys.LoginCredentialsStorageKey);
            this.ls.delete(keys.AccessTokenStorageKey);
            return new AuthServiceReturn(false, '', null);
        }
        catch (error) {
            return new AuthServiceReturn(true, error.message, error);
        }
    }
}