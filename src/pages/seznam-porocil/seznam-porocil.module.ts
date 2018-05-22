import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeznamPorocilPage } from './seznam-porocil';

@NgModule({
  declarations: [
    SeznamPorocilPage,
  ],
  imports: [
    IonicPageModule.forChild(SeznamPorocilPage),
  ],
})
export class SeznamPorocilPageModule {}
