import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { NavModule } from './nav/nav.module'
import { MapModule } from './map/map.module'
import { MapControlModule } from './map-control/map-control.module'

import { MapShareService } from './share/map.share.sevice'

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [MapShareService],
      imports: [NavModule, MapModule, MapControlModule],
    }).compileComponents();
  }));

  it('should create the Mapbox App', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
