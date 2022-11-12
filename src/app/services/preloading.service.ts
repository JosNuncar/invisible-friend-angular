import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';



export class PreloadingOptions{

  constructor(public routePath: string, public preload: boolean = true){}

}


 @Injectable({
  providedIn: 'root'
})
export class PreloadingService {

  private _subject = new Subject<PreloadingOptions>();
  public options$ = this._subject.asObservable();

  constructor() { }

  comenzarPrecarga(routePath: string){

    const opcionesPrecarga: PreloadingOptions = new PreloadingOptions(routePath, true);


    this._subject.next(opcionesPrecarga);

  }

}
