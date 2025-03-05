import { Component, inject } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe} from '@angular/common';
import { StockService } from '../stock.service';
import { Item } from '../../models/item.model';


@Component({
  selector: 'app-details',
  imports: [AsyncPipe, FormsModule, ReactiveFormsModule, RouterModule],
  template: `
    <p>
      details works!
    </p>
    <article class="bg-gray-200 rounded-md p-4">
                   <P class="font-bold">{{itemlist?.name}}</P>
                   <P>stock: {{itemlist?.stock}}</P>
                   <P>category: {{itemlist?.category}}</P>
                   <P>Items in Box: {{itemlist?.itemsInBox}}</P>
                   <div>
                    <button type="button" class="text-red-600" >Delete</button>
                  </div>
                  <div>
                    
                  </div>

                </article>
    <button type="button" class="text-blue-600" routerLink="" >Home</button>
  `,
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  stockService = inject(StockService);
  itemlist: Item | undefined;

  constructor() {
    console.log(String(this.route.snapshot.params['id']))
    const itemId = String(this.route.snapshot.params['id']);
    this.stockService.getItemById(itemId).subscribe(item => {
      this.itemlist = item;
    });
    console.log(String(this.route.snapshot.params['id']))
  }
}
