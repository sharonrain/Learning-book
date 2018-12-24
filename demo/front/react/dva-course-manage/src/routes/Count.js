import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';

const Count = ({ dispatch, count }) => {
    const onAdd = () => dispatch({ type: 'count/add' });
    const onMinus = () => dispatch({ type: 'count/minus' });
    return (
        <div>
            <h1 className="count-text">{ count }</h1>
            <Button key="add" onClick={onAdd}>+</Button>
            <Button key="minus" onClick={onMinus}>-</Button>
        </div>
    )
}

export default connect(({ count }) => ({ count }))(Count);