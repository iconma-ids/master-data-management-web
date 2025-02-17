export class AppEventWithContent<T> {
    constructor(public name: string, public content: T) {}
}