import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Subject } from 'rxjs/Subject'

@Injectable()
export class MapShareService {
    private subject = new Subject<any>()
    private notifyChange = new Subject<any>()

    sendMapData(data: any) {
        this.subject.next({ data: data })
    }

    getMapData(): Observable<any> {
        return this.subject.asObservable()
    }

    notifyChangeComp(data: any) {
        this.notifyChange.next(data)
    }

    getChangeComp(): Observable<any> {
        return this.notifyChange.asObservable()
    }
}