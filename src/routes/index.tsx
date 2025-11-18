import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import SearchLayout from '@/components/Layout/SearchLayout';
import SubpageLayout from '@/components/Layout/SubpageLayout';
import ProtectedRoute from '@/routes/ProtectedRoute';
import Login from '@/pages/Login';
import OAuthCallback from '@/pages/OAuthCallback';
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Magazine from '@/pages/Magazine';
import MagazineDetail from '@/pages/MagazineDetail';
import QnA from '@/pages/QnA';
import QnADetail from '@/pages/QnADetail';
import QnAPost from '@/pages/QnAPost';
import MyQnA from '@/pages/MyQnA';
import Report from '@/pages/Report';
import Quiz from '@/pages/Quiz';
import QuizPlay from '@/pages/QuizPlay';
import My from '@/pages/My';
import EditProfile from '@/pages/EditProfile';
import MagazineScrapBox from '@/pages/MagazineScrapBox';
import QuizArchive from '@/pages/QuizArchive';
import Terms from '@/pages/Terms';
import Privacy from '@/pages/Privacy';
import DeleteAccount from '@/pages/DeleteAccount';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/oauth/callback" element={<OAuthCallback />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="magazine" element={<Magazine />} />
        <Route path="qna" element={<QnA />} />
        <Route
          path="quiz"
          element={
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="/" element={<SearchLayout />}>
        <Route path="/search" element={<Search />} />
      </Route>
      <Route element={<SubpageLayout />}>
        <Route path="magazine/:magazineId" element={<MagazineDetail />} />
        <Route path="/qna/:questionId" element={<QnADetail />} />
        {/* 질문 작성 */}
        <Route
          path="/qna/post"
          element={
            <ProtectedRoute>
              <QnAPost mode="create" />
            </ProtectedRoute>
          }
        />

        {/* 질문 수정 */}
        <Route
          path="/qna/:questionId/edit"
          element={
            <ProtectedRoute>
              <QnAPost mode="edit" />
            </ProtectedRoute>
          }
        />

        {/* 답변 작성 */}
        <Route
          path="/qna/:questionId/answer"
          element={
            <ProtectedRoute>
              <QnAPost mode="create" />
            </ProtectedRoute>
          }
        />

        {/* 답변 수정 */}
        <Route
          path="/qna/:questionId/edit/answer/:answerId"
          element={
            <ProtectedRoute>
              <QnAPost mode="edit" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/qna/my"
          element={
            <ProtectedRoute>
              <MyQnA />
            </ProtectedRoute>
          }
        />
        <Route
          path="/qna/report/question/:questionId"
          element={
            <ProtectedRoute>
              <Report type="question" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/qna/report/answer/:answerId"
          element={
            <ProtectedRoute>
              <Report type="question" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz/play/:categoryId"
          element={
            <ProtectedRoute>
              <QuizPlay />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz/play/today"
          element={
            <ProtectedRoute>
              <QuizPlay />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz/play/solved"
          element={
            <ProtectedRoute>
              <QuizPlay />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my"
          element={
            <ProtectedRoute>
              <My />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my/scrap-box"
          element={
            <ProtectedRoute>
              <MagazineScrapBox />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my/quiz-archive"
          element={
            <ProtectedRoute>
              <QuizArchive />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my/delete-account"
          element={
            <ProtectedRoute>
              <DeleteAccount />
            </ProtectedRoute>
          }
        />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
