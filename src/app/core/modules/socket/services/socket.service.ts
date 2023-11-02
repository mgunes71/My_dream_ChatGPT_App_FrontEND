import {Injectable} from "@angular/core";
import * as io from 'socket.io-client';
import {Subject} from "rxjs";

@Injectable()

export class SocketService {

  protected socket!: io.Socket;
  isSocketConnect = false;

  onConnect = new Subject();

  constructor( ) {
  }

  startWebSocket(url: string, config: {}) {
    if (this.isSocketConnect) {
      return;
    }

    this.socket = io.io(url, {
      ...config,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax : 5000,
      reconnectionAttempts: Infinity,
    });

    this.socket.on('connect', () => {
      this.isSocketConnect = true;
      this.onConnect.next(true);
    });

    this.socket.on( 'disconnect', () => {
    });
  }


  endWebSocket() {
    this.socket?.disconnect();
    this.isSocketConnect = false;
  }


  authenticateSocket() {
    const token = localStorage.getItem('token');

    if (this.isSocketConnect) {
      if (token) {
        this.socket.emit('authentication', token);
      }
    } else {
      this.socket.on('connect', () => {
        this.socket.emit('authentication',  token);
      });
    }
  }

  join(room: string) {
    this.emit('join', {room: room});
  }

  leave(room: string) {
    this.emit('leave', {room: room});
  }

  listen(key: string, callback: any) {
    this.socket.on(key, callback);
  }

  emit(key: string, data: any) {
    this.socket.emit(key, data);
  }

  removeAllListeners(key: string) {
    this.socket.removeAllListeners(key);
  }
}
