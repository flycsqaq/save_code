import React, { useState, useEffect } from 'react';
import Ellipsis from '../ellipsis/ellipsis2';
import { Tooltip } from '@material-ui/core';
const CodeHome = () => {
    const texts = [
        {
            str: '你好啊哈哈哈颠三倒四第三代是否是否凡是凡事都是的的的',
            lines: 2
        },
        {
            str: 'odjskddsndjadfbfjas1323!*()dsjdsk_:dsdsdsdsdsdsd',
            lines: 2
        },
    ];

    const [demo, setDemo] = useState(texts[0]);

    const addLines = () => {
        setDemo({ ...demo, lines: demo.lines + 1 });
    };

    const cutLines = () => {
        setDemo({ ...demo, lines: demo.lines - 1 });
    };

    const changeStr = () => {
        setDemo(texts[1]);
    };

    useEffect(() => {
        console.log(demo);
    }, [demo]);
    return (
        <div
            style={{
                width: 100,
                padding: 10,
            }}
        >
            <Ellipsis text={demo.str} lines={demo.lines} />
            123
            <button onClick={() => addLines()}>+</button>
            <button onClick={() => cutLines()}>-</button>
            <button onClick={() => changeStr()}>changeStr</button>
        </div>
    );
};

export default CodeHome;
