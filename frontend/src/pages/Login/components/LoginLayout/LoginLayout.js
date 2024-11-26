import React from 'react';
import { Login } from '../../Login';
import styles from './login-layout.module.css';

export const LoginLayout = () => {
	const { formValues, errors, isSubmitting, handleChange, handleSubmit } = Login();

	return (
		<div className={styles['login-container']}>
			<h1>Вход</h1>
			<form onSubmit={handleSubmit} className={styles['login-form']}>
				<div className={styles['login-group']}>
					<label htmlFor="email">Email</label>
					<input
						id="email"
						name="email"
						type="email"
						placeholder="Введите ваш email"
						value={formValues.email}
						onChange={handleChange}
						className={errors.email ? styles.error : ''}
					/>
					{errors.email && (
						<div className={styles['error-message']}>{errors.email}</div>
					)}

					<label htmlFor="password">Пароль</label>
					<input
						id="password"
						name="password"
						type="password"
						placeholder="Введите ваш пароль"
						value={formValues.password}
						onChange={handleChange}
						className={errors.password ? styles.error : ''}
					/>
					{errors.password && (
						<div className={styles['error-message']}>{errors.password}</div>
					)}
				</div>

				<button type="submit" disabled={isSubmitting}>
					{isSubmitting ? 'Вход...' : 'Войти'}
				</button>
			</form>
		</div>
	);
};
