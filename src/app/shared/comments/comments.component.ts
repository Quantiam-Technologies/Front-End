import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

import { UserService } from '../../services/user/user.service';

import { NotificationsService } from 'angular2-notifications';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-inline';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() commentArray: any = [];  // an array of comments, can be provided via input
  @Input() identifier:string = null;  // if the identifier is provided, fetch comments from server




  showCommentOptions:any = {};
  identifierCheck = false;

  public Editor = ClassicEditor;

  constructor(private http: HttpClient, private notify: NotificationsService,
    public userService: UserService,) { }

  ngOnInit() {

      this.decideDataSource();


  }


  decideDataSource (){

      
      if(this.commentArray.length > 0)
      {
          this.identifier = this.commentArray[0].comment_hash;
      }

      if(this.commentArray.length === 0)
      {
        if(this.identifier){ this.fetchComments(this.identifier); }
      }

     // console.log(this.identi)

      this.identifierCheck = false;

  }

  fetchComments(identifier){

    this.http.get<any>(environment.apiUrl + `/comment/${identifier}`)
    .subscribe((r)=>{


      
    })
  }

  

  newComment(){

    this.commentArray.push({comment_text: 'Type something here!', comment_hash: this.identifier, 
    comment_employee_id: this.userService.get('id'), commentor: this.userService.currentUser});
    console.log(this.commentArray);
  }


  saveComment(event,comment){

   // console.log(event.editor.getData(), comment.comment_text);
    if(comment.comment_text !== event.editor.getData())  // only send if different
    {

    const params = comment; 
    
    params.comment_text = event.editor.getData();

    
      console.log(comment);
      if(comment.comment_entry_id)
      {

        this.http.put(environment.apiUrl + `/comment/${comment.id}`, params).subscribe((r:any)=>{

        })


      }else{


        this.http.post(environment.apiUrl + `/comment`, params).subscribe((r:any)=>{


   
                  this.commentArray[this.commentArray.length-1] = r;

         

        })

      }

    }
  }

  deleteComment(comment){

    // put a really thing here
      this.http.delete(environment.apiUrl + `/comment/${comment.id}`).subscribe((r)=>{

          this.commentArray = this.commentArray.filter(obj => obj.id !== comment.id);
      })

  }

}
