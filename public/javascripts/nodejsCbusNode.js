'use strict';

function pad(num, len){ //add zero's to ensure hex values have correct number of characters
    var padded = "00000000" + num;
    return padded.substr(-len);
}

class cbusNode {
    constructor(nodeId){
        this.nodeId = nodeId;
        this.header = ':SBFA0N';
        this.manufId = 165;
        this.name = "_NIGE  ";
        this.minorVersion = 0;
        this.moduleId = 255;
        this.numEvents = 0;
        this.numEventVariables = 0;
        this.numSupportedNodeVariables = 0;
        this.majorVersion = 0;
        this.consumer = false;
        this.producer = false;
        this.flim = false;
        this.supportsBootloader = false;
        this.events=[];
        //this.flags = 3;
    }

    flags(){
        var output = 0;
        if (this.consumer) output+=1;
        if (this.producer) output+=2;
        if (this.flim) output+=4;
        if (this.supportsBootloader) output+=8;
        return output;
    }

   params(){
        return [this.nodeId,
            this.manufId,
            this.minorVersion,
            this.moduleId,
            this.numEvents,
            this.numEventVariables,
            this.numSupportedNodeVariables,
            this.majorVersion,
            this.flags()];
    }

    eventExists(nodeId,eventId){
        var event = this.events.filter(function (item) {
            return (item.nodeId == nodeId && item.eventId == eventId);
        });
        if (event.length > 0) {
            //console.log('Node Id :' + event[0].nodeId + ' Event Id : ' + event[0].eventId+' is Active');
            return true;
        } else {
            //console.log('Event is Unkown');
            return false;
        }
    }

    addEvent(nodeId, eventId, action){
        var event = this.events.filter(function (item) {
            return (item.nodeId == nodeId && item.eventId == eventId && item.task == action);
        });
        if (event.length == 0) {
            this.events.push({"nodeId": nodeId, "eventId": eventId, "task": action});
        }
    }

    PNN(){
        return this.header+'B6'+pad(this.nodeId.toString(16),4)+pad(this.manufId.toString(16),2)+pad(this.moduleId.toString(16),2)+pad(this.flags(16),2)+';';
    }

    RQNPN(index){
        var par = this.params();
        //console.log('RQNPN :'+par[index]);
        return this.header+'9B'+pad(this.nodeId.toString(16),4)+pad(index.toString(16),2)+pad(par[index].toString(16),2)+';';
    }

    ASON(event){
        return this.header+'90'+pad(this.nodeId.toString(16),4)+pad(event.toString(16),4)+';';
    }

    ASOF(event){
        return this.header+'91'+pad(this.nodeId.toString(16),4)+pad(event.toString(16),4)+';';
    }
}
