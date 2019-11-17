import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "Grocery";

  items = [
    {
      name: "Milk",
      quantity: 2    
    },
    {
      name: "Bread",
      quantity: 1    
    },
    {
      name: "Banana",
      quantity: 3    
    },
    {
      name: "Sugar",
      quantity: 1    
    },
  ];

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController) {

  }

  removeItem(item) {
    console.log("Removing Item - ", item);
    const toast = this.toastCtrl.create({
      message: 'Removing Item - ' + item.name + " ...",
      duration: 3000
    });
    toast.present();
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
          name: 'Item Name',
          placeholder: 'Bananas'
        },
        {
          name: 'Item Quantity',
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
            this.items.push(item);
          }
        }
      ]
    });
    prompt.present();
  }

}
