import { useState } from 'react';
import * as Yup from 'yup';

const formValidationSchema = Yup.object({
	name: Yup.string().min(3, 'Минимум 3 символа').required('Обязательное поле!'),
	phone: Yup.string()
		.matches(/^\+7-\d{3}-\d{3}-\d{2}-\d{2}$/, 'Некорректный номер!')
		.required('Обязательное поле!'),
	description: Yup.string().max(500, 'Не более 500 символов'),
});

export const Form = () => {
	const initialValues = {
		name: '',
		phone: '',
		description: '',
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

	const validate = async () => {
		try {
			await formValidationSchema.validate(formValues, { abortEarly: false });
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
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const isValid = await validate();

		if (isValid) {
			setIsSubmitting(true);
			try {
				const response = await fetch('/', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(formValues),
				});

				if (!response.ok) {
					throw new Error('Ошибка при отправке заявки');
				}

				alert('Заявка успешно отправлена!');
				setFormValues({
					name: '',
					phone: '',
					description: '',
				});
			} catch (error) {
				alert(error.message || 'Ошибка при отправке заявки');
			} finally {
				setIsSubmitting(false);
			}
		}
	};

	return {
		formValues,
		errors,
		isSubmitting,
		handleChange,
		handleSubmit,
	};
};
