import { getAPIClientInstance } from './client';
import { Pharmacy } from './types';

const Urls = {
  PHARMACY_DETAILS: '/api/pharmacy',
};

const fetchPharmacyDetails = async (): Promise<Pharmacy> =>
  (await getAPIClientInstance().get(Urls.PHARMACY_DETAILS)).data.data
    .attributes;

export { fetchPharmacyDetails, Urls as PharmacyApiUrls };
