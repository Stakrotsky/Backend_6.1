import InputMask from 'react-input-mask';
import styles from './form-layout.module.css';
import { Form } from '../../Form';

export const FormLayout = () => {
	const { formValues, errors, isSubmitting, handleChange, handleSubmit } = Form();

	return (
		<div className={styles['form-container']}>
			<h1>Запись к врачу</h1>
			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles['form-group']}>
					<label htmlFor="name" className={styles.label}>
						ФИО
					</label>
					<input
						id="name"
						name="name"
						type="text"
						value={formValues.name}
						onChange={handleChange}
						placeholder="Введите ваше ФИО"
						className={`${styles.input} ${errors.name ? styles.error : ''}`}
					/>
					{errors.name && (
						<div className={styles['error-message']}>{errors.name}</div>
					)}
				</div>
				<div className={styles['form-group']}>
					<label htmlFor="phone" className={styles.label}>
						Телефон
					</label>
					<InputMask
						id="phone"
						name="phone"
						mask="+7-999-999-99-99"
						maskChar=""
						value={formValues.phone}
						onChange={handleChange}
						placeholder="+7-___-___-__-__"
						className={`${styles.input} ${errors.phone ? styles.error : ''}`}
					/>
					{errors.phone && (
						<div className={styles['error-message']}>{errors.phone}</div>
					)}
				</div>

				<div className={styles['form-group']}>
					<label htmlFor="description" className={styles.label}>
						Опишите вашу проблему
					</label>
					<textarea
						id="description"
						name="description"
						value={formValues.description}
						onChange={handleChange}
						placeholder="Опишите вашу проблему"
						className={`${styles.textarea} ${errors.description ? styles.error : ''}`}
					/>
					{errors.description && (
						<div className={styles['error-message']}>
							{errors.description}
						</div>
					)}
				</div>

				<button
					type="submit"
					disabled={isSubmitting}
					className={`${styles.button} ${isSubmitting ? styles['button-disabled'] : ''}`}
				>
					{isSubmitting ? 'Отправка...' : 'Отправить'}
				</button>
			</form>
		</div>
	);
};
