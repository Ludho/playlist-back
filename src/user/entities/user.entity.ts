import { Video } from 'src/videos/entities/video.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id?: number;
 
  @Column({ unique: true })
  public email: string;
 
  @Column()
  public name: string;
 
  @Column()
  public password: string;

  @Column()
  public avatarID: number;

  @OneToMany( () => Video, video => video.user)
  videos: Video[];
}
 
export default User;