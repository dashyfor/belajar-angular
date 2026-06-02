import {
  Component,
  Renderer2,
  OnDestroy,
  HostListener
} from '@angular/core';

import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';

declare const $: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnDestroy {

  private hideMaskTimeout: any;

  constructor(
    private renderer: Renderer2,
    private httpClient: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {

    this.renderer.addClass(document.body, 'login-page');
    this.renderer.removeClass(document.body, 'sidebar-mini');
    this.renderer.removeClass(document.body, 'layout-fixed');

    this.renderer.setAttribute(
      document.body,
      'style',
      'min-height: 100vh; overflow:hidden;'
    );
  }

@HostListener('document:mousemove', ['$event'])
onMouseMove(event: MouseEvent): void {

  const helmetImage =
    document.querySelector('.hero__image--helmet') as HTMLElement;

  if (!helmetImage) {
    return;
  }

  helmetImage.style.setProperty(
    '--mouse-x',
    `${event.clientX}px`
  );

  helmetImage.style.setProperty(
    '--mouse-y',
    `${event.clientY}px`
  );

  helmetImage.classList.add('active-mask');

  clearTimeout(this.hideMaskTimeout);

  this.hideMaskTimeout = setTimeout(() => {
    helmetImage.classList.remove('active-mask');
  }, 2000);
}
  showPeringatanModal(message: string): void {

    $('#peringatanModal').modal();
    $('#pm_message').html(message);

  }

  ngOnDestroy(): void {

    clearTimeout(this.hideMaskTimeout);

    this.renderer.removeClass(
      document.body,
      'login-page'
    );

    this.renderer.removeAttribute(
      document.body,
      'style'
    );
  }

  signIn(): void {

    console.log('signIn()');

    let userId: any = $('#idText').val();
    userId = encodeURIComponent(userId);

    let password: any = $('#passwordText').val();
    password = encodeURIComponent(password);

    const url =
      'https://stmikpontianak.cloud/011100862/login.php' +
      '?id=' + userId +
      '&password=' + password;

    console.log('url : ' + url);

    this.httpClient.get(url).subscribe((data: any) => {

      console.log(data);

      const row = data[0];

      if (row.idCount != '1') {

        this.showPeringatanModal(
          'Id atau password tidak cocok'
        );

        return;
      }

      const secretKey = 'rahasia123';

      const encryptedUserId =
        CryptoJS.AES.encrypt(
          userId,
          secretKey
        ).toString();

      this.cookieService.set(
        'userId',
        encryptedUserId
      );

      console.log(
        'session data berhasil dibuat'
      );

      this.router.navigate([
        '/dashboard'
      ]);
    });
  }
}