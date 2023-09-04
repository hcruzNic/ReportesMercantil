import { Component, OnInit } from '@angular/core';
import { left } from '@popperjs/core';

@Component({
  selector: 'app-pie-mercantil',
  templateUrl: './pie-mercantil.component.html',
  styleUrls: ['./pie-mercantil.component.css']
})
export class PieMercantilComponent implements OnInit {

   constructor() { }

    data: any;
    options: any; 

  ngOnInit(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    this.data = {
                  labels: ['Activa', 'Disuelta', 'Disuelta y Liquidada','Inactiva','No definido',"Cancelada"],
                  datasets: [
                      {
                          data: [18780,12, 12,350,104,0],
                          backgroundColor: [
                                              documentStyle.getPropertyValue('--blue-500'), 
                                              documentStyle.getPropertyValue('--yellow-500'), 
                                              documentStyle.getPropertyValue('--red-500'),
                                              documentStyle.getPropertyValue('--gray-500'), 
                                              documentStyle.getPropertyValue('--purple-500')],
                          hoverBackgroundColor: [
                                                  documentStyle.getPropertyValue('--blue-300'), 
                                                  documentStyle.getPropertyValue('--yellow-400'), 
                                                  documentStyle.getPropertyValue('--red-400'),
                                                  documentStyle.getPropertyValue('--gray-400'), 
                                                  documentStyle.getPropertyValue('--purple-400')]
                      }
                  ]
  };
  this.options = {
      plugins: {
          legend: {
              labels: {
                  usePointStyle: true,
                  color: textColor,
                  position:left,
                  display:false
              }
          }
      }
  };
  }

}
