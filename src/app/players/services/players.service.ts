import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IDNamePlayers } from '../interfaces/idName-players.interface';
import { InfoPlayers } from '../interfaces/info-players.interface';

const API_URL = 'https://americas.api.riotgames.com/riot/account/v1';
const API_URL_INFO = 'https://la1.api.riotgames.com/lol/summoner/v4';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

private http = inject(HttpClient);
private API_KEY = 'RGAPI-1b2347f5-1038-41e3-bf15-b82a601d0c1c';


searchPlayers(query: string) {
  query = query.toLowerCase();

  const [gameName, tagLine] = query.split('#');

  if (!gameName || !tagLine) {
    throw new Error('Formato incorrecto. Usa "Nombre#TAG"');
  }

  return this.http.get<IDNamePlayers[]>(`${API_URL}/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${this.API_KEY}`);

}

getInfoPlayer(puuid: string) {
  return this.http.get<InfoPlayers>(`${API_URL_INFO}/summoners/by-puuid/${puuid}?api_key=${this.API_KEY}`);
}





}