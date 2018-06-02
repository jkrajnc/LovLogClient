import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeznamClanovPage } from './seznam-clanov';

@NgModule({
  declarations: [
    SeznamClanovPage,
  ],
  imports: [
    IonicPageModule.forChild(SeznamClanovPage),
  ],
})
export class SeznamClanovPageModule {}
