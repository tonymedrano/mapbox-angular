import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpModule } from '@angular/http'

import { MapComponent } from './map.component'
import { MapService } from './map.service'

@NgModule({
    imports: [
        CommonModule,
        HttpModule
    ],
    providers: [MapService],
    declarations: [MapComponent],
    exports: [MapComponent]
})
export class MapModule { }