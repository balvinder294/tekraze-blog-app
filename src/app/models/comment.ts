export class Comment {
    id: number;
    author: number;
    author_email: string;
    author_ip: string;
    author_name: string;
    author_url: string;
    author_user_agent: string;
    content: object;
    date: string;
    date_gmt: string;
    link: string;
    parent: number;
    post: number;
    status: string;
    type: string;
    author_avatar_urls: object;
    meta: object;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}