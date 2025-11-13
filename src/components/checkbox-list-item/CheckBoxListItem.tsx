import { useState, useRef, useEffect, useCallback } from "react";
import AnimatedCheckBox, {
  type StateName,
} from "../animated-checkbox/AnimatedCheckBox";
import "./checkbox-list-item.css";

const TRANSITION_MS = 160;

const CheckBoxListItem = ({
  label,
  defaultChecked,
  onChange,
}: {
  label: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}) => {
  const [checked, setChecked] = useState(!!defaultChecked);
  const [hovered, setHovered] = useState(false);
  const [transitionState, setTransitionState] = useState<StateName | null>(
    null
  );

  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const runTransition = useCallback(
    (state: StateName, finalChecked: boolean) => {
      setTransitionState(state);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = window.setTimeout(() => {
        setTransitionState(null);
        setChecked(finalChecked);
        onChange?.(finalChecked);
      }, TRANSITION_MS);
    },
    [onChange]
  );

  /**
   * Handles the toggle event of the checkbox.
   * If the checkbox is currently checked, it triggers the "transition-unchecked" state and sets the checkbox to be unchecked.
   * If the checkbox is currently unchecked, it triggers the "transition-checked" state and sets the checkbox to be checked.
   */
  const handleToggle = () => {
    if (checked) {
      runTransition("transition-unchecked", false);
    } else {
      runTransition("transition-checked", true);
    }
  };

  /**
   * Returns the visual state of the checkbox.
   * It takes into account the transition state, hover state, and checked state.
   * The order of priority is transition state > hover state > checked state > unchecked state.
   * @returns {StateName} The visual state of the checkbox.
   */
  const visualState = (): StateName => {
    if (transitionState) return transitionState;
    if (checked) return "checked";
    if (hovered) return "hover";
    return "unchecked";
  };

  return (
    <div
      className="checkbox-list-item"
      onClick={handleToggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          handleToggle();
        }
      }}
      aria-pressed={checked}
    >
      <label className="checkbox-list-item-label">{label}</label>

      <AnimatedCheckBox
        state={visualState()}
        onClick={(e) => {
          e.stopPropagation();
          handleToggle();
        }}
        size={25}
        ariaLabel={label}
      />
    </div>
  );
};

export default CheckBoxListItem;
