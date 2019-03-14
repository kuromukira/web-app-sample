import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ServiceReturn } from 'src/app/models/service.model';
import { NotifcationModel, NotificationResult } from 'src/app/models/notif.model';

@Injectable()
export class SignalRService {

    constructor(private http: HttpClient) {
        this.hubConnected.subscribe(connected => {
            if (connected)
                this.getConnectionId();
        });
    }

    // Change this per actual URL of API
    API_URL: string = 'https://localhost:44311/';
    $_notifcation: BehaviorSubject<NotificationResult> = new BehaviorSubject(new NotificationResult());

    // ! Setup SignalR starts here

    private ConnectionId: string = '';
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

    private getConnectionId() {
        this.hubConnection.invoke('GetConnectionId').then(result => {
            this.ConnectionId = result;
        });
    }

    public addNotifEventHandler = () => {
        this.hubConnection.on('notifEventHandler', (data: NotificationResult) => {
            this.$_notifcation.next(Object.assign({}, data));
        });
    }

    // ! Setup SignalR ends here

    async sendLoginNotif(email: string) {
        try {
            let _notif: NotifcationModel = new NotifcationModel();
            _notif.sender = email;
            _notif.connectionId = this.ConnectionId;
            await this.http.post<any>(this.API_URL + 'api/Notification/login', _notif).subscribe();
        }
        catch (error) {
            return new ServiceReturn(false, error.message, error);
        }
    }

    async sendUpdateNotif(email: string) {
        try {
            let _notif: NotifcationModel = new NotifcationModel();
            _notif.sender = email;
            _notif.connectionId = this.ConnectionId;
            await this.http.post<any>(this.API_URL + 'api/Notification/send', _notif).subscribe();
        }
        catch (error) {
            return new ServiceReturn(false, error.message, error);
        }
    }

}