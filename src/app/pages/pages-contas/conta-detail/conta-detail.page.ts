import { Component, OnInit } from '@angular/core';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-conta-detail',
  templateUrl: './conta-detail.page.html',
  styleUrls: ['./conta-detail.page.scss']
})
export class ContaDetailPage implements OnInit {
  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];

  favoriteSeason: string;
  seasons: string[] = ['PAGO', 'VENCIDO', 'PARCELADO'];

  constructor() {}

  ngOnInit() {}
}
