import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
//Interfaces
import { IDNamePlayers } from '../interfaces/player-info/idName-players.interface';
import { InfoPlayers } from '../interfaces/player-info/info-players.interface';
import { ImgLevel } from '../interfaces/player-info/img-level-player.interface';
import { MatchIdList } from '../interfaces/matchs-info/match-id-.interdace';
import { MatchInfo } from '../interfaces/matchs-info/match-info.interface';
//APIS
const API_URL = 'https://americas.api.riotgames.com/riot/account/v1';
const API_URL_INFO = 'https://la1.api.riotgames.com/lol/league/v4';
const API_URL_IMG_LEVEL = 'https://la1.api.riotgames.com/lol/summoner/v4';
const API_URL_MATCH_ID = 'https://americas.api.riotgames.com/lol/match/v5';
const API_URL_INFO_MATCH = 'https://americas.api.riotgames.com/lol/match/v5';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  private http = inject(HttpClient);
  private API_KEY = 'RGAPI-843df658-3f50-476f-b070-c46e0cf71575';
  private players: { puuid: string; summonerName: string }[] = [];

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

  getMatchId(puuid: string) {
    return this.http.get<string[]>(`${API_URL_MATCH_ID}/matches/by-puuid/${puuid}/ids?start=0&count=5?api_key=${this.API_KEY}`);
  }

  getInfoMatch(matchId: string) {
    return this.http.get<MatchInfo>(`${API_URL_INFO_MATCH}/matches/${matchId}?api_key=${this.API_KEY}`);
  }

  addPlayer(puuid: string, summonerName: string) {
    if (!this.players.some(p => p.puuid === puuid)) {
      this.players.push({ puuid, summonerName });
    }
  }

  getPlayers(): { puuid: string; summonerName: string }[] {
    return this.players;
  }
}
