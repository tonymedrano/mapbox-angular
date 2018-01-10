import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { HttpModule } from '@angular/http'
import { MapComponent } from './map.component'

import { MapService } from './map.service'
import { MapShareService } from '../share/map.share.sevice'

describe('MapComponent', () => {
  let component: MapComponent
  let fixture: ComponentFixture<MapComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [ MapComponent ],
      providers: [MapService, MapShareService]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
