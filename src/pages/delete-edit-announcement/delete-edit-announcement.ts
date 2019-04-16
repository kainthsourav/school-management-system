import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceAnnouncementProvider } from '../../providers/service-announcement/service-announcement';
import { UpdateAnnouncementPage } from '../update-announcement/update-announcement';

/**
 * Generated class for the DeleteEditAnnouncementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-delete-edit-announcement',
  templateUrl: 'delete-edit-announcement.html',
})
export class DeleteEditAnnouncementPage {
  public value:any;
  public A_ID:any;
  public CATEGORY:any;
  public TITLE:any;
  public DESCRIPTION:any;
  public START_TIME:any;
  public END_TIME:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public Service:ServiceAnnouncementProvider) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnnouncementDetailsPage');
    this.value = this.navParams.get('item');


    this.CATEGORY=this.value.CATEGORY;
    this.TITLE=this.value.TITLE;
    this.DESCRIPTION=this.value.DESCRIPTION;
    this.START_TIME=this.value.START_TIME;
    this.END_TIME=this.value.END_TIME;
  }

  Edit()
  {
    this.navCtrl.push(UpdateAnnouncementPage,{"CATEGORY":this.CATEGORY,"TITLE":this.TITLE});
  }

  Delete()
  {
    if(this.Service.DeleteCurrent(this.value))
    {
      this.navCtrl.pop();
    }
 
  }

}