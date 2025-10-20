import { Component, OnInit } from '@angular/core';
import { IProductCard } from '../../models/product-card.interface';
//import { AnimeService } from '../services/anime.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AnimeService } from '../../services/anime.service';

@Component({
  standalone: true,
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  imports: [CommonModule, ProductCardComponent],
})
export class ProductsComponent implements OnInit {
  products: IProductCard[] = [];

  constructor(private _animeService: AnimeService) {}

  ngOnInit() {
    this._animeService.getAnimes().subscribe((response) => {
      console.log(response);
      this.products = response;
    });
  }
}
