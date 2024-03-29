// App.js

import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Top from "./pages/Top";
import Upload from "./pages/Upload";
import Recommend from "./pages/Recommend";
import History from "./pages/History";
import Howtouse from "./pages/Howtouse";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // 追加: ロード中かどうかを示すstate

  // 初回レンダリング時に認証情報を取得
  useEffect(() => {
    fetchAuthenticatedStatus();
  }, []);

  // バックエンドから認証情報を取得する関数
  const fetchAuthenticatedStatus = async () => {
    try {
      const response = await fetch("/api/authenticate", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setIsAuthenticated(data.isAuthenticated);
        setLoading(false); // ロード完了を示す
      } else {
        setLoading(false);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error fetching authentication status:", error);
      setLoading(false); // エラー時もロード完了を示す
      setIsAuthenticated(false);
    }
  };

  // ログアウト処理（トークンの削除）
  const handleLogout = () => {
    const confirmLogout = window.confirm("ログアウトしますか？");

    if (confirmLogout) {
      setIsAuthenticated(false);
      localStorage.removeItem("token");
      window.alert("ログアウト完了しました。");

      // Topページを再読み込み
      window.location.href = "/";
    }
    // キャンセルの場合は何もしない
  };

  // ログイン成功時に認証情報を更新
  const handleLoginSuccess = () => {
    fetchAuthenticatedStatus();
  };

  const PrivateRoute = ({ path, element }) => {
    if (loading) {
      return null; // ロード中は何も描画しない
    }
    return isAuthenticated ? element : <Navigate to="/Login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* 認証が必要なページ */}
        <Route
          path="/Upload"
          element={
            <PrivateRoute
              path="/Upload"
              element={<Upload onLogout={handleLogout} />}
            />
          }
        />
        <Route
          path="/Recommend"
          element={<PrivateRoute path="/Recommend" element={<Recommend />} />}
        />
        <Route
          path="/History"
          element={
            <PrivateRoute
              path="/History"
              element={<History onLogout={handleLogout} />}
            />
          }
        />
        {/* 認証が不要なページ */}
        <Route path="/" element={<Top onLogout={handleLogout} />} />
        <Route
          path="/Howtouse"
          element={<Howtouse onLogout={handleLogout} />}
        />
        {/* ログイン・サインアップページ */}
        <Route
          path="/Login"
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
