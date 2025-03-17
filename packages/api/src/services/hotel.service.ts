import { Hotel } from "../entities/hotel.entity";
import { HotelRepo } from "../repositories/hotel.repository";
import { NotFoundError } from "../errors/base.error";

export const findHotelById = async (
  hotelRepo: HotelRepo,
  id: string
): Promise<Hotel> => {
  const hotel = await hotelRepo.findById(id);

  if (!hotel) {
    throw new NotFoundError(`Hotel with id ${id} not found`);
  }

  return hotel;
};
