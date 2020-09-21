import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot,CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanLoad{

  constructor( 
              private AuthService:  AuthService
             ) 
  {}

  public canLoad(): Observable<boolean> | Promise<boolean> | boolean  {
    //SE CARGA EL VALOR DE LA SESSION
    return  this.AuthService.loadSession();
  }

}
