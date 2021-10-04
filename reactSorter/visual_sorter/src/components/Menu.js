import PropTypes from 'prop-types'

function Menu({ items, reset }) {
    return (
        <menu id="menuItems">
            <ul>
                {items.map((val) => {
                    if(val.text === "Reset"){
                        return(
                            <li key={val.id}><button id={val.text.split(' ').join('')} onClick={reset}>{val.text}</button></li>
                        )
                    }
                    return (
                        <li key={val.id}><button id={val.text.split(' ').join('')}>{val.text}</button></li>
                    )
                })}
            </ul>
        </menu>
    )
}

Menu.propTypes={
    reset: PropTypes.func,
}

export default Menu
