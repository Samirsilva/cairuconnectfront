import { Injectable } from "@angular/core";
import { UsuarioDTO } from "../../models/usuario.dto";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs";
import { StorageService } from "../storage.service";
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Injectable()
export class UsuarioService {

    constructor(public http : HttpClient, public storage : StorageService){

    }

    findByEmail(email : string) : Observable<UsuarioDTO>{
        return this.http.get<UsuarioDTO>(`${API_CONFIG.baseUrl}/usuarios/email?value=${email}`);
    }

    getimageFromBucket(id : string ) : Observable<any>{
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`

        return this.http.get(url, {responseType : 'blob'});
    }

    insert(obj : UsuarioDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/usuarios`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }
}