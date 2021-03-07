import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../shared/services/loader.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  isLoading: boolean;

  constructor(private loaderService: LoaderService) {
    this.loaderService.isLoading.subscribe((data) => {
      this.isLoading = data;
    });
  }

  ngOnInit(): void {
    //this.loaderService.isLoadingObs.subscribe(data =>
    //  this.isLoading = data
    //);
  }
}
