import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapControlComponent } from './map-control.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MapControlComponent],
  exports: [MapControlComponent]
})
export class MapControlModule { }