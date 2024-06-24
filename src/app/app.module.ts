import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomInputControlComponent } from './custom-input-control/custom-input-control.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomSelectControlComponent } from './custom-select-control/custom-select-control.component';
import { HttpClientModule } from '@angular/common/http';
import { FormService } from './services/form.service';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomInputControlComponent,
    CustomSelectControlComponent,
    DynamicFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [FormService],
  bootstrap: [AppComponent],
})
export class AppModule {}
