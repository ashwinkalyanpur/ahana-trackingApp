import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

class Registration {
  constructor(
    public city: string = '',
    public name: string = '',
    public pnumber: string = ''
  ) {}
}
@Component({
  selector: 'app-vendor-registration',
  templateUrl: './vendor-registration.component.html',
  styleUrls: ['./vendor-registration.component.css']
})
export class VendorRegistrationComponent implements OnInit {
  constructor(private http: HttpClient) { 
    this.registrations.push(new Registration('Bangalore', 'Rajesh', '9999999999'));
    this.registrations.push(new Registration('Mumbai', 'Varma', '8989898989'));
    this.registrations.push(new Registration('Pune', 'Raju', '7894498756'));
  }
  registrations: Registration[] = [];
  regModel: Registration;
  showNew: Boolean = false;
  submitType: string = 'Save';
  selectedRow: number;
  ngOnInit() {
  }
  fileData: File = null;
  previewUrlVRForm:any = null;
  fileUploadProgressVRForm: string = null;
  uploadedFilePathVRForm: string = null;

  fileDataNDA: File = null;
  previewUrlNDA:any = null;
  fileUploadProgressNDA: string = null;
  uploadedFilePathNDA: string = null;

  fileDataAgre: File = null;
  previewUrlAgre:any = null;
  fileUploadProgressAgre: string = null;
  uploadedFilePathAgre: string = null;
   
  VRForm(fileInput: any) {
        this.fileData = <File>fileInput.target.files[0];
        this.preview();
  }
  NDA(fileInput: any) {
    this.fileDataNDA = <File>fileInput.target.files[0];
    this.previewNDA();
}
  Agreement(fileInput: any) {
    this.fileDataAgre = <File>fileInput.target.files[0];
    this.previewAgre();
  }
   
  preview() {
      // Show preview 
      var mimeType = this.fileData.type;
      if (mimeType.match(/image\/*/) == null) {
        return;
      }
   
      var reader = new FileReader();      
      reader.readAsDataURL(this.fileData); 
      reader.onload = (_event) => { 
        this.previewUrlVRForm = reader.result; 

      }
  }
  previewNDA() {
    // Show preview 
    var mimeType = this.fileDataNDA.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
 
    var reader = new FileReader();      
    reader.readAsDataURL(this.fileDataNDA); 
    reader.onload = (_event) => { 
      this.previewUrlNDA = reader.result; 
    }
}
previewAgre() {
  // Show preview 
  var mimeType = this.fileDataAgre.type;
  if (mimeType.match(/image\/*/) == null) {
    return;
  }

  var reader = new FileReader();      
  reader.readAsDataURL(this.fileDataAgre); 
  reader.onload = (_event) => { 
    this.previewUrlAgre = reader.result; 
  }
}
   
  onSubmitVRForm() {
    const formData = new FormData();
    formData.append('files', this.fileData);
     
    this.fileUploadProgressVRForm = '0%';
 
    this.http.post('https://us-central1-tutorial-e6ea7.cloudfunctions.net/fileUpload', formData, {
      reportProgress: true,
      observe: 'events'   
    })
    .subscribe(events => {
      if(events.type === HttpEventType.UploadProgress) {
        this.fileUploadProgressVRForm = Math.round(events.loaded / events.total * 100) + '%';
      } else if(events.type === HttpEventType.Response) {
        this.fileUploadProgressVRForm = '';
      }
         
    }) 
}
  onSubmitNDA() {
    const formData = new FormData();
    formData.append('files', this.fileDataNDA);
    
    this.fileUploadProgressNDA = '0%';

    this.http.post('https://us-central1-tutorial-e6ea7.cloudfunctions.net/fileUpload', formData, {
      reportProgress: true,
      observe: 'events'   
    })
    .subscribe(events => {
      if(events.type === HttpEventType.UploadProgress) {
        this.fileUploadProgressNDA = Math.round(events.loaded / events.total * 100) + '%';
      } else if(events.type === HttpEventType.Response) {
        this.fileUploadProgressNDA = '';
      }
        
    }) 
  }
  onSubmitAgre() {
    const formData = new FormData();
    formData.append('files', this.fileDataAgre);
    
    this.fileUploadProgressAgre = '0%';

    this.http.post('https://us-central1-tutorial-e6ea7.cloudfunctions.net/fileUpload', formData, {
      reportProgress: true,
      observe: 'events'   
    })
    .subscribe(events => {
      if(events.type === HttpEventType.UploadProgress) {
        this.fileUploadProgressAgre = Math.round(events.loaded / events.total * 100) + '%';
      } else if(events.type === HttpEventType.Response) {
        this.fileUploadProgressAgre = '';
      }
        
    }) 
  }


onNew() {
    this.regModel = new Registration();
    this.submitType = 'Save';
    this.showNew = true;
    }
onSave() {
  if (this.submitType === 'Save') {
  this.registrations.push(this.regModel);
  } else {
  this.registrations[this.selectedRow].city = this.regModel.city;
  this.registrations[this.selectedRow].name = this.regModel.name;
  this.registrations[this.selectedRow].pnumber = this.regModel.pnumber;
  }
  this.showNew = false;
  }
onEdit(index: number) {
  this.selectedRow = index;
  this.regModel = new Registration();
  this.regModel = Object.assign({}, this.registrations[this.selectedRow]);
  this.submitType = 'Update';
  this.showNew = true;
  }
onDelete(index: number) {
  this.registrations.splice(index, 1);
  }
onCancel() {
  this.showNew = false;
  }
}
