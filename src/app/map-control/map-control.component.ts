import { Component, OnInit } from '@angular/core';

import { MapShareService } from '../share/map.share.sevice';

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

	constructor(private _mapShareService: MapShareService) { }

	ngOnInit() {
		this.county = this.cityMsg
		this._mapShareService.getMapData().subscribe(map => {
			if (map.data !== null) {
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
}