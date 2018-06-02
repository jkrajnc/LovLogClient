import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { Porocilo } from "../../model/porocilo";
import { RestPorociloProvider } from "../../providers/rest-porocilo/rest-porocilo";
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-getReport',
  templateUrl: 'getReport.html',
})
export class GetReportPage {

  idMember: number;
  reportREST: RestPorociloProvider = new RestPorociloProvider(this.http);
  reportList: Porocilo[];
  chosenReport: Porocilo;

  constructor(public viewCtrl: ViewController, public navParams: NavParams, private http: HttpClient) {
  }

  ionViewWillLoad(){
    this.idMember = this.navParams.get("id");
    //this.reportList = this.reportREST.getPorocilaByIdClan(this.idMember);
  }

  //posljemo prazne podatke
  closeModal() {
    this.viewCtrl.dismiss(null);
  }

  //posljemo prazne podatke
  pickReport() {
    this.viewCtrl.dismiss(this.chosenReport);
  }

}
