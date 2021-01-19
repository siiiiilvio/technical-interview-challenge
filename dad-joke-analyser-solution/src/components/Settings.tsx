import React from "react";
interface Props {
  settings: { jokes: number; terms: number };
  updateSettings: (value: number, name: string) => void;
  fetchJokes: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Settings: React.FC<Props> = ({
  settings,
  updateSettings,
  fetchJokes,
}) => {
  return (
    <section className="settings">
      <form
        onSubmit={(e) => {
          fetchJokes(e);
        }}
      >
        <label>
          Choose number of jokes:
          <input
            name="jokes"
            type="number"
            value={settings.jokes}
            onChange={(e) =>
              updateSettings(parseInt(e.target.value), e.target.name)
            }
          />
        </label>
        <label>
          Choose number of popular terms:
          <input
            name="terms"
            type="number"
            value={settings.terms}
            onChange={(e) =>
              updateSettings(parseInt(e.target.value), e.target.name)
            }
          />
        </label>
        <button>
          <img src="../../logo.png" alt="logo" />
        </button>
      </form>
    </section>
  );
};

export default Settings;
