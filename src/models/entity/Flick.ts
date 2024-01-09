import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm/browser';


@Entity()
export class Flick extends BaseEntity {
    @PrimaryColumn()
    id: number;

    @Column()
    genre: string

    @Column()
    title: string
    @Column()
    image: string

    @Column()
    url: string

    @Column()
    description: string

    @Column({ type: "text"})
    details: string
}