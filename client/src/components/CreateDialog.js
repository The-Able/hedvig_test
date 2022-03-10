import { React, useState} from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Typography, Stack, Dialog, DialogContent, DialogTitle, DialogContentText } from '@mui/material';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Button from './Button';
import axios from 'axios';


const validationSchema = yup.object({
  contractId: yup
    .number('Enter the contract id')
    .required('ContractID is required'),
  premium: yup
    .number('Enter the premium')
    .required('Premium is required'),
});

export default function CreateDialog({ setData }) {
  
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      contractId: '',
      premium: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const res = await axios({
        method: 'post',
        url: '/api/contracts/event',
        data: {
          name: 'ContractCreatedEvent',
          contractId: values.contractId,
          premium: values.premium,
          startDate: date,
        }
      });
      setLoading(false);
      if(res.data.error) {
        alert(res.data.error);
        return;
      }
      console.log(res.data);
      formik.resetForm();
      
      setData(data => {
        var newData = [...data];
        res.data.startDate = new Date(res.data.startDate).toISOString().split('T')[0];
        newData.push(res.data);
        return newData;
      })
      handleClose();
    },
  });

  return (
    
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create
      </Button>
      <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Event Details</DialogTitle>
          <DialogContent>
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={2} pt={2}>
                  <TextField
                    id="contractId"
                    name="contractId"
                    value={formik.values.contractId}
                    onChange={formik.handleChange}
                    error={formik.touched.contractId && Boolean(formik.errors.contractId)}
                    helperText={formik.touched.contractId && formik.errors.contractId}
                    label="contractId" 
                  /> 
                  <TextField
                    id="premium"
                    name="premium"
                    value={formik.values.premium}
                    onChange={formik.handleChange}
                    error={formik.touched.premium && Boolean(formik.errors.premium)}
                    helperText={formik.touched.premium && formik.errors.premium}
                    label="premium" 
                  />
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      label="startDate"
                      inputFormat="MM/dd/yyyy"
                      value={date}
                      onChange={setDate}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Stack>

                <Button sx={{my:'20px'}} color="primary" variant="contained"  type="submit" loading={loading}>Create</Button> &nbsp;
                <Button sx={{my:'20px'}} color="secondary" variant="contained" onClick={handleClose}>Close</Button>
            </form>
          </DialogContent>
        </Dialog>
    </div>
  );
};
