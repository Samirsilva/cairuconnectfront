import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { EventoDTO } from "../../models/evento.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class EventoService{

    constructor(public http: HttpClient){
    }

    findAll() : Observable<EventoDTO[]> {
        return this.http.get<EventoDTO[]>(`${API_CONFIG.baseUrl}/eventos`);
    }
}