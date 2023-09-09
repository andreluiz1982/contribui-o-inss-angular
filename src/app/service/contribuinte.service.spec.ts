import { TestBed } from '@angular/core/testing';

import { ContribuinteService } from './contribuinte.service';

describe('ContribuinteService', () => {
  let service: ContribuinteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContribuinteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
