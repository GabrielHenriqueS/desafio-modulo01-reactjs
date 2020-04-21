import React, { useEffect, useState } from "react";

import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadRepositories() {
      const response = await api.get("repositories");
      setRepositories(response.data);
    }
    loadRepositories();
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `Desafio Node.js ${Date.now()}`,
      url: "https://github.com/GabrielHenriqueS/omnistack11-frontend",
      techs: ["Node.js", "ReactJS"],
      likes: 10
    });

    const { data } = response;

    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const data = repositories.filter(repository => repository.id !== id);

    setRepositories(data);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
