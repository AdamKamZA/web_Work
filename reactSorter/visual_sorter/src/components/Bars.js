import PropTypes from 'prop-types'

function Bars({bars, sort}) {
    //require a unique key for each element added
    let counter =0;
    return (
        <div id="dataContainer">
            <div id="barContainer">
                {bars.map((height) => {
                    return (
                        <div className="sBar" style={{ height: height + 'px' }} key={counter++}></div>
                    )
                })
                }
            </div>
            <h1>{bars.length} bars to sort</h1>
            <div id="btnContainer"><button id="btnSort" onClick={sort}>Sort</button></div>
        </div>
    )
}

//defining the type of value that the sort prop should take
Bars.propTypes={
    sort : PropTypes.func
}

export default Bars
