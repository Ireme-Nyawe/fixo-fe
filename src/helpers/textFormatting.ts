export const truncateText = (text: string | undefined, length: number): string => {
    if (!text) return '';
    return text.length > length ? `${text.slice(0, length)}...` : text;
};
