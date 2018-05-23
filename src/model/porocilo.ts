import { Aktivnost } from "./aktivnost";
import { DateTime } from "ionic-angular";

export class Porocilo {
  id?: number;
  naziv: string;
  datum_vnos: DateTime;
  aktivnosti: Aktivnost[];

  constructor(naziv1: string, datum_vnos1: DateTime, aktivnosti1: Aktivnost[]) {
    this.naziv = naziv1;
    this.datum_vnos = datum_vnos1;
    this.aktivnosti = aktivnosti1;
  }

}
