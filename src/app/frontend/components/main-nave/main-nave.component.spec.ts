import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNaveComponent } from './main-nave.component';

describe('MainNaveComponent', () => {
  let component: MainNaveComponent;
  let fixture: ComponentFixture<MainNaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainNaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
