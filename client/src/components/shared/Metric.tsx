import { User2, Heart, Star } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

interface MetricProps {
  alt: string;
  value?: string | number;
  title: string;
  href?: string;
  textStyles?: string;
  isAuthor?: boolean;
  icon?: string;
  iconColor?: string;
  onClick?: () => void;
}

const getIconComponent = (iconName: string) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    user: <User2 />,
    heart: <Heart />,
    star: <Star />,
  };

  return iconMap[iconName] || null;
};

const Metric = ({
  alt,
  value,
  title,
  href,
  textStyles,
  isAuthor,
  icon,
  iconColor,
  onClick,
}: MetricProps) => {
  const iconComponent = getIconComponent(icon ?? "");

  const metricContent = (
    <>
      {iconComponent &&
        React.cloneElement(iconComponent as React.ReactElement, {
          width: 16,
          height: 16,
          className: `${
            href ? "rounded-full" : ""
          } cursor-pointer text-accent-blue`,
          color: iconColor?.length ? iconColor : "currentColor",
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
