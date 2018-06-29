
import ContractInstance from '../utils/contract';

export const withdraw = () => dispatch => {
        ContractInstance.withdraw((err) => {
                if (err === null)
                    dispatch({type: 'WITHDRAW', payload: []})
                else dispatch({type: 'WITHDRAW_ERR', payload: err})
        });
}