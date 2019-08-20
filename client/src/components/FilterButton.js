import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Slider from './Slider';
import SliderRange from './SliderRange';


const useStyles = makeStyles({
  list: {
    width: 150,
    paddingLeft: 10,
    paddingRight: 10,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
    age: [18, 50],
    baldTags: 2,
    //famerating
    location: 10
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const handleChange = (name, value) => {
    console.log("change: " +name+ " value: " +value);
    setState({ [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.baldTags);

    console.log(state);
  }
  const sideList = side => (
    <div
       className={classes.list}
       role="presentation"
       onClick={toggleDrawer(side, false)}
       onKeyDown={toggleDrawer(side, false)}
     >
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <List>
          <ListItem  button key='Age'>
            <SliderRange onChange={console.log("change")} id="age" name="age"/>
          </ListItem>
          <ListItem button key="baldTags">
            <Slider handleChangeParent={handleChange} sname="baldTags" id="bald" name="No. of same favorite bald people" min="0" max="4" step="1" value={state.baldTags} />
          </ListItem>
          <ListItem button key="fame rating">
            <Slider id="fame" name="Fame rating" min="0" max="4" step="1" defaultValue="2" />
          </ListItem>
          <ListItem button key="location">
            <Slider id="location" name="Location (miles)" min="0" max="50" step="1" defaultValue="10" />
          </ListItem>
          <Button type="submit" variant="contained" color="secondary">Done</Button>
        </List>
      </form>
    </div>
  );


  return (
    <div>
      <button className="filter-button" onClick={toggleDrawer('right', true)}>Filter</button>
      <Drawer anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
        {sideList('right')}
      </Drawer>
    </div>
  );
}

