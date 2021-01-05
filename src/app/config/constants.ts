import { Injectable } from '@angular/core';

@Injectable()
export class Constants {
    public readonly API_ENDPOINT: string = 'http://localhost:8080/api/';
    public readonly SOCKET_ENDPOINT: string = 'http://localhost:8080';
    public readonly API_KEY: string = '123456789';
}
