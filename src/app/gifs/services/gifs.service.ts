import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];
  private apiKey : string = 'YsShNk7434sMzW47Edf8mXiJDkfEAjQ4'
  //Cambiar any por su tipo
  public resultados : Gif[] = [];
  public servicioUrl :string = 'https://api.giphy.com/v1/gifs'

  public get historial() : string[] {

    //this._historial = this._historial.splice( 0, 9 );

    return [...this._historial];
  }
  
  constructor(private http: HttpClient){


    if (localStorage.getItem('historial')) {
      this._historial = JSON.parse(localStorage.getItem('historial')!) || []
    }
    if (localStorage.getItem('resultados')) {
      this.resultados = JSON.parse(localStorage.getItem('resultados')!) || []
    }
  }


  buscarGifs( query:string ){

    query = query.trim().toLowerCase();
    if(!this._historial.includes( query )){
      
      this._historial = this._historial.splice( 0, 9 );
      this._historial.unshift( query );
      localStorage.setItem('historial', JSON.stringify(this._historial))
    }

    const params = new HttpParams().set('apikey', this.apiKey )
      .set('limit', '10' )
      .set('q', query )

    

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search?`, {params})
    .subscribe( (resp) => {
      
      this.resultados = resp.data
      localStorage.setItem('resultados', JSON.stringify(this.resultados))
    })

    
    
  }
  

}
