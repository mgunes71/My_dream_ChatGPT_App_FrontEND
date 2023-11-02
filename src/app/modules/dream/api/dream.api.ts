import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DreamApi {
  apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  async getUserDreams(): Promise<any> {
    return this.http.get(`${this.apiUrl}dreams`).toPromise();
  }

  async getUserDreamById(id: number): Promise<any> {
    return this.http.get(`${this.apiUrl}dreams/${id}`).toPromise();
  }

  async addDream(dreamDto: any): Promise<any> {
    return this.http.post(`${this.apiUrl}dreams/askToAI`, dreamDto).toPromise();
  }

  async deleteDream(id: number): Promise<any> {
    return this.http.delete(`${this.apiUrl}dreams/${id}`).toPromise();
  }
}
