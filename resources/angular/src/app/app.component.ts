import { Component } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

// Fix for require command since angular throws an error when using require()
declare var require: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /*
   * Define variables to be used on the application
   */
  title = 'Odds Converter';
  oddslib: any;
  fractional: string;
  decimal: string;
  moneyline: string;
  invalidValue: boolean;
  selectedValue: string;
  error: string;
  odds: object;
  placeHolder: string;
  data: string;
  mode: string;
  conversion: boolean;
  baseURL = 'http://localhost:8080/';
  constructor(private modalService: NgbModal, private http: Http) {
    /*
     * Initialize the variables that will be used with default values
     */
    this.fractional = null;
    this.decimal = null;
    this.moneyline = null;
    this.invalidValue = false;
    this.selectedValue = 'fractional';
    this.oddslib = require('oddslib');
    this.placeHolder = '1/5';
    this.data = '';
    this.mode = 'fractional';
    this.conversion = false;
    this.odds = [
      {name: 'Fractional (UK) Odds', value: 'fractional'},
      {name: 'Decimal (EU) Odds', value: 'decimal'},
      {name: 'Moneyline (USA) Odds', value: 'moneyline'},
    ];
  }
  /*
   * Invoke open function to show modal
   */
  openModal(content) {
    this.modalService.open(content);
  }
  /*
   * Save data on every keypress to this.data  variable and if the user presses the Enter
   * call the convertForm() function to start the conversion
   */
  onInputChange(data) {
    this.data = data.target.value;
    if (data.keyCode === 13) {
      this.convertForm();
    }
  }
  /*
   * Convert Form
   * Set invalidValue to false if it was set to true due to errors
   * check what mode is the user adding input and accordingly do the conversions
   */
  convertForm() {
    this.invalidValue = false;
    let odds;
    if (this.mode === 'fractional') {
        const data = this.data.split('/');
        for (let datas of data) {
          if (isNaN(+datas)) {
            this.invalidValue = true;
            this.error = 'Invalid Value, please try again.';
            return;
          }
        }
        try {
          odds = this.oddslib.from('fractional', this.data);
          this.fractional = this.data;
          this.decimal = odds.to('decimal', {precision: 2});
          this.moneyline = odds.to('moneyline', {precision: 3});
          this.conversion = true;
        } catch (e) {
          this.invalidValue = true;
          this.error = 'Invalid Value, please try again.';
        }
    } else if (this.mode === 'decimal') {
        if (isNaN(+this.data)) {
          this.invalidValue = true;
          this.error = 'Invalid Value, please try again.';
        } else {
          try {
            odds = this.oddslib.from('decimal', this.data);
            this.decimal = this.data;
            this.fractional = odds.to('fractional', {precision: 2});
            this.moneyline = odds.to('moneyline', {precision: 3});
            this.conversion = true;
          } catch (e) {
            this.invalidValue = true;
            this.error = 'Invalid Value, please try again.';
          }
        }
    } else {
        if (isNaN(+this.data)) {
          this.invalidValue = true;
          this.error = 'Invalid Value, please try again.';
        } else {
          if (!Number.isInteger(Number(this.data))) {
            this.invalidValue = true;
            this.error = 'Invalid Value, please try again.';
          } else {
            try {
              odds = this.oddslib.from('moneyline', this.data);
              this.fractional = odds.to('fractional', {precision: 2});
              this.decimal = odds.to('decimal', {precision: 2})
              this.moneyline = this.data;
              this.conversion = true;
            } catch (e) {
              this.invalidValue = true;
              this.error = 'Invalid Value, please try again.';
            }
          }
        }
    }

    /*
     * If this.invalidValue is true make a call to the API to save the results
     */
    if (this.invalidValue === false) {
      this.http.post(this.baseURL + 'api/save',
        {fractional_uk: this.fractional, decimal_eu: this.decimal, moneyline_usa: this.moneyline})
        .subscribe();
    }
  }

  /*
   * Save what type is selected from the dropdown and set placeHolder accordingly
   */
  change(data) {
    this.mode = data;
    if (data === 'fractional') {
      this.placeHolder = '1/5';
    } else if (data === 'decimal') {
      this.placeHolder = '1.20';
    } else {
      this.placeHolder = '-500';
    }
  }

  /*
   * Reset The form and start from the beginning
   * Set default values
   */
  resetData() {
    this.placeHolder = '1/5';
    this.selectedValue = 'fractional';
    this.data = '';
    this.fractional = '';
    this.decimal = '';
    this.moneyline = '';
    this.conversion = false;
    this.invalidValue = false;
    this.error = '';
  }
}
