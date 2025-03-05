import { FormsModule, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Item } from '../models/item.model';
import { Observable } from 'rxjs';




@Component({
  selector: 'app-root',
  imports: [RouterOutlet,AsyncPipe, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  title = 'BackstockHub';
  items$: Observable<Item[]>;
  itemInput = new FormGroup({
    name: new FormControl<string>(""),
    stock: new FormControl<number>(0),
    category: new FormControl<string>(""),
    itemsInBox: new FormControl<number>(0),

  })

  onFormSubmit() {
    const addItemRequest = {
      name: this.itemInput.value.name,
      stock: this.itemInput.value.stock,
      category: this.itemInput.value.category,
      itemsInBox: this.itemInput.value.itemsInBox,
    }
    this.http.post("https://localhost:7211/api/Items", addItemRequest)
    .subscribe({
      next: (value) => {
        console.log(value);
        this.items$ = this.getItems();
        this.itemInput.reset();
      }
    });
  }

  onDelete(id:string) {
    this.http.delete(`https://localhost:7211/api/Items/${id}`)
    .subscribe({
      next: (value) => {
        alert('Item Deleted');
        this.items$ = this.getItems();
      }
    })
  }

  constructor(private http: HttpClient) {
    this.items$ = this.getItems();
  }


private getItems(): Observable<Item[]> {
  return this.http.get<Item[]>("https://localhost:7211/api/Items")
}
}


