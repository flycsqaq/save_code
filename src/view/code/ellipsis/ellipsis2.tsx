import React, { useEffect, useRef, useState, Dispatch, Fragment } from 'react';

interface Props {
    text: string;
    lines: number;
    suffix?: string;
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

export default ({ text = '', lines = 1, suffix = '...' }: Props) => {
    const [realLines, setRealLines]: [number, Dispatch<number>] = useState(lines > 0 ? lines : 0);
    const [lineHeight, setLineHeight]: [number, Dispatch<number>] = useState(20);

    const rootRef = useRef<HTMLDivElement>(null);
    const rootHeight = realLines * lineHeight;

    const [displayStr, setDisplayStr]: [string, Dispatch<string>] = useState('');

    const shadowRef = useRef<HTMLDivElement>(null);
    const [shadowStr, setShadowStr]: [string, Dispatch<string>] = useState('');
    const [stepSize, setStepSize]: [number, Dispatch<number>] = useState(0);

    const [status, setStatus]: [STATUS_TYPE, Dispatch<STATUS_TYPE>] = useState(STATUS_TYPE.START as STATUS_TYPE);

    useEffect(() => {
        if (status !== STATUS_TYPE.START) {
            setStatus(STATUS_TYPE.START);
        }
    }, [text, lines]);

    /**
     * 数据初始化
     *
     */
    const handleStart = () => {
        const realLine = lines > 0 ? lines : 0;
        if (realLine === 0) {
            setShadowStr('');
            setStatus(STATUS_TYPE.END);
        } else {
            setLineHeight(parseInt(getComputedStyle(rootRef.current as HTMLDivElement).lineHeight as string, 10));
            setRealLines(realLine);
            setStepSize(0);
            setShadowStr(text);
            setStatus(STATUS_TYPE.MATCH);
        }
    };

    /**
     * 字符串高度对比
     *
     */
    const handleMatch = () => {
        const matchHeight: number = (shadowRef.current as HTMLDivElement).offsetHeight;
        if (matchHeight <= rootHeight) {
            setRealLines(Math.ceil(matchHeight / lineHeight));
            setStatus(STATUS_TYPE.END);
        } else {
            const nextStr = `${text}${suffix}`;
            setShadowStr(nextStr);
            setStepSize(nextStr.length);
            setStatus(STATUS_TYPE.CUT);
        }
    };

    /**
     * 二分法裁剪字符串
     *
     */
    const handleCut = () => {
        const cutHeight: number = (shadowRef.current as HTMLDivElement).offsetHeight;
        if (stepSize <= 1 && cutHeight <= rootHeight) {
            setStatus(STATUS_TYPE.END);
        } else {
            const nextSize: number = Math.ceil(stepSize / 2);
            setStepSize(nextSize);
            const nextLength: number = cutHeight <= rootHeight
                ? shadowStr.length + nextSize
                : shadowStr.length - nextSize;
            const nextStr = `${text.substring(0, nextLength - suffix.length)}${suffix}`;
            if (nextStr === shadowStr) {
                setStatus(STATUS_TYPE.END);
            } else {
                setShadowStr(nextStr);
            }
        }
    };

    /**
     * 展示字符串
     *
     */
    const handleEnd = () => {
        setDisplayStr(shadowStr);
    };

    const statusFns: StatusFn = {
        [STATUS_TYPE.START]: handleStart,
        [STATUS_TYPE.MATCH]: handleMatch,
        [STATUS_TYPE.CUT]: handleCut,
        [STATUS_TYPE.END]: handleEnd
    };

    useEffect(statusFns[status], [status, shadowStr]);

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

// interface EllipsisTooltipProps extends Props {
//     Tooltip?: any; // 怎么定义
// }

// // 添加tooltip
// export default ({ text = '', lines = 1, Tooltip }: EllipsisTooltipProps) => {
//     if (Tooltip) {
//         return (
//             <Tooltip title={text}>
//                 <Ellipsis text={text} lines={lines} />
//             </Tooltip>
//         );
//     }
//     return (
//         <Ellipsis text={text} lines={lines} />
//     );
// };