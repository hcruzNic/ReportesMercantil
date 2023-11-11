import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MercantilReportService } from "src/app/services/mercantil-report.service";

import { AppComponent } from './app.component';
import { MenuComponent } from './modules/menu/menu.component';
import { SociedadesInscritasComponent } from './modules/sociedades-inscritas/sociedades-inscritas.component';
import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { DividerModule } from "primeng/divider";
import { SplitterModule } from 'primeng/splitter';
import { ButtonModule } from 'primeng/button';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { FiltersComponent } from './shared/filters/filters.component';
import { ChipModule } from 'primeng/chip';
import { KpiCardsComponent } from './modules/kpi-cards/kpi-cards.component';
import { GraficasComponent } from './modules/graficas/graficas.component';
import { ChartModule } from 'primeng/chart';
import { AppRoutingModule } from './app-routing.module';
import { SucursalesComponent } from './modules/sucursales/sucursales.component';
import { ComerciantesComponent } from './modules/comerciantes/comerciantes.component';
import { ThousandsPipePipe } from './pipes/thousands-pipe.pipe';
import { PieMercantilComponent } from './graphicsGroup/pie-mercantil/pie-mercantil.component';
import { DoughnutMercantilComponent } from './graphicsGroup/doughnut-mercantil/doughnut-mercantil.component';
import { PieActividadComercialComponent } from './graphicsGroup/pie-actividad-comercial/pie-actividad-comercial.component';
import { CalendarModule } from "primeng/calendar";
import { SharedDataService } from "src/app/services/shared-data.service";


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SociedadesInscritasComponent,
    FiltersComponent,
    KpiCardsComponent,
    GraficasComponent,
    SucursalesComponent,
    ComerciantesComponent,
    ThousandsPipePipe,
    PieMercantilComponent,
    DoughnutMercantilComponent,
    PieActividadComercialComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FieldsetModule,
    PanelModule,
    MenuModule,
    ToastModule,
    DividerModule,
    SplitterModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RadioButtonModule,
    DropdownModule,
    ChipModule,
    ChartModule,
    HttpClientModule,
    AppRoutingModule, 
    CalendarModule
  ],
  providers: [MercantilReportService,SharedDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
