interface User {
  username: string,
  profile_pic: string
}

export interface postInterface {
  id: number,
  title: string,
  body: string,
  created_at: string,
  updated_at: string,
  user_id: number,
  photos: [],
  comments?: commentInterface[],
  user: User
}

export interface commentInterface {
  id: number,
  body: string,
  user_id: number,
  post_id: number,
  created_at: string,
  updated_at: string,
  user: User
}