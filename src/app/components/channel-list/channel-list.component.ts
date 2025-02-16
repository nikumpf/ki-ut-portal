import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ChannelsService } from '../../services/channels.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { IChannel } from '../../models/channel';

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrl: './channel-list.component.scss',
  standalone: true,
  imports: [CommonModule, MenuModule, RippleModule, ButtonModule]
})
export class ChannelListComponent implements OnInit, OnDestroy {
  items: MenuItem[] = [];
  _channels: IChannel[] = [];

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  
  constructor(
    private router: Router,
    private channelsService: ChannelsService
  ) {
  }

  ngOnInit() {
    this.items = [
      {
          label: 'Optionen',
          items: [
              {label: 'Sender hinzufügen', icon: 'pi pi-fw pi-video', command: () => this.onAddChannel()},
          ]
      }];

      this.channelsService.getChannels().pipe(takeUntil(this._unsubscribeAll)).subscribe(channels => {
        this._channels = channels;
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  onAddChannel() {
    const addedChannel = this.channelsService.addChannel();
    this.router.navigate([`/channels/`,addedChannel.id]);
  }

  onEditChannel(channel: IChannel) {
    this.router.navigate([`/channels/${channel.id}`]);
  }
}
