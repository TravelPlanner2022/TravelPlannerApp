

import React, { useState,useEffect  } from 'react';
import DatePicker from 'react-date-picker';
import { Form } from 'antd'


function SetDateRange(props) {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const { setDateGap } = props;
    

    useEffect(()=>{
        
        const a = Math.ceil(Math.abs(endDate - startDate) / (1000 * 60 * 60 * 24));
        
        //props.passDaysdiff(a);
        console.log(setDateGap);
        setDateGap(a);
    }
    ,[startDate,endDate]
    );

    


    return (
        <>
        <Form.Item label={<b><label>Start Date</label></b>}>
            <DatePicker 
                 selected={startDate}
                 onChange={(date) => setStartDate(date)}
                 selectsStart
                 startDate={startDate}
                 endDate={endDate}
                 value = {startDate}
            />
          </Form.Item>
          <Form.Item label={<b><label>End Date</label></b>}>
            <DatePicker 
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                value = {endDate}
            />
          </Form.Item>
        </>
  );


    
    
};

export default SetDateRange;