import React, {useState} from 'react';

const Searchbar = ({setQuery, setCategoria, setActivateSearch}) => {
    const [localQuery, setLocalQuery] = useState("");
    const categorias = [
        "Natureza",
        "Pessoas",
        "Tecnologia",
        "Animais",
        "Esportes",
    ];

    return (
        <div className="search-bar">
            <input
                type="text"
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                placeholder="Pesquisar fotos..."
            />
            <select
                onChange={(e) => {
                    setCategoria(e.target.value);
                    setActivateSearch(true);
                }}
            >
                {categorias.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>
            <button
                onClick={() => {
                    setQuery(localQuery);
                    setActivateSearch(true);
                }}
            >
                Pesquisar
            </button>
        </div>
    );
};

export default Searchbar;