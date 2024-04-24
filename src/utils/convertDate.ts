const formatDate = (date: Date) => {
    let month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        year = date.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

const getRemainingDays = (endDateString: string): number => {
    const endDate = new Date(endDateString);
    const today = new Date();

    const timeDiff = endDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
}

const calculateTimeDifference = (createdAt: Date): string => {
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - createdAt.getTime();
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
        return `${years}년 전`;
    } else if (months > 0) {
        return `${months}달 전`;
    } else if (days > 0) {
        return `${days}일 전`;
    } else if (hours > 0) {
        return `${hours}시간 전`;
    } else if (minutes > 0) {
        return `${minutes}분 전`;
    } else {
        return `방금`;
    }
}

export {formatDate, getRemainingDays, calculateTimeDifference};