import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

export interface CoinsDropdown {
  coinName: string;
  coinAkronim: string;

}

@Component({
  selector: 'app-crypto-chooser',
  templateUrl: './crypto-chooser.component.html',
  styleUrls: ['./crypto-chooser.component.css']
})

export class CryptoChooserComponent implements OnInit {

  constructor(private client: HttpClient) { }

  coinControl = new FormControl();

  selectedCoins: any[] = [];
  // dataTable: object[];
  // coins: AllData[] = [];
  private apiKey = 'ca1d6ef7912560ba6a66cf19b93be5d2e842ec2cdc95bf9145d44928daa06bcb';
  private httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Apikey ' + this.apiKey,
    })
  };

  // api key : ca1d6ef7912560ba6a66cf19b93be5d2e842ec2cdc95bf9145d44928daa06bcb
  // API KEY in HEADER - add the following header to your request: authorization: Apikey {your_api_key}.
  // https://www.cryptocompare.com/cryptopian/api-keys

  coins: CoinsDropdown[] = [
    {
      coinName: 'Ethereum',
      coinAkronim: 'ETH',
    },
    {
      coinName: 'Ripple',
      coinAkronim: 'XRP',
    },
    {
      coinName: 'Litecoin',
      coinAkronim: 'LTC',
    },
    {
      coinName: 'Tether',
      coinAkronim: 'USDT',
    },
    {
      coinName: 'Bitcoin Cash',
      coinAkronim: 'BCH',
    },
    {
      coinName: 'Libra',
      coinAkronim: 'LIBRA',
    },
    {
      coinName: 'Monero',
      coinAkronim: 'XMR',
    },
    {
      coinName: 'EOS',
      coinAkronim: 'EOS',
    },
    {
      coinName: 'Bitcoin SV',
      coinAkronim: 'BSV',
    },
    {
      coinName: 'Binance Coin',
      coinAkronim: 'BNB',
    }
  ];

  getCoins() {
    const urlAllCoins = 'https://min-api.cryptocompare.com/data/all/coinlist';
    return this.client.post(urlAllCoins, this.httpHeader)
      .subscribe(data => {
        // this.coins = data;
        // this.dataTable = data as object[];
        // console.log(this.dataTable);
        // for (let element in this.dataTable) {
        // console.log('Element object: ' + JSON.stringify(this.dataTable[element]));
        // }
      });
  }

  addCoins(item) {
    if (this.selectedCoins.indexOf(item) > -1) {
      this.selectedCoins.splice(this.selectedCoins.indexOf(item), 1);
    } else {
      this.selectedCoins.push(item);
    }
    console.log(this.selectedCoins);
  }

  loadCoins() {
    this.selectedCoins.toString();
  }

  removeList() {
    this.selectedCoins = [];
  }

  searchValue() {

  }

  ngOnInit() {
    this.getCoins();
  }

}



