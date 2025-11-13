import React from "react";

type CheckIconProps = {
  size?: number | string;
  color?: string;
  strokeWidth?: number;
  className?: string;
} & React.SVGProps<SVGSVGElement>;

const CheckIcon: React.FC<CheckIconProps> = ({
  size = 24,
  color = "#2f7ff7",
  strokeWidth = 2.4,
  className,
  ...rest
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...rest}
    >
      <path d="M5 13.5 L10 18 L19 7" />
    </svg>
  );
};

export default CheckIcon;
