import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ChannelsService } from './services/channels.service';
import { IChannel } from './models/channel';
import { PrimeNG } from 'primeng/config';

import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { StyleClassModule } from 'primeng/styleclass';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, StyleClassModule, CommonModule, RouterModule, ConfirmDialogModule, ToastModule],
})
export class AppComponent implements OnInit, OnDestroy {
  _channels: IChannel[] = [];
  selectedChannelId: string | null = null;
  isMenuOpen = false;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  title = 'app';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private primeng: PrimeNG,
    private channelsService: ChannelsService
  ) {
  }

  ngOnInit(): void {
    this.primeng.ripple.set(true);

    this.channelsService.getChannels().pipe(takeUntil(this._unsubscribeAll)).subscribe(channels => {
      this._channels = channels;
    });

    this.router.events.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
      const url = this.router.url;
      const match = url.match(/\/channels\/([0-9a-fA-F-]{36})/);
      if(!!match && !this.isMenuOpen) {
        this.isMenuOpen = true;
      }

      this.selectedChannelId = match ? match[1] : null;
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  toggleMenu(event: Event): void {
    event.stopPropagation(); // Stoppt das Event, damit der Router nicht anspringt
    event.preventDefault();  // Verhindert, dass der Klick die Seite beeinflusst

    this.isMenuOpen = !this.isMenuOpen;
  }
}
