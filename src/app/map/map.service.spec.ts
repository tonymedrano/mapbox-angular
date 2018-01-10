/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing'
import { HttpModule, Http } from '@angular/http'
import { MockBackend, MockConnection } from '@angular/http/testing'

import { MapService } from './map.service'
import { MapShareService } from '../share/map.share.sevice'

describe('MapService: map.service.ts', () => {
  let service: MapService
  let backend: MockBackend

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [MapService, MockBackend, MapShareService]
    })
    service = TestBed.get(MapService)
  })

  it('MapService should be created', inject([MapService], (service: MapService) => {
    expect(service).toBeTruthy()
  }))

  it('MapService should return the API request', inject([MapService], (service: MapService) => {
    async(inject([Http, MockBackend], (http: Http, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe((c: MockConnection) => {
        expect(c.request.url).toBe(service.url)
      })
    }))
  }))

});
