import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from '../components/AppLayout'
import { MeetingDetailPage } from '../pages/MeetingDetailPage'
import { MyCallsPage } from '../pages/MyCallsPage'
import { PlaceholderPage } from '../pages/PlaceholderPage'
import { SearchPage } from '../pages/SearchPage'
import { AskFathomPage } from '../pages/AskFathomPage'

function withLayout(element) {
  return <AppLayout>{element}</AppLayout>
}

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/calls" replace /> },
  { path: '/calls', element: withLayout(<MyCallsPage />) },
  { path: '/calls/:meetingId', element: withLayout(<MeetingDetailPage />) },
  { path: '/search', element: withLayout(<SearchPage />) },
  { path: '/ask', element: withLayout(<AskFathomPage />) },
  { path: '/highlights', element: withLayout(<PlaceholderPage />) },
  { path: '/action-items', element: withLayout(<PlaceholderPage />) },
  { path: '/calendar', element: withLayout(<PlaceholderPage />) },
  { path: '/settings', element: withLayout(<PlaceholderPage />) },
  { path: '*', element: <Navigate to="/calls" replace /> },
])
