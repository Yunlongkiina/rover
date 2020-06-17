import navbarStyle from './css/navbar.module.css';
import { useState} from 'react';

const MenuItems=(props)=>{
    return(
        <div className='menuItems'>
            <ul>
                <li>item1</li>
                <li>item2</li>
            </ul>
            <style jsx>{`
                .menuItems{
                    display:${props.showMenuLs? 'block' : 'none'};
                    position: relative;
                    width: 100%;
                    z-index: 11;
                    height: 100%;
                    color: white;
                    background: #e3c4a8;
                }
                .menuItems ul{
                    position: relative;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: end;
                    align-items: center;
                }
                .menuItems li{
                    position:relative;
                    padding: 20px;
                }
                .deleteicon{
                    position: absolute;
                    right: 20px;
                    top: 10px;
                    color: white;
                    z-index: 12;
                }
            `}</style>
        </div>
    );
}
const HamIcon=(props)=>{   
    // let myDiv = React.createRef()
    // function myClick() {
    //   myDiv.current.style.background = 'blue';
    // }
    // console.log(props.hamToCross);
    
    return(
        <div className={`menuMobile ${props.hamToCross ? "cross" : ""}`}>
            <div></div><div></div><div></div>
            <style jsx>{`
                .menuMobile{
                    position: relative;
                    width: 25px;
                    height: 25px;
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    justify-content: space-between;
                }
                .menuMobile div{
                    width: 100%;
                    height: 5px;
                    background: #e3c4a8;
                }
                .cross div:nth-child(1){
                    position: absolute;
                    transform: rotate(45deg) translate(5px, 8px);
                }
                .cross div:nth-child(2){
                    position: absolute;
                    transform: rotate(-45deg) translate(-8px, 5px);
                }
                .cross div:nth-child(3){
                    display: none;
                }
            `}</style>

        </div>
    );
}
const NavBar =()=>{
    const [showMenuList, setMenuList] = useState(false);
        return(
            <nav className={navbarStyle.navWrapper}>
                <div className={navbarStyle.content}>
                    <div className={navbarStyle.navRow}>
                        <div className={navbarStyle.logo}>Rover</div>
                        <div className={navbarStyle.menuIcon} onClick={()=>{
                           setMenuList(!showMenuList);
                        }}>
                        <HamIcon hamToCross={showMenuList}/>
                    </div>
                    </div>
                    <MenuItems showMenuLs ={showMenuList}/>
                </div>
            </nav>
        )
}
export default NavBar;