import {Component, OnInit} from '@angular/core';
import {AlertController, LoadingController, NavController} from 'ionic-angular';
import {RealmService} from "../../services/realm.service";

interface TestData {
  personName: string;
  personUuid: string;
  personBirthday: string;
  people: any[];
}


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  public testData: TestData = {
    personName: '',
    personBirthday: new Date().toISOString(),
    personUuid: '',
    people: [],
  };

  public noResults: boolean = true;

  constructor(public navCtrl: NavController, public realmService: RealmService, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
  }

  public ngOnInit()
  {
    this.realmService.initializeRealmPlugin()
      .then((realm) => {
      }, (error) => console.log(error));
  }


  public onTestCreateAction()
  {
    if (!this.testData.personName) {
      const alert = this.alertCtrl.create({
        title: 'Person Name cannot be empty!'
      });
      alert.present();
      return;
    }
    let loading = this.loadingCtrl.create({
      content: 'Creating Person',
    });
    loading.present();
    this.realmService.testPersonCreation(this.testData.personName, this.testData.personBirthday)
      .then((success) => {
        loading.dismiss();
      })
      .catch((error) => {
        loading.dismiss();
      })
    ;
  }

  public onTestQueryingAction()
  {
    let loading = this.loadingCtrl.create({
      content: 'Fetching People',
    });
    loading.present();
    this.realmService.testPeopleQuerying()
      .then((results) => {
        console.log(results.length);
        this.testData.people = results;
        this.noResults = results.length === 0;
        loading.dismiss();
      })
      .catch((error) => {
        loading.dismiss();
      })
    ;
  }

  public onTestDeleteAction()
  {
    let loading = this.loadingCtrl.create({
      content: 'Deleting People',
    });
    loading.present();
    this.realmService.testPeopleDeleting()
      .then((success) => {
        console.log(success);
        loading.dismiss();
      })
      .catch((error) => {
        loading.dismiss();
      })
    ;
  }

  public onClearResultsAction()
  {
    this.testData.people = [];
  }
}
