import { Post } from './../post.model';
import { PostService } from './../post.service';
import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  // Creating here the form group and passing to the shared component as input
  createPostForm: FormGroup;

  constructor(private postService: PostService) {
    this.createPostForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required]),

      // We do not really know the default user ID for this case (setting here 1 for now)
      userId: new FormControl(1)
    });
  }

  ngOnInit(): void {}

  onSubmit(post: Post) {
    this.postService.addPost(post).subscribe(data => this.postService.dataReflected.next(data));
  }
}
