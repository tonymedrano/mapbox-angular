import { TestBed, async } from '@angular/core/testing';

import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavComponent
      ],
    }).compileComponents();
  }));

  it('should create the Nav Mapbox App', async(() => {
    const fixture = TestBed.createComponent(NavComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
