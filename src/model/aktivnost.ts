import { DateTime } from "ionic-angular";


export class Aktivnost {
  id?: number;
  tip_aktivnost: string;
  datum_vnos: DateTime;
  latitude: number;
  longitude: number;
  tip_divjad?: string;
  starostna_kategorija?: string;
  slika_path?: string;
  opomba: string;

  constructor() {
  }

}
