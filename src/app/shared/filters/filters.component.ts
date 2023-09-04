import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MercantilReportService } from 'src/app/services/mercantil-report.service';
import { IDepartamento,IMunicipio} from 'src/app/Interfaces/ICatalogos'



@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],  
})
export class FiltersComponent implements OnInit {

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
    
    this.formGroup = new FormGroup({
      selectedFrecuencia:new FormControl<boolean|null>(null)
    });

    this.mercantilReportService.ObtenerCatalogos().subscribe(data => {
        this.listaDepartamentos = data.Departamentos;
        this.listaMunicipios = data.Municipios;  
      });
    
  }

  onSelect(selectedDep: IDepartamento):void{
    this.Municipios = this.listaMunicipios.filter((item:any) => item.IdDepartamento == selectedDep.IdDepartamento);    
  };
  
}