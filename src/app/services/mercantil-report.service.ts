import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class MercantilReportService {

  private urlServicio: string;
  private urlServicioMercantil: string;
  private host: any;

  public locaser = false;

  constructor(private http:HttpClient) { 

    this.host = location.host.split(':');
    if(this.host[0] === 'localhost'){
      this.locaser = true;
    }

    

  }
}
