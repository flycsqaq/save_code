import React, { Suspense } from 'react';
import ReactDom from 'react-dom';
import { hot } from 'react-hot-loader/root';
import { Switch, HashRouter, Route, Redirect } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import './index.css';
import { createMuiTheme } from '@material-ui/core/styles';
import theme from './theme.json';

import Layout from './shared/layout';
import ProviderContainer from './store';
import router from './router';

const App: () => JSX.Element = () => (
    <ThemeProvider theme={createMuiTheme(theme)}>
        <CssBaseline />
        <ProviderContainer>
            <HashRouter>
                <Switch>
                    <Layout>
                        <Suspense fallback={<div>loading...</div>}>
                            <Switch>
                                {router.map(item => (
                                    item.child.map(route => (
                                        <Route key={`${item.key}${route.path}`} exact path={`${item.base}${route.path}`} component={route.component} />
                                    ))
                                ))}
                                <Redirect from={'**'} to={'/home'} />
                            </Switch>
                        </Suspense>
                    </Layout>
                </Switch>
            </HashRouter>
        </ProviderContainer>
    </ThemeProvider>
);

const HotApp = hot(App);

const render = () => {
    ReactDom.render(<HotApp />, document.getElementById('root'));
};

render();
