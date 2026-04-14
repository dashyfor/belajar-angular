import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true, // ⬅️ tambahkan ini juga kalau belum ada
  imports: [RouterModule], // ⬅️ INI KUNCI UTAMANYA
  templateUrl: './login.html',
  styleUrls: ['./login.css'], // ⬅️ sekalian benerin typo (harus plural)
})
export class Login {}
