import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import { IDepartamento,IMunicipio } from "src/app/Interfaces/ICatalogos";


@Injectable({
  providedIn: 'root'
})
export class MercantilReportService {

  sinContenido: boolean = true;
  //private urlServicio:string;
  private urlServicioCatalogo:string | undefined;
  private host: any;
  public localser = false;
  private cadena:string | undefined;
  private departamentos: IDepartamento[] = [];
  private municipios: IMunicipio[] = [];

  constructor(private http:HttpClient) { 

    this.host = location.host.split(':');
    if(this.host[0] === 'localhost'){

      this.localser = true;
      this.cadena = 'http://localhost:62750/';//location.host;

      /************** AMBIENTE DESARROLLO *********************************/
      //this.urlServicioCatalogo = 'http://serviciosdesarrollo.registropublico.gob.ni' + '/api/CatalogoReporte/'
      
       /************** AMBIENTE PREPRODUCCION *********************************/
      //this.urlServicioCatalogo = 'https://siicarpreproduccion.registropublico.gob.ni'+'/api/CatalogoReporte/'

       /************** AMBIENTE INSIDENCIA *********************************/
       //this.urlServicioCatalogo = 'http://reg15win.registropublico.gob.ni/' + '/api/CatalogoReporte/'

       /************** AMBIENTE PRODUCTIVO *********************************/
        //this.urlServicioCatalogo = 'https://srv-siicar-app.registropublico.gob.ni/'+'/api/CatalogoReporte/'

        this.urlServicioCatalogo = this.cadena + '/api/CatalogoReporte/'
    }
  }

    public ObtenerCatalogos():Observable<any>{
      const url = 'http://localhost:62750/api/CatalogoReporte/' + 'ObtenerCatalogos'
      return this.http.get(url,{responseType:'json'});
    }

    public ObtenerSincronizacionActiva(codigoInternoTipoSinc:string):Observable<any>{
      const url = 'http://localhost:62750/api/ReporteMercantil/'+ 'ObtenerSincronizacionActiva?codigo_tipoSincronizacion=' + codigoInternoTipoSinc;
      return this.http.get(url,{responseType:'json'})
    }

    cambiarEstadoSinContenido(nuevoEstado: boolean):boolean {
      return this.sinContenido = nuevoEstado;}

}
