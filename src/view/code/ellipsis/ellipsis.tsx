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
    [key in STATUS_TYPE]: () => void;
};

// 很难维护，应该怎么办
// 不应该由hooks来控制。将状态变化与字符串高度对比拆分逻辑
export default ({ text = '', lines = 1 }: Props) => {
    const rootRef = useRef<HTMLInputElement>(null);
    const [rootHeight, setRootHeight]: [number, Dispatch<number>] = useState(20 * lines);
    const [displayStr, setDisplayStr]: [string, Dispatch<string>] = useState('');

    const shadowRef = useRef<HTMLInputElement>(null);
    const [shadowStr, setShadowStr]: [string, Dispatch<string>] = useState('');
    const [bisectionSteps, setBisectionSteps]: [number[], Dispatch<number[]>] = useState([0]);

    const [status, setStatus]: [STATUS_TYPE, Dispatch<STATUS_TYPE>] = useState(STATUS_TYPE.START as STATUS_TYPE);

    const statusFn: StatusFn = {
        [STATUS_TYPE.START]: () => {
            if (lines <= 0) {
                setShadowStr('');
                setRootHeight(0);
                setStatus(STATUS_TYPE.END);
                return;
            }
            const rootDom = rootRef.current as HTMLInputElement;
            const line = getComputedStyle(rootDom).lineHeight;
            const lineHeight = line === null ? 20 : parseInt(line, 10);
            setRootHeight(lineHeight * lines);
            setShadowStr(text);
            setBisectionSteps([0]);
            setStatus(STATUS_TYPE.MATCH);
        },
        [STATUS_TYPE.MATCH]: () => {
            const matchDom = shadowRef.current as HTMLInputElement;
            const matchHeight: number = matchDom.offsetHeight;
            if (matchHeight <= rootHeight) {
                setStatus(STATUS_TYPE.END);
                setRootHeight(matchHeight);
            } else {
                setBisectionSteps([...bisectionSteps, `${shadowStr}...`.length]);
                setShadowStr(`${text}...`);
                setStatus(STATUS_TYPE.CUT);
            }
        },
        [STATUS_TYPE.CUT]: () => {
            const cutDom = shadowRef.current as HTMLInputElement;
            const cutHeight: number = cutDom.offsetHeight;
            const stepSize: number = Math.abs(bisectionSteps[bisectionSteps.length - 2] - bisectionSteps[bisectionSteps.length - 1]);
            if (stepSize === 1 && cutHeight <= rootHeight) {
                setStatus(STATUS_TYPE.END);
            } else {
                const nextStep: number = cutHeight <= rootHeight
                    ? bisectionSteps[bisectionSteps.length - 1] + Math.ceil(stepSize / 2)
                    : bisectionSteps[bisectionSteps.length - 1] - Math.ceil(stepSize / 2);
                setBisectionSteps([...bisectionSteps, nextStep]);
                const nextStr = `${text.substring(0, nextStep - 3)}...`;
                if (nextStr === shadowStr) {
                    setStatus(STATUS_TYPE.END);
                } else {
                    setShadowStr(nextStr);
                }
            }
        },
        [STATUS_TYPE.END]: () => {
            setDisplayStr(shadowStr);
        },
    };

    useEffect(statusFn[status], [status, shadowStr]);

    useEffect(() => {
        if (status !== STATUS_TYPE.START) {
            setStatus(STATUS_TYPE.START);
        }
    }, [text, lines]);

    return (
        <div
            ref={rootRef}
            style={{
                position: 'relative',
                height: rootHeight
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    wordBreak: 'break-all',
                }}
            >
                {displayStr}
            </div>
            <div
                style={{
                    position: 'absolute',
                    visibility: 'hidden',
                    wordBreak: 'break-all',
                }}
                ref={shadowRef}
            >
                {shadowStr}
            </div>
        </div>
    );
};