import * as React from "react";
import PropTypes from "prop-types"; // For prop validation
import { cn } from "../../lib/utils"; // Utility for classNames

const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
));
Avatar.displayName = "Avatar";

Avatar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  <img
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = "AvatarImage";

AvatarImage.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

export { Avatar, AvatarImage };
