import { Component, OnInit,Input } from '@angular/core';



@Component({
  selector: 'app-kpi-cards',
  templateUrl: './kpi-cards.component.html',
  styleUrls: ['./kpi-cards.component.css']
})
export class KpiCardsComponent implements OnInit {
  @Input()dataSincronizacion: any;
  constructor() { }

  ngOnInit(): void {
   
  }

}
