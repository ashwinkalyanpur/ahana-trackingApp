import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { map, skipUntil, takeUntil, repeat, sample, scan } from 'rxjs/operators';
// import {Observable} from 'rxjs/Observable';
// import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import { MapsAPILoader, AgmMap } from '@agm/core';
declare var google: any;
interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

interface Location {
  lat: number;
  lng: number;
  viewport?: Object;
  zoom: number;
  address_level_1?: string;
  address_level_2?: string;
  address_country?: string;
  address_zip?: string;
  address_state?: string;
  marker?: Marker;
}
@Component({
  selector: 'app-wrok-progress',
  templateUrl: './wrok-progress.component.html',
  styleUrls: ['./wrok-progress.component.css']
})
export class WrokProgressComponent implements OnInit {
  // lat: number = 51.678418;
  // lng: number = 7.809007;
  // lat:any;
  // lng:any;
  // public map: any = { lat: 51.678418, lng: 7.809007 };
showTimmer = false;
hideTimmer = true;
completed = false;
completedthanks = false;

geocoder: any;
  public location: Location = {
    lat: 51.678418,
    lng: 7.809007,
    marker: {
      lat: 51.678418,
      lng: 7.809007,
      draggable: true
    },
    zoom: 5
  };

  @ViewChild(AgmMap, { static: true }) map: AgmMap;
  constructor(public mapsApiLoader: MapsAPILoader) { 
    // if (navigator)
    // {
    // navigator.geolocation.getCurrentPosition( pos => {
    //     this.lng = +pos.coords.longitude;
    //     this.lat = +pos.coords.latitude;
    //   });
    // }
    this.mapsApiLoader = mapsApiLoader;

    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
  }

  ngOnInit() {
  }
  start$ = new Subject();
  stop$ = new Subject();
  record$ = new Subject();

  timer$ = interval(100).pipe(
    skipUntil(this.start$),
    takeUntil(this.stop$),
    repeat(),
    map(time => time / 10)
  );

  timeList$ = this.timer$.pipe (
    sample(this.record$),
    scan<number>((list, time) => [...list, time], [])
  )
  verified(){
    this.showTimmer = true;
    this.hideTimmer = false;
    this.completed = false;
    this.completedthanks = false;
  }
  start() {
    this.start$.next();
  }

  stop() {
    this.stop$.next();
    this.showTimmer = false;
    this.hideTimmer = false;
    this.completed = true;
    this.completedthanks = false;
  }

  record() {
    this.record$.next();
  }
  completedThank(){
    this.showTimmer = false;
    this.hideTimmer = false;
    this.completed = false;
    this.completedthanks = true;
  }


  // public showWebcam = true;
  // public allowCameraSwitch = true;
  // public multipleWebcamsAvailable = false;
  // public deviceId: string;
  // public videoOptions: MediaTrackConstraints = {
  //   // width: {ideal: 1024},
  //   // height: {ideal: 576}
  // };
  // public errors: WebcamInitError[] = [];

  // // latest snapshot
  // public webcamImage: WebcamImage = null;

  // // webcam snapshot trigger
  // private trigger: Subject<void> = new Subject<void>();
  // // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  // private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  // public ngOnInit(): void {
  //   WebcamUtil.getAvailableVideoInputs()
  //     .then((mediaDevices: MediaDeviceInfo[]) => {
  //       this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
  //     });
  // }

  // public triggerSnapshot(): void {
  //   this.trigger.next();
  // }

  // public toggleWebcam(): void {
  //   this.showWebcam = !this.showWebcam;
  // }

  // public handleInitError(error: WebcamInitError): void {
  //   this.errors.push(error);
  // }

  // public showNextWebcam(directionOrDeviceId: boolean|string): void {
  //   // true => move forward through devices
  //   // false => move backwards through devices
  //   // string => move to device with given deviceId
  //   this.nextWebcam.next(directionOrDeviceId);
  // }

  // public handleImage(webcamImage: WebcamImage): void {
  //   console.info('received webcam image', webcamImage);
  //   this.webcamImage = webcamImage;
  // }

  // public cameraWasSwitched(deviceId: string): void {
  //   console.log('active device: ' + deviceId);
  //   this.deviceId = deviceId;
  // }

  // public get triggerObservable(): Observable<void> {
  //   return this.trigger.asObservable();
  // }

  // public get nextWebcamObservable(): Observable<boolean|string> {
  //   return this.nextWebcam.asObservable();
  // }
  

  updateOnMap() {
    let full_address: string = this.location.address_level_1 || ""
    if (this.location.address_level_2) { full_address = full_address + " " + this.location.address_level_2; }
    if (this.location.address_state) { full_address = full_address + " " + this.location.address_state; }
    if (this.location.address_country) { full_address = full_address + " " + this.location.address_country; }

    this.findLocation(full_address);
  }

  findLocation(address) {
    if (!this.geocoder) { this.geocoder = new google.maps.Geocoder(); }
    this.geocoder.geocode({
      'address': address
    }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        for (var i = 0; i < results[0].address_components.length; i++) {
          let types = results[0].address_components[i].types;

          if (types.indexOf('locality') !== -1) {
            this.location.address_level_2 = results[0].address_components[i].long_name;
          }
          if (types.indexOf('country') !== -1) {
            this.location.address_country = results[0].address_components[i].long_name;
          }
          if (types.indexOf('postal_code') !== -1) {
            this.location.address_zip = results[0].address_components[i].long_name;
          }
          if (types.indexOf('administrative_area_level_1') !== -1) {
            this.location.address_state = results[0].address_components[i].long_name;
          }
        }

        if (results[0].geometry.location) {
          this.location.lat = results[0].geometry.location.lat();
          this.location.lng = results[0].geometry.location.lng();
          this.location.marker.lat = results[0].geometry.location.lat();
          this.location.marker.lng = results[0].geometry.location.lng();
          this.location.marker.draggable = true;
          this.location.viewport = results[0].geometry.viewport;
        }

        this.map.triggerResize();
      } else {
        alert("Sorry, this search produced no results.");
      }
    });
  }


  findAddressByCoordinates() {
    this.geocoder.geocode({
      'location': {
        lat: this.location.marker.lat,
        lng: this.location.marker.lng
      }
    }, (results, status) => {
      this.decomposeAddressComponents(results);
    });
  }

  decomposeAddressComponents(addressArray) {
    if (addressArray.length == 0) { return false; }
    let address = addressArray[0].address_components;

    for (let element of address) {
      if (element.length == 0 && !element['types']) { continue; }

      if (element['types'].indexOf('street_number') > -1) {
        this.location.address_level_1 = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('route') > -1) {
        this.location.address_level_1 += ', ' + element['long_name'];
        continue;
      }
      if (element['types'].indexOf('locality') > -1) {
        this.location.address_level_2 = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('administrative_area_level_1') > -1) {
        this.location.address_state = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('country') > -1) {
        this.location.address_country = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('postal_code') > -1) {
        this.location.address_zip = element['long_name'];
        continue;
      }
    }
  }
}
