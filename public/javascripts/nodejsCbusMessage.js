'use strict'
class cbusMessage {
    constructor(){
        this._message = '';
    }

    get message(){
        return this._message;
    }

    set message(msg){
        if (msg){
            this._message = msg.toString();
        }
    }

    opCode(){
        return this.message.substr(7,2);
    }

    nodeId(){
        return parseInt(this.message.substr(9,4), 16);
    }

    eventId(){
        return parseInt(this.message.substr(13,4), 16);
    }

    index(){
        return parseInt(this.message.substr(13,2), 16);
    }
}
