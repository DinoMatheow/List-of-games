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
private API_KEY = 'RGAPI-da0c4888-626b-411f-b76a-757e138a8153';


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