export default class EventManager{
    constructor(){
        this.events = {};
    }
    on(eventName, handler){
        if(!this.events[eventName]){
            this.events[eventName] = [];
        }
        this.events[eventName].push(handler);
    }
    off(eventName, handler){
        if(this.events[eventName]){
            this.events[eventName] = this.events[eventName].filter(h => h !== this.events[eventName]);
        }
    }
    emit(eventName, data){
        if(this.events[eventName]){
            this.events[eventName].forEach(handler => handler(data));

        }

    }
}

