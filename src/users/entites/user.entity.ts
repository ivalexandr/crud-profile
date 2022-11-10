import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column()
  public about: string;

  @Column()
  public address: string;

  @Column()
  public phone: string;

  @Column()
  public password: string;
}
