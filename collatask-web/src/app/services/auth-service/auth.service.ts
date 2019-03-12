import * as firebase from 'firebase/app';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import * as keys from '../local-storage-service/storage-keys';
import { ServiceReturn } from 'src/app/models/service.model';
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
        } catch (error) { return false; }
    }

    getUserToken() {
        try {
            let _model: StorageModel = this.ls.get(keys.AccessTokenStorageKey);
            return (_model.data === '' || _model.data === null || _model.data === undefined) ? null : _model.data;
        } catch (error) { return null; }
    }

    getUserEmail() {
        try {
            let _model: StorageModel = this.ls.get(keys.LoginCredentialsStorageKey);
            let _userCred: firebase.auth.UserCredential = JSON.parse(_model.data);
            return _userCred.user.email;
        } catch (error) { return null; }
    }

    private preserveLoginAuth(userCreds: firebase.auth.UserCredential) {
        // Save the token returned by firsebase in local storage once firebase detected a change on auth state
        this.fb.auth.onAuthStateChanged(async (user) => {
            if (user !== null)
                user.getIdToken().then((token) => {
                    this.ls.save(new StorageModel(keys.AccessTokenStorageKey, token));
                    this.ls.save(new StorageModel(keys.LoginCredentialsStorageKey, JSON.stringify(userCreds)));
                });
        });
    }

    async signIn(email: string, password: string) {
        try {
            const _userAuth = await this.fb.auth.signInWithEmailAndPassword(email, password);
            if (_userAuth.user.emailVerified) {
                this.preserveLoginAuth(_userAuth);
                return new ServiceReturn(true, 'Welcome ' + email, _userAuth.user);
            }
            else return new ServiceReturn(false, 'Please verify your email address. A verification link has been sent to ' + email, null);
        }
        catch (error) {
            return new ServiceReturn(false, error.message, error);
        }
    }

    async signUp(email: string, password: string) {
        try {
            const _result = await this.fb.auth.createUserWithEmailAndPassword(email, password);
            _result.user.sendEmailVerification();
            return new ServiceReturn(true, 'An email verification link has been sent to ' + email, _result.user);
        }
        catch (error) {
            return new ServiceReturn(false, error.message, error);
        }
    }

    async signInGoogle() {
        try {
            const _googleUser = await this.fb.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
            this.preserveLoginAuth(_googleUser);
            return new ServiceReturn(true, 'Welcome ' + _googleUser.user.email, _googleUser.user);
        }
        catch (error) {
            return new ServiceReturn(false, error.message, error);
        }
    }

    async forgotPassword(email: string, provider: string) {
        if (provider.toUpperCase() === 'GOOGLE')
            return new ServiceReturn(false, 'Cannot process forgot password for GOOGLE accounts.', null);
        else {
            try {
                await this.fb.auth.sendPasswordResetEmail(email);
                return new ServiceReturn(true, "Password reset link has been sent to " + email, null);
            } catch (error) {
                return new ServiceReturn(false, error.message, error);
            }
        }
    }

    async signOut() {
        try {
            await this.fb.auth.signOut();
            this.ls.delete(keys.LoginCredentialsStorageKey);
            this.ls.delete(keys.AccessTokenStorageKey);
            return new ServiceReturn(true, 'Goodbye!', null);
        }
        catch (error) {
            return new ServiceReturn(false, error.message, error);
        }
    }
}