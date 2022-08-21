export interface EventRegister {
    targetQuery: string,
    event: string,
    callback: (ev: Event) => any,
    options?: boolean | AddEventListenerOptions | undefined
}