import { useEffect, useState } from 'react';

function App() {
  const [candidates, setCandiates] = useState([]);
  useEffect(() => {
    const attInterval = setInterval(requestCandidates, 5000);
    return () => clearInterval(attInterval);
  }, [candidates]);

  async function requestCandidates() {
    const url = 'https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json';
    const request = await fetch(url);
    const response = await request.json();

    setCandiates(response.cand);
  }

  if (candidates.length < 1) return <span>Loading...</span>
  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Porcentagem</th>
          <th>Votos</th>
        </tr>
      </thead> 
      { candidates.map((candidate) => (
        <tbody key={ candidate.nm }>
          <tr>
            <td>{ candidate.nm}</td>
            <td>{ candidate.pvap }</td>
            <td>{ candidate.vap }</td>
          </tr>
        </tbody>
      ))}
    </table>
  );
}

export default App;
