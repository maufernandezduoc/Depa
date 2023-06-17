import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PatentePageRoutingModule } from './patente-routing.module';
import { PatentePage } from './patente.page';
import { ApiServiceService } from '../api-service.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatentePageRoutingModule
  ],
  declarations: [PatentePage],
  providers: [ApiServiceService]
})
export class PatentePageModule {}
