import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SociedadesInscritasComponent,
    FiltersComponent
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
    DropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
