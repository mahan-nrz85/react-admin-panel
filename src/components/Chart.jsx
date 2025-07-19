import * as React from 'react';
import { BarChart, ChartContainer ,  } from '@mui/x-charts';

export default function Chart() {
  return (
    <div className='w-full'>
      
        <BarChart
          xAxis={[

                { 
                    data: ['مهر', 'آبان' , 'آذر' , 'دی' , 'بهمن' , 'اسفند' ,'فروردین' , 'اردیبهشت' ,'خرداد' , 'تیر' ,'مرداد' , 'شهریور' ] , 
                    categoryGapRatio: 0.6,
                    tickLabelStyle : {
                        fill : '#F1F1F1'
                    },
                    labelStyle : {
                        fill : '#F1F1F1'
                    }
                },
          ]}
          yAxis={[
            {
              tickLabelStyle : {
                fill : '#F1F1F1'
              },
              labelStyle : {
                          fill : '#F1F1F1'
              }
            },
          ]}
          series={[{ data: [14, 3, 45 , 24 , 10 , 45 , 15 , 30 , 75 , 89 , 2 , 5] , color : '#3b82f6'}]}
          borderRadius={5}
          height={400}
          className='w-full'
        />

    </div>

  );
}