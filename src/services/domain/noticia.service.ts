import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { NoticiaDTO } from "../../models/noticia.dto";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class NoticiaService{

    constructor(public http : HttpClient){

    }

    findAll() : Observable<NoticiaDTO[]> {
        return this.http.get<NoticiaDTO[]>(`${API_CONFIG.baseUrl}/noticias`);
    }
}