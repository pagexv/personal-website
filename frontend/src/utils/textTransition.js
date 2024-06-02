export const textTransition = (element, originalText, duration = 4000, interval = 100) => {
    const originalLength = originalText.length;
    const steps = duration / interval;
    let currentStep = 0;
  
    const getRandomBinaryString = (length) => {
      return Array.from({ length }, () => (Math.random() > 0.5 ? '1' : '0')).join('');
    };
  
    const transitionStep = () => {
      if (currentStep < steps) {
        const progress = currentStep / steps;
        const visibleTextLength = Math.floor(progress * originalLength);
        const binaryText = getRandomBinaryString(originalLength - visibleTextLength);
        element.textContent = originalText.substring(0, visibleTextLength) + binaryText;
        currentStep++;
        setTimeout(transitionStep, interval);
      } else {
        element.textContent = originalText;
      }
    };
  
    transitionStep();
  };
  