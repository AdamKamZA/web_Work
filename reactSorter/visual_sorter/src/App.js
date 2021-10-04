import Menu from './components/Menu'
import Bars from './components/Bars'
import bubbleSort from './algorithms/bubbleSort.js'
import { useEffect, useState } from 'react'

function App() {
  //Functions
  //gets random heights to apply to the bar component height
  let getBars = () => {
    let randomAmount = Math.ceil((Math.random() * (100 - 20)) + 20);
    //list of divs
    let heights = [];
    for (let i = 0; i <= randomAmount; i++) {
      let hRand = Math.ceil((Math.random() * (350 - 50)) + 50);
      heights[i] = hRand;
    }
    return heights;

  }

  let srtBars = () => {
    let steps = [];
    bubbleSort(bars, steps);
    //stores each array that the sort captures
    let stepHeights = steps;

    //now we want to add useInterval on each one of these arrays
    let i = 0;
    //adding an interval to execute each update in sequence to match the order of events
    stepHeights.forEach((arr) => {
      let time = setTimeout(() => {
        setBars(arr);
      }, 10 * (i));
      timeouts.push(time);
      i++;
    });
    setTimeouts(timeouts);
  }


  //states

  //colours --yet to be implemented
  const[colours, setColours] = useState({
    base: '#2f2636',
    compare: '#1b1391',
    swap:'#2f2636'
  })
  const [items, setItems] = useState(
    [
      {
        text: 'Sort Method',
        id: 1
      },

      {
        text: 'Reset',
        id: 2
      },

      {
        text: 'Colours',
        id: 3
      },
    ]);

    //state testing --ignore
  /* const [objBar, setBars] = useState({
    bars: getBars(),
    color_code:1 //this represents what colour it should be when comparing
  }) */

  //state to hold the heights of bars
  const [bars, setBars] = useState(getBars());//default state is a randomly generated set of divs
  //to hold the timeouts so that we can clear them (not required to run)
  const [timeouts, setTimeouts] = useState([]); //still need to clear

  //resetting bars
  let resetBars = () => { setBars(getBars()) };

  return (
    <div className="App">
      <Menu items={items} reset={resetBars} />
      <Bars bars={bars} sort={srtBars} />
    </div>
  );
}
/**
 * How the sorter needs to work!
 * Track each sorting operation, so each time a loop occurs, we need to track the changes 
 * On each change, we need to write the state of the application, this means the order of heights, the colors (do later)
 * then add these updates to an array of changes that are to be updated one at a time, at a certain speed
 * useTimeout, scaling each timeout by its postion in the array and the selected delay. 
 * Each timeout callback uses setState to update the dom based on the current position and colours of the sort,
 * Each sorting algorithm needs to return nothing, but simply update their parameters
 */

export default App;
