import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FormLayout, LoginLayout, NotFound, RequestsTableLayout } from './pages';

export const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<FormLayout />} />
				<Route path="/login" element={<LoginLayout />} />
				<Route path="/requests" element={<RequestsTableLayout />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
};
