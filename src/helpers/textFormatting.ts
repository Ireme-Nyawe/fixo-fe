export const truncateText = (text: string | undefined, length: number): string => {
  if (!text) return '';
  return text.length > length ? `${text.slice(0, length)}...` : text;
};


export const formatCurrency = (amount: number): string => {
  if (isNaN(amount)) return '0 RWF';
  if (amount >= 1000000) {
    const millions = (amount / 1000000).toFixed(1);
    return `${millions.replace(/\.0$/, '')}M RWF`;
  }
  if (amount >= 1000) {
    const thousands = (amount / 1000).toFixed(1);
    return `${thousands.replace(/\.0$/, '')}K RWF`;
  }
  return `${amount} RWF`;
};