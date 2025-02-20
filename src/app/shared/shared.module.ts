// import { importProvidersFrom, NgModule } from '@angular/core';
// import { RecruitersSharedLibsModule } from './shared-libs.module';
// import { HttpClientModule, HttpClientXsrfModule, provideHttpClient } from '@angular/common/http';
// import { Title } from '@angular/platform-browser';
// import { AppRoutingModule } from '../app-routing.module';
// import { CookieService } from 'ngx-cookie-service';
// import {  provideNgxWebstorage } from 'ngx-webstorage';



// @NgModule({
//   imports: [
//     RecruitersSharedLibsModule,
//     HttpClientModule,
//     HttpClientXsrfModule.withOptions({
//       cookieName: 'XSRF-TOKEN',
//       headerName: 'X-CSRF-TOKEN'
//     }),
//    // NgxWebstorageModule.forRoot({ prefix: 'forecast', separator: '-' }),
//     ],
//   exports: [
//     RecruitersSharedLibsModule,
//   ],
//    providers: [provideHttpClient(), importProvidersFrom(AppRoutingModule),CookieService,Title, provideNgxWebstorage(),]
//   // providers: [
//   //   Title,
//   //   CookieService,
//   // ],
// })
// export class RecruitersSharedModule {}

import { NgModule, importProvidersFrom } from '@angular/core';
import { RecruitersSharedLibsModule } from './shared-libs.module';
import { provideHttpClient, withInterceptorsFromDi,  withXsrfConfiguration } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { CookieService } from 'ngx-cookie-service';
import { provideNgxWebstorage } from 'ngx-webstorage'; 
@NgModule({ exports: [
        RecruitersSharedLibsModule,
    ], imports: [RecruitersSharedLibsModule], providers: [
        provideHttpClient(withInterceptorsFromDi()),
        importProvidersFrom(AppRoutingModule),
        provideNgxWebstorage(),
        CookieService,
        Title,
        provideHttpClient(withXsrfConfiguration({
            cookieName: 'XSRF-TOKEN',
            headerName: 'X-CSRF-TOKEN'
        }))
    ] })
export class RecruitersSharedModule {}

