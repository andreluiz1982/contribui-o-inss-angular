import { TestBed } from '@angular/core/testing';

import { AliquotaService } from './aliquota.service';

describe('AliquotaService', () => {
  let service: AliquotaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AliquotaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
