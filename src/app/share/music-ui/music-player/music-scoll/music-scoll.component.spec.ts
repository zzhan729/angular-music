import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicScollComponent } from './music-scoll.component';

describe('MusicScollComponent', () => {
  let component: MusicScollComponent;
  let fixture: ComponentFixture<MusicScollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicScollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicScollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
