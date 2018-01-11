import { Component, OnInit } from '@angular/core'
import * as mapboxgl from 'mapbox-gl'

import { MapService } from '../map/map.service'
import { MapShareService } from '../share/map.share.sevice'

@Component({
	selector: 'map-control',
	templateUrl: './map-control.component.html',
	styleUrls: ['./map-control.component.css']
})

export class MapControlComponent implements OnInit {
	county: string
	population: string
	cityMsg: string = "Hover over counties"
	populationMsg: string
	map: any
	events: any
	popultationButtonText: string
	switchLayer: boolean = false

	constructor(private _mapShareService: MapShareService, private mapService: MapService) {
		this.popultationButtonText = "Show by Density"
	}

	ngOnInit() {
		this.county = this.cityMsg
		this._mapShareService.getMapData().subscribe(map => {
			if (map.data !== null) {
				this.map = map.data.map
				this.events = map.data.event.features[0].properties
				let counties = map.data.map.queryRenderedFeatures(map.data.event.point, {
					layers: ['county-fills']
				})

				if (counties.length > 0) { //.  show popup
					this.county = map.data.event.features[0].properties.ctyua16nm
					this.population = map.data.event.features[0].properties.bng_e
				}
			} else {  //.  hide popup
				this.county = this.cityMsg
				this.population = null
			}
		})
	}

	showByPopulation() { //. Notify change to Map Comp - this.changeMapStyle()
		this._mapShareService.notifyChangeComp(false)
		this.switchLayer = !this.switchLayer
		if (this.switchLayer) this.popultationButtonText = "Show by County"
		else this.popultationButtonText = "Show by Density"
	}

	mapControlActivateDesactivate(e) {  //. Notify change to Map Comp - this.activateDeactivateMapactions()
		this._mapShareService.sendMapControl(e)
	}
}