import { commentInterface } from "./interfaces";

function Comment({ comment } : {comment: commentInterface}) {
  return ( <div className="w-full flex flex-row pl-8 p-2">
    <div>
      <img className="w-12 h-12 rounded-full m-auto" src={comment.user.profile_pic || "https://upload.wikimedia.org/wikipedia/commons/b/b5/Windows_10_Default_Profile_Picture.svg"}/>
      <div className="text-xs">{comment.user.username}</div>
    </div>
    <div className="w-full ml-2 p-2 text-sm">{comment.body}</div>
  </div> );
}

export default Comment;