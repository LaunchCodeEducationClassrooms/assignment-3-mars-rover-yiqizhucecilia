class Rover {
   // Write code here!
 constructor(position){
      this.position=position;
      this.mode="Normal";
      this.generatorWatts=110;
  }
    receiveMessage(message){
    let results=[];

    for (let i=0; i<message.commands.length;i++){
      if (message.commands[i].commendType='STATUS_CHECK'){
        results.push({completed: true,
        roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position:this.position}})
      
      }else if (message.commands[i].commendType="MODE_CHANGE"){
      this.mode=message.commands[i].value;
      results.push({completed:true})
      
      }else if (message.commands[i].commendType="MOVE"){
      if(this.mode=="LOW_POWER"){
        results.push({completed:false})
        
        }else if (this.mode=="Normal"){
          this.position=message.commands[i].value;
          results.push({completed:true})
        }
    }
    }
return{
  message:message.name,
  results:results
}

   // Write code here!
}
}

module.exports = Rover;