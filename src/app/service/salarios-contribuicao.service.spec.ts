import { TestBed } from '@angular/core/testing';

import { SalariosContribuicaoService } from './salarios-contribuicao.service';

describe('SalariosContribuicaoService', () => {
  let service: SalariosContribuicaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalariosContribuicaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
