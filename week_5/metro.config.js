const { getDefaultConfig } = require("expo/metro-confuig");
const { withNativewind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname)

module.exports = withNativewind(config, {input: './app/global.css'})