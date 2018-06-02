import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RestClan} from "../../providers/rest-clan/rest-clan";
import {Clan} from "../../model/clan";
import {Storage} from "@ionic/storage";
import {SeznamAktivnostiPage} from "../seznam-aktivnosti/seznam-aktivnosti";
import {DetailsClanPage} from "../details-clan/details-clan";
import {SettingsPage} from "../settings/settings";
import {RestDruzinaProvider} from "../../providers/rest-druzina/rest-druzina";
import {LovskaDruzina} from "../../model/lovskaDruzina";

/**
 * Generated class for the SeznamClanovPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//getClaniByLovskaDruzinaId

@IonicPage()
@Component({
  selector: 'page-seznam-clanov',
  templateUrl: 'seznam-clanov.html',
})
export class SeznamClanovPage {

    clani: Clan[];
    lovske_druzine:LovskaDruzina[];

    constructor(public navCtrl: NavController, public navParams: NavParams, public restClan: RestClan, private storage: Storage, public restLovskaDruzina:RestDruzinaProvider) {

        storage.get("session").then((value => {
            this.getClaniByLovskaDruzinaId(value.lovska_druzina_id);
            this.getLovskaDruzinaById(value.lovska_druzina_id);
        }));
    }

    ionViewDidLoad() {
        //console.log('ionViewDidLoad SeznamClanovPage');
    }

    getClaniByLovskaDruzinaId(id: number): void {
        this.restClan.getClaniByIdLovskaDruzina(id)
            .subscribe(clani => this.clani = clani)
    }

    getLovskaDruzinaById(id: number) {
        this.restLovskaDruzina.getLovskaDruzinaById(id)
            .subscribe(data => this.lovske_druzine = data)
    }

    details(clan) {
        this.navCtrl.push(DetailsClanPage, {details: clan, druzina: this.lovske_druzine})
    }
    settings() {
        this.navCtrl.push(SettingsPage);
    }
}
