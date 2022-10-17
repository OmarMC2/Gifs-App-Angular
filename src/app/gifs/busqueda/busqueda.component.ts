import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})



export class BusquedaComponent {

  //ViewChilde es un decorador que permite buscar y tomar como referencia el valor de algun elemento html
  //por medio de selector, clase, id u otros solo se debe especificar el elemento su tipo 
  //y el tipo del valor esperado
  @ViewChild('txtBuscar') txtBuscar!: ElementRef <HTMLInputElement>;


  constructor( private gifsService:GifsService ){

  }

  buscar( ){
    const value = this.txtBuscar.nativeElement.value;

    if(value.trim().length === 0 ){
      return;
    }

    

    this.gifsService.buscarGifs( value )

    this.txtBuscar.nativeElement.value = '';
  }

}
