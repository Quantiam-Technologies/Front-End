import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }

  set(key: string, data: any) {

     const settingsObj = JSON.parse(localStorage.getItem('settings') || '{}');
     settingsObj[key] = data;
	 console.log(settingsObj);
     localStorage.setItem('settings', JSON.stringify(settingsObj));

  }

  get(key: string) {
    const settingsObj = JSON.parse(localStorage.getItem('settings') || '{}');

	if (!settingsObj) { localStorage.setItem('settings', '{}'); return null; }

    if (settingsObj[key]) { return  settingsObj[key]; }
	return  null;

  }

}
