import { useState } from 'react';
import apiHandler from '../services/myService';

export function Recommendations() {
  function getRecommendations() {
    apiHandler
      .getRecommendations({ seed_artists: '6U1lmwvy3I9dIYu9RalJi6' })
      .then((res) => {
        console.log(res)
        return res.json()})
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <>
      <button type='submit' onClick={getRecommendations}>
        Recommend Me
      </button>
    </>
  );
}
