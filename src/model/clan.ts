import {Porocilo} from "./porocilo";

export class Clan {
  id?: number;
  uporabnisko_ime: string;
  hash_geslo: string;
  elektronska_posta: string;
  ime: string;
  priimek: string;
  vloga: string;
  telefonska_stevilka: string;
  lovska_druzina_id: number;
  porocila: Porocilo[];

  constructor(){

  }

}
