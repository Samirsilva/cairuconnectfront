import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventoDTO } from '../../models/evento.dto';
import { EventoService } from '../../services/domain/evento.service';
import { API_CONFIG } from '../../config/api.config';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-evento-detail',
  templateUrl: 'evento-detail.html',
})
export class EventoDetailPage {

  bucketUrl : string = API_CONFIG.bucketBaseUrl
  item : EventoDTO 

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage : StorageService,
    public eventoService : EventoService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    let evento_id = this.navParams.get('evento_id');
    
    if (localUser && localUser.email) {
      this.eventoService.findById(evento_id).subscribe(response => {
        this.item = response;
        this.getImageIfExists()
      }, 
      error => {
        if (error.status == 403){
          this.navCtrl.setRoot('HomePage');
        }
      });
    } else{
      this.navCtrl.setRoot('HomePage');
    }
  }
  getImageIfExists(){
    this.eventoService.getimageFromBucket(this.item.id).subscribe(response => {
      this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/event${this.item.id}.jpg`;
    },
    
    error =>{});
  }
}
