import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-trocar-senha',
  templateUrl: 'trocar-senha.html',
})
export class TrocarSenhaPage {

  formGroup :FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public alertCtrl: AlertController,
    public auth : AuthService,
    public formBuilder : FormBuilder,
    public loadingControl : LoadingController) {

      this.formGroup = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        senha : ['', [Validators.required]],
        senhaConfirmacao : ['', [Validators.required]],
      });
  }

  trocarSenha(){
    let loader = this.presentloading();
    this.auth.trocarSenha(this.formGroup.value).subscribe(response => {loader.dismiss(); this.showForgotOk();},

    error => {
      loader.dismiss();
    });
    
  }
  showForgotOk() {  
    let alert = this.alertCtrl.create({
        title: 'Sucesso!',
        message: 'Pronto, sua senha foi alterada',
        enableBackdropDismiss: false,
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              this.navCtrl.pop();
            }
          }
        ]
      });
      alert.present();
  }

  presentloading() {
    let loader = this.loadingControl.create({
      content: "Aguarde, estamos mudando sua senha...",
    });
    loader.present();
    return loader;
  }
}
