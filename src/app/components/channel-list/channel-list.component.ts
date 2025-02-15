import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ChannelsService } from '../../services/channels.service';

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrl: './channel-list.component.scss',
  standalone: true,
  imports: [MenuModule, RippleModule, ButtonModule]
})
export class ChannelListComponent implements OnInit {
  items: MenuItem[] = [];

  constructor(
    private channelService: ChannelsService
  ){}

  ngOnInit() {
    this.items = [
      {
          label: 'Optionen',
          items: [
              {label: 'Sender hinzufügen', icon: 'pi pi-fw pi-video', command: () => this.onAddChannel()},
          ]
      }];
  }

  onAddChannel() {
    this.channelService.addChannel();
  }
}
