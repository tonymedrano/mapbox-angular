import { Component, OnInit } from '@angular/core'
import * as mapboxgl from 'mapbox-gl'

import { MapService } from '../map/map.service'
import { GeoJson } from '../map/map'

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
	populationMsg: string = "..."
	map: any
	events: any
	popultationButtonText: string
	layers: Array<any> = ['0-10', '10-20', '20-50', '50-100', '100-200', '200-500', '500-1000', '1000+']
	colors: Array<any> = ['#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C', '#BD0026', '#800026']

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
			} else {
				this.county = this.cityMsg
				this.population = null
			}
		})
	}

	showByPopulation() {
		//. Get styles changed
		this.switchLayer = ! this.switchLayer
		if(this.switchLayer){
			this.popultationButtonText = "Hide by Density"
			this._mapShareService.notifyChangeComp(true)
		} else {
			this.popultationButtonText = "Show by Density"
			this._mapShareService.notifyChangeComp(false)
		}
	}
}