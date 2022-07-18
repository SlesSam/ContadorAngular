import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PContadorComponent } from './pcontador.component';

describe('PContadorComponent', () => {
  let component: PContadorComponent;
  let fixture: ComponentFixture<PContadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PContadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PContadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
