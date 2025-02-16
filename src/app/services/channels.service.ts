import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { IChannel } from '../models/channel';

import type { Schema } from '../../../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';

const client = generateClient<Schema>();

@Injectable({
  providedIn: 'root'
})
export class ChannelsService {
  private _channels: BehaviorSubject<IChannel[]> = new BehaviorSubject([] as IChannel[]);
  private baseUrl: string;
  private channels: any;
  private subscription?: Subscription;
  
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
    this.subscription = client.models.Channel.observeQuery().subscribe({
      next: ({ items, isSynced }) => {
        this.channels = items;
        this._channels.next(this.channels);
      }
    });

    return this.channels$;
  }

  addChannel(): IChannel {
    const newChannel = {id: crypto.randomUUID(), name: 'neuer Sender', stream: '', mode: 'Off' as 'Off', image: undefined};
    this.createChannel(newChannel);
    this._channels.next([...this._channels.value, newChannel]);
    return newChannel;
  }

  async createChannel(channel: IChannel): Promise<any> {
    return await client.models.Channel.create(channel);
  }

  async updateChannel(channel: IChannel): Promise<any> {
    return await client.models.Channel.update(channel);
  }

  async deleteChannel(channel: IChannel): Promise<any> {
    this._channels.next(this._channels.value.filter(c => c.id !== channel.id));
    return await client.models.Channel.delete(channel);
  }
}
