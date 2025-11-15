import { Request, Response } from "express";
import Address from "../models/Address";
import User from "../models/User";

export const setDefaultAddress = async (req: Request, res: Response) => {
  try {
    const { addressId } = req.body;
    const userId = req.body.userId || req.session.user?._id;

    if (!userId || !addressId) {
      res.status(400).json({ message: "User ID and Address ID are required" });
      return;
    }

    await Address.updateMany({ user: userId }, { isDefault: false });
    await Address.findByIdAndUpdate(addressId, { isDefault: true });
    await User.findByIdAndUpdate(userId, { defaultAddress: addressId });

    res.status(200).json({ message: "Default address updated successfully" });
  } catch (error) {
    console.error("Error setting default address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAddresses = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId || req.session.user?._id;

    if (!userId) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    const addresses = await Address.find({ user: userId });
    res.status(200).json(addresses);
  } catch (error) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createAddress = async (req: Request, res: Response) => {
  try {
    const { name, city, street, state, zipcode, phone } = req.body;
    const userId = req.body.userId || req.session.user?._id;

    if (!userId) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    const address = new Address({
      name,
      city,
      street,
      state,
      zipcode,
      phone,
      user: userId,
    });
    await address.save();

    res.status(201).json({ message: "New address registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding Address" });
  }
};
