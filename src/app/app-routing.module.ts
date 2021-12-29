import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './modules/main/main.component';
import { EditPostComponent } from './modules/posts/edit-post/edit-post.component';
import { CreatePostComponent } from './modules/posts/create-post/create-post.component';
import { PostsComponent } from './modules/posts/search/search-posts.component';

const routes: Routes = [
  { path: '', component: MainComponent, pathMatch: 'full' },
  { path: 'posts', component: PostsComponent },
  { path: 'create_post', component: CreatePostComponent },
  { path: 'edit_post', component: EditPostComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
