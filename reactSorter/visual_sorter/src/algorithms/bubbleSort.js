/**
 * Bubble Sort Algorithm that tracks all updates of the array during the algorithm
 * @param {array} heights of the bars of the array
 * @param {array} heightSteps captures the state of the array during each loop of the algorithm
 */
function bubbleSort(heights, heightSteps) {
  for (let i = 0; i < heights.length; i++) {
    for (let j = i + 1; j < heights.length; j++) {
      //need to change the colour of those values that have been compared
      if (heights[j] < heights[i]) {
        let temp = heights[i];
        heights[i] = heights[j];
        heights[j] = temp;
      }
      //had to convert to string before as all values were being overwritten by the final output
      //this is the array that contains each step of the array
      heightSteps.push(heights.toString().split(',').map(Number));
    }
  } 
  return;
}

export default bubbleSort;