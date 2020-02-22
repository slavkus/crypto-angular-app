import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crypto-chooser',
  templateUrl: './crypto-chooser.component.html',
  styleUrls: ['./crypto-chooser.component.css']
})
export class CryptoChooserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

// api key : ca1d6ef7912560ba6a66cf19b93be5d2e842ec2cdc95bf9145d44928daa06bcb
// API KEY in HEADER - add the following header to your request: authorization: Apikey {your_api_key}.
// https://www.cryptocompare.com/cryptopian/api-keys
}
