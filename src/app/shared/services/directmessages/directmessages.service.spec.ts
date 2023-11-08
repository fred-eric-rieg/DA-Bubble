import { TestBed } from '@angular/core/testing';

import { DirectmessagesService } from './directmessages.service';

describe('DirectmessagesService', () => {
  let service: DirectmessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirectmessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
