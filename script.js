class EventTarget {
    constructor() {
        this.listeners = new Map();
    }

    addEventListener(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        
        const callbacks = this.listeners.get(event);
        
        if (!callbacks.includes(callback)) {
            callbacks.push(callback);
        }
    }

    removeEventListener(event, callback) {
        if (this.listeners.has(event)) {
            const callbacks = this.listeners.get(event);
            const index = callbacks.indexOf(callback);
            
            if (index !== -1) {
                callbacks.splice(index, 1);
            }
            
            if (callbacks.length === 0) {
                this.listeners.delete(event);
            }
        }
    }

    dispatchEvent(event) {
        if (this.listeners.has(event)) {
            const callbacks = this.listeners.get(event);
            
            callbacks.forEach(callback => {
                callback();
            });
        }
    }
}

const target = new EventTarget();

const logHello = () => console.log('hello');
const logWorld = () => console.log('world');

target.addEventListener('hello', logHello);
target.addEventListener('world', logWorld);

target.dispatchEvent('hello');
target.dispatchEvent('world');

target.removeEventListener('hello', logHello);

target.dispatchEvent('hello');
target.dispatchEvent('world');
