import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UsersModule, PostsModule, CommentsModule, ImagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
