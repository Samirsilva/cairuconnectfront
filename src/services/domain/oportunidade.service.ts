import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { OportunidadeDTO } from "../../models/oportunidade.dto";
import { API_CONFIG } from "../../config/api.config";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class OportunidadeService{

    constructor(public http: HttpClient){
    }

    findById(oportunidade_id  :string){
        return this.http.get<OportunidadeDTO>(`${API_CONFIG.baseUrl}/oportunidades/${oportunidade_id}`)
    }

    findAll() : Observable<OportunidadeDTO[]> {
        return this.http.get<OportunidadeDTO[]>(`${API_CONFIG.baseUrl}/oportunidades`);
    }

    getimageFromBucket(id : string) : Observable<any>{
        let url = `${API_CONFIG.bucketBaseUrl}/oportu${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }
}