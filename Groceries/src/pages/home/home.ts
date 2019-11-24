import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "Grocery";


  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: GroceriesServiceProvider) {

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

  editItem(item, index) {
    console.log("Editing an Item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Editing Item - ' + index + " ...",
      duration: 3000
    });
    toast.present(),
    this.showEditItemPrompt(item, index);

  }

  addItem() {
    console.log("Adding an item to list");
    this.showAddItemPrompt();
  }

  showAddItemPrompt() {
    const prompt = this.alertCtrl.create({
      title: "Add Item to List",
      message: "Please enter the item name and quantity you would like adde to your grocery list",
      inputs: [
        {
          name: 'name',
          placeholder: 'Bananas'
        },
        {
          name: 'quantity',
          placeholder: '1'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log("Cancel Clicked");
          }
        },
        {
          text: 'Save',
          handler: item => {
            console.log('Saved Clicked', item);
            this.dataService.addItem(item);
          }
        }
      ]
    });
    prompt.present();
  }

  showEditItemPrompt(item, index) {
    const prompt = this.alertCtrl.create({
      title: "Edit the selected item",
      message: "Please update the name or quantitiy of the item in your grocery list",
      inputs: [
        {
          name: 'name',
          placeholder: 'Bananas',
          value:item.name
        },
        {
          name: 'quantity',
          placeholder: '1',
          value: item.quantity
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log("Cancel Clicked");
          }
        },
        {
          text: 'Save',
          handler: item => {
            console.log('Saved Clicked', item);
            this.dataService.editItem(item, index);
          }
        }
      ]
    });
    prompt.present();
  }

}
