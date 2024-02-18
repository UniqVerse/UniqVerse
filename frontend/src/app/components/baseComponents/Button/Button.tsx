import React from 'react'; // Make sure to import React when using TypeScript
import styles from './Button.module.css';

export type ButtonType = "primary" | "outlined";

// Add `children` to the component props
export function Button({
    type, 
    onClick, 
    children // Use children for passing content
}: { 
    type: ButtonType, 
    onClick?: () => void, 
    children?: React.ReactNode // Add children as an optional prop
}) {
    const staticClassName = `${styles.generalButton} ${styles[`${type}-static`]}`;
    const hoverClassName = styles[`${type}-hover`];
    const clickClassName = styles[`${type}-click`];

    const classNames = `${staticClassName} ${hoverClassName} ${clickClassName}`;

    const textColor = type === 'primary' ? 'black' : type === 'outlined' ? 'white' : 'inherit';

    return (
        // Use children here to render the button's content
        <button className={classNames} style={{ color: textColor }} onClick={onClick}>
            {children}
        </button>
    );
}