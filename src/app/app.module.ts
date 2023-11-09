import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LoginComponent } from './components/login/login/login.component';
import { LoginEmailPasswordDirective } from './directives/login-email-password.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTreeModule } from '@angular/material/tree';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { environment } from 'src/environments/environment.development';
import { MainpageComponent } from './components/dashboard/mainpage/mainpage.component';
import { PageNotFoundComponent } from './components/errors/page-not-found/page-not-found.component';
import { ToolbarComponent } from './components/dashboard/toolbar/toolbar/toolbar.component';
import { SidenavComponent } from './components/dashboard/sidenav/sidenav/sidenav.component';
import { ChannelComponent } from './components/dashboard/sidenav/channels/channel.component';
import { ChannelboxComponent } from './components/dashboard/channelbox/channelbox.component';
import { AddChannelDialogComponent } from './components/dialogs/add-channel-dialog/add-channel-dialog.component';
import { ContactboxComponent } from './components/dashboard/contactbox/contactbox/contactbox.component';

import { MessageInputComponent } from './components/dashboard/messageinput/message-input/message-input.component';
import { ThreadboxComponent } from './components/dashboard/threadbox/threadbox/threadbox.component';
import { MessageComponent } from './components/dashboard/messages/message/message.component';
import { RegisterComponent } from './components/login/register/register/register.component';
import { ResetComponent } from './components/login/reset/reset/reset.component';
import { AccountComponent } from './components/dashboard/accountbox/account/account.component';
import { EditAccountComponent } from './components/dialogs/edit-account/edit-account.component';
import { GuestDirective } from './directives/guest.directive';
import { ContactComponent } from './components/dashboard/contactbox/contact/contact.component';
import { DirectMessageComponent } from './components/dashboard/directmessagebox/direct-message/direct-message.component';
import { DmpipePipe } from './shared/pipes/dmpipe/dmpipe.pipe';
import { DmarrayPipe } from './shared/pipes/dmarray/dmarray.pipe';
import { DmnamePipe } from './shared/pipes/dmname/dmname.pipe';
import { SearchPipe } from './shared/pipes/search/search.pipe';
import { DayPipe } from './shared/pipes/day/day.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginEmailPasswordDirective,
    MainpageComponent,
    PageNotFoundComponent,
    ToolbarComponent,
    SidenavComponent,
    ChannelComponent,
    ChannelboxComponent,
    AddChannelDialogComponent,
    ThreadboxComponent,
    ContactboxComponent,
    MessageInputComponent,
    MessageComponent,
    RegisterComponent,
    ResetComponent,
    AccountComponent,
    EditAccountComponent,
    GuestDirective,
    ContactComponent,
    DirectMessageComponent,
    DmpipePipe,
    DmarrayPipe,
    DmnamePipe,
    SearchPipe,
    DayPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTreeModule,
    MatDialogModule,
    MatTooltipModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
