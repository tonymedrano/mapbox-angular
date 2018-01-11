import { TestBed, inject } from '@angular/core/testing'
import { HttpModule } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/Rx'

import { MapControlComponent } from './map-control.component'
import { MapShareService } from '../share/map.share.sevice'
import { MapService } from '../map/map.service'

describe('MapControlComponent', () => {
	let component: MapControlComponent

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpModule],
			providers: [
				MapControlComponent,
				MapShareService,
				MapService
			]
		})
	})

	// instantiation through framework injection
	beforeEach(inject([MapControlComponent], (MapControlComponent) => {
		component = MapControlComponent
	}))

	it('should create the Nav Mapbox App', () => {
		expect(component).toBeDefined()
	})
})
