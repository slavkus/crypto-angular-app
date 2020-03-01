import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';

export interface CoinsDropdown {
  coinName: string;
  coinAkronim: string;
}

/* export interface TableDataApi {
  items: Tabledata[];
  total_count: number;
} */

/* export interface Tabledata {
  cryptovalue: {
    currency: string;
  };
} */

export interface Tabledata {
  cryptocurrency: {
    currency: {
      value: number;
    }
  };
}

export interface NestedData {
  value: string;
}

@Component({
  selector: 'app-crypto-chooser',
  templateUrl: './crypto-chooser.component.html',
  styleUrls: ['./crypto-chooser.component.css']
})

export class CryptoChooserComponent implements OnInit, AfterViewInit {

  constructor(private client: HttpClient) { }

  coinControl = new FormControl();
  urlAllCoins: string;
  urlComplete: string;

  selectedCoins: Tabledata[] = new Array();

  // Table-related
  displayedColumns = ['cryptocurrency', 'currency', 'value'];
  dataSource: any[] = [];
  // dataSource = new MatTableDataSource<Tabledata[]>();
  resultsLength = 0;
  isLoadingResults = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private apiKey = 'ca1d6ef7912560ba6a66cf19b93be5d2e842ec2cdc95bf9145d44928daa06bcb';
  private httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Apikey ' + this.apiKey,
    })
  };



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

  initialiseTableData() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.getCoins();
        }),
        map(data => {
          this.isLoadingResults = false;
          // this.resultsLength = data.total_count;
          console.info("What is data? ", data);
          return data; /* {
            id: data.id,
            cryptocurrency: data.id.cryptocurrency,
            currency: data.id.cryptocurrency.currency,
            value: data.id.cryptocurrency.currency.value
          }; */
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      ).subscribe(data => {
        console.info("Subscribe: " + data);
        for (let item in data) {
          this.dataSource.push(item);
        }
        // this.dataSource.data = data;
        console.info("An array with my object", this.dataSource);
      });
  }

  ngAfterViewInit() {
  }

  getCoins(): Observable<Tabledata> {
    this.generateUrl();
    return this.client.get<Tabledata>(this.urlComplete, this.httpHeader);
  }

  generateUrl() {
    this.urlAllCoins = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=';
    let counter = 0;
    for (const item in this.selectedCoins) {
      counter++;
      this.urlAllCoins += this.selectedCoins[item];
      if (counter < this.selectedCoins.length) {
        this.urlAllCoins += ',';
      }
    }
    this.urlAllCoins += '&tsyms=EUR';
    this.urlComplete = this.urlAllCoins;
  }

  addCoins(item) {
    if (this.selectedCoins.indexOf(item) > -1) {
      this.selectedCoins.splice(this.selectedCoins.indexOf(item), 1);
    } else {
      this.selectedCoins.push(item);
    }
  }

  loadCoins() {
    this.selectedCoins.toString();
  }

  removeList() {
    this.selectedCoins = [];
  }

  ngOnInit() {
  }
}
