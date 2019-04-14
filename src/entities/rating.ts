import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Question } from './question';

@Entity()
export class Rating {
  @ManyToOne(type => Question, question => question.ratings)
  public question: Question;

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public userId: string;
}
