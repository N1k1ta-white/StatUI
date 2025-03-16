import { ExtractedType } from 'src/interfaces/extract-type';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Long } from 'typeorm';

@Entity('files')
export class FileEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    fileName: string;

    @Column()
    originalName: string;

    @Column()
    notes: string;

    @Column()
    mimeType: string;

    @Column()
    size: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({type: 'json'})
    typeOfAttributes: Record<string, ExtractedType>;
}