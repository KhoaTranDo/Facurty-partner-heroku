const rawdata=(state={},action)=>{
    switch (action.type) {
        case 'NEW':
            return state+1;
        case 'Updata':
            return state-1;
        default:
            return state;
    }
}
export default rawdata;