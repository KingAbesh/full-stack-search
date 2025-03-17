import { City } from "../entities/city.entity";
import { CityRepo } from "../repositories/city.repository";
import { NotFoundError } from "../errors/base.error";

export const findCityById = async (
  cityRepo: CityRepo,
  id: string
): Promise<City> => {
  const city = await cityRepo.findById(id);

  if (!city) {
    throw new NotFoundError(`City with id ${id} not found`);
  }

  return city;
};
