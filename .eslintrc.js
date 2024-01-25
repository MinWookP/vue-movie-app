module.exports = {
    env: {
        browser: true,
        node: true
    },
    extends: [
        // vue Eslint plugin에서 사용되는 eslint 문법을 권장하는 옵션, 레벨이 높아지면 엄격해짐
        // 'plugin:vue/vue3-essential', // Lv1
        'plugin:vue/vue3-strongly-recommended',  // Lv2
        // 'plugin:vue/vue3-recommended',  // Lv3 
        // js
        'eslint:recommended'
    ],
    // parserOptions: { // 코드 분석 기능 지정
    //     parser: 'babel-eslint' // 구문 분석 패키지
    // },
    rules: {
        "vue/html-closing-bracket-newline": ["error", {
            "singleline": "never",
            "multiline": "never"
        }],
        "vue/html-self-closing": ["error", {
        "html": {
            "void": "never",
            "normal": "always",
            "component": "always"
        },
        "svg": "always",
        "math": "always"
        }]
    }
}   