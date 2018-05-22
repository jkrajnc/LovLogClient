import {Aktivnost} from "./aktivnost";
import {DateTime} from "ionic-angular";

export class Porocilo{
  id?: number;
  naziv: string;
  datum_vnos: DateTime;
  aktivnosti: Aktivnost[];

  constructor(){

  }

}
