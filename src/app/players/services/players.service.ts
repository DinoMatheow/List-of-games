import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IDNamePlayers } from '../interfaces/idName-players.interface';
import { InfoPlayers } from '../interfaces/info-players.interface';
import { ImgLevel } from '../interfaces/img-level-player.interface';

const API_URL = 'https://americas.api.riotgames.com/riot/account/v1';
const API_URL_INFO = 'https://la1.api.riotgames.com/lol/league/v4';
const API_URL_IMG_LEVEL = 'https://la1.api.riotgames.com/lol/summoner/v4';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

private http = inject(HttpClient);
private API_KEY = 'RGAPI-b201d2b1-a466-4c5f-95fd-8780db52c543';


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

getImgLevelPlayer(puuid: string) {
  return this.http.get<ImgLevel>(`${API_URL_IMG_LEVEL}/summoners/by-puuid/${puuid}?api_key=${this.API_KEY}`);
}




}