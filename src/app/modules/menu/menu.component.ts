import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { MercantilReportService } from "src/app/services/mercantil-report.service";


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  providers: []
})
export class MenuComponent implements OnInit {

  items: MenuItem[] = [];
  constructor( private mercantilReport:MercantilReportService) {}

  ngOnInit() {
    this.items = [
      {
          label: 'Reportes Mercantil',
          items: [
              {
                  label: 'Sociedades inscritas',                  
                  routerLink:['/sociedadesInscritas']                                  
              },
              {
                  label: 'Aperturas de Sucursales',                  
                  routerLink:['/sucursales']
              },
              {
                label: 'Comerciantes inscritos',                
                routerLink:['/comerciantes']
              }
          ]
      }      
    ];
  } 

}
