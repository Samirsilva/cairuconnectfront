import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

@IonicPage()
@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html',
})
export class ForgotPage {

  formGroup : FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder : FormBuilder,
    public alertCtrl: AlertController,
    public auth : AuthService,
    public menu: MenuController,
    public loadingControl : LoadingController) {

      this.formGroup = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
      });
  }

  esqueciSenha(){
    let loader = this.presentloading();
    this.auth.esqueciSenha(this.formGroup.value).subscribe(response => {loader.dismiss(); this.showForgotOk();},

    error => {
      loader.dismiss();
    });
    
  }
  showForgotOk() {  
    let alert = this.alertCtrl.create({
        title: 'Sucesso!',
        message: 'Pronto, enviamos uma nova senha para seu email',
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
      content: "Enviando nova senha...",
    });
    loader.present();
    return loader;
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }
  
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

}
