
export default function withdraw(state = [], action){
    if (action.type === 'WITHDRAW'){
            console.log(action.payload);
    }
    if (action.type === 'WITHDRAW_ERR'){
        console.log(action.payload);
    }
    return state;   
}