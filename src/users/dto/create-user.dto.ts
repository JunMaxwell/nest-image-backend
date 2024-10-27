import { Comment } from 'src/comments/entities/comment.entity';
import { Post } from 'src/posts/entities/post.entity';

export class CreateUserDto {
  id: string;
  email: string;
  name?: string;
  posts: Post[];
  comments: Comment[];
}
