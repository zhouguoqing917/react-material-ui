import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { Card } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

// core components
import styles from "assets/jss/styles/components/cardStyle.js";

const useStyles = makeStyles(styles);

export default function CardExtra(props) {
  const classes = useStyles();
  const {
    className,
    children,
    plain,
    carousel,
    profile,
    chart,
    ...rest
  } = props;
  const cardClasses = classNames({
    [classes.card]: true,
    [classes.cardPlain]: plain,
    [classes.cardProfile]: profile,
    [classes.cardChart]: chart,
    [classes.cardCarousel]: carousel,
    [className]: className !== undefined
  });
  return (
    <Card className={cardClasses} {...rest} n="card">
      {children}
    </Card>
  );
}

CardExtra.propTypes = {
  className: PropTypes.string,
  plain: PropTypes.bool,
  carousel: PropTypes.bool,
  profile: PropTypes.bool,
  chart: PropTypes.bool,
  children: PropTypes.node
};
