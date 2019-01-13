import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventoDTO } from '../../models/evento.dto';

@IonicPage()
@Component({
  selector: 'page-evento-detail',
  templateUrl: 'evento-detail.html',
})
export class EventoDetailPage {

  item : EventoDTO

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.item = {
      id : "1",
      nome : "Teste",
      data : "2019-01-13",
      descricao : "teste de escrição"
    }
    
  }

}
