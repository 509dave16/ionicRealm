import {Injectable} from "@angular/core";
import {Platform} from "ionic-angular";

declare var cordova:any;
import uuidV1 from 'uuid/v1';

@Injectable()
export class RealmService {
  public realmPlugin: any;
  public realm: any;
  public schemas: string[] = ['Person', 'Car'];
  constructor(public platform: Platform) {
  }

  public initializeRealmPlugin(): Promise<any>
  {
    return this.platform.ready().then(() => {
      this.realmPlugin = cordova.plugins.realm;
      const initPromise: Promise<any>  = new Promise((resolve, reject) => {
        this.realmPlugin.init({ schema: this.schemas },
          (realm) => {
            this.realm = realm;
            resolve(realm);
          },
          (error) => {
            reject(error);
          }
        );
      });
      return initPromise;
    });
  }

  public testPersonCreation(name: string, birthday: string): Promise<any>
  {
    const uuid = uuidV1();
    return new Promise((resolve, reject) => {
      this.realm.create('Person', { uuid, name, birthday }, true, function(success, error) {
        if (error) {
          reject(error);
        }
        resolve(success);
      });
    });

  }

  public testPeopleQuerying(): Promise<any>
  {
    return new Promise((resolve, reject) => {
      try {
        this.realm.where('Person').findAll((results) => {
          const records: any[] = results.map((record) => {
            return record;
          });
          resolve(records);
        });
      } catch(e) {
        reject(e);
      }
    });
  }

  public testPeopleDeleting(): Promise<any>
  {
    return new Promise((resolve, reject) => {
      try {
        const result: any = this.realm.deleteAll('Person');
        resolve(result);
      } catch(e) {
        reject(e);
      }
    });
  }
}
