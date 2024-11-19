import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideFirebaseApp(() => initializeApp({
    "projectId": "ring-of-fire-8165f",
    "appId": "1:802738305174:web:2b6a6bfee4b8c1fadbeab7",
    "storageBucket": "ring-of-fire-8165f.firebasestorage.app",
    "apiKey": "AIzaSyA_ELVJebmoqtZvHh0umqXhVoJOXXSyXtw",
    "authDomain": "ring-of-fire-8165f.firebaseapp.com",
    "messagingSenderId": "802738305174"
  })),
  provideFirestore(() => getFirestore()),
  provideDatabase(() => getDatabase()),
  provideClientHydration(),
  provideAnimationsAsync(),
  provideAnimationsAsync(), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-8165f","appId":"1:802738305174:web:2b6a6bfee4b8c1fadbeab7","storageBucket":"ring-of-fire-8165f.firebasestorage.app","apiKey":"AIzaSyA_ELVJebmoqtZvHh0umqXhVoJOXXSyXtw","authDomain":"ring-of-fire-8165f.firebaseapp.com","messagingSenderId":"802738305174"})), provideFirestore(() => getFirestore())]
};