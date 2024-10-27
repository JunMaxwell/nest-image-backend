import { Comment } from 'src/comments/entities/comment.entity';
import { Post } from 'src/posts/entities/post.entity';

export class Image {
  id: string;
  url: string;
  post?: Post;
  comments: Comment[];
}
