import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MercantilReportService } from 'src/app/services/mercantil-report.service';
import { IDepartamento,IMunicipio} from 'src/app/Interfaces/ICatalogos'
import { Calendar } from "primeng/calendar";



@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],  
})
export class FiltersComponent implements OnInit {

  showCalendarDiario: boolean = false;
  showCalendarMes: boolean = false;
  showCalendarTrim:boolean = false;
  showCalendarSem:boolean = false;
  showCalendarAnual:boolean = false;
  showCalendarRange : boolean = false;


  date:Date | undefined;
  mes: Date[] | undefined;
  rangeDates:Date[] | undefined;
  
  public selectedDepartamento:IDepartamento ={IdDepartamento:0, Departamento:''};
  listaDepartamentos:IDepartamento[] = [];
  public selectedMunicipio:IMunicipio ={IdMunicipio:0, Municipio:'',IdDepartamento:0, Departamento:''};
  listaMunicipios:IMunicipio[] = [];
  Municipios:IMunicipio[] = [];  

  formGroup!: FormGroup;


  constructor( private mercantilReportService:MercantilReportService) { }

  periodo: any[] = [
    { name: 'Diario', key: 'D' },
    { name: 'Mensual', key: 'M' },
    { name: 'Trimestral', key: 'T' },
    { name: 'Semestral', key: 'S' },
    { name: 'Anual', key:'A'},
    { name: 'Rango', key:'R'}
  ];

  ngOnInit(): void {   

    this.date = new Date();    
    
    this.formGroup = new FormGroup({
      selectedFrecuencia : new FormControl<string|null>(null),
      selectedDepartamento: new FormControl<IDepartamento>(this.selectedDepartamento),
      selectedMunicipio: new FormControl<IMunicipio>(this.selectedMunicipio),
    });

    this.mercantilReportService.ObtenerCatalogos().subscribe(data => {
        this.listaDepartamentos = data.Departamentos;
        this.listaMunicipios = data.Municipios;  
      });

      this.formGroup.get('selectedFrecuencia')?.valueChanges.subscribe((value) => {       

        if (value === 'D') {
          this.showCalendarForDiario();
        } else if (value === 'M') {
          this.showCalendarForMes();
        } else if (value === 'T') {
          this.showCalendarForTrim();
        } else if (value == 'S') {
          this.showCalendarForSem();
        } else if(value == 'A'){
          this.showCalendarForAnual();
        } else if(value == 'R'){
          this.showCalendarForRange();
        }
      });
    
  }

  onSelect(selectedDep: IDepartamento):void{
    this.Municipios = this.listaMunicipios.filter((item:any) => item.IdDepartamento == selectedDep.IdDepartamento);    
  };

  onDateSelect(event:any){
    if (this.rangeDates && this.rangeDates.length > 1) {
      const diffMonths = Math.abs(this.rangeDates[0].getMonth() - this.rangeDates[1].getMonth());

      if (diffMonths > 2) {
        this.rangeDates.pop();
      }else if (this.rangeDates.length == 2) {
        const lastDate = new Date(this.rangeDates[1].getFullYear(), this.rangeDates[1].getMonth()+1,0);
        this.rangeDates[1] = lastDate;
      } 
    }
  }
  
  showCalendarForDiario() {
    this.showCalendarDiario = true;
    this.showCalendarMes = false;
    this.showCalendarTrim = false;
    this.showCalendarSem = false;
    this.showCalendarAnual = false;
    this.showCalendarRange = false;
  }

  showCalendarForMes() {
    this.showCalendarDiario = false;
    this.showCalendarMes = true;
    this.showCalendarTrim = false;
    this.showCalendarSem = false;
    this.showCalendarAnual = false;
    this.showCalendarRange = false;
  }
  
  showCalendarForTrim(){
    this.showCalendarDiario = false;
    this.showCalendarMes = false;
    this.showCalendarTrim = true;
    this.showCalendarSem = false;
    this.showCalendarAnual = false;
    this.showCalendarRange = false;
  }

  showCalendarForSem(){
    this.showCalendarDiario = false;
    this.showCalendarMes = false;
    this.showCalendarTrim = false;
    this.showCalendarSem = true;
    this.showCalendarAnual = false;
    this.showCalendarRange = false;
  }
  showCalendarForAnual(){
    this.showCalendarDiario = false;
    this.showCalendarMes = false;
    this.showCalendarTrim = false;
    this.showCalendarSem = false;
    this.showCalendarAnual = true;
    this.showCalendarRange = false;
  }

  showCalendarForRange(){
    this.showCalendarDiario = false;
    this.showCalendarMes = false;
    this.showCalendarTrim = false;
    this.showCalendarSem = false;
    this.showCalendarAnual = false;
    this.showCalendarRange = true;
  }

}