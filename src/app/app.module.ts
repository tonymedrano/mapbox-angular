import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { NavModule } from './nav/nav.module'
import { MapModule } from './map/map.module'
import { MapControlModule } from './map-control/map-control.module'

import { MapShareService } from './share/map.share.sevice'

@NgModule({
  declarations: [
    AppComponent,
],
  imports: [
    BrowserModule,
    NavModule,
    MapModule,
    MapControlModule
  ],
  providers: [MapShareService],
  bootstrap: [AppComponent]
})
export class AppModule { }
