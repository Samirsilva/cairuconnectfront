import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/domain/usuario.service';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup :FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder : FormBuilder,
    public usuarioService : UsuarioService,
    public alertCtrl: AlertController,
    public menu: MenuController,
    public loadingControl : LoadingController) {

      this.formGroup = this.formBuilder.group({
        nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['', [Validators.required, Validators.email]],
        cpfCnpj : ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        senha : ['', [Validators.required]],
      });
  }

  signupUser(){
    let loader = this.presentloading(this.formGroup.value.nome);
    this.usuarioService.insert(this.formGroup.value).subscribe(response => {loader.dismiss(); this.showInsertOk();},
      
    error => {
      loader.dismiss();
    });  
  }
    
  showInsertOk() {  
    let alert = this.alertCtrl.create({
        title: 'Sucesso!',
        message: 'Cadastro efetuado com sucesso',
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

  presentloading(nome : string) {
    let loader = this.loadingControl.create({
      content: "Criando sua conta..." + nome ,
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