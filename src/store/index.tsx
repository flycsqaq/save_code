import React from 'react';

import { Container } from 'unstated-next';

interface Props {
    children: JSX.Element;
}

const container: Container<any>[] = [];

const ProviderContainer = (props: Props) => {
    return container.reduce(
        (children, Container) => (
            <Container.Provider>{children}</Container.Provider>
        ),
        props.children
    );
};

export default ProviderContainer;