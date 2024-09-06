
import { Container, CountryList, Heading, Loader, Section } from 'components';
import { useState, useEffect } from 'react';
import { getCountries } from 'service/countryApi';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
const [loading, setLoading] = useState(false)

  useEffect(() => {
    
    const fetchData = async () => {
      setLoading(true);
      setError(null);
try {
  const data = await getCountries()
  setCountries(data);
  
} catch (error) {
  setError(error);
} finally {
  setLoading(false);
}
    }
    fetchData();
  }, [])
  

  return (
    <Section>
      <Container>
        {countries.length > 0 && <CountryList countries={countries} />}
        {loading && <Loader />}
        {error && <Heading title="Ooop...its some error..please try again" bottom />}
        
      </Container>
    </Section>
  );
};
export default Home;
