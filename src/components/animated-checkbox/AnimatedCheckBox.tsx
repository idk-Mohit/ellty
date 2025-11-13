import React from "react";
import CheckIcon from "../icons/CheckIcon";
import "./AnimatedCheckbox.css";

export type StateName =
  | "unchecked"
  | "hover"
  | "transition-checked"
  | "checked"
  | "transition-unchecked";

export type AnimatedCheckboxProps = {
  state: StateName;
  onClick?: (e: React.MouseEvent) => void;
  size?: number | string;
  ariaLabel?: string;
};

const AnimatedCheckBox: React.FC<AnimatedCheckboxProps> = ({
  state,
  onClick,
  size = 25,
  ariaLabel = "select",
}) => {
  const style: React.CSSProperties = {
    width: typeof size === "number" ? `${size}px` : size,
    height: typeof size === "number" ? `${size}px` : size,
  };

  const iconColor = (() => {
    switch (state) {
      case "unchecked":
        return "transparent";
      case "hover":
        return "#E3E3E3";
      case "transition-checked":
        return "#878787";
      case "checked":
        return "#FFFFFF";
      case "transition-unchecked":
        return "#878787";
      default:
        return "transparent";
    }
  })();

  return (
    <button
      type="button"
      className={`checkbox checkbox-${state}`}
      onClick={onClick}
      aria-pressed={state === "checked"}
      aria-label={ariaLabel}
      style={style}
    >
      <CheckIcon
        size={Math.max(
          12,
          (typeof size === "number" ? size : parseInt(String(size) || "25")) *
            0.7
        )}
        color={iconColor}
        strokeWidth={2}
        width={22}
        height={22}
        className="checkbox-button_tick"
      />
    </button>
  );
};

export default AnimatedCheckBox;
