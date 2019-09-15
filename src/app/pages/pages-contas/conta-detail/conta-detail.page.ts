import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conta-detail',
  templateUrl: './conta-detail.page.html',
  styleUrls: ['./conta-detail.page.scss']
})
export class ContaDetailPage implements OnInit {
  favoriteSeason: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

  constructor() {}

  ngOnInit() {}
}
