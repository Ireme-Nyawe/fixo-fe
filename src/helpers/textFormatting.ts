export const truncateText = (text: string | undefined): string => {
    if (!text) return '';
    return text.length > 10 ? `${text.slice(0, 10)}...` : text;
};
