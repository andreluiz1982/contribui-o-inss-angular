import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AliquotaComponent } from './aliquota.component';

describe('AliquotaComponent', () => {
  let component: AliquotaComponent;
  let fixture: ComponentFixture<AliquotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AliquotaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AliquotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
