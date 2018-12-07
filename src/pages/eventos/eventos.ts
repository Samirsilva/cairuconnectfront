import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventoService } from '../../services/domain/evento.service';
import { EventoDTO } from '../../models/evento.dto';
import { API_CONFIG } from '../../config/api.config';

/**
 * Generated class for the EventosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-eventos',
  templateUrl: 'eventos.html',
})
export class EventosPage {

  bucketUrl : string = API_CONFIG.bucketBaseUrl
  items  : EventoDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public eventoService : EventoService) {
  }

  ionViewDidLoad() {
    this.eventoService.findAll().subscribe(response => {
      this.items = response;
    },
    error => {});

  }

}
