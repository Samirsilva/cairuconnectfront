import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventoDTO } from '../../models/evento.dto';
import { EventoService } from '../../services/domain/evento.service';

@IonicPage()
@Component({
  selector: 'page-evento-detail',
  templateUrl: 'evento-detail.html',
})
export class EventoDetailPage {

  item : EventoDTO 

  constructor(public navCtrl: NavController, public navParams: NavParams,public eventoService : EventoService) {
  }

  ionViewDidLoad() {
    let evento_id = this.navParams.get('evento_id');
    
    this.eventoService.findById(evento_id).subscribe(response => {this.item = response;},
    error => {});
  }
}
