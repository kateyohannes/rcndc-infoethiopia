'use strict';

const wrapper = async (promise)=>{
    try{
        return [null, await promise]
    }catch(err){
        return [err]
    }   
}

module.exports = wrapper