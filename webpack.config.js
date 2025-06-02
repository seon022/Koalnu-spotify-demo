const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env, argv) => {
	const isProduction = argv.mode === "production";

	return {
		mode: isProduction ? "production" : "development",
		entry: path.resolve(__dirname, "src", "index.tsx"), // 프로젝트가 시작되는 파일을 지정
		resolve: {
			extensions: [".tsx", ".ts", ".js"],
		},
		module: {
			rules: [
				{
					test: /\.css$/i, // .css로 끝나는 파일 전체
					use: ["style-loader", "css-loader"], // CSS파일 처리
				},
				{
					test: /\.svg$/,
					use: [
						{
							loader: "@svgr/webpack",
							options: {
								icon: true,
							},
						},
						{
							loader: "file-loader",
							options: {
								name: "[name].[ext]?ver=[hash]",
								outputPath: "images",
							},
						},
					],
				},
				{
					test: /\.(png|jpg|gif|jpeg)$/,
					use: [
						{
							loader: "file-loader",
							options: {
								name: "[name].[ext]?ver=[hash]", // 이미지파일을 번들링하고 빌드된 파일에 해시값넣어서 캐싱할 수 있게
								outputPath: "images",
							},
						},
					],
				},
				{
					test: /\.(ts|js)x?$/,
					exclude: /node_modules/,
					use: [
						{
							loader: "babel-loader",
						},
					],
				},
			],
		},
		output: {
			// 번들링된 파일이 저장될 위치와 이름을 지정
			path: path.resolve(__dirname, "dist"),
			chunkFilename: "[name].js?ver=[hash]",
			filename: "[name].js?ver=[hash]",
			publicPath: "/",
		},
		devtool: isProduction ? "source-map" : "inline-source-map", // 어떤식으로 sourcemap할지
		devServer: {
			port: 3000,
			open: true,
			hot: true,
			historyApiFallback: true,
		},
		optimization: {
			minimize: isProduction,
		},
		plugins: [
			// 빌드 프로세스를 도와주는 플러그인
			new CleanWebpackPlugin(), // 이전 빌드 파일을 삭제

			new HtmlWebpackPlugin({
				// HTML파일을 생성하고, 번들링된 자바스크립트를 자동으로 포함
				template: path.resolve(__dirname, "src", "index.html"),
			}),
			new Dotenv({
				// 환경변수 파일을 로드
				allowEmptyValues: true,
				systemvars: true,
			}),
		],
	};
};
