import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
// import { serverRoutes } from './app.routes.server';

export class ServerLocalStorageService {
  store(key: string, value: any) {}
  retrieve(key: string): any { return null; }
  clear(key?: string) {}
}

export class ServerSessionStorageService {
  store(key: string, value: any) {}
  retrieve(key: string): any { return null; }
  clear(key?: string) {}
}

@NgModule({
  imports: [AppModule, ServerModule],
  // providers: [
  //   { provide: LocalStorageService, useClass: ServerLocalStorageService },
  //   { provide: SessionStorageService, useClass: ServerSessionStorageService }
  // ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
