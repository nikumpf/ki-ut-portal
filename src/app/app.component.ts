import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ChannelsService } from './services/channels.service';
import { IChannel } from './models/channel';
import { PrimeNG } from 'primeng/config';

//import type { Schema } from '../amplify/data/resource';
import type { Schema } from '../../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';
import { RouterModule, RouterOutlet } from '@angular/router';
import { StyleClassModule } from 'primeng/styleclass';
import { CommonModule } from '@angular/common';

const client = generateClient<Schema>();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, StyleClassModule, CommonModule, RouterModule],
})
export class AppComponent implements OnInit, OnDestroy {
  _channels: IChannel[] = [];

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  title = 'app';

  constructor(
    private primeng: PrimeNG,
    private channelsService: ChannelsService
  ) {
  }

  ngOnInit(): void {
    this.primeng.ripple.set(true);

    this.channelsService.getChannels().pipe(takeUntil(this._unsubscribeAll)).subscribe(channels => {
      this._channels = channels;
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
