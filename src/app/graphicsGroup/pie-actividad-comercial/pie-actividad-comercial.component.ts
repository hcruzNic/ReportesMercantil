import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-actividad-comercial',
  templateUrl: './pie-actividad-comercial.component.html',
  styleUrls: ['./pie-actividad-comercial.component.css']
})
export class PieActividadComercialComponent implements OnInit {

  constructor() { }

  data: any;
  options: any;

  ngOnInit(): void {

    const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.data = {
            labels: ['A', 'B', 'C'],
            datasets: [
                {
                    data: [540, 325, 702],
                    backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
                }
            ]
        };

        this.options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };
  }

}
