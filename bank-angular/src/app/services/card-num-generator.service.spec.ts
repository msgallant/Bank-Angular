import { TestBed } from '@angular/core/testing';

import { CardNumGeneratorService } from './card-num-generator.service';

describe('CardNumGeneratorService', () => {
  let service: CardNumGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardNumGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
