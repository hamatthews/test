import styles from '../styles/Test.module.css';

type Person = {
  firstName: string;
  middleName?: string;
  lastName: string;
  age: number;
};

type Props = {
  people: Person[];
};

export default function Test(props: Props): JSX.Element {
  return (
    <div className={styles.color}>
      {props.people.map((e: Person) => {
        return e.middleName;
      })}
    </div>
  );
}
