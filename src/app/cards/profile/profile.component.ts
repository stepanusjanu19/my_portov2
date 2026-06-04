import { Component, OnInit, HostListener, PLATFORM_ID, inject } from "@angular/core";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { assetUrl } from "../../shared/asset-url";
import { ConfettiService } from "../../services/confetti.service";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  public readonly confettiService = inject(ConfettiService);

  showPopup = false;
  animatePopup = false;
  gridCols: string | undefined;

  readonly assetUrl = assetUrl;
  fullname: string = "Stepanus Janu Adi Nugroho";
  fulltext: string = `I love building the logic behind the scenes, crafting APIs, and exploring new technologies that make web
                      applications powerful and scalable. Curious, always learning, and driven to grow — I’m on a journey to master
                      the backend and bring ideas to lifethrough clean, efficient code. 🚀`;

  celebrate() {
    this.confettiService.clickPopper();
  }

  ngOnInit(): void {
    this.updateGridCols(this.isBrowser ? window.innerWidth : 1024);

    if (this.isBrowser) {
      // Delay the popup and animation by 3 seconds
      setTimeout(() => {
        this.showPopup = true;
        // Trigger the animation after showing the popup
        setTimeout(() => {
          this.animatePopup = true;
        }, 50); // Small delay to allow DOM to render
      }, 2500); // 3 seconds delay for popup
    }
  }

  @HostListener("window:resize")
  onResize() {
    if (!this.isBrowser) {
      return;
    }

    this.updateGridCols(window.innerWidth);
  }

  updateGridCols(windowWidth: number) {
    this.gridCols =
      windowWidth >= 1024
        ? "col-span-2"
        : windowWidth >= 640
          ? "col-span-2"
          : "col-span-1";
  }

  getGreeting(): string {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      return "Good Morning";
    } else if (currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  }
}
