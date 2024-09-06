import {
  Container,
  CountryList,
  Heading,
  Loader,
  SearchForm,
  Section,
} from 'components';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchByRegion } from 'service/countryApi';

const SearchCountry = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const region = searchParams.get('region');
  useEffect(() => {
    if (!region) {
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchByRegion(region);
        setCountries(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [region]);

  const handleSubmit = value => {
    setSearchParams({ region: value });
  };
  return (
    <Section>
      <Container>
        <SearchForm onSubmit={handleSubmit} />
        {countries.length > 0 && <CountryList countries={countries} />}
        {loading && <Loader />}
        {error && (
          <Heading title="Ooop...its some error..please try again" bottom />
        )}
      </Container>
    </Section>
  );
};

export default SearchCountry;
