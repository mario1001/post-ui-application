import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  // Creating here the form group and passing to the shared component as input
  updatePostForm: FormGroup;
  post: Post;

  constructor(private postService: PostService, private route: ActivatedRoute) {
    this.updatePostForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required]),

      // We do not really know the default user ID for this case (setting here 1 for now)
      userId: new FormControl(1)
    });
  }

  ngOnInit(): void {
    // Should pick up the post detail and fill values in form control
    this.route.queryParams
      .subscribe(params => {
        let postId: number = params['id'];

        if (postId != null) {
          // Show the data retrieved from API (let user modify fields)
          this.postService.getPost(postId).subscribe(data => {
            this.post = data;
            this.postService.dataReflected.emit(data);
          });
        } else {
          // Just display for getting the post ID ...
          // TODO
        }
      }
    );
  }

  onSubmit(post: Post) {
    post.id = this.post.id;
    this.postService.updatePost(post).subscribe(data => this.postService.dataReflected.emit(data));
  }
}
