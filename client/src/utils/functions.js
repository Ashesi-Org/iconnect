export const formatTimeAgo = (timestamp) => {
  const timeDifference = Date.now() - timestamp;
  
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} days ago`;
  if (hours > 0) return `${hours} hrs ago`;
  if (minutes > 0) return `${minutes} mins ago`;
  
  return `${seconds} secs ago`;
}




export const capitalizeInitials = (name) => {
  const words = name.split(' ');
  const capitalizedWords = words.map(word => {
    if (word.length > 0) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
    return '';
  });
  return capitalizedWords.join(' ');
};