import React from "react";

interface Props {
  jokes: any[];
  terms: string[][];
}

const List: React.FC<Props> = ({ jokes, terms }) => {
  return (
    <section className="list-group-flush">
      <ul>
        {jokes &&
          jokes.map((joke, index) => (
            <li key={joke.id} className="list-group-item">
              {joke.joke}
              <br />
              {terms[index]?.map((term: string, idx: number) => (
                <button
                  key={`${term}_${index.toString()}`}
                  className="btn btn-info"
                >
                  {term}
                </button>
              ))}
            </li>
          ))}
      </ul>
    </section>
  );
};

export default List;
