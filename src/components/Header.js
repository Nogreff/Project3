import "../img/logo.svg"
import "../css/Header.css"
function Header(){
    return(
        <header>
            <div className="header_wrap">
                <img src={require('../img/logo.svg').default}/>
                <a>Sign in</a>
            </div>
        </header>
    )
}

export default Header