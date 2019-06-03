import { TestBed } from '@angular/core/testing';

import { FormcategoryService } from './formcategory.service';

describe('FormcategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormcategoryService = TestBed.get(FormcategoryService);
    expect(service).toBeTruthy();
  });
});
