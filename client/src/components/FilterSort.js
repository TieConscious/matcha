import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 80,
  },
}));

export default function FilterSort() {
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);

  function handleChange(event) {
    setAge(event.target.value);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }

  return (
    <div className="filterbuttons">
        
            <form autoComplete="off">
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="demo-controlled-open-select">Sort by</InputLabel>
                <Select
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={age}
                onChange={handleChange}
                inputProps={{
                    name: 'age',
                    id: 'demo-controlled-open-select',
                }}
                >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Age</MenuItem>
                <MenuItem value={20}>Location</MenuItem>
                <MenuItem value={30}>Bald people</MenuItem>
                </Select>
            </FormControl>
            </form>
    </div>
    
  );
}