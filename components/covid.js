import Link from 'next/link';
import fetch from 'node-fetch';
import { useState, useRef, useEffect  } from "react";

import covidTablestyle from '../components/css/covidTable.module.css';

import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer,
} from 'recharts';


function useOutsideAlerter(ref) {
  useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            
              alert("You clicked outside of me!");
          }
      }

      // Bind the event listener
      document.addEventListener("click", handleClickOutside);
      return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("click", handleClickOutside);
      };
  }, [ref]);
}

//START show global COVID-19 situation
const CovidGlobalCards =(props)=>{
  const globalObjArr = props.globalObjArr;
  
  return(
    <div className={covidTablestyle.summaryCards}>
      <div className={covidTablestyle.summaryCard}>
        <p>{globalObjArr.TotalConfirmed}</p>
        <p>Total Confirmed</p>
      </div>
      <div className={covidTablestyle.summaryCard}>
        <p>{globalObjArr.TotalDeaths}</p>
        <p>TotalDeaths</p>
      </div>
      <div className={covidTablestyle.summaryCard}>
        <p>{globalObjArr.TotalRecovered}</p>
        <p>TotalRecovered</p>
      </div>
    </div>
  );
};
//END show global COVID-19 siyuation

// START list top 10 withmost confirmed country 
const sortCountries=(counArr)=>{
  counArr.sort(function(countryA, countryB){
    return countryB.TotalConfirmed - countryA.TotalConfirmed;
  })
};
const ListItem = ({ item }) =>(
  <tr className='trRow'>
    <td>{item.Country}</td>
    <td>{item.TotalConfirmed}</td>
    <td>{item.TotalDeaths}</td>
    <td>{item.TotalRecovered}</td>
    <td>{item.NewConfirmed}</td>
    <td>{item.NewDeaths}</td>
    <td>{item.NewRecovered}</td>
</tr>
);
const CovidTable=({allCountryData})=>(
    <div className={covidTablestyle.covidTable}>
      <table>
        <caption className={covidTablestyle.capitalize}>List top 11 countries with the most confirmed cases</caption>
        <thead>
          <tr className={covidTablestyle.tableHeadRow}>
            <th>Country</th>
            <th>TotalConfirmed</th>
            <th>TotalDeaths</th>
            <th>TotalRecovered</th>
            <th>NewConfirmed</th>
            <th>NewDeaths</th>
            <th>NewRecovered</th>
          </tr>
        </thead>
        <tbody>
          {
            allCountryData.map((item)=><ListItem key={item.Country} item={item} />)
          }
        </tbody>
    </table>
    </div>  
);
// END list top 10 withmost confirmed country 

const DrawBarChart=({barChartData})=>{
  const data = barChartData;
  return (
    <ResponsiveContainer>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

const processDataForBarChart=(countriesObjArr)=>{
  const rawData = countriesObjArr;

  let totalConf =[],totalDeath=[],totalRecov=[],newConf=[],newDeath=[],newRecov=[];

  rawData.map((contryObj)=>{
    totalConf.push({
      name:contryObj.Country,
      uv:contryObj.TotalConfirmed,
    });
    totalDeath.push({
      name:contryObj.Country,
      uv:contryObj.TotalDeaths,
    });
    totalRecov.push({
      name:contryObj.Country,
      uv:contryObj.TotalRecovered,
    });
    newConf.push({
      name:contryObj.Country,
      uv:contryObj.NewConfirmed,
    });
    newDeath.push({
      name:contryObj.Country,
      uv:contryObj.NewDeaths,
    });
    newRecov.push({
      name:contryObj.Country,
      uv:contryObj.NewRecovered,
    });
  });
  return [
    {name:'TotalConfirmed',data:totalConf},
    {name:'TotalDeath',data:totalDeath},
    {name:'TotalRecovered',data:totalRecov},
    {name:'NewConfirmed',data:newConf},
    {name:'newDeath',data:newDeath},
    {name:'newRecovred',data:newRecov},
  ];
};

const Allcountry=(props)=> {
  const [openCountryList, setOpenCountryList] = useState(false);
console.log(props);

  const summaryObjArr = props.props.summary;
  const countrysObjArr = summaryObjArr.Countries;
  const globalObjArr = summaryObjArr.Global;
  globalObjArr.Country = "Global";

  const [currentCountryObj, setCurrentCountryObj] = useState(globalObjArr);

  // total infected countries
  const infCountryNum =  countrysObjArr.length;

  // big to small
  sortCountries(countrysObjArr);
  const countriesDataArr = countrysObjArr.slice(0,11);

  const barChartData = processDataForBarChart(countriesDataArr);

  //START handle click outside of element
  const handleClick = e => {
    if (node.current.contains(e.target)|| e.target.type == "listLi") {
      // inside click
      return;
    }
    // outside click 
    setOpenCountryList(false);
  };
  const node = useRef();
  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
  //END handle click outside of element

  return (
    <section className={covidTablestyle.totalCvid}>
      <h1>Global</h1>
      <div className={covidTablestyle.globalBtnList}>
        <button ref={node} className={covidTablestyle.globalBtn} onClick={(e) => {
          setOpenCountryList(!openCountryList);
        }}>
          <img src="/internet.png" alt="internet" />
          <span>{currentCountryObj.Country}</span>
          <img src="/arrowDown.png" alt="arrowDown" />
        </button>
        {openCountryList&&(
        <div className={covidTablestyle.countryList}>
          <ul>
            <li type="listLi" onClick={(e)=>{
                setOpenCountryList(false);
                setCurrentCountryObj(globalObjArr);
                }}>Global</li>
            {countriesDataArr.map((country)=>
              <li type="listLi" key={country.Country}
               onClick={(e)=>{
                setOpenCountryList(false);
                setCurrentCountryObj(country);
                }}>
              {country.Country}
              </li>
            )}
          </ul>
        </div>)
        }
      </div>
      <div className={covidTablestyle.summary}>
        <p> {infCountryNum} Total infected contries</p>
        <CovidGlobalCards globalObjArr={currentCountryObj}/>
      </div>
      <div className={covidTablestyle.barCharts}>
        {barChartData.map((countryData)=>
          <div className={covidTablestyle.barChart} key={countryData.name}>
            <DrawBarChart barChartData={countryData.data}/>
            <p>{countryData.name}</p>
          </div>
        )}
      </div>
      <CovidTable allCountryData={countriesDataArr}/>
    </section>
  )
}

export default Allcountry;