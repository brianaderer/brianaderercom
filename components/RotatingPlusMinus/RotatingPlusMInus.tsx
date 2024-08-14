import React, { useState, useEffect } from 'react';

interface RotatingPlusMinusProps {
    isOpenInitial?: boolean;
    handleMenuToggle: (arg0: boolean) => void;
    isOpen: boolean;
}

const RotatingPlusMinus: React.FC<RotatingPlusMinusProps> = props => {
    const { isOpenInitial = false, handleMenuToggle, isOpen } = props;

    return (
        <div
            className="w-6 h-6 flex items-center justify-center cursor-pointer"
            onClick={() => handleMenuToggle(isOpen)}
        >
            <div className="relative">
                {/* Horizontal line */}
                <span
                    className={`block w-6 h-0.5 bg-[rgb(var(--foreground-rgb))] absolute transition-transform duration-300 select-none ${
                        isOpen ? 'rotate-45' : 'rotate-0'
                    }`}
                ></span>

                {/* Vertical line */}
                <span
                    className={`block w-6 h-0.5 bg-[rgb(var(--foreground-rgb))] absolute transition-transform duration-300 select-none ${
                        isOpen ? '-rotate-45' : 'rotate-90'
                    }`}
                ></span>
            </div>
        </div>
    );
};

export default RotatingPlusMinus;
