import { FormsModule, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { Item } from '../../models/item.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe, FormsModule, ReactiveFormsModule],
  template: `

<form (ngSubmit)="onFormSubmit()" [formGroup]="itemInput">
    <div>
        <label for="name">Name </label>
        <input type="text" class="border-2 rounded-md" formControlName="name">
        <label for="stock">Stock </label>
        <input type="text" class="border-2 rounded-md" formControlName="stock">
        <label for="category">Category </label>
        <input type="text" class="border-2 rounded-md" formControlName="category">
        <label for="itemsInBox">Items in Box </label>
        <input type="text" class="border-2 rounded-md" formControlName="itemsInBox">
    </div>
    <div>
        <button class="bg-gray-200 p-1 rounded-md m-2" type="submit">Add Item</button>
    </div>
    
</form>
<section class="cards grid h-full grid-cols-4 content-start">
@if (items$ | async;as items) {
    @for (item of items; track $index) {
        <div class="card">
 
            
                 
                <article class="bg-gray-200 rounded-md p-4">
                   <P class="font-bold">{{item.name}}</P>
                   <P>stock: {{item.stock}}</P>
                   <P>category: {{item.category}}</P>
                   <P>Items in Box: {{item.itemsInBox}}</P>
                   <div>
                    <button type="button" class="text-red-600" (click)="onDelete(item.id)">Delete</button>
                  </div>
                  <div>
                    <button type="button" class="text-blue-600" >Details</button>
                  </div>

                </article>
                
 
 
   
</div>

    }
} @else {
    <p>No Items Found</p>
}
</section>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  
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


  getItems(): Observable<Item[]> {
  return this.http.get<Item[]>("https://localhost:7211/api/Items")
  }
  
}
