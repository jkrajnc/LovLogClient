import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { Porocilo } from "../../model/porocilo";
import { RestPorociloProvider } from "../../providers/rest-porocilo/rest-porocilo";
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-getReport',
  templateUrl: 'getReport.html',
})
export class GetReportPage {

  idMember: number;
  reportREST: RestPorociloProvider = new RestPorociloProvider(this.http);
  reportList: any[];
  chosenReport: any;

  constructor(public viewCtrl: ViewController, public navParams: NavParams, private http: HttpClient, private storage: Storage) {
    storage.get("session").then((value => {
      this.reportREST.getPorocilaByIdClan(value.id).subscribe(porocila => this.reportList = porocila);
   }));
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
