import { HttpClient } from '@angular/common/http';
import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { map, Observable, of } from 'rxjs';
import { IResponseAnime } from '../models/anime-api.interface';
import { IProductCard } from '../models/product-card.interface';

@Injectable({ providedIn: 'root' })
export class AnimeService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _platformId = inject(PLATFORM_ID);

  getAnimes(): Observable<IProductCard[]> {
    console.log('🌍 isBrowser:', isPlatformBrowser(this._platformId));
    
    if (!isPlatformBrowser(this._platformId)) {
      console.warn('⛔ AnimeService.getAnimes() llamado en SSR, se omite petición HTTP');
      return of([]); // Devuelve array vacío al servidor
    }

    // ✅ Solo en el navegador
    return this._httpClient
      .get<IResponseAnime>('https://api.jikan.moe/v4/anime?q=kimetsu&sfw')
      .pipe(
        map((response) =>
          response.data
            .filter((item) => item.synopsis)
            .map<IProductCard>((item) => ({
              urlImage: item.images.jpg.image_url,
              price: this._getNumberRandom(),
              name: item.title,
              description: item.synopsis!,
            }))
        )
      );
  }

  private _getNumberRandom() {
    return Math.floor(Math.random() * (500 - 1 + 1) + 1);
  }
}
