import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OportunidadeDTO } from '../../models/oportunidade.dto';

@IonicPage()
@Component({
  selector: 'page-oportunidades-detail',
  templateUrl: 'oportunidades-detail.html',
})
export class OportunidadesDetailPage {

  item : OportunidadeDTO

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.item = {
      id : "1",
      nomeEmpresa : "Emrpesa fic",
      curso : "google.com",
      semestre : "1",
      email : "samir",
      tipoVaga : "sei la",
      cargaHoraria : "23324",
      remuneracao : "234234",
      beneficios : "234234",
      requisitos : "stri2342ng;"
    }
  }
}