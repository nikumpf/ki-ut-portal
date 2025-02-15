import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ChannelsService } from '../../services/channels.service';
import { IChannel } from '../../models/channel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-channels-configuration',
  templateUrl: './channels-configuration.component.html',
  styleUrl: './channels-configuration.component.scss',
  standalone: true,
  imports: [CommonModule]
})
export class ChannelsConfigurationComponent implements OnInit, OnDestroy {
  _channels: IChannel[] = [];
  channelId: string = '';
  currentChannel?: IChannel = undefined;

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  
  constructor(
    private route: ActivatedRoute,
    private channelsService: ChannelsService) { 
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.channelId = params.get('id') ?? '';
    });

    this.channelsService.getChannels().pipe(takeUntil(this._unsubscribeAll)).subscribe(channels => {
      this._channels = channels;

      if(this.channelId) {
        this.currentChannel = this._channels.find(c => c.id === this.channelId);
      }
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
