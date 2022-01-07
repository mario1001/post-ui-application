import { PostService } from './../../../modules/posts/post.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormGroup } from '@angular/forms';

import { Post } from 'src/app/modules/posts/post.model';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-black-form',
  templateUrl: './black-form.component.html',
  styleUrls: ['./black-form.component.css']
})
export class BlackFormComponent implements OnInit {

  // Input and Output parameters (external interaction)
  @Input() postForm: FormGroup;
  @Input() formTitle: string;
  @Input() formSubmitButtonText: string;
  @Output() formSubmitted = new EventEmitter<Post>();

  // These are the internal parameters (managed by this component alone)
  data: Post;
  inputs: string[];

  constructor(private postService: PostService) {
    this.inputs = [];
  }

  ngOnInit(): void {
    console.log(this.postForm);

    Object.keys(this.postForm.controls).forEach(key => {
      this.inputs.push(key);
    });

    // Business logic here is just getting the data reflected in events and show them
    // within bootstrap modal in screen, after that just update the form with that values (consistency)
    this.postService.dataReflected.subscribe(data => {
      console.log(data);
      this.data = data;

      const element = document.getElementById('dataReflected');
      const myModal = new Modal(element);
      myModal.show();

      const {id, ...reflectedData} = this.data;
      this.postForm.setValue(reflectedData);
    });
  }

  onSubmit() {
    this.formSubmitted.emit(<Post> this.postForm.value);
  }
}
