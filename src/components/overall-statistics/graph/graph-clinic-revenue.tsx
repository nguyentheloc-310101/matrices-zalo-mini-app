import { Column } from '@ant-design/charts';
import useFetchClinic from 'common/stores/clinics/clinic-revenue';
import React, { useEffect, useState } from 'react';
const data = [
  {
    year: '1991',
    value: 3,
    type: 'Lon',
  },
  {
    year: '1992',
    value: 4,
    type: 'Lon',
  },
  {
    year: '1993',
    value: 3.5,
    type: 'Lon',
  },
  {
    year: '1994',
    value: 5,
    type: 'Lon',
  },
  {
    year: '1995',
    value: 4.9,
    type: 'Lon',
  },
  {
    year: '1996',
    value: 6,
    type: 'Lon',
  },
  {
    year: '1997',
    value: 7,
    type: 'Lon',
  },
  {
    year: '1998',
    value: 9,
    type: 'Lon',
  },
  {
    year: '1999',
    value: 15,
    type: 'Lon',
  },
  {
    year: '1991',
    value: 3,
    type: 'Bor',
  },
  {
    year: '1992',
    value: 4,
    type: 'Bor',
  },
  {
    year: '1993',
    value: 3.5,
    type: 'Bor',
  },
  {
    year: '1994',
    value: 5,
    type: 'Bor',
  },
  {
    year: '1995',
    value: 4.9,
    type: 'Bor',
  },
  {
    year: '1996',
    value: 6,
    type: 'Bor',
  },
  {
    year: '1997',
    value: 7,
    type: 'Bor',
  },
  {
    year: '1998',
    value: 9,
    type: 'Bor',
  },
  {
    year: '1999',
    value: 13,
    type: 'Bor',
  },
];

interface DataBarChart {
  clinic: string;
  value: number;
  type: string;
}
const GraphClinicRevenue = () => {
  const { clinics, setClinics } = useFetchClinic();
  const [data, setData] = useState<DataBarChart[]>([]);

  useEffect(() => {
    if (clinics) {
      const dataClinicRevenue = clinics.map((clinic) => {
        return {
          clinic: clinic.clinic_name,
          value: clinic.revenue / 1000000,
          type: 'Thực thu',
        };
      });
      const dataClinicDebit = clinics.map((clinic) => {
        return {
          clinic: clinic.clinic_name,
          value: clinic.debit / 1000000,
          type: 'Công nợ',
        };
      });
      const mergedData = [...dataClinicRevenue, ...dataClinicDebit];
      setData(mergedData);
    }
  }, [clinics]);
  const config = {
    autoFit: true,
    isStack: false,
    xField: 'clinic',
    yField: 'value',
    seriesField: 'type',
    // legend: false,
    label: false,
    interactions: [
      {
        type: 'active-region',
        enable: false,
      },
    ],
    xAxis: false,
    yAxis: {},

    columnBackground: {
      style: {
        fill: 'rgba(0,0,0,0.1)',
      },
    },
  };

  return (
    <Column
      {...(config as any)}
      data={[...data]}
      key={'graph-1'}
    />
  );
};

export default GraphClinicRevenue;
