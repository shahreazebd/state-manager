"use client";
import { useRef, useEffect } from "react";

import { createStore } from "stan-js";

export const { useStore, reset } = createStore({
  name: {
    first: "Jane",
    last: "Doe",
  },
  birth: {
    year: 2000,
    month: "Jan",
    day: 1,
    time: {
      hour: 0,
      minute: 0,
    },
  },
});

const useCommitCount = () => {
  const rerenderCountRef = useRef(0);
  useEffect(() => {
    rerenderCountRef.current += 1;
  });
  return rerenderCountRef.current;
};

// Rerenders when nameAtom changes.
const DisplayName = () => {
  const { name } = useStore();
  const n = useCommitCount();

  return (
    <div>
      Name: {name.first} {name.last}: re-rendered {n} times
    </div>
  );
};

// Re-renders when birthAtom changes.
const DisplayBirthday = () => {
  const { birth } = useStore();
  const n = useCommitCount();
  return (
    <div>
      Birthday:
      {birth.month}/{birth.day}/{birth.year}: (re-rendered {n} times)
    </div>
  );
};

// Swap first and last names, triggering a change in nameAtom, but
// not in birthAtom.
const SwapNames = () => {
  const { setName, name } = useStore();
  const handleChange = () => {
    setName({
      first: name.last,
      last: name.first,
    });
  };
  return <button onClick={handleChange}>Swap names</button>;
};

// Replace person with a deep copy, triggering a change in nameAtom, but
// not in birthAtom.
const CopyPerson = () => {
  const { setName, name, birth, setBirth } = useStore();

  const handleClick = () => {
    setName({
      first: name.first,
      last: name.last,
    });

    setBirth({
      year: birth.year,
      month: birth.month,
      day: birth.day,
      time: {
        hour: birth.time.hour,
        minute: birth.time.minute,
      },
    });

    // setPerson({
    //   name: { first: person.name.first, last: person.name.last },
    //   birth: {
    //     year: person.birth.year,
    //     month: person.birth.month,
    //     day: person.birth.day,
    //     time: {
    //       hour: person.birth.time.hour,
    //       minute: person.birth.time.minute,
    //     },
    //   },
    // });
  };
  return <button onClick={handleClick}>Replace person with a deep copy</button>;
};

// Changes birth year, triggering a change to birthAtom, but not nameAtom.
const IncrementBirthYear = () => {
  const { setBirth, birth } = useStore();

  const handleClick = () => {
    // setPerson({
    //   name: person.name,
    //   birth: { ...person.birth, year: person.birth.year + 1 },
    // });

    setBirth({
      ...birth,
      year: birth.year + 1,
    });
  };
  return <button onClick={handleClick}>Increment birth year</button>;
};

export function UserStanjs() {
  return (
    <div className="p-10">
      <p>stan-js</p>

      <div className="space-y-4 border">
        <DisplayName />
        <DisplayBirthday />
      </div>

      <div className="flex gap-2 border">
        <SwapNames />

        <CopyPerson />

        <IncrementBirthYear />
      </div>
    </div>
  );
}
