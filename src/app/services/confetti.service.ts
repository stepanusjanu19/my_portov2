import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import type confetti from 'canvas-confetti';
import type { Options } from 'canvas-confetti';

type ConfettiFn = typeof confetti;

@Injectable({
  providedIn: 'root',
})
export class ConfettiService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private async withConfetti(callback: (confetti: ConfettiFn) => void): Promise<void> {
    if (!this.isBrowser) {
      return;
    }

    const { default: confetti } = await import('canvas-confetti');
    callback(confetti);
  }

  celebrate() {
    void this.withConfetti((confetti) => {
      var end = Date.now() + (1000);

      // go Buckeyes!
      var colors = ['#00ff44', '#eeff00', '#ff0008'];

      (function frame() {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    });
  }

  clickPopper() {
    void this.withConfetti((confetti) => {
      var count = 200;
      var defaults = {
        origin: { y: 0.7 }
      };

      function fire(particleRatio: number, opts: Options | undefined) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        });
      }

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      });
      fire(0.2, {
        spread: 60,
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    });
  }

  fireworks() {
    void this.withConfetti((confetti) => {
      var duration = 4 * 1000;
      var animationEnd = Date.now() + duration;
      var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      var interval = setInterval(function () {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);
    });
  }

  stars(){
    void this.withConfetti((confetti) => {
      var defaults = {
        spread: 360,
        ticks: 50,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        colors: ['FFE400', 'FFBD00', ]
      };

      function shoot() {
        confetti({
          ...defaults,
          particleCount: 100,
          scalar: 1.2,
          shapes: ['star']
        });

        confetti({
          ...defaults,
          particleCount: 10,
          scalar: 0.75,
          shapes: ['circle']
        });
      }

      setTimeout(shoot, 0);
      setTimeout(shoot, 100);
      setTimeout(shoot, 200);
    });
  }

}
