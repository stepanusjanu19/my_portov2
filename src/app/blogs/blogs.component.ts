import { ContentfulService } from './../services/contentful.service';
import { Component, OnInit, PendingTasks, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent implements OnInit {
  private readonly contentfulService = inject(ContentfulService);
  private readonly pendingTasks = inject(PendingTasks);

  readonly blogPost = signal<any | null>(null);
  readonly loading = signal(true);
  readonly hasError = signal(false);

  ngOnInit(): void {
    void this.pendingTasks.run(async () => {
      try {
        this.blogPost.set(await this.contentfulService.getAllEntries());
      } catch {
        this.hasError.set(true);
      } finally {
        this.loading.set(false);
      }
    });
  }

  getPosterUrl(blog: any): string {
    const url = blog?.fields?.poster?.fields?.file?.url ?? '';
    return url.startsWith('//') ? `https:${url}` : url;
  }

  getTags(blog: any): any[] {
    return Array.isArray(blog?.fields?.tags) ? blog.fields.tags : [];
  }

}
