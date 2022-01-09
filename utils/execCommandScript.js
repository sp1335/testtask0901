const {exec} = require('child_process');

const execCommand = (command,callback)=>{
    exec(command,(err,stdout,stderr)=>{
        if(err){
            callback('wrong command')
        }else if(stderr){
            callback('unable to run this command', undefined)
        }else{
            callback(undefined, stdout)
        }
    })
}
module.exports = execCommand
