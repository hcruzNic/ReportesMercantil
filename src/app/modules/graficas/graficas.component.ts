import { Component, OnInit } from '@angular/core';
import { SharedDataService } from "src/app/services/shared-data.service";


@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css']
})
export class GraficasComponent implements OnInit { 

  hasData: boolean = false;

  constructor(private sharedDataService: SharedDataService) { }

  ngOnInit(): void { 
    this.sharedDataService.hasData$.subscribe((hasData) => {
      this.hasData = hasData;
    });
  }

}