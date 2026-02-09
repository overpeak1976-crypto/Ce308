module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            ["babal-preset-expo", {jsxImportSource: "nativewind"}],
            "nativewind/babel",
        ]
    }
}