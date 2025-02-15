import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChannelMode, IChannel } from '../models/channel';

@Injectable({
  providedIn: 'root'
})
export class ChannelsService {
  private _channels: BehaviorSubject<IChannel[]> = new BehaviorSubject([] as IChannel[]);
  private baseUrl: string;

  constructor(
    private _httpClient: HttpClient,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.baseUrl = baseUrl;
  }

  get channels$(): Observable<IChannel[]> {
    return this._channels;
  }

  getChannels(): Observable<IChannel[]> {
    this._httpClient.get<IChannel[]>(`${this.baseUrl}api/channels`).subscribe(
      (result: IChannel[]) => {
        this._channels.next(result);
      },
      error => console.error(error)
    );

    return this.channels$;
  }

  addChannel(): IChannel {
    const newChannel = {id: crypto.randomUUID(), name: 'neuer Sender', stream: '', mode: ChannelMode.Off};
    this._channels.next([...this._channels.value, newChannel]);
    return newChannel;
  }

  updateChannel(channel: IChannel): Observable<IChannel> {
    return this._httpClient.post<IChannel>(`${this.baseUrl}api/channels/update`, channel);
  }
}
