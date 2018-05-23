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

  constructor(tip_aktivnost1: string, datum_vnos1: DateTime, latitude1: number, longitude1: number, opomba1: string,
     tip_divjad1?: string, starostna_kategorija1?: string, slika_path1?: string) {
    this.tip_aktivnost = tip_aktivnost1;
    this.datum_vnos = datum_vnos1;
    this.latitude = latitude1;
    this.longitude = longitude1;
    this.tip_divjad = tip_divjad1;
    this.starostna_kategorija = starostna_kategorija1;
    this.slika_path = slika_path1;
    this.opomba = opomba1;
  }

}
