import React from "react";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";

export default function cartSummary() {
  const navigate = useNavigate();

  return (
    <div className="w-full px-7">
      <InputText
        className="w-full mb-3"
        placeholder="Enter coupon code here"
      ></InputText>
      <div className="flex justify-content-between flex-wrap">
        <span>Subtotal</span>
        <span>$134</span>
      </div>
      <div className="flex justify-content-between flex-wrap mt-2">
        <span>Shipping</span>
        <span>$134</span>
      </div>
      <Divider></Divider>
      <div className="flex justify-content-between flex-wrap">
        <span>Total</span>
        <span>$134</span>
      </div>
      <Button
        className="w-full mt-4"
        label="Continue to Shipping"
        onClick={() => navigate("/checkout")}
      ></Button>
    </div>
  );
}
