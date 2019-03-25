import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Question } from './question';

@Entity()
export class Session {
  @OneToMany(type => Question, question => question.session)
  public questions: Question[];

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public eventId: string;

  @Column()
  public code: string;
}
