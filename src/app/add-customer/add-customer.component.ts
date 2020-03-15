import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  clients = ['Select Client Listed', 'UTC', 'SBI','Super Market', 'Manpower'];

  public hideCompanyName = true;
  public form = {
    childClient: null
 };
  fileToUpload: File = null;
  constructor() { }

  ngOnInit() {
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
}
selectInput(){
  this.hideCompanyName = false;
}
}
