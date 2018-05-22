import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeznamAktivnostiPage } from './seznam-aktivnosti';

@NgModule({
  declarations: [
    SeznamAktivnostiPage,
  ],
  imports: [
    IonicPageModule.forChild(SeznamAktivnostiPage),
  ],
})
export class SeznamAktivnostiPageModule {}
