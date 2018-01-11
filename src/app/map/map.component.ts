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
  style = 'mapbox://styles/mapbox/outdoors-v9'
  lat = 52.64306344
  lng = -0.96679687
  zoom = 5.5

  //. data
  jsonData: GeoJson

  //. popup
  popup = new mapboxgl.Popup

  isStyle: boolean = false
  private subscription: Subscription
  
  constructor(private mapService: MapService, private _mapShareService: MapShareService) {
    this.popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    })
  }

  ngOnInit() {
    //. Get data
    this.mapService.getJSON().subscribe((data: GeoJson) => {
      this.jsonData = data
    })
    this.buildMap()
    this.subscription = this._mapShareService.getChangeComp().subscribe((bool)=>{
      this.changeMapStyle(bool)
    })
  }

  changeMapStyle(isStyle){
    if(isStyle) this.style = 'mapbox://styles/tonymedrano/cjc9vt1h505x22snt5gfsy3hf' //. Population style
    else this.style = 'mapbox://styles/mapbox/outdoors-v9' //. Default style
    this.buildMap()
  }

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
          "line-color": "#000000",
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

        // Populate the popup and set its coordinates
        this.popup.setLngLat([long, lat])
          .setHTML(`<strong>${e.features[0].properties.ctyua16nm}</strong>`)
          .addTo(this.map)

        this._mapShareService.sendMapData({
          map: this.map,
          event: currentEvent
        }) //. sharing data to MapControl
      })
      

      // Reset the counties-fills-hover layer's filter when the mouse leaves the layer.
      this.map.on("mouseleave", "county-fills", () => {
        this.map.setFilter("county-fills-hover", ["==", "ctyua16nm", ""])
        this.map.getCanvas().style.cursor = ''
        this.popup.remove()
        this._mapShareService.sendMapData(null) //. sharing data to MapControl
      })
    })
  }
}
