import { Heart, MessageSquare, Star, User2 } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

interface MetricProps {
  value?: string | number;
  title: string;
  href?: string;
  textStyles?: string;
  isAuthor?: boolean;
  icon?: string;
  iconColor?: string;
  iconSize?: number;
  onClick?: () => void;
}

/**
 * Get the corresponding Lucide icon component based on the icon name.
 * @param {string} iconName - The name of the icon.
 * @returns {React.ReactNode | null} - The Lucide icon component or null if not found.
 */
const getIconComponent = (iconName: string) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    user: <User2 />,
    heart: <Heart />,
    star: <Star />,
    comment: <MessageSquare />,
  };

  return iconMap[iconName] || null;
};

/**
 * Metric Component - Displays metric-like information with an optional icon.
 * @typedef {Object} MetricProps - Props for the Metric component.
 * @property {string | number} [value] - The numerical or string value associated with the metric.
 * @property {string} title - The text title or description of the metric.
 * @property {string} [href] - If provided, turns the entire metric into a clickable link.
 * @property {string} [textStyles] - Additional CSS styles to be applied to the text content of the metric.
 * @property {boolean} [isAuthor] - Indicates whether the metric is related to the author.
 * @property {string} [icon] - Specifies the icon associated with the metric. Supported values: "user," "heart," "star," "comment."
 * @property {string} [iconColor] - Specifies the color of the icon. If not provided, a default color (#CC00FF) is used.
 * @property {number} [iconSize] - Specifies the size of the icon. If not provided, a default size (16) is used.
 * @property {() => void} [onClick] - A callback function to be executed when the metric is clicked.
 * @returns {JSX.Element} - JSX element representing the Metric component.
 */
const Metric = ({
  value,
  title,
  href,
  textStyles,
  isAuthor,
  icon,
  iconColor,
  iconSize,
  onClick,
}: MetricProps) => {
  const iconComponent = getIconComponent(icon ?? "");

  /**
   * JSX content for the metric, including value, title, and optional icon.
   * @type {JSX.Element}
   */
  const metricContent = (
    <>
      {iconComponent &&
        React.cloneElement(iconComponent as React.ReactElement, {
          width: iconSize ?? 16,
          height: iconSize ?? 16,
          className: `${
            href ? "rounded-full" : ""
          } cursor-pointer text-accent-blue`,
          color: iconColor?.length ? iconColor : "#CC00FF",
        })}

      <p className={`${textStyles} flex items-center gap-1`}>
        {value ?? ""}

        <span
          className={`small-regular line-clamp-1 ${
            isAuthor ? "max-sm:hidden" : ""
          }`}
        >
          {title}
        </span>
      </p>
    </>
  );

  if (href) {
    return (
      <Link to={href} className="flex-center gap-1">
        {metricContent}
      </Link>
    );
  }

  return (
    <div className="flex-center flex-wrap gap-1" onClick={onClick}>
      {metricContent}
    </div>
  );
};

export default Metric;
