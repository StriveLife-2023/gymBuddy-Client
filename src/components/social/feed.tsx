import Post from "./post";
import axios from "axios";
import { useState, useEffect, useContext } from 'react';
import { postInterface } from "./interfaces";
import PostForm from "./PostForm";

//#7F7B82
function Feed() {

  const [posts, setPosts] = useState<postInterface[]>([]);

  useEffect(() => {
    axios.get(import.meta.env.VITE_SERVER_URL + '/posts').then((response) => {
      setPosts(response.data);
    });
  },[]);

  return ( <div className="m-auto mt-2" style={{width:"75vw"}}>
    <div className="card w-1/1 bg-primary p-4 overflow-scroll" style={{minHeight:"200px", maxHeight:"90vh"}}>
      <div className="h-full overflow-y-scroll">
        {
          posts.map((post, i) => {
            return (<Post key={i} post={post}/>)
          })
        }
      </div>
      <PostForm />
    </div>
  </div> );
}

export default Feed;