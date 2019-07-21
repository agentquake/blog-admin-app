import { Blogger } from './blogger';

export class Post {
    id: number;
    type: string;
    title: string;
    status: string;
    content: string;
    source: string;
    image: string;
    createdDate: Date;
    updatedDate: Date;
    user: Blogger;
}
