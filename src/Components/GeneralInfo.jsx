export default function GeneralInfo(props) {
  const info = props.info
  const euMember = './flags/Flag_of_Europe.svg'
  const member = props.member
  const cars = info.car
  const currency = Object.values(info.currencies)[0]
  const code = info.cioc
  const region = info.subregion
  const population = info.population
  const capital = info.capital

  return (
    <>
      {member? <img src={euMember} alt='Flag of the European Union' id='euMemberFlag'></img> : null}
      <p>Capital: <span>{capital}</span></p>
      <p>Population: <span>{population.toLocaleString("en-US")}</span></p>
      <p>Region: <span>{region}</span></p>
      <p>Drive side: <span>{cars.side}</span></p>
      <p>Drive signs: <span>{cars.signs}</span></p>
      <p>Currency name: <span>{currency.name}</span></p>
      <p>Currency symbol: <span>{currency.symbol}</span></p>
      <p><abbr title="International Olympic Committee">IOC</abbr> Code: <span>{code}</span></p>
    </>
  )
}