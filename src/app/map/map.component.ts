import { Component, OnInit, Input } from '@angular/core'
import { Subscription } from 'rxjs/Subscription'
import * as mapboxgl from 'mapbox-gl'

import { MapService } from './map.service'
import { GeoJson } from './map'

import { MapShareService } from '../share/map.share.sevice'

@Component({
  selector: 'map-box',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  //. default settings
  map: mapboxgl.Map
  style: string
  styleDefault: string = 'mapbox://styles/mapbox/outdoors-v9'
  stylePopulation: string = 'mapbox://styles/tonymedrano/cjc9vt1h505x22snt5gfsy3hf'
  lat: number = 52.64306344
  lng: number = -0.96679687
  zoom: number = 5.5

  //. Legensd data
  county: string
  population: string

  //. data
  jsonData: GeoJson

  //. popup
  popup: any = new mapboxgl.Popup

  isStyle: boolean = false //. If styles is for default or population
  isZoomCtrl: boolean = false  //. If zoom to show or hide
  private subscription: Subscription

  layers: Array<any>
  colors: Array<any>


  constructor(private mapService: MapService, private _mapShareService: MapShareService) {
    this.popup = new mapboxgl.Popup({ //. Setting popup
      closeButton: false,
      closeOnClick: false
    })
    this.style = this.styleDefault //. Setting map default style
    //. Legend data content
    this.colors = ['#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C', '#BD0026', '#800026']
    this.layers = ['0-10', '10-20', '20-50', '50-100', '100-200', '200-500', '500-1000', '1000+']
    //. Initial text
    this.county = "Hover over a county"
    this.population = "..."
  }

  ngOnInit() {
    //. Getting the data
    this.mapService.getJSON().subscribe((data: GeoJson) => {
      this.jsonData = data
    })
    this.buildMap()
    this.subscription = this._mapShareService.getChangeComp().subscribe(() => {
      this.changeMapStyle() //. Executes an update to density view
    })

    this.subscription = this._mapShareService.gendMapControl().subscribe((action) => {
      this.activateDeactivateMapactions(action) //. Activate/ deactivate controls
    })
  }

  changeMapStyle() {
    this.isStyle = !this.isStyle
    if (this.isStyle) this.style = this.stylePopulation //. Population style
    else this.style = this.styleDefault //. Default style
    this.buildMap()
  }

  activateDeactivateMapactions(action) { 
    //. Eventhandler to apply action from radio buttons
    let handler = action.target.id;
    if (action.target.checked) this.map[handler].enable()
    else if (handler) {
      this.map[handler].disable()
    }
  }

  //. Building the map - first entry
  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat]
    })

    //. Add realtime data on map load
    this.map.on('load', (event) => {
      this.map.addSource("counties", {
        "type": "geojson",
        "data": this.jsonData
      })

      //. Map Layer deafult settings
      this.map.addLayer({
        "id": "county-fills",
        "type": "fill",
        "source": "counties",
        "layout": {},
        "paint": {
          "fill-color": "#627BC1",
          "fill-opacity": 0
        }
      })

      this.map.addLayer({
        "id": "county-borders",
        "type": "line",
        "source": "counties",
        "layout": {},
        "paint": {
          "line-color": this.isStyle ? "#ffffff" : "#273646",
          "line-width": 1,
          "line-opacity": 0.3
        }
      })

      //. Map Layer  state mouseleave
      this.map.addLayer({
        "id": "county-fills-hover",
        "type": "fill",
        "source": "counties",
        "layout": {},
        "paint": {
          "fill-color": "#627BC1",
          "fill-opacity": 0.3
        },
        "filter": ["==", "ctyua16nm", ""]
      })

      // When the user moves their mouse over the counties-fill layer, we'll update the filter in
      // the counties-fills-hover layer to only show the matching county, thus making a hover effect.
      this.map.on("mousemove", "county-fills", (e) => {
        let currentEvent = e
        this.map.setFilter("county-fills-hover", ["==", "ctyua16nm", e.features[0].properties.ctyua16nm])
        this.map.getCanvas().style.cursor = 'pointer'

        let lat = e.features[0].properties.lat + 0.20
        let long = e.features[0].properties.long

        //. Legend view
        this.county = e.features[0].properties.ctyua16nm
        this.population = e.features[0].properties.bng_e

        // Populate the popup and set its coordinates
        this.popup.setLngLat([long, lat])
          .setHTML(`<p>County: <h1>${e.features[0].properties.ctyua16nm}</h1></strong>`)
          .addTo(this.map)

        if (this.isStyle) {
          this.popup.setHTML(`<p>Density: <h1>${e.features[0].properties.bng_e}</h1></strong>`)
            .addTo(this.map)
        }

        this._mapShareService.sendMapData({
          map: this.map,
          event: currentEvent
        }) //. sharing data to MapControl
      })


      // Reset the counties-fills-hover layer's filter when the mouse leaves the layer.
      this.map.on("mouseleave", "county-fills", () => {
        this.map.setFilter("county-fills-hover", ["==", "ctyua16nm", ""])
        this.county = "Hover over a county"
        this.population = "..."
        this.map.getCanvas().style.cursor = ''
        this.popup.remove()
        this._mapShareService.sendMapData(null) //. sharing data to MapControl
      })
    })
  }
}
