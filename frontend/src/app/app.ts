import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Medecin } from './components/medecin/medecin';
import { CommonModule } from '@angular/common';
import { NavBar } from './components/nav-bar/nav-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: [RouterOutlet, NavBar],
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
  public router = inject(Router);
}
