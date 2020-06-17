import Head from 'next/head';
import NavBar from './navBar';

const Header=()=>{
    return(
      <Head>
        <meta name="description" content="The intetnetRover Project@marstravel.fi"></meta>
        <meta name="author" content="Yunlong Liu"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
        <title>rover dan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    )
  }
const Footer=()=>{
    return(
      <footer className='footer'>
        <div className='row-flex'>
          <div className='socialMedia'>
          <div className='socialMediaCard'>
            <img src='/linkedin.png' alt='linkedin' />
            <p><a href="http://internetrover.herokuapp.com/">LinkedIn</a></p>
          </div>
          <div className="socialMediaCard">
            <img src='/internet.png' alt='internet' />
            <p><a href="http://internetrover.herokuapp.com/">InternetRover</a></p>
          </div>
        </div>

        </div>
        <div className='footerbtm'>
          <p>Author: Yunlong Liu</p>
          <p><span>Copyright&#169;2020</span></p>
        </div>
        <style jsx>{`
                .footer{
                  position: relative;
                  width: 100vw;
                  display: block;
                  padding: 20px 0;
                  background: linear-gradient(180deg, #F24B6A 0%, #CA3F59 100%);
                }
                .footer a{
                  font-size: 20px;
                  text-decoration: none;
                  color: black;
                }
                .row-flex{
                  display:flex;
                  justify-content: center;
                }
                .socialMedia{
                  display: flex;
                }
                .socialMediaCard{
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                }
                .socialMediaCard:nth-child(2){
                  margin-left:20px
                }
                .socialMediaCard img{
                  width:25px;
                  height:25px;
                }
                .socialMediaCard p{
                  padding-left:10px;
                }
                .footerbtm{
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  flex-direction: row;
                }
                .footerbtm span{
                  padding-left: 20px;
                }
            `}</style>
      </footer>
    );
}
const MainLayout=({children})=>{
    return(
        <div className="mainWrapper">
            <Header />
            <NavBar/>
            {children}
            <Footer />
            <style jsx global>{`
                .mainWrapper{
                 position:relative;
                 height:100vh;
                 width:100vw;
                }
                * {
                  margin: 0;
                  padding: 0;
                  font-style: normal;
                  outline: none !important;
                }
                html {
                  margin: 0;
                  padding: 0;
                  overscroll-behavior: none;
                }                    
                body {
                  margin: 0;
                  padding: 0;
                  position: relative;
                  overflow-x: hidden;
                  min-width: 320px;
                  overscroll-behavior: none;
                  width: 100vw;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
                a {
                  text-decoration: none;
                }
                li{
                  list-style: none;
                }
                button{
                  cursor: pointer;
                }
                h1{
                  font-size: 42px;
                }
                .capitalize{
                  text-transform: capitalize;
                }
            `}</style>
        </div>
      )
}

export default MainLayout;