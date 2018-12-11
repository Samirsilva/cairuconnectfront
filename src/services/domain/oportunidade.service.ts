import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { OportunidadeDTO } from "../../models/oportunidade.dto";
import { API_CONFIG } from "../../config/api.config";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class OportunidadeService{

    constructor(public http: HttpClient){
    }

    findAll() : Observable<OportunidadeDTO[]> {
        return this.http.get<OportunidadeDTO[]>(`${API_CONFIG.baseUrl}/oportunidades`);
    }
}