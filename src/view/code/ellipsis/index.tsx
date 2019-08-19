import React, { useEffect, useRef, useState, Dispatch } from 'react';

interface Props {
    text: string;
    lines: number;
}

enum STATUS_TYPE {
    START = 'START',
    MATCH = 'MATCH',
    CUT = 'CUT',
    END = 'END',
}

type StatusFn = {
    [key in STATUS_TYPE]: () => {};
}


/*
 * 2种情况
 * 1. text小于等于lines行: 直接渲染
 * 2. text大于lines行，二分法增减字符串长度
 * 未考虑props
 */
export default ({ text = '', lines = 1 }: Props) => {
    const rootRef = useRef<HTMLInputElement>(null);
    const heightRef = useRef<HTMLInputElement>(null); // 第一种情况
    const cutRef = useRef<HTMLInputElement>(null); // 第二种情况

    const [status, setStatus]: [string, Dispatch<string>] = useState('start')

    const [lineHeight, setLineHeight]: [number, Dispatch<number>] = useState(20);
    const [str, setStr]: [string, Dispatch<string>] = useState(`${text}...`); // 二分法不断逼近
    const [showStr, setShowStr]: [string, Dispatch<string>] = useState(''); // 真正展示的字符串
    const [steps, setSteps]: [number[], Dispatch<number[]>] = useState([0, str.length]); // 记录二分法的具体步骤
    const statusFn: any = {
        start: () => {
            const rootDom = rootRef.current as HTMLInputElement;
            const line = getComputedStyle(rootDom).lineHeight;
            const lineHeight = line === null ? 20 : parseInt(line, 10);
            setLineHeight(lineHeight);
            setStatus('step1')
        },
        step1: () => {
            const totalHeightDom = heightRef.current as HTMLInputElement;
            const totalHeight: number = totalHeightDom.offsetHeight;
            if (totalHeight <= lineHeight * lines) {
                setShowStr(text);
                setStatus('end')
            } else {
                setStatus('step2')
            }
        },
        step2: () => {
            const cutDom = cutRef.current as HTMLInputElement;

            const cutHeight: number = cutDom.offsetHeight;
            // 可能会有一个字的误差
            const stepSize: number = Math.abs(steps[steps.length - 2] - steps[steps.length - 1]);
            if (stepSize === 1 && cutHeight <= lineHeight * lines) {
                return setShowStr(str);
            }
            const nextStep: number = cutHeight <= lineHeight * lines
                ? steps[steps.length - 1] + Math.ceil(stepSize / 2)
                : steps[steps.length - 1] - Math.ceil(stepSize / 2);
            stepsPush(nextStep);
            const nextStr = `${text.substring(0, nextStep - 3)}...`
            if (nextStr === str) {
                setStatus('end')
            } else {
                setStr(nextStr);
            }
        },
        end: () => {}
    }
    const stepsPush = (x: number) => {
        setSteps([...steps, x]);
    };

    // 计算展示的字符串
    useEffect(statusFn[status], [status, str]);

    return (
        <div
            ref={rootRef}
            style={{
                position: 'relative',
                height: lineHeight * lines,
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    wordBreak: 'break-all',
                }}
            >
                {showStr}
            </div>
            <div
                style={{
                    position: 'absolute',
                    visibility: 'hidden',
                    wordBreak: 'break-all',
                }}
                ref={cutRef}
            >
                {str}
            </div>
            <div
                style={{
                    position: 'absolute',
                    visibility: 'hidden',
                    wordBreak: 'break-all',
                }}
                ref={heightRef}
            >
                {text}
            </div>
        </div>
    );
};
