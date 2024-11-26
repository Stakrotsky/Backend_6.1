import { useState, useEffect, useCallback } from 'react';
import * as Yup from 'yup';

const loginValidationSchema = Yup.object({
	email: Yup.string().email('Некорректный email').required('Обязательное поле!'),
	password: Yup.string()
		.min(6, 'Пароль должен быть не менее 6 символов')
		.required('Обязательное поле!'),
});

export const Login = () => {
	const initialValues = {
		email: '',
		password: '',
	};

	const [formValues, setFormValues] = useState(initialValues);
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({
			...formValues,
			[name]: value,
		});
	};

	const validate = useCallback(async () => {
		try {
			await loginValidationSchema.validate(formValues, { abortEarly: false });
			setErrors({});
			return true;
		} catch (err) {
			const newErrors = err.inner.reduce((acc, curr) => {
				acc[curr.path] = curr.message;
				return acc;
			}, {});
			setErrors(newErrors);
			return false;
		}
	}, [formValues]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const isValid = await validate();

		if (isValid) {
			setIsSubmitting(true);

			try {
				const response = await fetch('/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(formValues),
				});

				if (!response.ok) {
					throw new Error('Неверный email или пароль');
				}

				const data = await response.json();
				localStorage.setItem('token', data.token);
				alert('Успешный вход!');
				window.location.href = '/requests';
			} catch (error) {
				alert(error.message || 'Ошибка при входе');
			} finally {
				setIsSubmitting(false);
			}
		}
	};

	useEffect(() => {
		if (formValues.email || formValues.password) {
			validate();
		}
	}, [formValues, validate]);

	return {
		formValues,
		errors,
		isSubmitting,
		handleChange,
		handleSubmit,
	};
};
