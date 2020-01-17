import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InItService {

  constructor() { }
  inits() {
    return new Promise<void>((resolve, reject) => {
      resolve();
    });
  }
}
