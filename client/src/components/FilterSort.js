import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


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

export default function FilterSort(props) {
  const classes = useStyles();
  const [value, setSortValue] = React.useState('');
  const [open, setOpen] = React.useState(false);

  function handleChange(event) {
    setSortValue(event.target.value);
    console.log(event.target.value);
    props.handleSort(event.target.value);
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
                value={value}
                onChange={handleChange}
                inputProps={{
                    name: 'sort',
                    id: 'demo-controlled-open-select',
                }}
                >
                <MenuItem value={"age"}>Age</MenuItem>
                <MenuItem value={"location"}>Location</MenuItem>
                <MenuItem value={"baldTags"}>Bald people</MenuItem>
                <MenuItem value={"fameRate"}>Popularity</MenuItem>
                </Select>
            </FormControl>
            </form>
    </div>
    
  );
}