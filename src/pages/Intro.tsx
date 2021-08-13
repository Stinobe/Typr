import React, { ChangeEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import Sources from "../utils/source-base";
import styles from "./Intro.module.scss";
import button from "../styles/Button.module.scss";
import Analytics from "../utils/Analytics";

const Intro: React.FC = (): React.ReactElement => {
  const { list } = Sources;
  const history = useHistory();
  const [selected, setSelected] = useState(list[0]);

  const changeSelection = (ev: ChangeEvent<HTMLSelectElement>) => {
    setSelected(Sources.getByPath(ev.target.value)!);
  };

  const redirectTo = (p: string) => {
    history.push(`/t/${p}`);
  };

  const start = () => {
    Analytics.event(`source_${selected.path.replaceAll("-", "_")}`);
    redirectTo(selected.path);
  };

  const random = () => {
    Analytics.event("source_random");
    redirectTo(Sources.getRandomLibrary().path);
  };

  return (
    <div>
      <p>
        Practice your typing skills with the use of random quotes provided by one of the implemented
        API's.
      </p>
      <p>Select a source:</p>
      <div className={styles.options}>
        <select onChange={changeSelection} placeholder="Make a selection">
          {list.map((source) => (
            <option value={source.path} key={source.id}>
              {source.title}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.buttonlist}>
        <button className={button.btn} type="reset" onClick={random}>
          <i className={`bx bx-refresh ${button.icon}`} />
          Random
        </button>
        <button className={button.btn} type="submit" onClick={start}>
          <i className={`bx bx-check ${button.icon}`} />
          Start
        </button>
      </div>
      <p className="note">
        The selected API is provided by{" "}
        <a href={selected.link} target="_blank" rel="noreferrer">
          {selected.author}
        </a>
        .
      </p>
    </div>
  );
};

export default Intro;
