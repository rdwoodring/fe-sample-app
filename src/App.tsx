import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import TableDemoView from './components/TableDemoView';
import HomeView from './components/HomeView';
import PolicyHoldersView from './components/PolicyHoldersView';
import YouCanDoItView from './components/YouCanDoItView';
import RedirectView from './components/RedirectView';

import Layout from './components/Layout';
import Modal from './components/Modal';
import Instructions from './components/Instructions';

import useRouteVisitePerSessionTracking from './hooks/useRouteVisitPerSessionTracking';

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useRouteVisitePerSessionTracking();
    return (
        <>
            <Layout onFooterClick={() => setIsModalOpen(true)}>
                <Routes>
                    <Route path="/" element={<HomeView />} />
                    <Route path="/table" element={<TableDemoView />} />
                    <Route path="/you-can-do-it" element={<YouCanDoItView />} />
                    <Route path="/policyholders" element={<PolicyHoldersView />} />
                    <Route path="*" element={<RedirectView />} />
                </Routes>
            </Layout>
            <Modal
                isOpen={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
                title="Sure Technical Challenge"
            >
                <Instructions />
            </Modal>
        </>
    );
}

export default App;
