export const truncateText = (text: string | undefined, length: number): string => {
  if (!text) return '';
  return text.length > length ? `${text.slice(0, length)}...` : text;
};


export const formatCurrency = (amount: number): string => {
  if (isNaN(amount)) return '0.00 RWF';

  const roundUpTwoDecimals = (num: number) => {
    return (Math.ceil(num * 100) / 100).toFixed(2);
  };

  if (amount >= 1_000_000) {
    const millions = Math.ceil((amount / 1_000_000) * 100) / 100;
    return `${millions.toFixed(2).replace(/\.00$/, '')}M RWF`;
  }

  if (amount >= 1_000) {
    const thousands = Math.ceil((amount / 1_000) * 100) / 100;
    return `${thousands.toFixed(2).replace(/\.00$/, '')}K RWF`;
  }

  return `${roundUpTwoDecimals(amount)} RWF`;
};
