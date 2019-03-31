import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Session } from './session';
import { Answer } from './answer';
import { Rating } from './rating';

@Entity()
export class Question {
  @ManyToOne(type => Session, session => session.questions)
  public session: Session;

  @OneToMany(type => Answer, answer => answer.question)
  public answers: Answer[];

  @OneToMany(type => Rating, rating => rating.question)
  public ratings: Rating[];

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public description: string;

  @Column()
  public rating: number;
}
