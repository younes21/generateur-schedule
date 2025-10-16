import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';

import { AppComponent } from './app.component';
import { ScheduleRuleComponent } from './components/schedule-rule/schedule-rule.component';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    ScheduleRuleComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
