import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddReportPage } from './addReport';

@NgModule({
  declarations: [
    AddReportPage,
  ],
  imports: [
    IonicPageModule.forChild(AddReportPage),
  ],
})
export class ReportPageModule {}
