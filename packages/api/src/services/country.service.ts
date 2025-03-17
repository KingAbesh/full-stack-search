import { Country } from "../entities/country.entity";
import { CountryRepo } from "../repositories/country.repository";
import { NotFoundError } from "../errors/base.error";

export const findCountryById = async (
  countryRepo: CountryRepo,
  id: string
): Promise<Country> => {
  const country = await countryRepo.findById(id);

  if (!country) {
    throw new NotFoundError(`Country with id ${id} not found`);
  }

  return country;
};
