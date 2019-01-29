import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { NoticiaDTO } from "../../models/noticia.dto";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class NoticiaService{
 
    constructor(public http : HttpClient){
    }

    findById(noticia_id  :string){
        return this.http.get<NoticiaDTO>(`${API_CONFIG.baseUrl}/noticias/${noticia_id}`)
    }

    findAll() : Observable<NoticiaDTO[]> {
        return this.http.get<NoticiaDTO[]>(`${API_CONFIG.baseUrl}/noticias`);
    }
 
    getimageFromBucket(id : string) : Observable<any>{
        let url = `${API_CONFIG.bucketBaseUrl}/notice${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }
}