import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {RestPorociloProvider} from "../../providers/rest-porocilo/rest-porocilo";
import {Porocilo} from "../../model/porocilo";
import {SeznamAktivnostiPage} from "../seznam-aktivnosti/seznam-aktivnosti";
import {Aktivnost} from "../../model/aktivnost";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the SeznamPorocilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-seznam-porocil',
  templateUrl: 'seznam-porocil.html',
})
export class SeznamPorocilPage {

  porocila: Porocilo[];
  idPorocilo: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public restPorociloProvider: RestPorociloProvider,
              private storage: Storage) {

    storage.get("session").then((value =>{
        this.getPorocilaByIdClan(value.id);
    }));

    //this.getPorocilaByIdClan(2);
  }

  getPorocilaByIdClan(id: number): void {
    this.restPorociloProvider.getPorocilaByIdClan(id)
      .subscribe(porocila => this.porocila = porocila)
  }

  goToPorociloDetails(aktivnosti: Aktivnost[]){
    this.navCtrl.push(SeznamAktivnostiPage, {'aktivnostiList': aktivnosti})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SeznamPorocilPage');
  }

}
