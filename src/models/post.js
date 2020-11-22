export default class Post {
    constructor(title, image) {
        this.title = title ?? 'standart title if null';
        this.date = new Date().toLocaleString();
        this.image = image;
    }
    toString() {
        return JSON.stringify({
            title: this.title,
            date: this.date,
            image: this.image,
        }, null, 2);
    }
    get uppercaseTitle() {
        return this.title.toUpperCase();
    }
}
