// vue.config.js
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CompressionWebpackPlugin = require("compression-webpack-plugin");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const zopfli = require("@gfx/zopfli");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const BrotliPlugin = require("brotli-webpack-plugin");
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

module.exports = {
    // 生产时不显示lint错误
    lintOnSave: process.env.NODE_ENV !== 'production',
    // 如果打包不是根路径的话需要设置
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
    // 是否使用包含运行时编译器的 Vue 构建版本
    runtimeCompiler: true,
    // 生产环境的 source map
    productionSourceMap: !IS_PROD,
    // 是否为 Babel 或 TypeScript 使用 thread-loader
    parallel: require("os").cpus().length > 1,
    chainWebpack: config => {
        // 打包分析
        if (IS_PROD) {
            config.plugin("webpack-report").use(BundleAnalyzerPlugin, [
                {
                    analyzerMode: "static"
                }
            ]);
        }
    },
    configureWebpack: config => {
        const plugins = [];
        config.performance ={
            hints: 'warning',
            //入口起点的最大体积 整数类型（以字节为单位）
            maxEntrypointSize: 50000000,
            //生成文件的最大体积 整数类型（以字节为单位 300k）
            maxAssetSize: 30000000,
            //只给出 js 文件的性能提示
            assetFilter: function (assetFilename) {
                return assetFilename.endsWith('.js');
            },
        }
        if (IS_PROD) {
            plugins.push(
                new CompressionWebpackPlugin({
                    algorithm(input, compressionOptions, callback) {
                        return zopfli.gzip(input, compressionOptions, callback);
                    },
                    compressionOptions: {
                        numiterations: 15
                    },
                    minRatio: 0.99,
                    test: productionGzipExtensions
                })
            );
            plugins.push(
                new BrotliPlugin({
                    test: productionGzipExtensions,
                    minRatio: 0.99
                })
            );

        }
        config.plugins = [...config.plugins, ...plugins];
    }
}

