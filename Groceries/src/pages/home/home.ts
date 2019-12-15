import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';
import { SocialSharing } from '@ionic-native/social-sharing';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "Grocery";
  items = [];
  errorMessage: string;


  constructor(public navCtrl: NavController, 
    public toastCtrl: ToastController, 
    public alertCtrl: AlertController, 
    public dataService: GroceriesServiceProvider, 
    public InputDialogService: InputDialogServiceProvider, 
    public SocialSharing: SocialSharing,){
    dataService.dataChanged$.subscribe((dataChanged:boolean) => {
      this.loadItems();
    });

  }

ionViewDidLoad(){
  this.dataService.getItems()
  .subscribe(
    items =>this.items = items,
    error =>this.errorMessage = <any>error);
}

  loadItems() {
    return this.dataService.getItems();
  }

  removeItem(item, index) {
    console.log("Removing Item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Removing Item - ' + index + " ...",
      duration: 3000
    });
    toast.present();
    this.dataService.removeItem(index);

  }

  shareItem(item, index) {
    console.log("Sharing Item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Sharing Item - ' + index + " ...",
      duration: 3000
    });
    toast.present();

    let message = "Grocer item - Name: " + item.name + " - Quantity: " + item.quantity;
    let subject = "Shared via Groceries App!"
    this.SocialSharing.share(message, subject).then(() => {
      //sharing via email is possible
      console.log("Sharing Successful!")
    }).catch(() =>{
      //sharing via email is not possible
      console.error("Sharing Failed!");
    });

  }

  editItem(item, index) {
    console.log("Editing an Item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Editing Item - ' + index + " ...",
      duration: 3000
    });
    toast.present(),
      this.InputDialogService.showPrompt(item, index);

  }

  addItem() {
    console.log("Adding an item to list");
    this.InputDialogService.showPrompt();
  }

}
