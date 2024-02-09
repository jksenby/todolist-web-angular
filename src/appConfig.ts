import { provideRouter } from "@angular/router";
import { ApplicationConfig } from "@angular/core";
import { appRoutes } from "./appRoutes";
import { provideAnimations } from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes), provideAnimations()],
};
