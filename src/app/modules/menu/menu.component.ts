import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  providers: [MessageService]
})
export class MenuComponent implements OnInit {

  items: MenuItem[] = [];
  constructor( private messageService:MessageService) {}

  ngOnInit() {
    this.items = [
      {
          label: 'Reportes Mercantil',
          items: [
              {
                  label: 'Sociedades inscritas',                  
                  command: () => {
                      this.update();
                  }
              },
              {
                  label: 'Aperturas de Sucursales',                  
                  command: () => {
                      this.delete();
                  }
              },
              {
                label: 'Comerciantes inscritos',                
                command: () => {
                    this.delete();
                }
            }
          ]
      }      
  ];
  }

  update() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated' });
    }

  delete() {
      this.messageService.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted' });
  }

}
