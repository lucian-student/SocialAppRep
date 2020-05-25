
module.exports.validateRegisterInput= (
    username,
    email,
    password,
    confirmPassword
) =>{
    const errors = {};
    if(username.trim()===''){
        errors.username = 'username is empty';
    }
    if(email.trim()===''){
        errors.email = 'email is empty';
    }else{
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if(!email.match(regEx)){
            errors.email = 'email is not vallid';
        }
    }
    if(password===''){
        errors.password = 'password is empty';
    }
    else if(password!==confirmPassword){
        errors.confirmPassword = 'password doesnt match confirmpassword';
    }

    return{
        errors,
        valid:Object.keys(errors).length<1
    };
}

module.exports.validateLoginInput=(
    username,
    password
) =>{
    const errors = {};
    if(username.trim()===''){
        errors.username = 'username is empty';
    }
    if(password===''){
        errors.password = 'password is empty';
    }
    return{
        errors,
        valid:Object.keys(errors).length<1
    };

}

module.exports.validateRequestInput=(username)=>{
    const errors ={};
    if(username.trim()===''){
        errors.username = 'username is empty';
    }

    return{
        errors,
        valid:Object.keys(errors).length<1
    };
}

module.exports.validateCreateNote=(noteName)=>{
    const errors = {};
    if(noteName.trim()===''){
        errors.noteName = 'noteName is empty'
    }

    return{
        errors,
        valid:Object.keys(errors).length<1
    };
}
