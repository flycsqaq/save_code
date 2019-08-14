import React, { Dispatch, useState, Fragment } from 'react';
import { Fab } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { RADIUS, ANGLE, SEMICIRCLEANGLE } from '@constant/layout';
import router from '@router/index';
import {
    StaggeredMotion,
    spring,
    PlainStyle
} from 'react-motion';

import { Link } from 'react-router-dom';


interface Props {
    children: JSX.Element;
    location?: {
        pathname: string;
    };
}

interface FabConstant extends PlainStyle {
    r: number;
}

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        root: {
            position: 'relative'
        },
        items: {
            position: 'absolute',
            left: 0,
            top: 0
        },
        indexFab: {
            zIndex: 10
        },
        fab: {
            position: 'absolute'
        }
    });
});

const angleItem = Math.PI / (router.length - 1) / (SEMICIRCLEANGLE / ANGLE);
const Layout = ({ children, location }: Props) => {
    const active = location && location.pathname.split('/')[1];
    const [checked, setChecked]: [boolean, Dispatch<boolean>] = useState(false as boolean);
    const classes = useStyles();
    const radius = checked ? RADIUS : 0;
    const initStyles: FabConstant[] = router.map(_ => ({ r: 0 }));
    return (
        <Fragment>
            <div
                className={classes.root}
            >
                <Fab
                    color={checked ? 'secondary' : 'primary'}
                    className={classes.indexFab}
                    onClick={() => setChecked(!checked)}
                >
                    {checked ? 'choice' : active}
                </Fab>
                <StaggeredMotion
                    defaultStyles={initStyles}
                    styles={(pre: PlainStyle[] | undefined) => {
                        if (!pre) return [];
                        return pre.map((_: any, i: number) => {
                            return i === 0
                                ? { r: spring(radius) }
                                : { r: spring(pre[i - 1].r) };
                        });
                    }}
                >
                    {(pre: FabConstant[]) => (
                        <span className={classes.items}>
                            {pre.map((p: FabConstant, i: number) => (
                                <Link to={router[i].base} key={router[i].key}>
                                    <Fab
                                        color={router[i].name === active ? 'primary' : 'secondary'}
                                        className={classes.fab}
                                        style={{
                                            left: p.r * Math.cos(angleItem * i),
                                            top: p.r * Math.sin(angleItem * i),
                                            opacity: p.r / RADIUS
                                        }}
                                        size={router[i].name === active ? 'large' : 'medium'}
                                    >
                                        {router[i].name}
                                    </Fab>
                                </Link>
                            ))}
                        </span>
                    )}
                </StaggeredMotion>
            </div>
            {children}
        </Fragment>
    );
};

export default Layout;
