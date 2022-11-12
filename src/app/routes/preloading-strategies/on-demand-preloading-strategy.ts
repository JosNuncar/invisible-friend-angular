import { Injectable } from "@angular/core";
import { PreloadingStrategy, Route } from "@angular/router";
import { Observable, EMPTY, mergeMap } from "rxjs";
import { PreloadingService, PreloadingOptions } from "src/app/services/preloading.service";

@Injectable({
  providedIn: 'root'
})
export class OnDemandPreloadStrategy implements PreloadingStrategy {

  private _preloadDemandOptions$: Observable<PreloadingOptions>;

  constructor(private _preloadingService: PreloadingService){
    this._preloadDemandOptions$ = this._preloadingService.options$;
  }

  private decidirSiPrecargar(route: Route, preloadingOptions: PreloadingOptions): boolean{

    return (
      route.data &&
      route.data['preload'] &&
      [route.path, '*'].includes(preloadingOptions.routePath) &&
      preloadingOptions.preload // true
    )
  }

  preload(route: Route, load: () => Observable<any>): Observable<any> {

    return this._preloadDemandOptions$.pipe(
      mergeMap((preloadingOptions: PreloadingOptions) => {
        const precargar: boolean = this.decidirSiPrecargar(route, preloadingOptions);
        console.log(`${precargar ? '' : 'NO'} se precarga el módulo de la ruta ${route.path}`);
        return precargar ? load() : EMPTY
      })
    );
  }
}
