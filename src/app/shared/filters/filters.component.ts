import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MercantilReportService } from 'src/app/services/mercantil-report.service';
import { IDepartamento,IMunicipio} from 'src/app/Interfaces/ICatalogos'
import { IParametroReporte } from "src/app/Interfaces/IParametro-reporte";
import { PieMercantilComponent } from "src/app/graphicsGroup/pie-mercantil/pie-mercantil.component";
import { SharedDataService } from "src/app/services/shared-data.service";
import { Observable } from "rxjs";
import { Calendar } from "primeng/calendar";
import { endWith } from 'rxjs';



@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],  
})
export class FiltersComponent implements OnInit {

  @ViewChild(PieMercantilComponent, { static: false })
  private pieMercantilComponent!: PieMercantilComponent;

  showCalendarDiario: boolean = false;
  showCalendarMes: boolean = false;
  showCalendarTrim:boolean = false;
  showCalendarSem:boolean = false;
  showCalendarAnual:boolean = false;
  showCalendarRange : boolean = false;
  sociedadEstadoData:any[] | undefined;
  hasData: boolean = false;
  //showKpiCard: boolean = false;
  


  date:Date | undefined;
  mes: Date[] | undefined;
  rangeDates:Date[] | undefined;
  
  public selectedDepartamento:IDepartamento ={IdDepartamento:0, Departamento:''};
  listaDepartamentos:IDepartamento[] = [];
  public selectedMunicipio:IMunicipio ={IdMunicipio:0, Municipio:'',IdDepartamento:0, Departamento:''};
  listaMunicipios:IMunicipio[] = [];
  Municipios:IMunicipio[] = [];  

  formGroup!: FormGroup;


  constructor( private mercantilReportService:MercantilReportService, private sharedDataService:SharedDataService) { }

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
        date: new FormControl<Date>(new Date()),
        rangeDates: new FormControl<Date[] | undefined>([new Date(), new Date()]),
      });

      this.mercantilReportService.ObtenerCatalogos().subscribe(data => {
        this.listaDepartamentos = data.Departamentos;
        this.listaMunicipios = data.Municipios;  
      });

      this.formGroup.get('selectedFrecuencia')?.valueChanges.subscribe((value) => {       
        this.handleFrecuenciaChange(value);        
      });   
  }

  handleFrecuenciaChange(value: string): void {
      if (value === 'D') {
        this.formGroup.get('date')?.setValue(new Date());
        this.showCalendarForDiario();
        //this.callSociedadesInscritas();
      } else if (value === 'M') {
        this.formGroup.get('date')?.setValue(new Date());
        this.showCalendarForMes();
      } else if (value === 'T') {         
        this.showCalendarForTrim();
      } else if (value == 'S') {          
        this.showCalendarForSem();
      } else if(value == 'A'){
        this.formGroup.get('date')?.setValue(new Date());
        this.showCalendarForAnual();
      } else if(value == 'R'){          
        this.showCalendarForRange();
      }
  }

  callSociedadesInscritas(){

      type MapeoFrecuencia = {
        [key: string]: string;
      };
    
      const mapeoFrecuencia:MapeoFrecuencia = {
        'D': '1',
        'M': '2',
        'T': '3',
        'S': '4',
        'A': '5',
        'R': '6'
      };

      const selectedFrecuencia = this.formGroup.get('selectedFrecuencia')?.value;
      const frecuenciaValue = selectedFrecuencia in mapeoFrecuencia ? mapeoFrecuencia[selectedFrecuencia]:0;

      const fechas = this.getFechasSegunFrecuencia(selectedFrecuencia);

      const parametros:IParametroReporte = {      
          frecuencia:{value:<number>(frecuenciaValue)},
          ubicacion:{
                departamento:this.selectedDepartamento.IdDepartamento || 0,              
                municipio:this.selectedMunicipio.IdMunicipio || 0},
          fechas:fechas,//{fecha_1:1699375322856, fecha_2:1699375322856},        
          pagina:2     
      }

      if (!this.sociedadEstadoData) {

          this.mercantilReportService.SociedadesInscritasPaginadas(parametros).subscribe(
            (data: any) => { 
            console.log(data);

            this.hasData = data.length > 0;
            this.sharedDataService.setHasData(this.hasData);

            //this.sharedDataService.setCountByEstado({});
            //this.sharedDataService.setCountByTipoSociedad({});          
            this.sociedadEstadoData = undefined;

            const countByEstado = this.getCountByEstado(data);
            const countByTipoSociedad = this.getCountByTipoSociedad(data); 
            const countByDepartamento = this.getCountByDepartamento(data);  
            const countByMunicipio = this.getCountByMunicipio(data);   
            const countByActividad = this.getCountByActividadComercial(data);    

            this.sharedDataService.setCountByEstado(countByEstado);
            this.sharedDataService.setCountByTipoSociedad(countByTipoSociedad);   
            this.sharedDataService.setCountByDepartamento(countByDepartamento);  
            this.sharedDataService.setCountByMunicipio(countByMunicipio);
            this.sharedDataService.setCountByActividadComercial(countByActividad);

            }     
          )      
      }    
  }  

  getCountByEstado(data:any[]):{[estado:string]:number}{
    const countByEstado:{[estado:string]:number} = {};

    data.forEach((sociedad:any) => {
      const estado = sociedad.EstadoSociedad || 'No definido';
      countByEstado[estado] = (countByEstado[estado] || 0) + 1;
    });

    return countByEstado;
  }

  getCountByTipoSociedad(data: any[]): { [tipoSociedad: string]: number } {
    const countByTipoSociedad: { [tipoSociedad: string]: number } = {};
  
    data.forEach((sociedad: any) => {
      const tipoSociedad = sociedad.TipoSociedad;
  
      if (tipoSociedad in countByTipoSociedad) {
        countByTipoSociedad[tipoSociedad]++;
      } else {
        countByTipoSociedad[tipoSociedad] = 1;
      }
    });
  
    return countByTipoSociedad;
  }

  getCountByDepartamento(data: any[]): { [departamento: string]: number } {
    const countByDepartamento:{[departamento:string]:number} = {};

    data.forEach((sociedad:any) => {
      const departamento = sociedad.Departamento || 'No definido';
      countByDepartamento[departamento] = (countByDepartamento[departamento] || 0) + 1;
    });

    return countByDepartamento;
  }

  getCountByMunicipio(data: any[]): { [municipio: string]: number } {
    const countByMunicipio: { [municipio: string]: number } = {};

    data.forEach((sociedad: any) => {
      const municipio = sociedad.Municipio || 'No definido';
      countByMunicipio[municipio] = (countByMunicipio[municipio] || 0) + 1;
    });

    return countByMunicipio;
  }

  getCountByActividadComercial(data: any[]): { [actividad: string]: number } {
    const countByActividad: { [actividad: string]: number } = {};

    data.forEach((sociedad: any) => {
      const actividad = sociedad.ActividadComercial || 'No definido';
      countByActividad[actividad] = (countByActividad[actividad] || 0) + 1;
    });

    return countByActividad;
  }

  getFechasSegunFrecuencia(frecuencia: string): { fecha_1: number, fecha_2: number } {
    const ahora = Date.now(); // Fecha actual en milisegundos desde el 1 de enero de 1970 (época)
  
    switch (frecuencia) {
      case 'D':
        // Diario: Rango de 24 horas desde la fecha actual
        return { fecha_1: ahora - 24 * 60 * 60 * 1000, fecha_2: ahora };
      case 'M':
        // Mensual: Rango de 30 días desde la fecha actual
        return { fecha_1: ahora - 30 * 24 * 60 * 60 * 1000, fecha_2: ahora };
      case 'T':
        // Trimestral: Rango de 3 meses desde la fecha actual
        return { fecha_1: ahora - 3 * 30 * 24 * 60 * 60 * 1000, fecha_2: ahora };
      case 'S':
        // Semestral: Rango de 6 meses desde la fecha actual
        return { fecha_1: ahora - 6 * 30 * 24 * 60 * 60 * 1000, fecha_2: ahora };
      case 'A':
        // Anual: Rango de 1 año desde la fecha actual
        return { fecha_1: ahora - 365 * 24 * 60 * 60 * 1000, fecha_2: ahora };
      default:
        // Manejo por defecto o adicional según tus necesidades
        return { fecha_1: ahora, fecha_2: ahora }; // En este caso, se usa la fecha actual
    }
  } 
  
  

  onSelect(selectedDep: IDepartamento):void{
    this.Municipios = this.listaMunicipios.filter((item:any) => item.IdDepartamento == selectedDep.IdDepartamento);  
    this.selectedDepartamento = {IdDepartamento:selectedDep.IdDepartamento, Departamento:selectedDep.Departamento};  
    this.callSociedadesInscritas();
  };

  onDateSelect(event:any){
    this.callSociedadesInscritas();
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
    this.rangeDates = undefined;

    if (!this.rangeDates) {
      const startDate = new Date();
      const endDate = new Date(startDate);
      
      endDate.setMonth(startDate.getMonth() + 3);

      this.rangeDates = [startDate,endDate];
      this.formGroup.get('rangeDates')?.setValue(this.rangeDates);
    }


  }

  showCalendarForSem(){
    this.showCalendarDiario = false;
    this.showCalendarMes = false;
    this.showCalendarTrim = false;
    this.showCalendarSem = true;
    this.showCalendarAnual = false;
    this.showCalendarRange = false;
    this.rangeDates = undefined;

    if (!this.rangeDates) {
      const startDate = new Date();
      const endDate = new Date(startDate);
      
      endDate.setMonth(startDate.getMonth() + 5);

      this.rangeDates = [startDate,endDate];
      this.formGroup.get('rangeDates')?.setValue(this.rangeDates);
    }
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
    this.rangeDates = undefined;

    if (!this.rangeDates) {
      const startDate = new Date();
      const endDate = new Date(startDate);      
      //endDate.setMonth(startDate.getMonth() + 5);
      this.rangeDates = [startDate,endDate];
      this.formGroup.get('rangeDates')?.setValue(this.rangeDates);
    }
  }

  clearParameters(){
    this.formGroup.reset();

    this.showCalendarDiario = false;
    this.showCalendarMes = false;
    this.showCalendarTrim = false;
    this.showCalendarSem = false;
    this.showCalendarAnual = false;
    this.showCalendarRange = false;
    this.rangeDates = undefined;

    this.periodo.forEach(category => {
      this.formGroup.get('selectedFrecuencia')?.setValue(null);
      this.formGroup.get('selectedDepartamento')?.setValue(null);
      this.formGroup.get('selectedMunicipio')?.setValue(null);
    });

    //this.showKpiCard = false;
    this.sharedDataService.setShowKpiCard(false);

    this.callSociedadesInscritas();
  }

}