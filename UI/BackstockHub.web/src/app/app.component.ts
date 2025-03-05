import { FormsModule, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Item } from '../models/item.model';
import { Observable } from 'rxjs';
import { HomeComponent } from "./home/home.component";




@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, FormsModule, ReactiveFormsModule, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  title = 'BackstockHub';
  
}


