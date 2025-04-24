import * as React from "react";
import PropTypes from "prop-types"; // Import PropTypes for validation
import { cn } from "../../lib/utils";

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

// PropType validation
Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

// PropType validation
CardHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

// PropType validation
CardTitle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

// PropType validation
CardDescription.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

// PropType validation
CardContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

// PropType validation
CardFooter.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
