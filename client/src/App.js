import './App.css';
import axios from 'axios';
import { React, useEffect, useState} from 'react';
import ContractTable from 'components/ContractTable';
import CreateDialog  from 'components/CreateDialog';
import TerminationDialog from 'components/TerminationDialog';
import { Box, Stack } from '@mui/material';

function App() {
  const [data, setData] = useState();
  
  useEffect(()=>{
    getData();
  },[])

  const getData = () => {
    console.log(axios.baseURL);
    axios.get('/api/contracts')
      .then(res => {
        if(res.data){
          res.data?.map(row => {
            row.id = row.contractId;
            row.startDate = new Date(row.startDate).toISOString().split('T')[0];
            row.terminationDate = row.terminationDate ? new Date(row.terminationDate).toISOString().split('T')[0] : "";
            return row;
          });
          res.data.sort(function(a, b) { return a.contractId - b.contractId; })
          
          setData(res.data);
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <Box>
      <Stack direction="row" spacing={2} padding={4}>
        <CreateDialog setData={setData}/>
        <TerminationDialog setData={setData}/>
      </Stack>
      {data && <ContractTable rows={data} />}
    </Box>
  );
}

export default App;
