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

const getIconComponent = (iconName: string) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    user: <User2 />,
    heart: <Heart />,
    star: <Star />,
    comment: <MessageSquare />,
  };

  return iconMap[iconName] || null;
};

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
