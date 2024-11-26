import React from 'react';
import { RequestsTable } from '../../RequestsTable';
import styles from './request-table-layout.module.css';

export const RequestsTableLayout = () => {
	const {
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
	} = RequestsTable();

	return (
		<div className={styles['requests-container']}>
			<div className={styles['button-logout-container']}>
				<button className={styles['button-logout']} onClick={handleLogout}>
					Выйти
				</button>
			</div>
			<h1>Заявки</h1>
			<div className={styles['search-sort-container']}>
				<input
					type="text"
					placeholder="Поиск"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<div>
					<label>Сортировать по:</label>
					<select
						value={sortField}
						onChange={(e) => setSortField(e.target.value)}
					>
						<option value="createdAt">Дата</option>
						<option value="name">ФИО</option>
						<option value="phone">Телефон</option>
					</select>
					<button
						onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
					>
						{sortOrder === 'asc' ? 'По возрастанию' : 'По убыванию'}
					</button>
				</div>
			</div>
			{loading ? (
				<p>Загрузка...</p>
			) : (
				<table>
					<thead>
						<tr>
							<th>Дата и время</th>
							<th>ФИО</th>
							<th>Телефон</th>
							<th>Проблема</th>
						</tr>
					</thead>
					<tbody>
						{requests && requests.length > 0 ? (
							requests.map((req) => (
								<tr key={req._id}>
									<td>{new Date(req.createdAt).toLocaleString()}</td>
									<td>{req.name}</td>
									<td>{req.phone}</td>
									<td>{req.description || 'Не указано'}</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan="4">Нет заявок</td>
							</tr>
						)}
					</tbody>
				</table>
			)}
			<div className={styles['pagination-container']}>
				<button
					onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
					disabled={currentPage === 1}
				>
					Назад
				</button>
				<span>
					Страница: {currentPage} из {totalPages}
				</span>
				<button
					onClick={() =>
						setCurrentPage((prev) => Math.min(prev + 1, totalPages))
					}
					disabled={currentPage === totalPages}
				>
					Вперед
				</button>
			</div>
		</div>
	);
};
