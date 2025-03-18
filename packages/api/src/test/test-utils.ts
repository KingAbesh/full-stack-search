import { Express } from "express";
import request from "supertest";
import app from "../app";

export const testApp = request(app);

export const createTestServer = (): Express => {
  return app;
};

// Helper to create test data
export const createTestHotel = () => ({
  _id: "1",
  hotel_name: "Test Hotel",
  city: "Test City",
  country: "Test Country",
  chain_name: "Test Chain",
  star_rating: 4.5,
  addressline1: "123 Test St",
});

export const createTestCity = () => ({
  _id: "1",
  name: "Test City",
  country: "Test Country",
  countryisocode: "TC",
});

export const createTestCountry = () => ({
  _id: "1",
  country: "Test Country",
  countryisocode: "TC",
});
