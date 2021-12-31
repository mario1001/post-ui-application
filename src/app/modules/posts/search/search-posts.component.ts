import { Post } from './../post.model';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './search-posts.component.html',
  styleUrls: ['./search-posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Post[];
  readyToShow: boolean;

  constructor(private postService: PostService) {
    this.posts = [];
    this.readyToShow = false;
  }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(data => {
      this.posts = data;
      this.readyToShow = true;
      console.log(this.posts);
    });
  }

  filterPostsByUser(value: string) {
    this.readyToShow = false;

    if (value == null || value == '') {
      // Just show without filter (any post as initialization function)
      return this.ngOnInit();
    }

    this.postService.getPostsByUser(Number(value)).subscribe(data => {
      this.posts = data;
      this.readyToShow = true;
    })
  }
}
