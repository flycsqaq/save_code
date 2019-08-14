import React, { lazy, LazyExoticComponent, Fragment } from 'react';

interface RouterType {
    path: string;
    component: LazyExoticComponent<any>;
}

interface RouterCategory {
    key: string;
    name: string;
    base: string;
    child: RouterType[];
}



const router: RouterCategory[] = [
    {
        key: 'home',
        name: 'home',
        base: '/home',
        child: [
            {
                path: '',
                component: lazy(() => import('../view/home/home'))
            }
        ]
    },
    {
        key: 'essay',
        name: 'essay',
        base: '/essay',
        child: [
            {
                path: '',
                component: lazy(() => import('../view/essay/home'))
            }
        ]
    },
    {
        key: 'tool',
        name: 'tool',
        base: '/tool',
        child: [
            {
                path: '',
                component: lazy(() => import('../view/tool/home'))
            }
        ]
    },
    {
        key: 'code',
        name: 'code',
        base: '/code',
        child: [
            {
                path: '',
                component: lazy(() => import('../view/code/home'))
            }
        ]
    },
];

export default router;