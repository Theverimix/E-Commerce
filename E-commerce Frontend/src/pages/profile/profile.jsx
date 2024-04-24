import React, { useState } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from "primereact/button";
import { Panel } from 'primereact/panel';
import { InputMask } from 'primereact/inputmask';

export default function Profile() {
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    country: '',
    phone: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(data);
  };

  return (
    <Panel header="Personal data" className="m-5">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-column gap-2 mb-3">
          <label htmlFor="firstname">Firstname</label>
          <InputText id="firstname" name="firstname" value={data.firstname} onChange={handleChange} />
        </div>
        <div className="flex flex-column gap-2 mb-3">
          <label htmlFor="lastname">Lastname</label>
          <InputText id="lastname" name="lastname" value={data.lastname} onChange={handleChange} />
        </div>
        <div className="flex flex-column gap-2 mb-3">
          <label htmlFor="email">Email</label>
          <InputText id="email" name="email" value={data.email} onChange={handleChange} />
        </div>
        <div className="flex flex-column gap-2 mb-3">
          <label htmlFor="address">Address</label>
          <InputText id="address" name="address" value={data.address} onChange={handleChange} />
        </div>
        <div className="flex flex-column gap-2 mb-3">
          <label htmlFor="country">Country</label>
          <InputText id="country" name="country" value={data.country} onChange={handleChange} />
        </div>
        <div className="flex flex-column gap-2 mb-3">
          <label htmlFor="phone">Phone</label>
          <InputMask id="phone" mask="999 999 999" placeholder="XXX XXX XXX"></InputMask>
        </div>
        <Button label="Submit" type="submit" style={{ width: '100%' }} />
      </form>
    </Panel>
  );
}
