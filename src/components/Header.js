import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom"
import Hamburger from "./Hamburger";
const Header = ({ history }) => {


  const [state, setState] = useState({
    isOpen: false,
    name: "Menu"
  })

  const [disable, setDisable] = useState({

    disabled: false
  })

  const disableButton = () => {

    setDisable({
      disabled: true
    })

    setTimeout(() => {
      setDisable({
        disabled: false
      })
    }, 1000)
  }

  const handleClick = () => {

    disableButton()

    if (state.isOpen === false) {
      setState({
        isOpen: true,
        name: "Close"
      })

    }
    if (state.isOpen === true) {
      setState({
        isOpen: false,
        name: "Menu"
      })


    }



  }

  useEffect(() => {
    history.listen(() => {
      setState({ isOpen: false, name: "Menu" })
    })
  })











  return <header>
    <div className="container">
      <div className="wrapper">
        <div className="inner-header">
          <div className="logo">
            <Link to="/"> KERIM </Link>
          </div>
          <div className="menu">
            <button onClick={handleClick} disabled={disable.disabled}>{state.name}</button>
          </div>
        </div>
      </div>
    </div>
    <Hamburger state={state} />
  </header>;
};

export default withRouter(Header);
