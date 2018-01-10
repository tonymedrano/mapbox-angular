import { Injectable } from '@angular/core'
import { Http, Headers, Response } from '@angular/http'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/map'

import { environment } from 'environments/environment'

import { GeoJson } from './map'
import * as mapboxgl from 'mapbox-gl'

@Injectable()
export class MapService {

    url: string = "http://geoportal1-ons.opendata.arcgis.com/datasets/687f346f5023410ba86615655ff33ca9_4.geojson"

    constructor(private http: Http) {
        mapboxgl.accessToken = environment.mapbox.accessToken
    }

    getJSON(): Observable<GeoJson> {
        return this.http.get(this.url)
            .map((res: Response) => res.json(),
            (error: Response) => {
                console.log(error)
            })
    }

}