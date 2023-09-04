import Comment from "./comment";
import axios from "axios";
import { commentInterface, postInterface } from "./interfaces";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../auth/context/AuthProvider";

function Post({ post } : {post: postInterface}) {
  const [comments, setComments] = useState<commentInterface[]>([]);
  const [commentBody, setCommentBody] = useState<string>('');
  const user = useContext(AuthContext);

  const getComments = () => {
    axios.get(import.meta.env.VITE_SERVER_URL + '/comments', {
      params: {
        id: post.id,
        skip: 0,
        take: 5
      }
    }).then((response) => {
      setComments(response.data);
    });
  }

  useEffect(() => {
    getComments();
  },[])

  return (
  <div className= " border-2 text-secondary mb-3">
    <div className="flex flex-row p-2">
      <div className="ml-4 mt-4">
        <img className="w-20 h-20 rounded-full" src={ post.user.profile_pic || "https://upload.wikimedia.org/wikipedia/commons/b/b5/Windows_10_Default_Profile_Picture.svg"}/>
        <div className="m-auto">{ post.user.username }</div>
      </div>
      <div>
      <div className="w-full ml-2 p-2 text-left text-lg">{ post.title}</div>
      <div className="w-full ml-2 p-2 text-left text-md">{ post.body}</div>
      </div>
    </div>
    <input type="text" placeholder="Comment..." className="input input-bordered input-sm w-full max-w-xs text-primary ml-5 mb-2"
      value={commentBody}
      onChange={(e) => {setCommentBody(e.target.value)}}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && commentBody !== '') {
          axios.post(import.meta.env.VITE_SERVER_URL + '/comments',
          {
            user_id: user.auth.id,
            post_id: post.id,
            body: commentBody,
          }).then(() => {
            getComments();
          }).catch((err) => {
            console.error(err);
          })
          setCommentBody('');
        }
      }}
    />
    {
      comments.map((comment, i) => {
        return (<Comment key={i} comment={comment}/>);
      })
    }
  </div>);
}

export default Post;