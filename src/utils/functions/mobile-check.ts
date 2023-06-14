const mobileVariants = {
  Android: navigator.userAgent.match(/Android/i),
  BlackBerry: navigator.userAgent.match(/BlackBerry/i),
  iOS: navigator.userAgent.match(/iPhone|iPad|iPod/i),
  Opera: navigator.userAgent.match(/Opera Mini/i),
  Windows: navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i),
};

export const isMobile = mobileVariants.Android || mobileVariants.BlackBerry || mobileVariants.iOS || mobileVariants.Opera || mobileVariants.Windows;
