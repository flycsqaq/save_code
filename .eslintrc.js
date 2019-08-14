module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint-config-alloy/typescript"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "typescript"
    ],
    "rules": {
        indent: ["error", 4, { SwitchCase: 1 }]
    }
};