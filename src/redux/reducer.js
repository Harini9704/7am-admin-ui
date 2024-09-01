export const reducer=(state,action)=>{
    console.log("prev stage",state)
    console.log("action",action)
    switch (action.type) {
        case 'LOGIN':
            state = {
                ...state,
                isLoggedIn:action.payload
            }
    }
    console.log("new state",state)
    return state
}