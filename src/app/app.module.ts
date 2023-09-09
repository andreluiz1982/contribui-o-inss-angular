import { DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatTableModule} from '@angular/material/table';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ContribuinteComponent } from './view/contribuinte/contribuinte.component';
import { SalariosComponent } from './view/salarios/salarios.component';
import { AliquotaComponent } from './view/aliquota/aliquota.component';
import { NavbarComponent } from './view/components/navbar/navbar.component';
import { ErrorInterceptorInterceptor } from './config/error-interceptor.interceptor';
import { AlertComponent } from './view/components/alert/alert.component';


registerLocaleData(localePt);

const material = [
  FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTableModule,
    MatTooltipModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
];

@NgModule({
  declarations: [
    AppComponent,
    ContribuinteComponent,
    SalariosComponent,
    AlertComponent,
    AliquotaComponent,
    NavbarComponent
  ],
  imports: [
    material,

  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent],


})
export class AppModule { }
