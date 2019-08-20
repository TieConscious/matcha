import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles(theme => ({
  root: {
    width: 300,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

function valuetext(value) {
    console.log(value);
    return value;
}

export default function DiscreteSlider(props) {
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    console.log(newValue);
  }

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider-small-steps" gutterBottom>
        {props.name}
      </Typography>
      <Slider
        defaultValue={props.value}
        onChange={props.handleChangeParent}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-small-steps"
        valueLabelDisplay="auto"
        step={props.step}
        min={props.min}
        max={props.max}
      />
    </div>
  );
}