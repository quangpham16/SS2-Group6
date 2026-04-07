export const formatFileSize = (sizeInBytes) => {
  const numericSize = Number(sizeInBytes);

  if (!Number.isFinite(numericSize) || numericSize <= 0) {
    return '0 KB';
  }

  if (numericSize < 1024 * 1024) {
    return `${Math.max(numericSize / 1024, 0.1).toFixed(1)} KB`;
  }

  return `${(numericSize / (1024 * 1024)).toFixed(2)} MB`;
};

export const formatUploadedAt = (value) => {
  if (!value) {
    return 'just now';
  }

  const normalizedDate =
    value instanceof Date ? value : new Date(value);

  if (Number.isNaN(normalizedDate.getTime())) {
    return 'just now';
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(normalizedDate);
};
