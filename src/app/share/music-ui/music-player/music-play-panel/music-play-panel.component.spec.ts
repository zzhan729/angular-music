import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicPlayPanelComponent } from './music-play-panel.component';

describe('MusicPlayPanelComponent', () => {
  let component: MusicPlayPanelComponent;
  let fixture: ComponentFixture<MusicPlayPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicPlayPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicPlayPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
