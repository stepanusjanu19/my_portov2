import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { createClient } from 'contentful'

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {

  constructor() { }

  private client = environment.contentful.accessToken
    ? createClient({
      space: environment.contentful.spaceId,
      accessToken: environment.contentful.accessToken
    })
    : null;

  getAllEntries(){
    if (!this.client) {
      return Promise.resolve({ items: [] });
    }

    return this.client.getEntries();
  }

  getAllEntires(){
    return this.getAllEntries();
  }
}
