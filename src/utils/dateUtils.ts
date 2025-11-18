export const formatDate = (isoString: string): string => {
  const utcString = isoString.endsWith('Z') ? isoString : `${isoString}Z`;
  const date = new Date(utcString);
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  const [year, month, day] = date
    .toLocaleDateString('ko-KR', options)
    .split('. ');
  return `${year}. ${month}. ${day}`;
};

export const formatTimeAgo = (isoString: string): string => {
  const utcString = isoString.endsWith('Z') ? isoString : `${isoString}Z`;
  const now = new Date();
  const createdAt = new Date(utcString);

  const kstNow = new Date(
    now.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }),
  );
  const kstCreatedAt = new Date(
    createdAt.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }),
  );

  const diffInMinutes = Math.floor(
    (kstNow.getTime() - kstCreatedAt.getTime()) / (1000 * 60),
  );

  if (diffInMinutes < 1) return '방금 전';
  if (diffInMinutes < 60) return `${diffInMinutes}분 전`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}시간 전`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays}일 전`;

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths}개월 전`;

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears}년 전`;
};
