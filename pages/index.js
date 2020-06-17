import MainLayout from '../components/mainLayout';
import Allcountry from '../components/covid';

const Home=({summary})=>{
  
  return(
    <MainLayout>
      <main className='main'>
        <Allcountry props={
          {summary
          }
        }/>
      </main>
      <style jsx>{`
        .main{
          position: relative;
          width: 100vw;
        }`}
      </style>
    </MainLayout>
  )
}

export async function getStaticProps() {
  const summaryRes = await fetch('https://api.covid19api.com/summary');
  const summary = await summaryRes.json();

console.log('render one time');

  return {
    props: {
      summary,
    },
  }
}

export default Home;
