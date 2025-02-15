import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ChannelsService } from '../../services/channels.service';
import { IChannel } from '../../models/channel';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-channels-configuration',
  templateUrl: './channels-configuration.component.html',
  styleUrl: './channels-configuration.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule]
})
export class ChannelsConfigurationComponent implements OnInit, OnDestroy {
  _channels: IChannel[] = [];
  channelId: string = '';
  currentChannel?: IChannel = undefined;
  tempChannel: Partial<IChannel> = {};
  editingField: string | null = null;

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

  toggleEdit(field: keyof IChannel): void {
    if (this.editingField === field) {
      this.saveChanges(field);
    } else {
      this.editingField = field;
      this.tempChannel[field as keyof IChannel] = this.currentChannel ? (this.currentChannel[field as keyof IChannel] as any) : undefined;
    }
  }

  cancelEdit(): void {
    this.editingField = null;
    this.tempChannel = { ...this.currentChannel };  // Setzt die temporären Werte zurück
  }

  saveChanges<T extends keyof IChannel>(field: T): void {
    if (this.currentChannel) {
      this.currentChannel[field] = this.tempChannel[field] as IChannel[T];
      this.updateChannel(this.currentChannel);
    }
    this.editingField = null;
  }

  updateChannel(channel: IChannel) {
    this.channelsService.updateChannel(channel).subscribe(
      updatedChannel => {
        console.log('Channel updated:', updatedChannel);
        // Optional: Die Kanäle neu laden
        this.channelsService.getChannels();
      },
      error => console.error('Update failed', error)
    );
  }
}
