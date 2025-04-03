import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IDNamePlayers } from '../interfaces/idName-players.interface';
import { InfoPlayers } from '../interfaces/info-players.interface';

const API_URL = 'https://americas.api.riotgames.com/riot/account/v1';
const API_URL_INFO = 'https://la1.api.riotgames.com/lol/league/v4';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

private http = inject(HttpClient);
private API_KEY = 'RGAPI-384f09f8-b025-4c6d-a41f-bfc750a5b005';


searchPlayers(query: string) {
  query = query.toLowerCase();

  const [gameName, tagLine] = query.split('#');

  if (!gameName || !tagLine) {
    throw new Error('Formato incorrecto. Usa "Nombre#TAG"');
  }

  return this.http.get<IDNamePlayers[]>(`${API_URL}/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${this.API_KEY}`);

}

getInfoPlayer(puuid: string) {
  return this.http.get<InfoPlayers[]>(`${API_URL_INFO}/entries/by-puuid/${puuid}?api_key=${this.API_KEY}`);
}





}