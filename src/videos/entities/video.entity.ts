import User from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Video {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    videoId: string;

    @Column()
    publishedAt: string;

    @Column()
    channelId: string;

    @Column({
        charset: 'utf8mb4',
    })
    channelTitle: string;

    @Column({
        charset: 'utf8mb4',
    })
    title: string;

    @Column()
    thumbnail: string;

    @Column({
        charset: 'utf8mb4',
        length: 10000,
    })
    description: string;

    @Column()
    duration: number;

    @ManyToOne(() => User, (user) => user.videos)
    user: User;
}
