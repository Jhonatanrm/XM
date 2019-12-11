//Modules ext
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

//Libraries
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//Services
import { AppConfig } from './config/config.service';


//Components
import { AppComponent } from './app.component';


//modals
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './layouts/footer/footer.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';


//Functions
export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.load();
}


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule
  ],
  exports: [
    NgbModule
  ],

  providers: [
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig],
      multi: true
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
