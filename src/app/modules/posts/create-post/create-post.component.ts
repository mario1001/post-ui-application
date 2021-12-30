import { Post } from './../post.model';
import { PostService } from './../post.service';
import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';

import { Modal } from 'bootstrap';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  // IMPORTANT: THIS SHOULD BE MOVED TO SHARED MODULE AS COMPONENT (used by create/edit screen)

  createPostForm = new FormGroup({
    title: new FormControl(''),
    body: new FormControl(''),

    // We do not really know the default user ID for this case (setting here 1 for now)
    userId: new FormControl(1)
  });

  constructor(private postService: PostService) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.createPostForm.value);
    this.postService.addPost(<Post> this.createPostForm.value).subscribe(data => {
      console.log(data);

      const element = document.getElementById('operationCompleted') as HTMLElement;
      const myModal = new Modal(element);
      myModal.show();
    });
  }
}
