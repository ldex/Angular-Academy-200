import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Product } from './product.interface';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  constructor() { }

  private addedFavourite = new BehaviorSubject<Product>(null);
  addedFavourite$: Observable<Product> = 
                this.addedFavourite.asObservable()
                      .pipe(
                        filter(product => product != null)
                      );

  private favourites: Set<Product> = new Set();

  resetAddedFavourite() {
    this.addedFavourite.next(null);
  }

  addToFavourites(product: Product) {
    this.favourites.add(product);
    this.addedFavourite.next(product);
  }

  getFavouritesNb(): number {
    return this.favourites.size;
  }
}
