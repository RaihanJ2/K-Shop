// src/pages/Address.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AddressType } from "../types";
import { addAddress, fetchAddress, setAddress } from "../services/address";

const Address: React.FC = () => {
  const [form, setForm] = useState<AddressType>({
    name: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    phone: "",
  });

  const [addresses, setAddresses] = useState<AddressType[]>([]);

  useEffect(() => {
    const getAddress = async () => {
      try {
        const data = await fetchAddress();
        setAddresses(data);
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };
    getAddress();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addAddress(form);
      alert("Address added successfully!");
      setForm({
        name: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        phone: "",
      });
      const data = await fetchAddress();
      setAddresses(data);
    } catch (error) {
      console.error("Error adding address", error);
      alert("Failed to add address. Please try again.");
    }
  };

  const handleSetDefaultAddress = async (addressId: string) => {
    try {
      await setAddress(addressId);
      const data = await fetchAddress();
      setAddresses(data);
    } catch (error) {
      console.error("Error setting default address:", error);
    }
  };

  return (
    <section className="w-scren h-full flex flex-col py-10 items-center justify-center">
      <div className="flex flex-col rounded-md w-1/3 items-center justify-center gap-6">
        <h1 className="capitalize font-bold text-3xl ">addresses</h1>
        <Link to="/account" className="">
          <i className="fa-solid fa-arrow-left-long pr-3"></i>
          Return to account page
        </Link>

        <div className="w-full p-4 flex gap-4 flex-col">
          <h1 className="text-3xl font-bold">Your Addresses</h1>
          {addresses.length > 0 ? (
            addresses.map((address, index) => (
              <div
                key={index}
                onClick={() => handleSetDefaultAddress(address._id!)}
                className={`border-2 p-4 rounded-md cursor-pointer ${
                  address.isDefault
                    ? "dark:text-black text-white bg-black dark:bg-white border-blue-600 border-4"
                    : "text-black dark:text-white border-black dark:border-white"
                }`}
              >
                <p>
                  <strong>Name:</strong> {address.name}
                </p>
                <p>
                  <strong>Street:</strong> {address.street}
                </p>
                <p>
                  <strong>City:</strong> {address.city}
                </p>
                <p>
                  <strong>State:</strong> {address.state}
                </p>
                <p>
                  <strong>Zipcode:</strong> {address.zipcode}
                </p>
                <p>
                  <strong>Phone:</strong> {address.phone}
                </p>
              </div>
            ))
          ) : (
            <p>No addresses found.</p>
          )}
        </div>
        <div className="w-full p-4 flex gap-4 flex-col">
          <h1 className="text-3xl font-bold">Add a New Address</h1>

          <input
            type="text"
            name="name"
            id=""
            placeholder="Address"
            onChange={handleChange}
            className="border-2 border-black text-black py-3 px-2 w-full rounded-md"
          />
          <input
            type="text"
            name="street"
            id=""
            placeholder="Street"
            onChange={handleChange}
            className="border-2 border-black text-black py-3 px-2 w-full rounded-md"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleChange}
            className="border-2 border-black text-black py-3 px-2 w-full rounded-md"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            onChange={handleChange}
            className="border-2 border-black text-black py-3 px-2 w-full rounded-md"
          />
          <input
            type="text"
            name="zipcode"
            placeholder="Postal/Zip Code"
            onChange={handleChange}
            className="border-2 border-black text-black py-3 px-2 w-full rounded-md"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            className="border-2 border-black text-black py-3 px-2 w-full rounded-md"
          />
          <button
            onClick={handleSubmit}
            className="border-2 border-black dark:border-white dark:text-white text-black py-3 px-2 w-full rounded-md"
          >
            Add Address
          </button>
        </div>
      </div>
    </section>
  );
};

export default Address;
