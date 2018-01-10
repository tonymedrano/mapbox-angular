export interface IGeomentry {
    type: string;
    coordinates: number[]
}

export interface IGeoJson {
    type: string;
    geometry: IGeomentry;
    properties?: any;
    $keky?: string;
}

export class GeoJson implements IGeoJson {
    type = 'Feature';
    geometry: IGeomentry;

    constructor(coordinates, public properties){
        this.geometry = {
            type: 'Point',
            coordinates: coordinates
        }
    }
}
