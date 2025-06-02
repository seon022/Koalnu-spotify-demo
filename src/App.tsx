import React, { Suspense } from "react";
import "./App.css";
import { Routes, Route } from "react-router";
import LoadingSpinner from "./common/components/Loading/LoadingSpinner";

const AppLayout = React.lazy(() => import("./layout/AppLayout"));
const HomePage = React.lazy(() => import("./pages/HomePage/HomePage"));
const SearchPage = React.lazy(() => import("./pages/SearchPage/SearchPage"));
const SearchWithKeywordPage = React.lazy(
	() => import("./pages/SearchWithKeywordPage/SearchWithKeywordPage")
);
const PlaylistDetailPage = React.lazy(
	() => import("./pages/PlaylistDetailPage/PlaylistDetailPage")
);
const PlaylistPage = React.lazy(
	() => import("./pages/PlaylistPage/PlaylistPage")
);

// 필요한 페이지 생각해보기!
// 0. 사이드바 (플레이리스트, 메뉴 보여주는 사이드바)
// 1. 홈페이지		/
// 2. 검색페이지	/search
// 3. 검색결과 페이지 	/search/:keyword
// (로그인은 스포티파이에서 제공)
// 4. 플레이리스트 디테일 페이지 	/playlist/:id
// 5. (모바일버전) 플레이리스트 보여주는 페이지		/playlist

// lazyLoading
// 큰 웹사이트의 경우 모든페이지를 다 로딩하면 부담
// 페이지를 부르는 순간에 자바스크립트 들고오도록 하는거.
// 번들사이즈가 감소되고 다운로드 속도 빨라져서 초기로딩속도 빨라짐
// 단점 - 페이지 이동 시 늦게 로딩될 수 있음. 이때 로딩처리필요
// Suspense 아래에 있는 라우터들에 대해서 비동기 상태 관리 - 로딩 보여줌

function App() {
	return (
		<Suspense fallback={<LoadingSpinner />}>
			<Routes>
				<Route path="/" element={<AppLayout />}>
					<Route index element={<HomePage />} />
					<Route path="search" element={<SearchPage />} />
					<Route path="search/:keyword" element={<SearchWithKeywordPage />} />
					<Route path="playlist/:id" element={<PlaylistDetailPage />} />
					<Route path="playlist" element={<PlaylistPage />} />
				</Route>
			</Routes>
		</Suspense>
	);
}

export default App;
