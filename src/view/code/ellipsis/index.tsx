import React, { useEffect, useRef, useState, Dispatch } from 'react';

interface Props {
    text: string;
    lines: number;
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
    const [lineHeight, setLineHeight]: [number, Dispatch<number>] = useState(20);
    const [str, setStr]: [string, Dispatch<string>] = useState(`${text}...`); // 二分法不断逼近
    const [showStr, setShowStr]: [string, Dispatch<string>] = useState(''); // 真正展示的字符串
    const [steps, setSteps]: [number[], Dispatch<number[]>] = useState([0, str.length]); // 记录二分法的具体步骤

    const stepsPush = (x: number) => {
        setSteps([...steps, x]);
    };

    useEffect(() => {
        const rootDom = rootRef.current as HTMLInputElement;
        const line = getComputedStyle(rootDom).lineHeight;
        const lineHeight = line === null ? 20 : parseInt(line, 10);
        setLineHeight(lineHeight);
    }, []);

    useEffect(() => {
        const totalHeightDom = heightRef.current as HTMLInputElement;
        const hiddenDom = cutRef.current as HTMLInputElement;
        const totalHeight: number = totalHeightDom.offsetHeight;
        if (totalHeight <= lineHeight * lines) {
            return setShowStr(text);
        }
        const hiddenHeight: number = hiddenDom.offsetHeight;
        // 可能会有一个字的误差
        const stepSize: number = Math.abs(steps[steps.length - 2] - steps[steps.length - 1]);
        if (stepSize === 1 && hiddenHeight <= lineHeight * lines) {
            return setShowStr(str);
        }
        const nextStep: number = hiddenHeight <= lineHeight * lines
            ? steps[steps.length - 1] + Math.ceil(stepSize / 2)
            : steps[steps.length - 1] - Math.ceil(stepSize / 2);
        stepsPush(nextStep);
        setStr(`${text.substring(0, nextStep - 3)}...`);
    }, [str]);

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
                }}
            >
                {showStr}
            </div>
            <div
                style={{
                    position: 'absolute',
                    visibility: 'hidden',
                }}
                ref={cutRef}
            >
                {str}
            </div>
            <div
                style={{
                    position: 'absolute',
                    visibility: 'hidden',
                }}
                ref={heightRef}
            >
                {text}
            </div>
        </div>
    );
};
