import axios from 'axios';
import { useEffect, useState } from 'react';
import mockData from '../../mockData.json';
import styled from 'styled-components';

const URL = 'https://interview-test.sandbox.wegift.io/company';
const AWS_URL = 'https://u9opz1xf69.execute-api.eu-west-1.amazonaws.com/Stage/company';

type ResponseType = {
  data?: {
    Data?: {
      Id: string;
      Name: string;
      Email: string;
      Vat: string;
      Phone: string;
      Country: string;
      Website: string;
      Image: string;
    }[];
  }
}

const StyledTable = styled.table`
  width: 640px;
  margin: 64px auto;
  border: 1px solid black;
  border-radius: 4px;
  padding: 24px;
`;

const App = () => {
  const [data, setData] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  const [searchTerm, setSearchTerm] = useState(null);
  // const [offset, setOffset] = useState(0);

  // useEffect(() => {
  //   (async function () {
  //     try {
  //       const fetchedData: ResponseType = await axios({
  //         method: 'get',
  //         url: `${AWS_URL}?offset=${offset}&limit=10`,
  //         headers: {
  //           'Access-Control-Allow-Origin': '*',
  //         }
  //       });
  //       console.log(fetchedData);
  //       setData(fetchedData?.data.Data);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   })();
  // }, [offset]);

  useEffect(() => {
    setData(mockData.Data);
  }, []);

  const getNextResults = () => {
    setEnd(end + 10);
    setStart(start + 10);
  }

  const getPrevResults = () => {
    setEnd(end - 10);
    setStart(start - 10);
  }

  const filterResults = () => {
    // includes is correct: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
    const filteredItems = data.filter(item => item.Name.includes(searchTerm));
    console.log(filteredItems)
    setData(filteredItems);
  }

  useEffect(() => {
    console.log(data);
  }, [data])

  return (
    data.length > 0 ?
      <>
        <select>
          <option>Name</option>
          <option>Email</option>
        </select>
        <input onChange={(ev) => setSearchTerm(ev.target.value)} type="text" />
        <button onClick={filterResults} type="submit">Filter results</button>
        <StyledTable>
          <thead>
            <tr>
              <th>ID</th>
              <th>name</th>
              <th>Email</th>
              <th>Vat</th>
              <th>Phone</th>
              <th>Country</th>
              <th>Website</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(start, end).map(element => (
              <tr key={element.Id}>
                <td>{element.Id}</td>
                <td>{element.Name}</td>
                <td>{element.Email}</td>
                <td>{element.Vat}</td>
                <td>{element.Phone}</td>
                <td>{element.Country}</td>
                <td>{element.Website}</td>
                <td><img src={element.Image} height='64px' width="64px" /></td>
              </tr>)
            )}
          </tbody>
        </StyledTable>
        <button onClick={() => getPrevResults()} disabled={start === 0}>back results</button>
        <button onClick={() => getNextResults()} disabled={end === 500}>next results</button>
      </> : <div>no results found</div>
  );
};

export default App;