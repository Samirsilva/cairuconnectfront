import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { EventoService } from '../../services/domain/evento.service';
import { EventoDTO } from '../../models/evento.dto';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-eventos',
  templateUrl: 'eventos.html',
})
export class EventosPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl
  items: EventoDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public eventoService: EventoService,
    public loadingControl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let loader = this.presentloading();
    this.eventoService.findAll()
      .subscribe(response => {
        this.items = response;
        loader.dismiss()
      },

        error => { loader.dismiss() });
  }

  showDetail(evento_id: string) {
    this.navCtrl.push('EventoDetailPage', { evento_id: evento_id });
  }

  presentloading() {
    let loader = this.loadingControl.create({
      content: "Por favor, espere...",
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher) {
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }
}
