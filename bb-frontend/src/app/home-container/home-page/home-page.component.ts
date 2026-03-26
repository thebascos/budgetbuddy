import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  selectedCurrency: string = 'PHP';

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.selectedCurrency = this.sharedService.getCurrencyValue();
  }

  onCurrencyChange(currency: string): void {
    this.selectedCurrency = currency;
    this.sharedService.setCurrency(currency);
  }
}
