import { Image } from 'src/images/entities/image.entity';
import { User } from 'src/users/entities/user.entity';

export class Post {
  id: string;
  title: string;
  userId: string;
  user: User;
  imageId: string;
  image: Image;
}
