import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { NotificationResult } from 'src/app/models/notif.model';

@Injectable()
export class SignalRService {

    constructor(private http: HttpClient) { }

    // Change this per actual URL of API
    API_URL: string = 'https://localhost:44311/';
    $_notifcation: BehaviorSubject<NotificationResult> = new BehaviorSubject(new NotificationResult());

    private hubConnected: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private hubConnection: signalR.HubConnection = new signalR.HubConnectionBuilder().withUrl(this.API_URL + 'task-notif').build();

    public startConnection = () => {
        this.hubConnection.start()
            .then(() => {
                this.hubConnected.next(true);
                console.log('Connection started');
            })
            .catch((err: string) => console.log('Error while starting connection: ' + err))
    }

    public stopConnection = () => {
        this.hubConnection.stop()
            .then(() => {
                this.hubConnected.next(false);
                console.log('Connection stopped');
            })
            .catch((err: string) => console.log('Error while starting connection: ' + err))
    }

    public addNotifEventHandler = () => {
        this.hubConnection.on('notifEventHandler', (data: NotificationResult) => {
            this.$_notifcation.next(Object.assign({}, data));
            this.$_notifcation.next(Object.assign({}, undefined));
        });
    }

}