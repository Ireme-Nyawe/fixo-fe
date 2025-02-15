
import { formatDistanceToNow } from 'date-fns';

export const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    };
    const formattedDate = date.toLocaleDateString('en-US', options);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${formattedDate} at ${hours}h:${minutes}`;
};


export const formatDateToCustomString = (dateInput: any) => {
    const date = new Date(dateInput);

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    const formattedMinute = minute < 10 ? `0${minute}` : minute;

    const getDaySuffix = (day: any) => {
        if (day > 3 && day < 21) return `${day}th`;
        switch (day % 10) {
            case 1: return `${day}st`;
            case 2: return `${day}nd`;
            case 3: return `${day}rd`;
            default: return `${day}th`;
        }
    };

    return `${getDaySuffix(day)} ${month} ${year} at ${formattedHour}:${formattedMinute} ${period}`;
}

export const getGreeting = (name: any) => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
        return `Good morning, ${name}!`;
    } else if (currentHour < 18) {
        return `Good afternoon, ${name}!`;
    } else {
        return `Good evening, ${name}!`;
    }
};

/**
 * Formats a given date into a human-readable relative time format.
 * @param {string | Date} timestamp - The timestamp to format.
 * @returns {string} - The formatted relative time (e.g., "2 hours ago").
 */
export const formatRelativeTime = (timestamp: string | Date): string => {
    if (!timestamp) return 'Just now';

    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
};


export const formatMessageTime = (timestamp: any) => {
    const now: any = new Date();
    const messageDate: any = new Date(timestamp);
    const diffInSeconds = Math.floor((now - messageDate) / 1000);

    if (diffInSeconds < 60) {
        return `${diffInSeconds} sec${diffInSeconds > 1 ? 's' : ''} ago`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes} min${diffInMinutes > 1 ? 's' : ''} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
        return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }

    return messageDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: messageDate.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
};  