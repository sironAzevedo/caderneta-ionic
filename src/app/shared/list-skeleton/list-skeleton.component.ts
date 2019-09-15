import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-skeleton',
  templateUrl: './list-skeleton.component.html',
  styleUrls: ['./list-skeleton.component.scss'],
})
export class ListSkeletonComponent implements OnInit {

  @Input() items: any[] = [];

  constructor() { }

  ngOnInit() {}

}
