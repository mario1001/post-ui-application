import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PostsComponent } from './modules/posts/search/search-posts.component';
import { CreatePostComponent } from './modules/posts/create-post/create-post.component';
import { EditPostComponent } from './modules/posts/edit-post/edit-post.component';
import { MainComponent } from './modules/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    CreatePostComponent,
    EditPostComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
  constructor(private injector: Injector) {
    // Create the web components (translated from Angular ones)

    const webComponentPosts = createCustomElement(PostsComponent, { injector });
    customElements.define('view-posts', webComponentPosts);

    const webComponentCreatePost = createCustomElement(CreatePostComponent, { injector });
    customElements.define('view-create-post', webComponentCreatePost);

    const webComponentEditPost = createCustomElement(EditPostComponent, { injector });
    customElements.define('view-edit-post', webComponentEditPost);
  }

  ngDoBootstrap() {}
}
