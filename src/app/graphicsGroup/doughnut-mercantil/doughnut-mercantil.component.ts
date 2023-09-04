import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doughnut-mercantil',
  templateUrl: './doughnut-mercantil.component.html',
  styleUrls: ['./doughnut-mercantil.component.css']
})
export class DoughnutMercantilComponent implements OnInit {

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
                    data: [300, 50, 100],
                    backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
                }
            ]
        };


        this.options = {
            cutout: '60%',
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            }
        };
  }

}
