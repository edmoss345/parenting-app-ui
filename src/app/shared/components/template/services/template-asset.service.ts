import { Injectable } from "@angular/core";
import { ASSETS_CONTENTS_LIST } from "src/app/data";
import { ThemeService } from "src/app/feature/theme/services/theme.service";
import { AsyncServiceBase } from "src/app/shared/services/asyncService.base";
import { TemplateTranslateService } from "./template-translate.service";

/** Synced assets are automatically copied during build to asset subfolder */
const ASSETS_BASE = `assets/app_data/assets`;

/** Expected folder containing global assets (TODO - merge with scripts) */
const ASSETS_GLOBAL_FOLDER_NAME = "global";
const DEFAULT_THEME_NAME = "default";

@Injectable({ providedIn: "root" })
export class TemplateAssetService extends AsyncServiceBase {
  constructor(
    private translateService: TemplateTranslateService,
    private themeService: ThemeService
  ) {
    super("TemplateAsset");
    this.registerInitFunction(this.initialise);
  }

  private async initialise() {
    await this.ensureAsyncServicesReady([this.translateService]);
    this.ensureSyncServicesReady([this.themeService]);
  }

  /**
   * Retrieve the path to a variation of an asset for the current language and theme.
   * It is possible that such a variation does not exist, in which case the path to a
   * different version of the asset will be returned as a fallback.
   * The order of priority for these fallbacks is:
   * 1. current theme, current language
   * 2. default theme, current language
   * 3. current theme, default language
   * 4. default theme, default language
   */
  getTranslatedAssetPath(value: string) {
    const assetName = this.cleanAssetName(value);
    const assetEntry = ASSETS_CONTENTS_LIST[assetName];
    if (!assetEntry) {
      console.error("Asset missing", value, assetName);
    }
    // Define default/fallback asset path: asset's "global" version for the default theme
    let relativePathToOverride = `${ASSETS_GLOBAL_FOLDER_NAME}/${assetName}`;

    const currentThemeName = this.themeService.getCurrentTheme();
    const currentLanguageCode = this.translateService.app_language;

    // Assets for the default theme are stored in the base folder,
    // assets for other themes are nested in a child "theme_" folder
    const themePath = currentThemeName === DEFAULT_THEME_NAME ? "" : `theme_${currentThemeName}/`;

    // Use a translated version of the asset for the current language and theme, if it exists
    if (assetEntry?.themeVariations?.[currentThemeName]?.[currentLanguageCode]) {
      relativePathToOverride = `${themePath}${currentLanguageCode}/${assetName}`;
    }
    // If a translated version does not exist in this theme for the current language,
    // use the translated version for the default theme, if it exists.
    // This prioritises language over theme, in order to try and serve the user the asset
    // in their chosen language if any translation exists.
    else if (assetEntry?.themeVariations?.[DEFAULT_THEME_NAME]?.[currentLanguageCode]) {
      relativePathToOverride = `${currentLanguageCode}/${assetName}`;
    }
    // Otherwise use a the global version of the asset for the current theme, if it exists
    else if (assetEntry?.themeVariations?.[currentThemeName]?.[ASSETS_GLOBAL_FOLDER_NAME]) {
      relativePathToOverride = `${themePath}${ASSETS_GLOBAL_FOLDER_NAME}/${assetName}`;
    }
    return this.convertPLHRelativePathToAssetPath(relativePathToOverride);
  }

  private cleanAssetName(value: string) {
    // remove prefix slash
    if (value.startsWith("/")) value = value.substring(1);
    return value;
  }

  /**
   * When asset paths are provided it is relative to the assets folder populated from
   * google drive. Rewrite paths to add correct prefix, fixing common authoring mistakes
   */
  private convertPLHRelativePathToAssetPath(value: string) {
    // ensure starts either "assets" or "/assets/"
    const regex = new RegExp(`^(\/)?assets\/`, "gi");
    let transformed = value;
    if (!regex.test(transformed)) {
      transformed = `${ASSETS_BASE}/${transformed}`.replace("//", "/");
    }
    // remove duplicate path if exist (TODO - CC 2021-05-13 possibly no longer required)
    if (transformed.includes(`${ASSETS_BASE}/${ASSETS_BASE}`)) {
      transformed = transformed.replace(`${ASSETS_BASE}/${ASSETS_BASE}`, ASSETS_BASE);
    }
    return transformed;
  }
}

/**
 * DEPRECATED - CC 2021-11-12
 * This method was used to make GET/HEAD request to check if an asset exists,
 * however no longer required as a index of assets is provided instead for sync lookup.
 * Recommend to keep for reference (and in case we want to use user-generated content/files)
 *
 * Use HTTP request to check if local asset file exists
 *
 * NOTE - this will still result in a lot of browser errors for files not found
 * https://stackoverflow.com/a/55810490/5693245
 * https://github.com/angular/angular/issues/8832
 *
 * Only workarounds I can think of would be to populate a list of assets
 * during build process, or modifying the webpack server to respond with a 2xx code
 * https://github.com/manfredsteyer/ngx-build-plus
 * https://github.com/just-jeb/angular-builders#readme
 *
 * Tested trying to provide an interceptor (below), but does not prevent the logs
 * (see https://angular.io/guide/http#intercepting-requests-and-responses)
 **/

/*
 private async deprecatedCheckAssetExists(assetPath: string) {
    return new Promise((resolve) => {
        if (environment.production) {
            // observe reponse will send back status code and not just empty (which would also be ok)
            this.http.head(assetPath, { observe: 'response', responseType: 'text' }).subscribe(
                (res) => { resolve(true); },
                (err) => { resolve(false); },
            );
        }
        // HEAD requests not supported in local development
        // https://github.com/angular/angular-cli/issues/5170
        else {
            this.http.get(assetPath, { observe: 'response', responseType: 'arraybuffer' }).subscribe(
                (res) => { resolve(true); },
                (err) => { resolve(false); },
            );
        }

    });
}
 */

/**
 * Deprecated - CC 2021-11-12
 * Worth retaining for future reference
 *
 * Example interceptor to globally handle specific HTTP requests
 * such as those to the ASSETS_BASE folder.
 *
 * See further examples at: https://angular.io/guide/http#intercepting-requests-and-responses
 *
 * Must be included in app.module.ts providers *
 * ```
 * { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },
 * ```
 */

/*
@Injectable()
export class DeprecatedAssetRequestInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // Example to intercept asset requests and provide mocked response
        if (req.url.includes(ASSETS_BASE)) {
            console.log('asset req', req)
            return of(new HttpResponse({
                status: 200,
            }));
        }
        // Example to intercept responses and alter error code
        // NOTE
        return next.handle(req).pipe(
            catchError(err => {
                console.error('custom err', err.url)
                const assetResponse = new HttpResponse({ status: 204, statusText: "No Asset" })
                return of(assetResponse)
                const newHttpErrorResponse = new HttpErrorResponse({
                    error: err.error,
                    headers: err.headers,
                    status: 500,
                    statusText: err.statusTex,
                    url: err.url
                });
                return Observable.throw(newHttpErrorResponse);
            }),
            tap(evt => {
                if (evt instanceof HttpResponse) {
                    console.log('evt', evt)
                }
            })
        )
    }
}
*/
