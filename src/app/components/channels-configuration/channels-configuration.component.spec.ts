import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelsConfigurationComponent } from './channels-configuration.component';

describe('ChannelsConfigurationComponent', () => {
  let component: ChannelsConfigurationComponent;
  let fixture: ComponentFixture<ChannelsConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChannelsConfigurationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChannelsConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
