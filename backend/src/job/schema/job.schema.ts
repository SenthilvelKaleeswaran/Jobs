import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Job extends Document {
    @Prop({ index: 'text' })
    role: string;

    @Prop({ index: 'text' })
    area: string;

    @Prop({ index: 'text' })
    state: string;

    @Prop({ index: 'text' })
    country: string;

    @Prop({ index: 'text' })
    noOfApplicants: number;

    @Prop({ index: 'text' })
    date: Date;

    @Prop({ index: 'text' })
    company: string;

    @Prop({ index: 'text' })
    salary: number;

    @Prop({ index: 'text' })
    experienceFrom: number

    @Prop({ index: 'text' })
    experienceTo: number

    @Prop({ index: 'text', type: [String], enum: ["Javascript", "Machine language", "JQuery", "AI"] })
    skills: string[];

    @Prop({ index: true, type: [String], enum: ["Bachelor", "Masters", "Phd", "Diploma"] })
    education: string[];
}

export const JobSchema = SchemaFactory.createForClass(Job);
