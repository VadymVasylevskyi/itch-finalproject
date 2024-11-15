export const timeAgo = (timestamp: Date | number | string) => {
	// Преобразуем timestamp в миллисекунды в зависимости от его типа
	let time: number;
	if (typeof timestamp === 'number') {
		time = timestamp;
	} else if (timestamp instanceof Date) {
		time = timestamp.getTime();
	} else if (typeof timestamp === 'string') {
		time = new Date(timestamp).getTime(); // Преобразуем строку в дату и затем в миллисекунды
	} else {
		throw new Error('Invalid timestamp format'); // Выбросим ошибку, если формат неизвестен
	}

	const now = Date.now();
	const secondsAgo = Math.floor((now - time) / 1000);

	if (secondsAgo < 60) {
		return `${secondsAgo}s ago`;
	} else if (secondsAgo < 3600) {
		const minutesAgo = Math.floor(secondsAgo / 60);
		return `${minutesAgo}m ago`;
	} else if (secondsAgo < 86400) {
		const hoursAgo = Math.floor(secondsAgo / 3600);
		return `${hoursAgo}h ago`;
	} else if (secondsAgo < 604800) {
		const daysAgo = Math.floor(secondsAgo / 86400);
		return `${daysAgo}d ago`;
	} else {
		const weeksAgo = Math.floor(secondsAgo / 604800); // 7 дней в секундах
		return `${weeksAgo}w ago`;
	}
};
