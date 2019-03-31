import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ServiceGetClassMasterProvider } from '../../providers/service-get-class-master/service-get-class-master';
import { ServiceAddTimetableProvider } from '../../providers/service-add-timetable/service-add-timetable';

/**
 * Generated class for the AddTimetablePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-timetable',
  templateUrl: 'add-timetable.html',
})
export class AddTimetablePage {
 public CLASSID:any;
 public SUBJECTID:any;
 public SLOT:any;
 public Day:any;
 public Class_id:any;
 public timetableData:any=
 {
   "CLASSID":"",
   "SUBJECTID":"",
   "SLOT":"",
   "DAY":""
 };

 private Days:any=[
   {Day:"Monday"},
   {Day:"Tuesday"},
   {Day:"Wednesday"},
   {Day:"Thursday"},
   {Day:"Friday"},
   {Day:"Saturday"},
];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public service:ServiceGetClassMasterProvider,
              public addtimetable:ServiceAddTimetableProvider,
              public alertCtrl:AlertController,
              public GU :ServiceGetClassMasterProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTimetablePage');
    console.log(this.Days);
  }

  submitTimetable(CLASSID,SUBJECTID,SLOT,Day)
  {
    if(CLASSID!=undefined && SUBJECTID!=undefined && SLOT!=undefined && Day!=undefined)
    {
      const confirm = this.alertCtrl.create({
        title: 'Save Time-table?',
        message: 'Do you want to save this Time-table?',
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
                            this.navCtrl.pop();
                           }
          },
          {
           text: 'Okay',
           handler: () => {
                          this.CLASSID=CLASSID;
                          this.SUBJECTID=SUBJECTID;
                          this.SLOT=SLOT;
                          this.Day=Day;
                          this.timetableData['CLASSID']= this.CLASSID;
                          this.timetableData['SUBJECTID']=this.SUBJECTID;
                          this.timetableData['SLOT']= this.SLOT;
                          this.timetableData['DAY']=this.Day;
                          console.log("Sending Time Table -->",this.timetableData);
                          if(this.addtimetable.addtimetableFun(this.timetableData))
                          {
                            this.navCtrl.pop();
                          }
                          }
          }
      ]
    });
    confirm.present();

    }
    else{

      console.log("CLASS ID ",this.CLASSID);
      console.log("SUBJECT ID ",this.SUBJECTID);
      console.log("SLOT ",this.SLOT);
      console.log("DAY",this.Day);
      alert("please fill required fields");
    }

  }



  getSubject(Class)
  {
    this.Class_id=Class;
//console.log(this.postId['classId']);
    this.GU.getAttSubjectFun(Class);
//For Fetching Time Table of selected Class
    this.GU.getCurrentTimeTable(Class);

  }

  getTimeSlot()
  {
    if(this.CLASSID!=undefined)
    {
      console.log("ID HERE : "+this.CLASSID);
      this.GU.getSlot(this.CLASSID);
    }
    else
    {
      alert("Please Select Class First");
    }
  }

}
