import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailsAktivnostiPage } from './details-aktivnosti';

@NgModule({
  declarations: [
    DetailsAktivnostiPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailsAktivnostiPage),
  ],
})
export class DetailsAktivnostiPageModule {}
