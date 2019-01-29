import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OportunidadeDTO } from '../../models/oportunidade.dto';
import { OportunidadeService } from '../../services/domain/oportunidade.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-oportunidades-detail',
  templateUrl: 'oportunidades-detail.html',
})
export class OportunidadesDetailPage {

  item : OportunidadeDTO

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public oportunidadeService : OportunidadeService) {
  }

  ionViewDidLoad() {
    let oportunidade_id = this.navParams.get('oportunidade_id');
    
    this.oportunidadeService.findById(oportunidade_id).subscribe(response => {
      this.item = response;
      this.getImageIfExists()
    }, 
    error => {});
  }

  getImageIfExists(){
    this.oportunidadeService.getimageFromBucket(this.item.id).subscribe(response => {
      this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/oportu${this.item.id}.jpg`;
    },
    
    error =>{});
  }
}