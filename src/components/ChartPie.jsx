import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function ChartPie() {
  return (
    <div className='w-full'>
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: 10, label: 'لپتاپ' },
                { id: 1, value: 15, label: 'آیفون' },
                { id: 2, value: 20, label: 'ASUS' },
              ],
              cornerRadius : 3,
              paddingAngle : 2,
              innerRadius : 10
            },
          ]}
          width={150}
          height={150}
        />
    </div>
  );
}
