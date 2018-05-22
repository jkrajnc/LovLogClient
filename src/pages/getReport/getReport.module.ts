import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GetReportPage } from './getReport';

@NgModule({
  declarations: [
    GetReportPage,
  ],
  imports: [
    IonicPageModule.forChild(GetReportPage),
  ],
})
export class GetReportPageModule {}
