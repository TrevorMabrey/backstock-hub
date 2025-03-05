import { Injectable } from '@angular/core';
import { Item } from '../models/item.model'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  protected itemList: Item[] = [];
  constructor(private http: HttpClient) {
    this.loadItems();
  }
  private loadItems(): void {
    this.http.get<Item[]>("https://localhost:7211/api/Items").subscribe(items => {
      this.itemList = items; 
    });
  }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>("https://localhost:7211/api/Items")
    }
  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>("https://localhost:7211/api/Items");
  }
  getItemById(id:string): Observable<Item> {
    return this.http.get<Item>(`https://localhost:7211/api/Items/${id}`)
  }
  
}
