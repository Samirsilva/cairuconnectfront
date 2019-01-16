import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { EventoDTO } from "../../models/evento.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class EventoService{

    constructor(public http: HttpClient){
    }

    findById(evento_id  :string){
        return this.http.get<EventoDTO>(`${API_CONFIG.baseUrl}/eventos/${evento_id}`)
    }

    findAll() : Observable<EventoDTO[]> {
        return this.http.get<EventoDTO[]>(`${API_CONFIG.baseUrl}/eventos`);
    }

    getimageFromBucket(id : string) : Observable<any>{
        let url = `${API_CONFIG.bucketBaseUrl}/evento${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }
}