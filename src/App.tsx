import ScrollInitializer from '@/components/ScrollInitializer';
import Modal from '@/components/Modal';
import BottomSheet from '@/components/BottomSheet';
import EventHandler from '@/components/EventHandler';
import PreviousPathTracker from '@/components/PreviousPathTracker';
import AppRoutes from '@/routes';

function App() {
  return (
    <>
      <ScrollInitializer />
      <PreviousPathTracker />
      <AppRoutes />
      <EventHandler />
      <Modal />
      <BottomSheet />
    </>
  );
}

export default App;
