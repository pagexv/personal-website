export const typeWriter = (element, text, delay = 50) => {
    if (!element.dataset.typed) {
      element.dataset.typed = true;
      let i = 0;
      const type = () => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(type, delay);
        }
      };
      type();
    }
  };
  