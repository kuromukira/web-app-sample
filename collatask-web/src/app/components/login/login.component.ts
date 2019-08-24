import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, SignalRService } from 'src/app/services/_index.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordErrorStateMatcher } from 'src/app/helpers/error-state/error-state.service';

/*
    * LoginComponent mostly uses Promise<T>
    * LoginComponent also uses Angular/Forms for it's UI
    * Other components uses Observables and BehaviourSubjects
*/
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    targetUrl: string;
    passwordErrorMatcher = new PasswordErrorStateMatcher();
    isInProgress: boolean = false;

    // #region Login Form
    loginFormGroup = new FormGroup({
        emailAddress: new FormControl('', [Validators.required, Validators.email]),
        passwordField: new FormControl('', [Validators.required])
    });
    // #endregion

    // #region Register Form
    registerFormGroup = new FormGroup({
        emailAddress: new FormControl('', [Validators.required, Validators.email]),
        passwordField: new FormGroup({
            newPassword: new FormControl('', [Validators.required]),
            confirmPassword: new FormControl('')
        }, {
                validators: (group: FormGroup) => {
                    let pass = group.controls.newPassword.value;
                    let confirmPass = group.controls.confirmPassword.value;
                    return pass === confirmPass ? null : { notSame: true }
                }
            })
    });
    // #endregion

    constructor(
        private router: Router,
        private activeRoute: ActivatedRoute,
        private authService: AuthService,
        private signalRService: SignalRService,
        private snackbar: MatSnackBar) { }

    ngOnInit() {
        if (this.authService.hasToken())
            this.router.navigate(['']);
        // 'returnUrl' is from auth.guard
        else this.targetUrl = this.activeRoute.snapshot.queryParams['returnUrl'] || '/home';
    }

    initiateOnProgress() {
        this.isInProgress = true;
        this.snackbar.dismiss();
    }

    btnSignIn_Clicked() {
        if (this.loginFormGroup.valid) {
            this.initiateOnProgress();
            this.authService.signIn(this.loginFormGroup.controls.emailAddress.value, this.loginFormGroup.controls.passwordField.value)
                .then((result) => {
                    if (result.success) {
                        this.signalRService.startConnection();
                        this.router.navigate([this.targetUrl]);
                    }
                    else this.snackbar.open(result.message, null, { duration: 4000 });
                }).finally(() => this.isInProgress = false)
        }
        else this.snackbar.open("There are empty or invalid fields.", null, { duration: 4000 });
    }

    btnGoogleSignIn_Clicked() {
        this.initiateOnProgress();
        this.authService.signInGoogle().then((result) => {
            if (result.success) {
                this.signalRService.startConnection();
                this.router.navigate([this.targetUrl]);
            }
            else this.snackbar.open(result.message, null, { duration: 4000 });
        }).finally(() => this.isInProgress = false)
    }

    btnForgotPass_Clicked() {
        if (this.loginFormGroup.controls.emailAddress.valid) {
            this.initiateOnProgress();
            this.authService.forgotPassword(this.loginFormGroup.controls.emailAddress.value, 'EMAIL')
                .then((result) => {
                    this.snackbar.open(result.message, null, { duration: 4000 });
                }).finally(() => this.isInProgress = false)
        }
        else this.snackbar.open("There are empty or invalid fields.", null, { duration: 4000 });
    }

    btnSignUp_Clicked() {
        if (this.registerFormGroup.valid) {
            this.initiateOnProgress();
            this.authService.signUp(this.registerFormGroup.controls.emailAddress.value, this.registerFormGroup.controls.passwordField.value.newPassword)
                .then((result) => {
                    this.snackbar.open(result.message, null, { duration: 4000 });
                })
                .finally(() => {
                    this.isInProgress = false;
                    this.registerFormGroup.reset();
                })
        }
        else this.snackbar.open("There are empty or invalid fields.", null, { duration: 4000 });
    }

}
