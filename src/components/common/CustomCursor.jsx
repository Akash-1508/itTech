import React, { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverType, setHoverType] = useState('');
  const [isDesktop, setIsDesktop] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef(null);

  useEffect(() => {
    // Check if device is desktop
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    
    return () => {
      window.removeEventListener('resize', checkDesktop);
    };
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    
    const updateCursor = (e) => {
      // Direct update for immediate response
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const button = target.closest('button, .btn-primary, .btn-secondary, .btn-accent, a.btn-primary, a.btn-secondary, a.btn-accent, [role="button"]');
      
      if (button) {
        setIsHovering(true);
        
        if (button.classList.contains('btn-primary')) {
          setHoverType('hover-primary');
        } else if (button.classList.contains('btn-secondary')) {
          setHoverType('hover-secondary');
        } else if (button.classList.contains('btn-accent')) {
          setHoverType('hover-accent');
        } else {
          setHoverType('hover');
        }
      } else {
        setIsHovering(false);
        setHoverType('');
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
      setHoverType('');
    };

    // Add ripple/wave effect on click
    const handleClick = (e) => {
      const clickable = e.target.closest('button, .btn-primary, .btn-secondary, .btn-accent, a, [role="button"], input[type="submit"], input[type="button"]');
      
      if (clickable) {
        // Remove existing ripples
        const existingRipples = clickable.querySelectorAll('.ripple-effect');
        existingRipples.forEach(ripple => ripple.remove());
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        const rect = clickable.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Get button color for ripple
        const computedStyle = window.getComputedStyle(clickable);
        let rippleColor = 'rgba(255, 255, 255, 0.6)';
        
        if (clickable.classList.contains('btn-primary')) {
          rippleColor = 'rgba(102, 126, 234, 0.4)';
        } else if (clickable.classList.contains('btn-secondary')) {
          rippleColor = 'rgba(102, 126, 234, 0.3)';
        } else if (clickable.classList.contains('btn-accent')) {
          rippleColor = 'rgba(245, 158, 11, 0.4)';
        }
        
        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          border-radius: 50%;
          background: ${rippleColor};
          transform: translate(-50%, -50%) scale(0);
          animation: ripple-wave 0.8s ease-out;
          pointer-events: none;
          z-index: 1;
        `;
        
        // Ensure parent has relative positioning
        const originalPosition = clickable.style.position;
        const originalOverflow = clickable.style.overflow;
        
        if (getComputedStyle(clickable).position === 'static') {
          clickable.style.position = 'relative';
        }
        clickable.style.overflow = 'hidden';
        clickable.appendChild(ripple);
        
        // Trigger animation
        requestAnimationFrame(() => {
          ripple.style.transform = 'translate(-50%, -50%) scale(1)';
        });
        
        setTimeout(() => {
          ripple.remove();
          clickable.style.position = originalPosition;
          clickable.style.overflow = originalOverflow;
        }, 800);
      }
    };

    // Add ripple animation if not exists
    if (!document.getElementById('ripple-style')) {
      const style = document.createElement('style');
      style.id = 'ripple-style';
      style.textContent = `
        @keyframes ripple-wave {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(2.5);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    window.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseover', handleMouseOver, true);
    document.addEventListener('mouseout', handleMouseOut, true);
    document.addEventListener('click', handleClick, true);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseover', handleMouseOver, true);
      document.removeEventListener('mouseout', handleMouseOut, true);
      document.removeEventListener('click', handleClick, true);
    };
  }, [isDesktop, isVisible]);

  if (!isDesktop) return null;

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isHovering ? hoverType : ''} ${!isVisible ? 'opacity-0' : 'opacity-100'}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
};

export default CustomCursor;

