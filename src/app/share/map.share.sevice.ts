import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Subject } from 'rxjs/Subject'

@Injectable()
export class MapShareService {
    //. Share map data in between - Component data
    private subject = new Subject<any>()

    //. Share map controller in between - Component controllers
    private notifyChange = new Subject<any>()

    //. Share map controller in between - Component controllers activation
    private activateDeactivate = new Subject<any>()

    //. Component data
    sendMapData(data: any) {
        this.subject.next({ data: data })
    }

    getMapData(): Observable<any> {
        return this.subject.asObservable()
    }

    //. Component controllers
    notifyChangeComp(data: any) {
        this.notifyChange.next(data)
    }

    getChangeComp(): Observable<any> {
        return this.notifyChange.asObservable()
    }

    //. Component controllers
    sendMapControl(data: any) {
        this.activateDeactivate.next(data)
    }

    gendMapControl(): Observable<any> {
        return this.activateDeactivate.asObservable()
    }
}