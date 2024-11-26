import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const RequestsTable = () => {
	const [requests, setRequests] = useState([]);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [sortField, setSortField] = useState('createdAt');
	const [sortOrder, setSortOrder] = useState('desc');
	const navigate = useNavigate();

	const fetchRequests = useCallback(async () => {
		try {
			setLoading(true);

			const params = new URLSearchParams({
				page: currentPage,
				query: search,
				sortField,
				sortOrder,
			}).toString();

			const response = await fetch(`/requests?${params}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			});

			if (!response.ok) {
				throw new Error('Ошибка загрузки заявок');
			}

			const data = await response.json();
			const { requests, totalPages } = data;
			setRequests(requests || []);
			setTotalPages(totalPages || 1);
		} catch (error) {
			console.error('Ошибка загрузки заявок:', error.message);
		} finally {
			setLoading(false);
		}
	}, [currentPage, search, sortField, sortOrder]);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!token) {
			navigate('/login');
		} else {
			fetchRequests();
		}
	}, [currentPage, search, sortField, sortOrder, fetchRequests, navigate]);

	const handleLogout = () => {
		localStorage.removeItem('token');
		navigate('/login');
	};

	return {
		requests,
		loading,
		search,
		setSearch,
		currentPage,
		setCurrentPage,
		totalPages,
		sortField,
		setSortField,
		sortOrder,
		setSortOrder,
		handleLogout,
	};
};
