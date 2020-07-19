import React from 'react';
import { Chart } from 'react-charts';

export default function VoteChart(props) {
  const data = React.useMemo(
    () => [
      {
        label: 'vote chart',
        data: props.data,
      },
    ],
    [props.data]
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'left' },
    ],
    []
  );

  return (
    <div
      style={{
        width: '100%',
        height: '300px',
      }}
    >
      <Chart data={data} axes={axes} />
    </div>
  );
}
