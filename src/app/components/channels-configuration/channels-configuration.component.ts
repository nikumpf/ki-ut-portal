import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-channels-configuration',
  imports: [],
  templateUrl: './channels-configuration.component.html',
  styleUrl: './channels-configuration.component.scss'
})
export class ChannelsConfigurationComponent implements OnInit {
  private channelId: string = '';

  constructor(private route: ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.channelId = params.get('id') ?? '';
    });
  }
}
