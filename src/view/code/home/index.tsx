import React from 'react';
import Ellipsis from '../ellipsis';

const CodeHome = () => {
    const text = '你好啊哈哈哈颠三倒四第三代是否是否凡是凡事都是的的的';
    return (
        <div
            style={{
                width: 100,
                padding: 10,
            }}
        >
            <Ellipsis text={text} lines={4} />
            123
        </div>
    );
};

export default CodeHome;
