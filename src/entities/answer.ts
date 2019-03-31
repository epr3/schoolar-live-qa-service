import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from './question';

@Entity()
export class Answer {
  @ManyToOne(type => Question, question => question.answers)
  public question: Question;

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public description: string;
}
