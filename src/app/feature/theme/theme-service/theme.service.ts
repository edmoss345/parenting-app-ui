import { Injectable } from '@angular/core';
import { IpcService } from 'src/app/shared/services/ipc/ipc.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';
import { BASE_THEME, BUILT_IN_EDITABLE_THEMES } from '../built-in-themes';
import { AppTheme, colorIdToCSSVarName, ionColorNames, ThemeColor, ThemeColors } from '../theme.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  static THEME_UPDATE_CHANNEL = "THEME_UPDATE_CHANNEL";

  currentTheme: AppTheme;

  constructor(private ipcService: IpcService, private localStorageService: LocalStorageService) {

    // Listens on IPC for updates to current theme
    this.ipcService.listen(ThemeService.THEME_UPDATE_CHANNEL).subscribe((themeName: string) => {
        let themeMap = this.getThemeMap();
        this.applyCSSVariablesForTheme(themeMap[themeName]);
        this.currentTheme = themeMap[themeName];
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      this.applyCSSVariablesForTheme(this.currentTheme);
    });
  }

  init() {
    this.currentTheme = this.getCurrentTheme();
    this.applyCSSVariablesForTheme(this.currentTheme);
  }

  private getThemeMap(): { [themeName: string]: AppTheme } {
    let editableThemeMap = this.localStorageService.getJSON("editableThemes");
    if (!editableThemeMap || Object.keys(editableThemeMap).length < 1) {
      let editableThemeMap = {};
      BUILT_IN_EDITABLE_THEMES.forEach((theme) => { editableThemeMap[theme.name] = theme });
      this.localStorageService.setJSON("editableThemes", editableThemeMap);
    }
    const themeMap = { ...editableThemeMap };
    themeMap[BASE_THEME.name] = BASE_THEME;
    return themeMap;
  }

  private saveThemeMap(themeMap: { [themeName: string]: AppTheme }) {
    delete themeMap[BASE_THEME.name];
    this.localStorageService.setJSON("editableThemes", themeMap);
  }

  public getDefaultTheme(): AppTheme {
    return BASE_THEME;
  }

  public getCurrentTheme(): AppTheme {
    let themeMap = this.getThemeMap();
    let currentThemeName = this.localStorageService.getString("currentThemeName");
    this.currentTheme = themeMap[currentThemeName];
    if (!this.currentTheme) {
      this.currentTheme = BASE_THEME;
    }
    return this.currentTheme;
  }

  public setCurrentTheme(themeName: string) {
    let themeMap = this.getThemeMap();
    if (themeMap[themeName]) {
      this.currentTheme = themeMap[themeName]
    } else {
      this.currentTheme = BASE_THEME;
    }
    this.localStorageService.setString("currentThemeName", this.currentTheme.name);
    this.ipcService.send(ThemeService.THEME_UPDATE_CHANNEL, themeName);
  }

  public createNewTheme(themeName: string) {
    let themeMap = this.getThemeMap();
    let newTheme: AppTheme = { ...BASE_THEME, name: themeName };
    themeMap[newTheme.name] = newTheme;
    this.saveThemeMap(themeMap);
  }

  public updateTheme(theme: AppTheme) {
    let themeMap = this.getThemeMap();
    themeMap[theme.name] = theme;
    this.saveThemeMap(themeMap);
    if (theme.name === this.currentTheme.name) {
      this.currentTheme = theme;
      this.localStorageService.setJSON("currentTheme", theme);
    }
    this.ipcService.send(ThemeService.THEME_UPDATE_CHANNEL, theme.name);
  }

  public deleteTheme(theme: AppTheme) {
    this.localStorageService.setString("theme." + theme.name, null);
  }

  public populateWithDefaults(theme: AppTheme): AppTheme {
    Object.keys(BASE_THEME.colors).forEach((colorId) => {
      if (!theme.colors[colorId]) {
        theme.colors[colorId] = BASE_THEME.colors[colorId];
      } else {
        if (theme.colors[colorId].lightValue && !theme.colors[colorId].darkValue) {
          theme.colors[colorId].darkValue = theme.colors[colorId].lightValue;
        }
        if (theme.colors[colorId].darkValue && !theme.colors[colorId].lightValue) {
          theme.colors[colorId].lightValue = theme.colors[colorId].darkValue;
        }
      }
    });
    return theme;
  }

  public getThemes(): AppTheme[] {
    const themeMap = this.getThemeMap();
    const populatedThemes = Object.keys(themeMap).map((themeName) => {
      return this.populateWithDefaults(themeMap[themeName]);
    });
    return populatedThemes;
  }

  private applyCSSVariablesForTheme(theme: AppTheme) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let colorId = Object.keys(theme.colors) as (keyof ThemeColors)[];
    let unchangedCount = 0;
    for (let colorName of colorId) {
      const colorObj: ThemeColor = theme.colors[colorName];
      let value = colorObj.lightValue;
      let cssVarName = colorIdToCSSVarName(colorName);
      if (prefersDark) {
        value = colorObj.darkValue;
      }
      if (document.body.style.getPropertyValue(cssVarName) !== value) {
        console.log("Setting CSS variable ", cssVarName, value);
        document.body.style.setProperty(cssVarName, value);
      } else {
        unchangedCount++;
      }
    }
    console.log(`${unchangedCount} colors unchanged by theme update`);
  }

}
