import React from "react";

export default function boldSeekingHiring(title: string): JSX.Element | string {
  const match = title.match(/^I'm (seeking|hiring)(.*)/);
  if (match) {
    return (
      <>
        I&apos;m <strong>{match[1]}</strong>
        {match[2]}
      </>
    );
  }
  return title;
}
