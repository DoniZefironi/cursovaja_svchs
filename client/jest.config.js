module.exports = {
    transform: {
        '^.+\\.jsx?$': 'babel-jest', // Обработка файлов .js и .jsx с помощью babel-jest
    },
    moduleNameMapper: {
        '\\.(css|less|scss)$': 'identity-obj-proxy', // Мокаем стили
        '^axios$': 'axios/dist/node/axios.cjs' // Для правильной работы axios
    },
    testEnvironment: 'jsdom', // Используем jsdom для тестирования React
    transformIgnorePatterns: [
        '/node_modules/(?!axios)' // Позволяет Jest обрабатывать axios
    ],
};