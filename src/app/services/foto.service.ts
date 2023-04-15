import { Injectable } from "@angular/core";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

@Injectable({
  providedIn: "root",
})
export class FotoService {
  constructor(private camera: Camera) {}
}
