import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { appConfig } from "./appconfig";

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
