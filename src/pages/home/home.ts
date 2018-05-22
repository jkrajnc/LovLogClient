import {Component, Input} from '@angular/core';
import { NavController } from 'ionic-angular';
import {RestClan} from "../../providers/rest-clan/rest-clan";
import {Clan} from "../../model/clan";
import {RestAktivnostProvider} from "../../providers/rest-aktivnost/rest-aktivnost";
import {RestPorociloProvider} from "../../providers/rest-porocilo/rest-porocilo";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  clan: Clan;
  clani: Clan[];

  constructor(public navCtrl: NavController, public restClan: RestClan, public restAktivnost: RestAktivnostProvider,
              public restPorocilo: RestPorociloProvider) {
    this.getClan(2);
    this.getClanById(4);
    console.log(this.clan);
  }

  getClan(id: number): void {
    this.restClan.getClan(id)
      .subscribe(clan => this.clan = clan);
  }

  getClanById(id: number): void {
    this.restClan.getClaniByIdLovskaDruzina(id)
      .subscribe(clani => this.clani = clani);
  }

  goToSeznamPorocil(){
    this.navCtrl.push('SeznamPorocilPage');
  }

}
