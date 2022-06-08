export default function GeneralInfo(props) {
  const euMember = './flags/Flag_of_Europe.svg'
  const currencyInfo = props.curr
  const driveInfo = props.drive
  const member = props.member
  const info = props.info
  const cars = info.car
  const code = info.cioc
  const capital = info.capital
  const region = info.subregion
  const population = info.population
  const currency = Object.values(info.currencies)[0]

  return (
    <>
      {member? <img src={euMember} alt='Flag of the European Union' id='euMemberFlag'></img> : null}
      <p>Capital: <span>{capital}</span></p>
      <p>Population: <span>{population.toLocaleString("en-US")}</span></p>
      <p>Region: <span>{region}</span></p>
      {driveInfo? <p>Drive side: <span>{cars.side}</span></p> : null}
      {driveInfo? <p>Drive signs: <span>{cars.signs}</span></p> : null}
      {currencyInfo? <p>Currency name: <span>{currency.name}</span></p> : null}
      {currencyInfo? <p>Currency symbol: <span>{currency.symbol}</span></p> : null}
      <p><abbr title="International Olympic Committee">IOC</abbr> Code: <span>{code}</span></p>
    </>
  )
}