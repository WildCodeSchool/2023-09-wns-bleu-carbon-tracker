import InputCreatePost from '../entities/post/input-create';
import { db } from '../db';
import Post from '../entities/post/post';
import User from '../entities/user/user';

export default class PostService {
  static async create(data: InputCreatePost, user: User) {
    const newPost = new Post();
    newPost.content = data.content;
    newPost.title = data.title;
    newPost.user = user;

    const postRepository = db.getRepository(Post);
    await postRepository.save(newPost);
    return newPost;
  }
}
